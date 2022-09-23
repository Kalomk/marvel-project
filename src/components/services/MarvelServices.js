import { useHttp } from "../hooks/http.hook";
const useMarvelServices = () => {
  const { request,clearError,process,setProcess } = useHttp();
  const _apiBase = "https://gateway.marvel.com:443/v1/public/";
  const _apiKey = "apikey=185c84ba90a3c094ed2dcba3d80c7b51";
  const _baseOffset = 210;

  const getAllcharater = async (offset = _baseOffset) => {
    const res = await request(
      `${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`
    );
    return res.data.results.map(_transformCharacter);
  };
  const getAllComics = async (offset = 100) => {
    const res = await request(
      `${_apiBase}comics?limit=8&offset=${offset}&${_apiKey}`
    );
    return res.data.results.map(_transformComics);
  };
  const getComic = async (id) => {
    const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
    return _transformComics(res.data.results[0]);
  };
  const getCharater = async (id) => {
    const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
    return _transformCharacter(res.data.results[0]);
  };
  const getCharacterByName = async (name) => {
    const res = await request(`${_apiBase}characters?name=${name}&${_apiKey}`);
           return res.data.results.map(_transformCharacter);
  }
  const _transformCharacter = (char) => {
    const thumb = char.thumbnail.path + "." + char.thumbnail.extension;
    return {
      name: char.name,
      description:
        char.description === ""
          ? "Nie ma tekstu(("
          : char.description || char.description.lenght === 230
          ? char.description.substring(0, 219) + "..."
          : char.description,
      wiki: char.urls[1].url,
      thumbnail: thumb,
      homepage: char.urls[0].url,
      id: char.id,
      comics: char.comics.items,
    };
  };

  const _transformComics = (comics) => {
    const thumb = comics.thumbnail.path + "." + comics.thumbnail.extension;
    return {
      title: comics.title,
       price: comics.prices.price ? `${comics.prices.price}$` : 'not available',
      id: comics.id,
      thumbnail: thumb,
      description: comics.description || 'There is no description',
      pageCount: comics.pageCount ? `${comics.pageCount} p.` : 'No information about the number of pages',
      language: comics.textObjects.language || 'en-us',

    }
  }
  return {
    getAllcharater,
    getCharater,
    clearError,
    getAllComics,
    getComic,
    getCharacterByName,
    process,
    setProcess
  };
};
export default useMarvelServices;
