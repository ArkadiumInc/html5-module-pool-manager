/* globals module */

function Pool(objectFactory, poolInitialSize, poolGrowIncrement){
    'use strict';
    this._factory = objectFactory;
    this._initialSize = poolInitialSize || 10;
    this._growBy = poolGrowIncrement || 2;

    this._objects = [];
    while(this._objects.length < this._initialSize) { //prepopulate pool
        this._objects.push(this._factory.create());
    }
}
module.exports = Pool;

Pool.prototype.getObject = function(/*...*/){
    'use strict';
    if(!this._objects.length) { //pool needs to be grown
        while(this._objects.length < this._growBy) {
            this._objects.push(this._factory.create());
        }
    }

    var object = this._objects.pop();
    this._factory.initObject.apply(this._factory, arguments);
    return object;
};

Pool.prototype.returnObject = function(object){
    'use strict';
    //check if object already in pool
    //if it is then it's noop
    for(var i=0; i<this._objects.length; i++){
        if(this._objects[i] === object) {
            console.log('Trying to return object to pool that is already in pool');
            return;
        }
    }

    this._factory.resetObject(object);
    this._objects.push(object);
};
