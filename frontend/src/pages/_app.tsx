import Topbar from '@/components/Topbar'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { store } from '../redux/store';
import { Provider } from 'react-redux';

const App = ({ Component, pageProps, ...appProps }: AppProps) => {

  const getContent = () => {
    if (appProps.router.pathname.includes('login')) {
      return <Component {...pageProps} />
    }
    return (
      <div className='h-screen w-screen flex flex-row'>
        <div className='h-full w-full flex flex-col'>
          <Topbar />
          <Component {...pageProps} />
        </div>
      </div>
    )
  }

  return (
    <Provider store={store}>
      {getContent()}
    </Provider>
  )
}

export default App;
