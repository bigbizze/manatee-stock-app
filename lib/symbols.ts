import { objToQueryParams } from "./query-params";

const makeFinnHubRequestURL = (addOn: string, queryParams: object) =>
  `https://finnhub.io/api/v1/${addOn}${objToQueryParams({
    ...queryParams,
    token: process.env.FINNHUB_API_KEY
  })}`;

interface AllStockSymbols {
  currency:      string,
  description:   string,
  displaySymbol: string,
  figi:          string,
  mic:           string,
  symbol:        string,
  type:          string
}

export interface SymbolPaths {
  params: {
    symbol: string
  }
}
export const getAllStockSymbols = async (): Promise<SymbolPaths[]> => {
  const res = await fetch(makeFinnHubRequestURL('stock/symbol', {
    exchange: 'US'
  }));
  if (res.ok) {
    try {
      const allSymbolsResponse = (await res.json()) as AllStockSymbols[];
      return allSymbolsResponse.map(x => ({
        params: {
          symbol: x.symbol
        }
      }));
    } catch (e) {
      throw new Error(`getAllStockSymbols failed to parse response as JSON: ${e}`);
    }
  }
  throw new Error(`getAllStockSymbols failed with status ${res.status}`);
};

interface SymbolInfo {
  count:  number,
  result: SymbolInfoResult[]
}

export interface SymbolInfoResult {
  description:   string,
  displaySymbol: string,
  symbol:        string,
  type:          string
}

const getSymbolInfo = async (symbol: string): Promise<SymbolInfoResult> => {
  const res = await fetch(makeFinnHubRequestURL(`search`, {
    q: symbol.toUpperCase()
  }));
  if (res.ok) {
    let symbolInfoResponse: SymbolInfo;
    try {
      symbolInfoResponse = (await res.json()) as SymbolInfo;
    } catch (e) {
      throw new Error(`getSymbolInfo failed to parse response as JSON: ${e}`);
    }
    if (symbolInfoResponse.count === 0) {
      throw new Error(`getSymbolInfo failed to find symbol info results for symbol ${symbol}`);
    }
    return symbolInfoResponse.result[0];
  }
  throw new Error(`getSymbolInfo failed with status ${res.status}`);
};

interface SymbolQuoteResponse {
  c:  number,
  h:  number,
  l:  number,
  o:  number,
  pc: number,
  t:  number
}

interface SymbolPrice {
  currentPrice: number,
  timeOfQuote: number,
  percentChangeFromPrevClose: number
}
const getSymbolPrice = async (symbol: string): Promise<SymbolPrice> => {
  const res = await fetch(makeFinnHubRequestURL(`quote`, {
    symbol: symbol.toUpperCase()
  }));
  if (res.ok) {
    try {
      const quoteResponse = (await res.json()) as SymbolQuoteResponse;
      return {
        currentPrice: quoteResponse.c,
        timeOfQuote: quoteResponse.t * 1000,
        percentChangeFromPrevClose: (quoteResponse.c - quoteResponse.pc) / quoteResponse.pc
      };
    } catch (e) {
      throw new Error(`getSymbolCurrentPrice failed to parse response as JSON: ${e}`);
    }
  }
  throw new Error(`getSymbolQuote failed with status ${res.status}`);
};

export interface SymbolData extends SymbolInfoResult, SymbolPrice {}
export const getSymbolData = async (symbol: string): Promise<SymbolData> => {
  const [ symbolInfo, symbolPrice ] = await Promise.all([
    getSymbolInfo(symbol),
    getSymbolPrice(symbol)
  ]);
  return {
    ...symbolInfo,
    ...symbolPrice
  };
};
