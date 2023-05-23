import { Button } from "../form/button"
import dayjs from "dayjs"
import { useEffect, useState } from "react"
import { Input } from "../form/input"
import { TextArea } from "../form/textarea"
import { saveRun } from "../../services/runs"
import { Toggle } from "../form/toggle"

export const RunDetail = ({ run, stats }) => {
    const [isEditing, setIsEditing] = useState(false)
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [archived, setArchived] = useState(false)

    useEffect(() => {
        setName(run?.name)
        setDescription(run?.description)
        setArchived(run?.archived)
    }, [run])

    useEffect(() => {
        if(run && run.archived !== archived) {
            submitRun()
        }
    }, [run, archived])

    if (!run) {
        return <></>
    }

    const submitRun = async () => {
        await saveRun({
            ...run,
            name,
            description,
            archived
        })

        setIsEditing(false)
    }

    const cancel = () => {
        setName(run?.name)
        setDescription(run?.description)
        setIsEditing(false)
    }

    return (
        <>
            <h3 className="text-lg">Details</h3>
            <dl className="sm:divide-y sm:divide-gray-200">
                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                    <dt className="text-sm font-medium text-gray-500">Name</dt>
                    {isEditing ?
                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                            <Input defaultValue={name} onChange={(e) => setName(e.target.value)} />
                        </dd>
                        :
                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{name}</dd>
                    }
                </div>
                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                    <dt className="text-sm font-medium text-gray-500">Description</dt>
                    {isEditing ?
                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                            <TextArea value={description || ""} placeholder="Description of the current run" onChange={(e) => setDescription(e.target.value)} />
                        </dd>
                        :
                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{description}</dd>
                    }
                </div>
                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                    <dt className="text-sm font-medium text-gray-500">Created</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{dayjs(run?.createdAt).format('DD.MM.YY - HH:mm')}</dd>
                </div>
                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                    <dt className="text-sm font-medium text-gray-500">Archived</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                        <Toggle label="Is Archived?" enabled={archived} setEnabled={setArchived} />
                    </dd>
                </div>
                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                    <dt className="text-sm font-medium text-gray-500">Runs</dt>
                    <dd className="mt-1 text-sm font-bold text-gray-900 sm:col-span-2 sm:mt-0">{stats?.count}</dd>
                </div>
                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                    <dt className="text-sm font-medium text-gray-500">Average BLEU</dt>
                    <dd className="mt-1 text-sm font-bold text-gray-900 sm:col-span-2 sm:mt-0">{stats?.avg_bleu?.toFixed(2)}</dd>
                </div>
                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                    <dt className="text-sm font-medium text-gray-500">Average ROUGE</dt>
                    <dd className="mt-1 text-sm font-bold text-gray-900 sm:col-span-2 sm:mt-0">{stats?.avg_rouge?.toFixed(2)}</dd>
                </div>
                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                    <dt className="text-sm font-medium text-gray-500">Average WER</dt>
                    <dd className="mt-1 text-sm font-bold text-gray-900 sm:col-span-2 sm:mt-0">{stats?.avg_wer?.toFixed(2)}</dd>
                </div>
                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                    <dt className="text-sm font-medium text-gray-500">Average SemDist</dt>
                    <dd className="mt-1 text-sm font-bold text-gray-900 sm:col-span-2 sm:mt-0">{stats?.avg_semdist?.toFixed(2)}</dd>
                </div>
            </dl>

            <div className="flex justify-start gap-2">
                {!isEditing &&
                    <Button primary onClick={() => setIsEditing(true)}>Edit</Button>
                }
                {isEditing &&
                    <>
                        <Button primary onClick={submitRun}>Save</Button>
                        <Button secondary onClick={cancel}>Cancel</Button>
                    </>
                }
            </div>
        </>
    )
}