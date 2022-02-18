class MarvelService {
  _apiBase = "https://gateway.marvel.com:443/v1/public/";
  _apiKey = "apikey=c34d593f4005b82aff94e4267c6c8d6f";
  _baseOffset = 210;

  getResource = async (url) => {
    let res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }

    return await res.json();
  };

  getAllCharacters = async (baseOffset = 210) => {
    const res = await this.getResource(
      `${this._apiBase}characters?limit=9&offset=${baseOffset}&${this._apiKey}`
    );

    return await res.data.results.map((hero) => this._transformCaracter(hero));
  };

  getCharacter = async (id) => {
    const res = await this.getResource(
      `${this._apiBase}characters/${id}?${this._apiKey}`
    );
    return this._transformCaracter(res.data.results[0]);
  };

  _transformCaracter = (data) => {
    return {
      id: data.id,
      name: data.name,
      descriotion: data.description ? `${data.description.slice(0, 200)}...` : "No description",
      src: `${data.thumbnail.path}.${data.thumbnail.extension}`,
      urlHomePage: data.urls[0].url,
      urlWiki: data.urls[1].url,
      comics: data.comics.items
    };
  };
}

export default MarvelService;
