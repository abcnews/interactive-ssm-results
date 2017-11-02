const React = require('react');
const styles = require('./styles.scss');

const Card = ({ children }) => <div className={styles.root}>{children}</div>;

module.exports = Card;
