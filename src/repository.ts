import axios from "axios"
import { Page } from "./documentHandler"
import FormData from "form-data"

async function uploadFile(formData: FormData) {
  const response = await axios.post(baseUrl() + "/v1/files", formData, {
    headers: {
      'Content-Type': `multipart/form-data; boundary=${formData.getBoundary()}`
    }
  })
  return response.data
}

async function createUser(invitation: string, email: string, password: string) {
  return post("/v1/users", {
    invitation_token: invitation,
    user: { email, password }
  })
}

async function doesEmailExist(email: string) {
  return get("/v1/users/email_exists/" + email)
}

async function createDocument(name: string, email: string, password: string) {
  return post("/v1/docs", {
    doc: { name },
    credentials: { email, password }
  })
}

async function listDocuments(email: string, password: string) {
  return post("/v1/docs/list", { credentials: { email, password } })
}

async function updateDocument(token: string, updates: any) {
  return patch("/v1/docs/" + token, {
    doc: updates
  })
}

async function deleteDocument(token: string) {
  return del("/v1/docs/" + token)
}

async function singleDocument(token: string) {
  return get("/v1/docs/" + token)
}

async function publish(token: string, pages: Page[]) {
  return post("/v1/pages", { token, pages })
}

async function addDomain(token: string, domainName: string) {
  return post(`/v1/docs/${token}/domains`, {
    domain: domainName
  })
}

async function domainStatus(domainName: string) {
  return get(`/v1/domains/${domainName}`)
}

async function tryAddingSubdomain(token: string, subdomain: string) {
  return post(`/v1/docs/${token}/subdomain`, {
    subdomain
  })
}

async function validateInvitation(invitation: string) {
  return get(`/v1/invitations/${invitation}`)
}

async function post(relativeUrl: string, data: any) {
  const response = await axios.post(baseUrl() + relativeUrl, data)
  return response.data
}

async function patch(relativeUrl: string, data: any) {
  const response = await axios.patch(baseUrl() + relativeUrl, data)
  return response.data
}

async function get(relativeUrl: string) {
  const response = await axios.get(baseUrl() + relativeUrl)
  return response.data
}

async function del(relativeUrl: string) {
  const response = await axios.delete(baseUrl() + relativeUrl)
  return response.data
}

function baseUrl() {
  return "https://gendocs.io/api"
  // return "http://localhost:4000/api"
  // return "https://gendocs.gendocs.invacto.com/api"
}

export default {
  createUser,
  createDocument,
  listDocuments,
  singleDocument,
  publish,
  addDomain,
  tryAddingSubdomain,
  validateInvitation,
  updateDocument,
  doesEmailExist,
  domainStatus,
  deleteDocument,
  uploadFile
}