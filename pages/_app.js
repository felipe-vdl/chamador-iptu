import Head from 'next/head';
import Link from 'next/link';
import '../styles/globals.css'

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Chamador</title>
      </Head>
      <div className="flex flex-col bg-blue-200 min-h-screen">
        <main className="flex-1 flex flex-col text-stone-700">
          <Component {...pageProps} />
        </main>
      </div>
    </>
  );
}