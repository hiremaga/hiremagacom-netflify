---
title: The Athletic Position
date: 2026-04-15
---

## I. Before the Ball Leaves their Strings

There is a moment from the 1988 French Open final that most people who talk about tennis haven't had to think about carefully.

Steffi Graf plays Natasha Zvereva. Zvereva is seventeen. She has just beaten Martina Navratilova in the fourth round on pure nerve and arrives at the final with real credentials. The match lasts thirty-two minutes. Graf wins 6-0, 6-0. Zvereva wins thirteen points, total, in the whole match. Afterward, Graf apologizes to the crowd. Then she finds Zvereva in the locker room and apologizes to her too.

Everyone talks about Graf's forehand. Bud Collins called her Fräulein Forehand. The forehand is not what that match was about.

Chris Evert, watching from the baseline she had owned for fifteen years, understood this. So did Navratilova, who lost the Wimbledon final to Graf that same summer and said afterward that Graf's speed across the court, not her forehand, was what had made her feel helpless. Not the shot. The athleticism underneath the shot.

That athleticism has a name. It is called the split step. Everything interesting about it turns out to be a lesson that software engineers, despite being handed all the relevant information by Kent Beck, Ward Cunningham, and Ron Jeffries in the late 1990s, keep having to rediscover.

---

## II. Active

Every tennis player knows the ready position: weight forward, knees bent, racket centered, eyes up. It is the neutral stance you hold between shots. Every coach teaches it on day one.

It is not enough.

The ready position is passive. It is where you wait. What converts waiting into actual responsiveness is the split step: a small hop, an inch or two off the ground, timed to an opponent's swing. You land with feet wide, knees deeper than the ready position, weight coiled into the balls of your feet. Tendons store elastic energy. You release it into your first explosive step toward the ball.

Coaches call this landing the athletic position. It is distinct from the ready position the same way a crouched sprinter in the blocks is distinct from someone standing near the starting line. Both are "ready." Only one is set.

The standard coaching instruction is: split step as your opponent hits the ball. This sounds right. It is almost right, which in tennis is the same as wrong.

When a player follows this literally, they initiate the hop at contact. They are airborne while the ball is already in flight. They land after the moment of maximum informational value. They are always fractionally late. The court quietly shrinks around them. Balls that pros reach start bouncing twice.

The correct instruction is: you should be at peak jump height _before_ your opponent makes contact. You begin the hop during the backswing. You are already descending when the ball leaves the strings. By the time your feet hit the court in that deep, coiled athletic position, you know the direction, and the elastic energy carries you into it.

You reach the athletic position _before_ you know which direction you are going.

That is the counterintuitive part. That is the thing. Researchers found that volleyers who timed the split step correctly gained twenty-five percent more time than those who timed it late. That translated to sixty additional centimeters of reach at the net. From a one-inch hop.

---

## III. Preparation

Graf held the world number one ranking for 377 weeks. Serena Williams, the next closest, held it for 319. The gap is not close.

What those footwork videos show (the ones coaches still use as reference material, thirty years later) is not merely a well-timed split step. Graf was doing something more layered. She was reading her opponent's body mechanics during the backswing, the shoulder angle, the court position, and using that partial information to begin moving toward a position before the shot was struck.

Researchers call this anticipatory movement: momentum initiated before contact, before there is any information about ball direction to react to. Which is to say, Graf was not reacting faster than other players. She was starting to prepare before other players understood preparation had begun. The split step was the culmination of that process, not its beginning.

The practical result looked, to casual observers, like ease. One student who watched Roger Federer (Graf's nearest aesthetic equivalent, the player analysts describe as having similar footwork and grace) at a tournament described him as looking "lazy." What they were describing was maximum efficiency made invisible by years of repetition. Federer arrived at positions that seemed to require no effort because the effort had been distributed invisibly across the preceding seconds.

That is not ease. That is the highest form of preparation.

---

## IV. 1996, In Software

Kent Beck joined a troubled Chrysler payroll project in March 1996 and did something that looks, in retrospect, like what Graf was doing on the court eight years earlier.

His description of the moment is now quoted often enough to have become shorthand: he asked the team to "crank up all the knobs to 10 on the things I thought were essential and leave out everything else." What he thought was essential was feedback. Tight, continuous, structural feedback at every level of the work. His axiom: "Optimism is an occupational hazard of programming. Feedback is the treatment."

Beck brought in Ron Jeffries to coach the practices into habit. He drew on years of prior work with Ward Cunningham, who had been developing related ideas alongside him for a decade. Together they codified what became Extreme Programming: short iterations, pair programming, test-driven development, continuous integration, daily standups, retrospectives.

The courage XP required was not the courage to work hard. It was the courage to pay the preparation tax when every efficiency instinct says you cannot afford to. If testing is good, test everything all the time. If code review is good, do it constantly through pairing. Take the practice that produces value and make it structural, not occasional. The split step costs time too. It is still worth it.

What they had discovered, in the language of payroll software and Chrysler project rooms, was the organizational split step. A software team needs to be perpetually ready. Not perpetually working. Ready. Primed to respond to the next piece of information, a changed requirement, a broken build, a misunderstood story, without first having to reconstruct shared context from scratch.

Cunningham put it plainly: "I can't tell you how much time is spent worrying about decisions that don't matter. To just be able to make a decision and see what happens is tremendously empowering, but that means you have to set up the situation such that when something does go wrong, you can fix it."

Set up the situation such that when something goes wrong, you can fix it. That sentence is Graf, knees bent, weight coiled forward, already descending, oriented.

---

## V. Practice

The standup. Test-Driven Development (TDD). Continuous integration (CI). Iteration planning. The retrospective. Five practices that look, to anyone optimizing for utilization, like overhead. They are not overhead. They are the split step. They are what gets the team from the neutral ready position into the coiled athletic position where actual responsiveness lives.

The standup is not a status report. A status report describes where you were. The standup, done right, asks: what is about to arrive, and are we in position? It surfaces blockers before they compound. Misalignment before it calculates out to three weeks of diverged work.

TDD is the split step translated into code. Writing the test before the implementation is not primarily about coverage or regression safety, though it produces both. It is about committing to a precise, falsifiable description of what you want before you begin trying to produce it. You are airborne, in a state of defined uncertainty, before the ball has landed. Every minute of untested code is interest on the debt of a team that chose to start from stillness rather than readiness.

CI is the split step as a reset. A build that runs on every commit checks the team's position constantly. The team either lands clean, or lands and immediately knows where to move. What they cannot afford is the reckoning that arrives after six weeks of diverged branches, when the court has moved and nobody was watching.

Iteration (née sprint) planning is the hop itself. You leave the ground at the start of the cycle and orient before the sprint defines itself. You coil. When you land, you know the direction.

The retrospective is the mid-rally reset. Graf, scrambled wide on a defensive shot, did not keep running in the original direction hoping the point would resolve in her favor. She split stepped at mid-recovery, wherever she was, and reoriented. Without that reset, her momentum would have carried her further out of position. The sprint just pushed your team wide. Before the next sprint begins with all that accumulated momentum, the retrospective asks: is the direction still right?

---

## VI. Curiosity

These five practices operate inside the team. They answer the question: are we in position to move?

There is a second question the split step implies, and it faces outward. Not are we ready to move, but are we moving toward the right thing?

User-centered design is the split step for that question.

The practice, in its most disciplined form, is continuous. Not a research phase at the start of a project, after which the team builds in the dark. Continuous: regular user interviews, usability sessions, feedback loops running alongside delivery. The goal is the same as Graf reading her opponent's shoulder during the backswing. You accumulate knowledge of how people actually behave before you need to respond to what they ask for.

Teams that skip this build from stillness. They wait for requirements to arrive. They react to the words used rather than the need underneath them. By the time the ball is in the air, they are already wrong about where it is going.

The split step does not guarantee you reach every ball. It guarantees you are not starting from a dead stop when you try.

---

## VII. Courage

The split step costs time. The standup takes fifteen minutes. The retrospective takes an hour, or two. TDD takes, by various estimates (contested endlessly, for reasons that say more about programmer psychology than about data), somewhere between zero and thirty percent longer to write. These are real costs.

What the recreational tennis player discovers, usually by watching a ball bounce twice inside the court while still moving toward where they thought it was going, is that the cost of the hop is returned tenfold in coverage. The court that shrinks when you stop split stepping does not announce itself. Points that should be easy become hard. Hard points become impossible. The exhaustion compounds.

Beck understood that the courage Extreme Programming (XP) required was not the courage to work hard. It was the courage to pay the preparation tax when every efficiency instinct says you cannot afford to. If testing is good, test everything all the time. If code review is good, do it constantly through pairing. Take the practice that produces value and make it structural, not occasional.

Most teams identify the practices, implement them ceremonially, and then strip them back under delivery pressure until what remains is the shell: a standup that is a status report, a retrospective that meets quarterly, a CI pipeline whose failures get routinely overridden. The shell is the ready position. The neutral stance. The waiting.

The athletic position is gone.

---

## VIII. Together

There is one more piece, and it connects the two.

When Graf descended from that peak and her feet hit the clay, she moved. She did not pause to decide which area of the court she preferred to defend. The decision had been made already, by the reading she had done during the backswing, by the accumulated intelligence of training. Her body knew the next most important thing.

A team without shared, ranked priorities has no such intelligence in place. Someone is working on what they know best. Someone else is pulling the thing they find most interesting. A third is waiting on a dependency nobody has explicitly weighed against anything else. Everyone is moving. That looks like work. But the motion preceded the decision.

There is a model in queuing theory: one queue, multiple servers (it's called M/M/c). Work flows to whomever becomes free. It consistently outperforms systems where work is pre-assigned to specific individuals. Pre-assigned work creates uneven load with no mechanism to rebalance.

The objection to this is real and deserves a real answer. Humans are not interchangeable. Ramp-up is real. Context switching costs something. All true. But the feeling underneath the technical argument is worth naming too. It is closer to: I have built something here. I know where everything lives. I am the person others come to. Letting go of that feels like loss.

Cunningham heard this exact argument in the 1990s. His opponents said collective code ownership would dissolve accountability. Without ownership, you will never get responsibility. Without responsibility, you will never get quality. His response was not to argue them down. It was to point at what individual ownership actually produces: a program that resists the knowledge of the people trying to improve it. "All the time," he wrote, "we find ourselves in situations where people know things about the program, but they can't apply that knowledge to the program. Because the knowledge runs counter to some organizational decision that was made before they had that knowledge." The silo does not protect quality. It traps it.

What shared priorities give back is more humane than organizational. You can take a week off and the work continues, not because you prepared handover notes, but because the queue holds the work, not you. You are not the person getting called when something breaks in your area at eleven on a Friday, because your area is everyone's area. Over time, moving through different parts of the system, your understanding compounds in ways that staying in one corner never allows. Your value grows through what you know, not through being the only one who knows it.

This is also what Jeffries meant by sustainable pace. A shared list of priorities is not the architecture of always-on culture. It is the architecture that makes always-on unnecessary. When no single person is load-bearing, no single person has to prove their indispensability by working themselves into the ground.

The fear is understandable. People are being asked right now to demonstrate their value against machines, to own more territory as teams shrink, to be available constantly. In that environment, giving up ownership sounds like volunteering to be disposable. But a player who can only cover one part of the court is not free. They are trapped there. Security that depends on being the only one who knows something is the most fragile kind there is.

Ranked priorities do not take that security away. They offer something more durable in its place.

---

## IX. Invisible

The split step produces nothing directly. It is pure preparation. And it is the difference between a recreational player and a pro.

The split step is arguably the most relevant movement quality a high-level player must possess. Without it, a player will not reach their full movement potential. No matter how explosive, strong, or fast they are.

This essay is an invitation to be an active athlete like Graf. To be prepared, curious, and to practice with others around you. Until your own split steps are invisible. So you're in the athletic position before you know which direction you are going.

---

## X. Fin.

Sixty centimeters. From a one-inch hop. Zvereva won thirteen points. Graf apologized. The rain break lasted longer than the match.
