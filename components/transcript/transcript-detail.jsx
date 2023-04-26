import { Button } from "../form/button"
import dayjs from "dayjs"
import { useEffect, useState } from "react"
import { Input } from "../form/input"
import { saveTranscript } from "../../services/transcript"

export const TranscriptDetail = ({ transcript }) => {
    const [isEditing, setIsEditing] = useState(false)
    const [name, setName] = useState("")

    useEffect(() => {
        setName(transcript?.name)
    }, [transcript])

    if (!transcript) {
        return <></>
    }

    const submitResult = async () => {
        await saveTranscript({
            ...transcript,
            name
        })

        setIsEditing(false)
    }

    const cancel = () => {
        setName(transcript?.name)

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
                    <dt className="text-sm font-medium text-gray-500">Created</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{dayjs(transcript?.createdAt).format('DD.MM.YY - HH:mm')}</dd>
                </div>
            </dl>

            <div className="flex justify-start gap-2">
                {!isEditing &&
                    <Button primary onClick={() => setIsEditing(true)}>Edit</Button>
                }
                {isEditing &&
                    <>
                        <Button primary onClick={submitResult}>Save</Button>
                        <Button secondary onClick={cancel}>Cancel</Button>
                    </>
                }
            </div>
            <hr />
            <h3 className="text-lg">Scores</h3>
            <dl className="sm:divide-y sm:divide-gray-200">
                {transcript?.metrics.map(metric => (
                    <div key={metric.name} className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                        <dt className="text-sm font-medium text-gray-500">{metric.name}</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{metric.value}</dd>
                    </div>
                ))}
            </dl>
        </>
    )
}