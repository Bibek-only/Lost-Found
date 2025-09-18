// import {
//   createBrowserRouter,
//   createRoutesFromElements,
//   Route,
// } from "react-router-dom";
// import LandingPage from "../pages/LandingPage";
// import ProfilePage from "../pages/Profile";
// import LostItemsPage from "../pages/LostPage";
// import FoundItemsPage from "../pages/FoundPage";
// import ErrorPage from "../pages/ErrorPage";
// import HomePage from "../pages/HomePage";

// import App from "../App";
// import IsAuthRoute from "./isAuthRoute";

// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route path="/" element={<App></App>}>
//       <Route path="" element={<LandingPage></LandingPage>}></Route>
//       <Route element={<IsAuthRoute></IsAuthRoute>}>
//       <Route path="/home" element={<HomePage></HomePage>}></Route>
//       <Route path="/profile" element={<ProfilePage></ProfilePage>}></Route>
//       <Route path="/lost-items" element={<LostItemsPage></LostItemsPage>}></Route>
//       <Route path="/found-items" element={<FoundItemsPage></FoundItemsPage>}></Route>
//       </Route>
//       <Route path="/*" element={<ErrorPage></ErrorPage>}></Route>
//     </Route>
//   )
// );
// export default router;

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import ProfilePage from "../pages/Profile";
import LostItemsPage from "../pages/LostPage";
import FoundItemsPage from "../pages/FoundPage";
import ErrorPage from "../pages/ErrorPage";
import HomePage from "../pages/HomePage";

import App from "../App";
import IsAuthRoute from "./isAuthRoute";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App></App>}>
      <Route index element={<LandingPage></LandingPage>}></Route>
      <Route element={<IsAuthRoute></IsAuthRoute>}>
        <Route path="home" element={<HomePage></HomePage>}></Route>
        <Route path="profile" element={<ProfilePage></ProfilePage>}></Route>
        <Route path="lost-items" element={<LostItemsPage></LostItemsPage>}></Route>
        <Route path="found-items" element={<FoundItemsPage></FoundItemsPage>}></Route>
      </Route>
      <Route path="*" element={<ErrorPage></ErrorPage>}></Route>
    </Route>
  )
);
export default router;
