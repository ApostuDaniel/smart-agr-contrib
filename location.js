//Used by the getLocation function, don't call it
const getGeoPosition = (options = {}) => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject, options);
  });
};

//returns an array of two elements representing latitude and longitude, you can verify if it was executed corectly by verifing if
// latitude and longitude are not -1
const getLocation = async (options = {})=>{
  let latitude = -1;
  let longitude = -1;
  //uses geolocation api if user allows it
    try{
      const position = await getGeoPosition(options);
      latitude = position.coords.latitude;
      longitude = position.coords.longitude;
    }
    //gets the location from the ip adress if the user doesn't allow geolocation
    catch(e)
    {
      const unformated = await fetch('https://ipapi.co/json/')
      const formated = await unformated.json()
      latitude = formated["latitude"];
      longitude = formated["longitude"];
    }
    return [latitude, longitude];
}
