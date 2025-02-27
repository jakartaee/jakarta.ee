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

<!-- Todo image -->

## MicroProfile Adoption

- A majority **do not use MicroProfile**.
- Those who do mostly run **newer versions** (MicroProfile 6 aligns with
  Jakarta EE 10).
- Some developers remain on **older MicroProfile releases**, indicating slow
  migration.

<!-- Todo image -->

## Java SE Versions

- **Java SE 17** is the most used version.
- **Almost half** of developers are already on **Java SE 21**.
- **Java SE 8 and 11** still have significant usage, despite being outdated.

<!-- Todo image -->

## Popular Java Runtimes

- **Spring Boot, Tomcat, Quarkus, and WildFly** dominate the landscape.
- **GlassFish, JBoss EAP, Payara, and Open Liberty** also have strong adoption.
- **Jetty, TomEE, and WebSphere** hold niche market shares.
- **Helidon and some Asian runtimes** have limited traction (~5% adoption).

<!-- Todo image -->

## Popular Jakarta EE APIs

- **Jakarta REST (JAX-RS), CDI, and JPA** are the most widely used.
- **JSON, Servlet, and EJB** also see strong adoption.
- **JSF, JSP, and JMS usage is declining** as JavaScript frameworks and alternative
  messaging solutions gain traction.

<!-- Todo image -->

## MicroProfile APIs

- **Config, OpenAPI, and REST Client** lead usage.
- **Health, Metrics, and JWT** are commonly used for cloud native applications.
- **GraphQL, OpenTracing, and Reactive Messaging** see limited adoption.

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
