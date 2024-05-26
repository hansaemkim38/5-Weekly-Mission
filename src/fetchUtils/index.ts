import axios from "./axiosInstance";
import camelcaseKeys from "camelcase-keys";

export const tabDataList = async () => {
  try {
    const response = await axios.get(`/api/users/1/folders`);
    if (response.data) {
      response.data = camelcaseKeys(response.data, { deep: true });
    }

    const { data } = response;

    return data;
  } catch (e) {
    if (e instanceof Error) {
      alert(e.message);
    }
  }
};

export const userSignInData = async (signInData: SignInFormInputs) => {
  try {
    const response = await axios.post(`/api/sign-in`, signInData);

    const { data } = response;

    return data;
  } catch (e) {
    if (e instanceof Error) {
      alert(e.message);
    }
  }
};

export const checkEmailAvailability = async (email: string) => {
  try {
    const response = await axios.post(`/api/check-email`, { email });

    return response.data.data.isUsableNickname;
  } catch (e) {
    if (e instanceof Error) {
      console.error(e.message);
    }
  }
};

export const getFolderIdLinks = async (folderId?: number) => {
  try {
    let response;
    if (folderId) {
      response = await axios.get(`/api/links?folderId=${folderId}`);
    } else {
      response = await axios.get(`/api/links`);
    }

    if (response.data) {
      response.data = camelcaseKeys(response.data, { deep: true });
    }
    const { data } = response;

    return data;
  } catch (e) {
    if (e instanceof Error) {
      console.error(e.message);
    }
  }
};

export const getFolderUserData = async () => {
  try {
    const response = await axios.get(`/api/users`);

    if (response.data) {
      response.data = camelcaseKeys(response.data, { deep: true });
    }
    const { data } = response;

    return data;
  } catch (e) {
    if (e instanceof Error) {
      console.error(e.message);
    }
  }
};

// 폴더의 정보
export const getSharedFolderIdData = async (folderId: number) => {
  try {
    const response = await axios.get(`/api/folders/${folderId}`);

    if (response.data) {
      response.data = camelcaseKeys(response.data, { deep: true });
    }
    const { data } = response;

    return data;
  } catch (e) {
    if (e instanceof Error) {
      console.error(e.message);
    }
  }
};

//폴더의 소유자 정보
export const getSharedFolderUserData = async (userId: number) => {
  try {
    const response = await axios.get(`api/users/${userId}`);

    if (response.data) {
      response.data = camelcaseKeys(response.data, { deep: true });
    }
    const { data } = response;

    return data;
  } catch (e) {
    if (e instanceof Error) {
      console.error(e.message);
    }
  }
};

// 링크 공유 페이지에서 폴더의 링크 데이터
export const getSharedData = async (userId: number, folderId: number) => {
  try {
    const response = await axios.get(`/api/users/${userId}/links?folderId=${folderId}`);

    if (response.data) {
      response.data = camelcaseKeys(response.data, { deep: true });
    }
    const { data } = response;

    return data;
  } catch (e) {
    if (e instanceof Error) {
      console.error(e.message);
    }
  }
};
