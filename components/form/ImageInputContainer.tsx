"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "../ui/button";
import FormContainer from "./FormContainer";
import ImageInput from "./ImageInput";
import { type actionFunction } from "@/utils/types";
import SubmitButton from "./Button";

type ImageInputContainerProps = {
  image: string;
  name: string;
  action: actionFunction;
  text: string;
  children?: React.ReactNode;
};

const ImageInputContainer = (props: ImageInputContainerProps) => {
  const { image, name, action, text } = props;

  const [isUpdatedFormVisible, setUpdateFormVisible] = useState(false);

  return (
    <div className="mb-8">
      <Image
        src={image}
        alt={name}
        width={200}
        height={200}
        className="rounded object-cover mb-4 w-[200px] h-[200px]"
        priority
      ></Image>
      <Button
        variant={"outline"}
        size={"sm"}
        onClick={() => {
          setUpdateFormVisible((prev) => {
            return !prev;
          });
        }}
      >
        {text}
      </Button>
      {isUpdatedFormVisible && (
        <div className="max-w-md mt-4">
          <FormContainer action={action}>
            {props.children}
            <ImageInput></ImageInput>
            <SubmitButton size="sm" text={text}></SubmitButton>
          </FormContainer>
        </div>
      )}
    </div>
  );
};

export default ImageInputContainer;
