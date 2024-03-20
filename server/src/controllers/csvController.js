import BaseError from "../errors/BaseError.js";
import CsvService from "../services/CsvService.js"

export default class CsvController {
  static async processFile(req, res, next) {
    try {
      if (!req.file) {
        return next(new BaseError('File not received'));
      }

      const file = req.file.path;
      const originalFilename = req.file.originalname;
      const isValid = CsvService.isCsvFile(originalFilename);

      if (!isValid) {
        return next(new BaseError('File is not a CSV file'));
      }

      CsvService.createReadStream(file, res)
    } catch (err) {
      console.error(err)
      next(err);
    }
  }
}
