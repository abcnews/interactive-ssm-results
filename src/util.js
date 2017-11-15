const ENDS_IN_IA = /ia$/;
const WHITESPACE = /\s/g;

const NBSP = '\u00a0';
const IAN = 'ian';

module.exports.adjective = text => text.replace(ENDS_IN_IA, IAN);

module.exports.colloquial = (name, shouldUpcase) =>
  name.indexOf('Territory') > -1 ? `${shouldUpcase ? 'The' : 'the'} ${name}` : name;

module.exports.copyTextToClipboard = input => {
  // Source (MIT): https://github.com/sindresorhus/copy-text-to-clipboard

  const el = document.createElement('textarea');

  el.value = input;

  // Prevent keyboard from showing on mobile
  el.setAttribute('readonly', '');

  el.style.contain = 'strict';
  el.style.position = 'absolute';
  el.style.left = '-9999px';
  el.style.fontSize = '12pt'; // Prevent zooming on iOS

  const selection = getSelection();

  let originalRange = false;
  if (selection.rangeCount > 0) {
    originalRange = selection.getRangeAt(0);
  }

  document.body.appendChild(el);
  el.select();

  // Explicit selection workaround for iOS
  el.selectionStart = 0;
  el.selectionEnd = input.length;

  let success = false;

  try {
    success = document.execCommand('copy');
  } catch (err) {}

  document.body.removeChild(el);

  if (originalRange) {
    selection.removeAllRanges();
    selection.addRange(originalRange);
  }

  return success;
};

module.exports.nowrap = text => text.replace(WHITESPACE, NBSP);

module.exports.scrollToId = id =>
  id && window[id] && window[id].tagName && window[id].scrollIntoView({ behavior: 'smooth', block: 'start' });

module.exports.shareText = (place, pctYes) =>
  `${place} has ${(pctYes * 100).toFixed(1)}% support for legalising same-sex marriage`;

module.exports.track = (type, data) => {
  if (window.ABC && ABC.News && ABC.News.Logger) {
    ABC.News.Logger.log('interactive-ssm-results', type, data || {}, true);
  }
};
