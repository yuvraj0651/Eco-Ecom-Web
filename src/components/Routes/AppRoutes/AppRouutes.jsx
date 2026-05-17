import { Suspense } from "react";
import { Route, Routes } from "react-router";
import { publicRoutes, protectedRoutes } from "../RouteConfig/RouteConfig";
import LoadingShimmer from "../../UI/LoadingShimmer/LoadingShimmer";
import ProtectedRoutes from "../ProtectedRoutes/ProtectedRoutes";
import { useQuery } from "@tanstack/react-query";
import { getRoutes } from "../../services/routesApi";

const AppRoutes = ({ debouncedSearch }) => {
  const { data = [] } = useQuery({
    queryKey: ["routes"],
    queryFn: getRoutes,
  });

  console.log("Routes:", data);

  return (
    <Suspense fallback={<LoadingShimmer />}>
      <Routes>
        {publicRoutes?.map((route) => {
          const Component = route.element;
          return (
            <Route key={route.path} path={route.path} element={<Component />} />
          );
        })}
        {protectedRoutes?.map((route) => {
          const Component = route.element;
          return (
            <Route
              key={route.path}
              path={route.path}
              element={
                route?.path === "/shop" ? (
                  <ProtectedRoutes allowedRoles={route.roles}>
                    <Component debouncedSearch={debouncedSearch} />
                  </ProtectedRoutes>
                ) : (
                  <ProtectedRoutes allowedRoles={route.roles}>
                    <Component />
                  </ProtectedRoutes>
                )
              }
            />
          );
        })}
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
