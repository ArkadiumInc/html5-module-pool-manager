/* globals describe, require, beforeEach, afterEach, it, expect */

describe('Object Factory tests', function() {
    'use strict';
    var PoolManagerModule = require('../index.js');
    var objectFactory = null;

    beforeEach(function() {
        objectFactory = new PoolManagerModule.ObjectFactory();
    });

    afterEach(function() {
        objectFactory.destroy();
        objectFactory = null;
    });

    it('Test are not done yet', function(){
        fail('test are not yet implemented');
    });

    it('Test object factory definition', function() {
        expect(objectFactory).not.toBe(null);
    });
});
