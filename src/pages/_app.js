import React from 'react';
import { DataProvider } from '../context/context';
import "@/styles/globals.css";
import Loader from '../components/loader';
import { useState } from 'react';

function MyApp({ Component, pageProps }) {
    
  const [loading, setLoading] = useState(false);
    return (
        <DataProvider>
            {loading && <Loader />}
            <Component {...pageProps} setLoading={setLoading} />
        </DataProvider>
    );
}

export default MyApp;


