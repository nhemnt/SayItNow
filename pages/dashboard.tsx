import Head from 'next/head';
import React from 'react'
import Footer from '../components/Footer';
import Header from '../components/Header';
import Table from '../components/Table';

const Dashboard = () => {
  return (
    <div className="flex max-w-6xl mx-auto flex-col items-center justify-center py-2 min-h-screen">
      <Head>
        <title>Say It Now</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <main className="flex flex-1 w-full flex-col items-center justify-center text-center px-4 mt-4 sm:mb-0 mb-8">
        
        {/* <a
          href="https://youtu.be/FRQtFDDrUXQ"
          target="_blank"
          rel="noreferrer"
          className="border rounded-2xl py-1 px-4 text-slate-500 text-sm mb-5 hover:text-slate-600 transition duration-300 ease-in-out"
        >
          Want to learn how I built this? Watch the{" "}
          <span className="font-bold">YouTube tutorial</span>.
        </a>
        <h1 className="mx-auto max-w-4xl font-display text-4xl font-bold tracking-normal text-slate-900 sm:text-6xl mb-5">
          Restore any face photo
        </h1> */}
        {/* <p className="text-slate-500 font-medium">{remainingMessage}</p> */}
        <Table />
      </main>
      <Footer />
    </div>
  )
}

export default Dashboard