import { IG, IAuction } from './definitions';
import { Ctx } from 'boardgame.io';
import {
  moveChoseAuction,
  moveChoseTrade,
  moveGoing,
  moveBid,
  movePay,
  moveChoseAnimalAndMoney,
  moveTradeBack,
  moveAnswerTrade,
} from './moves';

export let phaseNone = {};

export let phaseStart = {
  onBegin: (G: IG, ctx: Ctx) => {
    G.log = ['onbegin phaseStart', ...G.log];

    if (G.playerTurnId == -1) {
      G.log = ['init game', ...G.log];
      //Game Init
      G.playerTurnId += 1;
      G.playerTurnId = G.playerTurnId % ctx.numPlayers;
    } else if (G.auction.counter == 3) {
      // If coming from a Auction with no bids:
      G.log = ['onEnd phaseAuction no bids', ...G.log];
      G.players[G.playerTurnId].cards.push(G.auction.card);
      G.auction = <IAuction>{ counter: 0, timeLastHit: 0, card: null, payingPlayerID: -1, payMoneyIDs: null };
      G.playerTurnId += 1;
      G.playerTurnId = G.playerTurnId % ctx.numPlayers;
    } else if (G.trade == null) {
      G.log = ['onEnd Trade Pullback', ...G.log];
      G.trade = <ITrade>{ counterPlayerId: -1, animalIdAttacker: null, animalIdDefender: null, bid: null };
    } else if (G.auction.payingPlayerID >= 0) {
      // If coming from a Sale
      G.log = ['onEnd phaseAuctionPay successful pay', ...G.log];
      G.auction.payingPlayerID = -1;
      // movePay has already done all payment transfers.
      G.playerTurnId += 1;
      G.playerTurnId = G.playerTurnId % ctx.numPlayers;
    } else if (G.trade.counterPlayerId == -2) {
      // If coming from a Trade
      //	  TODO
      G.log = ['onEndPhase Trade', ...G.log];
      G.trade.counterPlayerId = -1;
      G.playerTurnId += 1;
      G.playerTurnId = G.playerTurnId % ctx.numPlayers;
    }

    G.log = ['onBegin phaseStart', ...G.log];

    let activePlayers = { value: {} };
    for (let i = 0; i < ctx.numPlayers; i++) {
      if (G.playerTurnId == i) {
        activePlayers.value[i] = 'phaseStart';
      }
    }
    ctx.events.setActivePlayers(activePlayers);

    return G;
  },

  moves: {
    moveChoseAuction: {
      move: moveChoseAuction,
      client: false,
    },
    moveChoseTrade: {
      move: moveChoseTrade,
      client: false,
    },
  },

  endIf: (G: IG) => {
    if (!(G.moveToPhase == '')) {
      return { next: G.moveToPhase };
    }
  },
};

export let phaseAuction = {
  onBegin: (G: IG, ctx: Ctx) => {
    if (G.moveToPhase == 'phaseAuction') {
      G.log = ['onEnd phaseStart', ...G.log];
      let activePlayers = { value: {} };
      for (let i = 0; i < ctx.numPlayers; i++) {
        if (G.playerTurnId == i) {
          activePlayers.value[i] = { stage: 'stageAuctionSell' };
        } else {
          activePlayers.value[i] = { stage: 'stageAuctionBid' };
        }
      }
      ctx.events.setActivePlayers(activePlayers);
      G.moveToPhase = '';

      G.log = ['onBegin phaseAuction', ...G.log];
      G.auction.card = G.cards.pop();
      if (G.auction.card.name == 'Donkey') {
        G.log = ['Auctioning Donkey, gives money!', ...G.log];
        G.players.forEach((player) => {
          player.money.push(G.money.pop());
        });
      }

      G.auction.timeLastHit = Date.now();
    } else {
      // COMING FROM FAILED PAY
      G.log = ['onEnd phaseAuctionPay failed pay', ...G.log];

      let activePlayers = { value: {} };
      for (let i = 0; i < ctx.numPlayers; i++) {
        if (G.playerTurnId == i) {
          activePlayers.value[i] = { stage: 'stageAuctionSell' };
        } else {
          activePlayers.value[i] = { stage: 'stageAuctionBid' };
        }
      }
      ctx.events.setActivePlayers(activePlayers);
    }

    return G;
  },

  turn: {
    stages: {
      stageAuctionSell: {
        moves: {
          moveGoing: {
            move: moveGoing,
            client: false,
          },
        },
      },
      stageAuctionBid: {
        moves: {
          moveBid: {
            move: moveBid,
            client: false,
          },
        },
      },
    },
  },

  endIf: (G: IG, ctx: Ctx) => {
    if (G.auction.counter == 3) {
      //onEND
      let maxPrice = -1;
      for (let i = 0; i < ctx.numPlayers; i++) {
        maxPrice = G.players[i].currentBid > maxPrice ? G.players[i].currentBid : maxPrice;
      }

      if (maxPrice == -1) {
        // No Bids
        return { next: 'phaseStart' };
      }
      return { next: 'phaseAuctionPay' };
    }
    return false;
  },

  //onEnd: (G: IG, ctx: Ctx) => {
  //	return
  //},
};

export let phaseAuctionPay = {
  onBegin: (G: IG, ctx: Ctx) => {
    if (true) {
      // coming from auction is only way
      G.log = ['onEnd phaseAuction', ...G.log];
      let maxPrice = -1;
      let maxPayingId = -1;
      for (let i = 0; i < ctx.numPlayers; i++) {
        maxPrice = G.players[i].currentBid > maxPrice ? G.players[i].currentBid : maxPrice;
      }

      //if (maxPrice == -1) {
      // Impossible to reach here
      //}

      for (let i = 0; i < ctx.numPlayers; i++) {
        if (G.players[i].currentBid == maxPrice) {
          maxPayingId = i;
        }
      }

      G.auction = { ...G.auction, payingPlayerID: maxPayingId };
    }

    G.log = ['onBegin phaseAuctionPay', ...G.log];

    let activePlayers = { value: {} };
    for (let i = 0; i < ctx.numPlayers; i++) {
      if (G.auction.payingPlayerID == i) {
        activePlayers.value[i] = 'phaseAuctionPay';
      }
    }
    ctx.events.setActivePlayers(activePlayers);

    return G;
  },

  moves: {
    movePay: {
      move: movePay,
      client: false,
    },
  },

  endIf: (G: IG) => {
    if (G.auction.counter == 0) {
      if (G.auction.card == null) {
        return { next: 'phaseStart' };
      } else {
        return { next: 'phaseAuction' };
      }
    }
    return false;
  },
};

export let phaseTradeFirst = {
  onBegin: (G: IG, ctx: Ctx) => {
    G.log = ['onBegin phaseTradeFirst', ...G.log];
    let activePlayers = { value: {} };
    for (let i = 0; i < ctx.numPlayers; i++) {
      if (G.playerTurnId == i) {
        activePlayers.value[i] = { stage: 'phaseTradeFirst' };
      }
    }
    ctx.events.setActivePlayers(activePlayers);

    G.moveToPhase = '';
    return G;
  },
  moves: {
    moveChoseAnimalAndMoney: {
      move: moveChoseAnimalAndMoney,
      client: false,
    },
    moveTradeBack: {
      move: moveTradeBack,
      client: false,
    },
  },
  endIf: (G: IG) => {
    if (G.trade == null) {
      return { next: 'phaseStart' };
    } else if (G.trade.bid != null) {
      return { next: 'phaseTradeSecond' };
    }
    return false;
  },
};

export let phaseTradeSecond = {
  onBegin: (G: IG) => {
    G.log = ['onBegin phaseTradeSecond', ...G.log];
    return G;
  },

  moves: {
    moveAnswerTrade: {
      move: moveAnswerTrade,
      client: false,
    },
  },

  endIf: (G: IG) => {
    if (G.trade.bid == null) {
      return { next: 'phaseStart' };
    }
  },
};
