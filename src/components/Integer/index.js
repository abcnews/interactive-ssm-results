const PropTypes = require('prop-types');
const React = require('react');
const styles = require('./styles.scss');

const SIZES = [[1e6, 2, 'million', 'm'], [1e3, 2, 'thousand', 'k']];

const Integer = ({ value, units, yes, no, large }) => {
  let divisor = 1;
  let digits;
  let label;

  for (let size of SIZES) {
    if (Math.abs(value) >= size[0]) {
      divisor = size[0];
      digits = size[1];
      label = size[large ? 2 : 3];

      break;
    }
  }

  return (
    <div aria-label={`${value}${units ? ` ${units}` : ''}`} className={styles[`root${yes ? 'Yes' : no ? 'No' : ''}`]}>
      <span aria-hidden="true" className={styles[`text${large ? 'Large' : ''}`]}>
        {`${(value / divisor).toFixed(digits)}${label ? ` ${label}` : ''}${units ? ` ${units}` : ''}`}
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
