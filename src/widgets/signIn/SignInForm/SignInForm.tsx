import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import styles from "../Auth.module.css";
import Image from "next/image";
import eyeOffPng from "@/src/assets/icon/eye-off.png";
import eyeOnPng from "@/src/assets/icon/eye-on.png";
import SocialLogin from "@/src/components/SocialLogin/SocialLogin";
import Input from "@/src/components/Input/Input";
import { signInSchema } from "@/src/utils/validation";
import { userSignInData } from "@/src/fetchUtils";
import { useRouter } from "next/router";
import AuthIconButton from "@/src/components/AuthIconButton/AuthIconButton";
import { useAuthGuard } from "@/src/hooks/useAuthGuard";

const SignInForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  useAuthGuard();

  const {
    register,
    trigger,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormInputs>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = async (signInData: SignInFormInputs) => {
    const { data } = await userSignInData(signInData);
    localStorage.setItem("accessToken", data.accessToken);
    router.push("/folder");
  };

  const ToggleShowHideIcon = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <form className="loginForm" onSubmit={handleSubmit(onSubmit)}>
      <div className={`${styles.loginDiv} inputLoginForm01`}>
        <label htmlFor="email">이메일</label>
        <Input
          id="email"
          type="email"
          placeholder="이메일을 입력해 주세요."
          className="emailInput"
          register={register("email")}
          onBlur={() => trigger("email")}
        />
        {errors.email && <div className={styles.loginCaution}>{errors.email.message}</div>}
      </div>
      <div className={`${styles.loginDiv} inputLoginForm01`}>
        <label htmlFor="password">비밀번호</label>
        <div className="inputIconDiv">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            className={styles.passwordInput}
            placeholder="비밀번호를 입력해 주세요."
            register={register("password")}
            onBlur={() => trigger("password")}
          />
          <AuthIconButton
            type="button"
            showPassword={showPassword}
            ToggleShowHideIcon={ToggleShowHideIcon}
          >
            <Image
              src={showPassword ? eyeOnPng : eyeOffPng}
              alt={showPassword ? "비밀번호 숨기기" : "비밀번호 숨기기"}
            />
          </AuthIconButton>
        </div>
        {errors.password && <div className={styles.loginCaution}>{errors.password.message}</div>}
      </div>
      <button className="submitButton widthFull btnForm01" type="submit">
        로그인
      </button>
      <SocialLogin />
    </form>
  );
};

export default SignInForm;
