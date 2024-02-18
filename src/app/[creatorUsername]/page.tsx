import { notFound, redirect } from "next/navigation";
import CreatorProfile from "~/components/CreatorProfile";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";

interface PageProps {
  params: {
    creatorUsername: string;
  };
}

const Page = async ({ params }: PageProps) => {
  const { creatorUsername } = params;

  const session = await getServerAuthSession();
  const { user } = session ?? {};

  if (!user || !user.id) redirect(`/auth-callback?origin=${creatorUsername}`);

  const creator = await api.creator.getCreator.query({
    username: creatorUsername,
  });

  if (!creator) notFound();

  return <CreatorProfile user={user} creator={creator} />;
};

export default Page;
