import express from 'express'
import csv from './csvRoute.js'
import agency from './agencyRoute.js'

const routes = (app) => {
  app.use(
    express.json(),
    csv,
    agency
  )
}

export default routes