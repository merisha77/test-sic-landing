/**
 * The magic happens here...
 * @param data
 * this only takes filter data process that and return with subcategory
 */

export const getProcessedFilters = (data = {}) => {
  const noSub = ["study_load", "study_mode", "duration", "fee", "degree_level"];

  let dta = {
    sub_category_name: [],
    city_name: [],
    country_data: [],
    categorise_data: [],
    study_load: [],
    study_mode: [],
    duration: [],
    fee: [],
    degree_level: [],
  };
  const _ = Object.keys(data)?.forEach((key) => {
    if (noSub.includes(key)) {
      if (key === "fee" || key === "duration") {
        const rge = data[key].toString().split("-");
        if (data[key]?.length && rge?.length) {
          if (key === "fee")
            dta.fee.push({
              fee_from: rge[0],
              fee_to: rge[1],
              fee_type: "international",
            });
          else dta.duration.push({ from: rge[0], to: rge[1] });
        }
      } else dta[key] = data[key];
    } else {
      if (key === "categorise_data") {
        const _ = data[key]?.forEach((val) => {
          if (val.includes("---")) {
            dta.sub_category_name.push(val.split("---")[0]);
          } else {
            dta.categorise_data.push(val);
          }
        });
      } else if (key === "country_data") {
        const _ = data[key]?.forEach((val) => {
          if (val.includes("---")) {
            dta.city_name.push(val.split("---")[0]);
          } else {
            dta.country_data.push(val);
          }
        });
      }
    }
  });
  return dta;
};
