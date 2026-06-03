// Inline approximate datasets for the "Ground Beneath Us" scrollytelling.
// Sources: FAO via World Bank (agricultural land share) and INFORM Risk Index
// 2024 (drought/flood hazard sub-scores, 0-10). Country names match Natural
// Earth (world-atlas) properties.name so they join directly to the geometry.

export const AG_LAND: Record<string, number> = {
  Afghanistan: 58, Albania: 43, Algeria: 17, Angola: 46, Argentina: 54, Armenia: 59,
  Australia: 46, Austria: 32, Azerbaijan: 58, Bangladesh: 71, Belarus: 42, Belgium: 44,
  Belize: 7, Benin: 35, Bhutan: 14, Bolivia: 35, "Bosnia and Herz.": 42, Botswana: 46,
  Brazil: 33, Bulgaria: 47, "Burkina Faso": 44, Burundi: 79, Cambodia: 33, Cameroon: 21,
  Canada: 7, "Central African Rep.": 8, Chad: 40, Chile: 21, China: 56, Colombia: 40,
  Congo: 31, "Costa Rica": 35, Croatia: 24, Cuba: 60, Cyprus: 13, Czechia: 45,
  "Côte d'Ivoire": 65, "Dem. Rep. Congo": 12, Denmark: 62, Djibouti: 73,
  "Dominican Rep.": 49, Ecuador: 21, Egypt: 4, "El Salvador": 76, "Eq. Guinea": 11,
  Eritrea: 75, Estonia: 22, Eswatini: 71, Ethiopia: 36, "Falkland Is.": 94, Fiji: 24,
  Finland: 7, France: 52, Gabon: 20, Gambia: 61, Georgia: 34, Germany: 48, Ghana: 69,
  Greece: 48, Greenland: 1, Guatemala: 42, Guinea: 58, "Guinea-Bissau": 58, Guyana: 8,
  Haiti: 67, Honduras: 29, Hungary: 58, Iceland: 18, India: 60, Indonesia: 31, Iran: 30,
  Iraq: 21, Ireland: 64, Israel: 24, Italy: 43, Jamaica: 42, Japan: 12, Jordan: 12,
  Kazakhstan: 80, Kenya: 48, Kosovo: 40, Kuwait: 9, Kyrgyzstan: 56, Laos: 11, Latvia: 30,
  Lebanon: 63, Lesotho: 76, Liberia: 28, Libya: 9, Lithuania: 47, Luxembourg: 51,
  Madagascar: 71, Malawi: 62, Malaysia: 26, Mali: 34, Mauritania: 38, Mexico: 54,
  Moldova: 74, Mongolia: 71, Montenegro: 19, Morocco: 68, Mozambique: 62, Myanmar: 20,
  "N. Cyprus": 56, Namibia: 47, Nepal: 29, Netherlands: 54, "New Caledonia": 11,
  "New Zealand": 40, Nicaragua: 42, Niger: 36, Nigeria: 78, "North Korea": 24,
  "North Macedonia": 44, Norway: 3, Oman: 5, Pakistan: 47, Palestine: 48, Panama: 30,
  "Papua New Guinea": 2, Paraguay: 54, Peru: 19, Philippines: 41, Poland: 47, Portugal: 40,
  "Puerto Rico": 21, Qatar: 6, Romania: 58, Russia: 13, Rwanda: 75, "S. Sudan": 42,
  "Saudi Arabia": 80, Senegal: 47, Serbia: 40, "Sierra Leone": 56, Slovakia: 39,
  Slovenia: 24, "Solomon Is.": 4, Somalia: 70, Somaliland: 70, "South Africa": 80,
  "South Korea": 17, Spain: 54, "Sri Lanka": 42, Sudan: 48, Suriname: 1, Sweden: 7,
  Switzerland: 38, Syria: 76, Taiwan: 25, Tajikistan: 34, Tanzania: 45, Thailand: 43,
  "Timor-Leste": 26, Togo: 71, "Trinidad and Tobago": 11, Tunisia: 63, Turkey: 50,
  Turkmenistan: 72, Uganda: 71, Ukraine: 71, "United Arab Emirates": 5,
  "United Kingdom": 71, "United States of America": 44, Uruguay: 80, Uzbekistan: 63,
  Vanuatu: 15, Venezuela: 24, Vietnam: 40, "W. Sahara": 19, Yemen: 45, Zambia: 32,
  Zimbabwe: 42,
};

export interface HazardScore {
  d: number; // drought hazard, 0-10
  f: number; // flood hazard, 0-10
}

export const CLIMATE_RISK: Record<string, HazardScore> = {
  Afghanistan: { d: 8.7, f: 5.5 }, Albania: { d: 3.2, f: 5.0 }, Algeria: { d: 5.0, f: 4.0 },
  Angola: { d: 6.3, f: 5.2 }, Argentina: { d: 4.0, f: 4.5 }, Armenia: { d: 3.0, f: 3.0 },
  Australia: { d: 4.2, f: 3.0 }, Austria: { d: 1.5, f: 3.0 }, Azerbaijan: { d: 3.5, f: 3.5 },
  Bangladesh: { d: 5.0, f: 9.5 }, Belarus: { d: 1.5, f: 2.5 }, Belgium: { d: 1.0, f: 3.0 },
  Benin: { d: 5.0, f: 6.0 }, Bhutan: { d: 2.5, f: 6.5 }, Bolivia: { d: 5.5, f: 6.0 },
  "Bosnia and Herz.": { d: 2.5, f: 4.5 }, Botswana: { d: 5.5, f: 3.0 }, Brazil: { d: 4.0, f: 5.8 },
  Bulgaria: { d: 2.5, f: 3.5 }, "Burkina Faso": { d: 7.8, f: 4.5 }, Burundi: { d: 6.5, f: 5.0 },
  Cambodia: { d: 5.0, f: 8.0 }, Cameroon: { d: 5.0, f: 6.0 }, Canada: { d: 2.0, f: 2.5 },
  "Central African Rep.": { d: 5.5, f: 5.0 }, Chad: { d: 8.2, f: 6.0 }, Chile: { d: 5.0, f: 3.5 },
  China: { d: 5.5, f: 7.5 }, Colombia: { d: 4.5, f: 6.8 }, Congo: { d: 5.0, f: 5.0 },
  "Costa Rica": { d: 3.0, f: 5.5 }, Croatia: { d: 1.5, f: 3.0 }, Cuba: { d: 4.0, f: 6.5 },
  Cyprus: { d: 4.5, f: 2.0 }, Czechia: { d: 1.5, f: 3.0 }, "Côte d'Ivoire": { d: 4.5, f: 5.5 },
  "Dem. Rep. Congo": { d: 5.5, f: 6.5 }, Denmark: { d: 1.0, f: 3.0 }, Djibouti: { d: 8.5, f: 5.0 },
  "Dominican Rep.": { d: 3.5, f: 6.0 }, Ecuador: { d: 4.0, f: 6.5 }, Egypt: { d: 5.5, f: 5.0 },
  "El Salvador": { d: 4.5, f: 7.0 }, "Eq. Guinea": { d: 3.0, f: 4.0 }, Eritrea: { d: 8.5, f: 4.5 },
  Estonia: { d: 1.0, f: 2.5 }, Eswatini: { d: 6.5, f: 3.5 }, Ethiopia: { d: 8.4, f: 6.0 },
  Fiji: { d: 3.0, f: 5.5 }, Finland: { d: 1.0, f: 2.0 }, France: { d: 2.5, f: 4.0 },
  Gabon: { d: 3.0, f: 4.5 }, Gambia: { d: 5.0, f: 5.0 }, Georgia: { d: 2.5, f: 3.5 },
  Germany: { d: 1.5, f: 4.0 }, Ghana: { d: 5.0, f: 6.0 }, Greece: { d: 3.8, f: 3.5 },
  Guatemala: { d: 5.0, f: 7.5 }, Guinea: { d: 4.0, f: 5.5 }, "Guinea-Bissau": { d: 4.5, f: 5.0 },
  Guyana: { d: 3.0, f: 6.0 }, Haiti: { d: 5.0, f: 7.5 }, Honduras: { d: 5.0, f: 7.5 },
  Hungary: { d: 2.0, f: 3.5 }, Iceland: { d: 0.5, f: 1.5 }, India: { d: 7.1, f: 8.5 },
  Indonesia: { d: 5.0, f: 7.5 }, Iran: { d: 6.8, f: 5.5 }, Iraq: { d: 6.5, f: 4.5 },
  Ireland: { d: 1.0, f: 3.0 }, Israel: { d: 5.0, f: 2.5 }, Italy: { d: 3.0, f: 4.5 },
  Jamaica: { d: 3.5, f: 6.0 }, Japan: { d: 2.0, f: 5.5 }, Jordan: { d: 6.0, f: 3.0 },
  Kazakhstan: { d: 5.5, f: 3.5 }, Kenya: { d: 7.0, f: 5.5 }, Kosovo: { d: 2.0, f: 3.0 },
  Kuwait: { d: 6.0, f: 2.0 }, Kyrgyzstan: { d: 4.5, f: 4.0 }, Laos: { d: 4.0, f: 7.0 },
  Latvia: { d: 1.0, f: 2.5 }, Lebanon: { d: 4.5, f: 3.0 }, Lesotho: { d: 7.0, f: 3.5 },
  Liberia: { d: 3.5, f: 5.5 }, Libya: { d: 6.0, f: 3.0 }, Lithuania: { d: 1.0, f: 2.5 },
  Madagascar: { d: 8.0, f: 7.0 }, Malawi: { d: 6.5, f: 5.5 }, Malaysia: { d: 2.5, f: 6.5 },
  Mali: { d: 7.5, f: 5.5 }, Mauritania: { d: 7.5, f: 4.5 }, Mexico: { d: 5.8, f: 6.5 },
  Moldova: { d: 3.5, f: 3.0 }, Mongolia: { d: 6.5, f: 3.0 }, Montenegro: { d: 2.0, f: 3.0 },
  Morocco: { d: 6.0, f: 4.0 }, Mozambique: { d: 6.5, f: 8.0 }, Myanmar: { d: 5.0, f: 8.0 },
  Namibia: { d: 6.5, f: 3.0 }, Nepal: { d: 4.0, f: 7.5 }, Netherlands: { d: 1.0, f: 4.5 },
  "New Zealand": { d: 2.0, f: 3.0 }, Nicaragua: { d: 4.5, f: 6.5 }, Niger: { d: 7.9, f: 5.5 },
  Nigeria: { d: 5.5, f: 6.5 }, "North Korea": { d: 4.5, f: 6.0 }, "North Macedonia": { d: 3.0, f: 3.5 },
  Norway: { d: 0.5, f: 2.5 }, Oman: { d: 5.5, f: 3.5 }, Pakistan: { d: 6.5, f: 7.0 },
  Palestine: { d: 5.0, f: 2.5 }, Panama: { d: 3.0, f: 6.0 }, "Papua New Guinea": { d: 4.0, f: 6.5 },
  Paraguay: { d: 5.0, f: 5.0 }, Peru: { d: 4.5, f: 6.5 }, Philippines: { d: 4.5, f: 8.0 },
  Poland: { d: 2.0, f: 3.5 }, Portugal: { d: 3.5, f: 3.5 }, Qatar: { d: 4.5, f: 1.5 },
  Romania: { d: 3.0, f: 4.0 }, Russia: { d: 3.0, f: 4.0 }, Rwanda: { d: 5.5, f: 5.5 },
  "S. Sudan": { d: 7.5, f: 7.0 }, "Saudi Arabia": { d: 5.5, f: 3.5 }, Senegal: { d: 5.5, f: 5.5 },
  Serbia: { d: 2.5, f: 4.0 }, "Sierra Leone": { d: 3.5, f: 6.0 }, Slovakia: { d: 1.5, f: 3.0 },
  Slovenia: { d: 1.0, f: 3.0 }, Somalia: { d: 9.0, f: 5.5 }, Somaliland: { d: 9.0, f: 5.0 },
  "South Africa": { d: 5.0, f: 4.5 }, "South Korea": { d: 2.0, f: 5.0 }, Spain: { d: 3.8, f: 4.0 },
  "Sri Lanka": { d: 4.0, f: 7.0 }, Sudan: { d: 8.0, f: 6.5 }, Suriname: { d: 2.5, f: 5.0 },
  Sweden: { d: 1.0, f: 2.5 }, Switzerland: { d: 1.0, f: 3.5 }, Syria: { d: 6.5, f: 3.0 },
  Taiwan: { d: 2.5, f: 5.5 }, Tajikistan: { d: 4.5, f: 5.0 }, Tanzania: { d: 6.0, f: 5.5 },
  Thailand: { d: 4.0, f: 7.5 }, "Timor-Leste": { d: 5.0, f: 5.5 }, Togo: { d: 5.0, f: 5.5 },
  Tunisia: { d: 4.5, f: 3.5 }, Turkey: { d: 4.5, f: 4.5 }, Turkmenistan: { d: 5.0, f: 3.5 },
  Uganda: { d: 6.5, f: 5.5 }, Ukraine: { d: 3.0, f: 3.5 }, "United Arab Emirates": { d: 5.0, f: 2.5 },
  "United Kingdom": { d: 1.0, f: 3.5 }, "United States of America": { d: 3.5, f: 4.0 },
  Uruguay: { d: 4.0, f: 3.5 }, Uzbekistan: { d: 5.0, f: 4.0 }, Venezuela: { d: 4.5, f: 5.5 },
  Vietnam: { d: 4.0, f: 7.5 }, "W. Sahara": { d: 7.0, f: 2.0 }, Yemen: { d: 8.0, f: 5.0 },
  Zambia: { d: 6.0, f: 5.0 }, Zimbabwe: { d: 6.5, f: 4.5 },
};

export type AdaptMode = "drought" | "flood";

// Benefit = share of land under agriculture × the country's hazard score.
// Higher = more food systems shielded per percent of soil carbon gained.
export function adaptScore(name: string, mode: AdaptMode): number | null {
  const ag = AG_LAND[name];
  const r = CLIMATE_RISK[name];
  if (ag == null || r == null) return null;
  const h = mode === "drought" ? r.d : r.f;
  return (ag / 100) * h;
}
