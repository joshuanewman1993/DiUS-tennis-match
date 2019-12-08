const Player = require('./Player');

module.exports = class Match {
  constructor(player1, player2) {

    /* Initializes players to start the game */
    this.players = [new Player(player1), new Player(player2)];

    /* Points reference table  */
    this.points = {
      0: '0',
      1: '15',
      2: '30',
      3: '40'
    };
  };

  pointWonBy(pointWinnerName) {
    /* Works out who has won and the lost the point in the game */
    const pointWinner = this.players.find(player => player.playerName === pointWinnerName);
    const pointLoser = this.players.find(player => player.playerName !== pointWinnerName);

    /* Works out if the match has been won already */
    if (this.gameOver) {
      return;
    }

    /* If the match is in a tie-break it will hit this logic */
    if (this.tieBreak) {
      pointWinner.winPoint();
      if (pointWinner.points - pointLoser.points === 2) {
        this.tieBreakWinner(pointWinner);
        this.gameRestart();
        return;
      }
      return;
    }

    /* Regular point in the game */
    if (pointWinner.points < 3 && pointWinner.games <= 6) {
      pointWinner.winPoint();
      return;
    };

    /* If the player who has just won the point already has the advantage the game has been won */
    if (pointWinner.hasAdvantage) {
      this.gameWonBy(pointWinner);
      this.gameRestart();
      return;
    };

    /* If the loser of the point had the advantage then it advantage is lost and returned back to deuce */
    if (pointLoser.hasAdvantage) {
      pointLoser.losesAdvantage();
      pointLoser.losePoint();
      return;
    };

    /* Regular point */
    if (pointWinner.points === 3) {
      if (pointLoser.points < 3) {
        this.gameWonBy(pointWinner);
        this.gameRestart();
        return;
      };

      /* advantage to the point winner */
      if (pointLoser.points === 3) {
        pointWinner.winPoint();
        pointWinner.winsAdvantage();
        return;
      };
    };
  };

  /* Scoring method which returns current score */
  score() {
    if (this.tieBreak) {
      return `Tie-Break : ${this.players[0].points} - ${this.players[1].points}`;
    };

    if (this.players[0].hasAdvantage) {
      return 'Advantage ' + this.players[0].playerName;
    };

    if (this.players[1].hasAdvantage) {
      return 'Advantage ' + this.players[1].playerName;
    };

    if (this.players[0].points === 3 && this.players[1].points === 3) {
      return 'Deuce';
    };
    if (this.gameOver) {
      return `Game over: Score ${this.players[0].games} - ${this.players[1].games}`;
    }
    return `Games: ${this.players[0].games}-${this.players[1].games} Points: ${this.points[this.players[0].points]}-${this.points[this.players[1].points]}`;
  };

  /* Wins the game and restarts to proceed */
  gameWonBy(winner) {
    winner.winGame();
  };

  /* Logic to win the tiebreak */
  tieBreakWinner(winner) {
    winner.winGame();
  };

  /* Resets properties so another game can be played */
  gameRestart() {
    this.players[0].points = 0;
    this.players[1].points = 0;
    this.players[0].hasAdvantage = false;
    this.players[1].hasAdvantage = false;
  };

  /* GETTER methods */
  get tieBreak() {
    if (this.players[0].games === 6 && this.players[1].games === 6) {
      return true;
    };
    return false;
  };

  get gameOver() {
    /* this is the tieBreak match winning logic */
    if (this.players[0].games >= 6 && this.players[1].games >= 6) {
      if (this.players[0].games - this.players[1].games >= 1) {
        return true;
      };
      if (this.players[1].games - this.players[0].games >= 1) {
        return true;
      };
    };

    /* logic to handle if a player has one the match */
    if (this.players[0].games >= 6 && this.players[0].games - this.players[1].games >= 2) {
      return true;
    };
    if (this.players[1].games >= 6 && this.players[1].games - this.players[0].games >= 2) {
      return true;
    };
    return false;
  };
};
