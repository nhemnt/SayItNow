import { dehydrate, QueryClient } from '@tanstack/react-query';
import { NextPage } from "next";
import Head from "next/head";
import Footer from "../components/Footer";
import Form from '../components/Form';
import Header from "../components/Header";
import SquigglyLines from "../components/SquigglyLines";
import { Testimonials } from "../components/Testimonials";
import { getResponses, responsesQueryKey } from '../lib/helper';



const Home: NextPage = ({data}) => {
  return (
    <div className="flex max-w-6xl mx-auto flex-col items-center justify-center py-2 min-h-screen">
      <Head>
        <title>Say It Now</title>
      </Head>
      <Header />
      <main className="flex flex-1 w-full flex-col items-center justify-center text-center px-4 sm:mt-28 mt-20">
        <h1 className="mx-auto max-w-4xl font-display text-5xl font-bold tracking-normal text-slate-900 sm:text-7xl">
          <span className="relative whitespace-nowrap text-[#3290EE]">
            <SquigglyLines />
            <span className="relative">Say It Now</span>
          </span>{" "}
          A Safe Space to Express Yourself
        </h1>

        <p className="mx-auto mt-12 max-w-xl text-lg text-slate-700 leading-7">
          Anonymously Share Your Thoughts and Join a Community of Honest
          Expression Where You Can Speak Freely and Openly
        </p>
        <div className="flex justify-center space-x-4">
          <a
            className="bg-white rounded-xl text-black font-medium px-4 py-3 sm:mt-10 mt-8 hover:bg-gray-100 border"
            href="https://youtu.be/FRQtFDDrUXQ"
            target="_blank"
            rel="noreferrer"
          >
            Learn how it's built
          </a>

          <button
            className="bg-black rounded-xl text-white font-medium px-4 py-3 sm:mt-10 mt-8 hover:bg-black/80"
            onClick={() => {
              document.getElementById('form')?.scrollIntoView({
                behavior: 'smooth'
              })
            }}
          >
            Share Your Thoughts 
          </button>
        </div>
        <div id="form" className="flex justify-between items-center w-full flex-col sm:mt-10 mt-6">
          <Form />
        </div>
      </main>
      <Testimonials initialData={data} />
      <Footer />
    </div>
  );
};

export default Home;

export async function getServerSideProps() {
  let data = {}
  try{
    data = await getResponses(1);
  }catch(_err){
    // no need to handle
  }

  return {
    props: {
      data
    },
  };
}