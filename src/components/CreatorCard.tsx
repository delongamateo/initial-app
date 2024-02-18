import { Creator } from "@prisma/client";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

const CreatorCard = ({ creator }: { creator: Creator }) => {
  return (
    <Link href={`/${creator.username}`}>
      <Card>
        <CardHeader>
          <CardTitle>{creator.username}</CardTitle>
          <CardDescription>{creator.ocuppation}</CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
};

export default CreatorCard;
