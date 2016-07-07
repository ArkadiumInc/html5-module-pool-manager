# Pool Manager module

* ObjectFactory -- interface for integrating objects with pools
* Pool -- manages collection of reusable objects to avoid costly extra instantiation
* PoolManager -- help to manage a collection of pools

## ObjectFactory Usage Example

```javascript
var ObjectFactory = require('arkadium-pool-manager').ObjectFactory;

function MyObjectFactory() {
    ObjectFactory.call(this);
}

MyObjectFactory.prototype.createObject = function(){
    return {state: "created"};
};

MyObjectFactory.prototype.initObject = function(object/*, ...*/){
    object.state = "initialized";
};

ObjectFactory.prototype.resetObject = function(object){
    object.state = "reset";
};

ObjectFactory.prototype.destroyObject = function(object){
    object.state = null;
};
```

## Pool Usage Example

```javascript
//It's assumed there is already an ObjectFactory created named myFactory
//One have to create an object factory for creating theirs object first
//On how to use ObjectFactory see the example above (ObjectFactory Usage Example)

var Pool = require('arkadium-pool-manager').Pool;

var pool = new Pool(myFactory);

var pooledObj = pool.takeObject(argumentToObject1, argumentToObject2);

//use obj in the way you would like it

pool.returnObject(pooledObj);

pool.destroy(); //don't forget to destroy when not needed anymore
```

## PoolManager Usage Example

```javascript
//It's assumed there is already an ObjectFactory created named myFactory1 and myFactory2

var PoolManager = require('arkadium-pool-manager').PoolManager;

var poolManager = new PoolManager();

var MY_POOL_1 = 'pool_myFactory1';
var MY_POOL_2 = 'pool_myFactory2';

poolManager.registerPool(MY_POOL_1, myFactory1);
poolManager.registerPool(MY_POOL_2, myFactory2);

var myPool1 = poolManager.getPool(MY_POOL_1);

//then use myPool1 pool as usual. For example usage of pool see above (Pool Usage Example)

//be careful not to call .destroy() on individual pools that belong to a pool manager.

var myPool2 = poolManager.getPool(MY_POOL_2);

//use myPool2 as usual

poolManager.destroy(); //don't forget to destroy when not needed anymore
```
