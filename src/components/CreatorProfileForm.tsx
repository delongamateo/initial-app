"use client";

import { User } from "next-auth";
import { FC } from "react";
import { api } from "~/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Creator } from "@prisma/client";
import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";

import { Textarea } from "./ui/textarea";

interface CreatorProfileProps {
  user: User;
}

const CreatorProfileForm: FC<CreatorProfileProps> = ({ user }) => {
  const form = useForm<Creator>();

  const { mutate } = api.creator.createCreator.useMutation();

  const onSubmit = async (data: Creator) => {
    console.log(data);
    mutate({
      ...data,
      instagram: "",
      twitter: "",
      website: "",
      categories: [],
    });
  };

  return (
    <>
      <div className="flex flex-col gap-8">
        {" "}
        <div className="mt-8 flex flex-col items-start justify-between gap-4 border-b border-gray-200 pb-5 sm:flex-row sm:items-center sm:gap-0">
          <h1 className="mb-3 text-5xl font-bold ">Creator Profile</h1>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display username.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="ocuppation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ocuppation</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display Ocuppation.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="about"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>About me</FormLabel>
                  <FormControl>
                    <Textarea placeholder="shadcn" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>
    </>
  );
};

export default CreatorProfileForm;
