/* globals module */

// creates a concrete object from class only one type per object creator
// create(init args...)
// onPoolLeave(obj)
// onPoolEnter(obj)

function ObjectFactory() {
    'use strict';

}
module.exports = ObjectFactory;

//should instanciate new object with some apropriate defaults
ObjectFactory.prototype.create = function(){
    'use strict';

};

//should initialize the object with arguments provided if any
ObjectFactory.prototype.initObject = function(object/*, ...*/){ //object is about to leave pool (object is taken from pool) initialize the object with arguments provided
    'use strict';

};

//should reset the object to a state apropriate for storing in the pool
ObjectFactory.prototype.resetObject = function(object){ //object is returning to pool (object freed) reset it to the default state
    'use strict';

};
