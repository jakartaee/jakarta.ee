---
title: "Key Takeaways from the Cloud Native Java Survey"
date: 2025-02-27T00:00:00
tags: ["Jakarta EE", "Java EE", "EclipseFdn", "Community", "Java Survey", "Jakarta Adoption", "Key Stats"]
author: "Shabnam Mayel"
---

The **Jakarta EE Working Group** conducted the first-ever **Cloud Native Java
Survey** between July 11, 2024 and August 23, 2024 to gather insights on
popular Java SE versions, Jakarta EE, and MicroProfile usage. The results from
over 170 respondents left us with a number of important takeaways about the
adoption of enterprise Java technologies, developer priorities, and more. Here
are the key findings.

## Java EE/Jakarta EE Adoption

- **Jakarta EE 8 & Java EE 8** remain the most widely used versions.
- **Jakarta EE 10** adoption is growing as developers skip EE 9/9.1, which were
  transitional.
- A notable portion still relies on **legacy Java EE versions** (e.g., EE 6,
  released 15 years ago).

{{< figure 
  src="./images/jakarta-versions-used.png" 
  class="row margin-y-30" 
  imgClass="img-responsive col-sm-18 col-sm-offset-3" 
  alt="A pie chart displaying versions of Jakarta EE and Java EE and their popularity as a percentage. Jakarta EE 10 with 52%; Java EE 8 with 34%; Jakarta EE 8 with 22%; Don't use with 18%; Jakarta EE 9.x with 14%; Java EE 6 with 13%; Java EE 7 with 10%; Older than Java EE 6 with 10%." 
>}}

## MicroProfile Adoption

- A majority **do not use MicroProfile**.
- Those who do mostly run **newer versions** (MicroProfile 6 aligns with
  Jakarta EE 10).
- Some developers remain on **older MicroProfile releases**, indicating slow
  migration.

{{< figure 
  src="./images/microprofile-versions-used.png" 
  class="row margin-y-30" 
  imgClass="img-responsive col-sm-18 col-sm-offset-3" 
  alt="A pie chart displaying versions of MicroProfile and their popularity as a percentage. Don't use with 50%; MicroProfile 6.x with 35%; MicroProfile 5.x with 19%; MicroProfile 4.x with 12%; MicroProfile 3.x with 11%; MicroProfile 1.x with 6%; MicroProfile 2.x with 4%." 
>}}

## Java SE Versions

- **Java SE 17** is the most used version.
- **Almost half** of developers are already on **Java SE 21**.
- **Java SE 8 and 11** still have significant usage, despite being outdated.

{{< figure 
  src="./images/java-versions-used.png" 
  class="row margin-y-30" 
  imgClass="img-responsive col-sm-16 col-sm-offset-4" 
  alt="A pie chart displaying versions of Java SE and their popularity as a percentage. Java SE 17 with 58%; Java SE 21 with 48%; Java SE 11 with 38%; Java SE 8 with 37%; Java SE 22 with 13%; Java SE 7 or older with 10%." 
>}}

## Popular Java Runtimes

- **Spring Boot, Tomcat, Quarkus, and WildFly** dominate the landscape.
- **GlassFish, JBoss EAP, Payara, and Open Liberty** also have strong adoption.
- **Jetty, TomEE, and WebSphere** hold niche market shares.
- **Helidon and some Asian runtimes** have limited traction (~5% adoption).

{{< figure 
  src="./images/popular-java-runtimes.png" 
  class="row margin-y-30" 
  imgClass="img-responsive col-sm-18 col-sm-offset-3" 
  alt="A pie chart displaying popular Java Runtimes. Spring Boot with 38%; Tomcat with 33%; Quarkus with 32%; WildFly with 31%; GlassFish with 20%; JBoss EAP with 18%; Payara with 18%; Liberty with 16%; Jetty with 14%; TomEE with 14%; WebSphere with 13%, WebLogic with 13%." 
>}}

## Popular Jakarta EE APIs

- **Jakarta REST (JAX-RS), CDI, and JPA** are the most widely used.
- **JSON, Servlet, and EJB** also see strong adoption.
- **JSF, JSP, and JMS usage is declining** as JavaScript frameworks and alternative
  messaging solutions gain traction.

{{< figure 
  src="./images/popular-jakarta-apis.png" 
  class="row margin-y-30" 
  imgClass="img-responsive col-sm-18 col-sm-offset-3" 
  alt="A horizontal bar chart where the y-axis is the Jakarta EE API and the x-axis represents the usage as a percentage. The first group is as follows: REST with 70%, CDI with 68%, Persistence with 66%. The second group is as follows: JSON Binding with 58%, Servlet with 57%, JSON Processing with 53%, Validation with 53%, Enterprise Beans with 52%. The third group is as follows: Transactions with 49%, Mail with 48%, Faces with 44%, Messaging with 42%, Security with 40%, Expression Language with 38%. The fourth group is as follows: SOAP with 34%, Concurrency with 33%, WebSocket with 28%, Batch with 21%, Pages with 21%, Connectors with 19%." 
>}}

## MicroProfile APIs

- **Config, OpenAPI, and REST Client** lead usage.
- **Health, Metrics, and JWT** are commonly used for cloud native applications.
- **GraphQL, OpenTracing, and Reactive Messaging** see limited adoption.

{{< figure 
  src="./images/popular-microprofile-apis.png" 
  class="row margin-y-30" 
  imgClass="img-responsive col-sm-18 col-sm-offset-3" 
  alt="A horizontal bar chart where the y-axis is the MicroProfile API and the x-axis represents the usage as a percentage. The first group is as follows: Config with 49%, OpenAPI with 44%, Rest Client with 41%. The second group is as follows: Health with 38%, Metrics with 36%, JWT with 34%. The third group is as follows: Telemetry with 28%, Fault Tolerance with 27%. The fourth group is as follows: OpenTracing with 19%, Reactive Messaging with 19%, Context Propagation with 18%, GraphQL with 13%, LRA with 8%." 
>}}

## Developer Priorities for Jakarta EE & MicroProfile

- **Adapting to Java SE innovations** (e.g., Virtual Threads, Project CRaC, Project Leyden).
- **Enhanced Kubernetes support** (e.g., integration with Kubernetes Secrets).
- **Deprecating legacy features** like EJB, favoring **CDI-based alternatives**.
- **New features**, including:
  - Jakarta Messaging Lite for modern cloud use cases.
  - CDI-based replacements for EJB **Message-Driven Beans, `@Schedule`, and `@RolesAllowed`**.
  - A standard API for **server management**.

## Other Key Insights

- The majority still use the **Jakarta EE platform**.
- Most developers **combine Jakarta EE and MicroProfile**, though some use Jakarta
  EE alone.
- **JSON over HTTP (REST) dominates** API usage; XML and SOAP are declining, while
  OpenAPI is widely used.

The **Jakarta EE Working Group** thanks all participants and will use these
insights to guide future improvements.
