import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import {Container, Navbar} from 'react-bootstrap'
import {ToastProvider} from '../pages/components/ToastContext'
import {PriceProvider} from '../pages/components/PriceContext'

// Create a client for react-query
const queryClient = new QueryClient()

function MyApp({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
        <ToastProvider>
          <PriceProvider>
            <Component {...pageProps} />
          </PriceProvider>
        </ToastProvider>
    </QueryClientProvider>
  )
}

export default MyApp
