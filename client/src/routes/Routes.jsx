import {
  createBrowserRouter,
  createRoutesFromChildren,
  Route,
} from "react-router-dom";

import ProtectedRoute from "./ProctedRoute";
import Layout from "../Layout";

import {
  Home,
  Login,
  Register,
  PostGig,
  GigDetails,
  Dashboard,
  ManageGig,
} from "../pages/pagesExport";



const routes = createBrowserRouter(
  createRoutesFromChildren(
    <>
      {/* Public */}
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* APP LAYOUT (Header is inside Router now) */}
      <Route element={<Layout />}>
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route
          path="/gigs/:gigId"
          element={
            <ProtectedRoute>
              <GigDetails />
            </ProtectedRoute>
          }
        />

        <Route
          path="/post-gig"
          element={
            <ProtectedRoute>
              <PostGig />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/gigs/:gigId"
          element={
            <ProtectedRoute>
              <ManageGig />
            </ProtectedRoute>
          }
        />
      </Route>
    </>
  )
);

export default routes;
