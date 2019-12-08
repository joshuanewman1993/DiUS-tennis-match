const { expect } = require('chai');
const Match = require('../src/Match')

describe('Match outcomes', () => {
    let match;
    beforeEach(() => {
        match = new Match('josh', 'peter')
    })
    describe('Deuce', () => {
        it('should result in deuce score', () => {
            match.pointWonBy("josh");
            match.pointWonBy("josh");
            match.pointWonBy("josh");

            match.pointWonBy("peter");
            match.pointWonBy("peter");
            match.pointWonBy("peter");

            const result = match.score();
            expect(result).to.equal('Deuce');
            expect(match.players[0].points).to.equal(3);
            expect(match.players[1].points).to.equal(3);
        });
    });

    describe('Win by straight sets', () => {
        it('should win the match by straight sets', () => {
            match.players[0].games = 6;
            match.players[1].games = 0;

            const result = match.score();
            expect(result).to.equal('Game over: Score 6 - 0');
            expect(match.players[0].games).to.equal(6);
            expect(match.players[1].games).to.equal(0);
        });
    });

    describe('Win by two sets', () => {
        it('should win the match by two sets', () => {
            match.players[0].games = 6;
            match.players[1].games = 4;

            const result = match.score();
            expect(result).to.equal('Game over: Score 6 - 4');
            expect(match.players[0].games).to.equal(6);
            expect(match.players[1].games).to.equal(4);
        });
    });

    describe('Win by tie-break', () => {
        it('should win the match by winning tie-break', () => {
            match.players[0].games = 6;
            match.players[1].games = 6;

            match.pointWonBy("josh");
            match.pointWonBy("peter");
            const result = match.score();
            expect(result).to.equal('Tie-Break : 1 - 1');

            match.pointWonBy("josh");
            const secondResult = match.score();
            expect(secondResult).to.equal('Tie-Break : 2 - 1');

            match.pointWonBy("josh");
            const thirdResult = match.score();
            expect(thirdResult).to.equal('Game over: Score 7 - 6');
            expect(match.players[0].games).to.equal(7);
            expect(match.players[1].games).to.equal(6);
        });
    });
    describe('Game 5-6 goes to extra game', () => {
        it('should win the match by winning tie-break', () => {
            match.players[0].games = 5;
            match.players[1].games = 6;
            const result = match.score();
            expect(result).to.equal('Games: 5-6 Points: 0-0');

            match.pointWonBy("peter");
            match.pointWonBy("peter");
            match.pointWonBy("peter");
            match.pointWonBy("peter");

            const secondResult = match.score();
            expect(secondResult).to.equal('Game over: Score 5 - 7');
            expect(match.players[0].games).to.equal(5);
            expect(match.players[1].games).to.equal(7);
        });
    });
});