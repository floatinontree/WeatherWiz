import { useState, useEffect } from "react";
import "./App.css";
import countries from "i18n-iso-countries";
import apiKey from "./s";
import axios from "axios";
import picHot0 from "./assets/ResA.png"
import picHot1 from "./assets/ResA3.png"
import picHot2 from "./assets/ResA4.png"
import picCold0 from "./assets/ResA2.png"
import picCold1 from "./assets/ResA5.png"
import picCold2 from "./assets/ResA6.png"

countries.registerLocale(require("i18n-iso-countries/langs/en.json"));

function App() {
  const [apiValue, setApiValue] = useState({});
  const [getState, setGetState] = useState("Dallas");
  const [state, setState] = useState("Dallas");
  const [value, setValue] = useState();
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${state}&appid=${apiKey}`;

  let getResponse = async (ageGroup) => {
    try {
      let response = await axios.get(`http://localhost:3001/api/ageGroup/${ageGroup}`);
      let value = Object.values(response.data)[0];
      setValue(value)
    } catch (error) {
      console.error(error);
    }
  };

  let parser = () => {
    const weather = apiValue.weather[0].main;
    console.log('parser', value, weather)
  }

  useEffect(() => {
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => setApiValue(data));
  }, [state, apiUrl]);

  const kelvToFarenheit = (k) => {
    return ((k - 273.15) * 1.8 + 32).toFixed(0);
  };
  const takeInput = (event) => {
    setGetState(event.target.value);
  };

  const handleSubmit = () => {
    setState(getState);
    parser()
  };


console.log(apiValue)


  return (
    <div className="App">
      <header className="d-flex justify-content-center align-items-center">
        <h2>Weather Wiz</h2>
      </header>
      <div className="d-flex justify-content-center">
        <form className="form-group border p-3 rounded">
          <legend className="text-center font-weight-bold">Choose your age group:</legend>
          <div className="form-check">
            <input
              type="radio"
              name="ageGroup"
              value="agegroupone"
              className="form-check-input"
              onChange={(e) => getResponse(e.target.value)}
            />
            <label className="form-check-label font-weight-bold">Under 4</label>
          </div>
          <div className="form-check">
            <input
              type="radio"
              name="ageGroup"
              value="agegrouptwo"
              className="form-check-input"
              onChange={(e) => getResponse(e.target.value)}
            />
            <label className="form-check-label font-weight-bold">5 to 8</label>
          </div>
          <div className="form-check">
            <input
              type="radio"
              name="ageGroup"
              value="agegroupthree"
              className="form-check-input"
              onChange={(e) => getResponse(e.target.value)}
            />
            <label className="form-check-label font-weight-bold">9 to 12</label>
          </div>
          <div className="form-check">
            <input
              type="radio"
              name="ageGroup"
              value="agegroupfour"
              className="form-check-input"
              onChange={(e) => getResponse(e.target.value)}
            />
            <label className="form-check-label font-weight-bold">Over 13</label>
          </div>
        </form>
      </div>


      <div className="container">
        <div className="mt-3 d-flex flex-column justify-content-center align-items-center">
          <div className="form-group">
            <label htmlFor="location-name" className="col-form-label">
              Enter City:
            </label>
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

        {/* Josh Work TODO *******************************************************************/}
          <div>
            {value === "Res-A" && kelvToFarenheit(apiValue.main.temp) > 45 ? 
            <div><img src={picHot0} /> <img src={picHot1} /><img src={picHot2} /> </div> 
            : null}

            {value === "Res-A" && kelvToFarenheit(apiValue.main.temp) < 45 ? 
            <div><img src={picCold0} /> <img src={picCold1} /><img src={picCold2} /></div> 
            : null}

          {value === "Res-B" && kelvToFarenheit(apiValue.main.temp) > 45 ? 
            <div><img src={picHot0} /> <img src={picHot1} />  <p className="h2">{kelvToFarenheit(apiValue.main.temp)}° F</p></div> 
            : null}

          {value === "Res-B" && kelvToFarenheit(apiValue.main.temp) < 45 ? 
            <div><img src={picCold0} /> <img src={picCold1} />  <p className="h2">{kelvToFarenheit(apiValue.main.temp)}° F</p></div> 
            : null}



          </div>
      {/* Josh Work TODO ***********************************************************************/}
        <h1>-----------------------</h1>
          {apiValue.main ? (
            <div className="card-body text-center">
              <h1 className="mt-3" >{value}</h1>


              <p className="h2">{kelvToFarenheit(apiValue.main.temp)}° F</p>

              <p className="h5">
                <i className="fas fa-map-marker-alt"></i>{" "}
                <strong>{apiValue.name},</strong>{" "}
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
                    <strong>Sky: {apiValue.weather[0].main} </strong>
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <h1>Please Enter A Valid City</h1>
          )}
        </div>
      </div>

      <footer className="footer">Footer area</footer>
    </div>
  );
}

export default App;


           {/* <img
                src={`http://openweathermap.org/img/w/${apiValue.weather[0].icon}.png`}
                alt="weather status icon"
                className="weather-icon"
              /> */}
