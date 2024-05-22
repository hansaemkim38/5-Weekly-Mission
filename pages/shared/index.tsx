import React from "react";
import ConHeader from "@/src/components/ConHeader/ConHeader";
import Search from "@/src/components/Search/Search";
import CardList from "@/src/components/CardList/CardList";
import { useEffect, useState } from "react";
import { fetchData } from "@/src/fetchUtils/index";
import Header from "@/src/components/Header/Header";
import Footer from "@/src/components/Footer/Footer";

interface FetchSharedResponse {
  cardListData: FolderLinks[];
  folderData: FolderData;
}

function Shared() {
  const [folderData, setFolderData] = useState<FolderData | null>(null);
  const [cardListData, setCardListData] = useState<FolderLinks[]>([]);
  const [searchInputValue, setSearchInputValue] = useState<string>("");

  useEffect(() => {
    async function fetchDataAndSetState() {
      const response: FetchSharedResponse | undefined = await fetchData();
      if (response) {
        const { cardListData, folderData } = response;
        setFolderData(folderData);
        setCardListData(cardListData);
      }
    }
    fetchDataAndSetState();
  }, []);

  const onChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInputValue(e.target.value);
  };

  return (
    <>
      <Header />
      <div className="content-wrap">
        <ConHeader folderData={folderData} />
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
