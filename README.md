# Automated performance testing
Automation, a hot topic in the broader testing community and somewhat of a holy grail, is the end-goal for many organizations when it comes to understanding performance over time. However, where to start, which tool to choose, or how to get there, is not always as straightforward. Especially if you don’t already have a lot of experience in performance engineering.

This guide aims to lay down the steps and best practices for achieving your goal of performance testing automation.

# Why automate performance tests?
Let’s start by examining why you would consider automating your performance tests. To do that we need to revisit why we run performance tests in the first place:

* Avoid launch failures leading to a missed opportunity window and wasted investments, e.g. your app or site crashing during a high-profile product launch event.
* Avoid bad user experience leading visitors and customers to go with the competition, and you ultimately losing revenue, e.g. churning hard won customers due to a non responsive app or website.
* Avoid performance regressions as code changes get deployed to your production system and put in front of end users. This is what this guide is primarily aimed at.

From here, the decision to go for automated testing is hopefully clear:

* Shifting performance testing left, making sure it happens as close to development as possible, giving developers an early feedback loop for performance matters.
* Adding performance regression checks to your Continuous Integration and Delivery (CI/CD) pipelines.

Of course not all [types of performance](https://k6.io/docs/test-types/introduction/) tests are suitable for automation, A/B type performance tests is one such type of performance test where it probably doesn’t make much sense to automate, unless you're aiming to compare the performance of A and B over time.

# Know your goals

Besides creating a test case itself, the most important step to ensure a successful performance testing automation project is to document your goals. What metrics, and values (in absolute terms; "response times should be less than 500ms", and not "response times should not be slow"), are important to you, your team and the business.

If you have established [Service Level Agreements (SLAs)](https://en.wikipedia.org/wiki/Service-level_agreement) in place with your customers, or just [Service Level Objectives (SLOs)](https://en.wikipedia.org/wiki/Service-level_objective) and [Service Level Indicators (SLIs)](https://en.wikipedia.org/wiki/Service_level_indicator) defined internally, then that’s a great starting point. If not, then it’s a great opportunity to bring stakeholders together and discuss what goals you should have defined to drive a performance culture.

Starting with the results of a baseline test is another good way to find a starting point for your goals. A baseline test is a test run with a single or very few VUs that you know your system can handle without breaking a sweat. The idea being that you'll get some real numbers on where your system is at in terms of latency and response time. It's important to make sure that your baseline test is not resulting in any unwanted errors and is functionally accurate.

From the perspective of human perceptive abilities, the following guidance points from [Nielsen Norman Group](https://www.nngroup.com/articles/response-times-3-important-limits/) might be of help when deciding on what latency and response time to aim for:


> 0.1 second is about the limit for having the user feel that the system is reacting instantaneously, meaning that no special feedback is necessary except to display the result. <br>
> 1.0 second is about the limit for the user's flow of thought to stay uninterrupted, even though the user will notice the delay. Normally, no special feedback is necessary during delays of more than 0.1 but less than 1.0 second, but the user does lose the feeling of operating directly on the data. <br>
> 10 seconds is about the limit for keeping the user's attention focused on the dialogue. For longer delays, users will want to perform other tasks while waiting for the computer to finish, so they should be given feedback indicating when the computer expects to be done. Feedback during the delay is especially important if the response time is likely to be highly variable, since users will then not know what to expect.

# How to automate performance testing
Once your goals are clear, you can start introducing load tests into your automation pipelines. Running load tests from a continuous integration (CI) system is easy with k6. The set up can easily be generalized across the various CI tools into the following sequence of steps:
* Why automate performance tests?
* Know your goals
* How to automate performance testing
1. Installation of k6
2. Create a test
3. Pass/fail criteria
4. Local vs Cloud execution
4.1 Authenticating with k6 Cloud
5. Test frequency
5.1 VU iteration duration
5.2 Branching strategy
6. Pre-production test environment
7. Guidance
8. Notifications
8.1 For k6 OSS
8.2 For k6 cloud