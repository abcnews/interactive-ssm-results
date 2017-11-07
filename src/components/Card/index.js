const React = require('react');
const styles = require('./styles.scss');

class Card extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);

    this.state = {
      isOpen: window.location.hash.split('#') === this.props.id
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return (
      <div id={this.props.id} className={styles.root}>
        <button className={styles[this.state.isOpen ? 'less' : 'more']} onClick={this.toggle}>
          {this.state.isOpen ? 'less' : 'more'}
        </button>
        {this.props.top}
        {this.state.isOpen && this.props.bottom}
      </div>
    );
  }
}

module.exports = Card;
