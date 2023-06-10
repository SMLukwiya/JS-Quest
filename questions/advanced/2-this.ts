const MD = `
### 2. How does the "this" keyword work in JavaScript? Provide examples of different scenarios where "this" behaves differently?
<details><summary><strong><u>Why ask this question?</u></strong></summary>
 
An interviewer would ask such a question to engage your conceptual understanding of:
- context and scope in relation to the "this" keyword, the lexical this and the execution context of a this-aware function.
- Object oriented programming concepts and how "this" is treated.
- the common and potential pitfalls of the "this" keyword as this-aware code is passed around in a program

</details>

<details><summary><strong><u>Explanation</u></strong></summary>

Contrary to explicit parameters passed to a function, "this" is almost always an implicit parameter that is passed in
a function. Notice I said 'almost'. Implicit means not indicated/said out loud.

"this" is related to lexical scope in a way that, lexical scope and closures represent a static context that is defined 
during code authoring. A function's variable references are evaluated and resolved in a fixed context that is guaranteed
to not be affected during runtime. This means that variables will always hold references to the same environment in which
they were originally defined during code authoring.
"this" represents a dynamic context that could change depending on how the function is called.
The safest way to know the context of a "this" is to see the call-site of a function (otherwise, where and how the function is invoked).
Assuming the context that "this" refers to cannot be determined by simply looking at the function definition.

The context that "this" refers to can be determined in several ways.

${"```"}
let coolPerson = {
    firstName: "Lukwiya",
    lastName: " Wizzy",
    facts: null,

    fullName() {
        return this.firstName + this.lastName
    },

    setFacts(facts) {
        this.facts = facts
    },

    sayFacts() {
        return this.facts
    }
}
${"```"}

- First way is to invoke a function with **implicit context**.
${"```"}
coolPerson.fullName(); 
// Lukwiya Wizzy
${"```"}
Here we bind this to the \`coolPerson\` object and invoke the method \`fullName\` with "this" referencing the object.

- Second way is to invoke a function with the **default context**. The default context is the \`globalThis\` when not in strict mode
and its \`undefined\` when in strict. \`globalThis\` in browser would default to the \`window\` object and in node default to
\`global\`.
${"```"}
const fullName = coolPerson.fullName;
fullName()
// TypeError: Cannot read properties of undefined (reading 'firstName'); in strict mode
// undefined; in non strict mode
${"```"}
Here there is implicit binding and there is no mechanism used to set the "this" context. So the default behavior of JavaScript
kicks in and sets the context to undefined in "strict" mode and to the \`globalThis\` in non-strict mode.

- Third way is to invoke a function with **explicit binding**
${"```"}
const fullName = coolPerson.fullName;
fullName.call(coolPerson)
// Lukwiya Wizzy
fullName.apply(coolPerson)
// Lukwiya Wizzy

const anotherCoolGuy = {
    firstName: "Lukwiya",
    lastName: " Jon Snow"
}

fullName.call(anotherGuy) 
// Lukwiya Jon Snow
fullName.apply(anotherGuy)
// Lukwiya Jon Snow
${"```"}
Here, both \`call\` and \`apply\` are methods on the \`Function.prototype\` that take their first argument as a "this"
context value.
We introduced another object \`anotherCoolGuy\` to show the change in context.

- The fourth way is with the **\`new\`** that creates a new context as seen in classes
${"```"}
class CoolGuy {
    constructor(fName, lName) {
        this.firstName = fName
        this.lastName = lName
    }

    fullName() {
        return this.firstName + " " + this.lastName
    }
}

const person = new CoolGuy("Lukwiya", "DiCaprio")
person.fullName()
// Lukwiya DiCaprio

const anotherPerson = new CoolGuy("Lukwiya", "Snoop")
anotherPerson.fullName()
// Lukwiya Snoop
${"```"}
The \`new\` keyword creates a brand new instance of a class, it sets the \`Prototype\` of the new instance to the class'
\`constructor.prototype\` and assigns the "this" context to point to the newly created instance.

**"this" in arrow functions**

Arrow functions resolve the "this" lexically, "this" in an arrow function behaves like a normal lexical scope variable.
Arrow functions have no special "this" behavior and there will treat a "this" inside it as a normal variable and traverses the scope
until it encounters the first \`function\` with a "this"-assigning behavior.

**bind**

\`bind\` method is used to create a new bound version of a function where the "this" context is preset and fixed.
${"```"}
const boundFullName = coolPerson.fullName.bind(coolPerson)
boundFullName()
// Lukwiya Wizzy

const newPerson = {
    firstName: "Lukwiya",
    lastName: "Dwayne J"
}

boundFullName.call(newPerson)
// Lukwiya Wizzy
boundFullName.apply(newPerson)
// Lukwiya Wizzy
${"```"}
Here the new bound function can not be overridden by using \`call\` or \`apply\`

**Special class behavior**

${"```"}
class Person {
    constructor(fName, lName) {
        this.firstName = fName
        this.lastName = lName
    }

    fullName() {
        return this.firstName + " " + this.lastName
    }

    fullNameArrow = () => {
        return this.firstName + " " + this.lastName
    }
}

const person = new Person("Lukwiya", "Sheldon")
const anotherPerson = new Person("Lukwiya", "James Bond")

let g = person.fullName
let f = anotherPerson.fullNameArrow

console.log(g())
// Cannot read properties of undefined (reading 'firstName')
console.log(f())
// Lukwiya James Bond 
${"```"}
The strange behavior seen above where calling \`g()\` leads to an error and calling \`f()\` works fine is because,
normal method definitions creates the function on the \`constructor.prototype\` of the class so that the method
is shared by all instances of the class. So, \`fullName\` is actually not available on this instance directly, it's
available on the class prototype.
**Why does \`f()\` work then**, arrow function defined like so in a \`class\` is created as an instance property 
when creating new instances, they are not attached to the \`constructor.prototype\`, so fullNameArrow is actually available on the 
instance as an instance property. Because \`class\` in JavaScipt pre-binds function context,
${"```"}
let f = anotherPerson.fullNameArrow
${"```"}
\`f\` in this case references a bound \`fullNameArrow\` on a particular instance. This is done to maintain correct value of "this"
within class methods like seen above.
</details>
`;

export default MD;
