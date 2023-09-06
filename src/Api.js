import Config from "./_Config.js";
import fetch from "node-fetch"

export const STATUS = {
  OK: "ok",
  ERROR: "error"
}

export class Api {

  constructor() { }

  getAuthenticationToken() {
    return Config.jwt;
  }

  buildJsonHeader(isAuth = true) {

    const header = {}
    header["Content-Type"] = "application/json"
    header["Accept"] = "*/*"

    if (!!isAuth) {
      header["Authorization"] = "Bearer " + this.getAuthenticationToken()
    }

    return header
  }

  async resolveRequest(request) {
    if (request.status === 200) {
      const response = await request.json()
      return Promise.resolve(response)
    } else {
      return Promise.reject({
        errorCode: request.status,
        message: request.statusText
      })
    }
  }

  buildURL(url, query) {
    return url.join("/") + "?" + query.join("&")
  }

  async get({ url, headers }) {
    const request = await fetch(url, {
      method: "GET",
      headers
    })

    return await this.resolveRequest(request)
  }

  async post({ url, headers, body = null }) {
    let request = null
    if (body === null) {
      request = await fetch(url, {
        method: "POST",
        headers
      })
    } else {
      request = await fetch(url, {
        method: "POST",
        headers,
        body: JSON.stringify(body)
      })
    }
    return await this.resolveRequest(request)
  }

}