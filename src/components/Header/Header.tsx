import React from "react";
import logoImg from "../../assets/svg/Linkbrary.svg";
import { useEffect, useState } from "react";
import { getFolderUserData } from "../../fetchUtils";
import Profile from "../Profile/Profile";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import styles from "@/src/components/Header/Header.module.css";

function Header() {
  const [user, setUser] = useState<loginFetchData>();
  const location = useRouter();
  const isFolder = location.pathname === "/folder";

  useEffect(() => {
    async function fetchDataAndSetState() {
      const getUserInfo = await getFolderUserData();
      if (getUserInfo) {
        const { data } = getUserInfo;
        const { id, name, email, imageSource } = data[0];
        setUser({ id, name, email, imageSource });
      }
    }
    fetchDataAndSetState();
  }, []);

  return (
    <header className={`${styles.header} ${isFolder ? styles.headerStatic : ""}`}>
      <h1 className={styles.logo}>
        <a href="./">
          <Image fill src={logoImg} alt="Linkbrary" />
        </a>
      </h1>
      {user ? (
        <Profile user={user} />
      ) : (
        <Link href="/signin" className="loginBtn btnForm01">
          로그인
        </Link>
      )}
    </header>
  );
}

export default Header;
