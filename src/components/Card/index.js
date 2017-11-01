const React = require('react');
const styles = require('./styles.scss');

const Card = ({ children }) => {
  return <div className={styles.root}>{children}</div>;
};

module.exports = Card;
