"use client";

import React, { useActionState, useEffect } from "react";
import { actionFunction } from "@/utils/types";
import { toast } from "sonner";

const initialState = {
  message: "",
};

const FormContainer = ({
  action,
  children,
}: {
  action: actionFunction;
  children: React.ReactNode;
}) => {
  const [state, formAction] = useActionState(action, initialState);

  useEffect(() => {
    if (state.message) {
      toast(state.message, {
        position: "top-right",
        action: {
          label: "x",
          onClick: () => {
            toast.dismiss();
          },
        },
      });
    }
  }, [state]);

  return <form action={formAction}>{children}</form>;
};

export default FormContainer;
