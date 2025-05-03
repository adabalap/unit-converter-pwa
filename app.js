

const bootsQuotes = [
  "¡Vámonos! Let's convert!",
  "We did it, we did it!",
  "Yummy, yummy in my tummy!",
  "Swiper, no swiping!",
  "I need my boots!",
  "A star! A star!"
];

function displayRandomQuote() {
  const idx = Math.floor(Math.random() * bootsQuotes.length);
  const qb = document.getElementById('quoteBox');
  const qt = document.getElementById('quoteText');
  qt.textContent = bootsQuotes[idx];
  qb.classList.remove('hidden');
  setTimeout(() => qb.classList.add('hidden'), 3000);
}
const units = {
  length: {
    meter: { name: 'Meter', factor: 1 },
    kilometer: { name: 'Kilometer', factor: 0.001 },
    mile: { name: 'Mile', factor: 0.000621371 },
    inch: { name: 'Inch', factor: 39.3701 }
  },
  temperature: {
    celsius: { name: 'Celsius' },
    fahrenheit: { name: 'Fahrenheit' },
    kelvin: { name: 'Kelvin' }
  },
  time: {
    second: { name: 'Second', factor: 1 },
    minute: { name: 'Minute', factor: 1 / 60 },
    hour: { name: 'Hour', factor: 1 / 3600 }
  },
  mass: {
    kilogram: { name: 'Kilogram', factor: 1 },
    gram: { name: 'Gram', factor: 1000 },
    pound: { name: 'Pound', factor: 2.20462 },
    ounce: { name: 'Ounce', factor: 35.274 }
  },
  volume: {
    cubicmeter: { name: 'Cubic Meter', factor: 1 },
    liter: { name: 'Liter', factor: 1000 },
    milliliter: { name: 'Milliliter', factor: 1000000 },
    gallon: { name: 'Gallon', factor: 264.172 }
  }
};

function populateUnits() {
  const type = document.getElementById('conversionType').value;
  const from = document.getElementById('fromUnit');
  const to = document.getElementById('toUnit');
  const options = units[type];

  from.innerHTML = '';
  to.innerHTML = '';
  for (let key in options) {
    const fromOption = document.createElement('option');
    const toOption = document.createElement('option');
    fromOption.value = toOption.value = key;
    fromOption.textContent = toOption.textContent = options[key].name;
    from.appendChild(fromOption);
    to.appendChild(toOption);
  }
  to.selectedIndex = 1;
}

function convert() {
  const type = document.getElementById('conversionType').value;
  const from = document.getElementById('fromUnit').value;
  const to = document.getElementById('toUnit').value;
  const value = parseFloat(document.getElementById('inputValue').value);
  const resultArea = document.getElementById('resultArea');

  if (isNaN(value)) {
    resultArea.textContent = 'Please enter a valid number.';
    return;
  }

  let result;
  if (type === 'temperature') {
    if (from === 'celsius') result = to === 'fahrenheit' ? value * 9/5 + 32 : to === 'kelvin' ? value + 273.15 : value;
    else if (from === 'fahrenheit') result = to === 'celsius' ? (value - 32) * 5/9 : to === 'kelvin' ? (value - 32) * 5/9 + 273.15 : value;
    else if (from === 'kelvin') result = to === 'celsius' ? value - 273.15 : to === 'fahrenheit' ? (value - 273.15) * 9/5 + 32 : value;
  } else {
    result = value / units[type][from].factor * units[type][to].factor;
  }

  resultArea.textContent = `${value} ${units[type][from].name} = ${result.toFixed(4)} ${units[type][to].name}`;
  animateBoots();
  displayRandomQuote();
}

function animateBoots() {
  const bootsRun = document.getElementById('bootsRun');
  const bootsCheer = document.getElementById('bootsCheer');
  bootsCheer.classList.remove('opacity-0');
  setTimeout(() => {
    bootsCheer.classList.add('opacity-0');
  }, 1500);
}

function toggleAbout() {
  const modal = document.getElementById('aboutModal');
  modal.classList.toggle('hidden');
  modal.classList.toggle('flex');
}

document.getElementById('conversionType').addEventListener('change', populateUnits);
document.getElementById('convertButton').addEventListener('click', convert);
window.addEventListener('DOMContentLoaded', populateUnits);
