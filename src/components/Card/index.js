const classNames = require('classnames/bind');
const PropTypes = require('prop-types');
const React = require('react');
const { scrollToId, track } = require('../../util');
const styles = require('./styles.scss').default;

const cx = classNames.bind(styles);

class Card extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.props.onToggle || this.toggle.bind(this);

    this.state = this.props.onToggle
      ? {}
      : {
          open: false,
        };
  }

  toggle() {
    const open = !this.state.open;

    this.setState({ open });

    if (open) {
      track('open-card', { id: this.props.id });
    }
  }

  componentDidMount() {
    if (this.props.id && this.props.id === window.location.hash.slice(1)) {
      history.replaceState({}, '', window.location.pathname);
      this.toggle();
      setTimeout(scrollToId, 300, this.props.id);
      track('deep-link', { id: this.props.id });
    }
  }

  render() {
    const open = this.props.onToggle ? this.props.open : this.state.open;

    return (
      <div
        className={cx(
          'root',
          {
            topless: !this.props.top,
            bottomless: !this.props.bottom,
            open,
          },
          this.props.className
        )}
        style={this.props.style}
      >
        {this.props.top && (
          <div className={styles.top}>
            {this.props.id && (
              <button
                className={styles[open ? 'less' : 'more']}
                onClick={this.toggle}
              >
                {open ? 'less' : 'more'}
              </button>
            )}
            {this.props.id && (
              <div id={this.props.id} className={styles.deepLink} />
            )}
            {this.props.top}
          </div>
        )}
        {this.props.middle && open && (
          <div className={styles.middle}>{this.props.middle}</div>
        )}
        {this.props.bottom && open && (
          <div className={styles.bottom}>
            {this.props.bottom}
            {this.props.id && open && (
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
  style: PropTypes.object,
};

Card.defaultProps = {
  id: '',
  open: false,
  onToggle: null,
  top: '',
  middle: '',
  bottom: '',
  className: '',
  style: {},
};

module.exports = Card;
