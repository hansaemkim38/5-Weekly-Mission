import Image from "next/image";
import styles from "@/src/widgets/signIn/Auth.module.css";
import logoSvg from "@/src/assets/svg/Linkbrary.svg";
import Link from "next/link";
import { useRouter } from "next/router";

function AuthHeader() {
  const router = useRouter();

  return (
    <div className={styles.loginHeader}>
      <h2 className={styles.loginLogo}>
        <Link href="./">
          <Image src={logoSvg} alt="Linkbrary" />
        </Link>
      </h2>
      {router.pathname === "/signin" && (
        <p>
          회원이 아니신가요?
          <Link href="/signup" className="underline">
            회원 가입하기
          </Link>
        </p>
      )}
      {router.pathname === "/signup" && (
        <p>
          이미 회원이신가요?
          <Link href="/signin" className="underline">
            로그인 하기
          </Link>
        </p>
      )}
    </div>
  );
}

export default AuthHeader;
