/* globals module */

// creates a concrete object from class only one type per object creator
// create(init args...)
// onPoolLeave(obj)
// onPoolEnter(obj)

function ObjectFactory() {
    'use strict';
    //override me
}
module.exports = ObjectFactory;

//should instanciate new object with some apropriate defaults
ObjectFactory.prototype.createObject = function(){
    'use strict';
    //override me
};

//should initialize the object with arguments provided if any
//object is about to leave pool (object is taken from pool) initialize the object with arguments provided
ObjectFactory.prototype.initObject = function(object/*, ...*/){ //jshint ignore: line
    'use strict';
    //override me
};

//should reset the object to a state apropriate for storing in the pool
//object is returning to pool (object freed) reset it to the default state
ObjectFactory.prototype.resetObject = function(object){ //jshint ignore: line
    'use strict';
    //override me
};

ObjectFactory.prototype.destroyObject = function(object){ //jshint ignore: line
    'use strict';
    //override me
};
