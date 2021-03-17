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
  if (e.key === 'Escape') {
    closeViewer();
  } else if (e.key === 'ArrowLeft') {
    prevImg();
  } else if (e.key === 'ArrowRight') {
    nextImg();
  }
}
