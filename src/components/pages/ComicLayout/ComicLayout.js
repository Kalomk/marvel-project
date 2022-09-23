import { Link } from "react-router-dom";
import './ComicLayout.scss'
import { Helmet } from "react-helmet";
 const ComicLayout = ({ data }) => {
    const {title,description,pageCount,thumbnail,language,price } = data;
    return (
        <div className="single-comic">
            <Helmet>
                <meta
      name="description"
      content={`content of ${title}`}
    />
    <title>{title}</title>
            </Helmet>
            <img src={thumbnail} alt={title} className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">{pageCount}</p>
                <p className="single-comic__descr">{language}</p>
                <div className="single-comic__price">{price}</div>
            </div>
            <Link to="/comics" className="single-comic__back">Back to all</Link>
        </div>
 )
}
export default ComicLayout;