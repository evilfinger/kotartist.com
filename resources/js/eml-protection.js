// EMAIL PROTECTION ------------------------------------------------------------------
const srcAdrs = '79180b0d100a0d57120a1c171018391e14181015571a1614';

function decodeEmail(encodedString) {
  let email = '';

  const keyInHex = encodedString.substr(0, 2);

  const key = parseInt(keyInHex, 16);

  for (let n = 2; n < encodedString.length; n += 2) {
    const charInHex = encodedString.substr(n, 2)
    const char = parseInt(charInHex, 16);
    const output = char ^ key;

    email += String.fromCharCode(output);
  }
  return email;
}

let allElements = document.getElementsByClassName('eml-protected');

for (let i = 0; i < allElements.length; i++) {
  updateAnchor(allElements[i]);
}

function updateAnchor(element) {
  const decoded = decodeEmail(srcAdrs);
  element.textContent = decoded;
  element.href = 'mailto:' + decoded;
}
