const Match = require('../src/Match')

/* This example is a game going to Deuce (40-40) */

match = new Match('josh', 'peter')

match.pointWonBy("josh");
match.pointWonBy("josh");
match.pointWonBy("josh");

match.pointWonBy("peter");
match.pointWonBy("peter");
match.pointWonBy("peter");


// this will return "Deuce"
console.log(match.score());