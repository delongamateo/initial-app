"use client";

import { Link as LinkType } from "@prisma/client";
import Link from "next/link";
import { FC } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { api } from "~/trpc/react";

interface LinkCardProps {
  link: LinkType;
}

const LinkCard: FC<LinkCardProps> = ({ link }) => {
  const { data } = api.creator.getCreator.useQuery({ id: link.creatorId });

  return (
    <Link href={`/${data?.username}/${link.id}`}>
      <Card>
        <CardHeader>
          <CardTitle>{data?.username}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{link.clicks}</p>
        </CardContent>
      </Card>
    </Link>
  );
};

export default LinkCard;
