import { redirect } from "next/navigation";
import Creators from "~/components/Creators";
import Dashboard from "~/components/Dashboard";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";

const Page = async () => {
  const session = await getServerAuthSession();
  const { user } = session ?? {};

  if (!user || !user.id) redirect("/auth-callback?origin=dashboard");

  return <Creators user={user} />;
};

export default Page;
