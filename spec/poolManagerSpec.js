/* globals describe, require, beforeEach, afterEach, it, expect */

describe('Pool tests', function() {
    'use strict';
    var PoolManagerModule = require('../index.js');
    var poolManager = null;

    var STATE_CREATED = 0;
    var STATE_INITIALIZED = 1;
    var STATE_RESET = 2;
    var STATE_DESTROYED = 3;

    function MyObjectFactory() {
        PoolManagerModule.ObjectFactory.call(this);
    }

    MyObjectFactory.prototype.createObject = function() {
        return {
            state: STATE_CREATED,
            param: null
        };
    };

    MyObjectFactory.prototype.initObject = function(obj, param) {
        obj.state = STATE_INITIALIZED;
        obj.param = param;
    };

    MyObjectFactory.prototype.resetObject = function(obj) {
        obj.state = STATE_RESET;
    };

    MyObjectFactory.prototype.destroyObject = function(obj) {
        obj.state = STATE_DESTROYED;
    };

    var POOL_NAME_1 = 'pool1';
    var POOL_NAME_2 = 'pool2';

    beforeEach(function() {
        poolManager = new PoolManagerModule.PoolManager();
    });

    afterEach(function() {
        poolManager.destroy();
        poolManager = null;
    });

    it('Test PoolManager definition', function() {
        expect(poolManager).not.toBe(null);
    });

    it('Test pool manager register pool', function() {
        expect(function() {
            poolManager.registerPool(POOL_NAME_1, new MyObjectFactory());
        }).not.toThrow();
    });

    it('Test pool manager register multiple pools', function() {
        expect(function() {
            poolManager.registerPool(POOL_NAME_1, new MyObjectFactory());
            poolManager.registerPool(POOL_NAME_2, new MyObjectFactory());
        }).not.toThrow();
    });

    it('Test pool manager register pool with already existent name', function() {
        expect(function() {
            poolManager.registerPool(POOL_NAME_1, new MyObjectFactory());
            poolManager.registerPool(POOL_NAME_1, new MyObjectFactory());
        }).toThrow();
    });

    it('Test pool manager pool get', function() {
        poolManager.registerPool(POOL_NAME_1, new MyObjectFactory());

        var pool = null;
        expect(function(){
            pool = poolManager.getPool(POOL_NAME_1);
        }).not.toThrow();

        expect(pool).not.toBe(null);
        expect(pool).not.toBe(undefined);
        expect(pool.constructor).toBe(PoolManagerModule.Pool);
    });

    it('Test pool manager multiple pools get', function () {
        poolManager.registerPool(POOL_NAME_1, new MyObjectFactory());
        poolManager.registerPool(POOL_NAME_2, new MyObjectFactory());

        var pool1 = null;
        expect(function(){
            pool1 = poolManager.getPool(POOL_NAME_1);
        }).not.toThrow();

        expect(pool1).not.toBe(null);
        expect(pool1).not.toBe(undefined);
        expect(pool1.constructor).toBe(PoolManagerModule.Pool);

        var pool2 = null;
        expect(function(){
            pool2 = poolManager.getPool(POOL_NAME_2);
        }).not.toThrow();

        expect(pool2).not.toBe(null);
        expect(pool2).not.toBe(undefined);
        expect(pool2.constructor).toBe(PoolManagerModule.Pool);
    });

    it('Test pool manager get same pool', function() {
        poolManager.registerPool(POOL_NAME_1, new MyObjectFactory());

        var pool1 = null;
        expect(function(){
            pool1 = poolManager.getPool(POOL_NAME_1);
        }).not.toThrow();

        expect(pool1).not.toBe(null);
        expect(pool1).not.toBe(undefined);
        expect(pool1.constructor).toBe(PoolManagerModule.Pool);

        var pool2 = null;
        expect(function(){
            pool2 = poolManager.getPool(POOL_NAME_1);
        }).not.toThrow();

        expect(pool2).not.toBe(null);
        expect(pool2).not.toBe(undefined);
        expect(pool2.constructor).toBe(PoolManagerModule.Pool);
        expect(pool2).toBe(pool1);
    });
});
