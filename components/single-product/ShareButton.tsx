"use client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "../ui/button";
import { LuShare2 } from "react-icons/lu";

import {
  TwitterShareButton,
  EmailShareButton,
  LinkedinShareButton,
  TwitterIcon,
  EmailIcon,
  LinkedinIcon,
  FacebookShareButton,
  FacebookIcon,
} from "react-share";

const ShareButton = ({
  productId,
  name,
}: {
  productId: string;
  name: string;
}) => {
  const url = process.env.NEXT_PUBLIC_WEBSITE_URL;

  const share = `${url}/products/${productId}`;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant={"outline"} size={"icon"} className="p-2">
          <LuShare2></LuShare2>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        side="top"
        align="end"
        sideOffset={10}
        className="flex items-center gap-x-2 justify-center w-full"
      >
        <TwitterShareButton url={share} title={name}>
          <TwitterIcon size={32} round></TwitterIcon>
        </TwitterShareButton>

        <FacebookShareButton url={share} title={name}>
          <FacebookIcon size={32} round></FacebookIcon>
        </FacebookShareButton>

        <EmailShareButton url={share} title={name}>
          <EmailIcon size={32} round></EmailIcon>
        </EmailShareButton>
      </PopoverContent>
    </Popover>
  );
};

export default ShareButton;
