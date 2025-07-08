import "../styles/globals.css";
import "../styles/index.css"; 
import "../styles/Navbar.css";
import "../styles/destaques.css";
import "../styles/shopping.css";
import "../styles/filter.css";
import "../styles/ProductDetail.css";
import "../styles/Checkout.css";
import { ClerkProvider } from '@clerk/nextjs';
import { ptPT } from '@clerk/localizations';
export default function App({ Component, pageProps }) {
  return (
    <ClerkProvider localization={ptPT} {...pageProps}>
      <Component {...pageProps} />
    </ClerkProvider>
  );
}