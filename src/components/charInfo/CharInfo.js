import "./charInfo.scss";
import useMarvelServices from "../services/MarvelServices";
import { useState, useEffect } from "react";
import setContent from "../../utils/setContent";
const CharInfo = (props) => {
  const [char, setChar] = useState(null);

const {getCharater,setProcess,process} = useMarvelServices();
  const onUpdateChars = () => {
    const { charId } = props;
    if (!charId) {
      return;
    }
    updateChars();
    getCharater(charId)
      .then(updateChars)
      .then(() => setProcess('confirmed'))
  };
  useEffect(() => {
    onUpdateChars();
  }, [props.charId]);

  const updateChars = (char) => {

    setChar(char);
  };
 
 

  // const skeleton = char || loading || error ? null : <Skeleton />;
  // const spinner = loading ? <Spinner /> : null;
  // const er = error ? <Error /> : null;
  // const content = !(loading || error || !char) ? <Viev char={char} /> : null;
  return (
    <div className="char__info">
      {setContent(process,Viev,char)}
    </div>
  );
};

const Viev = ({ data }) => {
  const { thumbnail, name, homepage, wiki, description, comics } = data;
  const thumbCheck =
    thumbnail ===
    "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
      ? { objectFit: "contain" }
      : null;
  return (
    <>
      <div className="char__basics">
        <img src={thumbnail} style={thumbCheck} alt="abyss" />
        <div>
          <div className="char__info-name">{name}</div>
          <div className="char__btns">
            <a href={homepage} className="button button__main">
              <div className="inner">homepage</div>
            </a>
            <a href={wiki} className="button button__secondary">
              <div className="inner">Wiki</div>
            </a>
          </div>
        </div>
      </div>
      <div className="char__descr">{description}</div>
      <div className="char__comics">Comics:</div>
      <ul className="char__comics-list">
        {comics.length > 0 ? null : "Nie ma komiksow"}
        {comics.map((item, i) => {
          if (i > 9) {
            // eslint-disable-next-line
            return;
          }
          const { resourceURI, name } = item;
          return (
            <li key={i} className="char__comics-item">
              <a href={resourceURI}>{name}</a>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default CharInfo;
