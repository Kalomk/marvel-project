import "./charList.scss";
import Spinner from "../spinner/spinner";
import Error from "../errorMessage/errorMessage";
import { useState, useRef, useEffect } from "react";
import useMarvelServices from "../services/MarvelServices";
import PropTypes from "prop-types";
import { CSSTransition,TransitionGroup } from "react-transition-group";
import { useMemo } from "react";

const setContent = (process,Component,newCharsLoading) => {
    switch (process) {
      case 'waiting':
        return <Spinner />
        break
      case 'loading':
        return newCharsLoading ? <Component/> : <Spinner/>
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

const CharList = (props) => {
  const [data, setData] = useState([]);
  const [newCharsLoading, setNewCharsLoading] = useState(false);
  const [offset, setOffset] = useState(210);
  const [charEnded, setCharEnded] = useState(false);
  const [pageEnded, setPageEnded] = useState(false);
  const [btnToggle, setBtnToggle] = useState(false);
  const {loading,error,getAllcharater,clearError,process,setProcess} =  useMarvelServices();
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
  const itemRefs = useRef([]);

  const focusOnItem = (id) => {
    itemRefs.current.forEach((item) =>
      item.classList.remove("char__item_selected")
    );
    itemRefs.current[id].classList.add("char__item_selected");
    itemRefs.current[id].focus();
  };

  const onUpdateCharListByScroll = () => {
    if (pageEnded && !newCharsLoading && !charEnded) {
      onRequest(offset);
    }
  };

  const onRequest = (offset, initial) => {
    initial ? setNewCharsLoading(false) : setNewCharsLoading(true)
  getAllcharater(offset).then(updateChars).then(()=> setProcess('confirmed'));
  };
  const toggleButton = () => {
    onRequest(offset);
    setBtnToggle(true);
  };


  const updateChars = (newData) => {
    let ended = false;
    if (newData.length < 9) {
      ended = true;
    }
    clearError()
    setData((data) => [...data, ...newData]);
    setNewCharsLoading((NewCharsLoading) => false);
    setOffset((offset) => offset + 9);
    setCharEnded((charEnded) => ended);
  };

  const View = (data) => {
    const element = data.map((item, i) => {
      const { id, thumbnail, name } = item;
      const thumbCheck =
        thumbnail ===
        "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
          ? { objectFit: "contain" }
          : null;
      return (
        <CSSTransition key={id} timeout={500} classNames="char__item">
          <li
          key={id}
          ref={(el) => (itemRefs.current[i] = el)}
          className="char__item"
          onClick={() => {
            props.onCharSelected(id);
            focusOnItem(i);
          }}
          onKeyPress={(e) => {
            if (e.key === " " || e.key === "Enter") {
              props.onCharSelected(id);
              focusOnItem(i);
            }
          }}
        >
          <img src={thumbnail} alt={name} style={thumbCheck} />
          <div className="char__name">{name}</div>
        </li>
        </CSSTransition>
      );
    });
    return <ul className="char__grid"><TransitionGroup component={null}>{element}</TransitionGroup></ul>;
  };

  const elements = useMemo(() => {
  return setContent(process, ()=>View(data),newCharsLoading)
},[process])
  return (
    <div className="char__list">
      {elements}
      <button
        disabled={newCharsLoading}
        onClick={() => toggleButton()}
        className="button button__main button__long"
      >
        <div className="inner">load more</div>
      </button>
    </div>
  );
};

export default CharList;
CharList.propTypes = {
  onCharSelected: PropTypes.func.isRequired,
};
