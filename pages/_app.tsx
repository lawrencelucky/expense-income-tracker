import React from 'react';
import 'antd/dist/reset.css';
import 'styles/output.scss';
import 'styles/globals.css';
import '../styles/nprogress.css';
import '../styles/override.scss';
import Router from 'next/router';
import 'react-toastify/dist/ReactToastify.css';
import NProgress from 'nprogress';
import type { AppProps } from 'next/app';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Image from 'next/image';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

export default function App({ Component, pageProps }: AppProps) {
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        setTimeout(() => setLoading(false), 3000);
    }, []);

    return (
        <>
            <Component {...pageProps} />
            <ToastContainer />
        </>
    );
}
