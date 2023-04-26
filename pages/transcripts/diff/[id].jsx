import Head from "next/head"
import { DiffEditor } from '@monaco-editor/react';
import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { Private } from "../../../components/private";
import { useTranscript } from "../../../services/transcript";

const ResultDiff = ({ id }) => {
    const { data: transcript } = useTranscript(id)

    return (
        <Private>
            <Head>
                <title>Viewer | Compare Output</title>
            </Head>
            <h1>
                <Link href={`/transcripts/${transcript?.id}`} className="underline text-sky-600 text-sm flex items-center gap-1">
                    <ArrowLeftIcon className="w-4 h-4" /> Go Back
                </Link>
            </h1>
            <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-4 bg-white p-4 rounded-md absolute w-full left-0">
                    <div className="flex">
                        <div className="w-full">
                            <h3 className="text-lg">Reference</h3>
                        </div>
                        <div className="w-full">
                            <h3 className="text-lg">Hypothesis</h3>
                        </div>
                    </div>
                    <DiffEditor
                        className="py-4 h-[80vh]"
                        original={transcript?.reference}
                        modified={transcript?.hypothesis}
                    />
                </div>
            </div>
        </Private>
    )
}

export async function getServerSideProps({ query }) {
    return {
        props: {
            id: query.id
        },
    }
}

export default ResultDiff