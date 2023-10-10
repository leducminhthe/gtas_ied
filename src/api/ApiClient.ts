import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';
import { stringify } from 'qs';
import {
  decodeJwt, getLocalStorage, removeLocalStorage, setLocalStorage,
} from 'utils/authUtil';
import moment from 'moment';
// const domainUrl = 'http://172.16.39.149:8000';
// const liveDomain = 'http://172.16.39.135:8000';
type QueryObject = { [key: string]: string | number | boolean }
let refreshTokenRequest: any = null;
export default class ApiClient {
  /**
   * GET function
   *
   * @param url
   * @param params
   */
  static async get(
    url: string, params: object, query?: undefined | { [key: string]: string } | string,
  ): Promise<AxiosResponse> {
    let requestUrl = query ? `${url}?${stringify(query)}` : url;
    if (typeof query === 'string') {
      requestUrl = `${url}?${query}`;
    }
    const domainUrl = await this.getConnectTion();
    const tempUrl = domainUrl + requestUrl;
    // use domainUrl if there is no proxy site
    // eslint-disable-next-line no-control-regex
    const response = await axios.get(tempUrl.replace(/[^\x00-\x7F]/g, ''), {
      // const response = await axios.get(requestUrl, {
      params,
      headers: await this.getHeaders(),
      data: {},
    });

    return response;
  }

  static async getCallBack(
    url: string, params: object, callback:any, query?: undefined | { [key: string]: string } | string,
  ): Promise<AxiosResponse> {
    let requestUrl = query ? `${url}?${stringify(query)}` : url;
    if (typeof query === 'string') {
      requestUrl = `${url}?${query}`;
    }
    const domainUrl = await this.getConnectTion();
    const tempUrl = domainUrl + requestUrl;
    // use domainUrl if there is no proxy site
    // eslint-disable-next-line no-control-regex
    const response = await axios.get(tempUrl.replace(/[^\x00-\x7F]/g, ''), {
      // const response = await axios.get(requestUrl, {
      params,
      headers: await this.getHeaders(),
      data: {},
      cancelToken: callback,
    });

    return response;
  }

  /**
   * POST
   */
  static async post(url: string, query: QueryObject, params: any, appendUrl?: string): Promise<AxiosResponse> {
    const requestUrl = `${url}?${stringify(query)}${appendUrl || ''}`;

    const config: AxiosRequestConfig = {
      headers: await this.getHeaders(),
      // validateStatus,
    };
    const domainUrl = await this.getConnectTion();
    const param = this.convertToPostData(params, undefined, undefined);
    const response = await axios.post(domainUrl + requestUrl, param, config);
    return response;
  }

  static async postJsonData(url: string, query: QueryObject, params: any): Promise<AxiosResponse> {
    const requestUrl = `${url}?${stringify(query)}`;

    const config: AxiosRequestConfig = {
      headers: await this.getHeaders('application/json'),
      // validateStatus,
    };
    const domainUrl = await this.getConnectTion();
    const response = await axios.post(domainUrl + requestUrl, params, config);
    return response;
  }

  /**
   * DELETE
   *
   * @param url
   * @param params
   */
  static async delete(url: string, params: any): Promise<AxiosResponse> {
    const requestUrl = `${url}?${typeof (params) === 'string' ? params : stringify(params)}`;

    const config: AxiosRequestConfig = {
      headers: await this.getHeaders(),
      // validateStatus,
    };
    const domainUrl = await this.getConnectTion();
    const response = await axios.delete(domainUrl + requestUrl, config);
    return response;
  }

  private static convertToPostData(obj: any, form: any, namespace: any) {
    const fd = form || new URLSearchParams();
    let formKey;

    for (const property in obj) {
      // eslint-disable-next-line no-prototype-builtins
      if (obj.hasOwnProperty(property)) {
        if (namespace) {
          if (!isNaN(Number(property))) {
            formKey = `${namespace}[${property}]`;
          } else {
            formKey = `${namespace}.${property}`;
          }
        } else {
          formKey = property;
        }

        if (obj[property] instanceof Date) {
          fd.append(formKey, obj[property].toISOString());
        } else if (typeof obj[property] === 'object'
          && !(obj[property] instanceof File)
          && !(obj[property] instanceof Blob)) {
          this.convertToPostData(obj[property], fd, formKey);
        } else {
          fd.append(formKey, obj[property]);
        }
      }
    }
    return fd;
  }

  static async putJsonData(url: string, query: QueryObject, params: any): Promise<AxiosResponse> {
    const requestUrl = `${url}?${stringify(query)}`;

    const config: AxiosRequestConfig = {
      headers: await this.getHeaders('application/json'),
      // validateStatus,
    };
    const domainUrl = await this.getConnectTion();
    const response = await axios.put(domainUrl + requestUrl, params, config);
    return response;
  }

  private static async getHeaders(contentType: string = 'application/x-www-form-urlencoded') {
    return {
      'Content-Type': contentType,
      authorization: await this.getToken(),
      'Access-Control-Allow-Origin': '*',
    };
  }

  //
  static async postMutipartData(
    url: string, query: QueryObject, params: any,
  ): Promise<AxiosResponse> {
    const requestUrl = `${url}?${stringify(query)}`;

    const config: AxiosRequestConfig = {
      headers: await this.getHeaders('multipart/form-data'),
      // validateStatus,
    };
    const form = new FormData();
    const param = this.convertToPostData(params, form, undefined);
    const domainUrl = await this.getConnectTion();
    const response = await axios.post(`${domainUrl}${requestUrl}`, param, config);
    return response;
  }

  private static convertFileToPostData(obj: any, form: any, namespace: any) {
    const fd = form || new URLSearchParams();
    let formKey;
    for (const property in obj) {
      // eslint-disable-next-line no-prototype-builtins
      if (obj.hasOwnProperty(property)) {
        if (namespace) {
          if (!isNaN(Number(property))) {
            formKey = `${namespace}[${property}]`;
          } else {
            formKey = `${namespace}.${property}`;
          }
        } else {
          formKey = property;
        }
        if (obj[property] instanceof Date) {
          fd.append(formKey, obj[property].toISOString());
        } else if (typeof obj[property] === 'object'
          && !(obj[property] instanceof File)
          && !(obj[property] instanceof Blob)) {
          this.convertFileToPostData(obj[property], fd, formKey);
        } else if ((obj[property] instanceof File)) {
          fd.append('File', obj[property]);
        } else {
          fd.append(formKey, obj[property]);
        }
      }
    }
    return fd;
  }

  static async postMutipartFile(
    url: string, query: QueryObject, params: any,
  ): Promise<any> {
    const requestUrl = `${url}?${stringify(query)}`;
    const form = new FormData();
    const param = this.convertFileToPostData(params, form, undefined);
    const config: any = {
      headers: await this.getHeaders('multipart/form-data'),
    };
    console.log(form, 'check post multiple params');

    const domainUrl = await this.getConnectTion();
    const response = await axios.post(`${domainUrl}${requestUrl}`, param, config);
    return response;
  }

  private static async getToken() {
    // Check token expired moment(targetDay).utcOffset(9).format('YYYY-MM-DD')
    const timeNow = moment().utcOffset(7).add(10, 'minutes').format('YYYY-MM-DD HH:mm:ss');
    console.log('timenew', timeNow);
    const expiredToken = getLocalStorage('expiredToken');
    const isTokenExpired = expiredToken ? moment(expiredToken).isBefore(timeNow, 'minutes') : false; // check token is expired
    if (isTokenExpired) {
      refreshTokenRequest = refreshTokenRequest || this.refreshToken();
      const accessToken = await refreshTokenRequest;
      refreshTokenRequest = null;
      return `Bearer ${accessToken}`;
    }
    const accessToken = getLocalStorage('token');
    return `Bearer ${accessToken}`;
  }

  private static async refreshToken(): Promise<string> {
    try {
      const refreshToken = getLocalStorage('refreshToken');
      const accessToken = getLocalStorage('token');
      const config: AxiosRequestConfig = {
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${accessToken}`,
          'Access-Control-Allow-Origin': '*',
        },
      };
      const domainUrl = await this.getConnectTion();
      const response = await axios.post(`${domainUrl}/identity/Auth/RefreshToken`, { refreshToken, accessToken }, config);
      console.log('response', response);
      setLocalStorage('token', response?.data?.token);
      console.log('response token', response?.data?.token);
      const decodeToken = decodeJwt(response?.data?.token ?? '');
      setLocalStorage('expiredToken', moment(new Date(decodeToken.exp * 1000)).utcOffset(7).format('YYYY-MM-DD HH:mm:ss'));
      setLocalStorage('refreshToken', response?.data?.refreshToken);
      return response?.data?.token || '';
    } catch (error) {
      removeLocalStorage('token');
      removeLocalStorage('expiredToken');
      removeLocalStorage('refreshToken');
      return '';
    }
  }

  private static async getConnectTion() {
    const connectTion = getLocalStorage('connection');
    return connectTion;
  }
}
