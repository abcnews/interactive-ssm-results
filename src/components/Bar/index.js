const PropTypes = require('prop-types');
const React = require('react');
const styles = require('./styles.scss');

const Bar = ({ value, max, tall }) => {
  return (
    <div className={styles[tall ? 'tall' : 'normal']} role="presesntation">
      <progress value={value} max={max} />
    </div>
  );
};

Bar.propTypes = {
  value: PropTypes.number,
  max: PropTypes.number,
  tall: PropTypes.boolean
};

Bar.defaultProps = {
  value: 0,
  max: 1,
  tall: false
};

module.exports = Bar;
