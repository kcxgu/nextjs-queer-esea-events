import '@/styles/globals.css'
import { RecoilRoot } from 'recoil';
import Layout from '@/components/Layout/Layout';
import Script from 'next/script'

export default function App({ Component, pageProps }) {
  return (
    <>
      <Script id="clarity-analytic" strategy="afterInteractive">
        {`
          (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "gv4s2fdo6z");
      `}
      </Script>
      <RecoilRoot>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </RecoilRoot>
    </>
  )
}
