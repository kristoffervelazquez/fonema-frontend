import { Navigate, createBrowserRouter } from "react-router-dom";
import TranscriptRoutes from "../../app/transcript/routes";




const router = createBrowserRouter([
  TranscriptRoutes,
  {
    path: "*",
    element: <Navigate to="/" />,
  }
]);

export default router;