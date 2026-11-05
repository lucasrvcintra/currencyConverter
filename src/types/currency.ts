export interface CurrencyInfo {
  code: string;
  name: string;
  symbol?: string;
  flag?: string;
}

export interface ConversionResult {
  baseCode: string;
  targetCode: string;
  amount: number;
  rate: number;
  result: number;
  lastUpdateUtc?: string;
}

export interface SupportedCodesApiResponse {
  result: string;
  documentation?: string;
  terms_of_use?: string;
  supported_codes: [string, string][];
}

export interface PairConversionApiResponse {
  result: string;
  documentation?: string;
  terms_of_use?: string;
  time_last_update_unix?: number;
  time_last_update_utc?: string;
  time_next_update_unix?: number;
  time_next_update_utc?: string;
  base_code: string;
  target_code: string;
  conversion_rate: number;
  conversion_result?: number;
}
