//import {siteDataObj} from './index.js'

const $ = selector => {  
    console.log(`actioning ${selector}`);                          //code short cut
    return document.querySelector(selector);
  };

const deg = $('.deg-btn');
const day1 = $('.pop1');
const day2 = $('.pop2');
const day3 = $('.pop3');
const day4 = $('.pop4');
const day5 = $('.pop5');
const day6 = $('.pop6');
const day7 = $('.pop7');
const location = $('.locale');
console.log('locale is: ' + location);
const temperature = $('.temperature');
const humidity = $('.humidity');
const icon = $('.icon');
const precipitation = $('.precipitation');
const wind = $('.wind');

//an array of button listeners
export const listeners = [deg,day1,day2,day3,day4,day5,day6,day7];
//an array of data display locations
export const dataBlocks = [location, temperature, humidity, icon, precipitation, wind];

let zone;

export function setZoneListener (zone) {
    console.log(zone);
    zone.onclick = event => {
        console.log('clicked');
        console.log(event.target); 
    }
}

//listeners.forEach((item) => { setZoneListener(item); });



