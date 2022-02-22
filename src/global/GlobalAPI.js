import axios from "axios";

let baseUrl = process.env.REACT_APP_BASE_URL;

export const headers = {
  "Content-Type": "application/json",
  Accept: "*/*",
};

export const apiGetUserList = async () => {
  // GET user list
  let url = baseUrl + process.env.REACT_APP_USER_GET_LIST;
  let response;

  console.log("URL: " + url);
  await axios
    .get(url)
    .then((result) => {
      response = result.data;
    })
    .catch((err) => {
      console.log("Request Error: " + err);
      response = "{}";
    });
  console.log("response: " + JSON.stringify(response));
  return response;
};

export const apiGetRecipe = async () => {
  // GET Recipe List
  let url = baseUrl + process.env.REACT_APP_RECIPE;
  let response;

  console.log("URL: " + url);
  await axios
    .get(url)
    .then((result) => {
      response = result.data;
    })
    .catch((err) => {
      console.log("Request Error: " + err);
      response = "{}";
    });
  console.log("response: " + JSON.stringify(response));
  return response;
};

export const apiGetRecipeType = async () => {
  // GET Recipe Type List
  let url = baseUrl + process.env.REACT_APP_RECIPE_TYPE;
  let response;

  console.log("URL: " + url);
  await axios
    .get(url)
    .then((result) => {
      response = result.data;
    })
    .catch((err) => {
      console.log("Request Error: " + err);
      response = "{}";
    });
  console.log("response: " + JSON.stringify(response));
  return response;
};

export const apiGetRecordTypeList = async () => {
  // GET record type list
  let url = baseUrl + process.env.REACT_APP_RECORD_TYPE_GET_LIST;
  let response;

  console.log("URL: " + url);
  await axios
    .get(url)
    .then((result) => {
      response = result.data;
    })
    .catch((err) => {
      console.log("Request Error: " + err);
      response = "{}";
    });
  console.log("response: " + JSON.stringify(response));
  return response;
};

export const apiGetCategoryList = async (type) => {
  // GET category list
  type = type == null ? "" : type;
  let url = baseUrl + process.env.REACT_APP_CATEGORY_GET_LIST + "?type=" + type;
  let response;

  console.log("URL: " + url);
  await axios
    .get(url)
    .then((result) => {
      response = result.data;
    })
    .catch((err) => {
      console.log("Request Error: " + err);
      response = "{}";
    });
  console.log("response: " + JSON.stringify(response));
  return response;
};

export const apiGetSubcategoryList = async (recordType, category) => {
  // GET subcategory list
  recordType = recordType == null ? "" : recordType;
  category = category == null ? "" : category;
  let url =
    baseUrl +
    process.env.REACT_APP_SUBCATEGORY_GET_LIST +
    "?category=" +
    category +
    "&recordType=" +
    recordType;
  let response;

  console.log("URL: " + url);
  await axios
    .get(url)
    .then((result) => {
      response = result.data;
    })
    .catch((err) => {
      console.log("Request Error: " + err);
      response = "{}";
    });
  console.log("response: " + JSON.stringify(response));
  return response;
};

export const apiGetRemarkList = async () => {
  // GET subcategory list
  // recordType = recordType == null ? "" : recordType;
  // category = category == null ? "" : category;
  let url = baseUrl + process.env.REACT_APP_REMARK_GET_LIST;
  // "?category=" +
  // category +
  // "&recordType=" +
  // recordType;
  let response;

  console.log("URL: " + url);
  await axios
    .get(url)
    .then((result) => {
      response = result.data;
    })
    .catch((err) => {
      console.log("Request Error: " + err);
      response = "{}";
    });
  console.log("response: " + JSON.stringify(response));
  return response;
};

export const apiGetRecipeSearch = async (searchForm) => {
  // GET settlement list
  console.log("apiGetRecipeSearch searchForm: " + JSON.stringify(searchForm));

  let recipeTypeId =
    searchForm.recipeTypeId === null ? "" : searchForm.recipeTypeId;
  // let category = category == null ? "" : category;
  let url =
    baseUrl +
    process.env.REACT_APP_RECIPE_SEARCH +
    "/findByRecipeTypeId?recipeTypeId=" +
    recipeTypeId;
  // "&recordType=" +
  // recordType;
  let response;

  console.log("URL: " + url);
  await axios
    .get(url)
    .then((result) => {
      response = result.data;
    })
    .catch((err) => {
      console.log("Request Error: " + err);
      response = "{}";
    });
  console.log("response: " + JSON.stringify(response));
  return response;
};

export const apiPostSettlementCreate = async (settlementForm) => {
  // GET settlement list
  console.log(
    "apiPostSettlementCreate settlementForm: " + JSON.stringify(settlementForm)
  );

  let userId = settlementForm.userId === null ? "" : settlementForm.userId;
  // let category = category == null ? "" : category;
  let url =
    baseUrl +
    process.env.REACT_APP_SETTLEMENT_POST_CREATE +
    "?userId=" +
    userId;
  // "&recordType=" +
  // recordType;
  let response;

  console.log("URL: " + url);
  await axios
    .get(url)
    .then((result) => {
      response = result.data;
    })
    .catch((err) => {
      console.log("Request Error: " + err);
      response = "{}";
    });
  console.log("response: " + JSON.stringify(response));
  return response;
};
