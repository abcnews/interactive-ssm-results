const classNames = require('classnames/bind');
const PropTypes = require('prop-types');
const React = require('react');
const { StickyContainer, Sticky } = require('react-sticky');
const { scrollToId, shareText, track } = require('../../util');
const Card = require('../Card');
const Count = require('../Count');
const ElectorateFinder = require('../ElectorateFinder');
const Politician = require('../Politician');
const Select = require('../Select');
const Share = require('../Share');
const Sides = require('../Sides');
const Text = require('../Text');
const Turnout = require('../Turnout');
const styles = require('./styles.scss').default;

const cx = classNames.bind(styles);

const ATOZ = 'Alphabetically';
const YES = 'High to low yes response';
const NO = 'High to low no response';
const ORDERINGS = {
  [ATOZ]: (a, b) =>
    a.electorate_id < b.electorate_id
      ? -1
      : a.electorate_id > b.electorate_id
      ? 1
      : 0,
  [YES]: (a, b) => b.response_yes_percentage - a.response_yes_percentage,
  [NO]: (a, b) => a.response_yes_percentage - b.response_yes_percentage,
};

class Divisions extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      order: null,
    };

    this.reorder = this.reorder.bind(this);
    this.scrollToTop = this.scrollToTop.bind(this);
    this.handleElectorateChoice = this.handleElectorateChoice.bind(this);
  }

  reorder(event) {
    const order = event.target.value;

    this.setState({ order });
    track('sort-electorates', { order });
  }

  handleElectorateChoice(id) {
    // TODO: Make this less awful
    if (scrollToId(id) !== false) {
      const cardMoreLessEl = window[id].previousElementSibling;

      if (cardMoreLessEl.textContent.indexOf('more') > -1) {
        cardMoreLessEl.click();
      }
    }
  }

  scrollToTop() {
    scrollToId('divisions');
  }

  componentWillReceiveProps(props) {
    this.setState({
      order: props.result === 'y' ? YES : NO,
    });
  }

  render() {
    return (
      this.props.electorates &&
      this.props.electorates.length > 0 && (
        <StickyContainer id={'divisions'} className={cx('root')}>
          <Sticky>
            {({ isSticky, wasSticky, calculatedHeight, style }) => {
              // Interaction with Odyssey Nav-bar
              if (isSticky !== wasSticky) {
                document.documentElement.classList[isSticky ? 'add' : 'remove'](
                  cx('has-sticky')
                );
              }

              this.headerHeight = calculatedHeight;

              return (
                <div
                  className={cx('header', { sticky: isSticky })}
                  style={style}
                >
                  <div className={cx('header-inner')}>
                    <Text heading={3} nomargin>
                      Electorates
                    </Text>
                    <ElectorateFinder
                      electorates={this.props.electorates}
                      mps={this.props.mps}
                      onElectorateChosen={this.handleElectorateChoice}
                    />
                    <div className={styles.controls}>
                      <Sides>
                        <Select
                          value={this.state.order}
                          options={Object.keys(ORDERINGS)}
                          onChange={this.reorder}
                        />
                        <button
                          className={styles.top}
                          onClick={this.scrollToTop}
                        >
                          Go to top
                        </button>
                      </Sides>
                    </div>
                  </div>
                </div>
              );
            }}
          </Sticky>
          <div>
            {[]
              .concat(this.props.electorates)
              .sort(ORDERINGS[this.state.order])
              .map((electorate) => (
                <Card
                  key={electorate.electorate_id}
                  id={electorate.electorate_id}
                  top={[
                    <Text key="heading" heading={4} nomargin>
                      {electorate.electorate_name}
                      <small>{electorate.state_name}</small>
                    </Text>,
                    <Count
                      key="count"
                      electorate={electorate}
                      bar
                      percentage
                    />,
                  ]}
                  bottom={[
                    <Count
                      key="count"
                      electorate={electorate}
                      integer
                      units={'responses'}
                    />,
                    <Share
                      key="share"
                      target={electorate.electorate_id}
                      text={shareText(
                        `The electorate of ${electorate.electorate_name}`,
                        electorate.response_yes_percentage
                      )}
                    />,
                    <Text key="heading" heading={6}>
                      MP
                    </Text>,
                    <Politician
                      key="mp"
                      politician={this.props.mps
                        .filter(
                          (x) => x.electorate_id === electorate.electorate_id
                        )
                        .pop()}
                    />,
                    <Turnout key="turnout" electorate={electorate} />,
                  ]}
                />
              ))}
          </div>
        </StickyContainer>
      )
    );
  }
}

Divisions.propTypes = {
  result: PropTypes.string,
  electorates: PropTypes.arrayOf(PropTypes.object),
  mps: PropTypes.arrayOf(PropTypes.object),
};

Divisions.defaultProps = {
  result: '',
  electorates: [],
  mps: [],
};

module.exports = Divisions;
