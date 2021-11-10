const STAGES = {
  0: "Enquiry",
  1: "Not Started",
  2: "In Process",
  3: "Completed",
  4: "Discontinued",
};

export const getStage = (id) => STAGES[id];
