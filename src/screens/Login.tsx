import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useProfileManagerContext } from "../contexts/ProfileManagerProvider";
import { useNavigate } from "react-router";
import { useState } from "react";
import ResponseType from "../types/ResponseType";
import { FormInputClasses, PressableClasses } from "../styles/UIClasses";
import Header from "../components/Header"

const LoginFormSchema = z
  .object({
    username: z
      .string()
      .min(1, "Forneça um nome de usuário"),
    password: z
      .string()
      .min(1, "Forneça uma senha para seu usuário")
  });

type LoginFormData = z.infer<typeof LoginFormSchema>;

const LoginForm = () => {
  const [response, setResponse] = useState<ResponseType>()
  const { changeProfile } = useProfileManagerContext()
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    mode: 'all',
    resolver: zodResolver(LoginFormSchema),
  });
  // console.log(errors)
  const onSubmit = (data: LoginFormData) => {
    // console.log('submit')
    const succeed = changeProfile({ username: data.username, password: data.password, id: 0, active: true })
    setResponse(succeed)
    if (succeed.success) navigate('/profiles')
  };

  return (
    <>
      <Header titulo="Login"/>

      <form onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4">
        <div 
        className="flex flex-col"
        >
          <label htmlFor="username"
            className="font-medium text-sm"
          >
            Username
          </label>
          <input required {...register("username")} className={FormInputClasses}/>
          {errors.username && (
            <span
              className="text-red-500 text-xs"
            >{errors.username.message}</span>
          )}
        </div>
        <div
        className="flex flex-col"
        >
          <label htmlFor="password"
            className="font-medium text-sm"
          >
            Password
          </label>
          <input required type="password" {...register("password")} className={FormInputClasses}/>
          {errors.password && (
            <span
              className="text-red-500 text-xs"
            >{errors.password.message}</span>
          )}
        </div>
        {!response?.success && <span className="text-red-600">{response?.message}</span>}
        <button type="submit" className={PressableClasses}>Logar</button>
      </form>
      
    </>
  );
};

export default LoginForm;
