import Link from "next/link";

export const Header = () => (
    <header className="bg-teal-700">
        <header className="flex justify-between items-center w-full max-w-[1200px] mx-auto gap-4">
            <nav>
                <ul className="flex">
                    <li className="text-white text-lg p-4">
                        <Link href="/">
                            Overview
                        </Link>
                    </li>
                    <li className="text-white text-lg p-4">
                        <Link href="/results">
                            Results
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    </header>
)