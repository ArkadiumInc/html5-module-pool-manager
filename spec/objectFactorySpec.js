/* globals describe, require, beforeEach, afterEach, it, expect */

describe('Object Factory tests', function() {
    'use strict';
    var PoolManagerModule = require('../index.js');
    var objectFactory = null;

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
        objectFactory = new MyObjectFactory();
    });

    afterEach(function() {
        objectFactory = null;
    });

    // it('Test are not done yet', function(){
    //     fail('test are not yet implemented');
    // });

    it('Test object factory definition', function() {
        expect(objectFactory).not.toBe(null);
    });

    it('Test object factory object creation', function() {
        var obj;
        expect(function() {
            obj = objectFactory.createObject();
        }).not.toThrow();

        expect(obj).not.toBe(null);
        expect(obj).not.toBe(undefined);
        expect(obj.state).not.toBe(null);
        expect(obj.state).not.toBe(undefined);
        expect(obj.state).toEqual(STATE_CREATED);
    });

    it('Test object factory object initialization', function() {
        var obj = {};

        expect(function() {
            objectFactory.initObject(obj);
        }).not.toThrow();

        expect(obj.state).not.toBe(null);
        expect(obj.state).not.toBe(undefined);
        expect(obj.state).toEqual(STATE_INITIALIZED);
    });

    it('Test object factory object initialization with parameter', function() {
        var obj = {};

        expect(function() {
            objectFactory.initObject(obj, 42);
        }).not.toThrow();

        expect(obj.param).not.toBe(null);
        expect(obj.param).not.toBe(undefined);
        expect(obj.param).toEqual(42);
    });

    it('Test object factory object reset', function() {
        var obj = {};

        expect(function() {
            objectFactory.resetObject(obj);
        }).not.toThrow();

        expect(obj.state).not.toBe(null);
        expect(obj.state).not.toBe(undefined);
        expect(obj.state).toEqual(STATE_RESET);
    });

    it('Test object factory object destroy', function() {
        var obj = {};

        expect(function() {
            objectFactory.destroyObject(obj);
        }).not.toThrow();

        expect(obj.state).not.toBe(null);
        expect(obj.state).not.toBe(undefined);
        expect(obj.state).toEqual(STATE_DESTROYED);
    });
});
