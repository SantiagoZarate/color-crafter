import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { ClipboardIcon } from "../icons";

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast
            key={id}
            {...props}
            className="bg-stone-900 border-stone-600 text-stone-200"
          >
            <div className="flex items-center gap-4">
              <ClipboardIcon />
              <div className="flex flex-col gap-2">
                {title && <ToastTitle>{title}</ToastTitle>}
                {description && (
                  <ToastDescription className="text-start text-stone-400">
                    {description}
                  </ToastDescription>
                )}
              </div>
            </div>
            {action}
            <ToastClose className="text-stone-100" />
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}
