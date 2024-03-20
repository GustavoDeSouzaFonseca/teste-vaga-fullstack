import express from 'express'
import csv from './csvRoute.js'

const routes = (app) => {
  app.use(
    express.json(),
    csv
  )
}

export default routes