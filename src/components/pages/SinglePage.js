
import useMarvelServices from "../services/MarvelServices";
import { useState, useEffect } from "react";
import { useParams} from 'react-router-dom';
import AppBanner from "../appBanner/AppBanner";
import setContent from "../../utils/setContent";
const SinglePage = ({Component,dataType}) => {
    const { id } = useParams()
    const [data, setData] = useState(null)
const {getComic,clearError,getCharater,process,setProcess} = useMarvelServices();
    useEffect(() => {
    updateComic();
}, [id]);

const updateComic = () => {
  clearError();
  switch (dataType) {
    case 'comic':
      getComic(id).then(onComicLoaded).then(()=>setProcess('confirmed'));
      break
    case 'char':
        getCharater(id).then(onComicLoaded).then(()=>setProcess('confirmed'));
  }
};
  const onComicLoaded = (data) => {
    setData(data);
  };
    return (
      <>
        <AppBanner/>
          {setContent(process,Component,data)}
        </>
    )
}


export default SinglePage;