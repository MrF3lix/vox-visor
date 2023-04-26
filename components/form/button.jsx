import classNames from "classnames";

export const Button = ({ onClick, disabled = false, primary = false, secondary = false, small = false, dangerous = false, children, ...rest }) => (
  <button
    className={classNames(
      'rounded-md',
      primary ? 'bg-amber-300 hover:bg-amber-200 text-gray-800' : '',
      secondary ? 'bg-gray-200 hover:bg-gray-100 text-gray-800' : '',
      dangerous ? 'bg-red-500 text-gray-100 disabled:bg-red-200 disabled:text-gray-50' : 'disabled:bg-gray-100 disabled:text-gray-300',
      small ? 'px-4 py-2 text-sm' : 'px-6 py-2'
    )}
    onClick={onClick}
    disabled={disabled}
    {...rest}
  >
    {children}
  </button>
)
