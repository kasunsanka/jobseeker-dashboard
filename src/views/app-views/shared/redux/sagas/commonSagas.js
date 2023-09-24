import {
  CommonImageUpload,
  CATEGORY_LIST_LOAD_SUCCESS,
  BRAND_LIST_LOAD_SUCCESS,
  MERCHANT_COMMON_LIST_LOAD_SUCCESS,
  HIGHLIGHT_LIST_LOAD_SUCCESS,
  OPTION_LIST_LOAD_SUCCESS,
  WARRANTY_TYPE_LIST_LOAD_SUCCESS,
  WARRANTY_PERIOD_LIST_LOAD_SUCCESS,
  GET_COMMON_HIGHLIGHT_ALL,
  GET_COMMON_PRODUCT_LIST,
  CUSTOMER_SEGMENT_LIST_COMMON_LOAD_SUCCESS,
  CommonCollection,
  LOG_HISTORY_LOAD_SUCCESS,
  GET_COMMON_CARD_TYPE,
  CommonFileUpload,
  BANK_LIST_LOAD_SUCCESS,
  COUNTRY_LIST_LOAD_SUCCESS,
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

import {
  commonImageUploadSuccess,
  commonImageUploadErrorShow,
  commonImageUploadErrorHide,
  getCategoryList,
  categoryListError,
  getBrandList,
  brandListError,
  getMerchantList,
  merchantListError,
  getHighlightList,
  highlightListError,
  getWarrantyTypeList,
  getWarrantyPeriodList,
  warrantyTypeListError,
  warrantyPeriodListError,
  getOptionList,
  optionListError,
  getCommonHighlightAllSuccess,
  getCommonHighlightAllError,
  getCommonProductAllSuccess,
  getCustomerSegmentListCommon,
  getCommonProductError,
  customerSegmentListError,
  getCollectionCommonListSuccess,
  getCollectionCommonListError,
  getLogHistory,
  logHistoryErrorShow,
  getCardTypeCommonListSuccess,
  getCardTypeCommonListError,
  commonFileUploadSuccess,
  commonFileUploadErrorShow,
  commonFileUploadErrorHide,
  getBankList,
  bankListError,
  getCountryList,
  countryListError,
  getCardBinAllTypeCommonListSuccess,
  getCardBinAllTypeCommonListError,
  getCategoryTree,
  categoryTreeError,
  getRootCategoryTree,
  rootCategoryTreeError,
  getDistrictListSuccess,
  getDistrictListError,
  elasticProductSearchSuccess,
  elasticProductSearchErrorHide,
  elasticProductSearchErrorShow,
  getProductNameActionSucess,
  getProductNameActionErrorShow,
  getProductNameActionErrorHide,
  getMerchantNameActionSucess,
  getMerchantNameActionErrorShow,
  getMerchantNameActionErrorHide,
  getCategoryNameActionSucess,
  getCategoryNameActionErrorShow,
  getCategoryNameActionErrorHide,
  getCustomertListSuccess,
  getCustomerListError,
  //Merchant Categories List
  getMerchantCatActionSucess,
  getMerchantCatActionErrorShow,
  getMerchantCatActionErrorHide,
  //Promo product actions
  promoElasticProductSearchSuccess,
  promoElasticProductSearchErrorShow,
  promoElasticProductSearchErrorHide,
} from "../actions/commonActions";

import {
  fetchImage,
  fetchFile,
  categoryListAPI,
  brandListAPI,
  merchantListAPI,
  highlightListAPI,
  optionListAPI,
  warrantyTypeListAPI,
  warrantyPeriodListAPI,
  highlightListAllAPI,
  productListAPI,
  customerSegmentListAPI,
  collectionCommonListAPI,
  logHistoryAPI,
  cardTypeCommonListAPI,
  bankListAPI,
  countryListAPI,
  cardBinAllTypeCommonListAPI,
  categoryTreeAPI,
  rootCategoryTreeAPI,
  districtListAPI,
  fetchProductsElastic,
  fetchProductNames,
  fetchMerchantNames,
  fetchCategoryNames,
  customerListAPI,
  getMerchantCategoriesListAPI,
  fetchPromoProductsElastic,
  fetchProductsElasticForBackoffice,
} from "../services/commonApi";
import { all, call, delay, fork, put, takeEvery } from "redux-saga/effects";

//image upload
export function* imageUploadSaga() {
  yield takeEvery(CommonImageUpload.COMMON_IMAGE_UPLOAD, function* (payload) {
    const message = payload.message;
    try {
      const res = yield call(fetchImage, payload.imageData);
      yield put(commonImageUploadSuccess(res.data.data.path));
      message.success("Image Uploaded");
    } catch (error) {
      if (error.message === "res.data.data is undefined") {
        yield put(commonImageUploadErrorShow(error));
        yield delay(3000);
        yield put(commonImageUploadErrorHide());
      } else {
        yield put(commonImageUploadErrorShow(error));
        message.error(error.message, 3);
        yield delay(3000);
        yield put(commonImageUploadErrorHide());
      }
    }
  });
}

//file upload
export function* fileUploadSaga() {
  yield takeEvery(CommonFileUpload.COMMON_FILE_UPLOAD, function* (payload) {
    const message = payload.message;
    try {
      const res = yield call(fetchFile, payload.fileData);
      yield put(commonFileUploadSuccess(res.data.data.path));
      message.success("File Uploaded");
    } catch (error) {
      if (error.message === "res.data.data is undefined") {
        yield put(commonFileUploadErrorShow());
        yield put(commonFileUploadErrorHide());
      } else {
        yield put(commonFileUploadErrorShow(error.message));
        message.error(error.message, 3);
        yield delay(3000);
        yield put(commonFileUploadErrorHide());
      }
    }
  });
}

export function* categoryList() {
  yield takeEvery(CATEGORY_LIST_LOAD_SUCCESS, function* (payload) {
    try {
      const data = yield call(categoryListAPI);
      if (typeof data != undefined) {
        yield put(getCategoryList(data.data));
      }
    } catch (error) {
      yield put(categoryListError(error));
    }
  });
}

export function* brandList() {
  yield takeEvery(BRAND_LIST_LOAD_SUCCESS, function* (payload) {
    try {
      const data = yield call(brandListAPI, payload.filters);
      if (typeof data != undefined) {
        yield put(getBrandList(data.data));
      }
    } catch (error) {
      yield put(brandListError(error));
    }
  });
}

export function* merchantList() {
  yield takeEvery(MERCHANT_COMMON_LIST_LOAD_SUCCESS, function* (payload) {
    try {
      const data = yield call(merchantListAPI, payload.filters);
      if (typeof data != undefined) {
        yield put(getMerchantList(data.data));
      }
    } catch (error) {
      yield put(merchantListError(error));
    }
  });
}

export function* highlightList() {
  yield takeEvery(HIGHLIGHT_LIST_LOAD_SUCCESS, function* (payload) {
    try {
      const data = yield call(highlightListAPI, payload.keyword);
      if (typeof data != undefined) {
        yield put(getHighlightList(data.data));
      }
    } catch (error) {
      yield put(highlightListError(error));
    }
  });
}

export function* optionList() {
  yield takeEvery(OPTION_LIST_LOAD_SUCCESS, function* (payload) {
    try {
      const data = yield call(optionListAPI);
      if (typeof data != undefined) {
        yield put(getOptionList(data.data));
      }
    } catch (error) {
      yield put(optionListError(error));
    }
  });
}

export function* warrantyTypeList() {
  yield takeEvery(WARRANTY_TYPE_LIST_LOAD_SUCCESS, function* (payload) {
    try {
      const data = yield call(warrantyTypeListAPI);
      if (typeof data != undefined) {
        yield put(getWarrantyTypeList(data.data));
      }
    } catch (error) {
      yield put(warrantyTypeListError(error));
    }
  });
}

export function* warrantyPeriodList() {
  yield takeEvery(WARRANTY_PERIOD_LIST_LOAD_SUCCESS, function* (payload) {
    try {
      const data = yield call(warrantyPeriodListAPI);
      if (typeof data != undefined) {
        yield put(getWarrantyPeriodList(data.data));
      }
    } catch (error) {
      yield put(warrantyPeriodListError(error));
    }
  });
}

export function* highlightListAllSaga() {
  yield takeEvery(GET_COMMON_HIGHLIGHT_ALL, function* (payload) {
    try {
      const data = yield call(highlightListAllAPI);
      yield put(getCommonHighlightAllSuccess(data.data));
    } catch (error) {
      yield put(getCommonHighlightAllError(error));
    }
  });
}

export function* productListSaga() {
  yield takeEvery(GET_COMMON_PRODUCT_LIST, function* (payload) {
    try {
      const data = yield call(productListAPI);

      yield put(getCommonProductAllSuccess(data.data.hits.hits));
    } catch (error) {
      yield put(getCommonProductError(error.message));
    }
  });
}

export function* customerSegmentList() {
  yield takeEvery(
    CUSTOMER_SEGMENT_LIST_COMMON_LOAD_SUCCESS,
    function* (payload) {
      try {
        const data = yield call(customerSegmentListAPI, payload);
        if (typeof data != undefined) {
          yield put(getCustomerSegmentListCommon(data.data));
        }
      } catch (error) {
        yield put(customerSegmentListError(error));
      }
    }
  );
}

export function* collectionCommonList() {
  yield takeEvery(
    CommonCollection.GET_COMMON_COLLECTION_LIST,
    function* (payload) {
      try {
        const data = yield call(collectionCommonListAPI);
        if (typeof data != undefined) {
          yield put(getCollectionCommonListSuccess(data.data.data));
        }
      } catch (error) {
        yield put(getCollectionCommonListError(error.message));
      }
    }
  );
}

export function* getLogHistorySaga() {
  yield takeEvery(LOG_HISTORY_LOAD_SUCCESS, function* (payload) {
    try {
      const data = yield call(logHistoryAPI, payload.page, payload.module);
      yield put(getLogHistory(data.data.docs, data.data.totalDocs));
    } catch (error) {
      yield put(logHistoryErrorShow(error.message));
    }
  });
}
export function* cardTypeCommonList() {
  yield takeEvery(GET_COMMON_CARD_TYPE, function* (payload) {
    try {
      const data = yield call(cardTypeCommonListAPI);
      if (typeof data != undefined) {
        yield put(getCardTypeCommonListSuccess(data.data.data));
      }
    } catch (error) {
      yield put(getCardTypeCommonListError(error.message));
    }
  });
}

export function* bankList() {
  yield takeEvery(BANK_LIST_LOAD_SUCCESS, function* (payload) {
    try {
      const data = yield call(bankListAPI);
      if (typeof data != undefined) {
        yield put(getBankList(data.data));
      }
    } catch (error) {
      yield put(bankListError(error));
    }
  });
}

export function* countryList() {
  yield takeEvery(COUNTRY_LIST_LOAD_SUCCESS, function* (payload) {
    try {
      const data = yield call(countryListAPI);
      if (typeof data != undefined) {
        yield put(getCountryList(data.data));
      }
    } catch (error) {
      yield put(countryListError(error));
    }
  });
}

export function* cardBinAllTypeCommonList() {
  yield takeEvery(
    CommonCardBinAllType.GET_COMMON_CARD_BIN_ALL,
    function* (payload) {
      console.log(payload.data, "_____P");
      try {
        const data = yield call(cardBinAllTypeCommonListAPI, payload.data);
        if (typeof data != undefined) {
          yield put(getCardBinAllTypeCommonListSuccess(data.data.data));
        }
      } catch (error) {
        yield put(getCardBinAllTypeCommonListError(error.message));
      }
    }
  );
}

export function* categoryTree() {
  yield takeEvery(
    CommonCategoryTree.GET_COMMON_CATEGORY_TREE_SUCCESS,
    function* (payload) {
      try {
        const data = yield call(categoryTreeAPI);
        if (typeof data != undefined) {
          yield put(getCategoryTree(data.data.data));
        }
      } catch (error) {
        yield put(categoryTreeError(error));
      }
    }
  );
}

export function* catelogRootTree() {
  yield takeEvery(
    CommonCatlogRootTree.GET_ROOT_CATLOG_TREE,
    function* (payload) {
      try {
        const data = yield call(rootCategoryTreeAPI);
        if (typeof data != undefined) {
          yield put(getRootCategoryTree(data.data.data));
        }
      } catch (error) {
        yield put(rootCategoryTreeError(error));
      }
    }
  );
}

export function* districtCommonList() {
  yield takeEvery(DistrictAllType.GET_DISTRICT_ALL, function* (payload) {
    try {
      const data = yield call(districtListAPI);

      if (typeof data != undefined) {
        yield put(getDistrictListSuccess(data.data.data));
      }
    } catch (error) {
      yield put(getDistrictListError(error.message));
    }
  });
}
export function* productSearchFromElasticSaga() {
  yield takeEvery(
    CommonElasticProductSearch.PRODUCT_SEARCH_ELASTIC,
    function* (payload) {
      try {
        const data = yield call(
          fetchProductsElastic,
          payload.data,
          payload.merchantCode
        );
        const loop = data.data.data;
        yield put(elasticProductSearchSuccess(loop));
      } catch (error) {
        yield put(elasticProductSearchErrorShow(error.message));
        yield delay(4000);
        yield put(elasticProductSearchErrorHide());
      }
    }
  );
}

export function* productSearchFromElasticForBackofficeSaga() {
  yield takeEvery(
    CommonElasticProductSearchForBackoffice.PRODUCT_SEARCH_ELASTIC_BACKOFFICE,
    function* (payload) {
      try {
        const data = yield call(
          fetchProductsElasticForBackoffice,
          payload.data,
          payload.merchantCode
        );
        const loop = data.data.data;
        yield put(elasticProductSearchSuccess(loop));
      } catch (error) {
        yield put(elasticProductSearchErrorShow(error.message));
        yield delay(4000);
        yield put(elasticProductSearchErrorHide());
      }
    }
  );
}

export function* getProductNamesSaga() {
  yield takeEvery(ProductNamesGetTypes.PRODUCT_NAMES_GET, function* (payload) {
    const object = {
      products: payload.data,
    };

    const response = yield call(fetchProductNames, object);

    if (response) {
      yield put(getProductNameActionSucess(response.data));
    } else {
      yield put(getProductNameActionErrorShow());
      yield delay(4000);
      yield put(getProductNameActionErrorHide());
    }
  });
}

export function* getMerchantNamesSaga() {
  yield takeEvery(
    MerchantNamesGetTypes.MERCHANT_NAMES_GET,
    function* (payload) {
      const object = {
        code: payload.data,
      };

      const response = yield call(fetchMerchantNames, object);
      if (response) {
        yield put(getMerchantNameActionSucess(response.data));
      } else {
        yield put(getMerchantNameActionErrorShow());
        yield delay(4000);
        yield put(getMerchantNameActionErrorHide());
      }
    }
  );
}

export function* getCategoryNamesSaga() {
  yield takeEvery(
    CategoryNamesGetTypes.CATEGORY_NAMES_GET,
    function* (payload) {
      const object = {
        category: payload.data,
      };
      const response = yield call(fetchCategoryNames, object);
      if (response) {
        yield put(getCategoryNameActionSucess(response.data));
      } else {
        yield put(getCategoryNameActionErrorShow());
        yield delay(4000);
        yield put(getCategoryNameActionErrorHide());
      }
    }
  );
}

export function* specificCustomerList() {
  yield takeEvery(SpecificCustomers.GET_CUSTOMER_LIST_S, function* (payload) {
    try {
      const data = yield call(customerListAPI);

      if (typeof data != undefined) {
        yield put(getCustomertListSuccess(data.data.data));
      }
    } catch (error) {
      yield put(getCustomerListError(error.message));
    }
  });
}

//MERCHANT CATEGORY LIST SAGA
export function* getMerchantCatListSaga() {
  yield takeEvery(
    GetMerchantCategoriesTypes.GET_MERCHANT_CATEGORIES_LIST,
    function* () {
      try {
        const data = yield call(getMerchantCategoriesListAPI);
        if (typeof data != undefined) {
          yield put(getMerchantCatActionSucess(data.data.data));
        }
      } catch (error) {
        yield put(getMerchantCatActionErrorShow());
        yield delay(4000);
        yield put(getMerchantCatActionErrorHide());
      }
    }
  );
}

//Promo elastic product search
export function* promoProductSearchFromElasticSaga() {
  yield takeEvery(
    PromoElasticProductSearch.PROMO_PRODUCT_SEARCH_ELASTIC,
    function* (payload) {
      try {
        const data = yield call(
          fetchProductsElastic,
          payload.data,
          payload.merchantCode
        );
        const loop = data.data.data;
        yield put(promoElasticProductSearchSuccess, loop);
      } catch (error) {
        yield put(promoElasticProductSearchErrorShow(error.message));
        yield delay(4000);
        yield put(promoElasticProductSearchErrorHide());
      }
    }
  );
}

export default function* rootSaga() {
  yield all([
    fork(imageUploadSaga),
    fork(fileUploadSaga),
    fork(categoryList),
    fork(brandList),
    fork(merchantList),
    fork(highlightList),
    fork(warrantyTypeList),
    fork(warrantyPeriodList),
    fork(optionList),
    fork(highlightListAllSaga),
    fork(productListSaga),
    fork(customerSegmentList),
    fork(collectionCommonList),
    fork(getLogHistorySaga),
    fork(cardTypeCommonList),
    fork(bankList),
    fork(countryList),
    fork(cardBinAllTypeCommonList),
    fork(categoryTree),
    fork(catelogRootTree),
    fork(districtCommonList),
    fork(productSearchFromElasticSaga),
    fork(getProductNamesSaga),
    fork(getMerchantNamesSaga),
    fork(getCategoryNamesSaga),
    fork(specificCustomerList),
    fork(getMerchantCatListSaga),
    fork(promoProductSearchFromElasticSaga),
    fork(productSearchFromElasticForBackofficeSaga)
  ]);
}
