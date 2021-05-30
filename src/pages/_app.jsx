import { Provider } from 'react-redux';
import { store } from '../app/store';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import '../styles/globals.css';

const MyApp = ({ Component, pageProps }) => {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
};

export default MyApp;
