export const getLatAndLong = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      let latitude = position.coords.latitude;
      let longitude = position.coords.longitude;
      console.log("Latitude: " + latitude + "| Longitude: " + longitude);
      return "Your Latitude: " + latitude.toFixed(2) + " | Your Longitude: " + longitude.toFixed(2)
    });
  } else {
    console.log("Geolocation is not supported by this browser.");
  }

}