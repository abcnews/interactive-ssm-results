const classNames = require('classnames/bind');
const PropTypes = require('prop-types');
const React = require('react');
const { StickyContainer, Sticky } = require('react-sticky');
const Card = require('../Card');
const Count = require('../Count');
const Share = require('../Share');
const Text = require('../Text');
const Turnout = require('../Turnout');
const styles = require('./styles.scss');

const cx = classNames.bind(styles);

const ATOZ = 'Alphabetically';
const YES = 'Highest to lowest yes response';
const NO = 'Highest to lowest no response';
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

    this.reorder = this.reorder.bind(this);
  }

  reorder(event) {
    this.setState({ order: event.target.value });
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
        <StickyContainer className={cx('root')}>
          <Sticky>
            {({ isSticky, wasSticky, style }) => {
              // Interaction with Odyssey Nav-bar
              if (isSticky !== wasSticky) {
                document.documentElement.classList[isSticky ? 'add' : 'remove'](cx('has-sticky'));
              }

              return (
                <div className={cx('header', { sticky: isSticky })} style={style}>
                  <div className={cx('header-inner')}>
                    <Text heading={3} nomargin>
                      Electorates
                    </Text>
                    <select value={this.state.order || ATOZ} onChange={this.reorder}>
                      {Object.keys(ORDERINGS).map(order => (
                        <option key={order} value={order}>
                          {order}
                        </option>
                      ))}
                    </select>
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
                  bottom={[<Count key="count" electorate={electorate} integer />]
                    .concat(this.props.result === 'y' ? [<Share key="share" target={electorate.electorate_id} />] : [])
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
