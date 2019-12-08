/* Test game, as per DiUS github repo challenge example */
const Match = require('./src/Match')

const match = new Match("player 1", "player 2");

// this will return "Games: 0-0 Points: 0-0"
console.log(match.score());

match.pointWonBy("player 1");
match.pointWonBy("player 2");
// this will return "Games: 0-0 Points: 15-15"
console.log(match.score());

match.pointWonBy("player 1");
match.pointWonBy("player 1");
// this will return "Games: 0-0 Points: 40-15"
console.log(match.score());

match.pointWonBy("player 2");
match.pointWonBy("player 2");
// this will return "Deuce"
console.log(match.score());

match.pointWonBy("player 1");
// this will return "Advantage player 1"
console.log(match.score());

match.pointWonBy("player 1");
// this will return "Games: 1-0 Points: 0-0"
console.log(match.score());