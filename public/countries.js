const countries = {
  AF: "Afghanistan",
  AL: "Albania",
  DZ: "Algeria",
  AS: "American Samoa",
  AD: "Andorra",
  AO: "Angola",
  AI: "Anguilla",
  AG: "Antigua and Barbuda",
  AR: "Argentina",
  AM: "Armenia",
  AW: "Aruba",
  AU: "Australia",
  AT: "Austria",
  AZ: "Azerbaijan",
  BS: "Bahamas",
  BH: "Bahrain",
  BD: "Bangladesh",
  BB: "Barbados",
  BY: "Belarus",
  BE: "Belgium",
  BZ: "Belize",
  BJ: "Benin",
  BM: "Bermuda",
  BT: "Bhutan",
  BO: "Bolivia, Plurinational State of",
  BA: "Bosnia and Herzegovina",
  BW: "Botswana",
  BR: "Brazil",
  IO: "British Indian Ocean Territory",
  BG: "Bulgaria",
  BF: "Burkina Faso",
  BI: "Burundi",
  KH: "Cambodia",
  CM: "Cameroon",
  CA: "Canada",
  CV: "Cape Verde",
  KY: "Cayman Islands",
  CF: "Central African Republic",
  TD: "Chad",
  CL: "Chile",
  CN: "China",
  CO: "Colombia",
  KM: "Comoros",
  CG: "Congo",
  CD: "Democratic Republic of the Congo",
  CK: "Cook Islands",
  CR: "Costa Rica",
  CI: "Côte d'Ivoire",
  HR: "Croatia",
  CU: "Cuba",
  CW: "Curaçao",
  CY: "Cyprus",
  CZ: "Czech Republic",
  DK: "Denmark",
  DJ: "Djibouti",
  DM: "Dominica",
  DO: "Dominican Republic",
  EC: "Ecuador",
  EG: "Egypt",
  SV: "El Salvador",
  GQ: "Equatorial Guinea",
  ER: "Eritrea",
  EE: "Estonia",
  ET: "Ethiopia",
  FK: "Falkland Islands (Malvinas)",
  FO: "Faroe Islands",
  FJ: "Fiji",
  FI: "Finland",
  FR: "France",
  PF: "French Polynesia",
  GA: "Gabon",
  GM: "Gambia",
  GE: "Georgia",
  DE: "Germany",
  GH: "Ghana",
  GI: "Gibraltar",
  GR: "Greece",
  GL: "Greenland",
  GD: "Grenada",
  GU: "Guam",
  GT: "Guatemala",
  GG: "Guernsey",
  GN: "Guinea",
  GW: "Guinea-Bissau",
  HT: "Haiti",
  HN: "Honduras",
  HK: "Hong Kong",
  HU: "Hungary",
  IS: "Iceland",
  IN: "India",
  ID: "Indonesia",
  IR: "Iran, Islamic Republic of",
  IQ: "Iraq",
  IE: "Ireland",
  IM: "Isle of Man",
  IL: "Israel",
  IT: "Italy",
  JM: "Jamaica",
  JP: "Japan",
  JE: "Jersey",
  JO: "Jordan",
  KZ: "Kazakhstan",
  KE: "Kenya",
  KI: "Kiribati",
  KP: "North Korea",
  KR: "South Korea",
  KW: "Kuwait",
  KG: "Kyrgyzstan",
  LA: "Lao People's Democratic Republic",
  LV: "Latvia",
  LB: "Lebanon",
  LS: "Lesotho",
  LR: "Liberia",
  LY: "Libya",
  LI: "Liechtenstein",
  LT: "Lithuania",
  LU: "Luxembourg",
  MO: "Macao",
  MK: "Republic of Macedonia",
  MG: "Madagascar",
  MW: "Malawi",
  MY: "Malaysia",
  MV: "Maldives",
  ML: "Mali",
  MT: "Malta",
  MH: "Marshall Islands",
  MQ: "Martinique",
  MR: "Mauritania",
  MU: "Mauritius",
  MX: "Mexico",
  FM: "Micronesia, Federated States of",
  MD: "Republic of Moldova",
  MC: "Monaco",
  MN: "Mongolia",
  ME: "Montenegro",
  MS: "Montserrat",
  MA: "Morocco",
  MZ: "Mozambique",
  MM: "Myanmar",
  NA: "Namibia",
  NR: "Nauru",
  NP: "Nepal",
  NL: "Netherlands",
  NZ: "New Zealand",
  NI: "Nicaragua",
  NE: "Niger",
  NG: "Nigeria",
  NU: "Niue",
  NF: "Norfolk Island",
  MP: "Northern Mariana Islands",
  NO: "Norway",
  OM: "Oman",
  PK: "Pakistan",
  PW: "Palau",
  PS: "Palestinian Territory",
  PA: "Panama",
  PG: "Papua New Guinea",
  PY: "Paraguay",
  PE: "Peru",
  PH: "Philippines",
  PN: "Pitcairn",
  PL: "Poland",
  PT: "Portugal",
  PR: "Puerto Rico",
  QA: "Qatar",
  RO: "Romania",
  RU: "Russian",
  RW: "Rwanda",
  KN: "Saint Kitts and Nevis",
  LC: "Saint Lucia",
  WS: "Samoa",
  SM: "San Marino",
  ST: "Sao Tome and Principe",
  SA: "Saudi Arabia",
  SN: "Senegal",
  RS: "Serbia",
  SC: "Seychelles",
  SL: "Sierra Leone",
  SG: "Singapore",
  SX: "Sint Maarten",
  SK: "Slovakia",
  SI: "Slovenia",
  SB: "Solomon Islands",
  SO: "Somalia",
  ZA: "South Africa",
  SS: "South Sudan",
  ES: "Spain",
  LK: "Sri Lanka",
  SD: "Sudan",
  SR: "Suriname",
  SZ: "Swaziland",
  SE: "Sweden",
  CH: "Switzerland",
  SY: "Syria",
  TW: "Taiwan",
  TJ: "Tajikistan",
  TZ: "Tanzania",
  TH: "Thailand",
  TG: "Togo",
  TK: "Tokelau",
  TO: "Tonga",
  TT: "Trinidad and Tobago",
  TN: "Tunisia",
  TR: "Turkey",
  TM: "Turkmenistan",
  TC: "Turks and Caicos Islands",
  TV: "Tuvalu",
  UG: "Uganda",
  UA: "Ukraine",
  AE: "United Arab Emirates",
  GB: "United Kingdom",
  US: "United States",
  UY: "Uruguay",
  UZ: "Uzbekistan",
  VU: "Vanuatu",
  VE: "Venezuela, Bolivarian Republic of",
  VN: "Viet Nam",
  VI: "Virgin Islands",
  YE: "Yemen",
  ZM: "Zambia",
  ZW: "Zimbabwe"
};
export default countries;

export const countryCodes = {
  AF: {
    name: "Afghanistan",
    alpha3Code: "AFG",
    alpha2Code: "AF",
    callingCodes: "93",
    currency: {
      code: "AFN",
      name: "Afghan afghani",
      symbol: "؋"
    }
  },
  AX: {
    name: "Åland Islands",
    alpha3Code: "ALA",
    alpha2Code: "AX",
    callingCodes: "358",
    currency: {
      code: "EUR",
      name: "Euro",
      symbol: "€"
    }
  },
  AL: {
    name: "Albania",
    alpha3Code: "ALB",
    alpha2Code: "AL",
    callingCodes: "355",
    currency: {
      code: "ALL",
      name: "Albanian lek",
      symbol: "L"
    }
  },
  DZ: {
    name: "Algeria",
    alpha3Code: "DZA",
    alpha2Code: "DZ",
    callingCodes: "213",
    currency: {
      code: "DZD",
      name: "Algerian dinar",
      symbol: "د.ج"
    }
  },
  AS: {
    name: "American Samoa",
    alpha3Code: "ASM",
    alpha2Code: "AS",
    callingCodes: "1684",
    currency: {
      code: "USD",
      name: "United State Dollar",
      symbol: "$"
    }
  },
  AD: {
    name: "Andorra",
    alpha3Code: "AND",
    alpha2Code: "AD",
    callingCodes: "376",
    currency: {
      code: "EUR",
      name: "Euro",
      symbol: "€"
    }
  },
  AO: {
    name: "Angola",
    alpha3Code: "AGO",
    alpha2Code: "AO",
    callingCodes: "244",
    currency: {
      code: "AOA",
      name: "Angolan kwanza",
      symbol: "Kz"
    }
  },
  AI: {
    name: "Anguilla",
    alpha3Code: "AIA",
    alpha2Code: "AI",
    callingCodes: "1264",
    currency: {
      code: "XCD",
      name: "East Caribbean dollar",
      symbol: "$"
    }
  },
  AQ: {
    name: "Antarctica",
    alpha3Code: "ATA",
    alpha2Code: "AQ",
    callingCodes: "672",
    currency: {
      code: "AUD",
      name: "Australian dollar",
      symbol: "$"
    }
  },
  AG: {
    name: "Antigua and Barbuda",
    alpha3Code: "ATG",
    alpha2Code: "AG",
    callingCodes: "1268",
    currency: {
      code: "XCD",
      name: "East Caribbean dollar",
      symbol: "$"
    }
  },
  AR: {
    name: "Argentina",
    alpha3Code: "ARG",
    alpha2Code: "AR",
    callingCodes: "54",
    currency: {
      code: "ARS",
      name: "Argentine peso",
      symbol: "$"
    }
  },
  AM: {
    name: "Armenia",
    alpha3Code: "ARM",
    alpha2Code: "AM",
    callingCodes: "374",
    currency: {
      code: "AMD",
      name: "Armenian dram",
      symbol: null
    }
  },
  AW: {
    name: "Aruba",
    alpha3Code: "ABW",
    alpha2Code: "AW",
    callingCodes: "297",
    currency: {
      code: "AWG",
      name: "Aruban florin",
      symbol: "ƒ"
    }
  },
  AU: {
    name: "Australia",
    alpha3Code: "AUS",
    alpha2Code: "AU",
    callingCodes: "61",
    currency: {
      code: "AUD",
      name: "Australian dollar",
      symbol: "$"
    }
  },
  AT: {
    name: "Austria",
    alpha3Code: "AUT",
    alpha2Code: "AT",
    callingCodes: "43",
    currency: {
      code: "EUR",
      name: "Euro",
      symbol: "€"
    }
  },
  AZ: {
    name: "Azerbaijan",
    alpha3Code: "AZE",
    alpha2Code: "AZ",
    callingCodes: "994",
    currency: {
      code: "AZN",
      name: "Azerbaijani manat",
      symbol: null
    }
  },
  BS: {
    name: "Bahamas",
    alpha3Code: "BHS",
    alpha2Code: "BS",
    callingCodes: "1242",
    currency: {
      code: "BSD",
      name: "Bahamian dollar",
      symbol: "$"
    }
  },
  BH: {
    name: "Bahrain",
    alpha3Code: "BHR",
    alpha2Code: "BH",
    callingCodes: "973",
    currency: {
      code: "BHD",
      name: "Bahraini dinar",
      symbol: ".د.ب"
    }
  },
  BD: {
    name: "Bangladesh",
    alpha3Code: "BGD",
    alpha2Code: "BD",
    callingCodes: "880",
    currency: {
      code: "BDT",
      name: "Bangladeshi taka",
      symbol: "৳"
    }
  },
  BB: {
    name: "Barbados",
    alpha3Code: "BRB",
    alpha2Code: "BB",
    callingCodes: "1246",
    currency: {
      code: "BBD",
      name: "Barbadian dollar",
      symbol: "$"
    }
  },
  BY: {
    name: "Belarus",
    alpha3Code: "BLR",
    alpha2Code: "BY",
    callingCodes: "375",
    currency: {
      code: "BYN",
      name: "New Belarusian ruble",
      symbol: "Br"
    }
  },
  BE: {
    name: "Belgium",
    alpha3Code: "BEL",
    alpha2Code: "BE",
    callingCodes: "32",
    currency: {
      code: "EUR",
      name: "Euro",
      symbol: "€"
    }
  },
  BZ: {
    name: "Belize",
    alpha3Code: "BLZ",
    alpha2Code: "BZ",
    callingCodes: "501",
    currency: {
      code: "BZD",
      name: "Belize dollar",
      symbol: "$"
    }
  },
  BJ: {
    name: "Benin",
    alpha3Code: "BEN",
    alpha2Code: "BJ",
    callingCodes: "229",
    currency: {
      code: "XOF",
      name: "West African CFA franc",
      symbol: "Fr"
    }
  },
  BM: {
    name: "Bermuda",
    alpha3Code: "BMU",
    alpha2Code: "BM",
    callingCodes: "1441",
    currency: {
      code: "BMD",
      name: "Bermudian dollar",
      symbol: "$"
    }
  },
  BT: {
    name: "Bhutan",
    alpha3Code: "BTN",
    alpha2Code: "BT",
    callingCodes: "975",
    currency: {
      code: "BTN",
      name: "Bhutanese ngultrum",
      symbol: "Nu."
    }
  },
  BO: {
    name: "Bolivia (Plurinational State of)",
    alpha3Code: "BOL",
    alpha2Code: "BO",
    callingCodes: "591",
    currency: {
      code: "BOB",
      name: "Bolivian boliviano",
      symbol: "Bs."
    }
  },
  BQ: {
    name: "Bonaire, Sint Eustatius and Saba",
    alpha3Code: "BES",
    alpha2Code: "BQ",
    callingCodes: "5997",
    currency: {
      code: "USD",
      name: "United States dollar",
      symbol: "$"
    }
  },
  BA: {
    name: "Bosnia and Herzegovina",
    alpha3Code: "BIH",
    alpha2Code: "BA",
    callingCodes: "387",
    currency: {
      code: "BAM",
      name: "Bosnia and Herzegovina convertible mark",
      symbol: null
    }
  },
  BW: {
    name: "Botswana",
    alpha3Code: "BWA",
    alpha2Code: "BW",
    callingCodes: "267",
    currency: {
      code: "BWP",
      name: "Botswana pula",
      symbol: "P"
    }
  },
  BV: {
    name: "Bouvet Island",
    alpha3Code: "BVT",
    alpha2Code: "BV",
    callingCodes: "",
    currency: {
      code: "NOK",
      name: "Norwegian krone",
      symbol: "kr"
    }
  },
  BR: {
    name: "Brazil",
    alpha3Code: "BRA",
    alpha2Code: "BR",
    callingCodes: "55",
    currency: {
      code: "BRL",
      name: "Brazilian real",
      symbol: "R$"
    }
  },
  IO: {
    name: "British Indian Ocean Territory",
    alpha3Code: "IOT",
    alpha2Code: "IO",
    callingCodes: "246",
    currency: {
      code: "USD",
      name: "United States dollar",
      symbol: "$"
    }
  },
  UM: {
    name: "United States Minor Outlying Islands",
    alpha3Code: "UMI",
    alpha2Code: "UM",
    callingCodes: "",
    currency: {
      code: "USD",
      name: "United States Dollar",
      symbol: "$"
    }
  },
  VG: {
    name: "Virgin Islands (British)",
    alpha3Code: "VGB",
    alpha2Code: "VG",
    callingCodes: "1284",
    currency: {
      code: null,
      name: "[D]",
      symbol: "$"
    }
  },
  VI: {
    name: "Virgin Islands (U.S.)",
    alpha3Code: "VIR",
    alpha2Code: "VI",
    callingCodes: "1 340",
    currency: {
      code: "USD",
      name: "United States dollar",
      symbol: "$"
    }
  },
  BN: {
    name: "Brunei Darussalam",
    alpha3Code: "BRN",
    alpha2Code: "BN",
    callingCodes: "673",
    currency: {
      code: "BND",
      name: "Brunei dollar",
      symbol: "$"
    }
  },
  BG: {
    name: "Bulgaria",
    alpha3Code: "BGR",
    alpha2Code: "BG",
    callingCodes: "359",
    currency: {
      code: "BGN",
      name: "Bulgarian lev",
      symbol: "лв"
    }
  },
  BF: {
    name: "Burkina Faso",
    alpha3Code: "BFA",
    alpha2Code: "BF",
    callingCodes: "226",
    currency: {
      code: "XOF",
      name: "West African CFA franc",
      symbol: "Fr"
    }
  },
  BI: {
    name: "Burundi",
    alpha3Code: "BDI",
    alpha2Code: "BI",
    callingCodes: "257",
    currency: {
      code: "BIF",
      name: "Burundian franc",
      symbol: "Fr"
    }
  },
  KH: {
    name: "Cambodia",
    alpha3Code: "KHM",
    alpha2Code: "KH",
    callingCodes: "855",
    currency: {
      code: "KHR",
      name: "Cambodian riel",
      symbol: "៛"
    }
  },
  CM: {
    name: "Cameroon",
    alpha3Code: "CMR",
    alpha2Code: "CM",
    callingCodes: "237",
    currency: {
      code: "XAF",
      name: "Central African CFA franc",
      symbol: "Fr"
    }
  },
  CA: {
    name: "Canada",
    alpha3Code: "CAN",
    alpha2Code: "CA",
    callingCodes: "1",
    currency: {
      code: "CAD",
      name: "Canadian dollar",
      symbol: "$"
    }
  },
  CV: {
    name: "Cabo Verde",
    alpha3Code: "CPV",
    alpha2Code: "CV",
    callingCodes: "238",
    currency: {
      code: "CVE",
      name: "Cape Verdean escudo",
      symbol: "Esc"
    }
  },
  KY: {
    name: "Cayman Islands",
    alpha3Code: "CYM",
    alpha2Code: "KY",
    callingCodes: "1345",
    currency: {
      code: "KYD",
      name: "Cayman Islands dollar",
      symbol: "$"
    }
  },
  CF: {
    name: "Central African Republic",
    alpha3Code: "CAF",
    alpha2Code: "CF",
    callingCodes: "236",
    currency: {
      code: "XAF",
      name: "Central African CFA franc",
      symbol: "Fr"
    }
  },
  TD: {
    name: "Chad",
    alpha3Code: "TCD",
    alpha2Code: "TD",
    callingCodes: "235",
    currency: {
      code: "XAF",
      name: "Central African CFA franc",
      symbol: "Fr"
    }
  },
  CL: {
    name: "Chile",
    alpha3Code: "CHL",
    alpha2Code: "CL",
    callingCodes: "56",
    currency: {
      code: "CLP",
      name: "Chilean peso",
      symbol: "$"
    }
  },
  CN: {
    name: "China",
    alpha3Code: "CHN",
    alpha2Code: "CN",
    callingCodes: "86",
    currency: {
      code: "CNY",
      name: "Chinese yuan",
      symbol: "¥"
    }
  },
  CX: {
    name: "Christmas Island",
    alpha3Code: "CXR",
    alpha2Code: "CX",
    callingCodes: "61",
    currency: {
      code: "AUD",
      name: "Australian dollar",
      symbol: "$"
    }
  },
  CC: {
    name: "Cocos (Keeling) Islands",
    alpha3Code: "CCK",
    alpha2Code: "CC",
    callingCodes: "61",
    currency: {
      code: "AUD",
      name: "Australian dollar",
      symbol: "$"
    }
  },
  CO: {
    name: "Colombia",
    alpha3Code: "COL",
    alpha2Code: "CO",
    callingCodes: "57",
    currency: {
      code: "COP",
      name: "Colombian peso",
      symbol: "$"
    }
  },
  KM: {
    name: "Comoros",
    alpha3Code: "COM",
    alpha2Code: "KM",
    callingCodes: "269",
    currency: {
      code: "KMF",
      name: "Comorian franc",
      symbol: "Fr"
    }
  },
  CG: {
    name: "Congo",
    alpha3Code: "COG",
    alpha2Code: "CG",
    callingCodes: "242",
    currency: {
      code: "XAF",
      name: "Central African CFA franc",
      symbol: "Fr"
    }
  },
  CD: {
    name: "Congo (Democratic Republic of the)",
    alpha3Code: "COD",
    alpha2Code: "CD",
    callingCodes: "243",
    currency: {
      code: "CDF",
      name: "Congolese franc",
      symbol: "Fr"
    }
  },
  CK: {
    name: "Cook Islands",
    alpha3Code: "COK",
    alpha2Code: "CK",
    callingCodes: "682",
    currency: {
      code: "NZD",
      name: "New Zealand dollar",
      symbol: "$"
    }
  },
  CR: {
    name: "Costa Rica",
    alpha3Code: "CRI",
    alpha2Code: "CR",
    callingCodes: "506",
    currency: {
      code: "CRC",
      name: "Costa Rican colón",
      symbol: "₡"
    }
  },
  HR: {
    name: "Croatia",
    alpha3Code: "HRV",
    alpha2Code: "HR",
    callingCodes: "385",
    currency: {
      code: "HRK",
      name: "Croatian kuna",
      symbol: "kn"
    }
  },
  CU: {
    name: "Cuba",
    alpha3Code: "CUB",
    alpha2Code: "CU",
    callingCodes: "53",
    currency: {
      code: "CUC",
      name: "Cuban convertible peso",
      symbol: "$"
    }
  },
  CW: {
    name: "Curaçao",
    alpha3Code: "CUW",
    alpha2Code: "CW",
    callingCodes: "599",
    currency: {
      code: "ANG",
      name: "Netherlands Antillean guilder",
      symbol: "ƒ"
    }
  },
  CY: {
    name: "Cyprus",
    alpha3Code: "CYP",
    alpha2Code: "CY",
    callingCodes: "357",
    currency: {
      code: "EUR",
      name: "Euro",
      symbol: "€"
    }
  },
  CZ: {
    name: "Czech Republic",
    alpha3Code: "CZE",
    alpha2Code: "CZ",
    callingCodes: "420",
    currency: {
      code: "CZK",
      name: "Czech koruna",
      symbol: "Kč"
    }
  },
  DK: {
    name: "Denmark",
    alpha3Code: "DNK",
    alpha2Code: "DK",
    callingCodes: "45",
    currency: {
      code: "DKK",
      name: "Danish krone",
      symbol: "kr"
    }
  },
  DJ: {
    name: "Djibouti",
    alpha3Code: "DJI",
    alpha2Code: "DJ",
    callingCodes: "253",
    currency: {
      code: "DJF",
      name: "Djiboutian franc",
      symbol: "Fr"
    }
  },
  DM: {
    name: "Dominica",
    alpha3Code: "DMA",
    alpha2Code: "DM",
    callingCodes: "1767",
    currency: {
      code: "XCD",
      name: "East Caribbean dollar",
      symbol: "$"
    }
  },
  DO: {
    name: "Dominican Republic",
    alpha3Code: "DOM",
    alpha2Code: "DO",
    callingCodes: "1809",
    currency: {
      code: "DOP",
      name: "Dominican peso",
      symbol: "$"
    }
  },
  EC: {
    name: "Ecuador",
    alpha3Code: "ECU",
    alpha2Code: "EC",
    callingCodes: "593",
    currency: {
      code: "USD",
      name: "United States dollar",
      symbol: "$"
    }
  },
  EG: {
    name: "Egypt",
    alpha3Code: "EGY",
    alpha2Code: "EG",
    callingCodes: "20",
    currency: {
      code: "EGP",
      name: "Egyptian pound",
      symbol: "£"
    }
  },
  SV: {
    name: "El Salvador",
    alpha3Code: "SLV",
    alpha2Code: "SV",
    callingCodes: "503",
    currency: {
      code: "USD",
      name: "United States dollar",
      symbol: "$"
    }
  },
  GQ: {
    name: "Equatorial Guinea",
    alpha3Code: "GNQ",
    alpha2Code: "GQ",
    callingCodes: "240",
    currency: {
      code: "XAF",
      name: "Central African CFA franc",
      symbol: "Fr"
    }
  },
  ER: {
    name: "Eritrea",
    alpha3Code: "ERI",
    alpha2Code: "ER",
    callingCodes: "291",
    currency: {
      code: "ERN",
      name: "Eritrean nakfa",
      symbol: "Nfk"
    }
  },
  EE: {
    name: "Estonia",
    alpha3Code: "EST",
    alpha2Code: "EE",
    callingCodes: "372",
    currency: {
      code: "EUR",
      name: "Euro",
      symbol: "€"
    }
  },
  ET: {
    name: "Ethiopia",
    alpha3Code: "ETH",
    alpha2Code: "ET",
    callingCodes: "251",
    currency: {
      code: "ETB",
      name: "Ethiopian birr",
      symbol: "Br"
    }
  },
  FK: {
    name: "Falkland Islands (Malvinas)",
    alpha3Code: "FLK",
    alpha2Code: "FK",
    callingCodes: "500",
    currency: {
      code: "FKP",
      name: "Falkland Islands pound",
      symbol: "£"
    }
  },
  FO: {
    name: "Faroe Islands",
    alpha3Code: "FRO",
    alpha2Code: "FO",
    callingCodes: "298",
    currency: {
      code: "DKK",
      name: "Danish krone",
      symbol: "kr"
    }
  },
  FJ: {
    name: "Fiji",
    alpha3Code: "FJI",
    alpha2Code: "FJ",
    callingCodes: "679",
    currency: {
      code: "FJD",
      name: "Fijian dollar",
      symbol: "$"
    }
  },
  FI: {
    name: "Finland",
    alpha3Code: "FIN",
    alpha2Code: "FI",
    callingCodes: "358",
    currency: {
      code: "EUR",
      name: "Euro",
      symbol: "€"
    }
  },
  FR: {
    name: "France",
    alpha3Code: "FRA",
    alpha2Code: "FR",
    callingCodes: "33",
    currency: {
      code: "EUR",
      name: "Euro",
      symbol: "€"
    }
  },
  GF: {
    name: "French Guiana",
    alpha3Code: "GUF",
    alpha2Code: "GF",
    callingCodes: "594",
    currency: {
      code: "EUR",
      name: "Euro",
      symbol: "€"
    }
  },
  PF: {
    name: "French Polynesia",
    alpha3Code: "PYF",
    alpha2Code: "PF",
    callingCodes: "689",
    currency: {
      code: "XPF",
      name: "CFP franc",
      symbol: "Fr"
    }
  },
  TF: {
    name: "French Southern Territories",
    alpha3Code: "ATF",
    alpha2Code: "TF",
    callingCodes: "",
    currency: {
      code: "EUR",
      name: "Euro",
      symbol: "€"
    }
  },
  GA: {
    name: "Gabon",
    alpha3Code: "GAB",
    alpha2Code: "GA",
    callingCodes: "241",
    currency: {
      code: "XAF",
      name: "Central African CFA franc",
      symbol: "Fr"
    }
  },
  GM: {
    name: "Gambia",
    alpha3Code: "GMB",
    alpha2Code: "GM",
    callingCodes: "220",
    currency: {
      code: "GMD",
      name: "Gambian dalasi",
      symbol: "D"
    }
  },
  GE: {
    name: "Georgia",
    alpha3Code: "GEO",
    alpha2Code: "GE",
    callingCodes: "995",
    currency: {
      code: "GEL",
      name: "Georgian Lari",
      symbol: "ლ"
    }
  },
  DE: {
    name: "Germany",
    alpha3Code: "DEU",
    alpha2Code: "DE",
    callingCodes: "49",
    currency: {
      code: "EUR",
      name: "Euro",
      symbol: "€"
    }
  },
  GH: {
    name: "Ghana",
    alpha3Code: "GHA",
    alpha2Code: "GH",
    callingCodes: "233",
    currency: {
      code: "GHS",
      name: "Ghanaian cedi",
      symbol: "₵"
    }
  },
  GI: {
    name: "Gibraltar",
    alpha3Code: "GIB",
    alpha2Code: "GI",
    callingCodes: "350",
    currency: {
      code: "GIP",
      name: "Gibraltar pound",
      symbol: "£"
    }
  },
  GR: {
    name: "Greece",
    alpha3Code: "GRC",
    alpha2Code: "GR",
    callingCodes: "30",
    currency: {
      code: "EUR",
      name: "Euro",
      symbol: "€"
    }
  },
  GL: {
    name: "Greenland",
    alpha3Code: "GRL",
    alpha2Code: "GL",
    callingCodes: "299",
    currency: {
      code: "DKK",
      name: "Danish krone",
      symbol: "kr"
    }
  },
  GD: {
    name: "Grenada",
    alpha3Code: "GRD",
    alpha2Code: "GD",
    callingCodes: "1473",
    currency: {
      code: "XCD",
      name: "East Caribbean dollar",
      symbol: "$"
    }
  },
  GP: {
    name: "Guadeloupe",
    alpha3Code: "GLP",
    alpha2Code: "GP",
    callingCodes: "590",
    currency: {
      code: "EUR",
      name: "Euro",
      symbol: "€"
    }
  },
  GU: {
    name: "Guam",
    alpha3Code: "GUM",
    alpha2Code: "GU",
    callingCodes: "1671",
    currency: {
      code: "USD",
      name: "United States dollar",
      symbol: "$"
    }
  },
  GT: {
    name: "Guatemala",
    alpha3Code: "GTM",
    alpha2Code: "GT",
    callingCodes: "502",
    currency: {
      code: "GTQ",
      name: "Guatemalan quetzal",
      symbol: "Q"
    }
  },
  GG: {
    name: "Guernsey",
    alpha3Code: "GGY",
    alpha2Code: "GG",
    callingCodes: "44",
    currency: {
      code: "GBP",
      name: "British pound",
      symbol: "£"
    }
  },
  GN: {
    name: "Guinea",
    alpha3Code: "GIN",
    alpha2Code: "GN",
    callingCodes: "224",
    currency: {
      code: "GNF",
      name: "Guinean franc",
      symbol: "Fr"
    }
  },
  GW: {
    name: "Guinea-Bissau",
    alpha3Code: "GNB",
    alpha2Code: "GW",
    callingCodes: "245",
    currency: {
      code: "XOF",
      name: "West African CFA franc",
      symbol: "Fr"
    }
  },
  GY: {
    name: "Guyana",
    alpha3Code: "GUY",
    alpha2Code: "GY",
    callingCodes: "592",
    currency: {
      code: "GYD",
      name: "Guyanese dollar",
      symbol: "$"
    }
  },
  HT: {
    name: "Haiti",
    alpha3Code: "HTI",
    alpha2Code: "HT",
    callingCodes: "509",
    currency: {
      code: "HTG",
      name: "Haitian gourde",
      symbol: "G"
    }
  },
  HM: {
    name: "Heard Island and McDonald Islands",
    alpha3Code: "HMD",
    alpha2Code: "HM",
    callingCodes: "",
    currency: {
      code: "AUD",
      name: "Australian dollar",
      symbol: "$"
    }
  },
  VA: {
    name: "Holy See",
    alpha3Code: "VAT",
    alpha2Code: "VA",
    callingCodes: "379",
    currency: {
      code: "EUR",
      name: "Euro",
      symbol: "€"
    }
  },
  HN: {
    name: "Honduras",
    alpha3Code: "HND",
    alpha2Code: "HN",
    callingCodes: "504",
    currency: {
      code: "HNL",
      name: "Honduran lempira",
      symbol: "L"
    }
  },
  HK: {
    name: "Hong Kong",
    alpha3Code: "HKG",
    alpha2Code: "HK",
    callingCodes: "852",
    currency: {
      code: "HKD",
      name: "Hong Kong dollar",
      symbol: "$"
    }
  },
  HU: {
    name: "Hungary",
    alpha3Code: "HUN",
    alpha2Code: "HU",
    callingCodes: "36",
    currency: {
      code: "HUF",
      name: "Hungarian forint",
      symbol: "Ft"
    }
  },
  IS: {
    name: "Iceland",
    alpha3Code: "ISL",
    alpha2Code: "IS",
    callingCodes: "354",
    currency: {
      code: "ISK",
      name: "Icelandic króna",
      symbol: "kr"
    }
  },
  IN: {
    name: "India",
    alpha3Code: "IND",
    alpha2Code: "IN",
    callingCodes: "91",
    currency: {
      code: "INR",
      name: "Indian rupee",
      symbol: "₹"
    }
  },
  ID: {
    name: "Indonesia",
    alpha3Code: "IDN",
    alpha2Code: "ID",
    callingCodes: "62",
    currency: {
      code: "IDR",
      name: "Indonesian rupiah",
      symbol: "Rp"
    }
  },
  CI: {
    name: "Côte d'Ivoire",
    alpha3Code: "CIV",
    alpha2Code: "CI",
    callingCodes: "225",
    currency: {
      code: "XOF",
      name: "West African CFA franc",
      symbol: "Fr"
    }
  },
  IR: {
    name: "Iran (Islamic Republic of)",
    alpha3Code: "IRN",
    alpha2Code: "IR",
    callingCodes: "98",
    currency: {
      code: "IRR",
      name: "Iranian rial",
      symbol: "﷼"
    }
  },
  IQ: {
    name: "Iraq",
    alpha3Code: "IRQ",
    alpha2Code: "IQ",
    callingCodes: "964",
    currency: {
      code: "IQD",
      name: "Iraqi dinar",
      symbol: "ع.د"
    }
  },
  IE: {
    name: "Ireland",
    alpha3Code: "IRL",
    alpha2Code: "IE",
    callingCodes: "353",
    currency: {
      code: "EUR",
      name: "Euro",
      symbol: "€"
    }
  },
  IM: {
    name: "Isle of Man",
    alpha3Code: "IMN",
    alpha2Code: "IM",
    callingCodes: "44",
    currency: {
      code: "GBP",
      name: "British pound",
      symbol: "£"
    }
  },
  IL: {
    name: "Israel",
    alpha3Code: "ISR",
    alpha2Code: "IL",
    callingCodes: "972",
    currency: {
      code: "ILS",
      name: "Israeli new shekel",
      symbol: "₪"
    }
  },
  IT: {
    name: "Italy",
    alpha3Code: "ITA",
    alpha2Code: "IT",
    callingCodes: "39",
    currency: {
      code: "EUR",
      name: "Euro",
      symbol: "€"
    }
  },
  JM: {
    name: "Jamaica",
    alpha3Code: "JAM",
    alpha2Code: "JM",
    callingCodes: "1876",
    currency: {
      code: "JMD",
      name: "Jamaican dollar",
      symbol: "$"
    }
  },
  JP: {
    name: "Japan",
    alpha3Code: "JPN",
    alpha2Code: "JP",
    callingCodes: "81",
    currency: {
      code: "JPY",
      name: "Japanese yen",
      symbol: "¥"
    }
  },
  JE: {
    name: "Jersey",
    alpha3Code: "JEY",
    alpha2Code: "JE",
    callingCodes: "44",
    currency: {
      code: "GBP",
      name: "British pound",
      symbol: "£"
    }
  },
  JO: {
    name: "Jordan",
    alpha3Code: "JOR",
    alpha2Code: "JO",
    callingCodes: "962",
    currency: {
      code: "JOD",
      name: "Jordanian dinar",
      symbol: "د.ا"
    }
  },
  KZ: {
    name: "Kazakhstan",
    alpha3Code: "KAZ",
    alpha2Code: "KZ",
    callingCodes: "76",
    currency: {
      code: "KZT",
      name: "Kazakhstani tenge",
      symbol: null
    }
  },
  KE: {
    name: "Kenya",
    alpha3Code: "KEN",
    alpha2Code: "KE",
    callingCodes: "254",
    currency: {
      code: "KES",
      name: "Kenyan shilling",
      symbol: "Sh"
    }
  },
  KI: {
    name: "Kiribati",
    alpha3Code: "KIR",
    alpha2Code: "KI",
    callingCodes: "686",
    currency: {
      code: "AUD",
      name: "Australian dollar",
      symbol: "$"
    }
  },
  KW: {
    name: "Kuwait",
    alpha3Code: "KWT",
    alpha2Code: "KW",
    callingCodes: "965",
    currency: {
      code: "KWD",
      name: "Kuwaiti dinar",
      symbol: "د.ك"
    }
  },
  KG: {
    name: "Kyrgyzstan",
    alpha3Code: "KGZ",
    alpha2Code: "KG",
    callingCodes: "996",
    currency: {
      code: "KGS",
      name: "Kyrgyzstani som",
      symbol: "с"
    }
  },
  LA: {
    name: "Lao People's Democratic Republic",
    alpha3Code: "LAO",
    alpha2Code: "LA",
    callingCodes: "856",
    currency: {
      code: "LAK",
      name: "Lao kip",
      symbol: "₭"
    }
  },
  LV: {
    name: "Latvia",
    alpha3Code: "LVA",
    alpha2Code: "LV",
    callingCodes: "371",
    currency: {
      code: "EUR",
      name: "Euro",
      symbol: "€"
    }
  },
  LB: {
    name: "Lebanon",
    alpha3Code: "LBN",
    alpha2Code: "LB",
    callingCodes: "961",
    currency: {
      code: "LBP",
      name: "Lebanese pound",
      symbol: "ل.ل"
    }
  },
  LS: {
    name: "Lesotho",
    alpha3Code: "LSO",
    alpha2Code: "LS",
    callingCodes: "266",
    currency: {
      code: "LSL",
      name: "Lesotho loti",
      symbol: "L"
    }
  },
  LR: {
    name: "Liberia",
    alpha3Code: "LBR",
    alpha2Code: "LR",
    callingCodes: "231",
    currency: {
      code: "LRD",
      name: "Liberian dollar",
      symbol: "$"
    }
  },
  LY: {
    name: "Libya",
    alpha3Code: "LBY",
    alpha2Code: "LY",
    callingCodes: "218",
    currency: {
      code: "LYD",
      name: "Libyan dinar",
      symbol: "ل.د"
    }
  },
  LI: {
    name: "Liechtenstein",
    alpha3Code: "LIE",
    alpha2Code: "LI",
    callingCodes: "423",
    currency: {
      code: "CHF",
      name: "Swiss franc",
      symbol: "Fr"
    }
  },
  LT: {
    name: "Lithuania",
    alpha3Code: "LTU",
    alpha2Code: "LT",
    callingCodes: "370",
    currency: {
      code: "EUR",
      name: "Euro",
      symbol: "€"
    }
  },
  LU: {
    name: "Luxembourg",
    alpha3Code: "LUX",
    alpha2Code: "LU",
    callingCodes: "352",
    currency: {
      code: "EUR",
      name: "Euro",
      symbol: "€"
    }
  },
  MO: {
    name: "Macao",
    alpha3Code: "MAC",
    alpha2Code: "MO",
    callingCodes: "853",
    currency: {
      code: "MOP",
      name: "Macanese pataca",
      symbol: "P"
    }
  },
  MK: {
    name: "Macedonia (the former Yugoslav Republic of)",
    alpha3Code: "MKD",
    alpha2Code: "MK",
    callingCodes: "389",
    currency: {
      code: "MKD",
      name: "Macedonian denar",
      symbol: "ден"
    }
  },
  MG: {
    name: "Madagascar",
    alpha3Code: "MDG",
    alpha2Code: "MG",
    callingCodes: "261",
    currency: {
      code: "MGA",
      name: "Malagasy ariary",
      symbol: "Ar"
    }
  },
  MW: {
    name: "Malawi",
    alpha3Code: "MWI",
    alpha2Code: "MW",
    callingCodes: "265",
    currency: {
      code: "MWK",
      name: "Malawian kwacha",
      symbol: "MK"
    }
  },
  MY: {
    name: "Malaysia",
    alpha3Code: "MYS",
    alpha2Code: "MY",
    callingCodes: "60",
    currency: {
      code: "MYR",
      name: "Malaysian ringgit",
      symbol: "RM"
    }
  },
  MV: {
    name: "Maldives",
    alpha3Code: "MDV",
    alpha2Code: "MV",
    callingCodes: "960",
    currency: {
      code: "MVR",
      name: "Maldivian rufiyaa",
      symbol: ".ރ"
    }
  },
  ML: {
    name: "Mali",
    alpha3Code: "MLI",
    alpha2Code: "ML",
    callingCodes: "223",
    currency: {
      code: "XOF",
      name: "West African CFA franc",
      symbol: "Fr"
    }
  },
  MT: {
    name: "Malta",
    alpha3Code: "MLT",
    alpha2Code: "MT",
    callingCodes: "356",
    currency: {
      code: "EUR",
      name: "Euro",
      symbol: "€"
    }
  },
  MH: {
    name: "Marshall Islands",
    alpha3Code: "MHL",
    alpha2Code: "MH",
    callingCodes: "692",
    currency: {
      code: "USD",
      name: "United States dollar",
      symbol: "$"
    }
  },
  MQ: {
    name: "Martinique",
    alpha3Code: "MTQ",
    alpha2Code: "MQ",
    callingCodes: "596",
    currency: {
      code: "EUR",
      name: "Euro",
      symbol: "€"
    }
  },
  MR: {
    name: "Mauritania",
    alpha3Code: "MRT",
    alpha2Code: "MR",
    callingCodes: "222",
    currency: {
      code: "MRO",
      name: "Mauritanian ouguiya",
      symbol: "UM"
    }
  },
  MU: {
    name: "Mauritius",
    alpha3Code: "MUS",
    alpha2Code: "MU",
    callingCodes: "230",
    currency: {
      code: "MUR",
      name: "Mauritian rupee",
      symbol: "₨"
    }
  },
  YT: {
    name: "Mayotte",
    alpha3Code: "MYT",
    alpha2Code: "YT",
    callingCodes: "262",
    currency: {
      code: "EUR",
      name: "Euro",
      symbol: "€"
    }
  },
  MX: {
    name: "Mexico",
    alpha3Code: "MEX",
    alpha2Code: "MX",
    callingCodes: "52",
    currency: {
      code: "MXN",
      name: "Mexican peso",
      symbol: "$"
    }
  },
  FM: {
    name: "Micronesia (Federated States of)",
    alpha3Code: "FSM",
    alpha2Code: "FM",
    callingCodes: "691",
    currency: {
      code: null,
      name: "[D]",
      symbol: "$"
    }
  },
  MD: {
    name: "Moldova (Republic of)",
    alpha3Code: "MDA",
    alpha2Code: "MD",
    callingCodes: "373",
    currency: {
      code: "MDL",
      name: "Moldovan leu",
      symbol: "L"
    }
  },
  MC: {
    name: "Monaco",
    alpha3Code: "MCO",
    alpha2Code: "MC",
    callingCodes: "377",
    currency: {
      code: "EUR",
      name: "Euro",
      symbol: "€"
    }
  },
  MN: {
    name: "Mongolia",
    alpha3Code: "MNG",
    alpha2Code: "MN",
    callingCodes: "976",
    currency: {
      code: "MNT",
      name: "Mongolian tögrög",
      symbol: "₮"
    }
  },
  ME: {
    name: "Montenegro",
    alpha3Code: "MNE",
    alpha2Code: "ME",
    callingCodes: "382",
    currency: {
      code: "EUR",
      name: "Euro",
      symbol: "€"
    }
  },
  MS: {
    name: "Montserrat",
    alpha3Code: "MSR",
    alpha2Code: "MS",
    callingCodes: "1664",
    currency: {
      code: "XCD",
      name: "East Caribbean dollar",
      symbol: "$"
    }
  },
  MA: {
    name: "Morocco",
    alpha3Code: "MAR",
    alpha2Code: "MA",
    callingCodes: "212",
    currency: {
      code: "MAD",
      name: "Moroccan dirham",
      symbol: "د.م."
    }
  },
  MZ: {
    name: "Mozambique",
    alpha3Code: "MOZ",
    alpha2Code: "MZ",
    callingCodes: "258",
    currency: {
      code: "MZN",
      name: "Mozambican metical",
      symbol: "MT"
    }
  },
  MM: {
    name: "Myanmar",
    alpha3Code: "MMR",
    alpha2Code: "MM",
    callingCodes: "95",
    currency: {
      code: "MMK",
      name: "Burmese kyat",
      symbol: "Ks"
    }
  },
  NA: {
    name: "Namibia",
    alpha3Code: "NAM",
    alpha2Code: "NA",
    callingCodes: "264",
    currency: {
      code: "NAD",
      name: "Namibian dollar",
      symbol: "$"
    }
  },
  NR: {
    name: "Nauru",
    alpha3Code: "NRU",
    alpha2Code: "NR",
    callingCodes: "674",
    currency: {
      code: "AUD",
      name: "Australian dollar",
      symbol: "$"
    }
  },
  NP: {
    name: "Nepal",
    alpha3Code: "NPL",
    alpha2Code: "NP",
    callingCodes: "977",
    currency: {
      code: "NPR",
      name: "Nepalese rupee",
      symbol: "₨"
    }
  },
  NL: {
    name: "Netherlands",
    alpha3Code: "NLD",
    alpha2Code: "NL",
    callingCodes: "31",
    currency: {
      code: "EUR",
      name: "Euro",
      symbol: "€"
    }
  },
  NC: {
    name: "New Caledonia",
    alpha3Code: "NCL",
    alpha2Code: "NC",
    callingCodes: "687",
    currency: {
      code: "XPF",
      name: "CFP franc",
      symbol: "Fr"
    }
  },
  NZ: {
    name: "New Zealand",
    alpha3Code: "NZL",
    alpha2Code: "NZ",
    callingCodes: "64",
    currency: {
      code: "NZD",
      name: "New Zealand dollar",
      symbol: "$"
    }
  },
  NI: {
    name: "Nicaragua",
    alpha3Code: "NIC",
    alpha2Code: "NI",
    callingCodes: "505",
    currency: {
      code: "NIO",
      name: "Nicaraguan córdoba",
      symbol: "C$"
    }
  },
  NE: {
    name: "Niger",
    alpha3Code: "NER",
    alpha2Code: "NE",
    callingCodes: "227",
    currency: {
      code: "XOF",
      name: "West African CFA franc",
      symbol: "Fr"
    }
  },
  NG: {
    name: "Nigeria",
    alpha3Code: "NGA",
    alpha2Code: "NG",
    callingCodes: "234",
    currency: {
      code: "NGN",
      name: "Nigerian naira",
      symbol: "₦"
    }
  },
  NU: {
    name: "Niue",
    alpha3Code: "NIU",
    alpha2Code: "NU",
    callingCodes: "683",
    currency: {
      code: "NZD",
      name: "New Zealand dollar",
      symbol: "$"
    }
  },
  NF: {
    name: "Norfolk Island",
    alpha3Code: "NFK",
    alpha2Code: "NF",
    callingCodes: "672",
    currency: {
      code: "AUD",
      name: "Australian dollar",
      symbol: "$"
    }
  },
  KP: {
    name: "Korea (Democratic People's Republic of)",
    alpha3Code: "PRK",
    alpha2Code: "KP",
    callingCodes: "850",
    currency: {
      code: "KPW",
      name: "North Korean won",
      symbol: "₩"
    }
  },
  MP: {
    name: "Northern Mariana Islands",
    alpha3Code: "MNP",
    alpha2Code: "MP",
    callingCodes: "1670",
    currency: {
      code: "USD",
      name: "United States dollar",
      symbol: "$"
    }
  },
  NO: {
    name: "Norway",
    alpha3Code: "NOR",
    alpha2Code: "NO",
    callingCodes: "47",
    currency: {
      code: "NOK",
      name: "Norwegian krone",
      symbol: "kr"
    }
  },
  OM: {
    name: "Oman",
    alpha3Code: "OMN",
    alpha2Code: "OM",
    callingCodes: "968",
    currency: {
      code: "OMR",
      name: "Omani rial",
      symbol: "ر.ع."
    }
  },
  PK: {
    name: "Pakistan",
    alpha3Code: "PAK",
    alpha2Code: "PK",
    callingCodes: "92",
    currency: {
      code: "PKR",
      name: "Pakistani rupee",
      symbol: "₨"
    }
  },
  PW: {
    name: "Palau",
    alpha3Code: "PLW",
    alpha2Code: "PW",
    callingCodes: "680",
    currency: {
      code: "(none)",
      name: "[E]",
      symbol: "$"
    }
  },
  PS: {
    name: "Palestine, State of",
    alpha3Code: "PSE",
    alpha2Code: "PS",
    callingCodes: "970",
    currency: {
      code: "ILS",
      name: "Israeli new sheqel",
      symbol: "₪"
    }
  },
  PA: {
    name: "Panama",
    alpha3Code: "PAN",
    alpha2Code: "PA",
    callingCodes: "507",
    currency: {
      code: "PAB",
      name: "Panamanian balboa",
      symbol: "B/."
    }
  },
  PG: {
    name: "Papua New Guinea",
    alpha3Code: "PNG",
    alpha2Code: "PG",
    callingCodes: "675",
    currency: {
      code: "PGK",
      name: "Papua New Guinean kina",
      symbol: "K"
    }
  },
  PY: {
    name: "Paraguay",
    alpha3Code: "PRY",
    alpha2Code: "PY",
    callingCodes: "595",
    currency: {
      code: "PYG",
      name: "Paraguayan guaraní",
      symbol: "₲"
    }
  },
  PE: {
    name: "Peru",
    alpha3Code: "PER",
    alpha2Code: "PE",
    callingCodes: "51",
    currency: {
      code: "PEN",
      name: "Peruvian sol",
      symbol: "S/."
    }
  },
  PH: {
    name: "Philippines",
    alpha3Code: "PHL",
    alpha2Code: "PH",
    callingCodes: "63",
    currency: {
      code: "PHP",
      name: "Philippine peso",
      symbol: "₱"
    }
  },
  PN: {
    name: "Pitcairn",
    alpha3Code: "PCN",
    alpha2Code: "PN",
    callingCodes: "64",
    currency: {
      code: "NZD",
      name: "New Zealand dollar",
      symbol: "$"
    }
  },
  PL: {
    name: "Poland",
    alpha3Code: "POL",
    alpha2Code: "PL",
    callingCodes: "48",
    currency: {
      code: "PLN",
      name: "Polish złoty",
      symbol: "zł"
    }
  },
  PT: {
    name: "Portugal",
    alpha3Code: "PRT",
    alpha2Code: "PT",
    callingCodes: "351",
    currency: {
      code: "EUR",
      name: "Euro",
      symbol: "€"
    }
  },
  PR: {
    name: "Puerto Rico",
    alpha3Code: "PRI",
    alpha2Code: "PR",
    callingCodes: "1787",
    currency: {
      code: "USD",
      name: "United States dollar",
      symbol: "$"
    }
  },
  QA: {
    name: "Qatar",
    alpha3Code: "QAT",
    alpha2Code: "QA",
    callingCodes: "974",
    currency: {
      code: "QAR",
      name: "Qatari riyal",
      symbol: "ر.ق"
    }
  },
  XK: {
    name: "Republic of Kosovo",
    alpha3Code: "KOS",
    alpha2Code: "XK",
    callingCodes: "383",
    currency: {
      code: "EUR",
      name: "Euro",
      symbol: "€"
    }
  },
  RE: {
    name: "Réunion",
    alpha3Code: "REU",
    alpha2Code: "RE",
    callingCodes: "262",
    currency: {
      code: "EUR",
      name: "Euro",
      symbol: "€"
    }
  },
  RO: {
    name: "Romania",
    alpha3Code: "ROU",
    alpha2Code: "RO",
    callingCodes: "40",
    currency: {
      code: "RON",
      name: "Romanian leu",
      symbol: "lei"
    }
  },
  RU: {
    name: "Russian Federation",
    alpha3Code: "RUS",
    alpha2Code: "RU",
    callingCodes: "7",
    currency: {
      code: "RUB",
      name: "Russian ruble",
      symbol: "₽"
    }
  },
  RW: {
    name: "Rwanda",
    alpha3Code: "RWA",
    alpha2Code: "RW",
    callingCodes: "250",
    currency: {
      code: "RWF",
      name: "Rwandan franc",
      symbol: "Fr"
    }
  },
  BL: {
    name: "Saint Barthélemy",
    alpha3Code: "BLM",
    alpha2Code: "BL",
    callingCodes: "590",
    currency: {
      code: "EUR",
      name: "Euro",
      symbol: "€"
    }
  },
  SH: {
    name: "Saint Helena, Ascension and Tristan da Cunha",
    alpha3Code: "SHN",
    alpha2Code: "SH",
    callingCodes: "290",
    currency: {
      code: "SHP",
      name: "Saint Helena pound",
      symbol: "£"
    }
  },
  KN: {
    name: "Saint Kitts and Nevis",
    alpha3Code: "KNA",
    alpha2Code: "KN",
    callingCodes: "1869",
    currency: {
      code: "XCD",
      name: "East Caribbean dollar",
      symbol: "$"
    }
  },
  LC: {
    name: "Saint Lucia",
    alpha3Code: "LCA",
    alpha2Code: "LC",
    callingCodes: "1758",
    currency: {
      code: "XCD",
      name: "East Caribbean dollar",
      symbol: "$"
    }
  },
  MF: {
    name: "Saint Martin (French part)",
    alpha3Code: "MAF",
    alpha2Code: "MF",
    callingCodes: "590",
    currency: {
      code: "EUR",
      name: "Euro",
      symbol: "€"
    }
  },
  PM: {
    name: "Saint Pierre and Miquelon",
    alpha3Code: "SPM",
    alpha2Code: "PM",
    callingCodes: "508",
    currency: {
      code: "EUR",
      name: "Euro",
      symbol: "€"
    }
  },
  VC: {
    name: "Saint Vincent and the Grenadines",
    alpha3Code: "VCT",
    alpha2Code: "VC",
    callingCodes: "1784",
    currency: {
      code: "XCD",
      name: "East Caribbean dollar",
      symbol: "$"
    }
  },
  WS: {
    name: "Samoa",
    alpha3Code: "WSM",
    alpha2Code: "WS",
    callingCodes: "685",
    currency: {
      code: "WST",
      name: "Samoan tālā",
      symbol: "T"
    }
  },
  SM: {
    name: "San Marino",
    alpha3Code: "SMR",
    alpha2Code: "SM",
    callingCodes: "378",
    currency: {
      code: "EUR",
      name: "Euro",
      symbol: "€"
    }
  },
  ST: {
    name: "Sao Tome and Principe",
    alpha3Code: "STP",
    alpha2Code: "ST",
    callingCodes: "239",
    currency: {
      code: "STD",
      name: "São Tomé and Príncipe dobra",
      symbol: "Db"
    }
  },
  SA: {
    name: "Saudi Arabia",
    alpha3Code: "SAU",
    alpha2Code: "SA",
    callingCodes: "966",
    currency: {
      code: "SAR",
      name: "Saudi riyal",
      symbol: "ر.س"
    }
  },
  SN: {
    name: "Senegal",
    alpha3Code: "SEN",
    alpha2Code: "SN",
    callingCodes: "221",
    currency: {
      code: "XOF",
      name: "West African CFA franc",
      symbol: "Fr"
    }
  },
  RS: {
    name: "Serbia",
    alpha3Code: "SRB",
    alpha2Code: "RS",
    callingCodes: "381",
    currency: {
      code: "RSD",
      name: "Serbian dinar",
      symbol: "дин."
    }
  },
  SC: {
    name: "Seychelles",
    alpha3Code: "SYC",
    alpha2Code: "SC",
    callingCodes: "248",
    currency: {
      code: "SCR",
      name: "Seychellois rupee",
      symbol: "₨"
    }
  },
  SL: {
    name: "Sierra Leone",
    alpha3Code: "SLE",
    alpha2Code: "SL",
    callingCodes: "232",
    currency: {
      code: "SLL",
      name: "Sierra Leonean leone",
      symbol: "Le"
    }
  },
  SG: {
    name: "Singapore",
    alpha3Code: "SGP",
    alpha2Code: "SG",
    callingCodes: "65",
    currency: {
      code: "BND",
      name: "Brunei dollar",
      symbol: "$"
    }
  },
  SX: {
    name: "Sint Maarten (Dutch part)",
    alpha3Code: "SXM",
    alpha2Code: "SX",
    callingCodes: "1721",
    currency: {
      code: "ANG",
      name: "Netherlands Antillean guilder",
      symbol: "ƒ"
    }
  },
  SK: {
    name: "Slovakia",
    alpha3Code: "SVK",
    alpha2Code: "SK",
    callingCodes: "421",
    currency: {
      code: "EUR",
      name: "Euro",
      symbol: "€"
    }
  },
  SI: {
    name: "Slovenia",
    alpha3Code: "SVN",
    alpha2Code: "SI",
    callingCodes: "386",
    currency: {
      code: "EUR",
      name: "Euro",
      symbol: "€"
    }
  },
  SB: {
    name: "Solomon Islands",
    alpha3Code: "SLB",
    alpha2Code: "SB",
    callingCodes: "677",
    currency: {
      code: "SBD",
      name: "Solomon Islands dollar",
      symbol: "$"
    }
  },
  SO: {
    name: "Somalia",
    alpha3Code: "SOM",
    alpha2Code: "SO",
    callingCodes: "252",
    currency: {
      code: "SOS",
      name: "Somali shilling",
      symbol: "Sh"
    }
  },
  ZA: {
    name: "South Africa",
    alpha3Code: "ZAF",
    alpha2Code: "ZA",
    callingCodes: "27",
    currency: {
      code: "ZAR",
      name: "South African rand",
      symbol: "R"
    }
  },
  GS: {
    name: "South Georgia and the South Sandwich Islands",
    alpha3Code: "SGS",
    alpha2Code: "GS",
    callingCodes: "500",
    currency: {
      code: "GBP",
      name: "British pound",
      symbol: "£"
    }
  },
  KR: {
    name: "Korea (Republic of)",
    alpha3Code: "KOR",
    alpha2Code: "KR",
    callingCodes: "82",
    currency: {
      code: "KRW",
      name: "South Korean won",
      symbol: "₩"
    }
  },
  SS: {
    name: "South Sudan",
    alpha3Code: "SSD",
    alpha2Code: "SS",
    callingCodes: "211",
    currency: {
      code: "SSP",
      name: "South Sudanese pound",
      symbol: "£"
    }
  },
  ES: {
    name: "Spain",
    alpha3Code: "ESP",
    alpha2Code: "ES",
    callingCodes: "34",
    currency: {
      code: "EUR",
      name: "Euro",
      symbol: "€"
    }
  },
  LK: {
    name: "Sri Lanka",
    alpha3Code: "LKA",
    alpha2Code: "LK",
    callingCodes: "94",
    currency: {
      code: "LKR",
      name: "Sri Lankan rupee",
      symbol: "Rs"
    }
  },
  SD: {
    name: "Sudan",
    alpha3Code: "SDN",
    alpha2Code: "SD",
    callingCodes: "249",
    currency: {
      code: "SDG",
      name: "Sudanese pound",
      symbol: "ج.س."
    }
  },
  SR: {
    name: "Suriname",
    alpha3Code: "SUR",
    alpha2Code: "SR",
    callingCodes: "597",
    currency: {
      code: "SRD",
      name: "Surinamese dollar",
      symbol: "$"
    }
  },
  SJ: {
    name: "Svalbard and Jan Mayen",
    alpha3Code: "SJM",
    alpha2Code: "SJ",
    callingCodes: "4779",
    currency: {
      code: "NOK",
      name: "Norwegian krone",
      symbol: "kr"
    }
  },
  SZ: {
    name: "Swaziland",
    alpha3Code: "SWZ",
    alpha2Code: "SZ",
    callingCodes: "268",
    currency: {
      code: "SZL",
      name: "Swazi lilangeni",
      symbol: "L"
    }
  },
  SE: {
    name: "Sweden",
    alpha3Code: "SWE",
    alpha2Code: "SE",
    callingCodes: "46",
    currency: {
      code: "SEK",
      name: "Swedish krona",
      symbol: "kr"
    }
  },
  CH: {
    name: "Switzerland",
    alpha3Code: "CHE",
    alpha2Code: "CH",
    callingCodes: "41",
    currency: {
      code: "CHF",
      name: "Swiss franc",
      symbol: "Fr"
    }
  },
  SY: {
    name: "Syrian Arab Republic",
    alpha3Code: "SYR",
    alpha2Code: "SY",
    callingCodes: "963",
    currency: {
      code: "SYP",
      name: "Syrian pound",
      symbol: "£"
    }
  },
  TW: {
    name: "Taiwan",
    alpha3Code: "TWN",
    alpha2Code: "TW",
    callingCodes: "886",
    currency: {
      code: "TWD",
      name: "New Taiwan dollar",
      symbol: "$"
    }
  },
  TJ: {
    name: "Tajikistan",
    alpha3Code: "TJK",
    alpha2Code: "TJ",
    callingCodes: "992",
    currency: {
      code: "TJS",
      name: "Tajikistani somoni",
      symbol: "ЅМ"
    }
  },
  TZ: {
    name: "Tanzania, United Republic of",
    alpha3Code: "TZA",
    alpha2Code: "TZ",
    callingCodes: "255",
    currency: {
      code: "TZS",
      name: "Tanzanian shilling",
      symbol: "Sh"
    }
  },
  TH: {
    name: "Thailand",
    alpha3Code: "THA",
    alpha2Code: "TH",
    callingCodes: "66",
    currency: {
      code: "THB",
      name: "Thai baht",
      symbol: "฿"
    }
  },
  TL: {
    name: "Timor-Leste",
    alpha3Code: "TLS",
    alpha2Code: "TL",
    callingCodes: "670",
    currency: {
      code: "USD",
      name: "United States dollar",
      symbol: "$"
    }
  },
  TG: {
    name: "Togo",
    alpha3Code: "TGO",
    alpha2Code: "TG",
    callingCodes: "228",
    currency: {
      code: "XOF",
      name: "West African CFA franc",
      symbol: "Fr"
    }
  },
  TK: {
    name: "Tokelau",
    alpha3Code: "TKL",
    alpha2Code: "TK",
    callingCodes: "690",
    currency: {
      code: "NZD",
      name: "New Zealand dollar",
      symbol: "$"
    }
  },
  TO: {
    name: "Tonga",
    alpha3Code: "TON",
    alpha2Code: "TO",
    callingCodes: "676",
    currency: {
      code: "TOP",
      name: "Tongan paʻanga",
      symbol: "T$"
    }
  },
  TT: {
    name: "Trinidad and Tobago",
    alpha3Code: "TTO",
    alpha2Code: "TT",
    callingCodes: "1868",
    currency: {
      code: "TTD",
      name: "Trinidad and Tobago dollar",
      symbol: "$"
    }
  },
  TN: {
    name: "Tunisia",
    alpha3Code: "TUN",
    alpha2Code: "TN",
    callingCodes: "216",
    currency: {
      code: "TND",
      name: "Tunisian dinar",
      symbol: "د.ت"
    }
  },
  TR: {
    name: "Turkey",
    alpha3Code: "TUR",
    alpha2Code: "TR",
    callingCodes: "90",
    currency: {
      code: "TRY",
      name: "Turkish lira",
      symbol: null
    }
  },
  TM: {
    name: "Turkmenistan",
    alpha3Code: "TKM",
    alpha2Code: "TM",
    callingCodes: "993",
    currency: {
      code: "TMT",
      name: "Turkmenistan manat",
      symbol: "m"
    }
  },
  TC: {
    name: "Turks and Caicos Islands",
    alpha3Code: "TCA",
    alpha2Code: "TC",
    callingCodes: "1649",
    currency: {
      code: "USD",
      name: "United States dollar",
      symbol: "$"
    }
  },
  TV: {
    name: "Tuvalu",
    alpha3Code: "TUV",
    alpha2Code: "TV",
    callingCodes: "688",
    currency: {
      code: "AUD",
      name: "Australian dollar",
      symbol: "$"
    }
  },
  UG: {
    name: "Uganda",
    alpha3Code: "UGA",
    alpha2Code: "UG",
    callingCodes: "256",
    currency: {
      code: "UGX",
      name: "Ugandan shilling",
      symbol: "Sh"
    }
  },
  UA: {
    name: "Ukraine",
    alpha3Code: "UKR",
    alpha2Code: "UA",
    callingCodes: "380",
    currency: {
      code: "UAH",
      name: "Ukrainian hryvnia",
      symbol: "₴"
    }
  },
  AE: {
    name: "United Arab Emirates",
    alpha3Code: "ARE",
    alpha2Code: "AE",
    callingCodes: "971",
    currency: {
      code: "AED",
      name: "United Arab Emirates dirham",
      symbol: "د.إ"
    }
  },
  GB: {
    name: "United Kingdom of Great Britain and Northern Ireland",
    alpha3Code: "GBR",
    alpha2Code: "GB",
    callingCodes: "44",
    currency: {
      code: "GBP",
      name: "British pound",
      symbol: "£"
    }
  },
  US: {
    name: "United States of America",
    alpha3Code: "USA",
    alpha2Code: "US",
    callingCodes: "1",
    currency: {
      code: "USD",
      name: "United States dollar",
      symbol: "$"
    }
  },
  UY: {
    name: "Uruguay",
    alpha3Code: "URY",
    alpha2Code: "UY",
    callingCodes: "598",
    currency: {
      code: "UYU",
      name: "Uruguayan peso",
      symbol: "$"
    }
  },
  UZ: {
    name: "Uzbekistan",
    alpha3Code: "UZB",
    alpha2Code: "UZ",
    callingCodes: "998",
    currency: {
      code: "UZS",
      name: "Uzbekistani so'm",
      symbol: null
    }
  },
  VU: {
    name: "Vanuatu",
    alpha3Code: "VUT",
    alpha2Code: "VU",
    callingCodes: "678",
    currency: {
      code: "VUV",
      name: "Vanuatu vatu",
      symbol: "Vt"
    }
  },
  VE: {
    name: "Venezuela (Bolivarian Republic of)",
    alpha3Code: "VEN",
    alpha2Code: "VE",
    callingCodes: "58",
    currency: {
      code: "VEF",
      name: "Venezuelan bolívar",
      symbol: "Bs F"
    }
  },
  VN: {
    name: "Viet Nam",
    alpha3Code: "VNM",
    alpha2Code: "VN",
    callingCodes: "84",
    currency: {
      code: "VND",
      name: "Vietnamese đồng",
      symbol: "₫"
    }
  },
  WF: {
    name: "Wallis and Futuna",
    alpha3Code: "WLF",
    alpha2Code: "WF",
    callingCodes: "681",
    currency: {
      code: "XPF",
      name: "CFP franc",
      symbol: "Fr"
    }
  },
  EH: {
    name: "Western Sahara",
    alpha3Code: "ESH",
    alpha2Code: "EH",
    callingCodes: "212",
    currency: {
      code: "MAD",
      name: "Moroccan dirham",
      symbol: "د.م."
    }
  },
  YE: {
    name: "Yemen",
    alpha3Code: "YEM",
    alpha2Code: "YE",
    callingCodes: "967",
    currency: {
      code: "YER",
      name: "Yemeni rial",
      symbol: "﷼"
    }
  },
  ZM: {
    name: "Zambia",
    alpha3Code: "ZMB",
    alpha2Code: "ZM",
    callingCodes: "260",
    currency: {
      code: "ZMW",
      name: "Zambian kwacha",
      symbol: "ZK"
    }
  },
  ZW: {
    name: "Zimbabwe",
    alpha3Code: "ZWE",
    alpha2Code: "ZW",
    callingCodes: "263",
    currency: {
      code: "BWP",
      name: "Botswana pula",
      symbol: "P"
    }
  }
};
