/* The for principles of "this";
 * in your own words. explain the four principle for the "this" keyword below.
 *
 * 1. 
 * 2. 
 * 3. 
 * 4. 
 *
 * write out a code example of each explanation above
 */

// Principle 1

// this will always reference the window outside of objects and inside arrow functions
// ... Unless a function is bound using .bind, .apply, or .call

// code example for Window Binding
console.log(this, 'should always be the Window')

// Principle 2

// Implicit binding occurs naturally inside of objects.
// The value of this is assigned to the object

// code example for Implicit Binding
const aPotato = {
    potato: "potato",
    showPotato: function () {
        console.log(this.potato);
    }
}

aPotato.showPotato();

// Principle 3

// new Binding binds the value of this to that of an Object Literal
// The Object literal is defined in what's known as a constructor function

// code example for New Binding
const APotato = function (arguments) {
    this.potato = arguments.potato;
    this.showPotato = function () {
        console.log(this.potato);
    }
}

const coldPotato = new APotato({
    potato: "cold potato"
});

coldPotato.showPotato();

// Principle 4

// An explicit binding occurs when a function's this value is bound to an object outside its scope

// code example for Explicit Binding

const potatoType = {
    type: "HOT!"
}

function hotPotato() {
    console.log(this.type + " potatooooos!");
};

hotPotato.call(potatoType);