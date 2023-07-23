import React from "react";
import { Routes, Route } from "react-router-dom";
import FollowingPostsPage from "../pages/posts/followingPosts";
import UserProfile from "../pages/UserProfile/userProfile";
import AllPayments from "../pages/payments/payments";


const AllMyPosts= React.lazy(()=> import ("../pages/posts/myPosts")) ;
const AllUsers = React.lazy(()=>import("../pages/users/users")) ;
const AllPosts = React.lazy(()=> import ( "../pages/posts/posts")) 
const SignIn = React.lazy(() => import("../components/signIn"))


const AllRoutes = () => {
    return (
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/posts" element={<AllPosts />} />
        <Route path="/myPosts" element={<AllMyPosts />} />
        <Route path="/users" element={<AllUsers />} />
        <Route path="/following" element={<FollowingPostsPage />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/payments" element={<AllPayments />} />
        <Route path="*" element={<SignIn />} />

        {/* <Route path="/login" element={<Login />} />
        <Route path="/posts" element={<AllPosts />} />
        <Route path="/userPosts" element={<Posts />} />
        <Route path="/singlePost/:id" element={<SinglePost />} />
        <Route path="/userPost/:id" element={<UserSinglePost />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="*" element={<NotFound />} /> */}
      </Routes>
    );
};

export default AllRoutes;