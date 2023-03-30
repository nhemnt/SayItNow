import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import cx from "classnames";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "@tanstack/react-query";
import { responsesQueryKey, getResponses } from "../lib/helper";
import { useDownvote, useUpovote } from "../lib/hooks";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.5,
    },
  },
};

const PostItem = (props: any) => {
  const [upvote, setUpvote] = useState(false);
  const [downvote, setDownvote] = useState(false);
  const { columnIndex, column, refetchResponse } = props;
  const controls = useAnimation();
  const [ref, inView] = useInView();

  const { refetch: clickUpvote } = useUpovote(column.id, {onSuccess: () => refetchResponse()});
  const { refetch: clickDownVote } = useDownvote(column.id, {onSuccess: () => refetchResponse()});
  const upvoteResponse = () => {
    if (upvote === true) return;
    setUpvote(true);
    setDownvote(false);
    clickUpvote();
  };

  const downVoteResponse = () => {
    if (downvote === true) return;
    setDownvote(true);
    setUpvote(false);
    clickDownVote();
  };
  useEffect(() => {
    if (inView) {
      controls.start("show");
    }
  }, [controls, inView]);

  const item = {
    hidden: {
      opacity: 0,
      y: 50,
      transition: { ease: [0.78, 0.14, 0.15, 0.86] },
    },
    show: {
      opacity: 1,
      y: 0,
      transition: { ease: [0.78, 0.14, 0.15, 0.86] },
    },
  };
  return (
    <motion.li
      variants={item}
      initial="hidden"
      animate={controls}
      ref={ref}
      key={columnIndex}
      className="my-4 hover:scale-105 transition duration-300 ease-in-out"
    >
      <figure className="relative rounded-2xl bg-white p-5 lg:p-6 shadow-xl shadow-slate-900/10 flex flex-row-reverse justify-end">
        <blockquote className="relative pl-2">
          <p className="text-lg tracking-tight text-slate-900">
            {column.content}
          </p>
        </blockquote>
        <figcaption className="relative flex items-center justify-between border-r border-slate-100 pr-2">
          <div className="flex items-center flex-col">
            <button
              className={cx("p-2 border rounded-full", {
                "bg-blue-500 text-white": upvote,
              })}
              onClick={upvoteResponse}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 15l7-7 7 7"
                />
              </svg>
            </button>
            <span className="text-lg font-bold">{Number(column.votes)}</span>
            <button
              className={cx("p-2 border rounded-full", {
                "bg-blue-500 text-white": downvote,
              })}
              onClick={downVoteResponse}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          </div>
        </figcaption>
      </figure>
    </motion.li>
  );
};

export function Testimonials({ initialData }: any) {
  const { data, hasNextPage, fetchNextPage, refetch } = useInfiniteQuery(
    responsesQueryKey,
    ({ pageParam = 1 }) => getResponses(pageParam),
    {
      initialData: { pages: [initialData], pageParams: [1] },
      getNextPageParam: (lastPage, allPages) => {
        if (allPages?.length < lastPage?.data?.maxPage) {
          return allPages.length + 1;
        }
      },
    }
  );
  const fetchMoreData = () => {
    return fetchNextPage();
  };

  const responses: any =
    data?.pages?.flatMap((page) => page?.data?.responses).filter((x) => x) ||
    [];
  return (
    <section
      id="testimonials"
      aria-label="What our customers are saying"
      className="py-10"
    >
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <InfiniteScroll
          dataLength={responses.length}
          next={fetchMoreData}
          hasMore={Boolean(hasNextPage)}
          loader={<h4>Loading...</h4>}
          style={{ overflow: "hidden", padding: "8px" }}
        >
          <motion.ul initial="hidden" animate="show" variants={container}>
            {responses?.map((column: any, columnIndex: string) => (
              <PostItem
                refetchResponse={refetch}
                column={column}
                columnIndex={columnIndex}
                key={column.id}
              />
            ))}
          </motion.ul>
        </InfiniteScroll>
      </div>
    </section>
  );
}
