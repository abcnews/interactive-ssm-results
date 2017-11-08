const PropTypes = require('prop-types');
const React = require('react');
const styles = require('./styles.scss');

const Abbreviation = ({ title, children }) => (
  <abbr aria-label={title} className={styles.root}>
    <span aria-hidden="true">{children}</span>
  </abbr>
);

Abbreviation.propTypes = {
  title: PropTypes.string
};

Abbreviation.defaultProps = {
  title: ''
};

module.exports = Abbreviation;
