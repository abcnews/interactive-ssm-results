const classNames = require('classnames/bind');
const PropTypes = require('prop-types');
const React = require('react');
const styles = require('./styles.scss').default;

const cx = classNames.bind(styles);

const Integer = ({ value, units, yes, no, large }) => {
  const formats = getFormats(value);
  const prefix = yes ? 'Yes' : no ? 'No' : '';
  const label = `${prefix ? `${prefix}: ` : ''}${value}${
    units ? ` ${units}` : ''
  }`;

  return (
    <div aria-label={label} className={cx('root', { yes, no, large })}>
      <span aria-hidden="true">
        <span className={styles.long}>{`${formats[0]}${
          units ? ` ${units}` : ''
        }`}</span>
        <span className={styles.short}>{`${formats[1]}${
          units ? ` ${units}` : ''
        }`}</span>
      </span>
    </div>
  );
};

Integer.propTypes = {
  value: PropTypes.number,
  units: PropTypes.string,
  yes: PropTypes.bool,
  no: PropTypes.bool,
  large: PropTypes.bool,
};

Integer.defaultProps = {
  value: 0,
  units: '',
  yes: false,
  no: false,
  large: false,
};

const getFormats = (value) => {
  const csValue = value.toLocaleString();

  if (value >= 1e6) {
    return [
      `${(value / 1e6).toFixed(2)} million`,
      `${(value / 1e6).toFixed(2)} m`,
    ];
  } else if (value >= 1e5) {
    return [csValue, `${(value / 1e3).toFixed(1)} k`];
  }

  return [csValue, csValue];
};

module.exports = Integer;
