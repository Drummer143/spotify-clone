import React from "react";
import { Provider } from "react-redux";
import { useRouter } from "next/router";
import type { AppProps } from "next/app";

import "@/styles/globals.css";

import store from "@/redux";
import Layout from "@/components/Layout";
import SearchResultsPageLayout from "@/components/SearchResultsPageLayout";

export default function App({ Component, pageProps }: AppProps) {
    const { pathname } = useRouter();

    return (
        <Provider store={store}>
            <Layout>
                {pathname.includes("[query]") ? (
                    <SearchResultsPageLayout>
                        <Component {...pageProps} />
                    </SearchResultsPageLayout>
                ) : (
                    <Component {...pageProps} />
                )}
            </Layout>
        </Provider>
    );
}
