import { Link } from "react-router-dom";
import './CharLayout.scss'
import { Helmet } from "react-helmet";
const CharLayout = ({ data }) => {
    const { name, description, thumbnail, } = data;
    return (
        <div className="single-comic">
                 <Helmet>
                <meta
      name="description"
      content={`content of ${name}`}
    />
    <title>{name}</title>
            </Helmet>
            <img src={thumbnail} alt={name} className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{name}</h2>
                <p className="single-comic__descr">{description}</p>
            </div>
            <Link to="/comics" className="single-comic__back">Back to all</Link>
        </div>
      
 )
}

export default CharLayout