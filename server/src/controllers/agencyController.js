import BaseError from '../errors/BaseError.js';
import AgencyService from '../services/agencyService.js'

export default class AgencyController {
  static async createAgency(req, res, next) {
    try {
      const { nrInst, nrAgencia } = req.body;
      const newAgency = await AgencyService.createAgency(nrInst, nrAgencia);
      res.json(newAgency);
    } catch (err) {
      next(err)
    }
  }

  static async getAgencyByNrInst(req, res, next) {
    try {
      const nrInst = req.params.nrInst;
      const agency = await AgencyService.getAgencyByNrInst(nrInst);
      if (agency) {
        res.json(agency);
      } else {
        return next(new BaseError('Agência não encontrada'));
      }
    } catch (err) {
      next(err)
    }
  }

  static async getAllAgency(req, res, next) {
    try {
      const agency = await AgencyService.getAllAgency();

      if (agency) {
        res.json(agency);
      } else {
        return next(new BaseError('Nenhuma agência cadastrada'));
      }
    } catch (err) {
      next(err)
    }
  }

  static async updateNrAgency(req, res, next) {
    try {
      const nrInst = req.params.nrInst;
      const { nrAgencia } = req.body;
      const updatedAgency = await AgencyService.updateAgency(nrInst, nrAgencia);
      res.json(updatedAgency);
    } catch (err) {
      next(err)
    }
  }

  static async deleteAgency(req, res, next) {
    try {
      const nrInst = req.params.nrInst;
      await AgencyService.deleteAgency(nrInst);
      res.json({ success: true });
    } catch (err) {
      next(err)
    }
  }
}
