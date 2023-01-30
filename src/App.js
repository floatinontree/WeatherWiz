import { useState, useEffect } from "react";
import "./App.css";

import countries from "i18n-iso-countries";
import apiKey from "./s";
import axios from "axios";

countries.registerLocale(require("i18n-iso-countries/langs/en.json"));
let hitServer = async () => {
  let res = await axios.post("http://localhost:3001/api/postAThing", "stringdatafromclient", {headers: {"Content-type": "text/plain"}})
  console.log(res)
}

function App() {
  // State
  const [apiValue, setApiValue] = useState({});
  const [getState, setGetState] = useState("Dallas");
  const [state, setState] = useState("Dallas");

  // API URL

  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${state}&appid=${apiKey}`;

  // Side effect
  useEffect(() => {
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => setApiValue(data));
  }, [apiUrl]);

  const kelvToFarenheit = (k) => {
    return ((k - 273.15) * 1.8 + 32).toFixed(0);
  };
  const takeInput = (event) => {
    setGetState(event.target.value);
  };

  const handleSubmit = () => {
    setState(getState);
  };

  console.log(apiValue)

  return (
    <div className="App">
      <header className="d-flex justify-content-center align-items-center">
        <h2>Weather Wiz</h2>
      </header>
      <div className="container">
        <div className="mt-3 d-flex flex-column justify-content-center align-items-center">
          <div className="col-auto">
            <label htmlFor="location-name" className="col-form-label">
              Enter City :
            </label>
          </div>
          <div className="col-auto">
            <input
              type="text"
              id="location-name"
              className="form-control"
              onChange={takeInput}
              value={getState}
            />
          </div>
          <button className="btn btn-primary mt-2" onClick={handleSubmit}>
            Search
          </button>
        </div>

        <div className="card mt-3 mx-auto" style={{ width: "60vw" }}>
          {apiValue.main ? (
            <div className="card-body text-center">
              <img
                src={`http://openweathermap.org/img/w/${apiValue.weather[0].icon}.png`}
                alt="weather status icon"
                className="weather-icon"
              />

              <p className="h2">{kelvToFarenheit(apiValue.main.temp)}&deg; F</p>

              <p className="h5">
                <i className="fas fa-map-marker-alt"></i>{" "}
                <strong>{apiValue.name},</strong>{" "}
              </p>
              <p>
                {" "}
                {countries.getName(apiValue.sys.country, "en", {
                  select: "official",
                })}
              </p>

              <div className="row mt-4">
                <div className="col-md-6">
                  <p>
                    <i className="fas fa-temperature-low "></i>{" "}
                    <strong>
                      {kelvToFarenheit(apiValue.main.temp_min)}&deg; F
                    </strong>
                  </p>
                  <p>
                    <i className="fas fa-temperature-high"></i>{" "}
                    <strong>
                      {kelvToFarenheit(apiValue.main.temp_max)}&deg; F
                    </strong>
                  </p>
                </div>
                <div className="col-md-6">
                  <p>
                    {" "}
                    <strong>Sky: {apiValue.weather[0].main} </strong>
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <h1>Please Enter A valid city</h1>
          )}
        </div>
      </div>
      <br/>
      <button onClick={hitServer}>
          Post to Server
        </button>
      <footer className="footer">TODO</footer>
    </div>
  );
}

export default App;
