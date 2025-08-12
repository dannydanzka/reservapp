export interface BuildURLParams {
  url: string;
  endpoint: string;
  params?: Record<string, unknown>;
  query?: Record<string, unknown>;
  extraCustomQuery?: string;
}
