import { useHistory, useParams } from "react-router-dom";
import useFetch from "./useFetch";

const BlogDetails = () => {
    const { id } = useParams();
    const { data: blog, error, isPending } = useFetch(`http://localhost:8000/blogs/${id}`);
    const history = useHistory();
    const isLogined = getCookie('isLoginned');
    function getCookie(cname) {
        let name = cname + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for(let i = 0; i <ca.length; i++) {
          let c = ca[i];
          while (c.charAt(0) === ' ') {
            c = c.substring(1);
          }
          if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
          }
        }
        return "";
      }

    const handleClick = () => {
    fetch(`http://localhost:8000/blogs/${id}`, {
        method: 'DELETE'
    }).then(() => {
        history.push('/');
    })
    }

    return (
        <div className="blog-details">
            {isPending && <div>Loading...</div>}
            {error && <div>{ error }</div>}   
            {blog && (
                <article>
                    <h2>{ blog.title }</h2>
                    <div>{ blog.body }</div>
                    <h2>Written by { blog.author }</h2>
                    {isLogined && <button onClick={handleClick}>Delete blog</button>}
                </article>
            )}         
        </div>
    );
}
 
export default BlogDetails
