import neode from "../config/db/neo4j.js"

const Agency = neode.model('Agency', {
  nrInst: {
    type: 'integer',
    primary: true
  },
  nrAgencia: {
    type: 'integer',
    index: true
  },
  eager: true
})

export default Agency;