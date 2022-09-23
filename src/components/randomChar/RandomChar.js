import "./randomChar.scss";
import mjolnir from "../../resources/img/mjolnir.png";
import { useState, useEffect } from "react";
import Spinner from "../spinner/spinner";
import Error from "../errorMessage/errorMessage";
import useMarvelServices from "../services/MarvelServices";
import setContent from "../../utils/setContent";
const RandomChar = (props) => {
  const [char, setChar] = useState({});

  const { loading, error, getCharater,clearError,process,setProcess } = useMarvelServices();
  useEffect(() => {
    updateCharacter();
  }, []);

  const onCharLoaded = (char) => {
    setChar(char);
  };

  const updateCharacter = () => {
    clearError()
    const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
    getCharater(id).then(onCharLoaded).then(()=> setProcess('confirmed'));
  };

  return (
    <div className="randomchar">
     {setContent(process,Viev,char)}
      <div className="randomchar__static">
        <p className="randomchar__title">
          Random character for today!
          <br />
          Do you want to get to know him better?
        </p>
        <p className="randomchar__title">Or choose another one</p>
        <button onClick={updateCharacter} className="button button__main">
          <div className="inner">try it</div>
        </button>
        <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
      </div>
    </div>
  );
};

const Viev = ({data}) => {
  const { thumbnail, name, homepage, wiki, description } = data;
  const thumbCheck =
    thumbnail ===
    "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
      ? { objectFit: "contain" }
      : null;
  return (
    <div className="randomchar__block">
      <img
        src={thumbnail}
        alt="Random character"
        style={thumbCheck}
        className="randomchar__img"
      />
      <div className="randomchar__info">
        <p className="randomchar__name">{name}</p>
        <p className="randomchar__descr">{description}</p>
        <div className="randomchar__btns">
          <a href={homepage} className="button button__main">
            <div className="inner">Homepage</div>
          </a>
          <a href={wiki} className="button button__secondary">
            <div className="inner">Wiki</div>
          </a>
        </div>
      </div>
    </div>
  );
};
export default RandomChar;
