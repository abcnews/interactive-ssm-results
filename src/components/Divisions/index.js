const PropTypes = require('prop-types');
const React = require('react');
const Card = require('../Card');
const Count = require('../Count');
const Share = require('../Share');
const Text = require('../Text');
const Turnout = require('../Turnout');

const Divisions = ({ electorates }) =>
  electorates.map(electorate => (
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
        <Count key="count" electorate={electorate} integer />,
        <Share key="share" target={electorate.electorate_id} />,
        <Turnout key="turnout" electorate={electorate} />
      ]}
    />
  ));

Divisions.propTypes = {
  electorates: PropTypes.arrayOf(PropTypes.object).isRequired
};

Divisions.defaultProps = {
  electorate: [{}]
};

module.exports = Divisions;
