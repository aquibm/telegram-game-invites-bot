import { expect } from 'chai';
import Bot from './index';

describe('bot suite', () => {
    it('should always pass', () => {
        expect(true).to.be.true;
    });

    it('should always pass as well', () => {
        expect(false).to.be.false;
    });
    
    it('should build a bot', () => {
        expect(() => {
            const bot = new Bot();
        }).to.not.throw();
    });
});