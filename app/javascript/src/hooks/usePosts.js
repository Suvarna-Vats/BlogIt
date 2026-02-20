import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  createPost,
  destroyPost,
  fetchMyPosts,
  fetchPost,
  fetchPosts,
  updatePost,
} from "src/apis/posts";
import { QUERY_KEYS } from "src/constants/query";

const useFetchPosts = (params = {}, options = {}) =>
  useQuery({
    queryKey: [QUERY_KEYS.POSTS, params],
    queryFn: () => fetchPosts(params),
    keepPreviousData: false,
    ...options,
  });

const useFetchPost = (slug, options = {}) =>
  useQuery({
    queryKey: [QUERY_KEYS.POST, slug],
    queryFn: () => fetchPost(slug),
    enabled: Boolean(slug),
    ...options,
  });

const useFetchMyPosts = (options = {}) =>
  useQuery({
    queryKey: [QUERY_KEYS.MY_POSTS],
    queryFn: () => fetchMyPosts(),
    ...options,
  });

const useCreatePost = (options = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: payload => createPost(payload),
    onSuccess: async (...args) => {
      await queryClient.invalidateQueries([QUERY_KEYS.POSTS]);
      await queryClient.invalidateQueries([QUERY_KEYS.MY_POSTS]);
      options.onSuccess?.(...args);
    },
    ...options,
  });
};

const useUpdatePost = (options = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ slug, payload }) => updatePost(slug, payload),
    onSuccess: async (...args) => {
      await queryClient.invalidateQueries([QUERY_KEYS.POSTS]);
      await queryClient.invalidateQueries([QUERY_KEYS.MY_POSTS]);
      await queryClient.invalidateQueries([QUERY_KEYS.POST]);
      options.onSuccess?.(...args);
    },
    ...options,
  });
};

const useDestroyPost = (options = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: slug => destroyPost(slug),
    onSuccess: async (...args) => {
      await queryClient.invalidateQueries([QUERY_KEYS.POSTS]);
      await queryClient.invalidateQueries([QUERY_KEYS.MY_POSTS]);
      await queryClient.invalidateQueries([QUERY_KEYS.POST]);
      options.onSuccess?.(...args);
    },
    ...options,
  });
};

export {
  useCreatePost,
  useDestroyPost,
  useFetchMyPosts,
  useFetchPost,
  useFetchPosts,
  useUpdatePost,
};
