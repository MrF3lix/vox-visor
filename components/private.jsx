import { useState } from 'react'
import { useRouter } from "next/router"
import { useEffectOnce } from "react-use"
import { isAuthenticated } from '../services/auth'

export const Private = ({ children }) => {
    const [isLoading, setIsLoading] = useState()
    const router = useRouter()

    useEffectOnce(() => {
        loadSession()
    })

    const loadSession = async () => {
        setIsLoading(true)
        const authenticated = await isAuthenticated()
        if (!authenticated) {
            router.replace('/login')
        }
        setIsLoading(false)
    }


    return (
        <>{!isLoading && children}</>
    )
}