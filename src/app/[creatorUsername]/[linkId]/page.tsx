import { notFound, redirect } from "next/navigation";
import CreatorProfile from "~/components/CreatorProfile";
import LinkPage from "~/components/LinkPage";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";

interface PageProps {
  params: {
    linkId: string;
  };
}

const Page = async ({ params }: PageProps) => {
  const { linkId } = params;

  const link = await api.link.getLink.query({
    linkId,
  });

  if (!link) notFound();

  return <LinkPage link={link} />;
};

export default Page;
