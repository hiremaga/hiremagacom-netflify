---
title: To reduce the cost of change, compose don't inherit
date: 2014-01-26
---

What follows is a note to some of my colleagues in early 2014, as we transitioned from writing mainly Ruby to writing Go. Published belatedly in 2021.

---

When changing one part of a codebase, we must account for the other parts know about it. For instance, in renaming a method, we must consider the potential callers of that method. The fewer these are, the safer it is to rename our method.

Consider the following arrangement that uses inheritance:

>  `Foo` inherits from `Bar`

> `Baz` delegates to `Foo`

In this arrangement Foo knows all the methods on Bar, Baz knows all the methods on both Foo and Bar since Foo inherits all of Bar's methods.

Now consider a slightly modified arrangement that avoids inheritance in favor of composition:

> `Foo` delegates to `Bar` & `Baz` delegates to `Foo`

Here `Foo` knows all the methods on `Bar` and `Baz` knows all the methods on `Foo` however `Baz` has _no knowledge_ about `Bar`. This means it's easier to change `Bar` here than it was in the earlier arrangement.

Composition reduces the cost of change as compared with inheritance.

---

Let's pause for a moment to consider the compound cost of using inheritance liberally. Let's also consider deep inheritance hierarchies with lots of inherited methods. What if an entire codebase were essentially one large inheritance hierarchy through liberal use of mixins? What might this mean for the ability to change that codebase?

---

Now, let's add dependency injection (DI) to the arrangement that uses composition. 

If Foo is passed an instance of Bar instead of creating it, we can pass Foo something else that looks like a Bar without ever changing the code for Foo. This allows us to change the behavior of our system without changing as much code as we'd need to with inheritance.

Composition in combination with DI further reduces the cost of change.

---

None of these ideas are my own. Googling 'composition vs inheritance' brings up several discussions and debates on the topic. I'd encourage you to try both approaches, allow time to pass and compare the outcomes in each case. As we write more Go hopefully there will be more examples of composition used well which might also help.

Finally, if you're not reading a technical book right now I can't recommend [POODR](https://www.poodr.com/) too highly.

I also recommend reading the [Refactoring Ruby](https://www.martinfowler.com/books/refactoringRubyEd.html) for a number of these sorts of transformations (the one we did here is called [Replace Delegation with Inheritance](https://www.refactoring.com/catalog/replaceDelegationWithInheritance.html)). It's a seminal book with practical, learnable skills that are essential to our craft and has offered me more mileage than most other technical books I've read.

---

In my experience, a good heuristic to apply to a technique is to consider its effect on the cost of change. A codebase absorbs new information through being changed–the easier it is to change the faster it learns.