import express from 'express'
import AgencyController from '../controllers/agencyController.js'

const router = express.Router()

router
  .get('/agency', AgencyController.getAllAgency)
  .get('/agency/:nrInst', AgencyController.getAgencyByNrInst)
  .post('/agency', AgencyController.createAgency)
  .put('/agency/:nrInst', AgencyController.updateNrAgency)
  .delete('/agency/:nrInst', AgencyController.deleteAgency)

export default router