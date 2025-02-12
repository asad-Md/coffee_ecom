import * as React from "react"
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog"

const AlertDialog = AlertDialogPrimitive.Root
const AlertDialogTrigger = AlertDialogPrimitive.Trigger

const AlertDialogContent = React.forwardRef(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Portal>
    <AlertDialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" />
    <AlertDialogPrimitive.Content ref={ref} className="fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 space-y-4 rounded-lg bg-white p-6 shadow-lg" {...props} />
  </AlertDialogPrimitive.Portal>
))
AlertDialogContent.displayName = "AlertDialogContent"

const AlertDialogHeader = ({ className, ...props }) => (
  <div className="flex flex-col space-y-2 text-center sm:text-left" {...props} />
)
AlertDialogHeader.displayName = "AlertDialogHeader"

const AlertDialogTitle = React.forwardRef(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Title ref={ref} className="text-lg font-semibold" {...props} />
))
AlertDialogTitle.displayName = "AlertDialogTitle"

const AlertDialogDescription = React.forwardRef(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Description ref={ref} className="text-sm text-gray-500" {...props} />
))
AlertDialogDescription.displayName = "AlertDialogDescription"

const AlertDialogFooter = ({ className, ...props }) => (
  <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2" {...props} />
)
AlertDialogFooter.displayName = "AlertDialogFooter"

const AlertDialogAction = React.forwardRef(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Action ref={ref} className="inline-flex h-10 items-center justify-center rounded-md bg-black px-4 py-2 text-sm font-semibold text-white hover:bg-gray-900 focus:outline-none" {...props} />  
))
AlertDialogAction.displayName = "AlertDialogAction"

export {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
}