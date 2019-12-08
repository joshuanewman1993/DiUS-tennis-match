const { expect } = require('chai');
const Player = require('../src/Player')

describe('Player tests', () => {
    let player;
    beforeEach(() => {
        const playerName = "player 1";
        player = new Player(playerName);
    })
    it('should have some default properties set', () => {
        expect(player.playerName).to.equal('player 1');
        expect(player.points).to.equal(0);
        expect(player.games).to.equal(0);
        expect(player.hasAdvantage).to.be.false;
    });
    it('should increment a point successfully', () => {
        player.winPoint();
        expect(player.points).to.equal(1);
    });

    it('should increment a game successfully', () => {
        player.winGame();
        expect(player.games).to.equal(1);
    });

    it('should deduct a point successfully', () => {
        player.points = 3;
        player.losePoint();
        expect(player.points).to.equal(2);
    });
    it('should add the advantage to the player successfully', () => {
        player.winsAdvantage();
        expect(player.hasAdvantage).to.be.true;
    });
    it('should deduct the advantage from the player successfully', () => {
        player.advantage = true;
        player.losesAdvantage();
        expect(player.hasAdvantage).to.be.false;
    });
});