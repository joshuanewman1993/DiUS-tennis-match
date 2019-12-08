const Match = require('../src/Match')

/* This example is a match going to 6-6 on games and going into a tie break */

match = new Match('josh', 'peter')

match.players[0].games = 5;
match.players[1].games = 5;


match.pointWonBy("josh");
match.pointWonBy("josh");
match.pointWonBy("josh");
match.pointWonBy("josh");


match.pointWonBy("peter");
match.pointWonBy("peter");
match.pointWonBy("peter");
match.pointWonBy("peter");



// this will return "Tie-Break : 0 - 0"
console.log(match.score());