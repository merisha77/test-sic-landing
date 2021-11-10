import {
  FETCH_HOMEPAGE_DATA,
  FETCH_HOMEPAGE_DATA_SUCCEEDED,
  FETCH_HOMEPAGE_DATA_FAILED,
  COURSE_SEARCH,
  COURSE_SEARCH_SUCCEEDED,
  COURSE_SEARCH_FAILED,
  FETCH_COUNTRIES,
  FETCH_COUNTRIES_SUCCEEDED,
  FETCH_COUNTRIES_FAILED,
  VALUE_CHANGED,
  DELETE_VALUE,
  FETCH_FILTERS,
  FETCH_FILTERS_FAILED,
  FETCH_FILTERS_SUCCEEDED,
  FETCH_ADDRESSES,
  FETCH_ADDRESSES_SUCCEEDED,
  FETCH_ADDRESSES_FAILED,
  FETCH_OTHER_TESTS,
  FETCH_OTHER_TESTS_SUCCEEDED,
  FETCH_OTHER_TESTS_FAILED,
  FETCH_ENGLISH_TESTS,
  FETCH_ENGLISH_TESTS_SUCCEEDED,
  FETCH_ENGLISH_TESTS_FAILED,
  FETCH_EDUCATION_SUCCEEDED,
  FETCH_EDUCATION_FAILED,
  FETCH_INTERESTS,
  FETCH_INTERESTS_SUCCEEDED,
  FETCH_INTERESTS_FAILED,
  FETCH_APPLICATIONS_SUCCEEDED,
  FETCH_APPLICATIONS_FAILED,
  FETCH_APPLICATIONS,
  FETCH_EDUCATION,
  FETCH_MESSAGES,
  FETCH_MESSAGES_FAILED,
  FETCH_MESSAGES_SUCCEEDED,
  FETCH_SUGGESTED_COURSES,
  FETCH_SUGGESTED_COURSES_SUCCEEDED,
  FETCH_SUGGESTED_COURSES_FAILED,
  FETCH_ADS,
  FETCH_ADS_SUCCEEDED,
  FETCH_ADS_FAILED,
  FETCH_BUDGET,
  FETCH_BUDGET_FAILED,
  FETCH_BUDGET_SUCCEEDED
} from "./index";

export const valueChanged = (field, value) => ({
  type: VALUE_CHANGED,
  payload: { field, value }
});

export const deleteValue = (field) => ({
  type: DELETE_VALUE,
  payload: { field }
});

export const fetchHomePageData = (_) => ({
  type: FETCH_HOMEPAGE_DATA,
  payload: {
    url: "/home-page-count",
    onSuccess: FETCH_HOMEPAGE_DATA_SUCCEEDED,
    onFailure: FETCH_HOMEPAGE_DATA_FAILED
  }
});

export const fetchSuggestionCourses = (_) => ({
  type: FETCH_SUGGESTED_COURSES,
  payload: {
    url: "/auto-suggestion/",
    onSuccess: FETCH_SUGGESTED_COURSES_SUCCEEDED,
    onFailure: FETCH_SUGGESTED_COURSES_FAILED
  }
});

export const courseSearch = (data = {}, url = "/faceted-search/?size=20") => ({
  type: COURSE_SEARCH,
  payload: {
    data,
    url: url,
    onSuccess: COURSE_SEARCH_SUCCEEDED,
    onFailure: COURSE_SEARCH_FAILED
  }
});

export const fetchCountries = (_) => ({
  type: FETCH_COUNTRIES,
  payload: {
    url: "/home-page-country",
    onSuccess: FETCH_COUNTRIES_SUCCEEDED,
    onFailure: FETCH_COUNTRIES_FAILED
  }
});

export const fetchAddresses = (_) => ({
  type: FETCH_ADDRESSES,
  payload: {
    url: "/contact-us/",
    onSuccess: FETCH_ADDRESSES_SUCCEEDED,
    onFailure: FETCH_ADDRESSES_FAILED
  }
});

//profile actions
export const fetchOtherTests = (_) => ({
  type: FETCH_OTHER_TESTS,
  payload: {
    url: "/profile/client-other-test/",
    onSuccess: FETCH_OTHER_TESTS_SUCCEEDED,
    onFailure: FETCH_OTHER_TESTS_FAILED
  }
});

export const fetchEnglishTests = (_) => ({
  type: FETCH_ENGLISH_TESTS,
  payload: {
    url: "/profile/client-english-test/",
    onSuccess: FETCH_ENGLISH_TESTS_SUCCEEDED,
    onFailure: FETCH_ENGLISH_TESTS_FAILED
  }
});

export const fetchEducationDetails = (_) => ({
  type: FETCH_EDUCATION,
  payload: {
    url: "/profile/client-education/",
    onSuccess: FETCH_EDUCATION_SUCCEEDED,
    onFailure: FETCH_EDUCATION_FAILED
  }
});

export const fetchInterests = (_) => ({
  type: FETCH_INTERESTS,
  payload: {
    url: "/profile/client-interest/",
    onSuccess: FETCH_INTERESTS_SUCCEEDED,
    onFailure: FETCH_INTERESTS_FAILED
  }
});

export const fetchApplications = (_) => ({
  type: FETCH_APPLICATIONS,
  payload: {
    url: "/profile/client-applications/",
    onSuccess: FETCH_APPLICATIONS_SUCCEEDED,
    onFailure: FETCH_APPLICATIONS_FAILED
  }
});

export const fetchMessages = (_) => ({
  type: FETCH_MESSAGES,
  payload: {
    url: "/profile/client-messages/",
    onSuccess: FETCH_MESSAGES_SUCCEEDED,
    onFailure: FETCH_MESSAGES_FAILED
  }
});

export const fetchAdvertisement = (_) => ({
  type: FETCH_ADS,
  payload: {
    url: "/ads/",
    onSuccess: FETCH_ADS_SUCCEEDED,
    onFailure: FETCH_ADS_FAILED
  }
});

export const fetchBudget = (_) => ({
  type: FETCH_BUDGET,
  payload: {
    url: "profile/client-budget/",
    onSuccess: FETCH_BUDGET_SUCCEEDED,
    onFailure: FETCH_BUDGET_FAILED
  }
});

export const serverSideInject = (data = {}) => ({
  type: COURSE_SEARCH_SUCCEEDED,
  data
});
