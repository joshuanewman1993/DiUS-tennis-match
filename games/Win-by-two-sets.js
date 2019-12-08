const Match = require('../src/Match')

/* This example is a player winning by 2 sets (6-4)*/

match = new Match('josh', 'peter')

match.players[0].games = 5;
match.players[1].games = 4;


match.pointWonBy("josh");
match.pointWonBy("josh");
match.pointWonBy("josh");
match.pointWonBy("josh");

// this will return "Game over: Score 6 - 4"
console.log(match.score());