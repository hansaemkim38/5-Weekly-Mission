import { useCallback, useEffect, useState } from "react";
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
  name,
  setName,
}: IFolderTabList) {
  const router = useRouter();
  const [checkId, setCheckId] = useState<number | null>(null);

  const fetchData = useCallback(
    async (id: number | null) => {
      try {
        const response = id !== null ? await getFolderIdLinks(id) : await getFolderIdLinks();
        const data = response.data.folder;
        setUserFolderDataList(data);
      } catch (e) {
        if (e instanceof Error) {
          alert(e.message);
        }
      }
    },
    [setUserFolderDataList]
  );

  const updateState = useCallback(
    (id: number | null) => {
      setCheckId(id);
      if (id !== null) {
        const folderDataList = folderTabDataList.find((item) => item.id === id);
        if (folderDataList) {
          setName(folderDataList.name);
          setFolderTabName(folderDataList.name);
        } else {
          setName("전체");
        }
      }
    },
    [folderTabDataList, setFolderTabName, setName]
  );

  const onClickButton = useCallback(
    async (id: number, name: string) => {
      if (checkId !== id) {
        updateState(id);
        await fetchData(id);
        router.push(`/folder/${id}`);
      }
    },
    [checkId, router, updateState, fetchData]
  );

  const onClickTotalButton = useCallback(async () => {
    if (checkId !== null) {
      updateState(null);
      await fetchData(null);
      router.push(`/folder`);
    }
  }, [checkId, router, updateState, fetchData]);

  useEffect(() => {
    if (router.isReady) {
      const id = router.query.id ? Number(router.query.id) : null;
      updateState(id);
      fetchData(id);
    }
  }, [router.isReady, router.query.id, folderTabDataList, updateState, fetchData]);

  return (
    <>
      <div className={styles.tabWrap}>
        <ul className={styles.tabListWrap}>
          <li>
            <button
              className={
                checkId === null ? `${styles.select} ${styles.tabListBtn}` : `${styles.tabListBtn}`
              }
              onClick={onClickTotalButton}
            >
              전체
            </button>
          </li>
          {folderTabDataList.map((data) => (
            <li key={data.id}>
              <Button data={data} onClickButton={onClickButton} checkId={checkId} />
            </li>
          ))}
        </ul>
        <FolderAddButton />
      </div>
      <div className={styles.cardTitleWrap}>
        <h3 className={styles.cardTitle}>{checkId ? name : "전체"}</h3>
        {checkId !== null ? <CardTitleIcon /> : null}
      </div>
    </>
  );
}

export default FolderTabList;
