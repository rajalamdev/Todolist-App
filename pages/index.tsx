import type { NextPage } from 'next'
import Head from 'next/head'
import { DeletePopup } from "../components/DeletePopup";
import { Form } from "../components/Form";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { AppProvider } from "../context/AppContext";

const Home: NextPage = () => {
  return (
    <div className='app'>
      <Head>
        <title>TodoList App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AppProvider>
        <header>
          <Navbar />
        </header>
        <main>
          <Form />
          <DeletePopup />
        </main>
        <Footer />
      </AppProvider>
    </div>
  )
}

export default Home
