require('dotenv').config()

const PORT = process.env.PORT
const MONGODB_USER = process.env.MONGODB_USER
const MONGODB_PASS = process.env.MONGODB_PASS
const MONGODB_URL = process.env.MONGODB_URL
const TEST_MONGODB_URL = process.env.TEST_MONGODB_URL
const ENV = process.env.NODE_ENV

let mongodbUrl =
  ENV === 'test'
    ? `mongodb+srv://${MONGODB_USER}:${MONGODB_PASS}@${TEST_MONGODB_URL}`
    : `mongodb+srv://${MONGODB_USER}:${MONGODB_PASS}@${MONGODB_URL}`

module.exports = {
  PORT,
  MONGODB_USER,
  mongodbUrl,
  MONGODB_URL,
  TEST_MONGODB_URL
}
