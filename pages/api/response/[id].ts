// import { Ratelimit } from "@upstash/ratelimit";
import type { NextApiRequest, NextApiResponse } from "next";
// import redis from "../../utils/redis";
// import { getServerSession } from "next-auth/next";
// import { authOptions } from "./auth/[...nextauth]";
import prisma from "../../../lib/prismadb";
type Data = string;
interface ExtendedNextApiRequest extends NextApiRequest {
  body: {
    upvote?: boolean;
    downvote?: boolean;
  };
}

// Create a new ratelimiter, that allows 5 requests per day
// const ratelimit = redis
//   ? new Ratelimit({
//       redis: redis,
//       limiter: Ratelimit.fixedWindow(5, "1440 m"),
//       analytics: true,
//     })
//   : undefined;

export default async function handler(
  req: ExtendedNextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method === "PATCH") {
    const { id } = req.query;
    const { upvote = false, downvote = false } = req.body;
    let data: any = { };
    let voteDiff = 0;
    if (upvote) {
      voteDiff += 1;
    }
    if (downvote) {
      voteDiff -= 1;
    }
    await prisma.response.update({
      where: { id: Number(id) },
      data: {
        votes: {
          increment: voteDiff,
        },
      },
    });

    res
    .status(200)
    .json("ok");
  }
}
