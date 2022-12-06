import React from "react";
import utilStyles from "../styles/utils.module.css";
import Router from "next/router";

export const SymbolInput = () => {
  const [ symbolInput, setSymbolInput ] = React.useState('');
  return (
    <>
      <section className={utilStyles.headingMd}>
        <p>Stock Symbol Price Lookup</p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px} ${utilStyles.borderBottom}`}>
        <div className={utilStyles.homeStockLookupContainer}>
          <h2 className={utilStyles.headingLg}>Enter Symbol:</h2>
          <div className={utilStyles.homeStockLookupContainer}>
            <input value={symbolInput} onChange={event => {
              if (typeof event.target.value === 'string') {
                setSymbolInput(event.currentTarget.value.toUpperCase());
              }
            }}/>
            <button onClick={() => Router.push(`/${symbolInput}`)}>
              Go
            </button>
          </div>
        </div>
      </section>
    </>
  );
};
