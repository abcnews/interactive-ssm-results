const classNames = require('classnames/bind');
const PropTypes = require('prop-types');
const React = require('react');
const styles = require('./styles.scss');

const cx = classNames.bind(styles);

const SIZES = [[1e6, 2, 'million', 'm'], [1e3, 1, 'thousand', 'k']];

const Integer = ({ value, units, yes, no, large }) => {
  let divisor = 1;
  let digits;
  let sizeLabel;

  for (let size of SIZES) {
    if (Math.abs(value) >= size[0]) {
      divisor = size[0];
      digits = size[1];
      sizeLabel = size[large ? 2 : 3];

      break;
    }
  }

  const prefix = yes ? 'Yes' : no ? 'No' : '';
  const label = `${prefix ? `${prefix}: ` : ''}${value}${units ? ` ${units}` : ''}`;

  return (
    <div aria-label={label} className={cx('root', { yes, no, large })}>
      <span aria-hidden="true">
        {`${(value / divisor).toFixed(digits)}${sizeLabel ? ` ${sizeLabel}` : ''}${units ? ` ${units}` : ''}`}
      </span>
    </div>
  );
};

Integer.propTypes = {
  value: PropTypes.number,
  units: PropTypes.string,
  yes: PropTypes.bool,
  no: PropTypes.bool,
  large: PropTypes.bool
};

Integer.defaultProps = {
  value: 0,
  units: '',
  yes: false,
  no: false,
  large: false
};

module.exports = Integer;
