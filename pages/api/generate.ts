// import { Ratelimit } from "@upstash/ratelimit";
import type { NextApiRequest, NextApiResponse } from "next";
// import redis from "../../utils/redis";
// import { getServerSession } from "next-auth/next";
// import { authOptions } from "./auth/[...nextauth]";
import prisma from "../../lib/prismadb";
type Data = string;
interface ExtendedNextApiRequest extends NextApiRequest {
  body: {
    response: string;
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
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {

    const content = req.body.response;
    // console.log(content);
    await prisma.response.create({
      data: {
        content,
      },
    });
    res
      .status(200)
      .json("ok");
  }
  // Check if user is logged in
  // const session = await getServerSession(req, res, authOptions);
  // if (!session || !session.user) {
  //   return res.status(500).json("Login to upload.");
  // }

  // Rate Limiting by user email
  // if (ratelimit) {
  //   const identifier = session.user.email;
  //   const result = await ratelimit.limit(identifier!);
  //   res.setHeader("X-RateLimit-Limit", result.limit);
  //   res.setHeader("X-RateLimit-Remaining", result.remaining);

  //   // Calcualte the remaining time until generations are reset
  //   const diff = Math.abs(
  //     new Date(result.reset).getTime() - new Date().getTime()
  //   );
  //   const hours = Math.floor(diff / 1000 / 60 / 60);
  //   const minutes = Math.floor(diff / 1000 / 60) - hours * 60;

  //   if (!result.success) {
  //     return res
  //       .status(429)
  //       .json(
  //         `Your generations will renew in ${hours} hours and ${minutes} minutes. Email nhemnt@gmail.com if you have any questions.`
  //       );
  //   }
  // }

}
