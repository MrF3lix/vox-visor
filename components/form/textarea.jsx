export const TextArea = ({ label, value, placeholder, disabled, onChange, ...rest }) => (
    <label className="text-left">
        <span className="text-gray-600 text-xs">{label}</span>
        <textarea
            value={value}
            disabled={disabled}
            placeholder={placeholder}
            onChange={onChange}
            {...rest}
            className="
        p-2 border rounded-sm w-full \
        bg-gray-50 \
        text-gray-900 text-sm \
        disabled:text-gray-400 disabled:bg-gray-200 disabled:border-gray-200"
        />
    </label>
)