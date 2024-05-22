import styles from "@/src/components/CardList/CardList.module.css";
import Card from "../Card/Card";
import { useRouter } from "next/router";

function renderCardList(cardData: FolderLinks[] | UserFolderdataList[] | undefined) {
  if (!cardData) return null;

  return (
    <ul className={styles.cardList}>
      {cardData.map((card) => {
        return <Card card={card} key={card.id} />;
      })}
    </ul>
  );
}

function CardList({
  cardListData,
  userFolderDataList,
  searchInputValue,
}: {
  cardListData?: FolderLinks[];
  userFolderDataList?: UserFolderdataList[];
  searchInputValue: string;
}) {
  const router = useRouter();
  const isFolder = router.pathname.includes("/folder");
  const searchValue = searchInputValue.toLowerCase();

  const filteredCardData = () => {
    if (userFolderDataList && searchValue === "") userFolderDataList;
    if (cardListData && searchValue === "") cardListData;

    // folder page
    if (userFolderDataList) {
      return userFolderDataList.filter((card) => {
        return (
          card.title?.includes(searchValue) ||
          card.url.includes(searchValue) ||
          card.description?.includes(searchValue)
        );
      });
    }

    // shared page
    if (cardListData) {
      return cardListData.filter((card) => {
        return (
          card.title?.includes(searchValue) ||
          card.url.includes(searchValue) ||
          card.description?.includes(searchValue)
        );
      });
    }
  };

  const renderFilteredCardData = filteredCardData();

  return (
    <>
      {cardListData && !isFolder && renderCardList(renderFilteredCardData)}
      {userFolderDataList && isFolder && renderCardList(renderFilteredCardData)}
      {renderFilteredCardData?.length === 0 && (
        <div className={styles.emptyLink}>저장된 링크가 없습니다.</div>
      )}
    </>
  );
}

export default CardList;
