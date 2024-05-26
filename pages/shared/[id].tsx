import React from "react";
import ConHeader from "@/src/components/ConHeader/ConHeader";
import Search from "@/src/components/Search/Search";
import CardList from "@/src/components/CardList/CardList";
import { useEffect, useState } from "react";
import {
  getSharedData,
  getSharedFolderIdData,
  getSharedFolderUserData,
} from "@/src/fetchUtils/index";
import Header from "@/src/components/Header/Header";
import Footer from "@/src/components/Footer/Footer";
import { useRouter } from "next/router";

interface FetchSharedResponse {
  cardListData: FolderLinks[];
  folderData: FolderData;
}

function Shared() {
  const [folderData, setFolderData] = useState<SharedAuthData | null>(null);
  const [cardListData, setCardListData] = useState<FolderLinks[]>([]);
  const [searchInputValue, setSearchInputValue] = useState<string>("");
  const [userId, setUserId] = useState<number>(0);
  const [folderName, setFolderName] = useState<string>("");
  const router = useRouter();
  const { id } = router.query; // folderId

  // 폴더 이름 id 세팅
  useEffect(() => {
    if (!router.isReady) return;
    async function fetchDataAndSetState() {
      const response = await getSharedFolderIdData(Number(id));
      if (response) {
        const { data } = response;

        setUserId(data[0].userId);
        setFolderName(data[0].name);
      }
    }
    fetchDataAndSetState();
  }, [router, id]);

  // UserId 코드잇 이름정보, 이미지 세팅
  useEffect(() => {
    if (!router.isReady) return;
    async function fetchDataAndSetState() {
      const response = await getSharedFolderUserData(userId);
      if (response) {
        const { data } = response;
        setFolderData(data[0]);
      }
    }
    fetchDataAndSetState();
  }, [userId, router]);

  // 카드정보
  useEffect(() => {
    if (!router.isReady) return;
    async function fetchDataAndSetState() {
      const response = await getSharedData(userId, Number(id));
      if (response) {
        const { data } = response;
        setCardListData(data);
      }
    }
    fetchDataAndSetState();
  }, [id, userId, router]);

  const onChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInputValue(e.target.value);
  };

  return (
    <>
      <Header />
      <div className="content-wrap">
        <ConHeader folderData={folderData} folderName={folderName} />
        <div className="wrap">
          <Search searchInputValue={searchInputValue} onChangeValue={onChangeValue} />
          <CardList cardListData={cardListData} searchInputValue={searchInputValue} />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Shared;
