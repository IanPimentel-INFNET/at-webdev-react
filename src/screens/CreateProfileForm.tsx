import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useProfileManagerContext } from "../contexts/ProfileManagerProvider";
import { useNavigate } from "react-router";
import { FormInputClasses, PressableClasses } from "../styles/UIClasses";
import Header from "../components/Header"
import ImageUploader from "../components/ImageUploader";

const createProfileFormSchema = z
  .object({
    image_uri: z.string().optional(),
    descricao: z.string().optional(),
    username: z
      .string({ required_error: "Forneça um nome de usuário" })
      .min(4, "O nome de usuário precisa de ao menos 4 caracteres"),
    password: z
      .string({ required_error: "Forneça uma senha para seu usuário" })
      .min(8, "A senha precisa de ao menos 8 caracteres"),
    confirm_password: z.string({ required_error: "Confirme a senha" }),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "As senhas não coincidem",
    path: ["confirm_password"],
  });

type createProfileFormData = z.infer<typeof createProfileFormSchema>;

const CreateProfileForm = () => {
  const { addProfile } = useProfileManagerContext()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    watch
  } = useForm<createProfileFormData>({
    mode: 'all',
    resolver: zodResolver(createProfileFormSchema),
  });

  const username = watch('username', '')

  const onSubmit = (data: createProfileFormData) => {
    console.log(data)
    addProfile({ id: 0, username: data.username, password: data.password, descricao: data.descricao, profileImg: data.image_uri,active: false })
    navigate("/profiles")
  };

  return (
    <>
      <Header titulo="Crie um perfil" subTitulo='Você pode usar essas informações para acessar o perfil por outra aba do navegador!' />
      <form onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4">
        <Controller
          control={control}
          name="image_uri"
          render={({ field: { onChange } }) => (
            <div>
              <label htmlFor="image_uri" className="font-medium text-sm">Profile Image</label>
              <ImageUploader
                onImageSelected={onChange}
                initial={username[0]?.toUpperCase()}
              />
            </div>
          )}
        />
        <div className="flex flex-col">
          <label htmlFor="username" className="font-medium text-sm">Username</label>
          <input className={FormInputClasses} required {...register("username")} />
          {errors.username && <span className="text-red-500 text-xs">{errors.username.message}</span>}
        </div>
        <div className="flex flex-col">
          <label htmlFor="descricao" className="font-medium text-sm">Description</label>
          <textarea className={FormInputClasses+' text-pretty min-h-0 max-h-24'} maxLength={255} {...register("descricao")} />
          {errors.descricao && <span className="text-red-500 text-xs">{errors.descricao.message}</span>}
        </div>
        <div className="flex flex-col">
          <label htmlFor="password" className="font-medium text-sm">Password</label>
          <input className={FormInputClasses} required type="password" {...register("password")} />
          {errors.password && <span className="text-red-500 text-xs">{errors.password.message}</span>}
        </div>
        <div className="flex flex-col">
          <label htmlFor="confirm_password" className="font-medium text-sm">Confirm password</label>
          <input className={FormInputClasses} required type="password" {...register("confirm_password")} />
          {errors.confirm_password && (
            <span className="text-red-500 text-xs">{errors.confirm_password.message}</span>
          )}
        </div>
        <button type="submit" className={PressableClasses}>Criar</button>
      </form>
    </>
  );
};

export default CreateProfileForm;
