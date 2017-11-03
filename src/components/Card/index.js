const React = require('react');
const styles = require('./styles.scss');

const Card = ({ id, children }) => (
  <div id={id} className={styles.root}>
    {children}
  </div>
);

module.exports = Card;
