import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import styles from "@/src/widgets/signIn/Auth.module.css";
import Image from "next/image";
import eyeOffPng from "@/src/assets/icon/eye-off.png";
import eyeOnPng from "@/src/assets/icon/eye-on.png";
import SocialLogin from "@/src/components/SocialLogin/SocialLogin";
import Input from "@/src/components/Input/Input";
import { signUpSchema } from "@/src/utils/validation";
import { checkEmailAvailability, userSignInData } from "@/src/fetchUtils";
import { useRouter } from "next/router";
import AuthIconButton from "@/src/components/AuthIconButton/AuthIconButton";

export interface SignUpFormInputs extends SignInFormInputs {
  confirmPassword: string;
}

const SignUpForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    trigger,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<SignUpFormInputs>({
    resolver: zodResolver(signUpSchema),
  });

  const router = useRouter();

  const onSubmit = async (signInData: SignUpFormInputs) => {
    const isUsableNickname = await checkEmailAvailability(signInData.email);
    if (!isUsableNickname) {
      setError("email", { type: "manual", message: "이미 사용 중인 이메일입니다." });
      return;
    }
    router.push("/folder");
  };

  // 비밀번호 아이콘 토글
  const ToggleShowHideIcon = () => {
    setShowPassword((prev) => !prev);
  };

  // 비밀번호 확인 아이콘 토글
  const ToggleConfirmShowHideIcon = () => {
    setShowConfirmPassword((prev) => !prev);
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
      {/* 비밀번호 */}
      <div className={`${styles.loginDiv} inputLoginForm01`}>
        <label htmlFor="password">비밀번호</label>
        <div className="inputIconDiv">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            className={styles.passwordInput}
            placeholder="영문, 숫자를 조합해 8자 이상 입력해 주세요."
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
      {/* 비밀번호 확인 */}
      <div className={`${styles.loginDiv} inputLoginForm01`}>
        <label htmlFor="confirmPassword">비밀번호 확인</label>
        <div className="inputIconDiv">
          <Input
            id="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            className={styles.passwordInput}
            placeholder="비밀번호와 일치하는 값을 입력해 주세요."
            register={register("confirmPassword")}
            onBlur={() => trigger("confirmPassword")}
          />
          <AuthIconButton
            type="button"
            showPassword={showConfirmPassword}
            ToggleShowHideIcon={ToggleConfirmShowHideIcon}
          >
            <Image
              src={showConfirmPassword ? eyeOnPng : eyeOffPng}
              alt={showConfirmPassword ? "비밀번호 숨기기" : "비밀번호 숨기기"}
            />
          </AuthIconButton>
        </div>
        {errors.confirmPassword && (
          <div className={styles.loginCaution}>{errors.confirmPassword.message}</div>
        )}
      </div>
      <button className="submitButton widthFull btnForm01" type="submit">
        로그인
      </button>
      <SocialLogin />
    </form>
  );
};

export default SignUpForm;
