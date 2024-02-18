import { Creator } from "@prisma/client";
import { User } from "next-auth";
import Image from "next/image";
import { FC } from "react";

import CreateLink from "./CreateLink";

interface CreatorProfileProps {
  user: User;
  creator: Creator;
}

const CreatorProfile: FC<CreatorProfileProps> = ({ user, creator }) => {
  return (
    <>
      <div>
        <Image
          src={user.image ?? ""}
          alt="Avatar"
          width={300}
          height={300}
          className="rounded-xl"
        />
        <h1 className="mb-3 text-5xl font-bold">{user.name}</h1>
        <p>{creator.ocuppation}</p>
        <p>{creator.username}</p>
      </div>
      <div>
        <h2 className="text-3xl font-bold">About me</h2>
        <p>{creator.about}</p>
      </div>
      <div>
        <h2 className="text-3xl font-bold">Categories</h2>
        {creator.categories.map((category) => (
          <p>{category}</p>
        ))}
      </div>
      <CreateLink user={user} creator={creator} />
    </>
  );
};
export default CreatorProfile;
