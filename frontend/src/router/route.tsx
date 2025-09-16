import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Home from "../pages/Home";
import ProfilePage from "../pages/Profile";
import LostItemsPage from "../pages/LostPage";
import FoundItemsPage from "../pages/FoundPage";
import AuthPage from "../pages/Auth";

import App from "../App";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App></App>}>
      <Route path="" element={<Home></Home>}></Route>
      <Route path="/profile" element={<ProfilePage></ProfilePage>}></Route>
      <Route path="/lost-items" element={<LostItemsPage></LostItemsPage>}></Route>
      <Route path="/found-items" element={<FoundItemsPage></FoundItemsPage>}></Route>
      <Route path="/auth" element={<AuthPage></AuthPage>}></Route>
    </Route>
  )
);
export default router;
