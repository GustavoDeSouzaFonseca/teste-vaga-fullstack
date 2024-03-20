import express from 'express'
import multer from 'multer'
import CsvController from '../controllers/csvController.js'

const router = express.Router()
const upload = multer({ dest: './src/uploads/received-csv/'})

export default router
  .post('/clients', upload.single('file'), CsvController.processFile)
