"use client";

import { Creator } from "@prisma/client";
import { User } from "next-auth";
import { FC } from "react";
import { api } from "~/trpc/react";
import { Button } from "./ui/button";

interface CreateLinkProps {
  user: User;
  creator: Creator;
}

const CreateLink: FC<CreateLinkProps> = ({ user, creator }) => {
  const link = api.link.getLink.useQuery({ creatorId: creator.id });
  const { mutate } = api.link.createLink.useMutation();

  const createLink = () => {
    mutate({
      url: "https://www.example.com",
      creatorId: creator.id,
      userId: user.id,
    });
  };

  return (
    <div>
      <Button onClick={createLink}>Create Link</Button>
    </div>
  );
};

export default CreateLink;
