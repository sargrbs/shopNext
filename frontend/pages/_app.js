import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import {Container, Navbar} from 'react-bootstrap'
import {ToastProvider} from '../pages/components/ToastContext'

// Create a client for react-query
const queryClient = new QueryClient()

function MyApp({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
        <Navbar bg="dark" variant="dark" style={{marginBottom: 20}}>
          <Container>
            <Navbar.Brand href="/" >
              API SHOP 9 
            </Navbar.Brand>
          </Container>
        </Navbar>
        <ToastProvider>
          <Component {...pageProps} />
        </ToastProvider>
    </QueryClientProvider>
  )
}

export default MyApp
