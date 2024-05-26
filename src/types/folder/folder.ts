interface FolderTabDataList {
  id: number;
  createdAt: string;
  favorite: boolean;
  link: Pick<FolderData, "count">;
  name: string;
  userId: number;
}

interface UserFolderdataList {
  id: number;
  createdAt: string;
  description?: string;
  folderId?: number;
  title?: string;
  updatedAt?: string;
  url: string;
  imageSource?: string;
}

interface IFolderTabList {
  folderTabDataList: FolderTabDataList[];
  folderDataId: number;
  setUserFolderDataList: (data: UserFolderdataList[]) => void;
  setFolderTabName: (name: string | null) => void;
  setFolderDataId: (id: number) => void;
  name: string;
  setName: (name: string) => void;
}

interface FolderData {
  id: number;
  name: string;
  owner: FolderDataOwner;
  links: FolderLinks[];
  count: number;
}

interface FolderDataOwner {
  id: number;
  name: string;
  profileImageSource: string;
}

interface FolderLinks {
  id: number;
  createdAt: string;
  url: string;
  title: string;
  description: string;
  imageSource?: string;
}

interface SharedAuthData {
  authId: string;
  createdAt: string;
  email: string;
  id: number;
  imageSource: string;
  name: string;
}
