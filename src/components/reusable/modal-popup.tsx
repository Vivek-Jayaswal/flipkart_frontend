import type React from "react";
import { cn } from "../../utils/cn";
import { Button } from "./button";

type Props = {
  className?: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  children: React.ReactNode;
};

export const Modal = ({ children, isOpen, className, setIsOpen }: Props) => {
  if (!isOpen) return null;
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-[1px]"
            onClick={() => setIsOpen(false)}
          />

          <div
            className={cn(
              "relative z-10 w-full max-w-md rounded-lg bg-white p-8 shadow-2xl",
              className,
            )}
          >
            <Button
              onClick={() => setIsOpen(false)}
              className="absolute -top-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors shadow-lg"
            >
              ✕
            </Button>

            {children}
          </div>
        </div>
      )}
    </>
  );
};

// import { useRef, useEffect } from "react";

// export const Modal = ({ isOpen, setIsOpen, children }: Props) => {
//   const dialogRef = useRef<HTMLDialogElement>(null);

//   useEffect(() => {
//     const dialog = dialogRef.current;
//     if (isOpen) {
//       dialog?.showModal(); // Opens it as a centered modal with backdrop
//     } else {
//       dialog?.close();
//     }
//   }, [isOpen]);

//   return (
//     <dialog
//       ref={dialogRef}
//       onClose={() => setIsOpen(false)}
//       className="m-auto rounded-lg p-0 backdrop:bg-black/50" // "backdrop:" styles the background!
//     >
//       <div className="bg-white p-6 min-w-[300px] relative">
//         <button
//           onClick={() => setIsOpen(false)}
//           className="absolute top-2 right-2 text-gray-500"
//         >
//           ✕
//         </button>
//         {children}
//       </div>
//     </dialog>
//   );
// };
