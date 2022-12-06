import { NextApiRequest, NextApiResponse } from 'next';
import { getAllStockSymbols, SymbolPaths } from "../../lib/symbols";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const allSymbols = await getAllStockSymbols();
    res.setHeader('Cache-Control', 's-maxage=120');
    res.status(200).json(allSymbols);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

export const getAllSymbols = async (): Promise<SymbolPaths[]> => {
  const res = await fetch("api/allSymbols", {
    headers: {
      'Cache-Control': 'public, max-age=120'
    }
  });
  if (res.ok) {
    return res.json();
  }
  return [];
};
