import { ArchiveBoxArrowDownIcon, CalculatorIcon, CpuChipIcon, InboxArrowDownIcon, LinkIcon, PhoneIcon, RectangleStackIcon, ScissorsIcon } from '@heroicons/react/20/solid'
import { FeedItem } from './feed-item'
import { useMemo } from 'react'

const getTimeLine = config => {
    if (!config) {
        return []
    }

    const preprocessor = "Default"
    const segmenter = config['pipeline_config']['segmenter_class_id']
    const cutter = "Default"
    const model = config['pipeline_config']['model_class_id']
    const merger = config['pipeline_config']['merger_class_id']
    const scorer = "Default"
    const reporter = "Supabase"
    const postprocessor = "Default"

    const timelineItems = [
        {
            id: 1,
            content: 'Preprocessor',
            target: preprocessor,
            icon: InboxArrowDownIcon
        },
        {
            id: 2,
            content: 'Segmenter',
            target: segmenter,
            icon: RectangleStackIcon
        },
        {
            id: 3,
            content: 'Cutter',
            target: cutter,
            icon: ScissorsIcon
        },
        {
            id: 4,
            content: 'Model',
            target: model,
            icon: CpuChipIcon
        },
        {
            id: 5,
            content: 'Merger',
            target: merger,
            icon: LinkIcon
        },
        {
            id: 6,
            content: 'Scorer',
            target: scorer,
            icon: CalculatorIcon
        },
        {
            id: 7,
            content: 'Reporter',
            target: reporter,
            icon: PhoneIcon
        },
        {
            id: 8,
            content: 'Postprocessor',
            target: postprocessor,
            icon: ArchiveBoxArrowDownIcon
        },
    ]


    return timelineItems.map(item => {
        if(item.target === 'Default') {
            return {...item, iconBackground: 'bg-gray-400'}
        }
        return {...item, iconBackground: 'bg-sky-500'}
    })
}

export const Feed = ({ config }) => {
    const timeline = useMemo(() => getTimeLine(config), [config])

    return (
        <div className="flow-root">
            <ul role="list" className="-mb-6">
                {timeline.map((event, eventIdx) => (
                    <FeedItem key={event.id} event={event} eventIdx={eventIdx} itemCount={timeline.length} />
                ))}
            </ul>
        </div>
    )
}