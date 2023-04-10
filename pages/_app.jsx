import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Header } from '../components/header'
import '../styles/globals.css'

const queryClient = new QueryClient()

const App = ({ Component, pageProps }) => {
  return (
    <div className='bg-gray-50 w-full full-height flex flex-col'>
      <Header />
      <div className="flex flex-col w-full max-w-[1200px] mx-auto p-4 gap-4">
        <QueryClientProvider client={queryClient}>
          <Component {...pageProps} />
        </QueryClientProvider>
      </div>
    </div>
  )
}

export default App
