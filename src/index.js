const React = require('react');
const { render } = require('react-dom');

const PROJECT_NAME = 'interactive-ssm-results';
const root = document.querySelector(`[data-${PROJECT_NAME}-root]`);
const dataURL = root.getAttribute('data-url');

function init() {
  const App = require('./components/App');
  render(<App dataURL={dataURL} />, root);
}

init();

if (module.hot) {
  module.hot.accept('./components/App', () => {
    try {
      init();
    } catch (err) {
      const ErrorBox = require('./components/ErrorBox');
      render(<ErrorBox error={err} />, root);
    }
  });
}

if (process.env.NODE_ENV === 'development') {
  console.debug(`[${PROJECT_NAME}] public path: ${__webpack_public_path__}`);
}
