import styles from "@/src/components/Profile/Profile.module.css";
import Image from "next/image";

function Profile({ user }: { user: loginFetchData }) {
  const { name, email, imageSource } = user;
  return (
    <div className={styles.headerProfile}>
      <div className={styles.headerImg}>
        <Image width={28} height={28} src={imageSource} alt={name} />
      </div>
      <div className={styles.headerEmail}>{email}</div>
    </div>
  );
}

export default Profile;
