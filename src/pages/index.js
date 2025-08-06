import { getSession } from "next-auth/react";
import Head from "next/head";
import Banner from "../components/Banner";
import Header from "../components/Header";
import ProductFeed from "../components/ProductFeed";
import { foodItems } from "../data/foodItems";

export default function Home({ products }) {
  return (
    <div className="bg-gray-100">
      <Head>
        <title>Joy D'Or</title>
      </Head>
      
      <Header />
      
      <main className="max-w-screen-2xl mx-auto pt-32"> {/* Add pt-32 for header spacing */}
        <Banner />
        <ProductFeed products={products} />
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  
  return {
    props: {
      products: foodItems,
      session
    },
  }
}

