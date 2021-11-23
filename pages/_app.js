import '../styles/globals.css'
import 'react-toastify/dist/ReactToastify.css';
import 'antd/dist/antd.css';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
