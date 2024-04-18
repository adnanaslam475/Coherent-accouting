import jwtDefaultConfig from "./jwtDefaultConfig";
import axios from "axios";
var qs = require("qs");
var FormData = require("form-data");
import router from "@/router";
import store from "@/store";

export default class JwtService {
  // Will be used by this service for making API calls
  axiosIns1 = axios.create({
    // You can add your headers here
    // ================================
    baseURL: "https://coherent-accounting.com",
    // baseURL: "https://167.86.93.80",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "https://coherent-accounting.com",
      Authorization: "Basic YWNtZTphY21lc2VjcmV0",
      "X-XSRF-TOKEN": store.state?.verticalMenu?.xsrf_token,
    },
  });

  axiosIns2 = axios.create({
    // baseURL: "https://167.86.93.80",
    baseURL: "https://coherent-accounting.com",
    "X-XSRF-TOKEN": store.state?.verticalMenu?.xsrf_token,
  });

  axiosIns4 = axios.create({
    baseURL: "https://api.ipify.org/?format=json",
    "X-XSRF-TOKEN": store.state?.verticalMenu?.xsrf_token,
  });

  axiosIns = null;

  jwtConfig = { ...jwtDefaultConfig };

  // For Refreshing Token
  isAlreadyFetchingAccessToken = false;

  // For Refreshing Token
  subscribers = [];

  constructor(axiosIns, jwtOverrideConfig) {
    this.axiosIns = axiosIns;
    this.jwtConfig = { ...this.jwtConfig, ...jwtOverrideConfig };

    // Request Interceptor
    this.axiosIns.interceptors.request.use(
      (config) => {
        const accessToken = this.getToken();
        if (accessToken) {
          // eslint-disable-next-line no-param-reassign
          config.headers.Authorization = `${this.jwtConfig.tokenType} ${accessToken}`;
          config.headers["X-XSRF-TOKEN"] =
            store.state?.verticalMenu?.xsrf_token;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Add response interceptor
    this.axiosIns.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        // const { config, response: { status } } = error
        // const { config, response } = error.config;
        const originalRequest = error.config;

        if (error.response && error.response.status === 401) {
          if (
            error.response.data &&
            error.response.data.error_description &&
            error.response.data.error_description.includes(
              "Access token expired:"
            )
          ) {
            this.refreshToken(store.state?.verticalMenu?.xsrf_token)
              .then((r) => {
                // Update accessToken in localStorage
                this.setToken(r.data.access_token);
                this.setRefreshToken(r.data.refresh_token);
                this.onAccessTokenFetched(r.data.access_token);
              })
              .catch((error) => {
                if (error.response && error.response.status === 401) {
                  // && error.response.data && error.response.data.error_description
                  // && error.response.data.error_description.includes('Invalid refresh token (expired):')) {
                  localStorage.removeItem(this.jwtConfig.storageTokenKeyName);
                  localStorage.removeItem(
                    this.jwtConfig.storageRefreshTokenKeyName
                  );
                  localStorage.removeItem("userData");
                  router.push({ name: "login" });
                }
              });
          }

          // incorrect old password
          if (
            error.response.data.errorMessage ===
            "The old password is not correct!"
          ) {
            return;
          }

          const retryOriginalRequest = new Promise((resolve) => {
            this.addSubscriber((accessToken) => {
              // Make sure to assign accessToken according to your response.
              // Check: https://pixinvent.ticksy.com/ticket/2413870
              // Change Authorization header
              originalRequest.headers.Authorization = `${this.jwtConfig.tokenType} ${accessToken}`;
              resolve(this.axiosIns(originalRequest));
            });
          });
          return retryOriginalRequest;
        }
        return Promise.reject(error);
      }
    );
  }

  onAccessTokenFetched(accessToken) {
    this.subscribers = this.subscribers.filter((callback) =>
      callback(accessToken)
    );
  }

  addSubscriber(callback) {
    this.subscribers.push(callback);
  }

  getToken() {
    return localStorage.getItem(this.jwtConfig.storageTokenKeyName);
  }

  getRefreshToken() {
    return localStorage.getItem(this.jwtConfig.storageRefreshTokenKeyName);
  }

  setToken(value) {
    localStorage.setItem(this.jwtConfig.storageTokenKeyName, value);
  }

  setRefreshToken(value) {
    localStorage.setItem(this.jwtConfig.storageRefreshTokenKeyName, value);
  }

  login(...args) {
    let data = new FormData();
    for (var key in arguments[0]) {
      if (arguments[0].hasOwnProperty(key)) {
        data.append(key, arguments[0][key]);
      }
    }
    let headers = {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json",
      Authorization: "Basic YWNtZTphY21lc2VjcmV0",
      "X-XSRF-TOKEN": args ? args[1] : "",
    };

    return this.axiosIns2.post(this.jwtConfig.loginEndpoint, data, {
      headers,
    });
  }

  getIpAddress() {
    return this.axiosIns4.get();
  }
  clientToken(t) {
    const data = qs.stringify({
      grant_type: "client_credentials",
    });
    return this.axiosIns1.post(this.jwtConfig.clientToken, data, {
      headers: { "X-XSRF-TOKEN": t },
    });
  }

  register(token, ...args) {
    console.log(" register----", store.state);
    let headers = {
      "Content-Type": "application/json",
      Authorization: `${this.jwtConfig.tokenType} ${token}`,
      Accept: "application/json",
      "X-XSRF-TOKEN": store.state.verticalMenu?.xsrf_token,
    };
    return this.axiosIns2.post(this.jwtConfig.registerEndpoint, ...args, {
      headers,
    });
  }

  resetPasswordRequest(token, ...args) {
    let headers = {
      Authorization: `${this.jwtConfig.tokenType} ${token}`,
    };
    return this.axiosIns2.post(
      this.jwtConfig.resetPasswordRequestEndpoint,
      ...args,
      {
        headers,
      }
    );
  }

  resetPassword(token, ...args) {
    let headers = {
      Authorization: `${this.jwtConfig.tokenType} ${token}`,
    };
    return this.axiosIns2.post(this.jwtConfig.resetPasswordEndpoint, ...args, {
      headers,
    });
  }

  refreshToken(token) {
    let data = new FormData();
    data.append("grant_type", "refresh_token");
    data.append("refresh_token", this.getRefreshToken());
    return this.axiosIns1.post(this.jwtConfig.refreshEndpoint, data, {
      headers: {
        "X-XSRF-TOKEN": store.state?.verticalMenu?.xsrf_token || token,
      },
    });
  }

  countries(token) {
    let headers = {
      Authorization: `${this.jwtConfig.tokenType} ${token}`,
      "X-XSRF-TOKEN": store.state?.verticalMenu?.xsrf_token,
    };
    return this.axiosIns2.get(this.jwtConfig.countryToken, {
      headers,
    });
  }

  //Invoice

  addInvoice(token, ...args) {
    return this.axiosIns.post(this.jwtConfig.invoiceAddEndpoint, ...args);
  }

  EditInvoice(token, id, ...args) {
    return this.axiosIns.put(
      `${this.jwtConfig.invoiceEditEndpoint}/${id}`,
      ...args
    );
  }

  DeleteInvoice(token, id) {
    return this.axiosIns.delete(
      `${this.jwtConfig.invoiceDeleteEndpoint}/${id}`
    );
  }

  // Company Invoices
  addCompanyInvoice(token, id, ...args) {
    return this.axiosIns.post(
      `${this.jwtConfig.CompanyInvoiceAddEndpoint}/${id}`,
      ...args
    );
  }

  EditCompanyInvoice(token, id, companyId, ...args) {
    return this.axiosIns.put(
      `${this.jwtConfig.companyInvoiceEditEndpoint}/${id}/${companyId}`,
      ...args
    );
  }
  EditBankStatement(token, id, ...args) {
    return this.axiosIns.put(
      `${this.jwtConfig.bankStatementEditEndpoint}/${id}`,
      ...args
    );
  }
  DeleteBankStatement(token, id) {
    return this.axiosIns.delete(
      `${this.jwtConfig.bankStatementDeleteEndpoint}/${id}`
    );
  }

  syncWithQuickBook(t, invoiceId, companyId, body) {
    return this.axiosIns.post(
      `${this.jwtConfig.syncWithQuickBookPostEndPoint}/${invoiceId}/${companyId}`,
      body,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );
  }

  syncWithXero(t, invoiceId, companyId, body) {
    return this.axiosIns.post(
      `${this.jwtConfig.syncWithXeroPostEndPoint}/${invoiceId}/${companyId}`,
      body,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );
  }

  getSupportedPlatforms(t) {
    return this.axiosIns.get(
      `${this.jwtConfig.getSupportedPlatformsEndPoint} `,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );
  }
  DeleteCompanyInvoice(token, id) {
    return this.axiosIns.delete(
      `${this.jwtConfig.companyInvoiceDeleteEndpoint}/${id}`
    );
  }

  //Add Vat-Report
  addCompanyVatReport(token, id, ...args) {
    return this.axiosIns.post(
      `${this.jwtConfig.VatReportAddEndPoint}/${id}`,
      ...args
    );
  }

  //Edit Vat-Report
  editCompanyVatReport(token, id, ...args) {
    return this.axiosIns.put(
      `${this.jwtConfig.VatReportEditEndPoint}/${id}`,
      ...args
    );
  }

  //Delete Vat Report
  DeleteVatReport(token, id) {
    return this.axiosIns.delete(
      `${this.jwtConfig.VatReportDeleteEndPoint}/${id}`
    );
  }

  //Get Invoices for report
  InvoicesForVatReport(token, ...args) {
    return this.axiosIns.post(
      `${this.jwtConfig.GetInvoicesForReportEndPoint}`,
      ...args
    );
  }

  //Get Create-Vat-Report-Zip
  GetVatReportsZip(token, ...args) {
    return this.axiosIns.post(
      `${this.jwtConfig.CreateVatReportZipFileEndPoint}`,
      ...args
    );
  }

  EditUser(token, id, ...args) {
    return this.axiosIns.put(
      `${this.jwtConfig.UserEditEndpoint}/${id}`,
      ...args
    );
  }

  DeleteUser(token, id) {
    return this.axiosIns.delete(`${this.jwtConfig.UserDeleteEndpoint}/${id}`);
  }

  EditCompanyUser(token, id, companyId, ...args) {
    return this.axiosIns.put(
      `${this.jwtConfig.UserCompanyEditEndpoint}/${id}/${companyId}`,
      ...args
    );
  }

  DeleteCompanyUser(token, id) {
    return this.axiosIns.delete(
      `${this.jwtConfig.UserCompanyDeleteEndpoint}/${id}`
    );
  }

  SearchCompanyName(token, ...args) {
    return this.axiosIns.post(this.jwtConfig.SearchCompanyEndpoint, ...args);
  }

  SearchCompanyEic(token, eic) {
    return this.axiosIns.get(`${this.jwtConfig.SearchEicEndpoint}/${eic}`);
  }

  SearchCompanyPerson(token, params) {
    let config = {
      params: params,
    };
    return this.axiosIns.get(this.jwtConfig.SearchEicPerson, config);
  }

  SearchCompaniesPerson(token, companyId, params) {
    let config = {
      params: params,
    };
    return this.axiosIns.get(
      `${this.jwtConfig.searchEicPersonCompanies}/${companyId}/1/100`,
      config
    );
  }

  verifyToken(token, UrlToken) {
    return this.axiosIns.get(`${this.jwtConfig.verifyToken}?token=${UrlToken}`);
  }

  companies(token) {
    return this.axiosIns.get(`${this.jwtConfig.getCompanies}`);
  }

  addFileInvoice(token, CompanyId, file) {
    return this.axiosIns.post(
      `${this.jwtConfig.fileInvoiceEndpoint}/${CompanyId}`,
      file
    );
  }
  addMultipleFileInvoice(token, CompanyId, files) {
    return this.axiosIns.post(
      `${this.jwtConfig.multipleFileInvoiceEndpoint}/${CompanyId}`,
      files
    );
  }
  addMultipleBankStatemtents(token, CompanyId, platform, files) {
    return this.axiosIns.post(
      `${this.jwtConfig.multipleFileBankStatement}/${CompanyId}?platform=${platform}`,
      files
    );
  }
  addMultipleExportFiles(token, CompanyId, files) {
    return this.axiosIns.post(
      `${this.jwtConfig.multipleExportFileEndpoint}/${CompanyId}`,
      files
    );
  }

  getCompany(id) {
    return this.axiosIns.get(`/account/api/company/${id}`);
  }

  //Delete Company
  DeleteCompany(token, id) {
    return this.axiosIns.delete(
      `${this.jwtConfig.deleteCompanyEndPoint}/${id}`
    );
  }

  //wrong old password
  wrongOldPassword(token, ...args) {
    return this.axiosIns.post(this.jwtConfig.wrongOldPasswordEndPoint, ...args);
  }

  //Getting Plans
  getPlansPrices() {
    return this.axiosIns.get(this.jwtConfig.GetPlansEndPoint, {});
  }

  //Getting user's current plan
  getUserCurrentPlan(token) {
    let headers = {
      Authorization: `${this.jwtConfig.tokenType} ${token}`,
    };
    return this.axiosIns.get(this.jwtConfig.GetUserCurrentPlan, {
      headers,
    });
  }

  //validate company-vat-number
  validateVatNo(token, data) {
    let headers = {
      Authorization: `${this.jwtConfig.tokenType} ${token}`,
    };
    return this.axiosIns.get(
      `${this.jwtConfig.validateVat + "?vatNumber=" + data}`,
      {
        headers,
      }
    );
  }

  export(token, data) {
    let headers = {
      Authorization: `Bearer ${token}`,
    };
    return this.axiosIns.post(`/api/export`, data, { headers });
  }
}
