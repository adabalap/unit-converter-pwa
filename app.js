// JS logic here

// Unit definitions
const units = {
  length: {
    meter: { name: 'Meter', factor: 1 },
    kilometer: { name: 'Kilometer', factor: 0.001 },
    mile: { name: 'Mile', factor: 0.000621371 }
  },
  temperature: {
    celsius: { name: 'Celsius' },
    fahrenheit: { name: 'Fahrenheit' },
    kelvin: { name: 'Kelvin' }
  }
  // You can expand more units as needed
};

// Populate units in dropdowns
function populateUnits() {
  const type = document.getElementById('conversionType').value;
  const from = document.getElementById('fromUnit');
  const to = document.getElementById('toUnit');
  const options = units[type];

  from.innerHTML = '';
  to.innerHTML = '';
  for (let key in options) {
    const fromOption = document.createElement('option');
    fromOption.value = key;
    fromOption.textContent = options[key].name;
    from.appendChild(fromOption);

    const toOption = document.createElement('option');
    toOption.value = key;
    toOption.textContent = options[key].name;
    to.appendChild(toOption);
  }
  if (from.options.length > 1) to.selectedIndex = 0;
  if (to.options.length > 1) to.selectedIndex = 1;
}

// Auto-populate on change
document.getElementById('conversionType').addEventListener('change', populateUnits);
window.addEventListener('DOMContentLoaded', populateUnits);
