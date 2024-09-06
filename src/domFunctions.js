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
const feel = $('#feel2');
const press = $('#press2');
const dew = $('#dew2');
const cloud = $('#cloud2');
const rise = $('#rise2');
const set = $('#set2');
const uv = $('#uv2');
const precip = $('#precip2');
const prob = $('#prob2');
const dir = $('#dir2');
const gust = $('#gust2');

//an array of button listeners
export const listeners = [deg,day1,day2,day3,day4,day5,day6,day7];
//an array of main stats data display locations
export const dataBlocks = [location, temperature, humidity, icon, precipitation, wind];
//an array of minor stats data display locations
export const dataMinorBlocks = [temperature,humidity, icon, precipitation, wind];
export const listItems=[[feel, press], [dew, cloud], [rise, set, uv], [precip, prob], [dir, gust]];

let zone;

export function setZoneListener (zone) {
    console.log(zone);
    zone.onclick = event => {
        console.log('clicked');
        console.log(event.target); 
    }
}

//listeners.forEach((item) => { setZoneListener(item); });



