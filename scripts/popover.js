import {
  computePosition, 
  offset, 
  shift,
  flip
} from 'https://cdn.jsdelivr.net/npm/@floating-ui/dom@1.6.13/+esm';

const infoBadge = document.querySelector('.info-badge');
const infoPopover = document.querySelector('.info-popover');

function update() {
  computePosition(infoBadge, infoPopover, {
  placement: 'top-start',
  middleware: [
    offset(10), 
    flip({
      flipAlignment: false
    }), 
    shift({padding: {
      right: 48,
      left: 48
    }})]
  }).then(({x, y}) => {
    Object.assign(infoPopover.style, {
      left: `${x}px`,
      top: `${y}px`,
    });
  });
}

function showTooltip() {
  infoPopover.style.display = 'block';
  update();
}

function hideTooltip() {
  infoPopover.style.display = '';
}

[
  ['mouseenter', showTooltip],
  ['mouseleave', hideTooltip]
].forEach(([event, listener]) => {
  infoBadge.addEventListener(event, listener);
});