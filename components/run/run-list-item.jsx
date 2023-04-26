import Link from "next/link";
import { ArrowRightIcon, ClockIcon } from '@heroicons/react/24/outline'
import { ListItem } from "../list/list-item";
import dayjs from "dayjs";

export const RunListItem = ({ id, name, description, createdAt }) => (
    <ListItem className="p-0 px-0 py-0">
        <Link href={`/runs/${id}`} className="flex justify-between items-center w-full p-6">
            <div className="flex flex-col sm:flex-row gap-2">
                <div className="w-64">
                    <div className="font-semibold truncate">{name}</div>
                    <div className="truncate text-gray-500 text-xs">{description}</div>
                </div>
            </div>
            <div className="flex w-24">
                <div className="text-gray-500 text-xs flex gap-1">
                    <ClockIcon className="h-4 w-4" />
                    {getDateString(createdAt)}
                </div>
            </div>
            <div className="p-1 rounded-full text-gray-400 hover:text-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                <ArrowRightIcon className="block h-5 w-5" />
            </div>
        </Link>
    </ListItem>
)

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