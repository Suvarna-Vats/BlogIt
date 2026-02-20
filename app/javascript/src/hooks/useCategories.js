import { useMutation, useQuery, useQueryClient } from "react-query";
import { createCategory, fetchCategories } from "src/apis/categories";
import { QUERY_KEYS } from "src/constants/query";

const useFetchCategories = (options = {}) =>
  useQuery({
    queryKey: [QUERY_KEYS.CATEGORIES],
    queryFn: () => fetchCategories(),
    ...options,
  });

const useCreateCategory = (options = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: payload => createCategory(payload),
    onSuccess: async (...args) => {
      await queryClient.invalidateQueries([QUERY_KEYS.CATEGORIES]);
      options.onSuccess?.(...args);
    },
    ...options,
  });
};

export { useCreateCategory, useFetchCategories };
