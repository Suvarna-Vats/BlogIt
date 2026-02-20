import { useMutation } from "react-query";
import { createSession, destroySession } from "src/apis/sessions";

const useCreateSession = (options = {}) =>
  useMutation({
    mutationFn: payload => createSession(payload),
    ...options,
  });

const useDestroySession = (options = {}) =>
  useMutation({
    mutationFn: () => destroySession(),
    ...options,
  });

export { useCreateSession, useDestroySession };
