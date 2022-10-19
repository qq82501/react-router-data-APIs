import { Suspense } from "react";
import { useLoaderData, Await } from "react-router-dom";

import Posts from "../components/Posts";

function BlogPostsPage() {
  const blogPosts = useLoaderData();

  return (
    <>
      <h1>Our Blog Posts</h1>
      <Suspense fallback={<p>loading...</p>}>
        <Await
          resolve={blogPosts.posts}
          errorElement={<p>loading posts failed</p>}
        >
          {(loadedPosts) => <Posts blogPosts={loadedPosts} />}
        </Await>
      </Suspense>
      {/* {<Posts blogPosts={blogPosts} />} */}
    </>
  );
}

export default BlogPostsPage;
