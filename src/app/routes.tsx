import { createBrowserRouter, Outlet } from "react-router";
import { Welcome } from "./pages/Welcome";
import { ZipCodeValidation } from "./pages/ZipCodeValidation";
import { CategoryTierSelect } from "./pages/CategoryTierSelect";
import { RoomSelection } from "./pages/RoomSelection";
import { ProductConfiguration } from "./pages/ProductConfiguration";
import { FinalResult } from "./pages/FinalResult";
import { DesignProvider } from "./context/DesignContext";

function Root() {
  return (
    <DesignProvider>
      <Outlet />
    </DesignProvider>
  );
}

export const router = createBrowserRouter([
  {
    element: <Root />,
    children: [
      {
        path: "/",
        Component: Welcome,
      },
      {
        path: "/zip",
        Component: ZipCodeValidation,
      },
      {
        path: "/validate",
        Component: ZipCodeValidation,
      },
      {
        path: "/category-tier",
        Component: CategoryTierSelect,
      },
      {
        path: "/category",
        Component: CategoryTierSelect,
      },
      {
        path: "/room",
        Component: RoomSelection,
      },
      {
        path: "/configure",
        Component: ProductConfiguration,
      },
      {
        path: "/result",
        Component: FinalResult,
      },
    ],
  },
]);