import React from 'react';
import ReactDOM from 'react-dom';

class Person {
  constructor(name, age) {
    this.name = name
    this.age = age
  }

  greet() {
    console.log('hello, my name is ', this.name)
  }
}

const arto = {
  name: 'Arto Hellas',
  age: 35,
  education: 'PhD',
  greet: function() {
    console.log('Hello, my name is', this.name)
  },
  doAddition: function(a, b) {
    console.log(a + b)
  }
}

arto.greet()
arto.growOlder = function() {
  this.age += 1
}

console.log(arto.age)
arto.growOlder()
console.log(arto.age)
arto.doAddition(1, 5)

const referenceToAddition = arto.doAddition
referenceToAddition(10, 15)

// const referenceToGreet = arto.greet This will not work since the function 
// uses this internally. To make this usable binding must be used to bind object
// so that usage of this inside the referenced method would use this object
const referenceToGreet = arto.greet.bind(arto)
referenceToGreet()
setTimeout(arto.greet.bind(arto), 1000)

const adam = new Person('Adam Ondra', 35)
adam.greet()

const janja = new Person('Janja Garnbret', 22)
janja.greet()

let App = () => <h1>Hello Playgrounds</h1>
ReactDOM.render(
  <App />,
  document.getElementById('root')
);

