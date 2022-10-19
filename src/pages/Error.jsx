import MainNavigation from "../components/MainNavigation";
import { useRouteError } from "react-router-dom";

function ErrorPage() {
  const error = useRouteError();
  return (
    <>
      <MainNavigation />
      <main id="error-content">
        <h1>{error.message}</h1>
      </main>
    </>
  );
}

export default ErrorPage;
