/* globals describe, require, beforeEach, afterEach, it, expect */

describe('Pool tests', function() {
    'use strict';
    var PoolManagerModule = require('../index.js');
    var pool = null;

    beforeEach(function() {
        pool = new PoolManagerModule.Pool();
    });

    afterEach(function() {
        pool.destroy();
        pool = null;
    });

    it('Test are not done yet', function(){
        fail('test are not yet implemented');
    });

    it('Test pool definition', function() {
        expect(pool).not.toBe(null);
    });
});
