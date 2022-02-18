import { useState, useEffect } from "react";
import "./charInfo.scss";
import MarvelService from "../../servises/MarvelService";

import Spinner from "../Spiner/Spiner";
import ErrorMassage from "../errorMassage/errorMassage";
import Skeleton from "../skeleton/Skeleton";

const CharInfo = ({ idChar }) => {
  const [char, setChar] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const marvelService = new MarvelService();

  const onCharLoaded = (char) => {
    setChar(char);
    setLoading(false);
  };

  const charLoading = () => {
    setLoading(true);
  };

  const onError = () => {
    setLoading(false);
    setError(true);
  };

  useEffect(() => {
    updateChar();
  }, [idChar]);

  function updateChar() {
    if (!idChar) {
      return;
    }
    charLoading();
    marvelService
      .getCharacter(idChar)
      .then((res) => onCharLoaded(res))
      .catch(() => {
        onError();
      });
  }

  const skeleton = char || loading || error ? null : <Skeleton />;
  const errorMassage = error ? <ErrorMassage /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(errorMassage || spinner || !char) ? (
    <View char={char}></View>
  ) : null;

  return (
    <>
      <div className="char__info">
        {content}
        {skeleton}
        {errorMassage}
        {spinner}
      </div>
      {/* <button onClick={updateChar}>Click</button> */}
    </>
  );
};

const View = ({ char }) => {
  return (
    <>
      <div className="char__basics">
        <img src={char.src} alt="abyss" />
        <div>
          <div className="char__info-name">{char.name}</div>
          <div className="char__btns">
            <a href={char.urlHomePage} className="button button__main">
              <div className="inner">homepage</div>
            </a>
            <a href={char.urlWiki} className="button button__secondary">
              <div className="inner">Wiki</div>
            </a>
          </div>
        </div>
      </div>
      <div className="char__descr">{char.descriotion}</div>
      <div className="char__comics">Comics:</div>
      <ul className="char__comics-list">
        {char.comics.length
          ? 
          char.comics.map((item, i) => {
              if (i > 9) {
                return;
              }
              return (
                <li key = {item.resourceURI} className="char__comics-item">
                  <a href={item.resourceURI}>{item.name}</a>
                </li>
              );
            })
          : 
          "No comics"}
      </ul>
    </>
  );
};

export default CharInfo;
