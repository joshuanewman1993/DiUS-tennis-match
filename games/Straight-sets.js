const Match = require('../src/Match')

/* This example is a player winning by straight sets (6-0)*/

match = new Match('josh', 'peter')

match.players[0].games = 5;
match.players[1].games = 0;


match.pointWonBy("josh");
match.pointWonBy("josh");
match.pointWonBy("josh");
match.pointWonBy("josh");

// this will return "Game over: Score 6 - 0"
console.log(match.score());