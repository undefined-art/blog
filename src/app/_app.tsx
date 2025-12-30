import { ComponentType } from 'react';
import '../styles/globals.css'

export default function App({ Component, pageProps }: { Component: ComponentType; pageProps: any }) {
  return <Component {...pageProps} />
}