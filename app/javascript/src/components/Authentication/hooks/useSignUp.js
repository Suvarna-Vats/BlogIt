import { useCallback } from "react";

import { useHistory } from "react-router-dom";
import routes from "routes";
import { useCreateUser } from "src/hooks/useUser";

const useSignUp = () => {
  const history = useHistory();
  const { mutateAsync: createUser, isLoading } = useCreateUser();

  const handleSubmit = useCallback(
    async values => {
      const payload = {
        name: values.name?.trim(),
        email: values.email?.trim(),
        password: values.password,
        password_confirmation: values.passwordConfirmation,
      };

      await createUser(payload);
      history.push(routes.auth.login);
    },
    [createUser, history]
  );

  return { handleSubmit, isLoading };
};

export default useSignUp;
