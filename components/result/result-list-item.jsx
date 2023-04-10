import Link from "next/link";
import { ArrowRightIcon, ClockIcon } from '@heroicons/react/24/outline'
import { ListItem } from "../list/list-item";
import dayjs from "dayjs";

export const ResultListItem = ({ id, name, description, createdAt, scores }) => (
    <ListItem>
        <>
            <div className="flex flex-col sm:flex-row gap-2">
                <div className="sm:w-48 w-46">
                    <div className="font-semibold truncate">{name}</div>
                    <div className="truncate text-gray-500 text-xs">{description}</div>
                </div>
            </div>
            <div className="flex">
                <div className="text-gray-500 dark:text-gray-400 text-xs flex gap-1">
                    <ClockIcon className="h-4 w-4" />
                    {getDateString(createdAt)}
                </div>
            </div>
            <div className="flex gap-2">
                <Score type="BLEU" scores={scores} />
                {/* <Score type="BLEU Preprocessed" scores={scores} /> */}
                <Score type="WER" scores={scores} />
                {/* <Score type="ROUGE" scores={scores} /> */}
            </div>
            <Link href={`/results/${id}`} className="dark:bg-gray-800 p-1 rounded-full text-gray-400 hover:text-black dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                <ArrowRightIcon className="block h-5 w-5" />
            </Link>
        </>
    </ListItem>
)

const Score = ({ type, scores }) => {
    const scoreItem = scores.find(s => s.type === type)

    if (!scoreItem) {
        return <></>
    }

    const value = new Intl.NumberFormat("de-CH", { maximumFractionDigits: 1 }).format(scoreItem.value)

    return (
        <div className="flex items-center bg-gray-100 rounded-full px-2">
            <div className="m-1 text-gray-500">{type}:</div>
            <div className="m-1 font-medium">{value}</div>
        </div>
    )
}

const getDateString = (date) => {
    const now = dayjs()
    const edited = dayjs(date)
    const diffSeconds = now.diff(edited, 'seconds')

    if (diffSeconds < 60) {
        return `${now.diff(edited, 'seconds')}s ago`
    } else if (diffSeconds < 60 * 60) {
        return `${now.diff(edited, 'minutes')}min ago`
    } else if (diffSeconds < 60 * 60 * 24) {
        return `${now.diff(edited, 'hours')}h ago`
    } else {
        return `${now.diff(edited, 'days')} days ago`
    }
}