const classNames = require('classnames/bind');
const PropTypes = require('prop-types');
const React = require('react');
const { StickyContainer, Sticky } = require('react-sticky');
const Card = require('../Card');
const Count = require('../Count');
const Select = require('../Select');
const Share = require('../Share');
const Sides = require('../Sides');
const Text = require('../Text');
const Turnout = require('../Turnout');
const styles = require('./styles.scss');

const cx = classNames.bind(styles);

const ATOZ = 'Alphabetically';
const YES = 'Highest to lowest yes vote';
const NO = 'Highest to lowest no vote';
const ORDERINGS = {
  [ATOZ]: (a, b) => (a.electorate_id < b.electorate_id ? -1 : a.electorate_id > b.electorate_id ? 1 : 0),
  [YES]: (a, b) => b.response_yes_percentage - a.response_yes_percentage,
  [NO]: (a, b) => a.response_yes_percentage - b.response_yes_percentage
};

class Divisions extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      order: null
    };

    this.getRootRef = this.getRootRef.bind(this);
    this.reorder = this.reorder.bind(this);
    this.scrollToTop = this.scrollToTop.bind(this);
  }

  getRootRef(root) {
    this.root = root;
  }

  reorder(event) {
    this.setState({ order: event.target.value });
  }

  scrollToTop() {
    this.root.node.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  componentWillReceiveProps(props) {
    this.setState({
      order: props.result === 'y' ? YES : NO
    });
  }

  render() {
    return (
      this.props.electorates &&
      this.props.electorates.length > 0 && (
        <StickyContainer ref={this.getRootRef} className={cx('root')}>
          <Sticky>
            {({ isSticky, wasSticky, calculatedHeight, style }) => {
              // Interaction with Odyssey Nav-bar
              if (isSticky !== wasSticky) {
                document.documentElement.classList[isSticky ? 'add' : 'remove'](cx('has-sticky'));
              }

              this.headerHeight = calculatedHeight;

              return (
                <div className={cx('header', { sticky: isSticky })} style={style}>
                  <div className={cx('header-inner')}>
                    <Text heading={3} nomargin>
                      Electorates
                    </Text>
                    <div className={styles.controls}>
                      <Sides>
                        <Select value={this.state.order} options={Object.keys(ORDERINGS)} onChange={this.reorder} />
                        <button className={styles.top} onClick={this.scrollToTop}>
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
              .map(electorate => (
                <Card
                  key={electorate.electorate_id}
                  id={electorate.electorate_id}
                  top={[
                    <Text key="heading" heading={4} nomargin>
                      {electorate.electorate_name}
                      <small>{electorate.state_name}</small>
                    </Text>,
                    <Count key="count" electorate={electorate} bar percentage />
                  ]}
                  bottom={[
                    <Count key="count" electorate={electorate} integer units={'votes'} />,
                    <Share key="share" target={electorate.electorate_id} />
                  ]
                    .concat(this.props.result === 'y' ? [<Text>[TODO: Representative]</Text>] : [])
                    .concat([<Turnout key="turnout" electorate={electorate} />])}
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
  electorates: PropTypes.arrayOf(PropTypes.object)
};

Divisions.defaultProps = {
  result: '',
  electorates: []
};

module.exports = Divisions;
