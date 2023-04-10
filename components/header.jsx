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
        <header className="bg-teal-700">
            <header className="flex justify-between items-center w-full max-w-[1200px] mx-auto gap-4">
                <nav>
                    {isAuthenticated &&
                        <ul className="flex">
                            <li className="text-white p-4">
                                <Link href="/">
                                    All Experiments
                                </Link>
                            </li>
                            <li className="text-white p-4">
                                <Link href="/results">
                                    All Results
                                </Link>
                            </li>
                        </ul>
                    }
                </nav>
                {isAuthenticated &&
                    <div className="mr-4">
                        <Button primary small onClick={logout}>Logout</Button>
                    </div>
                }
            </header>
        </header>
    )
}