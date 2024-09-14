"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import ImageUploadButton from "../upload-image-button";
import LogOutButton from "./logout-button";
import { useState } from "react";

export default function PerfilImg({ session }: any) {
  const [imageUrl, setImageUrl] = useState<string | null>(
    session?.user?.urlImage,
  );

  const handleImageUpload = (newImageUrl: any) => {
    setImageUrl(newImageUrl);
  };

  return (
    <Popover>
      <PopoverTrigger>
        <Avatar>
          {imageUrl !== null ? (
            <AvatarImage src={imageUrl} />
          ) : (
            <AvatarImage src="avatar.png" />
          )}
          <AvatarFallback className="text-black">
            {session.user.username.slice(0, 2)}
          </AvatarFallback>
        </Avatar>
      </PopoverTrigger>
      <PopoverContent className="mr-10 mt-4 flex flex-col justify-center md:w-96">
        {imageUrl !== null ? (
          <img src={imageUrl} alt="Avatar" />
        ) : (
          <img src="avatar.png" alt="Avatar" />
        )}
        <div className="flex flex-wrap justify-center gap-4 md:justify-between">
          <ImageUploadButton onImageUpload={handleImageUpload} />
          <LogOutButton />
        </div>
      </PopoverContent>
    </Popover>
  );
}
