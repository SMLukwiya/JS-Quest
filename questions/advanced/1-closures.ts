const MD = `
### 1. Explain what closures are, describe the potential memory implications and possible memory optimization?
<details><summary><strong><u>Why ask this question?</u></strong></summary>
 
An interviewer would ask such a question to engage your conceptual understanding of closures, 
engage your ability to reason about closures and their implications, as well as your ability to identify and resolve
issues related to closures. Other similar ways such a question can be asked may include: 
- How does garbage collection work with closures in JavaScript and how memory is managed?
</details>

<details><summary><strong><u>Explanation</u></strong></summary>

Closure is a concept associated with functions, that allows a function to hold reference to variables in its outer scope over time.

Closures build on the principle of least exposure (POLE) that encourages limiting the scope exposure of variables. Instead of putting
variables in the global scope, we can narrow scope but still preserve access from inside the function.
This is helpful in avoiding common pitfalls associated with scoping like name collision. Closure can be observed when a function
is invoked, and it must be invoked in a different scope from the where it was defined.
Closure allows a function to continue access to its outer variables even after the outer scope is finished, it prevents the outer variables from 
being garbage collected immediately the outer scope is finished.
${"```"}
// scope 1 (global scope)

function outerFunction(name) {
    // scope 2 (function scope)

    let option = "Start a ponzi scheme"

    return function innerFunction(greeting) {
        // scope 3 (function scope)

        let sentence = greeting + ' ' + name + ', would you like to ' + options
        console.log(sentence)
        return sentence
    }
}

let lifeOptionsOne = outerFunction("Lukwiya")
lifeOptionsOne("Hi"); // Hi Lukwiya, would you like to Start a ponzi scheme

let lifeOptionsTwo = outerFunction("Wizzy")
lifeOptionsTwo("Hello") // Hello Wizzy, would you like to Start a ponzi scheme
${"```"}
\`outerFunction\` creates and returns \`innerFunction\`. We call \`outerFunction\` twice to create two instances of the
\`innerFunction\`. We can observe and see that after the two function calls to \`outerFunction\`, the \`option\` variable
would have been garbage collected by now, but the behavior is different. \`innerFunction\` makes reference to both the \`name\`
parameter and \`option\` from its enclosing scope. The reference from the inner function to its outer scope variable is
a closure. As a result of closure, the completion of the \`outerFunction\` does not destroy its scope and garbage collect its
variables, they stick around in memory and are later referenced by the \`lifeOptionsOne\` and \`lifeOptionsTwo\` functions.
Closure is based on lexical scope but it's real behavior is observed at runtime.

A closure preserves a live link to the actual variable, this means that we have to power to both read from and write to 
the closed over variable as long as the reference to the function holding a closure over the variable still exists in 
the program. 
${"```"}
function counter() {
    let count = 0

    return function() {
        count = count + 1
        console.log(count)
        return count
    }
}

let increment = counter()
increment() // 1
increment() // 2
${"```"}

It's important to note that closures are variable-oriented and not value-oriented. This means that the closure is held over
a variable that can be updated and not a single value of the variable. So take note.

It is easy to confuse normal lexical scope to closures, we shall look at a code sample to differentiate the two. When the invocation of a function
happens in the same scope, that represents normal lexical scope. With this observation, global scope variables can not therefore be closed over as
they can be accessed from anywhere, all functions invoked in your program are descendants of the global scope.

${"```"}
// global scope
let name = 'Lukwiya'

function getName() {
    return function() {
        console.log(name)
        return name
    }
}

let myName = getName()
myName() // Lukwiya
${"```"}

This is just normal lexical scope in action

In closure, if there is no function invocation, closure can not be observed.
To satisfy the definition of a closure, these three concepts must be fulfilled:
- The closure must be a function
- The function must reference at least one variable from its outer scope
- The invocation of the function must occur in a different scope

Because the lifecycle of a closure is tied to that of the function instance, the closure over a variable will last as long as a reference to
that function exists. It is only after the very last function reference is destroyed that the variables get garbage collected.
Since closure can prevent the garbage collection of variables, which consume memory over time, it's important to consider this impact
when building an efficient and performant program. It is important to discard and destroy all function reference when no longer needed to be
able to free up memory.
${"```"}
function eventHandler(element) {
    let handler;
    
    return function(cb) {
        if (cb) {
            handler = function onClick(event) {
                // handle some event
                cb(event)
            }
            element.addEventListener('click', handler)
        } else {
            element.removeEventListener('click', handler)
        }
    }
}

let registerHandler = eventHandler(getElementBySomeId("id"))

registerHandler(() => {}) // we subscribe
registerHandler() // we unsubscribe
${"```"}

Here when we call the \`eventHandler\` function, we create a closure over the passed callback, the reference to the callback passed
is held and cannot be garbage collected as long as the event handler is subscribed.
We must unsubscribe the event handler so that the function reference to the callback is destroyed. and memory released.

Depending on the optimization applied by the JS Engine that executes the code, variables in the closed over scope that 
are not directly referenced in the function are discarded, so the closure scope will not contain all the variables that were defined in it.
But there could a possibility that this optimization is not applied, and it would be safer to manually disregard the value.
Imagine a closed over variable held reference to a large value like a very large array or object that keeps growing, this would result in 
memory usage concerns.
One of the applications of closures is caching results. You need to strike a balance between memory usage and speed. If values used to
calculate results change almost everytime, using closure as a cache becomes counter intuitive because the cache keeps growing as a
result of new results and speed is compromised as well because of new calculations being performed. If you ever run into a scenario like this,
it is helpful to consider a well formed caching method that could better.
</details>
`;

export default MD;
