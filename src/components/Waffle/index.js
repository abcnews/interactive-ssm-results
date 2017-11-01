const PropTypes = require('prop-types');
const React = require('react');
const Integer = require('../Integer');
const Percentage = require('../Percentage');
const Sides = require('../Sides');
const styles = require('./styles.scss');

const RANGE = [...Array(100).keys()];

const Waffle = ({ label, value, total, bold }) => {
  const pct = value / total;
  const pctIndex = Math.round(pct * 100) - 1;
  const cells = RANGE.map(index => (
    <circle
      key={index}
      className={index > pctIndex ? styles.cellEmpty : styles.cellFilled}
      cx={3 + 8 * (index % 10)}
      cy={75 - 8 * Math.floor(index / 10)}
      r={index > pctIndex ? 2.5 : 3}
    />
  ));

  return (
    <div className={styles.root}>
      <label className={bold ? styles.labelBold : styles.label}>{label}</label>
      <svg viewBox="0 0 78 78">{cells}</svg>
      <Sides>
        <Percentage value={pct} />
        <Integer value={value} />
      </Sides>
    </div>
  );
};

Waffle.propTypes = {
  label: PropTypes.string,
  value: PropTypes.number,
  total: PropTypes.number,
  bold: PropTypes.bool
};

Waffle.defaultProps = {
  label: '',
  value: 0,
  total: 1,
  bold: false
};

module.exports = Waffle;
