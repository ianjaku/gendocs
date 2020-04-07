import axios from "axios"

async function createUser(email: string, password: string) {
  const response = await axios.post(baseUrl() + "/v1/users", {
    user: { email, password }
  })
  return response.data
}

function baseUrl() {
  return "http://localhost:4000/api"
}

export default {
  createUser
}