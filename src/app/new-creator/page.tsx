import { redirect } from "next/navigation";
import CreatorProfile from "~/components/CreatorProfileForm";
import Dashboard from "~/components/Dashboard";
import { getServerAuthSession } from "~/server/auth";

const Page = async () => {
  const session = await getServerAuthSession();
  const { user } = session ?? {};

  if (!user || !user.id) redirect("/auth-callback?origin=new-creator");

  if (!user) redirect("/auth-callback?origin=new-creator");

  return <CreatorProfile user={user} />;
};

export default Page;
