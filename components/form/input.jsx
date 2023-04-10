export const Input = ({ label, value, defaultValue, onChange, className, disabled = false, ...rest }) => (
    <label className={`text-left ${className}`}>
        {label &&
            <span className="text-gray-600 text-xs">{label}</span>
        }
        <input
            value={value}
            onChange={onChange}
            disabled={disabled}
            className={`
        p-2 border rounded-sm w-full
        bg-gray-50
        text-gray-900 text-sm
        disabled:text-gray-400 disabled:bg-gray-200 disabled:border-gray-200
      `}
            defaultValue={defaultValue}
            {...rest}
        />
    </label>
)