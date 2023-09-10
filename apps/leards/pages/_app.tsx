import { AppProps } from 'next/app';
import Head from 'next/head';
import './styles.css';
import { Uikit } from '@viewshka/uikit';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Welcome to app!</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default CustomApp;
