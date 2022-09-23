import "./Comic.scss";
import Spinner from "../spinner/spinner";
import { Link } from "react-router-dom";
import Error from "../errorMessage/errorMessage";
import { useState, useEffect } from "react";
import useMarvelServices from "../services/MarvelServices";
import PropTypes from "prop-types";

const setContent = (process,Component,newComicsLoading) => {
    switch (process) {
      case 'waiting':
        return <Spinner />
        break
      case 'loading':
        return newComicsLoading ? <Component/> : <Spinner/>
        break;
      case 'confirmed':
        return <Component/>
        break
      case 'error':
        return <Error />
        break;
      default:
        throw new Error("Unexpected process state")
    }
}


const Comics = (props) => {

const [data, setData] = useState([]);
const {getAllComics,clearError,setProcess,process} =  useMarvelServices();
    const [newComicsLoading, setNewComicsLoading] = useState(false);
      const [comicsEnded, setComicsEnded] = useState(false);
  const [pageEnded, setPageEnded] = useState(false);
  const [btnToggle, setBtnToggle] = useState(false);
    const [offset, setOffset] = useState(100);
  useEffect(() => {
    onRequest(offset,true);
  }, []);
  useEffect(() => {
    window.addEventListener("scroll", checkPageEnded);
    window.addEventListener("scroll", onUpdateCharListByScroll);
    return () => {
      window.removeEventListener("scroll", checkPageEnded);
      window.removeEventListener("scroll", onUpdateCharListByScroll);
    };
  });
    const onUpdateCharListByScroll = () => {
    if (pageEnded && !newComicsLoading && !comicsEnded) {
      onRequest(offset);
    }
    };
      const toggleButton = () => {
    onRequest(offset);
    setBtnToggle(true);
  };

  const checkPageEnded = () => {
    if (btnToggle) {
      if (
        window.scrollY + document.documentElement.clientHeight >=
        document.documentElement.offsetHeight - 3
      ) {
        setPageEnded(true);
      }
    }
  };

    const onRequest = (offset,initial) => {
            initial ? setNewComicsLoading(false) : setNewComicsLoading(true)
    getAllComics(offset).then(onUpdateComics).then(()=>setProcess('confirmed'))
}
    const onUpdateComics = (newData) => {
     let ended = false;
    if (newData.length < 8) {
      ended = true;
    }
    clearError()
    setData((data) => [...data, ...newData]);
    setNewComicsLoading((NewComicsLoading) => false);
    setOffset((offset) => offset + 8);
     setComicsEnded((charEnded) => ended);
  };
    const View = (data) => {
    const element = data.map((item, i) => {
      const { id, thumbnail, title,price } = item;
      const thumbCheck =
        thumbnail ===
        "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
          ? { objectFit: "fill"
 }
          : null;
      return (
        <li
          key={i}
          className="comics__item"
        >
          <Link to={`/comics/${id}`}>
            <img src={thumbnail} alt={title} style={thumbCheck} />
              <div className="comics__title">{title}</div>
              <div className="comics__price">{price}</div>
          </Link>
        </li>
      );
    });
    return <ul className="comics__grid">{element}</ul>;
  };


  return (
      <div className="comics__list">
      {setContent(process,()=> View(data),newComicsLoading)}
          <button onClick={toggleButton}
              disabled={newComicsLoading} 
                style={{'display' : comicsEnded ? 'none' : 'block'}}
        className="button button__main button__long"
      >
        <div className="inner">load more</div>
      </button>
    </div>
  );


}
export default Comics