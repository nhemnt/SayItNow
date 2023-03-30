

import { useQuery } from '@tanstack/react-query';
import {upvote, downvote, responsesQueryKey, getResponses} from './helper';

export const useUpovote = (id: string, config = {}) => {
    return useQuery(
      ["upvote", id],
      () => upvote(id),
      {
        ...config,
        enabled: false
      }
    );
  };

  export const  useDownvote = (id: string,  config = {}) => {
    return useQuery(
      ["downvote", downvote],
      () => downvote(id),
      {
        ...config,
        enabled: false
      }
    );
  };
