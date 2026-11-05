import {
  CurrencyInfo,
  ConversionResult,
  SupportedCodesApiResponse,
  PairConversionApiResponse,
} from "@/types/currency";

const API_KEY = process.env.EXPO_PUBLIC_EXCHANGERATE_API_KEY?.trim() || "";
const BASE_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}`;

const CURRENCY_SYMBOLS: Record<string, string> = {
  BRL: "R$",
  USD: "$",
  EUR: "€",
  GBP: "£",
  JPY: "¥",
  CAD: "CA$",
  AUD: "AU$",
  CHF: "CHF",
  CNY: "¥",
  ARS: "AR$",
  CLP: "CLP$",
  UYU: "$U",
  PYG: "₲",
  MXN: "Mex$",
  INR: "₹",
};

export async function fetchSupportedCurrencies(): Promise<CurrencyInfo[]> {
  if (!API_KEY) {
    throw new Error(
      "Chave da ExchangeRate-API não configurada no arquivo .env (EXPO_PUBLIC_EXCHANGERATE_API_KEY)."
    );
  }

  const response = await fetch(`${BASE_URL}/codes`);
  if (!response.ok) {
    throw new Error(
      `Erro ao consultar a API (${response.status} - ${response.statusText}). Verifique sua chave de acesso.`
    );
  }

  const data: SupportedCodesApiResponse = await response.json();
  if (data.result !== "success" || !Array.isArray(data.supported_codes)) {
    throw new Error("Resposta inesperada ao recuperar as moedas da API.");
  }

  return data.supported_codes.map(([code, name]) => ({
    code,
    name,
    symbol: CURRENCY_SYMBOLS[code] || code,
  }));
}

export async function convertCurrency(
  baseCode: string,
  targetCode: string,
  amount: number
): Promise<ConversionResult> {
  if (!API_KEY) {
    throw new Error(
      "Chave da ExchangeRate-API não configurada no arquivo .env (EXPO_PUBLIC_EXCHANGERATE_API_KEY)."
    );
  }

  const normalizedBase = baseCode.toUpperCase().trim();
  const normalizedTarget = targetCode.toUpperCase().trim();

  const response = await fetch(
    `${BASE_URL}/pair/${normalizedBase}/${normalizedTarget}/${amount}`
  );

  if (!response.ok) {
    throw new Error(
      `Erro ao consultar taxa de conversão na API (${response.status}).`
    );
  }

  const data: PairConversionApiResponse = await response.json();
  if (data.result !== "success") {
    throw new Error(
      "A API não retornou sucesso para o cálculo da conversão solicitado."
    );
  }

  return {
    baseCode: normalizedBase,
    targetCode: normalizedTarget,
    amount,
    rate: data.conversion_rate,
    result: data.conversion_result ?? amount * data.conversion_rate,
    lastUpdateUtc: data.time_last_update_utc,
  };
}
