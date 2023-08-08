import { useState } from "react";
import axiosPost from "../helpFuncs/axiosPost";
import { useHistory } from "react-router-dom";
import useGet from "../hooks/https/useGet";
import { Redirect } from "react-router-dom";

const Create = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [isPending, setIsPending] = useState(false);
  const history = useHistory();
  const isRegistered = localStorage.getItem("userName");
  const { data: categories } = useGet("http://localhost:8800/categories");
  let creator = localStorage.getItem("userName");
  const [selectedValues, setSelectedValues] = useState([]);

  if (!isRegistered) {
    return <Redirect to="/login" />;
  }

  const handleSelectChange = (event) => {
    const selectElement = event.target;

    if (event.target.checked) {
      setSelectedValues((prevSelectedValues) => [
        ...prevSelectedValues,
        selectElement.getAttribute("data-category"),
      ]);
    } else {
      setSelectedValues((prevSelectedValues) =>
        prevSelectedValues.filter(
          (value) => value !== selectElement.getAttribute("data-category")
        )
      );
    }
    console.log(selectedValues);
  };

  const HandleSubmit = (e) => {
    const data = {
      name: title,
      creator: creator,
      body: body,
      postId: title,
      categoryId: selectedValues,
    };
    e.preventDefault();
    axiosPost("http://localhost:8800/posts-add", data);
    history.push("/");
    setIsPending(false);
  };

  return (
    <div className="create">
      <div>
        <h2>Add a new Blog</h2>
        <form onSubmit={HandleSubmit}>
          <label>Blog title:</label>
          <input
            maxLength={25}
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label>Blog body:</label>
          <textarea
            maxLength={1000}
            required
            value={body}
            onChange={(e) => setBody(e.target.value)}
            style={{ height: "150px" }}
          ></textarea>
          {/* <select onChange={handleSelectChange} multiple required>
              {categories &&
                categories.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.title}
                  </option>
                ))}
            </select> */}
         <div className="checkbox-container">
            {categories &&
                categories.map((item) => (
                    <div className="checkbox-wrapper" key={item.id}>
                        <label className="checkbox-label">
                            <input
                                type="checkbox"
                                value={item.title}
                                data-category={item.id}
                                defaultChecked={false}
                                onChange={handleSelectChange}
                            />
                            {item.title}
                        </label>
                    </div>
                ))}
        </div>
          {!isPending && <button>Add blog</button>}
        </form>
        {isPending && <button disabled>Adding blog...</button>}
      </div>
    </div>
  );
};

export default Create;
