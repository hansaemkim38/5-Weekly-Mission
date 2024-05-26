import Search from "@/src/components/Search/Search";
import React, { useEffect, useState } from "react";
import AddLinkForm from "@/src/components/AddLinkForm/AddLinkForm";
import { getFolderIdLinks, getSharedFolderIdData } from "@/src/fetchUtils/index";
import FolderTabList from "@/src/components/FolderTabList/FolderTabList";
import CardList from "@/src/components/CardList/CardList";
import useModal from "@/src/hooks/useModal";
import ModalContext from "@/src/components/Modal/ModalContext";
import ModalContainer from "@/src/components/Modal/ModalContainer";
import Header from "@/src/components/Header/Header";
import Footer from "@/src/components/Footer/Footer";
import { useRouter } from "next/router";
import { getAccessToken } from "@/src/utils/constants";

function Folder() {
  const [folderTabDataList, setFolderTabDataList] = useState<FolderTabDataList[]>([]);
  const [userFolderDataList, setUserFolderDataList] = useState<UserFolderdataList[]>();

  const { isOpen, openModal, closeModal } = useModal();
  const [modalType, setModalType] = useState("");
  const [cardUrl, setCardUrl] = useState("");
  const [folderTabName, setFolderTabName] = useState<string | null>("");
  const [searchInputValue, setSearchInputValue] = useState<string>("");
  const [folderDataId, setFolderDataId] = useState<number>(0);
  const [name, setName] = useState<string>("");

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const token = getAccessToken();
    if (!token) {
      router.push("/signin");
    }
  }, [router]);

  useEffect(() => {
    if (!router.isReady) return;

    async function fetchDataAndSetState() {
      const folderTabDataListPromise = getSharedFolderIdData();
      const userFolderDataListPromise = getFolderIdLinks(Number(id));

      const [fetchedFolderTabDataList, fetchedUserFolderDataList] = await Promise.all([
        folderTabDataListPromise,
        userFolderDataListPromise,
      ]);

      fetchedFolderTabDataList.data.folder.filter((item: FolderTabDataList) => {
        if (item.id === Number(id)) {
          setName(item.name);
        }
      });
      setFolderTabDataList(fetchedFolderTabDataList.data.folder);
      setUserFolderDataList(fetchedUserFolderDataList?.data.folder);
      setFolderDataId(Number(id));
    }
    fetchDataAndSetState();
  }, [id, router]);

  const onChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInputValue(e.target.value);
  };

  return (
    <>
      <Header setFolderDataId={setFolderDataId} />
      <div className="content-wrap">
        <ModalContext.Provider
          value={{ isOpen, openModal, closeModal, setModalType, setCardUrl, folderDataId }}
        >
          <AddLinkForm />
          <ModalContainer
            modalType={modalType}
            folderTabDataList={folderTabDataList}
            cardUrl={cardUrl}
            folderTabName={folderTabName}
          />
          <div className="wrap">
            <Search searchInputValue={searchInputValue} onChangeValue={onChangeValue} />
            <FolderTabList
              folderTabDataList={folderTabDataList}
              setUserFolderDataList={setUserFolderDataList}
              setFolderTabName={setFolderTabName}
              name={name}
              setName={setName}
            />
            <CardList userFolderDataList={userFolderDataList} searchInputValue={searchInputValue} />
          </div>
        </ModalContext.Provider>
      </div>
      <Footer />
    </>
  );
}

export default Folder;
