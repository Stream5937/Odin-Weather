//import {siteDataObj} from './index.js'
import {days} from './index.js';

const $ = selector => {  
    console.log(`actioning ${selector}`);                          //code short cut
    return document.querySelector(selector);
  };

//buttons
const deg = $('.deg-btn');
const day1 = $('.pop1');
const day2 = $('.pop2');
const day3 = $('.pop3');
const day4 = $('.pop4');
const day5 = $('.pop5');
const day6 = $('.pop6');
const day7 = $('.pop7');
//data locations
const location = $('.locale');
//main-stats
const temperature = $('.temperature>.main');
const humidity = $('.humidity>.main');
const icon = $('.icon>.main');
const precipitation = $('.precipitation>.main');
const wind = $('.wind>.main');
//minor-stats
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
//popups
//paragraphs
const P1 = $('#p1');
const P2 = $('#p2');
const P3 = $('#p3');
const P4 = $('#p4');
const P5 = $('#p5');
const P6 = $('#p6');
//data row1
const pup_date = $('#p1>span.d_datetime');
//data row2
const pup_cond = $('#p3>span.d_conditions');
//data row3
const pup_desc = $('#p2>span.d_description');
//data row4
const pup_temp = $('#p4>span.d_temp');
const pup_tempmax = $('#p4>span.d_tempmax');
const pup_tempmin = $('#p4>span.d_tempmin');
//data row5
const pup_humidity = $('#p5>span.d_humidity');
const pup_cloud = $('#p5>span.d_cloudcover');
const pup_uv = $('#p5>span.d_uvindex');
//data row6
const pup_wind = $('#p6>span.d_windspeed');
const pup_dir = $('#p6>span.d_winddir');
const pup_gust = $('#p6>span.d_windgusts');


export const conditions = $('.conditions');

//an array of button listeners
export const listeners = [deg,day1,day2,day3,day4,day5,day6,day7];
//an array of main stats data display locations
export const dataBlocks = [location, temperature, humidity, icon, precipitation, wind];
//an array of minor stats data display locations
export const dataMinorBlocks = [temperature,humidity, icon, precipitation, wind];
export const listItems=[[feel, press], [dew, cloud], [rise, set, uv], [precip, prob], [dir, gust]];

export const popupData=[
    pup_date,pup_cond,pup_desc,
    pup_temp, pup_tempmax, pup_tempmin,
    pup_humidity, pup_cloud, pup_uv,
    pup_wind, pup_dir, pup_gust
]

let zone;

export function setZoneListener (zone) {
    console.log(zone);
    zone.onclick = event => {
        //console.log('clicked');
        console.log(event.target); 
        if(event.target.classList.contains('pop1')) {
           actionPopUp(event.target, '1');
          // displayDataDay(1);
        }
        if(event.target.classList.contains('pop2')) {
            actionPopUp(event.target, '2');
           // displayDataDay(2);
         }
         if(event.target.classList.contains('pop3')) {
            actionPopUp(event.target, '3');
            //displayDataDay(3);
         }
         if(event.target.classList.contains('pop4')) {
            actionPopUp(event.target, '4');
           // displayDataDay(4);
         }
         if(event.target.classList.contains('pop5')) {
            actionPopUp(event.target, '5');
           // displayDataDay(5);
         }
         if(event.target.classList.contains('pop6')) {
            actionPopUp(event.target, '6');
            //displayDataDay(6);
         }
         if(event.target.classList.contains('pop7')) {
            actionPopUp(event.target, '7');
           // displayDataDay(7);
         }
    }
}

//listeners.forEach((item) => { setZoneListener(item); });


//transition of popups
/*
var boxOne = document.querySelector('popup');

export function actionPopUp () {
    console.log('at action popup');
    document.getElementsByClassName('pop1').onclick = function() {
        console.log('at  pop1 click');
        if(this.innerHTML === '1') 
        { 
            console.log('at is 1');
            this.innerHTML = 'close';
            boxOne.classList.add('vertTranslate');
        } else {
            console.log('at else');
            this.innerHTML = '1';
            var computedStyle = window.getComputedStyle(boxOne),
                marginBottom = computedStyle.getPropertyValue('margin-bottom');
            boxOne.style.marginBottom = marginBottom;
            boxOne.classList.remove('vertTranslate');    
        }  
    }
}
*/

function actionPopUp ( target, val) {
    var boxOne = document.querySelector('.popup');
    console.log('at action popup');
    console.log(`at ${val} click`);
    if(target.innerHTML === val) 
    { 
        console.log('at '+ val);
        target.innerHTML = 'close';
        boxOne.classList.remove('hidden');
    } else {
        console.log('at else');
        target.innerHTML = val;
        boxOne.classList.add('hidden');    
    }  
    setPopUpData(boxOne, val);
}

/*
           if(event.target.innerHTML === '1') 
            { 
                console.log('at is 1');
                event.target.innerHTML = 'close';
                boxOne.classList.remove('hidden');
               // boxOne.classList.add('vertTranslate');
            } else {
                console.log('at else');
                event.target.innerHTML = '1';
               */ /*
                var computedStyle = window.getComputedStyle(boxOne),
                    marginBottom = computedStyle.getPropertyValue('margin-bottom');
                    
                boxOne.style.marginBottom = marginBottom;
                */ /*
              //  boxOne.classList.remove('vertTranslate'); 
                boxOne.classList.add('hidden');   
            } 
*/

function setPopUpData(target, val) {
    //console.log(`days[val] : ${days[val].datetime}`);
    //console.log(pup_date);
    
    pup_date.textContent= `${days[val].datetime}`;   
    pup_cond.textContent= `${days[val].conditions}`;
    pup_desc.textContent= `${days[val].description}`;
    pup_temp.textContent= `${days[val].temp}`;
    pup_tempmax.textContent= `${days[val].tempmax}`;
    pup_tempmin.textContent= `${days[val].tempmin}`;
    pup_humidity.textContent= `${days[val].humidity}`;
    pup_cloud.textContent= `${days[val].cloudcover}`;
    pup_uv.textContent= `${days[val].uvindex}`;
    pup_wind.textContent= `${days[val].windspeed}`;
    pup_dir.textContent= `${days[val].winddir}`;
    pup_gust.textContent= `${days[val].windgust}`;
}

/*
const pup_date = $('span.datetime');
const pup_cond = $('span.conditions');
const pup_desc = $('span.description');
const pup_temp = $('span.temp');
const pup_tempmax = $('span.tempmax');
const pup_tempmin = $('span.tempmin');
const pup_humidity = $('span.humidity');
const pup_cloud = $('span.cloudcover');
const pup_uv = $('span.uvindex');

const pup_wind = $('span.windspeed');
const pup_dir = $('span.winddir');
const pup_gust = $('span.windgusts');
*/