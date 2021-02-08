let shuffleInterval = null;

function fetchAllVariants(letter, filenames) {
  const variants = [];
  filenames.forEach(tuple => {
    const currentVariant = [];
    tuple.forEach(name => {
      const img = new Image();
      img.classList.add("logo-letter");
      img.classList.add(letter);
      img.src = `letters/${letter.toUpperCase()}/${name}.png`;
      currentVariant.push(img);
    });
    variants.push(currentVariant);
  });
  return variants;
}

// If version with aberration exists, place it first in its tuple
const lVariants = fetchAllVariants('l', [['L1'], ['L2a', 'L2'], ['L3a', 'L3'], ['L4a', 'L4'], ['L5a', 'L5'], ['L6a', 'L6'], ['L7a', 'L7'], ['L8a', 'L8']]);
const oVariants = fetchAllVariants('o', [['O1'], ['O2a', 'O2'], ['O3a', 'O3'], ['O4a', 'O4'], ['O5a', 'O5'], ['O6a', 'O6'], ['O7a', 'O7'], ['O8a', 'O8']]);
const kVariants = fetchAllVariants('k', [['K1'], ['K2a', 'K2'], ['K3a', 'K3'], ['K4a', 'K4'], ['K5a', 'K5'], ['K6a', 'K6'], ['K7a', 'K7']]);
const iVariants = fetchAllVariants('i', [['I1'], ['I2a', 'I2'], ['I3a', 'I3'], ['I4a', 'I4'], ['I6a', 'I6'], ['I7a', 'I7'], ['I8a', 'I8'], ['I9a', 'I9']]);
const selectorVariantPairs = [[".logo-letter.l", lVariants], [".logo-letter.o", oVariants], [".logo-letter.k", kVariants], [".logo-letter.i", iVariants]]

function swapLetter(selector, variants, fromClick) {
  const newVariant = variants[Math.floor(Math.random() * variants.length)];
  let subVariantIndex = fromClick ? 0 : (Math.random() < 0.25 ? 1 : 0);
  const flipInterval = window.setInterval(() => {
    if (subVariantIndex >= newVariant.length) {
      window.clearInterval(flipInterval);
      return;
    }
    const subVariant = newVariant[subVariantIndex++];
    const currentVariant = document.querySelector(selector);
    subVariant.onclick = () => { swapLetter(selector, variants, true); }
    currentVariant.parentNode.replaceChild(subVariant, currentVariant);
  }, 250);
}

function startShuffle() {
  let lastPairIndex = null;
  shuffleInterval = window.setInterval(() => {
    let toSwapIndex = null;
    do {
      toSwapIndex = Math.floor(Math.random() * selectorVariantPairs.length);
    } while (lastPairIndex == toSwapIndex);
    lastPairIndex = toSwapIndex;
    const toSwap = selectorVariantPairs[toSwapIndex];
    swapLetter(toSwap[0], toSwap[1]);
  }, 1000);
  const shuffleToggle = document.querySelector(".pause-resume-shuffle");
  shuffleToggle.innerText = "Pause";
  shuffleToggle.onclick = stopShuffle;
}

function stopShuffle() {
  window.clearInterval(shuffleInterval);
  const shuffleToggle = document.querySelector(".pause-resume-shuffle");
  shuffleToggle.innerText = "Resume";
  shuffleToggle.onclick = startShuffle;
}

document.addEventListener("DOMContentLoaded", () => {
  startShuffle();
  selectorVariantPairs.forEach(pair => {
    document.querySelector(pair[0]).onclick = () => {
      swapLetter(pair[0], pair[1], true);
    }
  });
});
