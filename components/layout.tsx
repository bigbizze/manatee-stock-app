import Head from 'next/head';

import styles from './layout.module.css';
import React from "react";
import { SymbolInput } from "./symbol-input";
import Link from "next/link";

export const siteTitle = 'Stock Symbol Info Display';

interface LayoutProps {
  children?: React.ReactNode,
  home?: boolean
}
const Layout = ({ home, children }: LayoutProps) => (
  <div className={ styles.container }>
    <Head>
      <link rel="icon" href="/favicon.ico"/>
      <title>{ siteTitle }</title>
      <meta
        name="description"
        content="Basic app display stock symbols and their current price"
      />
      <meta name="og:title" content={ siteTitle }/>
      <meta name="twitter:card" content="summary_large_image"/>
    </Head>
    <header >
      <SymbolInput/>
    </header>
    <main>{ children }</main>
    { !home && (
      <div className={ styles.backToHome }>
        <Link href="/">← Back to home</Link>
      </div>
    ) }
  </div>
);

export default Layout;
