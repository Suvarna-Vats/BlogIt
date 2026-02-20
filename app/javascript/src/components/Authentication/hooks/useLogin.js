import { useCallback } from "react";

import { useHistory } from "react-router-dom";
import routes from "routes";
import { setAuthHeaders } from "src/apis/axios";
import { useCreateSession } from "src/hooks/useSessions";
import { setUserDataToStorage } from "utils/storage";

const useLogin = () => {
  const history = useHistory();
  const { mutateAsync: createSession, isLoading } = useCreateSession();

  const handleSubmit = useCallback(
    async values => {
      const payload = {
        email: values.email?.trim(),
        password: values.password,
      };

      const response = await createSession(payload);
      setUserDataToStorage(response?.data);
      setAuthHeaders();
      history.push(routes.blogs.index);
    },
    [createSession, history]
  );

  return { handleSubmit, isLoading };
};

export default useLogin;
