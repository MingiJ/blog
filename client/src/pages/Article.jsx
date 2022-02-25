import { useParams } from 'react-router-dom';
import articles from './article.content';

function Article({match}) {
    const {slug} = useParams();
    console.log('slug',typeof(slug));
    const article = articles[parseInt(slug)];
    console.log('slug',typeof(slug));
    const {title, content} = article;
    return (
        <div className="mb-20">
      <h1 className="sm:text-4xl text-2xl font-bold mt-6 text-gray-900 mb-5">{title}</h1>
      <p className="mx-auto leading-relaxed text-base mb-4">
        {content}
      </p>
    </div>
    )
}

export default Article
