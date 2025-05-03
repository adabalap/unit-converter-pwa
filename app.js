
const bootsQuotes = [
  "Swiper, no swiping!",
  "Ooh-ooh, ah-ah!",
  "Bananas!",
  "¡Delicioso!",
  "We did it, we did it!",
  "I need my boots!",
  "A star! A star!",
  "Can *you* see the Grumpy Old Troll?",
  "Let's go, vámonos!",
  "Map! Map! Map!",
  "Did *you* see that blue arrow?",
  "Backpack! Backpack!",
  "Yummy, yummy, yummy in my tummy, tummy, tummy!"
];
const units = {
  length: { meter: {name:'Meter',factor:1}, kilometer:{name:'Kilometer',factor:0.001}, mile:{name:'Mile',factor:0.000621371}, inch:{name:'Inch',factor:39.3701} },
  temperature: { celsius:{name:'Celsius'}, fahrenheit:{name:'Fahrenheit'}, kelvin:{name:'Kelvin'} },
  area: { sqm:{name:'Square Meter',factor:1}, sqft:{name:'Square Foot',factor:10.7639}, acre:{name:'Acre',factor:0.000247105} },
  volume: { cubicm:{name:'Cubic Meter',factor:1}, liter:{name:'Liter',factor:1000}, gallon:{name:'Gallon',factor:264.172} },
  mass: { kg:{name:'Kilogram',factor:1}, g:{name:'Gram',factor:1000}, lb:{name:'Pound',factor:2.20462} },
  speed: { mps:{name:'Meter/sec',factor:1}, kph:{name:'Km/hr',factor:3.6}, mph:{name:'Mile/hr',factor:2.23694} },
  time: { second:{name:'Second',factor:1}, minute:{name:'Minute',factor:1/60}, hour:{name:'Hour',factor:1/3600} },
  data: { byte:{name:'Byte',factor:1}, kb:{name:'Kilobyte',factor:0.001}, mb:{name:'Megabyte',factor:0.000001} },
  currency: { usd:{name:'USD',factor:1}, eur:{name:'EUR',factor:0.85} },
  energy: { joule:{name:'Joule',factor:1}, calorie:{name:'Calorie',factor:0.239006} }
};

function populateUnits(){
  const type = document.getElementById('conversionType').value;
  const from = document.getElementById('fromUnit');
  const to = document.getElementById('toUnit');
  from.innerHTML=''; to.innerHTML='';
  for(let key in units[type]){
    const o1=new Option(units[type][key].name,key);
    const o2=new Option(units[type][key].name,key);
    from.add(o1); to.add(o2);
  }
  to.selectedIndex=1;
}

function convert(){
  const type=document.getElementById('conversionType').value;
  const from=document.getElementById('fromUnit').value;
  const to=document.getElementById('toUnit').value;
  const val=parseFloat(document.getElementById('inputValue').value);
  const resArea=document.getElementById('resultArea');
  if(isNaN(val)){resArea.textContent='Enter valid number'; return;}
  let res;
  if(type==='temperature'){ /* same as before simplified */
    const c= from==='celsius'? val : from==='fahrenheit'? (val-32)*5/9 : val-273.15;
    res = to==='celsius'? c : to==='fahrenheit'? (c*9/5+32) : c+273.15;
  } else {
    res = val/units[type][from].factor*units[type][to].factor;
  }
  resArea.textContent=val+' '+units[type][from].name+' = '+res.toFixed(4)+' '+units[type][to].name;
  document.getElementById('bootsRun').classList.add('hidden');
  const cheer= document.getElementById('bootsCheer');
  cheer.classList.remove('hidden');
  setTimeout(()=>{
    cheer.classList.add('hidden');
    document.getElementById('bootsRun').classList.remove('hidden');
  },1500);
}

document.getElementById('conversionType').addEventListener('change',populateUnits);
document.getElementById('convertButton').addEventListener('click',convert);
window.addEventListener('DOMContentLoaded',populateUnits);


function displayQuote() {
  const quoteBox = document.getElementById('quoteBox');
  const randomIndex = Math.floor(Math.random() * bootsQuotes.length);
  quoteBox.textContent = bootsQuotes[randomIndex];
}
