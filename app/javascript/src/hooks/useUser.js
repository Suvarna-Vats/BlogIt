import { useMutation } from "react-query";
import { createUser } from "src/apis/users";

const useCreateUser = (options = {}) =>
  useMutation({
    mutationFn: payload => createUser(payload),
    ...options,
  });

export { useCreateUser };
