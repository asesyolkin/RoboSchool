import dataTrainers from './../data/trainers.js';

/* MODAL */
const modal = document.querySelector('.modal'),
      modalCloseButton = modal.querySelector('.close-button'),
      trainerImg = modal.querySelector('.photo'),
      trainerName = modal.querySelector('.name'),
      trainerProfession = modal.querySelector('.profession');
let lastActiveTrainerId = 0;

function modalClose(event) {
  if (event.target == modal || event.target == modalCloseButton) {
    modal.classList.add('hidden');
    tabsButtons.forEach(elem => elem.classList.remove('empty'));
  }
};

function modalOpen(event) {
  if (!event.target.closest('.card-of-trainer')) return; 

  const trainerId = event.target.closest("[data-trainer-id]").dataset.trainerId;

  if (trainerId !== lastActiveTrainerId) {
    tabHandler(0);

    trainerImg.src = document.location.origin + dataTrainers[trainerId].img_src;
    trainerImg.alt = document.location.origin + dataTrainers[trainerId].img_alt;
    trainerName.innerHTML = dataTrainers[trainerId].full_name;
    trainerProfession.innerHTML = dataTrainers[trainerId].profession;

    tabsContent.forEach((elem, i) => {
      const tabName = elem.dataset.tabContentName;

      if (!dataTrainers[trainerId].tabs_content[tabName]) tabsButtons[i].classList.add('empty');
      else elem.innerHTML = dataTrainers[trainerId].tabs_content[tabName];

      new SimpleBar(elem, {autoHide: false }).getContentElement();
    })

    lastActiveTrainerId = trainerId;
  };

  modal.classList.remove('hidden');
}

modal.onclick = modalClose;
modalCloseButton.onclick = modalClose;
document.querySelector('.swiper-wrapper').onclick = modalOpen;

/* TABS */
const tabsButtons = modal.querySelectorAll('[data-tab-button-id]'),
      tabsContent = modal.querySelectorAll('[data-tab-content-id]');
let activeTabId = 0;

function tabHandler(tabId) {
  tabsButtons[activeTabId].classList.remove('active');
  tabsButtons[tabId].classList.add('active');

  tabsContent[activeTabId].style.display = 'none';
  tabsContent[tabId].style.display = 'block';

  activeTabId = tabId;
}

tabsButtons.forEach(tab => {
  tab.onclick = tabHandler.bind(null, tab.dataset.tabButtonId);
});

tabHandler(activeTabId);