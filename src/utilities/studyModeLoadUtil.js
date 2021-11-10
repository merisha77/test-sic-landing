const STUDYMODE = ["Online", "On Campus", "Both"];
const STUDYLOAD = ["Full Time", "Part Time", "Both"];

export const getStudyMode = (idx) =>
  idx === 2 ? STUDYMODE.slice(0, 2).toString() : STUDYMODE[idx];
export const getStudyLoad = (idx) =>
  idx === 2 ? STUDYLOAD.slice(0, 2).toString() : STUDYLOAD[idx];
