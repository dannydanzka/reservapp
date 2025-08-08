import 'react-native-get-random-values';
import to from 'await-to-js';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { v4 as uuidv4 } from 'uuid';

import { getNameFromFilename } from '../../domain/constants/multimediaType.constant';

import axiosSimulator from './axiosSimulator.config';
import buildURL from './buildURL.config';
import defaultErrorHandling from './defaultErrorHandling.config';
import injectAuthorizationHeader from './injectAuthorizationHeader.config';
import { HandleRequestParams } from './types/request.types';

const isMockedResponseFunction = <T>(value: unknown): value is () => T =>
  typeof value === 'function';

const handleRequest = async <T = unknown>({
  body,
  customDefaultErrorMessage = false,
  endpoint,
  extraCustomQuery = '',
  header = {},
  method,
  mockedResponse,
  params,
  preProcessResponse,
  query,
  simulate = false,
  shouldReturnErrorCodeFirst = false,
  timeout = 10000, // Default timeout for ReservApp
  upload,
  url,
}: HandleRequestParams<T>): Promise<T> => {
  if (simulate) {
    const response = isMockedResponseFunction<T>(mockedResponse)
      ? mockedResponse()
      : mockedResponse;

    const [err, res] = await to(axiosSimulator({ delay: 900, mockedResponse: response }));

    if (err) {
      return defaultErrorHandling(err, customDefaultErrorMessage, shouldReturnErrorCodeFirst);
    }

    if (!res) {
      throw new Error('Unexpected empty response');
    }

    return preProcessResponse ? (preProcessResponse(res) as T) : res;
  }

  const fullURL = buildURL({ url, endpoint, params, query, extraCustomQuery });
  let formData: FormData | undefined;

  if (upload) {
    let filename = upload.ext
      ? `${getNameFromFilename(upload.filename)}.${upload.ext}`
      : upload.filename;

    filename = upload.unique ? `${uuidv4()}-${filename}` : filename;

    formData = new FormData();
    formData.append(upload.inputName, upload.file);
    formData.append('Name', filename);

    if (body && typeof body === 'object' && !Array.isArray(body)) {
      Object.entries(body).forEach(([key, value]) => {
        formData!.append(key, value as string | Blob);
      });
    }

    header = {
      ...header,
      'Content-Type': 'multipart/form-data',
    };
  }

  const headersFinal = await injectAuthorizationHeader(header, fullURL);

  const config: AxiosRequestConfig = {
    data: formData || body,
    headers: headersFinal,
    method,
    timeout,
    url: fullURL,
  };

  const [err, res] = await to<AxiosResponse<T>>(axios(config));

  if (err) {
    return defaultErrorHandling(err, customDefaultErrorMessage, shouldReturnErrorCodeFirst);
  }

  return preProcessResponse ? (preProcessResponse(res.data) as T) : res.data;
};

export default handleRequest;