import React, { useEffect, useState } from "react";

function Countrysearch() {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");

  const fetchData = async () => {
    try {
      const res = await fetch("https://restcountries.com/v3.1/all");
      const data = await res.json();
      setCountries(data);
    } catch (e) {
      console.error("Error fetching data", e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // useEffect(() => {
  //   fetch(`https://restcountries.com/v3.1/all`)
  //     .then((res) => res.json())
  //     .then((data) => setCountries(data))
  //     .catch((err) => console.log("Error fetching data: ", err));
  // }, []);

  const handleChange = (e) => {
    setSearch(e.target.value);
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
    marginTop: "10px",
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
        onChange={(e) => handleChange(e)}
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
                alt={`Flag of ${country.flags}`}
                style={imageStyle}
              />
              <p>{country.name.common}</p>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Countrysearch;
