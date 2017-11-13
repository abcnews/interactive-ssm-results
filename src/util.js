const ENDS_IN_IA = /ia$/;
const WHITESPACE = /\s/g;

const NBSP = '\u00a0';
const IAN = 'ian';

module.exports.adjective = text => text.replace(ENDS_IN_IA, IAN);

module.exports.colloquial = (name, shouldUpcase) =>
  name.indexOf('Territory') > -1 ? `${shouldUpcase ? 'The' : 'the'} ${name}` : name;

module.exports.nowrap = text => text.replace(WHITESPACE, NBSP);

module.exports.scrollToId = id =>
  id && window[id] && window[id].tagName && window[id].scrollIntoView({ behavior: 'smooth', block: 'start' });

module.exports.shareText = (place, pctYes) =>
  `${place} has ${(pctYes * 100).toFixed(1)}% support for legalising same-sex marriage`;
