import { createBrowserRouter, RouterProvider, defer } from "react-router-dom";
import React, { Suspense } from "react";

import BlogLayout from "./pages/BlogLayout";
import BlogPostsPage from "./pages/BlogPosts";
import ErrorPage from "./pages/Error";
import NewPostPage from "./pages/NewPost";
import { action } from "./pages/NewPost";
import PostDetailPage from "./pages/PostDetail";
import RootLayout from "./pages/RootLayout";
import WelcomePage from "./pages/Welcome";
import { getPosts, getPost } from "./util/api";
import { action as newsletterAction } from "./pages/Newsletter";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      errorElement: <ErrorPage />,
      children: [
        { path: "/", element: <WelcomePage /> },
        {
          path: "/blog",
          element: <BlogLayout />,
          children: [
            {
              index: true,
              element: <BlogPostsPage />,
              loader: () => {
                return defer({ posts: getPosts() });
              },
            },
            {
              path: ":id",
              element: <PostDetailPage />,
              loader: ({ params }) => {
                return getPost(params.id);
              },
            },
          ],
        },
        {
          path: "/blog/new",
          element: <NewPostPage />,
          action: action,
        },
      ],
    },
    { path: "newsletter", action: newsletterAction },
  ]);
  return (
    <Suspense fallback={<p>loading....</p>}>
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default App;
