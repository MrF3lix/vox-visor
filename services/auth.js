import { supabase } from "./supabase";

export const getStoredSession = () => {
    const value = localStorage.getItem('session')

    if (value) {
        return JSON.parse(value)
    }
};

export const storeSession = (session) => {
    localStorage.setItem('session', JSON.stringify(session))
};

export const signOut = async () => {
    localStorage.removeItem('session')
    localStorage.removeItem('user')

    await supabase.auth.signOut()
};

export const isAuthenticated = async () => {
    const { data } = await supabase.auth.getSession();
    if (!data.session || parseInt(data.session.expires_at + '000') > Date.now()) {
        const storedSession = getStoredSession()
        if (!storedSession || parseInt(storedSession?.expires_at + '000') < Date.now()) {
            return false
        }
    }
    return true
}