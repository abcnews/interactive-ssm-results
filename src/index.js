const { whenOdysseyLoaded } = require('@abcnews/env-utils');
const { getMountValue, selectMounts } = require('@abcnews/mount-utils');
const React = require('react');
const { render } = require('react-dom');
const App = require('./components/App');
require('./global.scss');

whenOdysseyLoaded.then(() => {
  const [rootEl] = selectMounts('ssm');

  if (!rootEl) {
    return;
  }

  const [, ...dataURLParts] = getMountValue(rootEl).split(':');

  if (dataURLParts.length < 2) {
    return;
  }

  const dataURL = `https://www.abc.net.au/dat/${dataURLParts.join('/')}.json`;

  render(<App dataURL={dataURL} />, rootEl);
});
