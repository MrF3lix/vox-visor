import { Button } from "../form/button"

export const ListHeader = ({ title, description, action }) => {
    return (
        <div className="bg-white px-4 py-5 border-b border-gray-200 sm:px-6 rounded-t-md">
            <div className="-ml-4 -mt-4 flex justify-between items-center flex-wrap sm:flex-nowrap">
                <div className="ml-4 mt-4">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">{title}</h3>
                    <p className="mt-1 text-sm text-gray-500">
                        {description}
                    </p>
                </div>
                {action &&
                    <div className="ml-4 mt-4 flex-shrink-0">
                        <Button
                            onClick={action.onClick}
                            disabled={action.disabled}
                            primary
                        >
                            {action.label}
                        </Button>
                    </div>
                }
            </div>
        </div>
    )
}