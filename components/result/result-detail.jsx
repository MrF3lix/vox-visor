import Link from "next/link"
import { Button } from "../form/button"
import dayjs from "dayjs"
import { useEffect, useState } from "react"
import { Input } from "../form/input"
import { TextArea } from "../form/textarea"
import { Select } from "../form/select"
import { saveResult } from "../../services/results"

const experiments = [
    { value: '0a4f96b6-dbdc-4059-8529-503cad3f4328', name: 'Compare CAI models' }
]

export const ResultDetail = ({ result }) => {

    const [isEditing, setIsEditing] = useState(false)
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [experimentId, setExperimentId] = useState("")
    const [experimentName, setExperimentName] = useState("")

    useEffect(() => {
        setName(result?.name)
        setDescription(result?.description)
        setExperimentId(result?.experiment?.id || -1)
        setExperimentName(result?.experiment?.name || "")
    }, [result])

    if (!result) {
        return <></>
    }

    const submitResult = async () => {
        setExperimentName(experiments.find(e => e.value === experimentId)?.name || "")

        await saveResult({
            ...result,
            name,
            description,
            experimentId
        })

        setIsEditing(false)
    }

    const cancel = () => {
        setName(result?.name)
        setDescription(result?.description)
        setExperimentId(result?.experiment?.id || -1)
        setExperimentName(result?.experiment?.name || "")

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
                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{dayjs(result?.createdAt).format('DD.MM.YY - HH:mm')}</dd>
                </div>
                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                    <dt className="text-sm font-medium text-gray-500">Experiment</dt>

                    {isEditing ?
                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                            <Select selected={experimentId} options={experiments} onChange={(e) => setExperimentId(e.target.value)} label="Experiment" hideLabel />
                        </dd>
                        :
                        <>
                            {experimentId && experimentId !== -1 &&
                                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                    <Link href={`/experiments/${experimentId}`} className="underline text-sky-600">
                                        {experimentName}
                                    </Link>
                                </dd>
                            }
                            {!experimentId || experimentId === -1 &&
                                <dd className="mt-1 text-sm text-gray-400 sm:col-span-2 sm:mt-0">
                                    Not added to any experiment
                                </dd>
                            }
                        </>
                    }
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
                {result?.scores.map(score => (
                    <div key={score.type} className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                        <dt className="text-sm font-medium text-gray-500">{score.type}</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{score.value}</dd>
                    </div>
                ))}
            </dl>
        </>
    )
}