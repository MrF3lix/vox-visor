import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import '../styles/globals.css'
import { useEffectOnce } from 'react-use'
import { supabase } from '../services/supabase'
import { isAuthenticated, storeSession } from '../services/auth'
import { Header } from '../components/header'
import { useState } from 'react'

const queryClient = new QueryClient()

const App = ({ Component, pageProps }) => {
  const [authenticated, setAuthenticated] = useState(false)

  useEffectOnce(() => {
    supabase.auth.onAuthStateChange(async (_event, newSession) => {
      if (newSession != null) {
        await storeSession(newSession)
      }
      loadSession()
    })

    loadSession()
  })

  const loadSession = async () => {
    setAuthenticated(true)
    const authenticated = await isAuthenticated()
    setAuthenticated(authenticated)
  }

  return (
    <div className='bg-gray-50 w-full full-height flex flex-col'>
      <Header isAuthenticated={authenticated} />
      <div className="flex flex-col flex-1 w-full max-w-[1200px] mx-auto p-4 gap-4">
        <QueryClientProvider client={queryClient}>
          <Component {...pageProps} />
        </QueryClientProvider>
      </div>
    </div>
  )
}

export default App
