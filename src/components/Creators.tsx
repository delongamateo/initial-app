"use client";
import { User } from "next-auth";
import { FC } from "react";
import { api } from "~/trpc/react";
import CreatorCard from "./CreatorCard";

interface CreatorsProps {
  user: User;
}

const Creators: FC<CreatorsProps> = () => {
  const { data, isLoading } = api.creator.getCreators.useQuery();
  return (
    <div className="flex flex-col gap-8">
      {" "}
      <div className="mt-8 flex flex-col items-start justify-between gap-4 border-b border-gray-200 pb-5 sm:flex-row sm:items-center sm:gap-0">
        <h1 className="mb-3 text-5xl font-bold text-gray-900">Creators List</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {data?.map((creator, i) => <CreatorCard key={i} creator={creator} />)}
      </div>
    </div>
  );
};

export default Creators;
