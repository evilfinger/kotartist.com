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

// IMAGE VIEWER -------------------------------------------------------------------------
const allImgLinks = document.querySelectorAll('.img-viewer-trigger');
let currentImgIndex = '';

const showImg = function(anchorElement) {
  document.querySelector('.img').style.backgroundImage = "url(" + anchorElement.dataset.imgSrc + ")";
  document.querySelector('.img-title').innerText = anchorElement.dataset.imgTitle;
  document.querySelector('.img-description').innerText = anchorElement.dataset.imgDescription;
  currentImgIndex = anchorElement.dataset.imgIndex;
  document.querySelector('body').classList.add('img-viewer');
};

for (i = 0; i < allImgLinks.length; i++) {
  allImgLinks[i].onclick = function(e) {
    showImg(e.target);
  };
}

const prevImg = function(e) {
  let prevImgIndex = parseInt(currentImgIndex) - 1;

  if (prevImgIndex === -1) {
    prevImgIndex = allImgLinks.length - 1;
  };

  showImg(allImgLinks[prevImgIndex]);
}

const nextImg = function(e) {
  let nextImgIndex = parseInt(currentImgIndex) + 1;

  if (nextImgIndex === allImgLinks.length) {
    nextImgIndex = 0;
  };

  showImg(allImgLinks[nextImgIndex]);
}

document.querySelector('.previous').onclick = prevImg;
document.querySelector('.next').onclick = nextImg;

const closeViewer = function(e) {
  document.querySelector('body').classList.remove('img-viewer');
}

document.querySelector('.close-btn').onclick = closeViewer;

document.onkeyup = function keyPress(e) {
  console.log('test string');
  if(e.key === "Escape") {
    closeViewer();
  }
}
