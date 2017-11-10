const ENDS_IN_IA = /ia$/;
const WHITESPACE = /\s/g;

const NBSP = '\u00a0';
const IAN = 'ian';

module.exports.adjective = text => text.replace(ENDS_IN_IA, IAN);

module.exports.nowrap = text => text.replace(WHITESPACE, NBSP);

module.exports.scrollToId = id =>
  window[id] && window[id].tagName && window[id].scrollIntoView({ behavior: 'smooth', block: 'start' });
