import React from "react";

// Lazy load templates
export const DashboardTemplate = React.lazy(
  () => import("./DashboardTemplate")
);
export const DrugDetailTemplate = React.lazy(
  () => import("./DrugDetailTemplate")
);
