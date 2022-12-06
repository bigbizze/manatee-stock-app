import Layout from '../components/layout';
import Head from 'next/head';
import DateWrap from '../components/date-wrap';
import utilStyles from '../styles/utils.module.css';
import { SymbolData } from "../lib/symbols";
import { useQuery } from "react-query";
import { useRouter } from "next/router";
import { getOneSymbolData } from "./api/oneSymbolData";


const SymbolPage = () => {
  const router = useRouter();
  const { symbol } = router.query;
  const { data, error, isFetching } = useQuery<SymbolData, Error>([ symbol ], () => getOneSymbolData(symbol), {
    staleTime: 1000 * 60 * 2
  });
  if (error) {
    return (
      <Layout>
        <p>{error.message}</p>
      </Layout>
    );
  } else if (isFetching || !data) {
    return (
      <Layout>
        <p>Loading {symbol}...</p>
      </Layout>
    );
  }
  return (
    <Layout>
      <Head>
        <title>{ data.description }</title>
      </Head>
      <article>
        <h1 className={ utilStyles.headingXl }>{ data.description }</h1>
        <div className={ utilStyles.lightText }>
          <DateWrap timestamp={ data.timeOfQuote }/>
        </div>
        <div>
          <p>Symbol: { data.symbol }</p>
          <p>Price: { data.currentPrice }</p>
          <p className={utilStyles.sincePrevCloseContainer}>
            <span>Since Previous Close:</span>
            <span className={data.percentChangeFromPrevClose > 0 ? utilStyles.green : data.percentChangeFromPrevClose < 0 ? utilStyles.red : ""}>
              {`${(data.percentChangeFromPrevClose * 100).toFixed(2)}%`}
            </span>
          </p>
        </div>
      </article>
    </Layout>
  );
};

export default SymbolPage;
// export async function getStaticPaths() {
//   const paths = await getAllStockSymbols();
//   return {
//     paths,
//     fallback: false
//   };
// }
//
// export async function getStaticProps({ params }) {
//   const symbolData = await getSymbolData(params.symbol);
//   return {
//     props: {
//       symbolData: symbolData
//     }
//   };
// }
