

import React from 'react';
import { DataProvider } from '../context/context';
import "@/styles/globals.css";

function MyApp({ Component, pageProps }) {
    return (
        <DataProvider>
            <Component {...pageProps} />
        </DataProvider>
    );
}

export default MyApp;

