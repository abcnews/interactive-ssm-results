const PropTypes = require('prop-types');
const React = require('react');
const { adjective, colloquial, shareText } = require('../../util');
const Abbreviation = require('../Abbreviation');
const CardGrid = require('../CardGrid');
const Count = require('../Count');
const PoliticianGrid = require('../PoliticianGrid');
const Share = require('../Share');
const Text = require('../Text');
const Turnout = require('../Turnout');

const States = ({ electorates, senators }) => (
  <CardGrid
    cards={electorates.map(electorate => ({
      id: electorate.electorate_id,
      top: [
        <Text key="heading" heading={4} nomargin>
          <Abbreviation title={electorate.electorate_name}>{electorate.electorate_name_short}</Abbreviation>
        </Text>,
        <Count key="count" electorate={electorate} bar percentage />
      ],
      middle: <Count electorate={electorate} integer />,
      bottom: [
        <Share
          key="share"
          target={electorate.electorate_id}
          text={shareText(colloquial(electorate.electorate_name, true), electorate.response_yes_percentage)}
        />,
        <Turnout key="turnout" electorate={electorate} />,
        <Text key="heading" heading={4} align="center">
          {`Which ${adjective(electorate.electorate_name)} senators are likely to support same-sex marriage?`}
        </Text>,
        <PoliticianGrid
          key="senators"
          politicians={senators.filter(x => x.electorate_id === electorate.electorate_id)}
        />
      ]
    }))}
  />
);

States.propTypes = {
  electorates: PropTypes.arrayOf(PropTypes.object).isRequired,
  senators: PropTypes.arrayOf(PropTypes.object).isRequired
};

States.defaultProps = {
  electorate: [{}],
  senators: [{}]
};

module.exports = States;
