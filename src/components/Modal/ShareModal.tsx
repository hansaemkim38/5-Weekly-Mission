import React, { useContext, useEffect } from "react";
import FaceBookIco from "../../assets/icon/share-facebook-ico.png";
import KakaoIco from "../../assets/icon/share-kakao-ico.png";
import LinkIco from "../../assets/icon/share-link-ico.png";
import styles from "@/src/components/Modal/Modal.module.css";
import Image from "next/image";
import { RenderModalType } from "./Modal";
import ModalContext from "./ModalContext";

function ShareModal({ folderTabName }: Partial<RenderModalType>) {
  const { folderDataId } = useContext(ModalContext)!;

  useEffect(() => {
    const { Kakao } = window;
    if (Kakao && !Kakao.isInitialized()) {
      Kakao.init(process.env.NEXT_PUBLIC_KAKAO_API_KEY);
    }
  }, []);

  // 카카오톡 공유
  let BASE_URL = `http://localhost:3000/shared/${folderDataId}`;

  if (folderDataId === 0) {
    BASE_URL = `http://localhost:3000/shared`;
  }

  const shareButton = () => {
    if (!window.Kakao) return;

    window.Kakao.Share.sendDefault({
      objectType: "feed",
      content: {
        title: "Linkbrary",
        description: "Linkbrary 카톡 공유",
        imageUrl:
          "http://k.kakaocdn.net/dn/Q2iNx/btqgeRgV54P/VLdBs9cvyn8BJXB3o7N8UK/kakaolink40_original.png",
        link: {
          webUrl: BASE_URL,
        },
      },
      buttons: [
        {
          title: "웹으로 보기",
          link: {
            webUrl: BASE_URL,
          },
        },
      ],
    });
  };

  // 링크 복사하기
  const shareLink = async () => {
    try {
      await navigator.clipboard.writeText(BASE_URL);
      alert("주소가 복사 되었습니다.");
    } catch (e) {
      alert("주소 복사 실패");
    }
  };

  return (
    <div className={styles.modalForm1}>
      <h2>폴더 공유</h2>
      <div className={styles.conWrap}>
        <div className={styles.folderLinkWrap}>{folderDataId === 0 ? "전체" : folderTabName}</div>
        <ul className={styles.folderShareWrap}>
          <li>
            <button onClick={() => shareButton()}>
              <Image width={42} height={42} src={KakaoIco} alt="카카오톡 공유하기" />
              <h3>카카오톡</h3>
            </button>
          </li>
          <li>
            <button>
              <Image width={42} height={42} src={FaceBookIco} alt="페이스북 공유하기" />
              <h3>페이스북</h3>
            </button>
          </li>
          <li>
            <button onClick={() => shareLink()}>
              <Image width={42} height={42} src={LinkIco} alt="링크 복사하기" />
              <h3>링크 복사</h3>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default ShareModal;
