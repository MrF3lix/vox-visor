import { ListHeader } from "./list-header";

export const List = ({ title, description, action, children }) => (
    <div className="flex flex-col">
        <ListHeader
            title={title}
            description={description}
            action={action}
        />
        {children}
    </div>
)