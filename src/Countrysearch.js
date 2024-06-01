import React, { useEffect, useState } from "react";

function Countrysearch() {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await fetch("https://restcountries.com/v3.1/all");
      const data = await res.json();
      setCountries(data);
    } catch (e) {
      alert("Error fetching data");
    }
  };

  const containerStyle = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  };

  const imageStyle = {
    width: "100px",
    height: "100px",
  };

  const cardStyle = {
    width: "200px",
    margin: "10px",
    padding: "10px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    border: "1px solid #eee",
    borderRadius: "10px",
  };

  const searchStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };

  const searchBox = {
    width: "800px",
    height: "30px",
  };

  return (
    <div style={searchStyle}>
      <input
        type="text"
        placeholder="Search country..."
        style={searchBox}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div style={containerStyle}>
        {countries
          .filter((country) =>
            country.name.common.toLowerCase().includes(search.toLowerCase())
          )
          .map((country) => (
            <div key={country.cca3} style={cardStyle}>
              <img
                src={country.flags.png}
                alt={`Flag of ${country.name.common}`}
                style={imageStyle}
              />
              <h2>{country.name.common}</h2>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Countrysearch;
