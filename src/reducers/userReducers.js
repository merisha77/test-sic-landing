import { fromJS } from "immutable";
import {
  FETCH_HOMEPAGE_DATA_SUCCEEDED,
  COURSE_SEARCH_SUCCEEDED,
  FETCH_COUNTRIES_SUCCEEDED,
  DELETE_VALUE,
  VALUE_CHANGED,
  FETCH_FILTERS_SUCCEEDED,
  FETCH_ADDRESSES_SUCCEEDED,
  FETCH_ENGLISH_TESTS_SUCCEEDED,
  FETCH_EDUCATION_SUCCEEDED,
  FETCH_INTERESTS_SUCCEEDED,
  FETCH_OTHER_TESTS_SUCCEEDED,
  FETCH_APPLICATIONS_SUCCEEDED,
  FETCH_MESSAGES_SUCCEEDED,
  FETCH_SUGGESTED_COURSES_SUCCEEDED,
  FETCH_ADS_SUCCEEDED,
  FETCH_BUDGET_SUCCEEDED
} from "../actions";

const initialState = fromJS({});

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case VALUE_CHANGED:
      return state.setIn(
        [...action.payload.field.split(".")],
        action.payload.value
      );

    case DELETE_VALUE:
      return state.deleteIn([...action.payload.field.split(".")]);

    case FETCH_HOMEPAGE_DATA_SUCCEEDED:
      return state.withMutations((s) => {
        const {
          data: { social_media }
        } = action.data;
        s.set("home", {
          social_media
        });
      });

    case FETCH_COUNTRIES_SUCCEEDED:
      return state.withMutations((s) => {
        const {
          data: { countries, course_category, degree_list, latest_blog }
        } = action.data;
        const continents = new Set();
        countries.forEach((c) => {
          continents.add(c.continent_name);
        });
        s.set("courses", course_category);
        s.set("categories", degree_list);
        s.set("countries", countries);
        s.set("latest_blogs", latest_blog);
        s.set("continents", Array.from(continents));
      });

    case FETCH_SUGGESTED_COURSES_SUCCEEDED:
      return state.set("courseSuggestions", action.data?.data);

    case COURSE_SEARCH_SUCCEEDED:
      return state.withMutations((s) => {
        s.delete("filterList");
        s.deleteIn(["searchData", "searchList"]);
        const {
          hits: { hits, total },
          aggregations
        } = action?.data;

        s.set("searchData", {
          total: total?.value
        });

        s.setIn(["searchData", "searchList"], hits);

        let _ = Object.keys(aggregations).forEach((a) => {
          let buckets = [];
          if (a === "address")
            buckets = aggregations[a]?.country_count?.buckets;
          else buckets = aggregations[a].buckets;

          let _ = buckets?.forEach((b) => {
            s.setIn(["aggregations", a, b?.key], b);
          });
        });
      });

    case FETCH_FILTERS_SUCCEEDED:
      return state.withMutations((s) =>
        action.data?.data.forEach((d) => s.setIn(["filterList", d.key], d))
      );

    case FETCH_ADDRESSES_SUCCEEDED:
      return state.set("contactUs", action.data?.data);

    //Profile
    case FETCH_OTHER_TESTS_SUCCEEDED:
      return state.setIn(["profile", "otherTests"], action?.data);

    case FETCH_ENGLISH_TESTS_SUCCEEDED:
      return state.setIn(["profile", "englishTests"], action?.data);

    case FETCH_EDUCATION_SUCCEEDED:
      return state.setIn(["profile", "educationData"], action?.data);

    case FETCH_INTERESTS_SUCCEEDED:
      return state.setIn(["profile", "interests"], action?.data);

    case FETCH_APPLICATIONS_SUCCEEDED:
      return state.setIn(["profile", "applications"], action?.data);

    case FETCH_MESSAGES_SUCCEEDED:
      return state.setIn(["profile", "messages"], action?.data);

    case FETCH_BUDGET_SUCCEEDED:
      return state.setIn(["profile", "budget"], action?.data);

    case FETCH_ADS_SUCCEEDED:
      return state.withMutations((s) => {
        s.set("banners", []);
        s.set("banners", action?.data?.data);
      });
    default:
      return state;
  }
};

export default userReducer;
