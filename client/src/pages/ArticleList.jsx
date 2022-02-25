import articles from "./article.content";
import { Link } from "react-router-dom";
function ArticleList() {
  return (
    <div className="mb-20">
      <h1 className="sm:text-4xl text-2xl font-bold mt-6 text-gray-900 mb-5">
        Articles
      </h1>
      <ul>
        {Object.entries(articles).map(([slug, { title }]) => (
          <li key={slug}>
            <Link to={`/article/${slug}`}>
              <h3>{title}</h3>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ArticleList;
