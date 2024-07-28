// import { lazy, Suspense } from "react";
import { ROUTE_PATH } from "constants/routes";
import { Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "layout/AppLayout";
import Country from "pages/Country";

// Pages Lazy Import
// Error with deployment
// const AppLayout = lazy(() => import("layout/AppLayout"));
// const Country = lazy(() => import("pages/Country"));

export default function AllRoutes() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route
          path={ROUTE_PATH.root}
          element={<Navigate to={ROUTE_PATH.country} replace />}
        />

        <Route path={ROUTE_PATH.country} element={<Country />} />
      </Route>
    </Routes>
  );
}
