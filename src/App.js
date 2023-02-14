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
import picCloud0 from "./assets/ResA7.png"
import picRain0 from "./assets/ResA8.png"
import picClear0 from "./assets/ResA9.png"
import picSnow0 from "./assets/ResB.png"
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

  // let parser = () => {
  //   const weather = apiValue.weather[0].main;
  //   console.log('parser', value, weather)
  // }

  useEffect(() => {
    if (state && getState) {
      fetch(apiUrl)
        .then((res) => res.json())
        .then((data) => setApiValue(data)); fetch(apiUrl)
          .then((res) => res.json())
          .then((data) => setApiValue(data));
    }

  }, [state, apiUrl]);

  const kelvToFarenheit = (k) => {
    return ((k - 273.15) * 1.8 + 32).toFixed(0);
  };
  const takeInput = (event) => {
    setGetState(event.target.value);
  };

  const handleSubmit = () => {
    setState(getState);
    // parser()
  };


  // console.log(apiValue)


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
              required
            />
          </div>
          <button className="btn btn-primary mt-2" onClick={handleSubmit}>
            Search
          </button>
        </div>
        {apiValue.main && apiValue.main.temp ? (
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
              <div>
                <img src={picHot0} />
                <img src={picHot1} />
                <p className="h2">{kelvToFarenheit(apiValue.main.temp)}° F</p>
                <p><strong>Sky: </strong></p>
                {apiValue.weather[0].main === "Clouds" && <h2><img src={picCloud0} /></h2>}
                {apiValue.weather[0].main === "Rain" && <h2><img src={picRain0} /></h2>}
                {apiValue.weather[0].main === "Clear" && <h2><img src={picClear0} /></h2>}
                {apiValue.weather[0].main === "Snow" && <h2><img src={picSnow0} /></h2>}
              </div>
              : null}

            {value === "Res-B" && kelvToFarenheit(apiValue.main.temp) < 45 ?
              <div><img src={picCold0} /> <img src={picCold1} />  <p className="h2">{kelvToFarenheit(apiValue.main.temp)}° F</p><p><strong>Sky:</strong></p>
                {apiValue.weather[0].main === "Clouds" && <h2><img src={picCloud0} /></h2>}
                {apiValue.weather[0].main === "Rain" && <h2><img src={picRain0} /></h2>}
                {apiValue.weather[0].main === "Clear" && <h2><img src={picClear0} /></h2>}
                {apiValue.weather[0].main === "Snow" && <h2><img src={picSnow0} /></h2>}

              </div>
              : null}

            {value === "Res-C" && kelvToFarenheit(apiValue.main.temp) > 45 ?
              <div><img src={picHot0} />  <p className="h2">{kelvToFarenheit(apiValue.main.temp)}° F</p><p><strong>Sky: {apiValue.weather[0].main}</strong></p>
                {apiValue.weather[0].main === "Clouds" && <h2><img src={picCloud0} /></h2>}
                {apiValue.weather[0].main === "Rain" && <h2><img src={picRain0} /></h2>}
                {apiValue.weather[0].main === "Clear" && <h2><img src={picClear0} /></h2>}
                {apiValue.weather[0].main === "Snow" && <h2><img src={picSnow0} /></h2>}</div>
              : null}

            {value === "Res-C" && kelvToFarenheit(apiValue.main.temp) < 45 ?
              <div><img src={picCold0} />  <p className="h2">{kelvToFarenheit(apiValue.main.temp)}° F</p><p><strong>Sky: {apiValue.weather[0].main}</strong></p>
                {apiValue.weather[0].main === "Clouds" && <h2><img src={picCloud0} /></h2>}
                {apiValue.weather[0].main === "Rain" && <h2><img src={picRain0} /></h2>}
                {apiValue.weather[0].main === "Clear" && <h2><img src={picClear0} /></h2>}
                {apiValue.weather[0].main === "Snow" && <h2><img src={picSnow0} /></h2>}
              </div>
              : null}

            {value === "Res-D" && kelvToFarenheit(apiValue.main.temp) > 45 ?
              <div><p className="h2">{kelvToFarenheit(apiValue.main.temp)}° F</p><p className="h2">Feels Like {kelvToFarenheit(apiValue.main.feels_like)}° F</p><p>Atmosphere: {apiValue.weather[0].main}</p>
               {apiValue.weather[0].main === "Clouds" && <h2><img src={picCloud0} /></h2>}
                {apiValue.weather[0].main === "Rain" && <h2><img src={picRain0} /></h2>}
                {apiValue.weather[0].main === "Clear" && <h2><img src={picClear0} /></h2>}
                {apiValue.weather[0].main === "Snow" && <h2><img src={picSnow0} /></h2>}
              
              <p>Cloudy weather is when the sky is covered with clouds, which are made up of tiny water droplets or ice crystals. Clouds form when warm air rises and cools, causing the water vapor in the air to condense into tiny droplets or ice crystals.

                The amount and type of clouds can help us predict the weather. For example, white, puffy clouds usually mean fair weather, while dark, flat clouds can indicate a storm is coming.

                Different heights and thicknesses of clouds can also give us information about the weather. Low clouds, like stratus clouds, often bring drizzle or light rain. Middle clouds, like altocumulus clouds, can indicate a change in weather, like a storm coming or going. High clouds, like cirrus clouds, are often a sign of fair weather.

                In general, cloudy weather can mean that it is cooler and there is less sunshine, so it's a good idea to dress in layers to stay warm and comfortable.</p></div>
              : null}

            {value === "Res-D" && kelvToFarenheit(apiValue.main.temp) < 45 ?
              <div>  <p className="h2">{kelvToFarenheit(apiValue.main.temp)}° F</p><p className="h2">Feels Like {kelvToFarenheit(apiValue.main.feels_like)}° F</p><p>Atmosphere: {apiValue.weather[0].main}</p>
              
               {apiValue.weather[0].main === "Clouds" && <h2><img src={picCloud0} /></h2>}
                {apiValue.weather[0].main === "Rain" && <h2><img src={picRain0} /></h2>}
                {apiValue.weather[0].main === "Clear" && <h2><img src={picClear0} /></h2>}
                {apiValue.weather[0].main === "Snow" && <h2><img src={picSnow0} /></h2>}
              
              
              <p>Cloudy weather is when the sky is covered with clouds, which are made up of tiny water droplets or ice crystals. Clouds form when warm air rises and cools, causing the water vapor in the air to condense into tiny droplets or ice crystals.

                The amount and type of clouds can help us predict the weather. For example, white, puffy clouds usually mean fair weather, while dark, flat clouds can indicate a storm is coming.

                Different heights and thicknesses of clouds can also give us information about the weather. Low clouds, like stratus clouds, often bring drizzle or light rain. Middle clouds, like altocumulus clouds, can indicate a change in weather, like a storm coming or going. High clouds, like cirrus clouds, are often a sign of fair weather.

                In general, cloudy weather can mean that it is cooler and there is less sunshine, so it's a good idea to dress in layers to stay warm and comfortable.</p></div>
              : null}

          </div>
          {/* Josh Work TODO ***********************************************************************/}
          {apiValue.main && state ? (
            <div className="card-body text-center">




              <p className="h5">
                <i className="fas fa-map-marker-alt"></i>{" "}
                <strong>{apiValue.name},</strong>{" "}
                {countries.getName(apiValue.sys.country, "en", {
                  select: "official",
                })}
              </p>

            </div>
          ) : (
            <h1>Please Enter A Valid City</h1>
          )}
        </div>
        ) : <h1 className="card-body text-center mt-4">Please Enter A Valid City</h1>}
      </div>
      
    </div>
    
  );
}

export default App;
