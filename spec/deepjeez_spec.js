var expect = require('chai').expect;
var DJ = require('../lib/deepjeez.js').DeepJeez;

describe('DeepJeez', function() {
  describe('#define', function() {
    it('defines module', function() {
      var mod = 'mod1';
      expect(DJ.isDefined(mod)).to.eq(false);
      DJ.define(mod);
      expect(DJ.isDefined(mod)).to.eq(true);
    });

    it('defines module by calling a factory', function() {
      DJ.define('mod2', function() {
        return 'ret2';
      });

      expect(DJ.require('mod2')).to.eq('ret2');
    });

    it('defines module with dependencies', function(done) {
      DJ.define('mod3', ['mod4'], function(mod4) {
        expect(mod4).to.eq('ret4');
        done();
        return 'ret3';
      });

      expect(DJ.isDefined('mod3')).to.eq(false);

      DJ.define('mod4', function(){
        return 'ret4';
      });

      expect(DJ.isDefined('mod3')).to.eq(true);
    });
  });

  describe("require", function() {
    it('returns required module', function() {
      DJ.define('mod5', function() {
        return 'ret5';
      });

      expect(DJ.require('mod5')).to.eq('ret5');
    });

    it('call factory with resolved dependencies', function(done) {
      DJ.require(['mod2', 'mod5'], function(mod2, mod5) {
        expect(mod2).to.eq('ret2');
        expect(mod5).to.eq('ret5');
        done();
      });
    });

    it('call factory with resolved dependencies', function(done) {
      DJ.require('mod2', 'mod5', function(mod2, mod5) {
        expect(mod2).to.eq('ret2');
        expect(mod5).to.eq('ret5');
        done();
      });
    });
  });
});
