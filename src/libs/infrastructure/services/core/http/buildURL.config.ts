import querystring from 'querystring';

import { BuildURLParams } from './interfaces/buildURL.interface';

const renderEndpoint = (template: string, data: Record<string, unknown>) =>
  template.replace(/{(.*?)}/g, (_, key) => {
    const value = data[key];
    return typeof value === 'string' ? value : String(value ?? '');
  });

const buildURL = ({
  endpoint,
  extraCustomQuery = '',
  params,
  query = {},
  url,
}: BuildURLParams): string => {
  const processedQuery: Record<string, string> = {};

  Object.entries(query).forEach(([key, value]) => {
    if (value !== undefined) {
      processedQuery[key] = Array.isArray(value)
        ? value.map((v) => String(v)).join(',')
        : String(value);
    }
  });

  const renderedEndpoint = params ? renderEndpoint(endpoint, params) : endpoint;
  const queryString = querystring.stringify(processedQuery);
  const finalURL = `${url}${renderedEndpoint}${
    queryString ? `?${extraCustomQuery}${queryString}` : ''
  }`;

  return finalURL;
};

export default buildURL;
