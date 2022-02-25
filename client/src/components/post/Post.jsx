import { Link } from "react-router-dom";
import "./post.css";

export default function Post({ post }) {
  return (
    <div className="post">
      <img className="postImg" src={post.photo} alt="" />
      <div className="postInfo">
        <div className="postCats">
          {post.categories.map((categories) => (
            <span className="postCat">{categories.name}</span>
          ))}
        </div>
        {/* <Link to={`/post/${post._id}`}></Link> */}

        <Link to={`/post/${post._id}`} className="link">
          <span className="postTitle">{post.title}</span>
        </Link>

        <hr />
        <span className="postDate">
          {new Date(post.createdAt).toDateString()}
        </span>
      </div>
      <p className="postDesc">{post.desc}</p>
    </div>
  );
}
