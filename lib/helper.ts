import axiosInstance from "./axios";

export const getResponses = (page = 1) =>
  axiosInstance.get(`/api/response?page=${page}`).then(({ data }) => data);
export const responsesQueryKey = ["responses"];

export const upvote = (id: string) =>
  axiosInstance
    .patch(`/api/response/${id}`, {
      upvote: true,
    })
    .then(({ data }) => data);

export const downvote = (id: string) =>
  axiosInstance
    .patch(`/api/response/${id}`, {
      downvote: true,
    })
    .then(({ data }) => data);

export const generate = (response: string) =>
  axiosInstance
    .post("/api/generate", {
      response,
    })
    .then(({ data }) => data);
