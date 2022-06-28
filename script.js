const genBtn = document.getElementById("genBtn");
const newPw = document.getElementById("newPw");
const copyPw = document.getElementById("copyPw");

const characterString = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890~\`!@#$%^&*()_-+={[}]|:;\"'<,>.?/`;

const characters = characterString.split("");

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
  }

const generatePassword = () => {
    let generatedPassword = '';
    for (let i = 0; i <= 16; i++) {
        let index = getRandomInt(0, 93);
        let newChar = characters[index];
        generatedPassword += newChar;
    }
    return generatedPassword;
}

genBtn.addEventListener("click", (e) => {
    const pw = generatePassword();
    newPw.innerHTML = pw;
});

function copyToClipboard() {
    /* Get the text field */
    var copyText = newPw.innerHTML;
  
    // /* Select the text field */
    // copyText.select();
    // copyText.setSelectionRange(0, 99999); /* For mobile devices */
  
     /* Copy the text inside the text field */
    navigator.clipboard.writeText(copyText);
  
    /* Alert the copied text */
    console.log("Copied the text: " + copyText);
  }

  copyPw.addEventListener("click", (e) => {
    copyToClipboard();
});
