import Head from "next/head"
import { Button } from "../components/form/button"
import { useRouter } from "next/router"
import { useState } from "react"
import { Input } from "../components/form/input"
import { supabase } from "../services/supabase"

const Login = () => {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            setLoading(true);

            const { error: loginError } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (loginError) throw loginError;

            router.push('/');
        } catch (e) {
            console.error(e)
            if (
                e?.message !== undefined &&
                e.message.includes('Email not confirmed')
            ) {
                setError('Please validate your email.');
            } else {
                setError('Something went wrong while signing you in.');
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <Head>
                <title>Viewer | Login</title>
            </Head>
            <div className="flex flex-1 justify-center items-center w-full h-fit">
                <div className="bg-white rounded-md w-full sm:w-[400px]">
                    <div className="flex w-full flex-col justify-center gap-6 py-6 px-6">
                        <h1 className="text-xl font-bold">Login</h1>
                        <form onSubmit={handleLogin} className="flex flex-col gap-6">
                            <Input
                                type="email"
                                placeholder="email@example.com"
                                label="E-Mail"
                                value={email}
                                error={error}
                                onChange={e => setEmail(e.target.value)}
                                disabled={loading}
                            />
                            <Input
                                type="password"
                                label="Password"
                                placeholder="••••••••"
                                value={password}
                                error={error}
                                onChange={e => setPassword(e.target.value)}
                                disabled={loading}
                            />
                            <div className="flex flex-col gap-4">
                                <Button primary width="full" disabled={loading}>
                                    Login
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login