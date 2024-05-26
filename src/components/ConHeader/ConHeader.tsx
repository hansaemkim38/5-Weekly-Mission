import styles from "@/src/components/ConHeader/ConHeader.module.css";
import Image from "next/image";

function ConHeader({
  folderData,
  folderInfo,
}: {
  folderData: SharedAuthData | null;
  folderInfo: {
    userId: number;
    name: string;
  };
}) {
  return (
    <div className={styles.conHeaderWrap}>
      <div className={styles.conHeader}>
        {folderData?.imageSource && (
          <Image width={60} height={60} src={folderData?.imageSource} alt={folderData?.name} />
        )}
        <h3 className={styles.h3}>{folderData?.name}</h3>
      </div>
      <h2 className={styles.h2}>{folderInfo.name}</h2>
    </div>
  );
}

export default ConHeader;
