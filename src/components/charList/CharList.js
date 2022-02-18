import { useState, useEffect } from "react";

import "./charList.scss";
import MarvelService from "../../servises/MarvelService";
import Spinner from "../Spiner/Spiner";
import ErrorMassage from "../errorMassage/errorMassage";

const CharList = ({ editId }) => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [offset, setOffset] = useState(210);

  const marvelService = new MarvelService();

  function didMount() {
    setLoading(true);

    marvelService
      .getAllCharacters(offset)
      .then((res) => onCharListLoaded(res))
      .catch(onError);
  }

  useEffect(() => {
    didMount();
  }, []);

  function onCharListLoaded(res) {
    const chars = res.map((item) => {
      return (
        <li
          onClick={() => {
            editId(item.id);
          }}
          key={item.id}
          className="char__item"
        >
          <img src={item.src} alt={item.src} />
          <div className="char__name">{`${item.name.slice(0, 27)}...`}</div>
        </li>
      );
    });

    setItems([...items, chars]);
    setLoading(false);
  }

  function onError() {
    setLoading(false);
    setError(true);
  }

  function addNewCharList() {
    console.log(offset);
    setOffset((prev) => prev + 9);
    didMount();
  }

  const errorMassage = error ? <ErrorMassage /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(errorMassage || spinner) || items ? items : null;

  return (
    <div className="char__list">
      <ul className="char__grid">
        {content}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        ></div>
        {spinner}
        {errorMassage}
      </ul>

      <button
        onClick={() => addNewCharList()}
        className="button button__main button__long"
      >
        <div className="inner">load more</div>
      </button>
    </div>
  );
};

export default CharList;
