import escape from 'lodash-es/escape';
import sampleSize from 'lodash-es/sampleSize';
import contributorCard from './contributor-card.js';
import contributorList from './contributor-list.json';

const cardList = document.querySelector('.card-list.commiter-list');

if (!!cardList) {
  // at least handle should exist
  const filteredList = contributorList.filter(({ handle }) => !!handle);
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

    return randomSample.map(cleanName).map(contributorCard);
  };

  // toggle active cart to not-active and vice versa
  const toggleActiveCard = () =>
    cardList.querySelectorAll('.commiter-wrapper').forEach((el) =>
      el.querySelectorAll('.contributor-card').forEach((card) => {
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
          `<div class="commiter-wrapper"><a class="contributor-card active"></a>${card}</div>`
      )
      .join('');
    setTimeout(() => toggleActiveCard(), 300);
  };

  const toggleCardContent = () => {
    const randomSample = getRandomSample();
    cardList
      .querySelectorAll('.contributor-card:not(.active)')
      .forEach((card, i) => {
        card.outerHTML = randomSample[i];
      });
    setTimeout(() => toggleActiveCard(), 300);
  };

  firstInit();

  setInterval(toggleCardContent, 15000);
}
