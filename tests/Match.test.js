const { expect } = require('chai');
const Match = require('../src/Match')

describe('Match tests', () => {
    let match;
    beforeEach(() => {
        match = new Match('josh', 'peter')
    })
    it('should intialize two players when match starts', () => {
        expect(match.players).to.be.an('array');
        expect(match.players[0].playerName).to.deep.equal('josh');
        expect(match.players[1].playerName).to.deep.equal('peter');
    });
    it('should have a points reference key', () => {
        expect(match.points).to.be.an('object');
        const points = {
            0: '0',
            1: '15',
            2: '30',
            3: '40',
        }
        expect(match.points).to.deep.equal(points);
    });
    describe('PointWonByMethod', () => {
        it('should add a point to the player', () => {
            match.pointWonBy('peter');
            const result = match.score();
            expect(result).to.deep.equal('Games: 0-0 Points: 0-15');
        });
        it('should add a point the player and win the game', () => {
            match.players[1].points = 3;
            match.pointWonBy('peter');
            const result = match.score();
            expect(result).to.deep.equal('Games: 0-1 Points: 0-0');
        });
        it('should add a point the player and win the match', () => {
            match.players[1].games = 5;
            match.players[0].games = 2;
            match.players[1].points = 3;

            match.pointWonBy('peter');
            const result = match.score();
            expect(result).to.deep.equal('Game over: Score 2 - 6');
        });
        describe('Tie-Break', () => {
            it('should should hit the tie break logic and switch to tie break scoring', () => {
                match.players[1].games = 5;
                match.players[0].games = 6;
                match.players[1].points = 3;
                match.pointWonBy('peter');
                const result = match.score();
                expect(result).to.deep.equal('Tie-Break : 0 - 0');
            });
            it('should increment the points by one on the tie break', () => {
                match.players[1].games = 6;
                match.players[0].games = 6;
                match.pointWonBy('peter');
                const result = match.score();
                expect(result).to.deep.equal('Tie-Break : 0 - 1');

                match.pointWonBy('josh');
                const secondResult = match.score();
                expect(secondResult).to.deep.equal('Tie-Break : 1 - 1');
            });
        });
        describe('Deuce/Advantage', () => {
            it('should return back deuce scoreline if score is 40-40 ', () => {
                match.players[1].points = 2;
                match.players[0].points = 2;
                match.pointWonBy('peter');
                match.pointWonBy('josh');

                const result = match.score();
                expect(result).to.equal('Deuce');
            });
            it('should toggle advantage off and on for player ', () => {
                match.players[1].points = 2;
                match.players[0].points = 2;
                match.pointWonBy('peter');
                match.pointWonBy('josh');
                match.pointWonBy('peter');

                const result = match.score();
                expect(result).to.equal('Advantage peter');
            });
            it('should win the game if player wins another point with advantage ', () => {
                match.players[1].points = 2;
                match.players[0].points = 2;
                match.pointWonBy('peter');
                match.pointWonBy('josh');
                match.pointWonBy('peter');
                match.pointWonBy('peter');
                const result = match.score();
                expect(result).to.equal('Games: 0-1 Points: 0-0');
            });
        });
        describe('Resetting point board', () => {
            it('should reset the points tally when a game is won', () => {
                match.players[1].points = 2;
                match.players[0].points = 3;
                match.pointWonBy('josh');
                const result = match.score();
                expect(result).to.equal('Games: 1-0 Points: 0-0');
                const expected = [
                    { playerName: 'josh', points: 0, games: 1, hasAdvantage: false },
                    { playerName: 'peter', points: 0, games: 0, hasAdvantage: false }
                ];
                expect(match.players).to.deep.equal(expected);
            });

        });
        describe('Getter methods', () => {
            it('should return true if its a tie break', () => {
                match.players[1].games = 6;
                match.players[0].games = 6;
                const result = match.tieBreak;
                expect(result).to.equal(true);
            });
            it('should return false if its not a tie break', () => {
                match.players[1].games = 5;
                match.players[0].games = 6;
                const result = match.tieBreak;
                expect(result).to.equal(false);
            });
            it('should return true if the game has been won by a tie break', () => {
                match.players[1].games = 6;
                match.players[0].games = 7;
                const result = match.gameOver;
                expect(result).to.equal(true);
            });
            it('should return false if the game has not been won', () => {
                match.players[1].games = 6;
                match.players[0].games = 6;
                const result = match.gameOver;
                expect(result).to.equal(false);
            });
            it('should return true if the match has been one by a difference of two games', () => {
                match.players[1].games = 6;
                match.players[0].games = 3;
                const result = match.gameOver;
                expect(result).to.equal(true);
            });
            it('should return false if the match has not been one by a difference of two games', () => {
                match.players[1].games = 6;
                match.players[0].games = 5;
                const result = match.gameOver;
                expect(result).to.equal(false);
            });
        });
    });
});