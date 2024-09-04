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
    const dateStart = new Date();         //to get start time
    const t_start = dateStart.getTime();  //record start of fetch action
    let dateFinish = null;      //to get finish time
    let t_finish = null;        //record finish of fetch action
    let t_taken = null ;        //to calculate timing of fetch operation in milliseconds
    fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${query}?key=SHSBBCG24LZCJNG5DWNL5ZFP2`, 
      {mode: 'cors'}
    )
      
      .then(function(response) {
        dateFinish = new Date();    //for end time of fetch operation
        return response.json();
        //return response;
     })
     .then(function(response){
         if(response.data !== {}){
          console.log('body data present');
          console.log(response);
          console.log(response.currentConditions);

          t_finish = dateFinish.getTime();  //record end time of fetch operation -success
          return(response);
        }
         else{
          noData = true;
          console.log('empty response body');
          t_finish= getTime();  //record end time of fetch operation -fail
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
          t_taken = t_finish - t_start;   //duration of fetch operation in milliseconds
          console.log(`fetch data took ${t_taken} milliseconds`);
     })
         /* */
     .catch(e=> {
         console.log(e);
     });
}

function setDisplayData (data) {

  /* test 
  const birthday = new Date(1725346200);
  console.log(birthday);
  const date1 = birthday.getDate();
  console.log(date1);
  // Expected output: 19
  /* end of test */



  console.log(`data : ${data}`);
  //location
  siteDataObj.location= data.resolvedAddress;
  //date
  const dateNow = new Date();
  console.log(dateNow);
  //current conditions
  siteDataObj.CurrentConditions = data.currentConditions.conditions;

  console.log(siteDataObj);
}