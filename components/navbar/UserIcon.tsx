import { auth, currentUser } from "@clerk/nextjs/server";
import React from "react";
import { LuUser } from "react-icons/lu";

const UserIcon = async () => {
  // const { userId } = await auth(); get userId

  const user = await currentUser();

  const profileImage = user?.imageUrl;

  if (profileImage) {
    return <img src={profileImage} className="w-6 h-6 rounded object-cover" />;
  }

  return (
    <LuUser className="w-6 h-6 bg-primary rounded-full text-white"></LuUser>
  );
};

export default UserIcon;
