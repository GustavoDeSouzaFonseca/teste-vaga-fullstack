import path from 'path';
import { createReadStream } from 'node:fs'
import { Readable, Transform } from 'node:stream'
import { WritableStream, TransformStream } from 'node:stream/web'
import { setTimeout } from 'node:timers/promises'
import csvtojson from 'csvtojson'
import fs from 'fs'
import csv from 'csv-parser'
import { cpf, cnpj } from 'cpf-cnpj-validator';

export default class CsvService {
  static isCsvFile(file) {
    const filename = path.extname(file).toLowerCase()
    return filename == '.csv';
  };

  static async formatSpreedSheet(file) {
    const headers = []

    try {
      fs.createReadStream(file)
        .pipe(csv())
        .on('data', async (data) => {
          
        })
    } catch (e) {
      throw new Error(e)
    }
  }

  static async formatCurrency(value) {
    const formatter = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });
    return formatter.format(value);
}

  static async removeCharacteres(string) {
    const numberWithoutCaracteres = string.replace(/\D/g, "");
    return numberWithoutCaracteres;
  } 

  static async isCpfOrCnpj(number) {
    let CPF = 'cpf';
    let CNPJ = 'cnpj';
    let numberFormated = await CsvService.removeCharacteres(number)

    if(numberFormated.length == 11) {
      if(cpf.isValid(numberFormated)) {
        return CPF;
      }
    } 
    else if (numberFormated.length === 14) {
      if(cnpj.isValid(numberFormated)){
        return CNPJ;
      }
    } else {
      return numberFormated = false
    }
  }

  static async convertDate(date) {
    const dateWithouCharacteres = await CsvService.removeCharacteres(date)

    let year = dateWithouCharacteres.substr(0, 4);
    let month = dateWithouCharacteres.substr(4, 2) - 1; 
    let day = dateWithouCharacteres.substr(6, 2);

    let dateObject = new Date(year, month, day);

    return dateObject;
  }

  static async hasAccumulatedInterest(dtContrato, dtVctPre) {
    const newDtContrato = await CsvService.convertDate(dtContrato)
    const newDtVctPre = await CsvService.convertDate(dtVctPre)

    /* 
      NAO TENHO A DATA DO PAGAMENTO PARA REALIZAR O CALCULO DOS JUROS
    */
  }

  static async isValidVlTotalVlPresta(vlTotal, qtPrestacoes, vlPresta) {
    const res = Math.floor(parseFloat(vlTotal)) / qtPrestacoes
    if(res === Math.floor(parseFloat(vlPresta))){
      return true;
    }
    return false
  }

  static async createReadStream(file, res, req) {
    const headers = {
      'Content-Type': 'application/json', 
      'Transfer-Encoding': 'chunked'
    }
    
    const abortController = new AbortController()
    req.once('close', _ => {
      console.log(`connection was closed!`, items)
      abortController.abort()
    })
    try {
      res.writeHead(200, headers)
    
    Readable.toWeb(createReadStream(file))
      .pipeThrough(Transform.toWeb(csvtojson()))
      .pipeThrough(new TransformStream({
        async transform(chunk, controller) {
          const data = JSON.parse(Buffer.from(chunk))
          let cpf = '';
          let cnpj = '';

          //VALIDANDO CPF
          const cpfOrCnpj = await CsvService.isCpfOrCnpj(data.nrCpfCnpj)
          if (cpfOrCnpj === 'cpf') {
            cpf = data.nrCpfCnpj
          } else if (cpfOrCnpj === 'cnpj') {
            cnpj = data.nrCpfCnpj
          }

          //VALIDANDO VAL0R TOTAL = VALOR PRESTACAO
          const items = [data.vlTotal, data.qtPrestacoes,data.vlPresta];
          items.map(async (item) => await CsvService.formatCurrency(item))
          const vlTotalVlPresta = await CsvService.isValidVlTotalVlPresta(items[0], items[1], items[2])
          if(!vlTotalVlPresta) {
            
          } else {
            console.log('valor CORRETÍSSIMO')
          }

          //CONVERTENDO DATAS
          const t = await CsvService.hasAccumulatedInterest(data.dtContrato, data.dtVctPre)

          const agency = {
            nrInst: data.nrInst,
            nrAgencia: data.nrAgencia
          }

          const client = {
            cdClient: data.cdClient,
            nmClient: data.nmClient,
            cpf,
            cnpj
          }

          const contract = {
            nrContrato: data.nrContrato,
            dtContrato: await CsvService.convertDate(data.dtContrato),
            qtPrestacoes: data.qtPrestacoes ,
            vlTotal: await CsvService.formatCurrency(data.vlTotal), 
            cdProduto: data.cdProduto,
            dsProduto: data.dsProduto,
            cdCarteira: data.cdCarteira,
            dsCarteira: data.dsCarteira,
          }

          const installment = {
            nrProposta: data.nrProposta,
            nrPresta: data.nrPresta,
            tpPresta: data.tpPresta,
            nrSeqPre: data.nrSeqPre,
            dtVctPre: await CsvService.convertDate(data.dtVctPre),
            vlPresta: await CsvService.formatCurrency(data.vlPresta),
            vlMora: await CsvService.formatCurrency(data.vlMora),
            vlMulta: await CsvService.formatCurrency(data.vlMulta),
            vlOutAcr: await CsvService.formatCurrency(data.vlOutAcr),
            vlIof: await CsvService.formatCurrency(data.vlIof),
            vlDescon: await CsvService.formatCurrency(data.vlDescon),
            vlAtual: await CsvService.formatCurrency(data.vlAtual),
            idSituac: data.idSituac,
            idSitVen: data.idSitVen,
          }

          const mappedData = {
            agency,
            client,
            contract,
            installment,
          }
          console.log(mappedData)
          controller.enqueue(JSON.stringify(mappedData).concat('\n'))
        }
      }))
      .pipeTo(new WritableStream({
        async write(chunk) {
          res.write(chunk)
        },
        close() {
          res.end()
        }
      }), {
        signal: abortController.signal
      })
    } catch (e) {
      if (!e.message.includes('abort')) throw e
    }
    
  }
}
