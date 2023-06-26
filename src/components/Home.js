import Bloglist from "./Bloglist";
import useGet from "../hooks/https/useGet";

const Home = () => {
  
  const {
    data: blogs,
    isPending,
    error,
  } = useGet("http://localhost:8800/posts", {
    headers: { "x-access-token": localStorage.getItem("token") },
  });

  return (
    <div className="home">
      {error && <div>{error}</div>}
      {!error && isPending && <div>Loading...</div>}
      {localStorage.getItem("token") &&
        blogs !== "TokenExpiredError: jwt expired" && (
          <Bloglist blogs={blogs} title="All Blogs!" />
        )}
      {!localStorage.getItem("token") && (
        <h1 style={{ textAlign: "center" }}>
          You need to Login/Register at first.
        </h1>
      )}
      {blogs === "TokenExpiredError: jwt expired" && (
        <h1 style={{ textAlign: "center" }}>
          Your token is expired. Please log out and log in one more time.
        </h1>
      )}
    </div>
  );
};

export default Home;
