import { useState, useEffect } from "react";
import MarvelService from "../../servises/MarvelService";

import "./randomChar.scss";
import mjolnir from "../../resources/img/mjolnir.png";
import Spinner from "../Spiner/Spiner";
import ErrorMassage from "../errorMassage/errorMassage";

const RandomChar = () => {
  const [heroData, setHeroData] = useState({
    name: "",
    descriotion: "",
    src: "",
    urlWiki: "",
    urlHomePage: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const marvelService = new MarvelService();
  const onError = () => {
    setLoading(false);
    setError(true);
  };

  useEffect(() => {
    updateChar();
  }, []);

  function updateChar() {
    setLoading(true);
    let id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
    marvelService
      .getCharacter(id)
      .then((res) => {
        updateHero(res);
      })
      .catch((err) => {
        onError();
      });
  }

  function updateHero(res) {
    setHeroData(res);
    setLoading(false);
  }

  const errorMassage = error ? <ErrorMassage></ErrorMassage> : null;
  const spiner = loading ? <Spinner></Spinner> : null;
  const content = !(errorMassage || spiner) ? (
    <View {...heroData}></View>
  ) : null;
  return (
    <div className="randomchar">
      {errorMassage}
      {spiner}
      {content}
      <div className="randomchar__static">
        <p className="randomchar__title">
          Random character for today!
          <br />
          Do you want to get to know him better?
        </p>
        <p className="randomchar__title">Or choose another one</p>
        <button onClick={updateChar} className="button button__main">
          <div className="inner">try it</div>
        </button>
        <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
      </div>
    </div>
  );
};

const View = ({ name, descriotion, src, urlWiki, urlHomePage }) => {
  return (
    <div className="randomchar__block">
      <img src={src} alt="Random character" className="randomchar__img" />
      <div className="randomchar__info">
        <p className="randomchar__name">{name}</p>
        <p className="randomchar__descr">{descriotion}</p>
        <div className="randomchar__btns">
          <a href={urlHomePage} className="button button__main">
            <div className="inner">homepage</div>
          </a>
          <a href={urlWiki} className="button button__secondary">
            <div className="inner">Wiki</div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default RandomChar;
