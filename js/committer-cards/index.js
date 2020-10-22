import escape from 'lodash-es/escape';
import sampleSize from 'lodash-es/sampleSize';
import committerCard from './committer-card.js';
import committerList from './committer-list.json';

const cardList = document.querySelector('.card-list.commiter-list');

if (!!cardList) {
  // at least handle should exist
  const filteredList = committerList.filter(({ handle }) => !!handle);
  // length of sample array
  const sampleLength = 6;
  // escape name for html
  const cleanName = ({ handle, name }) => ({
    handle,
    name: escape(name || handle),
  });

  // remember lastRandom (no dupcates on two neighbouring runs)
  let lastRandom = [];
  const getRandomSample = () => {
    const randomSample = sampleSize(
      filteredList.filter(({ handle }) => lastRandom.indexOf(handle) < 0),
      sampleLength
    );

    lastRandom = randomSample.map(({ handle }) => handle);

    return randomSample.map(cleanName).map(committerCard);
  };

  // toggle active cart to not-active and vice versa
  const toggleActiveCard = () =>
    cardList.querySelectorAll('.commiter-wrapper').forEach((el) =>
      el.querySelectorAll('.committer-card').forEach((card) => {
        card.classList.contains('active')
          ? card.classList.remove('active')
          : card.classList.add('active');
      })
    );
  // create two cards and transition to a new one
  const firstInit = () => {
    cardList.innerHTML = getRandomSample()
      .map(
        (card) =>
          `<div class="commiter-wrapper"><a class="committer-card active"></a>${card}</div>`
      )
      .join('');
    setTimeout(() => toggleActiveCard(), 300);
  };

  const toggleCardContent = () => {
    const randomSample = getRandomSample();
    cardList
      .querySelectorAll('.committer-card:not(.active)')
      .forEach((card, i) => {
        card.outerHTML = randomSample[i];
      });
    setTimeout(() => toggleActiveCard(), 300);
  };

  firstInit();

  setInterval(toggleCardContent, 15000);
}
