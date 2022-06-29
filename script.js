// Element Selectors
const genBtn = document.getElementById("genBtn");
const newPw = document.getElementById("newPw");
const copyPw = document.getElementById("copyPw");
const lengthEl = document.getElementById("length");
const uppercaseEl = document.getElementById("uppercase");
const lowercaseEl = document.getElementById("lowercase");
const numbersEl = document.getElementById("numbers");
const symbolsEl = document.getElementById("symbols");
const omitOptionEl = document.getElementById("omitOption");
const omitSymbolsEl = document.getElementById("omitSymbols");

// Character Strings
const upperString = `ABCDEFGHIJKLMNOPQRSTUVWXYZ`;
const lowerString = `abcdefghijklmnopqrstuvwxyz`;
const numberString = `1234567890`;

// If option to include symbols is checked, display option to specify which symbols to omit
symbolsEl.addEventListener("click", function handleClick() {
  if (symbolsEl.checked) {
    omitOptionEl.style.display = "block";
  } else {
    omitOptionEl.style.display = "none";
  }
});

const filterSymbols = () => {
  const omitSymbols = omitSymbolsEl.value;

  let symbolString = `~\`!@#$%^&*()_-+={[}]|:;"'<,>.?/`;
  // Split symbolString into array symbolArr
  const symbolArr = symbolString.split("");
  // If omitSymbols.length > 1, split string into array omitArr
  const omitArr = omitSymbols.split("");
  if (omitArr.length > 1) {
    // search symbolArr for omitArr[i]
    // if found, splice symbolArr at k

    for (let i = 0; i < omitArr.length; i++) {
      for (let k = 0; k < symbolArr.length; k++) {
        if (omitArr[i] === symbolArr[k]) {
          symbolArr.splice(k, 1);
        }
      }
    }

    symbolString = symbolArr.join("");
    return symbolString;
  } else {
    return symbolString;
  }
};

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
};

const buildArray = () => {
  const hasUpper = uppercaseEl.checked;
  const hasLower = lowercaseEl.checked;
  const hasNumber = numbersEl.checked;
  const hasSymbol = symbolsEl.checked;
  const symString = filterSymbols();

  let pwStr = "";

  if (hasUpper) {
    pwStr += upperString;
  }

  if (hasLower) {
    pwStr += lowerString;
  }

  if (hasNumber) {
    pwStr += numberString;
  }

  if (hasSymbol) {
    pwStr += symString;
  }

  const pwArr = pwStr.split("");
  return pwArr;
};

const generatePassword = () => {
  const length = lengthEl.value;
  let generatedPassword = "";
  const arr = buildArray();
  for (let i = 0; i <= length - 1; i++) {
    let index = getRandomInt(0, arr.length);
    let newChar = arr[index];
    generatedPassword += newChar;
  }
  return (newPw.innerHTML = generatedPassword);
};

genBtn.addEventListener("click", (e) => {
  generatePassword();
});

function copyToClipboard() {
  /* Get the text field */
  var copyText = newPw.innerHTML;

  /* Copy the text inside the text field */
  navigator.clipboard.writeText(copyText);

}

copyPw.addEventListener("click", (e) => {
  copyToClipboard();
});
