const classNames = require('classnames/bind');
const PropTypes = require('prop-types');
const React = require('react');
const styles = require('./styles.scss');

const cx = classNames.bind(styles);

class Card extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.props.onToggle || this.toggle.bind(this);

    this.state = this.props.onToggle
      ? {}
      : {
          open: window.location.hash.split('#') === this.props.id
        };
  }

  toggle() {
    this.setState({
      open: !this.state.open
    });
  }

  render() {
    return (
      <div
        id={this.props.id}
        className={cx(
          'root',
          {
            topless: !this.props.top,
            bottomless: !this.props.bottom,
            open: this.props.onToggle ? this.props.open : this.state.open
          },
          this.props.className
        )}
        style={this.props.style}
      >
        {this.props.top && (
          <div className={styles.top}>
            {this.props.id && (
              <button
                className={styles[(this.props.onToggle ? this.props.open : this.state.open) ? 'less' : 'more']}
                onClick={this.toggle}
              >
                {this.state.open ? 'less' : 'more'}
              </button>
            )}
            {this.props.top}
          </div>
        )}
        {(this.props.middle && this.props.onToggle ? this.props.open : this.state.open) && (
          <div className={styles.middle}>{this.props.middle}</div>
        )}
        {(this.props.bottom && this.props.onToggle ? this.props.open : this.state.open) && (
          <div className={styles.bottom}>
            {this.props.bottom}
            {this.props.id &&
              (this.props.onToggle ? this.props.open : this.state.open) && (
                <button className={styles.less} onClick={this.toggle}>
                  less
                </button>
              )}
          </div>
        )}
      </div>
    );
  }
}

Card.propTypes = {
  id: PropTypes.string,
  open: PropTypes.bool,
  onToggle: PropTypes.func,
  top: PropTypes.node,
  middle: PropTypes.node,
  bottom: PropTypes.node,
  className: PropTypes.string,
  style: PropTypes.object
};

Card.defaultProps = {
  id: '',
  open: false,
  onToggle: null,
  top: '',
  middle: '',
  bottom: '',
  className: '',
  style: {}
};

module.exports = Card;
