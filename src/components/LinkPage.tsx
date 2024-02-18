"use client";

import { Link } from "@prisma/client";
import { redirect } from "next/navigation";
import { FC, useEffect } from "react";
import { set } from "zod";
import { api } from "~/trpc/react";

interface LinkPageProps {
  link: Link;
}

const LinkPage: FC<LinkPageProps> = ({ link }) => {
  const visited = localStorage.getItem(link.id);

  const { mutate, isSuccess } = api.link.updateCount.useMutation({});

  useEffect(() => {
    if (visited) {
      redirect(link.url);
    } else {
      mutate({ linkId: link.id });
    }
  }, []);

  return <div>ss</div>;
};

export default LinkPage;
