import {
  CommonImageUpload,
  CommonFileUpload,
  CATEGORY_LIST_LOAD_SUCCESS,
  GET_CATEGORY_LIST_COMMON,
  CATEGORY_LIST_ERROR,
  BRAND_LIST_LOAD_SUCCESS,
  GET_BRAND_LIST_COMMON,
  BRAND_LIST_ERROR,
  MERCHANT_COMMON_LIST_LOAD_SUCCESS,
  GET_MERCHANT_COMMON_LIST,
  MERCHANT_COMMON_LIST_ERROR,
  HIGHLIGHT_LIST_LOAD_SUCCESS,
  GET_HIGHLIGHT_LIST_SPEC,
  HIGHLIGHT_LIST_ERROR,
  OPTION_LIST_LOAD_SUCCESS,
  GET_OPTION_LIST,
  OPTION_LIST_ERROR,
  WARRANTY_TYPE_LIST_LOAD_SUCCESS,
  GET_WARRANTY_TYPE_LIST,
  WARRANTY_TYPE_LIST_ERROR,
  WARRANTY_PERIOD_LIST_LOAD_SUCCESS,
  GET_WARRANTY_PERIOD_LIST,
  WARRANTY_PERIOD_LIST_ERROR,
  GET_COMMON_HIGHLIGHT_ALL,
  GET_COMMON_HIGHLIGHT_ALL_SUCCESS,
  GET_COMMON_HIGHLIGHT_ALL_ERROR,
  GET_COMMON_PRODUCT_LIST,
  GET_COMMON_PRODUCT_LIST_LOAD_SUCCESS,
  GET_COMMON_PRODUCT_LIST_ERROR,
  CUSTOMER_SEGMENT_LIST_COMMON_LOAD_SUCCESS,
  GET_CUSTOMER_SEGMENT_LIST_COMMON,
  CUSTOMER_SEGMENT_LIST_COMMON_ERROR,
  CommonCollection,
  LOG_HISTORY_LOAD_SUCCESS,
  GET_LOG_HISTORY_COMMON,
  LOG_HISTORY_ERROR_SHOW,
  LOG_HISTORY_ERROR_HIDE,
  GET_COMMON_CARD_TYPE,
  GET_COMMON_CARD_TYPE_LOAD_SUCCESS,
  GET_COMMON_CARD_TYPE_ERROR,
  GET_BANK_LIST,
  BANK_LIST_ERROR,
  BANK_LIST_LOAD_SUCCESS,
  COUNTRY_LIST_LOAD_SUCCESS,
  GET_COUNTRY_LIST,
  COUNTRY_LIST_ERROR,
  CommonCardBinAllType,
  CommonCategoryTree,
  CommonCatlogRootTree,
  DistrictAllType,
  CommonElasticProductSearch,
  ProductNamesGetTypes,
  CategoryNamesGetTypes,
  MerchantNamesGetTypes,
  SpecificCustomers,
  GetMerchantCategoriesTypes,
  PromoElasticProductSearch,
  CommonElasticProductSearchForBackoffice,
} from "../constants/commonTypes";

//image upload started >>>>
export const commonImageUpload = (imageData, message, fileName) => {
  return {
    type: CommonImageUpload.COMMON_IMAGE_UPLOAD,
    imageData,
    message,
    fileName,
  };
};

export const commonImageUploadSuccess = (imageData) => {
  return {
    type: CommonImageUpload.COMMON_IMAGE_UPLOAD_SUCCESS,
    imageData,
  };
};

export const commonImageUploadErrorShow = (message) => {
  return {
    type: CommonImageUpload.COMMON_IMAGE_UPLOAD_ERROR_SHOW,
    message,
  };
};

export const commonImageUploadErrorHide = () => {
  return {
    type: CommonImageUpload.COMMON_IMAGE_UPLOAD_ERROR_HIDE,
  };
};
export const commonImageUploadStateClear = () => {
  return {
    type: CommonImageUpload.COMMON_IMAGE_UPLOAD_STATE_CLEAR,
  };
};
//image upload end >>>>

//File upload started >>>>
export const commonFileUpload = (fileData, message, fileName) => {
  return {
    type: CommonFileUpload.COMMON_FILE_UPLOAD,
    fileData,
    message,
    fileName,
  };
};

export const commonFileUploadSuccess = (fileData) => {
  return {
    type: CommonFileUpload.COMMON_FILE_UPLOAD_SUCCESS,
    fileData,
  };
};

export const commonFileUploadErrorShow = (message) => {
  return {
    type: CommonFileUpload.COMMON_FILE_UPLOAD_ERROR_SHOW,
    message,
  };
};

export const commonFileUploadErrorHide = () => {
  return {
    type: CommonFileUpload.COMMON_FILE_UPLOAD_ERROR_HIDE,
  };
};
export const commonFileUploadStateClear = () => {
  return {
    type: CommonFileUpload.COMMON_FILE_UPLOAD_STATE_CLEAR,
  };
};
//File upload end >>>>

export const loadCategoryList = (keyword) => {
  return {
    type: CATEGORY_LIST_LOAD_SUCCESS,
    keyword,
  };
};

export const getCategoryList = (data) => {
  return {
    type: GET_CATEGORY_LIST_COMMON,
    data,
  };
};

export const categoryListError = (err) => {
  return {
    type: CATEGORY_LIST_ERROR,
    payload: err.message,
  };
};

export const loadBrandList = (filters) => {
  return {
    type: BRAND_LIST_LOAD_SUCCESS,
    filters,
  };
};

export const getBrandList = (data) => {
  return {
    type: GET_BRAND_LIST_COMMON,
    data,
  };
};

export const brandListError = (err) => {
  return {
    type: BRAND_LIST_ERROR,
    payload: err.message,
  };
};

export const loadMerchantList = (filters) => {
  return {
    type: MERCHANT_COMMON_LIST_LOAD_SUCCESS,
    filters,
  };
};

export const getMerchantList = (data) => {
  return {
    type: GET_MERCHANT_COMMON_LIST,
    data,
  };
};

export const merchantListError = (err) => {
  return {
    type: MERCHANT_COMMON_LIST_ERROR,
    payload: err.message,
  };
};

export const loadHighlightList = (keyword) => {
  return {
    type: HIGHLIGHT_LIST_LOAD_SUCCESS,
    keyword,
  };
};

export const getHighlightList = (data) => {
  return {
    type: GET_HIGHLIGHT_LIST_SPEC,
    data,
  };
};

export const highlightListError = (err) => {
  return {
    type: HIGHLIGHT_LIST_ERROR,
    payload: err.message,
  };
};

export const loadOptionList = (keyword) => {
  return {
    type: OPTION_LIST_LOAD_SUCCESS,
    keyword,
  };
};

export const getOptionList = (data) => {
  return {
    type: GET_OPTION_LIST,
    data,
  };
};

export const optionListError = (err) => {
  return {
    type: OPTION_LIST_ERROR,
    payload: err.message,
  };
};

export const loadWarrantyTypeList = (keyword) => {
  return {
    type: WARRANTY_TYPE_LIST_LOAD_SUCCESS,
    keyword,
  };
};

export const getWarrantyTypeList = (data) => {
  return {
    type: GET_WARRANTY_TYPE_LIST,
    data,
  };
};

export const warrantyTypeListError = (err) => {
  return {
    type: WARRANTY_TYPE_LIST_ERROR,
    payload: err.message,
  };
};

export const loadWarrantyPeriodList = (keyword) => {
  return {
    type: WARRANTY_PERIOD_LIST_LOAD_SUCCESS,
    keyword,
  };
};

export const getWarrantyPeriodList = (data) => {
  return {
    type: GET_WARRANTY_PERIOD_LIST,
    data,
  };
};

export const warrantyPeriodListError = (err) => {
  return {
    type: WARRANTY_PERIOD_LIST_ERROR,
    payload: err.message,
  };
};

//highlight all start
export const getCommonHighlightAll = () => {
  return {
    type: GET_COMMON_HIGHLIGHT_ALL,
  };
};
export const getCommonHighlightAllSuccess = (data) => {
  return {
    type: GET_COMMON_HIGHLIGHT_ALL_SUCCESS,
    data,
  };
};
export const getCommonHighlightAllError = (error) => {
  return {
    type: GET_COMMON_HIGHLIGHT_ALL_ERROR,
    error,
  };
};

//product all start
export const getCommonProductAll = () => {
  return {
    type: GET_COMMON_PRODUCT_LIST,
  };
};
export const getCommonProductAllSuccess = (data) => {
  return {
    type: GET_COMMON_PRODUCT_LIST_LOAD_SUCCESS,
    data,
  };
};
export const getCommonProductError = (error) => {
  return {
    type: GET_COMMON_PRODUCT_LIST_ERROR,
    error,
  };
};

//Customer Segment  Actions
export const loadCustomerSegmentList = (keyword) => {
  return {
    type: CUSTOMER_SEGMENT_LIST_COMMON_LOAD_SUCCESS,
    keyword,
  };
};

export const getCustomerSegmentListCommon = (data) => {
  return {
    type: GET_CUSTOMER_SEGMENT_LIST_COMMON,
    data,
  };
};

export const customerSegmentListError = (err) => {
  return {
    type: CUSTOMER_SEGMENT_LIST_COMMON_ERROR,
    payload: err.message,
  };
};

//collection
export const getCollectionCommonList = () => {
  return {
    type: CommonCollection.GET_COMMON_COLLECTION_LIST,
  };
};
export const getCollectionCommonListSuccess = (data) => {
  return {
    type: CommonCollection.GET_COMMON_COLLECTION_LIST_SUCCESS,
    data,
  };
};

export const getCollectionCommonListError = (message) => {
  return {
    type: CommonCollection.GET_COMMON_COLLECTION_LIST_ERROR,
    message,
  };
};

//log history start

export const loadLogHistory = (page, module) => {
  return {
    type: LOG_HISTORY_LOAD_SUCCESS,
    page,
    module,
  };
};

export const getLogHistory = (data, total) => {
  return {
    type: GET_LOG_HISTORY_COMMON,
    data,
    total,
  };
};

export const logHistoryErrorShow = (err) => {
  return {
    type: LOG_HISTORY_ERROR_SHOW,
    payload: err.message,
  };
};

export const logHistoryErrorHide = () => {
  return {
    type: LOG_HISTORY_ERROR_HIDE,
  };
};

//log history end
//Card Types
export const getCardTypeCommonList = () => {
  return {
    type: GET_COMMON_CARD_TYPE,
  };
};
export const getCardTypeCommonListSuccess = (data) => {
  return {
    type: GET_COMMON_CARD_TYPE_LOAD_SUCCESS,
    data,
  };
};

export const getCardTypeCommonListError = (message) => {
  return {
    type: GET_COMMON_CARD_TYPE_ERROR,
    message,
  };
};

//Bank List
export const loadBankList = (keyword) => {
  return {
    type: BANK_LIST_LOAD_SUCCESS,
    keyword,
  };
};

export const getBankList = (data) => {
  return {
    type: GET_BANK_LIST,
    data,
  };
};

export const bankListError = (err) => {
  return {
    type: BANK_LIST_ERROR,
    payload: err.message,
  };
};

export const loadCountryList = (keyword) => {
  return {
    type: COUNTRY_LIST_LOAD_SUCCESS,
    keyword,
  };
};

export const getCountryList = (data) => {
  return {
    type: GET_COUNTRY_LIST,
    data,
  };
};

export const countryListError = (err) => {
  return {
    type: COUNTRY_LIST_ERROR,
    payload: err.message,
  };
};

//Card Bin Types
export const getCardBinAllTypeCommonList = (data) => {
  return {
    type: CommonCardBinAllType.GET_COMMON_CARD_BIN_ALL,
    data,
  };
};
export const getCardBinAllTypeCommonListSuccess = (data) => {
  return {
    type: CommonCardBinAllType.GET_COMMON_CARD_BIN_ALL_SUCCESS,
    data,
  };
};

export const getCardBinAllTypeCommonListError = (message) => {
  return {
    type: CommonCardBinAllType.GET_COMMON_CARD_BIN_ALL_ERROR,
    message,
  };
};

//Category tree without root node

export const loadCategoryTree = () => {
  return {
    type: CommonCategoryTree.GET_COMMON_CATEGORY_TREE_SUCCESS,
  };
};

export const getCategoryTree = (data) => {
  return {
    type: CommonCategoryTree.GET_COMMON_CATEGORY_TREE,
    data,
  };
};

export const categoryTreeError = (err) => {
  return {
    type: CommonCategoryTree.GET_COMMON_CATEGORY_TREE_ERROR,
    payload: err.message,
  };
};

// CATLOG ROOT TREE
export const loadRootCategoryTree = () => {
  return {
    type: CommonCatlogRootTree.GET_ROOT_CATLOG_TREE,
  };
};

export const getRootCategoryTree = (data) => {
  return {
    type: CommonCatlogRootTree.GET_ROOT_CATLOG_TREE_SUCCESS,
    data,
  };
};

export const rootCategoryTreeError = (err) => {
  return {
    type: CommonCatlogRootTree.GET_ROOT_CATLOG_TREE_ERROR,
    payload: err.message,
  };
};

export const getDistrictList = () => {
  return {
    type: DistrictAllType.GET_DISTRICT_ALL,
  };
};
export const getDistrictListSuccess = (data) => {
  return {
    type: DistrictAllType.GET_DISTRICT_ALL_SUCCESS,
    data,
  };
};

export const getDistrictListError = (message) => {
  return {
    type: DistrictAllType.GET_DISTRICT_ALL_ERROR,
    message,
  };
};

//Elastic Product Search

export const elasticProductSearch = (data, merchantCode) => {
  return {
    type: CommonElasticProductSearch.PRODUCT_SEARCH_ELASTIC,
    data,
    merchantCode,
  };
};
export const elasticProductSearchSuccess = (data) => {
  return {
    type: CommonElasticProductSearch.PRODUCT_SEARCH_ELASTIC_SUCCESS,
    data,
  };
};
export const elasticProductSearchErrorShow = (message) => {
  return {
    type: CommonElasticProductSearch.PRODUCT_SEARCH_ELASTIC_ERROR_SHOW,
    message,
  };
};
export const elasticProductSearchErrorHide = () => {
  return {
    type: CommonElasticProductSearch.PRODUCT_SEARCH_ELASTIC_ERROR_HIDE,
  };
};


//Elastic Product Search For Backoffice

export const elasticProductSearchBackoffice = (data, merchantCode) => {
  return {
    type: CommonElasticProductSearchForBackoffice.PRODUCT_SEARCH_ELASTIC_BACKOFFICE,
    data,
    merchantCode,
  };
};
export const elasticProductSearchSuccessBackoffice = (data) => {
  return {
    type: CommonElasticProductSearchForBackoffice.PRODUCT_SEARCH_ELASTIC_SUCCESS_BACKOFFICE,
    data,
  };
};
export const elasticProductSearchErrorShowBackoffice = (message) => {
  return {
    type: CommonElasticProductSearchForBackoffice.PRODUCT_SEARCH_ELASTIC_ERROR_SHOW_BACKOFFICE,
    message,
  };
};
export const elasticProductSearchErrorHideBackoffice = () => {
  return {
    type: CommonElasticProductSearchForBackoffice.PRODUCT_SEARCH_ELASTIC_ERROR_HIDE_BACKOFFICE,
  };
};

//Product Names Get Actions

export const getProductNameAction = (data) => {
  return {
    type: ProductNamesGetTypes.PRODUCT_NAMES_GET,
    data,
  };
};
export const getProductNameActionSucess = (data) => {
  return {
    type: ProductNamesGetTypes.PRODUCT_NAMES_GET_SUCCESS,
    data,
  };
};

export const getProductNameActionErrorShow = (message) => {
  return {
    type: ProductNamesGetTypes.PRODUCT_NAMES_GET_ERROR_SHOW,
    message,
  };
};
export const getProductNameActionErrorHide = () => {
  return {
    type: ProductNamesGetTypes.PRODUCT_NAMES_GET_ERROR_HIDE,
  };
};

//Mercahnt Names Get Actions

export const getMerchantNameAction = (data) => {
  return {
    type: MerchantNamesGetTypes.MERCHANT_NAMES_GET,
    data,
  };
};
export const getMerchantNameActionSucess = (data) => {
  return {
    type: MerchantNamesGetTypes.MERCHANT_NAMES_GET_SUCCESS,
    data,
  };
};

export const getMerchantNameActionErrorShow = (message) => {
  return {
    type: MerchantNamesGetTypes.MERCHANT_NAMES_GET_ERROR_SHOW,
    message,
  };
};
export const getMerchantNameActionErrorHide = () => {
  return {
    type: MerchantNamesGetTypes.MERCHANT_NAMES_GET_ERROR_HIDE,
  };
};

export const getMerchantNameActionClear = () => {
  return {
    type: MerchantNamesGetTypes.MERCHANT_NAMES_GET_STATE_CLEAR,
  };
};

//Category Names Get Actions

export const getCategoryNameAction = (data) => {
  return {
    type: CategoryNamesGetTypes.CATEGORY_NAMES_GET,
    data,
  };
};
export const getCategoryNameActionSucess = (data) => {
  return {
    type: CategoryNamesGetTypes.CATEGORY_NAMES_GET_SUCCESS,
    data,
  };
};

export const getCategoryNameActionErrorShow = (message) => {
  return {
    type: CategoryNamesGetTypes.CATEGORY_NAMES_GET_ERROR_SHOW,
    message,
  };
};
export const getCategoryNameActionErrorHide = () => {
  return {
    type: CategoryNamesGetTypes.CATEGORY_NAMES_GET_ERROR_HIDE,
  };
};

export const getCustomerList = () => {
  return {
    type: SpecificCustomers.GET_CUSTOMER_LIST_S,
  };
};
export const getCustomertListSuccess = (data) => {
  return {
    type: SpecificCustomers.GET_CUSTOMER_LIST_SUCCESS_S,
    data,
  };
};

export const getCustomerListError = (message) => {
  return {
    type: SpecificCustomers.GET_CUSTOMER_LIST_ERROR_S,
    message,
  };
};

//Merchant Category List

export const getMerchantCatAction = () => {
  return {
    type: GetMerchantCategoriesTypes.GET_MERCHANT_CATEGORIES_LIST,
  };
};
export const getMerchantCatActionSucess = (data) => {
  return {
    type: GetMerchantCategoriesTypes.GET_MERCHANT_CATEGORIES_LIST_SUCCESS,
    data,
  };
};

export const getMerchantCatActionErrorShow = (message) => {
  return {
    type: GetMerchantCategoriesTypes.GET_MERCHANT_CATEGORIES_LIST_ERROR_SHOW,
    message,
  };
};
export const getMerchantCatActionErrorHide = () => {
  return {
    type: GetMerchantCategoriesTypes.GET_MERCHANT_CATEGORIES_LIST_ERROR_HIDE,
  };
};

// Promo elastic product search
export const promoElasticProductSearch = (data) => {
  return {
    type: PromoElasticProductSearch.PROMO_PRODUCT_SEARCH_ELASTIC,
    data,
  };
};
export const promoElasticProductSearchSuccess = (data) => {
  return {
    type: PromoElasticProductSearch.PROMO_PRODUCT_SEARCH_ELASTIC_SUCCESS,
    data,
  };
};
export const promoElasticProductSearchErrorShow = (message) => {
  return {
    type: PromoElasticProductSearch.PROMO_PRODUCT_SEARCH_ELASTIC_ERROR_SHOW,
    message,
  };
};
export const promoElasticProductSearchErrorHide = () => {
  return {
    type: PromoElasticProductSearch.PROMO_PRODUCT_SEARCH_ELASTIC_ERROR_HIDE,
  };
};
