const classNames = require('classnames/bind');
const PropTypes = require('prop-types');
const React = require('react');
const styles = require('./styles.scss');

const cx = classNames.bind(styles);

const Bar = ({ value, max, large, prediction }) => (
  <div className={cx('root', { large, prediction })} role="presesntation">
    <progress value={value} max={max} />
  </div>
);

Bar.propTypes = {
  value: PropTypes.number,
  max: PropTypes.number,
  large: PropTypes.bool,
  prediction: PropTypes.bool
};

Bar.defaultProps = {
  value: 0.5,
  max: 1,
  large: false,
  prediction: false
};

module.exports = Bar;
