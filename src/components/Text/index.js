const PropTypes = require('prop-types');
const React = require('react');
const styles = require('./styles.scss');

const Text = ({ heading, visualHeading, align, nomargin, children }) => {
  const tagName = heading ? `h${heading}` : 'p';
  let className = styles[heading ? `h${visualHeading || heading}` : 'p'];

  if (align) {
    className += ` ${styles[align]}`;
  }

  if (nomargin) {
    className += ` ${styles.nomargin}`;
  }

  return React.createElement(tagName, { className }, children);
};

Text.propTypes = {
  heading: PropTypes.oneOf([1, 2, 3, 4, 5, 6]),
  visualHeading: PropTypes.oneOf([1, 2, 3, 4, 5, 6]),
  align: PropTypes.oneOf('left', 'right', 'center'),
  nomargin: PropTypes.bool
};

Text.defaultProps = {
  heading: null,
  visualHeading: null,
  align: '',
  nomargin: false
};

module.exports = Text;
