import { NextApiRequest, NextApiResponse } from 'next';
import { getSymbolData, SymbolData } from "../../lib/symbols";
import { objToQueryParams } from "../../lib/query-params";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (typeof req.query?.symbol !== 'string') {
    res.status(400).json({ error: 'symbol must be a string' });
    return;
  }
  try {
    const symbolData = await getSymbolData(req.query.symbol);
    res.setHeader('Cache-Control', 's-maxage=86400');
    res.status(200).json(symbolData);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

export const getOneSymbolData = async (symbol: string | string[]): Promise<SymbolData> => {
  let _symbol: string;
  if (typeof symbol === 'string') {
    _symbol = symbol;
  } else if (Array.isArray(symbol) && !!symbol.length) {
    _symbol = symbol[0];
  } else {
    throw new Error(`getOneSymbolData: symbol must be a string or a non-empty array of strings`);
  }
  const res = await fetch(`api/oneSymbolData${objToQueryParams({ symbol: _symbol })}`, {
    headers: {
      'Cache-Control': 'public, max-age=120'
    }
  });
  if (res.ok) {
    return res.json();
  }
  throw new Error(`Error fetching symbol data for ${symbol}`);
};
