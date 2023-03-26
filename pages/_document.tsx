import Document, { Head, Html, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <meta
            name="description"
            content="Say It Now A Safe Space to Express Yourself."
          />
          <meta property="og:site_name" content="https://sayitnow.vercel.app/" />
          <meta
            property="og:description"
            content="Say It Now A Safe Space to Express Yourself."
          />
          <meta property="og:title" content="Say It Now" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Say It Now" />
          <meta
            name="twitter:description"
            content="Say It Now A Safe Space to Express Yourself"
          />
          <meta
            property="og:image"
            content="https://sayitnow.vercel.app/og-image.png"
          />
          <meta
            name="twitter:image"
            content="https://sayitnow.app/og-image.png"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
