const PropTypes = require('prop-types');
const React = require('react');
const { nowrap } = require('../../util');
const Text = require('../Text');
const WaffleGrid = require('../WaffleGrid');

const Turnout = ({ electorate }) => (
  <div>
    <Text heading={4} align={'center'}>
      {`Who returned their ballot${electorate.electorate_level !== 'national'
        ? ` in ${nowrap(electorate.electorate_name)}`
        : ''}?`}
    </Text>
    <WaffleGrid
      waffles={[
        { label: 'Total', value: electorate.turnout_total_count, total: electorate.turnout_total_eligible },
        {
          label: 'Male',
          value: electorate.turnout_male_count,
          total: electorate.turnout_male_eligible
        },
        {
          label: 'Female',
          value: electorate.turnout_female_count,
          total: electorate.turnout_female_eligible
        },
        {
          label: '18 - 24 yrs',
          value: electorate.turnout_18to24_count,
          total: electorate.turnout_18to24_eligible
        },
        {
          label: '25 - 34 yrs',
          value: electorate.turnout_25to34_count,
          total: electorate.turnout_25to34_eligible
        },
        {
          label: '35 - 44 yrs',
          value: electorate.turnout_35to44_count,
          total: electorate.turnout_35to44_eligible
        },
        {
          label: '45 - 54 yrs',
          value: electorate.turnout_45to54_count,
          total: electorate.turnout_45to54_eligible
        },
        {
          label: '55 - 64 yrs',
          value: electorate.turnout_55to64_count,
          total: electorate.turnout_55to64_eligible
        },
        {
          label: '65 + yrs',
          value: electorate.turnout_65plus_count,
          total: electorate.turnout_65plus_eligible
        }
      ]}
    />
  </div>
);

Turnout.propTypes = {
  electorate: PropTypes.object.isRequired
};

Turnout.defaultProps = {
  electorate: {}
};

module.exports = Turnout;
