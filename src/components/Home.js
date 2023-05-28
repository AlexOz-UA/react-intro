import Bloglist from "./Bloglist";
import useGet from "../hooks/https/useGet";

const Home = () => {
  const { data: blogs, isPending, error } = useGet("http://localhost:8800/posts");
  return (
    <div className="home">
      {error && <div>{ error }</div>}
      {!error && isPending && <div>Loading...</div>}
      {blogs && <Bloglist blogs={blogs} title="All Blogs!" />}
    </div>
  );
};

export default Home;
