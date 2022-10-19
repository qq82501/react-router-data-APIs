import { useLoaderData } from "react-router-dom";
import NewsletterSignup from "../components/NewsletterSignup";

import BlogPost from "../components/BlogPost";

function PostDetailPage() {
  const postDetail = useLoaderData();

  return (
    <>
      {<BlogPost title={postDetail.title} text={postDetail.body} />}
      <NewsletterSignup />
    </>
  );
}

export default PostDetailPage;
