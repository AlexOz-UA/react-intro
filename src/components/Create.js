import { useEffect, useState } from "react";
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
  const { data: categories } = useGet("https://fathomless-garden-74281-01ac0e8623bc.herokuapp.com/categories");
  let creator = localStorage.getItem("userName");
  const [selectedValues, setSelectedValues] = useState([]);
  const [titleMessage, setTitleMessage] = useState("");
  const [bodyMessage, setBodyMessage] = useState("");
  const [categoriesMessage, setCategoriesMessage] = useState("");

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

  const checkBodyAndTitle = () => {
    if(title.trim() != ""){
      setTitleMessage("")
    }
    if(body.trim() != ""){
      setBodyMessage("")
    }
  }

  const HandleSubmit = (e) => {
    e.preventDefault();
    if(title.trim() == ""){
      setTitleMessage("Title cannot be empty.")
      return
    }
    else if(body.trim() == ""){
      setBodyMessage("Body cannot be empty.")
      return
    }
    else if(selectedValues == ""){
      setCategoriesMessage("You must choose a category.")
      return
    }
    const data = {
      name: title,
      creator: creator,
      body: body,
      postId: title,
      categoryId: selectedValues,
    };
    console.log(title, body, selectedValues);
    axiosPost("https://fathomless-garden-74281-01ac0e8623bc.herokuapp.com/posts-add", data);
    history.push("/");
    setIsPending(false);
  };

  return (
    <div className="create">
      <div>
        <h2>Add a new Blog</h2>
        <form onSubmit={HandleSubmit} onChange={checkBodyAndTitle}>
          <label>Blog title:</label>     
          <input
            maxLength={25}
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <p style={{color : "red", marginBottom: "15px"}}>{titleMessage}</p>
          <label>Blog body:</label>
          <textarea
            maxLength={3000}
            required
            value={body}
            onChange={(e) => setBody(e.target.value)}
            style={{ height: "150px" }}
          ></textarea>
          <p style={{color : "red", marginBottom: "15px"}}>{bodyMessage}</p>
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
          <p style={{color : "red", marginBottom: "15px"}}>{categoriesMessage}</p>       
        </div>
          {!isPending && <button>Add blog</button>}
        </form>
        {isPending && <button disabled>Adding blog...</button>}
      </div>
    </div>
  );
};

export default Create;
