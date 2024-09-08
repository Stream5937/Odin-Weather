import "./style.css";
import {listeners, setZoneListener, dataBlocks} from './domFunctions.js';
import {listItems, conditions, actionPopUp, popupData , units} from './domFunctions.js';

//an array of dataItem names to correspond with the dataBlock display locations
const dataNames = ['location', 'temperature', 'humidity', 'icon', 'precipitation', 'wind', 'currentConditions'];
const prefix_main = [
  "Forecast for: ",
  "",
  "", 
  "",
  "",
  "",
  'Current conditions: '
]
export const days =[{},{},{},{},{},{},{},{}];   //data objects to cover next 7 days

//console.log('at ./index.js');
//console.log('locale' + dataBlocks[0]);
//console.log('at ./index.js');
export let lastQuery = 'Nailsea';   // a default value
let siteDataObj= {};
let t_taken = null ;        //to calculate timing of fetch operation in milliseconds

//const US = 'unitGroup=us';    //retrieve data using US units deg F and miles  - default
//const UK = 'unitGroup=uk';    //retrieve data using UK units deg C and miles
//const units= [US,UK];
//let unitGroup = units[0];   //initial default
/* not implemented for this exercise
let ME = 'unitGroup=metric' //retrieve data using metric units deg C and kilometers  
*/

listeners.forEach((item) => {
  setZoneListener(item);
});

const search = document.getElementById("search");
let debounceTimer;

const debounce = (callback, time) => {
  window.clearTimeout(debounceTimer);
  debounceTimer = window.setTimeout(callback, time);
};

search.addEventListener(
  "input",
  (event) => {
    const query = event.target.value;
    debounce(() => handleSearchPosts(query), 800);
  },
  false
);

function handleSearchPosts(query){
   // console.log(`${query}`);
    lastQuery = query;
    getData(query);
}

/*  using visual crossing account for weather data
      public account key:
      SHSBBCG24LZCJNG5DWNL5ZFP2

    typical usage
    https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Nailsea?key=SHSBBCG24LZCJNG5DWNL5ZFP2

    NB the use of {mode : 'cors'} used to fix issues in the context of
        Cross Origin Resource Sharing (CORS)

    example query  for New York including unit group -> here 'unitGroup=us' but could be metric or uk
    https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/New%20York%20City%2CNY?unitGroup=us&key=YOUR_API_KEY
*/

export function getData (query) {
    console.log(`at getData: ${query}`);
    lastQuery = query;
    let noData = false;
    let dataResult = null;
   // console.log(`lastQuery: ${lastQuery}`);
    const dateStart = new Date();         //to get start time
    const t_start = dateStart.getTime();  //record start of fetch action
    let dateFinish = null;      //to get finish time
    let t_finish = null;        //record finish of fetch action
    //let t_taken = null ;        //to calculate timing of fetch operation in milliseconds
    //t_taken now global
    let fetchString = ``;

/*
    fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${query}?unitGroup=uk&key=SHSBBCG24LZCJNG5DWNL5ZFP2`, 
      {mode: 'cors'}
    )
*/

    switch (units) {
      case 'us': {
        fetchString =
          `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${query}?unitGroup=us&key=SHSBBCG24LZCJNG5DWNL5ZFP2`; 
        break;
      }

      default:
      case 'uk': {
        fetchString = 
          `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${query}?unitGroup=uk&key=SHSBBCG24LZCJNG5DWNL5ZFP2`;
        break;
      }
    }
    //console.log('fs: ' + fetchString);

    fetch(
      fetchString, {mode: 'cors'}
    )

      .then(function(response) {
        dateFinish = new Date();    //for end time of fetch operation
        return response.json();
     })
     .then(function(response){
         if(response.data !== {}){
          console.log('body data present');
        //  console.log(response);
        //  console.log(response.currentConditions);

          t_finish = dateFinish.getTime();  //record end time of fetch operation -success
          return(response);
        }
         else{
          noData = true;
          console.log('empty response body');
          t_finish= getTime();  //record end time of fetch operation -fail
        } 
     })
     .then(function(response){
          t_taken = t_finish - t_start;   //duration of fetch operation in milliseconds
         // console.log(`fetch data took ${t_taken} milliseconds`);
          setDisplayDataObj(response);
          return(response);
     })
     .then(function(response){
          setDaysDataArray(response);
     })
     .catch(e=> {
         console.log(e);
     });
}

function setDisplayDataObj (data) {

  console.log(`data : ${data}`);
  //location
  siteDataObj.location= data.resolvedAddress;
  //console.log(siteDataObj.location);
  //date
  const dateNow = new Date();
 // console.log(dateNow);
  //Main-stats
  //temperature
  siteDataObj.temperature = data.currentConditions.temp;
  //humidity
  siteDataObj.humidity = data.currentConditions.humidity;
  //icon
  siteDataObj.icon = ""; //data.currentConditions.icon;
  //precipitation
  siteDataObj.precipitation=data.currentConditions.precip;
  //wind
  siteDataObj.wind=data.currentConditions.windspeed;
  //current conditions
  siteDataObj.currentConditions = data.currentConditions.conditions;

  //minor-stats
  siteDataObj.cloudCover = data.currentConditions.cloudcover;
  siteDataObj.dewPoint = data.currentConditions.dew;
  siteDataObj.feelsLike = data.currentConditions.feelslike;
  siteDataObj.precipitationProbability = data.currentConditions.precipprob;
  siteDataObj.precipitationType = data.currentConditions.preciptype;
  if(siteDataObj.precipitationType === null){siteDataObj.precipitationType='none';}
  siteDataObj.airPressure = data.currentConditions.pressure;
  siteDataObj.sunrise = data.currentConditions.sunrise;
  siteDataObj.sunset = data.currentConditions.sunset;
  siteDataObj.tempMin  = data.currentConditions.tempmin;
  siteDataObj.tempMax  = data.currentConditions.tempmax;
  siteDataObj.direction = data.currentConditions.winddir;
  siteDataObj.gust  = data.currentConditions.windgust;
  siteDataObj.uv  = data.currentConditions.uvindex;
  
 // console.log(siteDataObj);
  let value;

  dataBlocks.forEach((item, index) => {
    value = dataNames[index];
    console.log(value);
    if(index === 0){
      item.textContent = prefix_main[index] + siteDataObj[value] + ` (in ${t_taken} ms)`;} 
    else {
      item.textContent= prefix_main[index] + siteDataObj[value];
    }
  });

  conditions.textContent = 'Current conditions: ' + siteDataObj.currentConditions;

  //where imported 
  //listItems=[[feel, press], [dew, cloud], [rise, set, uv], [precip, prob], [dir, gust]];

  //console.log(listItems[0][0]);
  //console.log(listItems[0][1]);

  listItems[0][0].textContent = siteDataObj.feelsLike;
  listItems[0][1].textContent = siteDataObj.airPressure;
  listItems[1][0].textContent = siteDataObj.dewPoint;
  listItems[1][1].textContent = siteDataObj.cloudCover;
  listItems[2][0].textContent = siteDataObj.sunrise;
  listItems[2][1].textContent = siteDataObj.sunset;
  listItems[2][2].textContent = siteDataObj.uv;
  listItems[3][0].textContent = siteDataObj.precipitationType;
  listItems[3][1].textContent = siteDataObj.precipitationProbability;
  listItems[4][0].textContent = siteDataObj.direction;
  listItems[4][1].textContent = siteDataObj.gust;

}


function setDaysDataArray(data){
 // console.log(`data: ${data}`);
  const nextDays = data.days;
  //console.log(`nextDays  ${nextDays}`);
  nextDays.forEach((item, index, array) => {
    console.log(index);
    if(index < 8){
      //console.log(item);
      days[index] = item;
     // console.log(index);
      console.log(days[index]);
    }
  });
}


