---
title: "javax to jakarta namespace ecosystem progress"
date: 2022-08-31T09:00:00
summary: "The Jakarta EE ecosystem has been hard at work transitioning various libraries, framework, servers and tools from the javax namespace to the jakarta.ee namespace. This work is essentially complete with the upcoming release of Jakarta EE 10. JakartaEE developers have a wide range of options in each category, providing great choices!"
author: Martijn Verburg
email: martijn@londonjavacommunity.co.uk
---

&nbsp;

## Introduction

On Sept 10th, 2019, the Eclipse Foundation announced the release of the [Jakarta EE 8](https://jakarta.ee/release/8/) Full Platform and Web Profile specifications and related Technology Compatibility Kits (TCKs). Those specifications were fully compatible with Java EE 8 specifications. They included the same APIs and Javadoc using the same programming model. The critical difference is that the Eclipse Foundation developed the JakartaEE specifications under the [Jakarta EE Specification Process](https://jakarta.ee/about/jesp/) and [Eclipse Development Process](https://www.eclipse.org/projects/dev_process/). These are the open, community-driven successors to the Java Community Process (JCP) for Java EE.

From a namespace perspective, Jakarta EE 8 still uses the `javax.*` naming. However, the Jakarta EE 9 release on Dec 8th, 2020, would introduce `jakarta.*` as the namespace to replace `javax.*` for Jakarta EE specifications.

Work began across the ecosystem to enable this new namespace in all implementations (including MicroProfile implementations), web servers, middleware tools, build tools, IDEs, and frameworks. Much of this work was well underway or completed by the release of JakartaEE 9.1 on May 25th, 2021, but there were still a few gaps.

This work is essentially complete with the upcoming release of Jakarta EE 10. JakartaEE developers have a wide range of options in each category, providing great choices.

This blog post outlines (at the time of writing - September 2022) the state of play for the transition. Day to day developers may also find the [JavaEE to Jakarta EE 10 Recipes](https://link.springer.com/book/10.1007/978-1-4842-8079-9) book helpful.

### Feedback and Errata

Did we get something wrong? Please let us know in the comments!

## Compatible Implementations

There are multiple Jakarta EE 9 and 10 implementations supporting the new `jakarta.*` namespace.

|**Vendor / Community**|**Implementation / Project**|**Transitioned?**|**Version with jakarta namespace**|
|:----|:----|:----|:----|
|Apache Software Foundation|TomEE|Yes|9.0.0-M+|
|Eclipse Foundation|Glassfish|Yes|6.0+|
|Fujitsu|Enterprise Application Server|In Progress|1.1+|
|Payara|Payara|Yes|6.2021.1.Alpha, Preview: 5.2020.5+|
|IBM|OpenLiberty|Yes|21.0.0.12+|
|Red Hat|Wildfly|In Progress|Normal: NYI, Preview: 22+|

## Web Servers

The most popular web servers also now support the new `jakarta.*` namespace.

|**Vendor / Community**|**Implementation / Project**|**Transitioned?**|**Version with jakarta namespace**|
|:----|:----|:----|:----|
|Apache Software Foundation|Tomcat|Yes|10.0+|
|Eclipse Foundation|Jetty|Yes|11.0.0+|

## MicroProfile Implementations

MicroProfile is a related set of specifications and APIs which utilize some of the Jakarta EE 9 and 10 specifications. Several implementations are compatible.

|**Vendor / Community**|**Implementation / Project**|**Transitioned?**|**Version with jakarta namespace**|
|:----|:----|:----|:----|
|Apache Software Foundation|TomEE|Yes|9.0.0-M+|
|Fujitsu|Launcher|Yes|4.0+|
|IBM|OpenLiberty|Yes|22.0.0.1+|
|Oracle|Helidon|Yes|3.0.0|
|Payara|Payara|Yes|Payara 6.2022.1.Alpha2|
|PiranhaCloud|Piranha|Yes|20.6.1|
|Red Hat|Quarkus|Partly|2.7.1+|

## Middleware Tools

Middleware tools is a broad term but include data store and messaging libraries that rely on Jakarta EE specifications.

|**Vendor / Community**|**Implementation / Project**|**Transitioned?**|**Version with jakarta namespace**|
|:----|:----|:----|:----|
|Apache Software Foundation|ActiveMQ Artemis|Yes|2.17.0+|
|Oracle|Coherence Community Edition|In Process|22.09|

## IDES

The major IDEs have steadily added 1st class support for jakarta.* namespace.

|**Vendor / Community**|**Implementation / Project**|**Transitioned?**|**Notes**|
|:----|:----|:----|:----|
|Apache Software Foundation|Netbeans|Partly|Supports JakartaEE as any 3rd party lib you add to a Java project but no native plugins or specialized support|
|Eclipse Foundation|Eclipse IDE|Partly|Supports JakartaEE as any 3rd party lib you add to a Java project but no native plugins or specialized support|
|Jetbrains|IntelliJ|Yes|Native support for creating Jakarta EE projects, plugins for running. Migration tool for the namespace switch.|
|Microsoft|VS Code|Partly|Supports JakartaEE as any 3rd party lib you add to a Java project, but no native plugins or specialized support|

## Build Tools

Maven, Gradle, and Ant have all added functionality to support the new namespace, especially concerning the various deployment plugins.

|**Vendor / Community**|**Implementation / Project**|**Transitioned?**|**Version with jakarta namespace**|
|:----|:----|:----|:----|
|Apache Software Foundation|Ant|Partly|1.10.12+|
|Apache Software Foundation|Maven|Partly|3.6.5+|
|Gradleware|Gradle|Partly|7.4+|

## Frameworks

Several popular frameworks assist in building Jakarta EE applications.

|**Vendor / Community**|**Implementation / Project**|**Transitioned?**|**version with jakarta namespace**|
|:----|:----|:----|:----|
|Eclipse Foundation|Jersey|Yes|3.0.0+|
|Object Computing|Micronaut|Partly|3.0.0+|
|Red Hat|Hibernate|Yes|6.0.0-Beta3|
|VMware|Spring|Yes|6.0.0-M1|

## Testing Frameworks

Testing is vitally essential, and alongside the core JUnit and TestNG libs is the popular Arquillian framework.

|**Vendor / Community**|**Implementation / Project**|**Transitioned?**|**Version with jakarta namespace**|
|:----|:----|:----|:----|
|Red Hat|Arquillian|Yes|1.7.0.Alpha10|

## Conclusion

The ecosystem has worked incredibly well to support the transition from `javax.*` to `jakarta.*`. The day-to-day Java developer can be confident that they have the modern successor to the Java EE specifications and the framework and tooling support they previously enjoyed.
