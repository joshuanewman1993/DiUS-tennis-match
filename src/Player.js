module.exports = class Player {
  constructor(name) {
    // Initializes players
    this.playerName = name;
    this.points = 0;
    this.games = 0;
    this.hasAdvantage = false;
  }

  /* player wins a point */
  winPoint() {
    this.points++;
  }

  /* player looses a point */
  loosePoint() {
    this.points--;
  }

  /* player wins a game */
  winGame() {
    this.games++;
  }

  /* player gets the advantage */
  winsAdvantage() {
    this.hasAdvantage = true;
  }

  /* player loses the advantage */
  losesAdvantage() {
    this.hasAdvantage = false;
  };
};
