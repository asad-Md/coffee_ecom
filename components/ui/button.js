import * as React from "react"

const Button = React.forwardRef(({ className, ...props }, ref) => (
  <button
    ref={ref}
    className="inline-flex items-center justify-center rounded-md bg-black px-4 py-2 text-sm font-semibold text-white hover:bg-gray-900 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
    {...props}
  />
))
Button.displayName = "Button"

export { Button }