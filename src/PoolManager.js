/* globals module, require */

var Pool = require('./Pool');

function PoolManager(){
    'use strict';
    this._pools = {};
}
module.exports = PoolManager;

PoolManager.prototype.destroy = function() {
    for(var k in this._pools) {
        if(this._pools.hasOwnProperty(k)) {
            var pool = this._pools[k];
            pool.destroy();
            this._pools[k] = null;
        }
    }
};

PoolManager.prototype.registerPool = function(name, objectFactory, initialSize, growIncrement) {
    'use strict';
    if(this._pools[name]) {
        throw new Error('Pool with name '+name+' already exists.');
    }
    this._pools[name] = new Pool(objectFactory, initialSize, growIncrement);
};

PoolManager.prototype.getPool = function(name) {
    'use strict';
    var pool = this._pools[name];
    if(!pool) {
        throw new Error('No pool with name '+name+' exists.');
    }
    return pool;
};
