const PropTypes = require('prop-types');
const React = require('react');
const styles = require('./styles.scss');

const Bar = ({ value, max, large }) => (
  <div className={styles[`root${large ? 'Large' : ''}`]} role="presesntation">
    <progress value={value} max={max} />
  </div>
);

Bar.propTypes = {
  value: PropTypes.number,
  max: PropTypes.number,
  large: PropTypes.bool
};

Bar.defaultProps = {
  value: 0.5,
  max: 1,
  large: false
};

module.exports = Bar;
