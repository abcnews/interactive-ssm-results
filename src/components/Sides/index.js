const React = require('react');
const styles = require('./styles.scss');

const Sides = ({ children }) => <div className={styles.root}>{children}</div>;

Sides.propTypes = {
  children: (props, propName, componentName) => {
    if (props.children && props.children.length !== 2) {
      return new Error(`${componentName} can only have two children.`);
    }
  }
};

module.exports = Sides;
