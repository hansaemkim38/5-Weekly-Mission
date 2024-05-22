import { useCallback, useState } from "react";
import { getFolderIdLinks } from "@/src/fetchUtils/index";

import Button from "./Button";
import CardTitleIcon from "../CardTitleIcon/CardTitleIcon";
import FolderAddButton from "./FolderAddButton";
import styles from "@/src/components/FolderTabList/FolderTabList.module.css";
import { useRouter } from "next/router";

function FolderTabList({
  folderTabDataList,
  setUserFolderDataList,
  setFolderTabName,
  folderDataId,
  setFolderDataId,
  name,
  setName,
}: IFolderTabList) {
  const router = useRouter();

  const onClickButton = useCallback(
    async (id: number, name: string) => {
      setFolderDataId(id);
      setName(name);
      setFolderTabName(name);
      try {
        const response = await getFolderIdLinks(id);
        const data = response.data.folder;
        setUserFolderDataList(data);
        router.push(`/folder/${id}`);
      } catch (e) {
        if (e instanceof Error) {
          alert(e.message);
        }
      }
    },
    [setUserFolderDataList, setFolderTabName, setFolderDataId, router]
  );

  const onClickTotalButton = useCallback(async () => {
    setFolderDataId(0);
    try {
      const response = await getFolderIdLinks();
      const data = response.data.folder;
      setUserFolderDataList(data);
      router.push(`/folder`);
    } catch (e) {
      if (e instanceof Error) {
        alert(e.message);
      }
    }
  }, [setUserFolderDataList, setFolderDataId]);
  return (
    <>
      <div className={styles.tabWrap}>
        <ul className={styles.tabListWrap}>
          <li>
            <button
              className={
                folderDataId === 0
                  ? `${styles.select} ${styles.tabListBtn}`
                  : `${styles.tabListBtn}`
              }
              onClick={() => onClickTotalButton()}
            >
              전체
            </button>
          </li>
          {folderTabDataList.map((data) => {
            return (
              <li key={data.id}>
                <Button data={data} onClickButton={onClickButton} folderDataId={folderDataId} />
              </li>
            );
          })}
        </ul>
        <FolderAddButton />
      </div>
      <div className={styles.cardTitleWrap}>
        <h3 className={styles.cardTitle}>{folderDataId === 0 ? "전체" : name}</h3>
        {folderDataId !== null ? <CardTitleIcon /> : null}
      </div>
    </>
  );
}

export default FolderTabList;
