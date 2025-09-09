
import { Outlet, type RouteObject } from "react-router-dom";
import MainScreen from "./screens/MainScreen";
import AppLayout from "../../shared/layout/AppLayout";
import AnalysisScreen from "./screens/AnalysisScreen";
import HistoryScreen from "./screens/HistoryScreen";





const TranscriptRoutes: RouteObject = {
  path: "/",
  element: <AppLayout children={<Outlet />} />,
  errorElement: <div>404</div>,
  children: [
    {
      path: "",
      element: <MainScreen />,
    },
    {
      path: "history",
      element: <HistoryScreen />
    },
    {
      path: "transcription/:id",
      element: <AnalysisScreen />,
    },
  ],
};

export default TranscriptRoutes;