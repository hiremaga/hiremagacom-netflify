---
title: More vibrant Go in 3 moves
date: 2014-01-25
---

# Move 1: Describe interactions with roles

[Go's](http://golang.org/) interfaces are [satisfied implicitly](http://nathany.com/good/#toc_8), making it incredibly easy to create [role interfaces](http://martinfowler.com/bliki/RoleInterface.html).

Describing new roles as we implement a method lets us postpone deciding how we'll meet its needs. Conveniently, our method is specific about what we know and open to what we might learn.

# Move 2: Extend existing code with adapters

The humble [adapter](http://c2.com/cgi/wiki?AdapterPattern) finds new utility in existing code without modifying it. Leaving existing code unmodified also avoids rippling changes through its existing consumers.

Adapters turn out to be especially powerful at the [boundaries](http://alistair.cockburn.us/Hexagonal+architecture) of our applications. They can shift the shape of an open source library and shield the internals of an application from [changes](http://en.wikipedia.org/wiki/Software_rot) to these libraries.

# Last Move: Keep creation and interaction apart

When interaction is independent of creation, an implementor can be [replaced with another](http://www.jamesshore.com/Blog/Dependency-Injection-Demystified.html) without affecting the interaction.

This lets us change the behavior of our system more easily, has immediate benefits in [test isolation](http://www.amazon.com/Test-Driven-Development-By-Example/dp/0321146530), and also leaves room to discover uses our younger selves might not have imagined.

In combination, these 3 simple moves let us reconnect existing dots to draw new pictures. Each picture apt for its time.