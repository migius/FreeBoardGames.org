import * as React from 'react';
import IPlayer from './player';
import { BuildingCardComponent } from './CardComponent';

import css from './PlayerHand.css';

export interface IPlayerHandProps {
  player: IPlayer;
  selectCard?: (index: number) => void;
}

export class PlayerHand extends React.Component<IPlayerHandProps, {}> {
  _selectCard = (i: number) => this.props.selectCard(i);

  render() {
    const w:number = this.props.player.buildings.length * 40 + 80;

    return (
      <div className={css.playerHand}>
        <div
          className={css.cards}
          style={{width:w}}
        >
          {this.renderHand()}
        </div>
      </div>
    );
  }

  renderHand() {
    if (this.props.player.buildings.length == 0){
      return (
        <div className="css.title">No Cards Yet...</div>
      );
    }
    
    return [...this.props.player.buildings]
      .sort((a, b) => (a.value - b.value))
      .map((card: any, index: number) => 
        this.renderCard(card, index, this.props.player.buildings.length)
      )
  }

  renderCard(card: any, index: number, count: number) {
    const rot = -(count * 3 / 2) + (index * (count * 3) / (count-1));
    const y = Math.abs(index - count/2) * (count * 3);
    const styles = { 
        transform: `rotate(${rot}deg) translateY(${y}px)`,
        transformOrigin: `50% 50%`
    };

    const isSelected:boolean = this.props.player.selectedCard ? (this.props.player.selectedCard.number == card.number) : false;
    
    return (
      <div
        className={css.cardContainer}
        key={index}
        >
          <div style={styles}>
            <BuildingCardComponent
              click={() => this._selectCard(card.number)}
              selectable={this.props.selectCard ? true : false}
              selected={isSelected}
              card={card} />
          </div>
      </div>
    )
  }
}
