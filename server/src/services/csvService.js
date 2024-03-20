import path from 'path';
import { createReadStream } from 'node:fs'
import { Readable, Transform } from 'node:stream'
import { WritableStream, TransformStream } from 'node:stream/web'
import { setTimeout } from 'node:timers/promises'
import csvtojson from 'csvtojson'

export default class CsvService {
  static isCsvFile(file) {
    const filename = path.extname(file).toLowerCase()
    return filename == '.csv';
  };

  static async createReadStream(file, res) {
    const headers = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': '*',
      'Content-Type': 'application/json', 
      'Transfer-Encoding': 'chunked'
    }

    res.writeHead(200, headers)

    Readable.toWeb(createReadStream(file))
      .pipeThrough(Transform.toWeb(csvtojson()))
      .pipeThrough(new TransformStream({
        transform(chunk, controller) {
          const data = JSON.parse(Buffer.from(chunk))
          const mappedData = {
            nrInst: data.nrInst,
            nrAgencia: data.nrAgencia,
            cdClient: data.cdClient,
            nmClient: data.nmClient,
            nrCpfCnpj: data.nrCpfCnpj,
            nrContrato: data.nrContrato,
            dtContrato: data.Contrato,
            qtPrestacoes: data.qtPrestacoes,
            vlTotal: data.vlTotal,
            cdProduto: data.cdProduto,
            dsProduto: data.dsProduto,
            cdCarteira: data.cdCarteira,
            dsCarteira: data.dsCarteira,
            nrProposta: data.nrProposta,
            nrPresta: data.nrPresta,
            tpPresta: data.tpPresta,
            nrSeqPre: data.nrSeqPre,
            dtVctPre: data.dtVctPre,
            vlPresta: data.vlPresta,
            vlMora: data.vlMora,
            vlMulta: data.vlMulta,
            vlOutAcr: data.vlOutAcr,
            vlIof: data.vlIof,
            vlDescon: data.vlDescon,
            vlAtual: data.vlAtual,
            idSituac: data.idSituac,
            idSitVen: data.idSitVen,
          }
          controller.enqueue(JSON.stringify(mappedData).concat('\n'))
        }
      }))
      .pipeTo(new WritableStream({
        async write(chunk) {
          await setTimeout(200)
          res.write(chunk)
        },
        close() {
          res.end()
        }
      }))
  }
}
