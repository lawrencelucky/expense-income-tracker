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
import Lottie from 'lottie-react';
import Loader from '@lottie/loader.json';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

export default function App({ Component, pageProps }: AppProps) {
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        setTimeout(() => setLoading(false), 5000);
    }, []);

    return (
        <>
            {!loading ? (
                <>
                    <Component {...pageProps} />
                    <ToastContainer />
                </>
            ) : (
                <div className="w-full min-h-screen grid place-items-center">
                    <div className="w-[350px]">
                        <Lottie animationData={Loader} loop={true} />
                    </div>
                </div>
            )}
        </>
    );
}
