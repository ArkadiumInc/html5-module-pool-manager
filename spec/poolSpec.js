/* globals describe, require, beforeEach, afterEach, it, expect */

describe('Pool tests', function() {
    'use strict';
    var PoolManagerModule = require('../index.js');
    var pool = null;

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

    beforeEach(function() {
        pool = new PoolManagerModule.Pool(new MyObjectFactory());
    });

    afterEach(function() {
        pool.destroy();
        pool = null;
    });

    it('Test pool definition', function() {
        expect(pool).not.toBe(null);
    });

    it('Test pool take object', function() {
        var obj = null;

        expect(function() {
            obj = pool.takeObject();
        }).not.toThrow();

        expect(obj).not.toBe(null);
        expect(obj).not.toBe(undefined);
        expect(obj.state).not.toBe(null);
        expect(obj.state).not.toBe(undefined);
        expect(obj.state).toEqual(STATE_INITIALIZED);
    });

    it('Test pool take object with parameters', function() {
        var obj = null;

        expect(function() {
            obj = pool.takeObject(42);
        }).not.toThrow();

        expect(obj).not.toBe(null);
        expect(obj).not.toBe(undefined);
        expect(obj.param).not.toBe(null);
        expect(obj.param).not.toBe(undefined);
        expect(obj.param).toEqual(42);
    });

    it('Test pool return object', function() {
        var obj = {};

        expect(function() {
            pool.returnObject(obj);
        }).not.toThrow();

        expect(obj).not.toBe(null);
        expect(obj).not.toBe(undefined);
        expect(obj.state).not.toBe(null);
        expect(obj.state).not.toBe(undefined);
        expect(obj.state).toEqual(STATE_RESET);
    });

    it('Test pool return object twice', function() {
        var obj = {};

        expect(function() {
            pool.returnObject(obj);
        }).not.toThrow();

        expect(function() {
            pool.returnObject(obj);
        }).toThrow();
    });

    it('Test pool destroy, verify objects destroyed', function() {
        var obj;

        expect(function() {
            obj = pool.takeObject();
        }).not.toThrow();

        expect(function() {
            pool.returnObject(obj);
        }).not.toThrow();

        expect(function() {
            pool.destroy();
        }).not.toThrow();

        expect(obj).not.toBe(null);
        expect(obj).not.toBe(undefined);
        expect(obj.state).not.toBe(null);
        expect(obj.state).not.toBe(undefined);
        expect(obj.state).toEqual(STATE_DESTROYED);
    });

    it('Test pool destroy, verify taken object is not destroyed', function() {
        var obj;

        expect(function() {
            obj = pool.takeObject();
        }).not.toThrow();

        expect(function() {
            pool.destroy();
        }).not.toThrow();

        expect(obj).not.toBe(null);
        expect(obj).not.toBe(undefined);
        expect(obj.state).not.toBe(null);
        expect(obj.state).not.toBe(undefined);
        expect(obj.state).toEqual(STATE_INITIALIZED);
    });
});
