"use client";

import { User } from "next-auth";

import { FC } from "react";
import { api } from "~/trpc/react";
import LinkCard from "./LinkCard";

interface DashboardProps {
  user: User;
}

const Dashboard: FC<DashboardProps> = ({ user }) => {
  const a = user.role;

  const { data, isLoading } = api.link.getLinks.useQuery();

  return (
    <>
      <div className="mt-8 flex flex-col items-start justify-between gap-4 border-b border-gray-200 pb-5 sm:flex-row sm:items-center sm:gap-0">
        <h1 className="mb-3 text-5xl font-bold text-gray-900">Link List</h1>
      </div>
      {data?.map((link, i) => <LinkCard link={link} />)}
    </>
  );
};

export default Dashboard;
