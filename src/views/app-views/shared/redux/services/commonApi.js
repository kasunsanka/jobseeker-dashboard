import axiosHttp from "http/axiosHttp";
import { env } from "configs/EnvironmentConfig";
import axios from "axios";
import { getSession } from "session/Session";

const baseUrl = `${env.API_ENDPOINT_URL}`;
const config={
  headers: {
    "Content-Type": "multipart/form-data",
    Accept: "multipart/form-data",
    "Access-Control-Allow-Origin": "*",
    Authorization: "Bearer " + getSession(),
  }}

export const fetchImage = async (imageData) => {
  const res = await axios.post(`${baseUrl}/upload/create/`, imageData,config);
  //const res = await axiosHttp.post(`${baseUrl}/upload/create/`, imageData);
  return res;
};
export const fetchFile = async (fileData) => {
  const res = await axiosHttp.post(`${baseUrl}/upload/file/create/`, fileData);
  return res;
};

export const categoryListAPI = async () => {
  try {
    const res = await axiosHttp.get(`${baseUrl}/catalogue/category/list/all`);

    return res.data;
  } catch (error) {
    return console.log(error);
  }
};

export const brandListAPI = async (filters) => {
  const api =
    filters && filters.code !== undefined
      ? `catalogue/category/brand/${filters.code}`
      : "catalogue/brand/all";
  try {
    const res = await axiosHttp.get(`${baseUrl}/${api}`);
    return res.data;
  } catch (error) {
    return console.log(error);
  }
};

export const merchantListAPI = async (filters) => {
  const keyword =
    filters && filters.keyword !== undefined
      ? `?keyword=${filters.keyword}`
      : "";
  try {
    const res = await axiosHttp.get(`${baseUrl}/merchant/all${keyword}`);
    return res.data;
  } catch (error) {
    return console.log(error);
  }
};

export const highlightListAPI = async (category) => {
  try {
    const res = await axiosHttp.get(
      `${baseUrl}/catalogue/highlight/category/${category}`
    );
    return res.data;
  } catch (error) {
    return console.log(error);
  }
};
export const highlightListAllAPI = async () => {
  const res = await axiosHttp.get(`${baseUrl}/catalogue/highlight/all`);
  return res.data;
};

export const optionListAPI = async () => {
  try {
    const res = await axiosHttp.get(`${baseUrl}/catalogue/option/all`);
    return res.data;
  } catch (error) {
    return console.log(error);
  }
};

//Warranty Type list without pagination API.
export const warrantyTypeListAPI = async () => {
  try {
    const res = await axiosHttp.get(`${baseUrl}/catalogue/warranty/type/list`);

    return res.data;
  } catch (error) {
    return error;
  }
};

//Warranty period list without pagination API.
export const warrantyPeriodListAPI = async () => {
  try {
    const res = await axiosHttp.get(
      `${baseUrl}/catalogue/warranty/period/list`
    );
    return res.data;
  } catch (error) {
    return error;
  }
};

export const customerSegmentListAPI = async (id) => {
  if (id !== undefined || id != null) {
    const res = await axiosHttp.get(
      `${baseUrl}/customer/segments/all?merchantcode=` + id.keyword
    );
    return res.data;
  } else {
    const res = await axiosHttp.get(`${baseUrl}/customer/segments/all`);
    return res.data;
  }
};

export const collectionCommonListAPI = async () => {
  const data = await axiosHttp.get(`${baseUrl}/deal/collection/all`);
  return data;
};

export const logHistoryAPI = async (page, module) => {
  try {
    const res = await axiosHttp.get(
      `${baseUrl}/logs/list?page=${page}&module=${module}`
    );
    return res.data;
  } catch (error) {
    return console.log(error);
  }
};
export const cardTypeCommonListAPI = async () => {
  const data = await axiosHttp.get(`${baseUrl}/installment/card/type/all`);
  return data;
};

export const bankListAPI = async () => {
  try {
    const res = await axiosHttp.get(`${baseUrl}/installment/bank/all`);
    return res.data;
  } catch (error) {
    return console.log(error);
  }
};

export const countryListAPI = async () => {
  try {
    const res = await axiosHttp.get(`${baseUrl}/installment/country/all`);
    return res.data;
  } catch (error) {
    return console.log(error);
  }
};

export const cardBinAllTypeCommonListAPI = async (cardType) => {
  const passData =
    cardType && cardType.cardType !== undefined
      ? `?cardType=${cardType.cardType}`
      : "";
  const data = await axiosHttp.get(
    `${baseUrl}/installment/cardbin/all${passData}`
  );
  return data;
};

export const categoryTreeAPI = async () => {
  const data = await axiosHttp.get(`${baseUrl}/catalogue/full/tree`);
  return data;
};

export const rootCategoryTreeAPI = async () => {
  const data = await axiosHttp.get(`${baseUrl}/catalogue/root/tree`);
  return data;
};

//district
export const districtListAPI = async () => {
  const data = await axiosHttp.get(`${baseUrl}/discount/district/all`);
  return data;
};

export const fetchProductsElastic = async (keyword, merchantCode) => {
  var res;
  if (merchantCode) {
    const merchant =
      merchantCode && merchantCode !== undefined
        ? `&merchant=${merchantCode}`
        : "";

    res = await axiosHttp.get(
      `${baseUrl}/client/elastic/product/search/merchant?keyword=${keyword}${merchant}`
    );
  } else {
    res = await axiosHttp.get(
      `${baseUrl}/client/elastic/product/search?keyword=${keyword}`
    );
  }
  return res;
};


export const fetchProductsElasticForBackoffice = async (keyword, merchantCode) => {
  var res;
  if (merchantCode) {
    const merchant =
      merchantCode && merchantCode !== undefined
        ? `&merchant=${merchantCode}`
        : "";

    res = await axiosHttp.get(
      `${baseUrl}/client/elastic/product/backoffice/search/merchant?keyword=${keyword}${merchant}`
    );
  } else {
    res = await axiosHttp.get(
      `${baseUrl}/client/elastic/product/backoffice/search?keyword=${keyword}`
    );
  }
  return res;
};

//PRODUCT NAMES GET API
export const fetchProductNames = async (data) => {
  const res = await axiosHttp.post(`${baseUrl}/product/detail/list`, data);
  return res.data;
};

//MERCHANT NAMES GET API
export const fetchMerchantNames = async (data) => {
  const res = await axiosHttp.post(
    `${baseUrl}/merchant/merchantNameByCode`,
    data.code
  );
  return res.data;
};

//CATEGORY NAMES GET API
export const fetchCategoryNames = async (data) => {
  const res = await axiosHttp.post(`${baseUrl}/catalogue/category/name`, data);
  return res.data;
};

export const customerListAPI = async () => {
  const data = await axiosHttp.get(`${baseUrl}/customer/user/all`);
  return data;
};

//Get Merchant Categories List API
export const getMerchantCategoriesListAPI = async () => {
  const data = await axiosHttp.get(`${baseUrl}/merchant/category/list`);
  return data;
};

//Get flash deals promo product list
//Remove this end point and all related redux and sagas
export const fetchPromoProductsElastic = async (keyword) => {
  const res = await axiosHttp.get(
    `${baseUrl}/client/elastic/product/search?keyword=${keyword}`
  );
  return res;
};

export const productListAPI = async () => {
 
};
