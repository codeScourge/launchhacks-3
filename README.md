# launchhacks-3

### Motivation
The current trend in the web is gamifying your learning experiences. Brilliant.com doesn't have a revenue of $10.6 million for no reason and they are where our inspiration came from; to allow anyone to build their own quizzes without writing tedious frontend code, so they can make their content more engaging.

### Plan and Execution
Our two main objectives were:
1. Building a backend tool that takes an array in a specific format and spits out the corresponding CSS, HTML, and JS files
2. Building a front interface to let the user easily build this array in a simple-to-use UI for the user


### Tech Stack
For our backend, using Flask (a microframework for web development) was an easy choice since both of us knew how to use it. At first, we thought of using ReactJS for the front-end but in the end decided to use plain JavaScript for the added simplicity.


### Future Developments
Once you start a project, a thousand things arise that need to be done. The first thing we need to tackle is a better integration experience for the user. An onboarding video on how to integrate the code would be a great utility so even WordPress users could profit from our tool. We would need to deploy this application with our new “build-a-quiz.xyz” domain. For that, we would deploy a Lambda function on AWS since serverless is the easiest and cheapest option, especially because we don’t have any long-running tasks, which would force us to use Queues or switch to microservices architecture.
