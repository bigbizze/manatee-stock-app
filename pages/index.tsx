import Layout from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import Link from 'next/link';
import React from "react";
import { SymbolPaths } from "../lib/symbols";
import { useQuery } from "react-query";
import { getAllSymbols } from "./api/allSymbols";

const Index = () => {
  const { data, error, isFetching } = useQuery<SymbolPaths[], Error>('allSymbolData', getAllSymbols, {
    staleTime: 1000 * 60 * 2
  });
  return (
    <Layout home>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        {isFetching && <p>Loading...</p>}
        {error && <p>{error.message}</p>}
        {(!isFetching && !!data) && (
          <>
            <h2 className={utilStyles.headingLg}>Available Symbols:</h2>
            <ul className={utilStyles.list}>
              {data.sort((a, b) => a.params.symbol.localeCompare(b.params.symbol)).map(symbol => (
                <li className={utilStyles.listItem} key={symbol.params.symbol}>
                  <Link key={symbol.params.symbol} href="/[symbol]" as={`/${symbol.params.symbol}`}>
                    {symbol.params.symbol}
                  </Link>
                  <br />
                </li>
              ))}
            </ul>
          </>
        )}
      </section>
    </Layout>
  );
};

export default Index;
