const classNames = require('classnames/bind');
const PropTypes = require('prop-types');
const React = require('react');
const styles = require('./styles.scss');

const cx = classNames.bind(styles);

const Percentage = ({ value, digits, yes, no, large }) => {
  let pct = (value * 100).toFixed(digits);

  if (pct == 50) {
    pct = (value * 100).toFixed(1);
  }

  const prefix = yes ? 'Yes' : no ? 'No' : '';
  const label = `${prefix ? `${prefix}: ` : ''}${pct} per cent`;

  return (
    <div aria-label={label} className={cx('root', { yes, no, large })}>
      <span aria-hidden="true">
        {prefix} {pct}
        {'%'}
      </span>
    </div>
  );
};

Percentage.propTypes = {
  value: PropTypes.number,
  digits: PropTypes.number,
  yes: PropTypes.bool,
  no: PropTypes.bool,
  large: PropTypes.bool
};

Percentage.defaultProps = {
  value: 0,
  digits: 0,
  yes: false,
  no: false,
  large: false
};

module.exports = Percentage;
