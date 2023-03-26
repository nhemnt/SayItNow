import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import cx from "classnames";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "@tanstack/react-query";
import { responsesQueryKey, getResponses } from "../lib/helper";

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
  const { columnIndex, column } = props;
  const controls = useAnimation();
  const [ref, inView] = useInView();

  const upvoteResponse = () => {
    if (upvote) {
      setUpvote(false);
    } else {
      setUpvote(true);
      setDownvote(false);
    }
  };

  const downVoteResponse = () => {
    if (downvote) {
      setDownvote(false);
    } else {
      setDownvote(true);
      setUpvote(false);
    }
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
              className={cx(
                "p-2 border rounded-full hover:bg-gray-100 ",
                { "bg-blue-500 text-white hover:bg-blue-500": upvote }
              )}
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
            <span className="text-lg font-bold">
              {Number(column.upvotes) - Number(column.downvotes)}
            </span>
            <button className={cx("p-2 border rounded-full hover:bg-gray-100", { "bg-blue-500 text-white hover:bg-blue-500": downvote })} onClick={downVoteResponse}>
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
  const { data, hasNextPage, fetchNextPage } = useInfiniteQuery(
    responsesQueryKey,
    ({ pageParam = 1 }) => getResponses(pageParam),
    {
      initialData: {pages: [initialData], pageParams: [1] },
      getNextPageParam: (lastPage, allPages) => {
        if (allPages.length < lastPage.data.maxPage) {
          return allPages.length + 1;
        }
      },
    }
  );
  const fetchMoreData = () => {
    return fetchNextPage();
  };

  const responses: any =
    data?.pages?.flatMap((page) => page.data.responses) || [];
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
