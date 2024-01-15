import { getCurrentUser } from "@/actions/getCurrentUser";
import FormWrapper from "@/components/auth/form-wrapper";
import LoginForm from "@/components/auth/login-form";

const Login = async () => {
  const currentUser = await getCurrentUser();
  return (
    <FormWrapper>
      <LoginForm currentUser={currentUser} />
    </FormWrapper>
  );
};

export default Login;
