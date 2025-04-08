"use client";

import { ReloadIcon } from "@radix-ui/react-icons";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SignInButton } from "@clerk/nextjs";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { LuTrash2, LuPen } from "react-icons/lu";

type btnSize = "default" | "lg" | "sm";

type SubmitButtonProps = {
  className?: string;
  text?: string;
  size?: btnSize;
};

const SubmitButton = ({ className, size, text }: SubmitButtonProps) => {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      disabled={pending}
      size={size}
      className={cn("capitalize", className)}
    >
      {pending ? (
        <>
          <ReloadIcon className="mr-2 h-4 w-4 animate-spin"></ReloadIcon> Please
          wait
        </>
      ) : (
        <>{text}</>
      )}
    </Button>
  );
};

export default SubmitButton;

type action = "edit" | "delete";

export const IconButton = ({ actionType }: { actionType: action }) => {
  const { pending } = useFormStatus();

  const renderIcon = () => {
    if (actionType === "edit") {
      return <LuPen></LuPen>;
    } else if (actionType == "delete") {
      return <LuTrash2></LuTrash2>;
    }

    const never: never = actionType;
    throw new Error(`Invalid action type ${never}`);
  };

  return (
    <Button
      type="submit"
      size={"icon"}
      variant={"link"}
      className="p-2 cursor-pointer"
    >
      {pending ? (
        <ReloadIcon className="animate-spin"></ReloadIcon>
      ) : (
        renderIcon()
      )}
    </Button>
  );
};

export const CardSingInButton = () => {
  return (
    <SignInButton mode="modal">
      <Button
        type="button"
        size={"icon"}
        variant={"outline"}
        className="p-2 cursor-pointer"
      >
        <FaRegHeart></FaRegHeart>
      </Button>
    </SignInButton>
  );
};

export const CardSubmitButton = ({ isFavorite }: { isFavorite: boolean }) => {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      size={"icon"}
      variant={"outline"}
      className="p-2 cursor-pointer"
    >
      {pending ? (
        <ReloadIcon className="h-4 w-4 animate-spin"></ReloadIcon>
      ) : isFavorite ? (
        <FaHeart></FaHeart>
      ) : (
        <FaRegHeart></FaRegHeart>
      )}
    </Button>
  );
};
