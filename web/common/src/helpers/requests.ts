import axios from "axios";
import { Platform } from "react-native";

import { storage } from "@common/helpers/storage";

export interface RequestParams {
  method: "get" | "post" | "put" | "delete";
  url: string;
  params?: any;
  body?: any;
}

export interface Response {
  result?: boolean;
  data?: any;
}

class Requests {
  private API_URL = `http://${Platform.OS === "web" ? "localhost" : "10.0.2.2"}:5000/api`;

  async getAccessToken() {}

  async refreshAccessToken() {}

  async isTokenExpired() {
    const expires_in = await storage.getItem("expires_in");

    if (!expires_in) return true;

    return new Date() >= new Date(expires_in);
  }

  async logout() {
    await storage.clear();
  }

  async clearCache() {
    await storage.removeItem("access_token");
    await storage.removeItem("refresh_token");
    await storage.removeItem("expires_in");
  }

  async isLoggedIn() {
    try {
      if (await this.isTokenExpired()) {
        await this.refreshAccessToken();
      }

      return true;
    } catch (e) {
      return false;
    }
  }

  async request({ method, url, params, body }: RequestParams) {
    const headers = {
      accept: "application/json",
      ["content-type"]: "application/json",
    };

    const baseURL = url.includes("https://") ? null : this.API_URL;

    return axios({
      method,
      baseURL,
      url,
      data: body,
      headers,
      params,
    });
  }

  async get(url: string, params?: any) {
    return this.request({ method: "get", url, params });
  }

  async post(url: string, params?: any, body?: any) {
    return this.request({ method: "post", url, body, params });
  }

  async put(url: string, params?: any, body?: any) {
    return this.request({ method: "put", url, body, params });
  }

  async delete(url: string, params?: any, body?: any) {
    return this.request({ method: "delete", url, body, params });
  }
}

const requests = new Requests();

export { requests };
