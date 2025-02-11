const Thumbnail = require('./media/thumbnail.jpg');
import { GameMode } from 'gamesShared/definitions/mode';
import instructions from './instructions.md';
import { IGameDef, IGameStatus } from 'gamesShared/definitions/game';

export const reversiGameDef: IGameDef = {
  code: 'reversi',
  name: 'Reversi',
  contributors: ['JosefKuchar'],
  imageURL: Thumbnail,
  modes: [{ mode: GameMode.AI }, { mode: GameMode.OnlineFriend }, { mode: GameMode.LocalFriend }],
  minPlayers: 2,
  maxPlayers: 4,
  description: 'Similar to Rollit and Othello',
  descriptionTag: `Play Reversi, a free online game similar\
 to Rollit and Othello. You can play multi-player online or \
 share your device and play locally against a friend.`,
  instructions: {
    text: instructions,
  },
  status: IGameStatus.PUBLISHED,
  config: () => import('./config'),
  aiConfig: () => import('./ai'),
};

export default reversiGameDef;
