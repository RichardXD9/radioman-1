import "../styles/globals.css";
import "../styles/index.css"; 
import "../styles/Navbar.css";
import "../styles/destaques.css";
import "../styles/shopping.css";
import "../styles/filter.css";
import { ClerkProvider } from '@clerk/nextjs';

export default function App({ Component, pageProps }) {
  return (
    <ClerkProvider {...pageProps}>
      <Component {...pageProps} />
    </ClerkProvider>
  );
}