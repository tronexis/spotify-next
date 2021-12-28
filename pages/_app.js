import "tailwindcss/tailwind.css";
import Providers from "./../providers";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <Providers session={session}>
      <Component {...pageProps} />
    </Providers>
  );
}

export default MyApp;
