import '../styles/globals.css'
import type { AppProps } from 'next/app'
import "my-lib-ui/dist/index.css"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div>
        <Component {...pageProps} />
    </div>
  ) 
}
