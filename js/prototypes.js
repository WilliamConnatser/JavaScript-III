/*
  Object oriented design is commonly used in video games.  For this part of the assignment you will be implementing several constructor functions with their correct inheritance hierarchy.

  In this file you will be creating three constructor functions: GameObject, CharacterStats, Humanoid.  

  At the bottom of this file are 3 objects that all end up inheriting from Humanoid.  Use the objects at the bottom of the page to test your constructor functions.
  
  Each constructor function has unique properties and methods that are defined in their block comments below:
*/

/*
  === GameObject ===
  * createdAt
  * name
  * dimensions (These represent the character's size in the video game)
  * destroy() // prototype method that returns: `${this.name} was removed from the game.`
*/

function GameObject(args) {
  this.createdAt = args.createdAt;
  this.name = args.name;
  this.dimensions = args.dimensions;
}

GameObject.prototype.destroy = function () {
  return `${this.name} was removed from the game.`;
}

/*
  === CharacterStats ===
  * healthPoints
  * takeDamage() // prototype method -> returns the string '<object name> took damage.'
  * should inherit destroy() from GameObject's prototype
*/

function CharacterStats(args) {
  this.healthPoints = args.healthPoints;
  GameObject.call(this, args); //Gain access to parent's arguments
}

CharacterStats.prototype = Object.create(GameObject.prototype); //Gain access to parent's prototypes
CharacterStats.prototype.takeDamage = function () {
  return `${this.name} took damage.`;
}

/*
  === Humanoid (Having an appearance or character resembling that of a human.) ===
  * team
  * weapons
  * language
  * greet() // prototype method -> returns the string '<object name> offers a greeting in <object language>.'
  * should inherit destroy() from GameObject through CharacterStats
  * should inherit takeDamage() from CharacterStats
*/


function Humanoid(args) {
  this.team = args.team;
  this.weapons = args.weapons;
  this.language = args.language;
  CharacterStats.call(this, args);
}

Humanoid.prototype = Object.create(CharacterStats.prototype);
Humanoid.prototype.greet = function () {
  return `${this.name} offers a greeting in ${this.language}.`;
}

/*
 * Inheritance chain: GameObject -> CharacterStats -> Humanoid
 * Instances of Humanoid should have all of the same properties as CharacterStats and GameObject.
 * Instances of CharacterStats should have all of the same properties as GameObject.
 */

// Test you work by un-commenting these 3 objects and the list of console logs below:


const mage = new Humanoid({
  createdAt: new Date(),
  dimensions: {
    length: 2,
    width: 1,
    height: 1,
  },
  healthPoints: 5,
  name: 'Bruce',
  team: 'Mage Guild',
  weapons: [
    'Staff of Shamalama',
  ],
  language: 'Common Tongue',
});

const swordsman = new Humanoid({
  createdAt: new Date(),
  dimensions: {
    length: 2,
    width: 2,
    height: 2,
  },
  healthPoints: 15,
  name: 'Sir Mustachio',
  team: 'The Round Table',
  weapons: [
    'Giant Sword',
    'Shield',
  ],
  language: 'Common Tongue',
});

const archer = new Humanoid({
  createdAt: new Date(),
  dimensions: {
    length: 1,
    width: 2,
    height: 4,
  },
  healthPoints: 10,
  name: 'Lilith',
  team: 'Forest Kingdom',
  weapons: [
    'Bow',
    'Dagger',
  ],
  language: 'Elvish',
});

console.log(mage.createdAt); // Today's date
console.log(archer.dimensions); // { length: 1, width: 2, height: 4 }
console.log(swordsman.healthPoints); // 15
console.log(mage.name); // Bruce
console.log(swordsman.team); // The Round Table
console.log(mage.weapons); // Staff of Shamalama
console.log(archer.language); // Elvish
console.log(archer.greet()); // Lilith offers a greeting in Elvish.
console.log(mage.takeDamage()); // Bruce took damage.
console.log(swordsman.destroy()); // Sir Mustachio was removed from the game.


// Stretch task: 
// * Create Villain and Hero constructor functions that inherit from the Humanoid constructor function.  
// * Give the Hero and Villains different methods that could be used to remove health points from objects which could result in destruction if health gets to 0 or drops below 0;
// * Create two new objects, one a villain and one a hero and fight it out with methods!

function Villain(args) {
  Humanoid.call(this, args);
}

Villain.prototype = Object.create(Humanoid.prototype);
Villain.prototype.nuclearBomb = function (target) {
  if (target.healthPoints <= 0) {
    console.log(`${target.name} is already dead. :\\`);
    return;
  }
  const attackDamage = 5;
  console.log(`${target.name} was attacked by ${this.name} for ${attackDamage} health.`);
  target.healthPoints -= 5;
  if (target.healthPoints <= 0) {
    target.destroy();
  }

  return target;
}

function Hero(args) {
  Humanoid.call(this, args);
}

Hero.prototype = Object.create(Humanoid.prototype);
Hero.prototype.guidedMissiles = function (target) {

  if (target.healthPoints <= 0) {
    console.log(`${target.name} is already dead. :\\`);
    return;
  }
  const attackDamage = 5;
  console.log(`${target.name} was attacked by ${this.name} for ${attackDamage} health.`);
  target.healthPoints -= attackDamage;

  if (target.healthPoints <= 0) {
    target.destroy();
  }

  return target;
}

const american = new Hero({
  createdAt: new Date(),
  dimensions: {
    length: 2,
    width: 2,
    height: 2
  },
  healthPoints: 10,
  name: 'America!',
  team: 'The West',
  weapons: [
    'Guided Missiles'
  ],
  language: 'English',
});



const terrorist = new Villain({
  createdAt: new Date(),
  dimensions: {
    length: 1,
    width: 2,
    height: 4
  },
  healthPoints: 10,
  name: 'Terrorist',
  team: 'ISIS',
  weapons: [
    'Nuclear Bomb'
  ],
  language: 'Arabic',
});



window.onload = function () {

  let heroInfo = document.querySelector('.hero-info');
  Object.keys(american).forEach(key => {
    heroInfo.textContent += `${key}: ${american[key]}
    `;
  });

  heroInfo.innerHTML = heroInfo.innerHTML.replace(/\n\r?/g, '<br/>');
 

  let VillainInfo = document.querySelector('.villain-info');
  Object.keys(terrorist).forEach(key => {
      VillainInfo.textContent += `${key}: ${terrorist[key]}
      `;
  });

  VillainInfo.innerHTML = VillainInfo.innerHTML.replace(/\n\r?/g, '<br/>');

  let villainAttack = document.querySelector('.villain-attack');
  let heroAttack = document.querySelector('.hero-attack');

  villainAttack.addEventListener("click", event => {
    terrorist.nuclearBomb(american);
  });

  heroAttack.addEventListener("click", event => {
    american.guidedMissiles(terrorist);
  });
}