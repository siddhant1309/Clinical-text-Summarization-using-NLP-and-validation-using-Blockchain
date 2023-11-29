// pages/_app.js
import 'semantic-ui-css/semantic.min.css';
import '../css/rootIndex.css'; // Import your custom global styles

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
