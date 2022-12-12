const React = require('react');
const { track } = require('../../util');
const Card = require('../Card');
const styles = require('./styles.scss').default;

const PER_ROW = 2;

class CardGrid extends React.Component {
  constructor(props) {
    super(props);

    const hash = window.location.hash.split('#');
    const ids = this.props.cards.map((card) => card.id);

    this.state = {
      openId: hash in ids ? hash : null,
    };
  }

  onToggle(id) {
    const openId = this.state.openId === id ? null : id;

    this.setState({ openId });

    if (openId) {
      track('open-card', { id });
    }
  }

  render() {
    const cards = this.props.cards.reduce((memo, card, index) => {
      const order = index * PER_ROW + ((index + 1) % PER_ROW);

      return memo.concat([
        <Card
          key={String(card.id + '-top')}
          id={card.id}
          open={card.id === this.state.openId}
          onToggle={this.onToggle.bind(this, card.id)}
          top={card.top}
          middle={card.middle}
          style={{ order: order }}
        />,
        <Card
          key={String(card.id + '-bottom')}
          id={card.id}
          open={card.id === this.state.openId}
          onToggle={this.onToggle.bind(this, card.id)}
          bottom={card.bottom}
          className={styles.full}
          style={{ order: order + PER_ROW }}
        />,
      ]);
    }, []);

    return <div className={styles.root}>{cards}</div>;
  }
}

module.exports = CardGrid;
