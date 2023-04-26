import Link from "next/link";
import { Button } from "./form/button";
import { signOut } from "../services/auth";
import { useRouter } from "next/router";

export const Header = ({ isAuthenticated }) => {
    const router = useRouter()

    const logout = async () => {
        await signOut()
        router.push('/login')
    }

    return (
        <header className="bg-amber-400">
            <header className="flex justify-between items-center w-full max-w-[1200px] mx-auto gap-4 p-4">
                <Link href="/">
                    <h1 className="font-light text-black text-2xl">Vox Visor</h1>
                </Link>
                {isAuthenticated &&
                    <Button primary small onClick={logout}>Logout</Button>
                }
            </header>
        </header>
    )
}