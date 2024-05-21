import styles from "@/src/components/FolderTabList/Button.module.css";

interface buttonData {
  data: {
    id: number;
    name: string;
  };
  onClickButton: (id: number, name: string) => void;
  folderDataId: number;
}

function Button({ data, onClickButton, folderDataId }: buttonData) {
  const { id, name } = data;

  return (
    <button
      className={
        folderDataId === id ? `${styles.select} ${styles.tabListBtn}` : `${styles.tabListBtn}`
      }
      onClick={() => onClickButton(id, name)}
    >
      {name}
    </button>
  );
}

export default Button;
