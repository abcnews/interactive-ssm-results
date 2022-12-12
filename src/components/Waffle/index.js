const classNames = require('classnames/bind');
const PropTypes = require('prop-types');
const React = require('react');
const Integer = require('../Integer');
const Percentage = require('../Percentage');
const Sides = require('../Sides');
const styles = require('./styles.scss').default;

const cx = classNames.bind(styles);

const RANGE = Array.apply(0, Array(100)).map((x, i) => i);

const Waffle = ({ label, value, total, bold }) => {
  const pct = value / total || 0;
  const pctIndex = Math.round(pct * 100) - 1;
  const cells = RANGE.map((index) => (
    <circle
      key={index}
      className={cx({
        empty: index > pctIndex,
        filled: index <= pctIndex,
        darker: bold && index <= pctIndex,
      })}
      cx={3 + 8 * (index % 10)}
      cy={75 - 8 * Math.floor(index / 10)}
      r={index > pctIndex ? 2.5 : 3}
    />
  ));

  return (
    <div className={styles.root}>
      <div className={cx('label', { bold })}>{label}</div>
      <div className={styles.aspect}>
        <svg viewBox="0 0 78 78">{cells}</svg>
      </div>
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
  bold: PropTypes.bool,
};

Waffle.defaultProps = {
  label: '',
  value: 0,
  total: 0,
  bold: false,
};

module.exports = Waffle;
