import dataTrainers from './../data/trainers.js';

/* MODAL */
const modal = document.querySelector('.modal'),
      modalCloseButton = modal.querySelector('.close-button'),
      trainerImg = modal.querySelector('.photo'),
      trainerName = modal.querySelector('.name'),
      trainerProfession = modal.querySelector('.profession'),
      isMobileModal = document.documentElement.clientWidth <= 660;
let lastActiveTrainerId = 0;

function modalOpen(event) {
  if (!event.target.closest('.card-of-trainer')) return; 

  const trainerId = event.target.closest("[data-trainer-id]").dataset.trainerId;

  if (trainerId !== lastActiveTrainerId) {
    createTrainerContent(trainerId);
    hideTabContent(activeTabId);
    createTabsContent(trainerId);
    showTabContent(0);

    if (isMobileModal) createMobileTabButtonName(0);

    lastActiveTrainerId = trainerId;
  };

  modal.classList.remove('hidden');
}

function createTrainerContent(trainerId) {
  trainerImg.src = `.${dataTrainers[trainerId].img_src}`;
  trainerImg.alt = dataTrainers[trainerId].img_alt;
  trainerName.innerHTML = dataTrainers[trainerId].full_name;
  trainerProfession.innerHTML = dataTrainers[trainerId].profession;
}

function modalClose(event) {
  if (event.target == modal || event.target == modalCloseButton) {
    modal.classList.add('hidden');

    if (isMobileModal && tabListOpen) closeTabList();
  }
};

if (isMobileModal) {
  modalCloseButton.textContent = '';
}

modal.onclick = modalClose;
modalCloseButton.onclick = modalClose;
document.querySelector('.swiper-wrapper').onclick = modalOpen;

/* TABS */
const tabButtons = modal.querySelectorAll('[data-tab-button-id]'),
      tabsContent = modal.querySelectorAll('[data-tab-content-id]');
let activeTabId = 0;

// variables for the mobile version
let tabList, tabListOpen, tabIdBuffer, transitionInProcess, numberOfActiveTabs, mobileTabButton, heightOfmobileTabButton, arrow;

function tabHandler(tabId) {
  hideTabContent(activeTabId);
  showTabContent(tabId);
  changeActiveTab(tabId);
}

function changeActiveTab(tabId) {
  tabButtons[activeTabId].classList.remove('active');
  tabButtons[tabId].classList.add('active');
  activeTabId = tabId;
}

function createTabsContent (trainerId) {
  activeTabId = 0;
  tabButtons.forEach(elem => elem.classList.remove('active', 'empty'));
  tabButtons[0].classList.add('active');

  if (isMobileModal) numberOfActiveTabs = tabButtons.length - 1;
  
  tabsContent.forEach((elem, i) => {
    const tabName = elem.dataset.tabContentName;

    if (!dataTrainers[trainerId].tabs_content[tabName]) {
      tabButtons[i].classList.add('empty');
      if (isMobileModal) --numberOfActiveTabs;
    }
    else {
      elem.innerHTML = dataTrainers[trainerId].tabs_content[tabName];
    }

    new SimpleBar(elem, {autoHide: false }).getContentElement();
  })
}

function hideTabContent(tabId) {
  tabsContent[tabId].style.display = 'none';
}

function showTabContent(tabId) {
  tabsContent[tabId].style.display = 'block';
}

function mobileTabButtonHandler() {
  if (transitionInProcess) return;

  if (tabList.style.bottom === '') openTabList();
  else closeTabList();

  transitionInProcess = true;
}

function tabListHandler() {
  transitionInProcess = false;

  if (!tabIdBuffer) return;

  changeActiveTab(tabIdBuffer);

  tabIdBuffer = null;
}

function mobileTabHandler(tabId) {
  if (transitionInProcess) return;
  
  createMobileTabButtonName(tabId);
  hideTabContent(activeTabId);
  showTabContent(tabId);
  closeTabList();
  tabIdBuffer = tabId;
  transitionInProcess = true;
}

function createMobileTabButtonName(tabId) {
  mobileTabButton.children[0].textContent = tabButtons[tabId].textContent;
}

function openTabList() {
  tabList.style.bottom = `-${heightOfmobileTabButton * numberOfActiveTabs}px`;
  arrow.classList.add('show-tabs');
  tabListOpen = true;
}

function closeTabList() {
  tabList.style.bottom = '';
  arrow.classList.remove('show-tabs');
  tabListOpen = false;
}

if (isMobileModal) {
  tabIdBuffer = null;
  transitionInProcess = false;
  numberOfActiveTabs = 0;
  tabList = modal.querySelector('.tabs'),
  tabListOpen = false;
  mobileTabButton = modal.querySelector('.mobile-tab-button'),
  heightOfmobileTabButton = mobileTabButton.getClientRects()[0].height,
  arrow = mobileTabButton.querySelector('.arrow');

  tabList.ontransitionend = tabListHandler;

  mobileTabButton.onclick = mobileTabButtonHandler;

  tabButtons.forEach(tab => {
    tab.onclick = mobileTabHandler.bind(null, tab.dataset.tabButtonId);
  });
} else {
  tabButtons.forEach(tab => {
    tab.onclick = tabHandler.bind(null, tab.dataset.tabButtonId);
  });
}