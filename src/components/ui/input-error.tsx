import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputErrorProps
  extends React.HTMLAttributes<HTMLParagraphElement> {
  message?: string;
}

const InputError = React.forwardRef<HTMLParagraphElement, InputErrorProps>(
  ({ className, message, ...props }, ref) => {
    if (!message) return null;

    return (
      <p
        className={cn("text-sm font-medium text-destructive", className)}
        ref={ref}
        {...props}
      >
        {message}
      </p>
    );
  },
);
InputError.displayName = "InputError";

export { InputError };
export default InputError;
