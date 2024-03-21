const API_URL = 'http://localhost:8080'

export default class Services{
  static async consumeAPI (file, signal) {
    try {
      let counter = 0;
      const formData = new FormData();
      formData.append('file', file); 

      const response = await fetch(`${API_URL}/clients`, {
        method: 'POST',
        body: formData,
        signal,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      return response.body
        .pipeThrough(new TextDecoderStream())
        .pipeThrough(this.parseNDJSON());

    } catch (error) {
      console.error('Error fetching data:', error);
      throw error; 
    }
  }
  
  static parseNDJSON() {
    let ndjsonBuffer = ''
    return new TransformStream({
      transform(chunk, controller) {
        ndjsonBuffer += chunk
        const items = ndjsonBuffer.split('\n')
        items.slice(0, -1)
          .forEach(item => controller.enqueue(JSON.parse(item)))
  
        ndjsonBuffer = items[items.length -1]
      },
      flush(controller) {
        if(!ndjsonBuffer) return;
        controller.enqueue(JSON.parse(ndjsonBuffer))
      }
    })
  }

  static renderClientOnCard = (eventStream) => {
    let id = 0;
    return new WritableStream({
      write(chunk) {
        id++
        console.log(id, chunk.agency ,chunk.client, chunk.contract, chunk.installment);

        const agency = {
          nrInst: chunk.agency.nrInst,
          nrAgencia: chunk.agency.nrAgencia
        }

        const client = {
          cdClient: chunk.client.cdClient,
          nmClient: chunk.client.nmClient,
          cpf: chunk.client.cpf,
          cnpj: chunk.client.cnpj
        }

        const contract = {
          nrContrato: chunk.contract.nrContrato,
          dtContrato: chunk.contract.dtContrato,
          qtPrestacoes: chunk.contract.qtPrestacoes ,
          vlTotal: chunk.contract.vlTotal, 
          cdProduto: chunk.contract.cdProduto,
          dsProduto: chunk.contract.dsProduto,
          cdCarteira: chunk.contract.cdCarteira,
          dsCarteira: chunk.contract.dsCarteira,
        }

        const installment = {
          nrProposta: chunk.installment.nrProposta,
          nrPresta: chunk.installment.nrPresta,
          tpPresta: chunk.installment.tpPresta,
          nrSeqPre: chunk.installment.nrSeqPre,
          dtVctPre: chunk.installment.dtVctPre,
          vlPresta: chunk.installment.vlPresta,
          vlMora: chunk.installment.vlMora,
          vlMulta: chunk.installment.vlMulta,
          vlOutAcr: chunk.installment.vlOutAcr,
          vlIof: chunk.installment.vlIof,
          vlDescon: chunk.installment.vlDescon,
          vlAtual: chunk.installment.vlAtual,
          idSituac: chunk.installment.idSituac,
          idSitVen: chunk.installment.idSitVen,
        }

        const cardData = { 
          id: id,
          cdClient: client.cdClient,
          nmClient: client.nmClient,
          nrInst: agency.nrInst,
          nrAgencia: agency.nrAgencia,
          cpf: client.cpf,
          cnpj: client.cnpj,
          nrContrato: contract.nrContrato,
          dtContrato: contract.dtContrato,
          vlTotal: contract.vlTotal,
          qtPrestacoes: contract.qtPrestacoes,
          cdProduto: contract.cdProduto,
          dsProduto: contract.dsProduto,
          vlPresta: installment.vlPresta,
          dtVctPre: installment.dtVctPre,
          vlAtual: installment.vlAtual,
          idSituac: installment.idSituac,
          idSitVen: installment.idSitVen,
        };
        if (eventStream) {
          eventStream.dispatchEvent(new CustomEvent('cardReceived', { detail: cardData }));
        }
        if (id === 40) {
          this.abort();
        }
      },
      abort(reason) {
        console.log('aborted**', reason);
      }
    })
  }

}