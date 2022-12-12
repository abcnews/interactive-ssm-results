const PropTypes = require('prop-types');
const React = require('react');
const styles = require('./styles.scss').default;

const Select = ({ value, options, onChange, style }) => (
  <div className={styles.root} style={style}>
    <select value={value} onChange={onChange}>
      {options.map((value) => (
        <option key={value} value={value}>
          {value}
        </option>
      ))}
    </select>
  </div>
);

Select.propTypes = {
  value: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.string),
  onChange: PropTypes.func,
};

Select.defaultProps = {
  value: null,
  options: [],
  onChange: null,
};

module.exports = Select;
