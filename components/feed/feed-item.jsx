import classNames from 'classnames'

export const FeedItem = ({ event, eventIdx, itemCount }) => {
    return (
        <li>
            <div className="relative pb-8">
                {eventIdx !== itemCount - 1 ? (
                    <span className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true" />
                ) : null}
                <div className="relative flex space-x-3">
                    <div>
                        <span
                            className={classNames(
                                event.iconBackground,
                                'h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white'
                            )}
                        >
                            <event.icon className="h-5 w-5 text-white" aria-hidden="true" />
                        </span>
                    </div>
                    <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                        <div>
                            <p className="text-sm text-gray-500">
                                {event.content}{' '}
                                <span className="font-medium text-gray-900">
                                    {event.target}
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </li>
    )
}