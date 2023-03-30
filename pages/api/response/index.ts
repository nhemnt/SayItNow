// import { Ratelimit } from "@upstash/ratelimit";
import type { NextApiRequest, NextApiResponse } from "next";
// import redis from "../../utils/redis";
// import { getServerSession } from "next-auth/next";
// import { authOptions } from "./auth/[...nextauth]";
import prisma from "../../../lib/prismadb";
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
  res: NextApiResponse<any>
) {
  if (req.method === "POST") {


  }else if(req.method === "GET"){
    const PAGE_SIZE = 10; // or any other value you choose
    const { page = 1 } : any = req.query;
    const totalResponses = await prisma.response.count({
      where: { approved: true },
    });
    const maxPage = Math.ceil(totalResponses / PAGE_SIZE);
  
    const responses = await prisma.response.findMany({
      where: { approved: true },
      orderBy: [
        { boosted: 'desc' },
        { votes: 'desc' },
        { createdAt: 'asc' },
      ],
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
    });
  
    const result = {
      currentPage: page,
      maxPage: maxPage,
      responses: responses,
    };
    res
      .status(200)
      .json({data: result});
  }
  

}
