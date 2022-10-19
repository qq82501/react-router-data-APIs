import { useState } from "react";
import {
  useNavigate,
  redirect,
  useActionData,
  useNavigation,
} from "react-router-dom";

import NewPostForm from "../components/NewPostForm";
import { savePost } from "../util/api";

function NewPostPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const errData = useActionData();
  const naviState = useNavigation();
  console.log(naviState);

  function cancelHandler() {
    navigate("/blog");
  }

  return (
    <>
      {errData && errData.status === 422 && <p>{errData.message}</p>}
      <NewPostForm
        onCancel={cancelHandler}
        // onSubmit={submitHandler}
        submitting={naviState.state === "submitting"}
      />
    </>
  );
}

export const action = async function ({ request }) {
  const formData = await request.formData();
  const post = {
    title: formData.get("title"),
    body: formData.get("post-text"),
  };
  try {
    await savePost(post);
  } catch (err) {
    if (err.status === 422) return err;
    throw err;
  }
  return redirect("/blog");
};

export default NewPostPage;
