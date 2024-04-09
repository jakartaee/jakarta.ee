---
title: "Jakarta EE Platform" 
date: "2024-03-12"
headline: "Jakarta EE Platform" 
description: >-
  The Jakarta EE Platform enables developers to produce
  lightweight, cloud native applications while providing
  maximum developer productivity.
keywords: ["spec", "specification", "guide", "platform"]
hide_page_title: true
weight: 5
categories: ["Specification Guides"]
---

**The Jakarta EE Platform enables developers to produce
lightweight, cloud native applications while providing
maximum developer productivity**. Now featuring multiple
profiles geared towards producing microservices or full
stack applications, the Platform provides flexibility for
developing applications of all sizes. **The Platform is
composed of a number of specifications, each targeting
specific areas in application architecture**. This modular
approach allows the specifications to evolve under
different expert groups and timelines, while the platform
enables each to work together in harmony.

Given the wide variety of applications being developed
today, a "one size fits all" approach is rarely feasible.
Some applications may be deployed to on premise containers,
whereas others are deployed to cloud environments.
Similarly, some applications may require the use of very
few specifications, and others may make use of a more broad
spectrum of the platform. When deploying to cloud
environments, the size of an application or container can
make a difference, as smaller sizes often equate to cost
savings. Given the many variations between applications,
the Jakarta EE Platform allows the developer to choose
which size is the best fit for the solution. The Jakarta
EE Platform provides a number of options which allow
developers to make use of the specifications that best suit
their solution. Developers can choose to utilize the
Jakarta EE Core Profile, Jakarta EE Web Profile, or the
entire Jakarta EE Platform.

There are a number of deployment options available for
solutions developed on the Jakarta EE Platform.
Applications can be packaged into Docker containers and
deployed to Kubernetes, or they can be deployed to standard
application server containers. Many containers have
compatible implementations for each of the Jakarta EE
profiles, as well as the full platform. In some cases,
these containers also provide APIs above and beyond those
required for compatibility. The Jakarta EE 10 Platform is
compatible with Java SE 11 and Java SE 17, so some
containers such as WildFly may have separate
implementations for each.

## Jakarta EE Core Profile

Jakarta EE 10 introduces the Jakarta EE Core Profile, which contains a minimal
number of specifications that are targeted towards providing essential
functionality. The Jakarta EE Core Profile was engineered for use with
microservices applications and for runtimes that support build-time
applications. 

The following specifications are supported by the Jakarta EE Core Profile:

- Jakarta Annotations 2.1: Provides a standard set of annotations for enabling
  declarative programming across various technologies
- Jakarta Contexts and Dependency Injection Lite 4.0: Defines a powerful set of
  complimentary services to improve code within restricted environments
- Jakarta Dependency Injection 2.0: Specifies a means for accessing contextual
  objects and maximizing reusability, testability, and maintainability
- Jakarta Expression Language 5.0: Expression language for Java applications
- Jakarta Interceptors 2.1: Defines a means of injecting business logic when
  method invocations or specific events occur
- Jakarta JSON Binding 3.0: Binding framework for converting Java objects
  to/from JSON documents
- Jakarta JSON Processing 2.1: Framework for parsing, generating, transforming,
  and querying JSON documents
- Jakarta RESTful Web Services 3.1: Foundational API for development of
  REpresentational State Transfer webservices

To develop a microservice or application using the Jakarta EE Core Profile, add
the following dependency to your POM file:

```xml
<dependency>
    <groupId>jakarta.platform</groupId>
    <artifactId>jakarta.jakartaee-core-api</artifactId>
    <version>10.0.0</version>
</dependency>
```

Applications that would be a good fit for use of the Jakarta EE Core Profile
primarily communicate with other services/applications by means of RESTful web
services, do not require messaging services, and they do not store data in
persistent data stores. The core profile is ideal for development of simple
services that will be suitable for cloud deployment.

## Jakarta EE Web Profile

The Jakarta EE Web Profile is targeted for the development
of modern web applications that only require the use of a
subset of the specifications within the platform.
Applications that use this profile generally contain a
smaller footprint and tend to be less complex than those
using the full profile. However, it should be noted that
most modern web applications incorporate several
technologies due to the complexity of modern web design. 

A modern web application oftentimes uses a view technology
to provide simplified markup language, and advanced
incorporation of JavaScript and styling. Moreover,
persistence by means of relational or NoSQL databases is
very common in such an application, as well as the
requirement for transactions and security. No doubt, any
modern web application utilizes a small stack of
collaborative technologies.

The following specifications are part of the Jakarta EE Web
Profile:

- All of the specifications that are part of the Jakarta EE Core Profile
- Jakarta Authentication 3.0: Low-level SPI for providing a means of obtaining, validating and authenticating credentials, and handling identity
- Jakarta Bean Validation 3.0:  Metadata model and API for JavaBean field and method validations
- Jakarta Concurrency 3.0 (New Addition in Jakarta EE 10): Provides a means of supplying concurrency from application components
- Jakarta Debugging Support for Other Languages 2.0: Provides a mechanism for debugging programs executed under the Java Virtual Machine, but written in languages other than the Java programming language
- Jakarta Enterprise Beans 4.0 Lite: Lite subset of Jakarta Enterprise Beans, which is an architecture for the development and deployment of component-based business applications.
- Jakarta Persistence 3.1: Standard for managing object/relational mapping of persistence resources to Java classes.
- Jakarta Security 3.0: Standard providing APIs for the purpose of securing Jakarta EE applications.
- Jakarta Faces 4.0: MVC framework for constructing web application user interfaces.
- Jakarta Server Pages 3.1: Template engine for development of web applications.
- Jakarta Servlet 6.0: Defines a server-side API for development of an HTTP request/response lifecycle.
- Jakarta Standard Tag Library 3.0: Provides a standard set of tags harnessing core functionality for use within web applications.
- Jakarta Transactions 2.0:  Provides means for developing transaction-based applications.
- Jakarta WebSocket 2.1: Defines an API for client/server communication via the WebSocket protocol.

To develop a microservice or application using the Jakarta
EE Web Profile, add the following dependency to your POM
file:

```xml
<dependency>
    <groupId>jakarta.platform</groupId>
    <artifactId>jakarta.jakartaee-web-api</artifactId>
    <version>10.0.0</version>
</dependency>
```

## Jakarta EE Platform

The full platform contains the entire set of
specifications.  As such, it is targeted towards the
development of enterprise applications requiring the use of
many or all of the specifications in the platform.
Generally applications making use of the full platform are
deployed to traditional application server containers,
however, it is still possible to deploy such applications
to the cloud. Applications that fall into this category
are typically fairly complex, or they were developed using
older releases of the Java EE platform. The full platform
includes the following specifications:

All of the specifications that are part of Jakarta EE Core
Profile and Jakarta EE Web Profile

- Jakarta Activation 2.1: Set of standard services for MIME
  data access
- Jakarta Authorization 2.1: Defines low-level SPI for
  authorization modules
- Jakarta Batch 2.1: API enabling the development of batch
  operations, including XML based specification language
- Jakarta Connectors 2.1: Architecture for connecting
  application components to Enterprise Information Systems
- Jakarta Contexts and Dependency Injection 4.0: Specifies
  means for obtaining contextual objects via dependency
  injection and other supporting services
- Jakarta Enterprise Beans 4.0: Defines architecture for
  development of component based business applications
- Jakarta Enterprise Web Services 2.0: Defines Web Services
  for Jakarta EE architecture
- Jakarta Mail 2.1: Provides framework for building mail
  and messaging
- Jakarta Messaging 3.1: Provides messaging via loosely
  coupled and reliable asynchronous services
- Jakarta SOAP with Attachments 3.0: API for SOAP
  Attachments Feature
- Jakarta XML Binding 4.0: API for mapping XML docs and
  POJOs
- Jakarta XML Web Services 4.0: Defines means for
  developing XML-based Web Services based on SOAP

Full application server containers that are Jakarta EE
compliant are bundled with each of the specifications in
the platform. As such, applications can be packaged as Web
Archive (WAR) files and deployed to the containers.
However, it is also possible to create Microservices using
the full platform, but it should be noted that the
resulting deployment artifact will be substantially larger
than a Microservices using the Jakarta EE Core Profile or
Jakarta EE Web Profile. 

To develop a microservice or application using the full
platform, add the following dependency to your POM file:

```xml
<dependency>
    <groupId>jakarta.platform</groupId>
    <artifactId>jakarta.jakartaee-api</artifactId>
    <version>10.0.0</version>
</dependency>
```

## Getting Started

The best way to get started developing applications with
the Jakarta EE Platform is to utilize the Jakarta EE
Starter. The starter allows one to select which version of
Jakarta EE along with a profile, and it produces a Jakarta
EE project that is ready to be opened within an IDE for
customization. To make use of the starter, go to the
following website:

https://start.jakarta.ee

## Conclusion

The Jakarta EE Platform contains industry standard
specifications that have been developed and fine tuned to
provide for maximum performance and developer productivity.
The Jakarta EE 10 release provides a new Jakarta EE Core
Profile that is specifically geared towards the development
of cloud based services and applications. Whether an
application requires the use of enterprise-level APIs, or
if it will simply provide basic services such as REST, the
Jakarta EE Platform contains a solution that will be
suitable for the task at hand.
