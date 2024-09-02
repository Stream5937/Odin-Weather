import "./style.css";
console.log('at ./index.js');
let lastQuery = 'Nailsea';   // a default value
let siteDataObj= {};

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
    debounce(() => handleSearchPosts(query), 500);
  },
  false
);

function handleSearchPosts(query){
    console.log(`${query}`);
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
*/

function getData (query) {
    console.log(`at getData: ${query}`);
    lastQuery = query;
    let noData = false;
    let dataResult = null;
    console.log(`lastQuery: ${lastQuery}`);
    fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${query}?key=SHSBBCG24LZCJNG5DWNL5ZFP2`, 
      {mode: 'cors'}
    )
      .then(function(response) {return response.json();
        //return response;
     })
     .then(function(response){
         if(response.data !== {}){
          console.log('body data present');
          console.log(response);
          console.log(response.currentConditions);
          return(response);
        }
         else{
          noData = true;
          console.log('empty response body');
        } 
     })
     /**/ 
     .then(function(response){
      /*
          console.log('------------');
          console.log(response);
          console.log('------------');
          dataResult = response;
          console.log('dataResult: ' + dataResult);
          setDisplayData(dataResult);
      */
          setDisplayData(response);
     })
         /* */
     .catch(e=> {
         console.log(e);
     });
}

function setDisplayData (data) {
  console.log(`data : ${data}`);
  //location
  siteDataObj.location= data.resolvedAddress;
  //dateEpoch = 
  siteDataObj.CurrentConditions = data.currentConditions.conditions;

  console.log(siteDataObj);
}