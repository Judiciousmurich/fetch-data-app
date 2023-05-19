


import { useState } from "react";
import { useEffect } from "react";
import "./App.css";

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
  

  
  function handleSearch() {
    
    if (searchParam) {
    
      fetchUniversities(searchParam);
    }
  }

  useEffect(() => {
    fetchUniversities(searchParam);
  }, [searchParam]);
  

  return (
    <>
      <div className="input-btn">
        <h1 className="description desc1">
          {" "}
          <span className="first-letter">s</span>earch for{" "}
          <span className="first-letter">u</span>niversities by{" "}
          <span className="first-letter">c</span>ountry
        </h1>
        <input
          type="text"
          placeholder="Enter a country name"
          value={searchParam}
          onChange={(event) => setSearchParam(event.target.value)}
        />
        
        <button onClick={handleSearch} >
          Search
        </button>
        <button onClick={resetSearch}>Reset</button>
        
        <h1 className="description desc2">
          Number of universities:{universities.length}
        </h1>
      </div>

      <div className="search-panel">
        <ul>
          {universities.map((university) => (
            <li className="list" key={university.name}>
              <a
                href={university.web_pages[0]}
                target="_blank"
                rel="noreferrer"
              ></a>
              <p>School :{university.name}</p>
              <p>Domains :{university.domains[0]}</p>
              <p>
                Website :{" "}
                <a href="">{university.web_pages[0]}</a>
              </p>
              <p>Country:{university.country}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default SearchPanel;
