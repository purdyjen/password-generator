// Element Selectors
const genBtn = document.getElementById("genBtn");
const newPw = document.getElementById("newPw");
const copyPw = document.getElementById("copyPw");
const lengthEl = document.getElementById("length");
const uppercaseEl = document.getElementById("uppercase");
const lowercaseEl = document.getElementById("lowercase");
const numbersEl = document.getElementById("numbers");
const symbolsEl = document.getElementById("symbols");
const symbolRadiosEl = document.getElementById("symbolRadios");
const omitOptionEl = document.getElementById("omitOption");
const omitSymbolsEl = document.getElementById("omitSymbols");
const includeOptionEl = document.getElementById("includeOption");
const includeSymbolsEl = document.getElementById("includeSymbols");
const incSymb = document.getElementById("incSymb");
const omitSymb = document.getElementById("omitSymb");
// If option to include symbols is checked, display option to specify which symbols to omit
symbolsEl.addEventListener("click", function handleClick() {
  if (symbolsEl.checked) {
    symbolRadiosEl.style.display = "block";
  } else {
    symbolRadiosEl.style.display = "none";
    includeOptionEl.style.display = "none";
    omitOptionEl.style.display = "none";
    incSymb.checked = false;
    omitSymb.checked = false;
    omitSymbolsEl.value = '';
    includeSymbolsEl.value = '';
  }
});

symbolRadiosEl.addEventListener("click", function handleClick() {
  if (incSymb.checked) {
    includeOptionEl.style.display = "block";
    omitOptionEl.style.display = "none";
  } else if (omitSymb.checked) {
    omitOptionEl.style.display = "block";
    includeOptionEl.style.display = "none";
  } else {
    includeOptionEl.style.display = "none";
    omitOptionEl.style.display = "none";
  }
});

const filterSymbols = () => {
  // Grab value from Omit Symbols text field
  const omitSymbols = omitSymbolsEl.value;
  const includeSymbols = includeSymbolsEl.value;
  // Set the starting value for symbolString
  let symbolString = `~\`!@#$%^&*()_-+={[}]|:;"'<,>.?/`;

  // Split symbolString into array symbolArr
  const symbolArr = symbolString.split("");
  // Split omitSymbols string into array omitArr
  const omitArr = omitSymbols.split("");

  // If the length of omitArr is greater than 0 (i.e., not an empty array), run this code
  if (omitArr.length > 0) {
    // compare omitArr[i] with symbolArr[k]
    // Because this is filtering out unwanted symbols, it is necessary for symbolArr to be the inner loop as its value will be changed every time a match is found
    for (let i = 0; i < omitArr.length; i++) {
      for (let k = 0; k < symbolArr.length; k++) {
        // if match, splice symbolArr at k
        if (omitArr[i] === symbolArr[k]) {
          symbolArr.splice(k, 1);
        }
      }
    }
    // After filter is complete, convert symbolArr back into a string
    symbolString = symbolArr.join("");
    return symbolString;
  } else if (includeSymbols.length > 0) {
    symbolString = includeSymbols;
    return symbolString;
  } else {
    // If the length of omitArr is not greater than 1 (i.e., an empty array), then no filter is necessary
    return symbolString;
  }
};

// Function to generate a random number between two numbers with min being inclusive and max being exclusive
const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
};

const buildArray = () => {
  // Grab the checked values for customization options
  const hasUpper = uppercaseEl.checked;
  const hasLower = lowercaseEl.checked;
  const hasNumber = numbersEl.checked;
  const hasSymbol = symbolsEl.checked;

  // Uppercase, Lowercase, and Number Strings
  const upperString = `ABCDEFGHIJKLMNOPQRSTUVWXYZ`;
  const lowerString = `abcdefghijklmnopqrstuvwxyz`;
  const numberString = `1234567890`;

  // Build string of possible characters to use in generating the password
  // Initially, set to an empty string
  let charStr = "";

  // If hasUpper is true, then add upperString to charStr
  if (hasUpper) {
    charStr += upperString;
  }

  // If hasLower is true, then add lowerString to charStr
  if (hasLower) {
    charStr += lowerString;
  }

  // If hasNumber is true, then add numberString to charStr
  if (hasNumber) {
    charStr += numberString;
  }

  // If hasSymbol is true, then build symbolString and add to charStr
  if (hasSymbol) {
    // Build Symbol String
    const symString = filterSymbols();
    charStr += symString;
  }

  // Convert charStr to array
  const charArr = charStr.split("");
  // Return final character array that will be used by the generatePassword function
  return charArr;
};

const generatePassword = () => {
  // Grab the desired length of password (either user-specified or the default value of 20)
  const length = lengthEl.value;
  // Create variable to hold the generated password
  let generatedPassword = "";

  // Calls the buildArray function
  const arr = buildArray();

  // A for loop that will run the number of length times
  // Each iteration will call the function to generate a random number between 0 and the length of the final/customized character array
  for (let i = 0; i <= length - 1; i++) {
    let index = getRandomInt(0, arr.length);
    let newChar = arr[index];
    generatedPassword += newChar;
  }
  return (newPw.innerText = generatedPassword);
};

// Calls generatePassword() on click
genBtn.addEventListener("click", () => {
  generatePassword();
});

// Copies the password to clipboard
function copyToClipboard() {
  /* Get the text field */
  var copyText = newPw.innerText;

  /* Copy the text inside the text field */
  navigator.clipboard.writeText(copyText);
}

copyPw.addEventListener("click", (e) => {
  copyToClipboard();
});
