const copyTextToClipboard = require('copy-text-to-clipboard');
const PropTypes = require('prop-types');
const React = require('react');
const Sides = require('../Sides');
const styles = require('./styles.scss');

class Share extends React.Component {
  constructor(props) {
    super(props);

    this.url = `${String(window.location).split('#')[0]}${this.props.target ? `#${this.props.target}` : ''}`;
    this.eUrl = encodeURIComponent(this.url);
    this.eText = encodeURIComponent(this.props.text);

    this.copy = this.copy.bind(this);
  }

  copy() {
    copyTextToClipboard(this.url);
  }

  render() {
    return (
      <div className={styles.root}>
        <Sides>
          <div>
            <span>Share this result:</span>
            <a
              className={styles.link}
              target="_blank"
              href={`http://www.facebook.com/sharer.php?u=${this.eUrl}`}
              aria-label="Via Facebook"
            >
              <i className={styles.facebook} />
            </a>
            <a
              className={styles.link}
              target="_blank"
              href={`http://twitter.com/intent/tweet?text=${this.eText}%20${this.eUrl}`}
              aria-label="Via Twitter"
            >
              <i className={styles.twitter} />
            </a>
          </div>
          <div>
            <button onClick={this.copy}>
              <span>Copy link</span>
              <i className={styles.copy} />
            </button>
          </div>
        </Sides>
      </div>
    );
  }
}

Share.propTypes = {
  target: PropTypes.string,
  text: PropTypes.string
};

Share.defaultProps = {
  target: '',
  text: String(document.title).split(' - ABC')[0]
};

module.exports = Share;
