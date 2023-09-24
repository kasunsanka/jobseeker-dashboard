import {
  CATEGORY_LIST_LOAD_SUCCESS,
  GET_CATEGORY_LIST_COMMON,
  BRAND_LIST_LOAD_SUCCESS,
  GET_BRAND_LIST_COMMON,
  CATEGORY_LIST_ERROR,
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
  GET_COMMON_PRODUCT_LIST_ERROR,
  GET_COMMON_PRODUCT_LIST_LOAD_SUCCESS,
  CommonImageUpload,
  CUSTOMER_SEGMENT_LIST_COMMON_LOAD_SUCCESS,
  GET_CUSTOMER_SEGMENT_LIST_COMMON,
  CUSTOMER_SEGMENT_LIST_COMMON_ERROR,
  CommonCollection,
  GET_LOG_HISTORY_COMMON,
  LOG_HISTORY_LOAD_SUCCESS,
  LOG_HISTORY_ERROR_SHOW,
  LOG_HISTORY_ERROR_HIDE,
  GET_COMMON_CARD_TYPE,
  GET_COMMON_CARD_TYPE_LOAD_SUCCESS,
  GET_COMMON_CARD_TYPE_ERROR,
  CommonFileUpload,
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
  MerchantNamesGetTypes,
  CategoryNamesGetTypes,
  SpecificCustomers,
  GetMerchantCategoriesTypes,
  PromoElasticProductSearch,
  CommonElasticProductSearchForBackoffice,
} from "../constants/commonTypes";
import { bankList } from "../sagas/commonSagas";

const initalState = {
  imageData: "",
  fileData: "",
  fileName: null,
  loading: false,
  showMessage: false,
  messageAlert: null,
  categoryListLoading: false,
  brandListLoading: false,
  merchantListLoading: false,
  highlightListLoading: false,
  optionListLoading: false,
  warrantyTypeListLoading: false,
  warrantyPeriodListLoading: false,
  productListLoading: false,
  customerSegmentListLoading: false,
  elasticProductLoadingbackoffice:false,
  logHistoryLoading: true,
  elasticProductResultbackoffice:[],
  logHistory: [],
  categoryList: [],
  brandList: [],
  merchantList: [],
  highlightList: [],
  optionList: [],
  warrantyTypeList: [],
  warrantyPeriodList: [],
  highlightListAll: [],
  productList: [],
  customerSegmentList: [],
  categoryTree: [],
  rootCatlogTree: [],
  brandListError: null,
  categoryListError: null,
  merchantListError: null,
  highlightListError: null,
  highlightListAllError: null,
  optionListError: null,
  warrantyTypeListError: null,
  warrantyPeriodListError: null,
  productListError: null,
  customerSegmentListError: null,
  categoryTreeError: null,
  collectionCommonList: [],
  collectionCommonLoading: false,
  collectionCommonError: null,
  commonCardTypesError: null,
  commonCardTypes: [],
  commonCardTypesLoading: false,
  bankList: [],
  bankListError: null,
  bankListLoading: false,
  countryListLoading: false,
  countryList: [],
  countryListError: null,
  commonCardBinAllTypesError: null,
  commonCardBinAllTypes: [],
  commonCardBinAllTypesLoading: false,
  categoryTreeLoading: null,

  districtList: [],
  districtLoading: false,

  customerList: [],
  customerLoading: false,

  productNames: [],
  merchantNames: [],
  CategoryNames: [],

  //Merchant Categories
  merchantCategories: [],
  merchantCategoriesLoading: false,
  merchantCategoriesError: "",

  //Promo Product List
  promoProducts: [],
};

export const commonReducer = (state = initalState, action) => {
  switch (action.type) {
    case CommonImageUpload.COMMON_IMAGE_UPLOAD:
      return {
        ...state,
        loading: true,
        fileName: action.fileName,
      };
    case CommonImageUpload.COMMON_IMAGE_UPLOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        imageData: action.imageData,
      };
    case CommonImageUpload.COMMON_IMAGE_UPLOAD_ERROR_SHOW:
      return {
        ...state,
        loading: false,
        showMessage: true,
        messageAlert: action.message,
      };
    case CommonImageUpload.COMMON_IMAGE_UPLOAD_ERROR_HIDE:
      return {
        ...state,
        loading: false,
        showMessage: false,
        messageAlert: null,
      };
    case CommonImageUpload.COMMON_IMAGE_UPLOAD_STATE_CLEAR:
      return {
        ...state,
        imageData: "",
        fileName: null,
      };
    case CommonFileUpload.COMMON_FILE_UPLOAD:
      return {
        ...state,
        loading: true,
        fileName: action.fileName,
      };
    case CommonFileUpload.COMMON_FILE_UPLOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        fileData: action.fileData,
      };
    case CommonFileUpload.COMMON_FILE_UPLOAD_ERROR_SHOW:
      return {
        ...state,
        loading: false,
        showMessage: true,
        messageAlert: action.message,
      };
    case CommonFileUpload.COMMON_FILE_UPLOAD_ERROR_HIDE:
      return {
        ...state,
        loading: false,
        showMessage: false,
        messageAlert: null,
      };
    case CommonFileUpload.COMMON_FILE_UPLOAD_STATE_CLEAR:
      return {
        ...state,
        fileData: "",
        fileName: null,
      };
    case CATEGORY_LIST_LOAD_SUCCESS:
      return {
        ...state,
        categoryListLoading: true,
      };
    case GET_CATEGORY_LIST_COMMON:
      return {
        ...state,
        categoryList: action.data,
        categoryListLoading: false,
      };
    case CATEGORY_LIST_ERROR:
      return {
        ...state,
        categoryListError: action.error,
      };
    case BRAND_LIST_LOAD_SUCCESS:
      return {
        ...state,
        brandListLoading: true,
      };
    case GET_BRAND_LIST_COMMON:
      return {
        ...state,
        brandList: action.data,
        brandListLoading: false,
      };
    case BRAND_LIST_ERROR:
      return {
        ...state,
        brandListError: action.error,
      };
    case MERCHANT_COMMON_LIST_LOAD_SUCCESS:
      return {
        ...state,
        merchantListLoading: true,
      };
    case GET_MERCHANT_COMMON_LIST:
      return {
        ...state,
        merchantList: action.data,
        merchantListLoading: false,
      };
    case MERCHANT_COMMON_LIST_ERROR:
      return {
        ...state,
        merchantListError: action.error,
      };
    case HIGHLIGHT_LIST_LOAD_SUCCESS:
      return {
        ...state,
        highlightListLoading: true,
      };
    case GET_HIGHLIGHT_LIST_SPEC:
      return {
        ...state,
        highlightList: action.data,
        highlightListLoading: false,
      };
    case HIGHLIGHT_LIST_ERROR:
      return {
        ...state,
        highlightListError: action.error,
      };
    case OPTION_LIST_LOAD_SUCCESS:
      return {
        ...state,
        optionListLoading: true,
      };
    case GET_OPTION_LIST:
      return {
        ...state,
        optionList: action.data,
        optionListLoading: false,
      };
    case OPTION_LIST_ERROR:
      return {
        ...state,
        optionListError: action.error,
      };
    case WARRANTY_TYPE_LIST_LOAD_SUCCESS:
      return {
        ...state,
        warrantyTypeListLoading: true,
      };
    case GET_WARRANTY_TYPE_LIST:
      return {
        ...state,
        warrantyTypeList: action.data,
        warrantyTypeListLoading: false,
      };
    case WARRANTY_TYPE_LIST_ERROR:
      return {
        ...state,
        warrantyTypeListError: action.error,
      };
    case WARRANTY_PERIOD_LIST_LOAD_SUCCESS:
      return {
        ...state,
        warrantyPeriodListLoading: true,
      };
    case GET_WARRANTY_PERIOD_LIST:
      return {
        ...state,
        warrantyPeriodList: action.data,
        warrantyPeriodListLoading: false,
      };
    case WARRANTY_PERIOD_LIST_ERROR:
      return {
        ...state,
        warrantyPeriodListError: action.error,
      };
    case GET_COMMON_HIGHLIGHT_ALL:
      return {
        ...state,
        loading: true,
      };
    case GET_COMMON_HIGHLIGHT_ALL_SUCCESS:
      return {
        ...state,
        loading: false,
        highlightListAll: action.data,
      };
    case GET_COMMON_HIGHLIGHT_ALL_ERROR:
      return {
        ...state,
        loading: false,
        highlightListAllError: action.error,
      };

    case GET_COMMON_PRODUCT_LIST:
      return {
        ...state,
        productListLoading: true,
        // loading:true,
      };

    case GET_COMMON_PRODUCT_LIST_ERROR:
      return {
        ...state,
        loading: false,
        productListError: action.error,
      };

    case GET_COMMON_PRODUCT_LIST_LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        productList: action.data,
      };

    case CUSTOMER_SEGMENT_LIST_COMMON_LOAD_SUCCESS:
      return {
        ...state,
        customerSegmentListLoading: true,
      };
    case GET_CUSTOMER_SEGMENT_LIST_COMMON:
      return {
        ...state,
        customerSegmentList: action.data,
        customerSegmentListLoading: false,
      };
    case CUSTOMER_SEGMENT_LIST_COMMON_ERROR:
      return {
        ...state,
        customerSegmentListError: action.error,
      };
    case CommonCollection.GET_COMMON_COLLECTION_LIST:
      return {
        ...state,
        collectionCommonLoading: true,
      };
    case CommonCollection.GET_COMMON_COLLECTION_LIST_SUCCESS:
      return {
        ...state,
        collectionCommonList: action.data,
        collectionCommonLoading: false,
      };
    case CommonCollection.GET_COMMON_COLLECTION_LIST_ERROR:
      return {
        ...state,
        collectionCommonLoading: false,
      };
    case GET_LOG_HISTORY_COMMON:
      return {
        ...state,
        logHistory: action.data,
        total: action.total,
        logHistoryLoading: false,
      };
    case LOG_HISTORY_LOAD_SUCCESS:
      return {
        ...state,
        logHistory: [],
        page: action.page,
        logHistoryLoading: true,
      };
    case LOG_HISTORY_ERROR_SHOW:
      return {
        ...state,
        logHistoryLoading: false,
        showMessage: true,
        messageAlert: action.message,
      };
    case LOG_HISTORY_ERROR_HIDE:
      return {
        ...state,
        showMessage: false,
        messageAlert: null,
      };
    case GET_COMMON_CARD_TYPE:
      return {
        ...state,
        commonCardTypesLoading: true,
      };
    case GET_COMMON_CARD_TYPE_LOAD_SUCCESS:
      return {
        ...state,
        commonCardTypes: action.data,
        commonCardTypesLoading: false,
        showMessage: false,
        messageAlert: null,
      };
    case GET_COMMON_CARD_TYPE_ERROR:
      return {
        ...state,
        commonCardTypesLoading: false,
        showMessage: true,
        messageAlert: action.message,
      };
    case BANK_LIST_LOAD_SUCCESS:
      return {
        ...state,
        bankListLoading: true,
      };
    case GET_BANK_LIST:
      return {
        ...state,
        bankList: action.data,
        bankListLoading: false,
      };
    case BANK_LIST_ERROR:
      return {
        ...state,
        bankListLoading: action.error,
      };
    case COUNTRY_LIST_LOAD_SUCCESS:
      return {
        ...state,
        countryListLoading: true,
      };
    case GET_COUNTRY_LIST:
      return {
        ...state,
        countryList: action.data,
        countryListLoading: false,
      };
    case COUNTRY_LIST_ERROR:
      return {
        ...state,
        countryListError: action.error,
      };
    //card bin all
    case CommonCardBinAllType.GET_COMMON_CARD_BIN_ALL:
      return {
        ...state,
        commonCardBinAllTypesLoading: true,
      };
    case CommonCardBinAllType.GET_COMMON_CARD_BIN_ALL_SUCCESS:
      return {
        ...state,
        commonCardBinAllTypes: action.data,
        commonCardBinAllTypesLoading: false,
        showMessage: false,
        commonCardBinAllTypesError: null,
      };
    case CommonCardBinAllType.GET_COMMON_CARD_BIN_ALL_ERROR:
      return {
        ...state,
        commonCardBinAllTypesLoading: false,
        showMessage: true,
        commonCardBinAllTypesError: action.message,
      };
    case CommonCategoryTree.GET_COMMON_CATEGORY_TREE_SUCCESS:
      return {
        ...state,
        categoryTreeLoading: true,
      };
    case CommonCategoryTree.GET_COMMON_CATEGORY_TREE:
      return {
        ...state,
        categoryTree: action.data,
        categoryTreeLoading: false,
      };
    case CommonCategoryTree.GET_COMMON_CATEGORY_TREE_ERROR:
      return {
        ...state,
        categoryTreeError: action.error,
      };

    //Root Catlog Tree Reducer
    case CommonCatlogRootTree.GET_ROOT_CATLOG_TREE:
      return {
        ...state,
        categoryTreeLoading: true,
      };
    case CommonCatlogRootTree.GET_ROOT_CATLOG_TREE_SUCCESS:
      return {
        ...state,
        rootCatlogTree: action.data,
        categoryTreeLoading: false,
      };
    case CommonCatlogRootTree.GET_ROOT_CATLOG_TREE_ERROR:
      return {
        ...state,
        categoryTreeError: action.error,
      };

    case DistrictAllType.GET_DISTRICT_ALL:
      return {
        ...state,
        districtLoading: true,
      };
    case DistrictAllType.GET_DISTRICT_ALL_SUCCESS:
      return {
        ...state,
        districtList: action.data,
        districtLoading: false,
        showMessage: false,
        messageAlert: null,
      };
    case DistrictAllType.GET_DISTRICT_ALL_ERROR:
      return {
        ...state,
        districtLoading: false,
        showMessage: true,
        messageAlert: action.message,
      };
    case CommonElasticProductSearch.PRODUCT_SEARCH_ELASTIC:
      return {
        ...state,
        keyword: action.data,
        elasticProductLoading: true,
        elasticProductShowMessage: false,
        elasticProductMessageAlert: null,
      };
    case CommonElasticProductSearch.PRODUCT_SEARCH_ELASTIC_SUCCESS:
      return {
        ...state,
        elasticProductLoading: false,
        elasticProductResult: action.data,
      };
    case CommonElasticProductSearch.PRODUCT_SEARCH_ELASTIC_ERROR_SHOW:
      return {
        ...state,
        elasticProductLoading: false,
        elasticProductShowMessage: true,
        elasticProductMessageAlert: action.message,
      };
    case CommonElasticProductSearch.PRODUCT_SEARCH_ELASTIC_ERROR_HIDE:
      return {
        ...state,
        elasticProductLoading: false,
        elasticProductShowMessage: false,
        elasticProductMessageAlert: null,
      };

      case CommonElasticProductSearchForBackoffice.PRODUCT_SEARCH_ELASTIC_BACKOFFICE:
      return {
        ...state,
        keyword: action.data,
        elasticProductLoadingbackoffice: true,
        elasticProductShowMessagebackoffice: false,
        elasticProductMessageAlertbackoffice: null,
      };
    case CommonElasticProductSearchForBackoffice.PRODUCT_SEARCH_ELASTIC_SUCCESS_BACKOFFICE:
      return {
        ...state,
        elasticProductLoadingbackoffice: false,
        elasticProductResultbackoffice: action.data,
      };
    case CommonElasticProductSearchForBackoffice.PRODUCT_SEARCH_ELASTIC_ERROR_SHOW_BACKOFFICE:
      return {
        ...state,
        elasticProductLoadingbackoffice: false,
        elasticProductShowMessagebackoffice: true,
        elasticProductMessageAlertbackoffice: action.message,
      };
    case CommonElasticProductSearchForBackoffice.PRODUCT_SEARCH_ELASTIC_ERROR_HIDE_BACKOFFICE:
      return {
        ...state,
        elasticProductLoadingbackoffice: false,
        elasticProductShowMessagebackoffice: false,
        elasticProductMessageAlertbackoffice: null,
      };
    //PRODUCT NAMES
    case ProductNamesGetTypes.PRODUCT_NAMES_GET:
      return {
        ...state,
        loading: true,
      };
    case ProductNamesGetTypes.PRODUCT_NAMES_GET_SUCCESS:
      return {
        ...state,
        loading: false,
        productNames: action.data,
      };
    case ProductNamesGetTypes.PRODUCT_NAMES_GET_ERROR_SHOW:
      return {
        ...state,
        loading: false,
      };
    case ProductNamesGetTypes.PRODUCT_NAMES_GET_ERROR_HIDE:
      return {
        ...state,
        loading: false,
      };
    //MERCHANT NAMES
    case MerchantNamesGetTypes.MERCHANT_NAMES_GET:
      return {
        ...state,
        loading: true,
      };
    case MerchantNamesGetTypes.MERCHANT_NAMES_GET_SUCCESS:
      return {
        ...state,
        loading: false,
        merchantNames: action.data,
      };
    case MerchantNamesGetTypes.MERCHANT_NAMES_GET_ERROR_SHOW:
      return {
        ...state,
        loading: false,
      };
    case MerchantNamesGetTypes.MERCHANT_NAMES_GET_ERROR_HIDE:
      return {
        ...state,
        loading: false,
      };
    case MerchantNamesGetTypes.MERCHANT_NAMES_GET_STATE_CLEAR:
      return {
        ...state,
        merchantNames: [],
        loading: false,
      };
    //CATEGORY NAMES
    case CategoryNamesGetTypes.CATEGORY_NAMES_GET:
      return {
        ...state,
        loading: true,
      };
    case CategoryNamesGetTypes.CATEGORY_NAMES_GET_SUCCESS:
      return {
        ...state,
        loading: false,
        CategoryNames: action.data,
      };
    case CategoryNamesGetTypes.CATEGORY_NAMES_GET_ERROR_SHOW:
      return {
        ...state,
        loading: false,
      };
    case CategoryNamesGetTypes.CATEGORY_NAMES_GET_ERROR_HIDE:
      return {
        ...state,
        loading: false,
      };

    case SpecificCustomers.GET_CUSTOMER_LIST_S:
      return {
        ...state,
        customerLoading: true,
      };
    case SpecificCustomers.GET_CUSTOMER_LIST_SUCCESS_S:
      return {
        ...state,
        customerList: action.data,
        customerLoading: false,
        showMessage: false,
        messageAlert: null,
      };
    case SpecificCustomers.GET_CUSTOMER_LIST_ERROR_S:
      return {
        ...state,
        customerLoading: false,
        showMessage: true,
        messageAlert: action.message,
      };

    //MERCHANT CATEGORIES
    case GetMerchantCategoriesTypes.GET_MERCHANT_CATEGORIES_LIST:
      return {
        ...state,
        merchantCategoriesLoading: true,
      };
    case GetMerchantCategoriesTypes.GET_MERCHANT_CATEGORIES_LIST_SUCCESS:
      return {
        ...state,
        merchantCategories: action.data,
        merchantCategoriesLoading: false,
        merchantCategoriesError: "",
      };
    case GetMerchantCategoriesTypes.GET_MERCHANT_CATEGORIES_LIST_ERROR_SHOW:
      return {
        ...state,
        merchantCategoriesLoading: false,
        merchantCategoriesError: action.message,
      };
    //Promo Product search redurcer
    case PromoElasticProductSearch.PROMO_PRODUCT_SEARCH_ELASTIC:
      return {
        ...state,
        keyword: action.data,
        elasticProductLoading: true,
        elasticProductShowMessage: false,
        elasticProductMessageAlert: null,
      };
    case PromoElasticProductSearch.PROMO_PRODUCT_SEARCH_ELASTIC_SUCCESS:
      return {
        ...state,
        elasticProductLoading: false,
        promoProducts: action.data,
      };
    case PromoElasticProductSearch.PROMO_PRODUCT_SEARCH_ELASTIC_ERROR_SHOW:
      return {
        ...state,
        elasticProductLoading: false,
        elasticProductShowMessage: true,
        elasticProductMessageAlert: action.message,
      };
    case PromoElasticProductSearch.PROMO_PRODUCT_SEARCH_ELASTIC_ERROR_HIDE:
      return {
        ...state,
        elasticProductLoading: false,
        elasticProductShowMessage: false,
        elasticProductMessageAlert: null,
      };
    default:
      return state;
  }
};
