import { getAuthToken } from '../utils/sessionStorage';

export const injectAuthorizationHeader = async (
  headers: Record<string, string> = {},
  url?: string
): Promise<Record<string, string>> => {
  if (url?.includes('/Login') || url?.includes('/Register') || url?.includes('/ForgotPassword')) {
    return headers;
  }

  const token = await getAuthToken();
  return {
    ...headers,
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};
