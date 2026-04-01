import { Routes, Route } from "react-router-dom";

import GuestLayout from "./components/guestlayout/GuestLayout";
import UserLayout from "./components/userlayout/UserLayout";
import AdminLayout from "./components/adminlayout/AdminLayout";

import Home from "./components/guestlayout/Home";
import About from "./components/guestlayout/About";
import Services from "./components/guestlayout/Services";
import Contact from "./components/guestlayout/Contact";
import Login from "./components/guestlayout/Login";
import Register from "./components/guestlayout/Register";
import ForgotPassword from "./components/guestlayout/ForgotPassword";
import NotFound from "./components/guestlayout/NotFound";

import UserDashboard from "./components/userlayout/UserDashboard";
import FeedbackForm from "./components/userlayout/FeedbackForm";
import Profile from "./components/userlayout/Profile";
import MovieRecommender from "./components/userlayout/MoviesRecommender";

import AdminDashboard from "./components/adminlayout/AdminDashboard";
import UserFeedbacks from "./components/adminlayout/UserFeedbacks";
import AdminUsers from "./components/adminlayout/AdminUsers";
import AdminContacts from "./components/adminlayout/AdminContacts";

function App() {
return ( <Routes>


  {/* Guest Routes */}
  <Route path="/" element={<GuestLayout />}>
    <Route index element={<Home />} />
    <Route path="about" element={<About />} />
    <Route path="services" element={<Services />} />
    <Route path="contact" element={<Contact />} />
    <Route path="login" element={<Login />} />
    <Route path="forgot-password" element={<ForgotPassword />} />
    <Route path="register" element={<Register />} />
  </Route>

  {/* User Routes */}
  <Route path="/user" element={<UserLayout />}>
    <Route path="dashboard" element={<UserDashboard />} />
    <Route path="movies" element={<MovieRecommender />} />
    <Route path="feedback" element={<FeedbackForm />} />
    <Route path="profile" element={<Profile />} />
  </Route>

  {/* Admin Routes */}
  <Route path="/admin" element={<AdminLayout />}>
    <Route index element={<AdminDashboard />} />
    <Route path="movies" element={<MovieRecommender />} />
    <Route path="feedbacks" element={<UserFeedbacks />} />
    <Route path="users" element={<AdminUsers />} />
    <Route path="contacts" element={<AdminContacts />} />
  </Route>

  {/* Fallback */}
  <Route path="*" element={<NotFound />} />

</Routes>

);
}

export default App;
