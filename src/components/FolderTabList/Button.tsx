import styles from "@/src/components/FolderTabList/Button.module.css";

interface buttonData {
  data: {
    id: number;
    name: string;
  };
  onClickButton: (id: number, name: string) => void;
  checkId: number | null;
}

function Button({ data, onClickButton, checkId }: buttonData) {
  const { id, name } = data;

  return (
    <button
      className={checkId === id ? `${styles.select} ${styles.tabListBtn}` : `${styles.tabListBtn}`}
      onClick={() => onClickButton(id, name)}
    >
      {name}
    </button>
  );
}

export default Button;
