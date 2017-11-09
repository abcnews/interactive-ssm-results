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

const Divisions = ({ result, electorates }) =>
  electorates &&
  electorates.length > 0 && (
    <StickyContainer className={cx('root')}>
      <Sticky>
        {({ isSticky, wasSticky, style }) => {
          if (isSticky !== wasSticky) {
            document.documentElement.classList[isSticky ? 'add' : 'remove'](cx('has-sticky'));
          }

          return (
            <div className={cx('controls', { sticky: isSticky })} style={style}>
              <div className={cx('inner')}>
                <Text heading={3} nomargin>
                  Electorates
                </Text>
              </div>
            </div>
          );
        }}
      </Sticky>
      <div>
        {electorates.map(electorate => (
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
              .concat(result === 'y' ? [<Share key="share" target={electorate.electorate_id} />] : [])
              .concat([<Turnout key="turnout" electorate={electorate} />])}
          />
        ))}
      </div>
    </StickyContainer>
  );

Divisions.propTypes = {
  result: PropTypes.string,
  electorates: PropTypes.arrayOf(PropTypes.object)
};

Divisions.defaultProps = {
  result: '',
  electorates: []
};

module.exports = Divisions;
