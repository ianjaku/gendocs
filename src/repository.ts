import axios from "axios"

async function createUser(email: string, password: string) {
  const response = await axios.post(baseUrl() + "/v1/users", {
    user: { email, password }
  })
  return response.data
}

async function createDocument(name: string, email: string, password: string) {
  const response = await axios.post(baseUrl() + "/v1/docs", {
    doc: {
      name
    },
    credentials: {
      email, password
    }
  })
  return response.data
}

async function listDocuments(email: string, password: string) {
  const response = await axios.post(baseUrl() + "/v1/docs/list", {
    credentials: {
      email, password
    }
  })
  return response.data
}

function baseUrl() {
  return "http://localhost:4000/api"
}

export default {
  createUser,
  createDocument,
  listDocuments
}