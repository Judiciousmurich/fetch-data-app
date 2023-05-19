
import { useState } from "react"
import { useEffect } from "react";
import './App.css'
function SearchPanel() {
  
  const [searchParam, setSearchParam] = useState(""); 
  const [universities, setUniversities] = useState([]);
  function fetchUniversities(country) {
    fetch(`http://universities.hipolabs.com/search?country=${country}`)
      .then((response) => response.json())
      .then((data) => setUniversities(data))
      .catch((error) => console.error(error));
  }

  function resetSearch() {
    setSearchParam("");
  }
  useEffect(() => {
    fetchUniversities(searchParam);
  }, [searchParam]);

  return (
    <div className="search-panel">
      <h1 className="description">Search for universities by country</h1>
      <div className="input-btn">
      <input
        type="text"
        placeholder="Enter a country name"
        value={searchParam}
        onChange={(event) => setSearchParam(event.target.value)}
      />
      <button onClick={resetSearch}>Reset</button>

      </div>
      <h1>Universities in countries are:{universities.length}</h1>
      <ul>
        {universities.map((university) => (
          <li className="list" key={university.name}>
            <a href={university.web_pages[0]} target="_blank" rel="noreferrer">
              {university.name}

            </a>
            <p>Domains:{university.domains[0]}</p>
            <p>Website: <a href="">{university.web_pages[0]}</a></p>
            <p>Country:{university.country}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SearchPanel;