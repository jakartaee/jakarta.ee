---
title: "2024 Cloud Native Java Survey Findings"
date: 2025-02-11T00:00:00 
author: Shabnam Mayel
email: shabnam.mayel@eclipse-foundation.org
---

In 2024, the Jakarta EE Working Group launched a brand new effort named the
“Cloud Native Java Survey.” This blog, authored by the Jakarta EE Marketing
Committee, summarizes the key insights from the survey.
You may already be aware of the annual [Jakarta EE Developer Survey](https://outreach.eclipse.foundation/jakarta-ee-developer-survey-2024), 
also organized by the working group. While the Developer Survey provides a
broad view of the ecosystem and Java trends, the Cloud Native Java Survey dives
deeper into technical details, encompassing both Jakarta EE and MicroProfile.
The survey was conducted between July 11, 2024 and August 23, 2024.

This survey helps provide answers to questions such as:

- What versions of Java SE, Java EE, Jakarta EE, and MicroProfile are
  developers using?
- What Java runtimes are popular?
- What parts of Jakarta EE and MicroProfile are developers using?
- What specific changes do developers want to see in Jakarta EE and
  MicroProfile?

## Java EE/Jakarta EE Versions Used

A slight majority of developers are actually still on Java EE 8 and Jakarta EE
8. The second largest set – almost half – say they are already using Jakarta EE
10.

{{< figure 
  src="./images/jakarta-versions-used.png" 
  class="row margin-y-30" 
  imgClass="img-responsive col-sm-18 col-sm-offset-3" 
  alt="A pie chart displaying versions of Jakarta EE and Java EE and their popularity as a percentage. Jakarta EE 10 with 52%; Java EE 8 with 34%; Jakarta EE 8 with 22%; Don't use with 18%; Jakarta EE 9.x with 14%; Java EE 6 with 13%; Java EE 7 with 10%; Older than Java EE 6 with 10%." 
>}}

Note that for the questions on this survey, respondents were allowed to select
more than one choice, so total percentages will add up to greater than 100%.

The results make general sense. EE 9 and 9.1 were largely transitional releases
to help the ecosystem move from the javax to jakarta namespace. Developers are
incentivized to just move to EE 10 since it brings significant new features.
Almost a fifth say they don’t use Java EE or Jakarta EE. In all likelihood this
group is still dependent on many Jakarta EE APIs such as Servlet and
Persistence (JPA). A significant number of developers are still using very old
versions of Java EE (for context, Java EE 6 was released fifteen years ago).
Hopefully EE 11 will convince more developers to upgrade their applications.

## MicroProfile Usage

A slight majority of developers do not use MicroProfile at all. Of those that
do, most are on newer versions (MicroProfile 6 aligns with Jakarta EE 10).

{{< figure 
  src="./images/microprofile-versions-used.png" 
  class="row margin-y-30" 
  imgClass="img-responsive col-sm-18 col-sm-offset-3" 
  alt="A pie chart displaying versions of MicroProfile and their popularity as a percentage. Don't use with 50%; MicroProfile 6.x with 35%; MicroProfile 5.x with 19%; MicroProfile 4.x with 12%; MicroProfile 3.x with 11%; MicroProfile 1.x with 6%; MicroProfile 2.x with 4%." 
>}}

This makes sense. MicroProfile users are likely working on newer applications
that are easier to upgrade. That said, there is a significant number of
MicroProfile users who are on older versions (the first release of MicroProfile
was in 2016).

## Java Versions Used

A relatively strong majority of developers say they are already using Java SE
17. In addition, almost half say they are using Java SE 21. More than a third
each say they are on Java SE 8 and 11.

{{< figure 
  src="./images/java-versions-used.png" 
  class="row margin-y-30" 
  imgClass="img-responsive col-sm-16 col-sm-offset-4" 
  alt="A pie chart displaying versions of Java SE and their popularity as a percentage. Java SE 17 with 58%; Java SE 21 with 48%; Java SE 11 with 38%; Java SE 8 with 37%; Java SE 22 with 13%; Java SE 7 or older with 10%." 
>}}

Clearly, the rapid cadence of Java releases is working. It is important for
Jakarta EE releases to keep pace with Java SE. That said, a lot of developers
are still on Java SE 8 or older (Java SE 8 was released ten years ago).

{{< figure 
  src="./images/popular-java-runtimes.png" 
  class="row margin-y-30" 
  imgClass="img-responsive col-sm-18 col-sm-offset-3" 
  alt="A pie chart displaying popular Java Runtimes. Spring Boot with 38%; Tomcat with 33%; Quarkus with 32%; WildFly with 31%; GlassFish with 20%; JBoss EAP with 18%; Payara with 18%; Liberty with 16%; Jetty with 14%; TomEE with 14%; WebSphere with 13%, WebLogic with 13%." 
>}}

Spring Boot, Tomcat, Quarkus, and WildFly are all popular runtimes. GlassFish,
JBoss EAP, Payara, and Open Liberty/WebSphere Liberty also all make a decent
showing. Jetty, TomEE, WebSphere (traditional), and WebLogic have smaller but
significant adoption.

These are relatively predictable patterns that have held true in recent years
across various data sets. For context, the survey also included Helidon and
runtimes from Asian companies. These runtimes do not yet have significant
traction. For example, Helidon has about 5% adoption.

## Popular Jakarta EE APIs

Jakarta EE APIs can be grouped by some clear segments. Jakarta REST/JAX-RS,
CDI, and Persistence/JPA are the most popular technologies with a solid
majority using them. Considering the popularity of JavaScript front-ends and
microservices as well as the fact that these are general purpose APIs, this
makes sense. Similarly, a majority are using JSON, Servlet, (Bean) Validation,
and Enterprise Beans/EJB. It is notable that CDI is far more popular than EJB.

{{< figure 
  src="./images/popular-jakarta-apis.png" 
  class="row margin-y-30" 
  imgClass="img-responsive col-sm-18 col-sm-offset-3" 
  alt="A horizontal bar chart where the y-axis is the Jakarta EE API and the x-axis represents the usage as a percentage. The first group is as follows: REST with 70%, CDI with 68%, Persistence with 66%. The second group is as follows: JSON Binding with 58%, Servlet with 57%, JSON Processing with 53%, Validation with 53%, Enterprise Beans with 52%. The third group is as follows: Transactions with 49%, Mail with 48%, Faces with 44%, Messaging with 42%, Security with 40%, Expression Language with 38%. The fourth group is as follows: SOAP with 34%, Concurrency with 33%, WebSocket with 28%, Batch with 21%, Pages with 21%, Connectors with 19%." 
>}}

Less than half of developers are using more specialized technologies like Mail,
Faces/JSF, and Messaging/JMS. It is notable that JSF indeed appears to have
taken a back seat to JavaScript frameworks. In the last group are technologies
that handle very specific use cases like Concurrency, WebSocket, and Batch.
Similar to JSF, JSP has also reduced in popularity in recent years.

## Popular MicroProfile APIs

The most popular MicroProfile APIs are clearly Config, OpenAPI, and REST
Client. Health, Metrics, and JWT are utilized by about a third of users. About
a quarter use Telemetry and Fault Tolerance. The least used parts of
MicroProfile are OpenTracing, Reactive Messaging, Context Propagation, GraphQL,
and LRA.

{{< figure 
  src="./images/popular-microprofile-apis.png" 
  class="row margin-y-30" 
  imgClass="img-responsive col-sm-18 col-sm-offset-3" 
  alt="A horizontal bar chart where the y-axis is the MicroProfile API and the x-axis represents the usage as a percentage. The first group is as follows: Config with 49%, OpenAPI with 44%, Rest Client with 41%. The second group is as follows: Health with 38%, Metrics with 36%, JWT with 34%. The third group is as follows: Telemetry with 28%, Fault Tolerance with 27%. The fourth group is as follows: OpenTracing with 19%, Reactive Messaging with 19%, Context Propagation with 18%, GraphQL with 13%, LRA with 8%." 
>}}

## What Changes Developers Want

A number of questions in the survey had to do with understanding what changes
developers would like to see. In general, the responses align with what the
stakeholder considerations have been in recent years.

When asked about higher level themes, developers expressed the following
priorities.

- Adapting to Java SE innovations, such as Records and Virtual Threads. While
  Jakarta EE 11 does so to an extent, there is certainly room to do more. There
  are some relevant Java SE innovations in the works such as faster startup
  using snapshots (Project CRaC) and native compilation (Project Leyden).
- Better support for Kubernetes – while most Jakarta EE runtimes already go a
  long way to support containers and Kubernetes (Docker images, Operators, Helm
  Charts), there could certainly be specific areas of improvement such as
  built-in integration with Kubernetes Secrets. MicroProfile technologies such
  as Health, Config, and Telemetry work well with Kubernetes.
- Aggressively deprecating legacy features like EJB – while Jakarta EE 10 and
  11 have made progress towards these goals, there is room for improvement. The
  Application Client Container could be a sensible target for deprecation next
  in addition to making it less necessary to use EJB by introducing more CDI
  based alternatives.
- Adopting CDI whenever possible across the Jakarta EE platform – making it the
  unifying component model. While Jakarta EE 10 and 11 have made progress
  towards these goals, there is room for improvement. For example, `@Context`
  in Jakarta REST is due to be replaced in favor of `@Inject`.

When asked about more specific features, developers prioritized the following
changes.

- Adding a Java SE/standalone bootstrap API for Jakarta Messaging.
- Introducing Jakarta Messaging Lite geared more towards modern cloud native
  use cases.
- Replacing EJB Message Driven Beans with a CDI-based equivalent in Jakarta
  Messaging.
- Adding a CDI-based replacement to EJB `@Schedule` in Jakarta Concurrency –
  some initial work for this has been done in Jakarta EE 11.
- Adding a CDI based replacement to `@RolesAllowed` in Jakarta Security.
- Adding `@Service` as a CDI stereotype to the platform to replace EJB
  `@Stateless`.

When asked about adding APIs to the Jakarta EE platform (including existing
standalone specifications), developers slightly favored a standard API for
server management including starting/stopping servers and deploying/undeploying
applications, as well as Jakarta MVC. They expressed slightly lower support for
adding caching (perhaps based on JCache), Jakarta NoSQL, serverless, a
lower-level HTTP I/O API (like the ones in Netty/Grizzly), Jakarta RPC, and AI.
From a more future-looking perspective, developers prioritized adding support
for AI over other emerging areas like quantum computing and robotics.

When asked about which APIs should be kept up-to-date, developers prioritized
areas like CDI, Concurrency, Data, and Config over other areas such as Servlet
and WebSocket.

## Some Other Insights

Here are some additional key insights from the survey:

- The majority of developers still use the full Jakarta EE platform. About a
  third say they use the Web Profile and about a quarter say they use the Core
  Profile (MicroProfile 6 is based on the Core Profile).
- The largest cohort of developers say they are using Jakarta EE and
  MicroProfile together. The second largest segment say they are primarily
  using Jakarta EE. A smaller number say they are using primarily MicroProfile.
- Three quarters of developers use JSON over HTTP for their service APIs,
  likely over REST. Only a quarter said they used XML. Almost two thirds said
  they used OpenAPI. A third of developers said they still used SOAP. A smaller
  number of developers used GraphQL, gRPC, or Hypermedia.

The Jakarta EE Working Group would like to thank all developers that took the
time to fill out the survey. We hope insights are useful to the community. The
working group will take the insights into full consideration while moving the
technologies forward.

[Sign up for email updates](https://share.hsforms.com/1Vn5cobvWQ2CdrC65FEia_A38167) 
from Jakarta EE to be notified about our 2025 survey and other upcoming
initiatives.

