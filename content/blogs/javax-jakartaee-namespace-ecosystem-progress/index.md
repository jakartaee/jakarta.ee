---
title: "javax to jakarta namespace ecosystem progress"
date: 2022-09-01T19:00:00
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

<table>
  <tr>
   <td><strong>Vendor / Community</strong>
   </td>
   <td><strong>Implementation / Project</strong>
   </td>
   <td><strong>Transitioned?</strong>
   </td>
   <td><strong>Version with jakarta namespace</strong>
   </td>
  </tr>
  <tr>
   <td>Apache Software Foundation
   </td>
   <td>TomEE
   </td>
   <td>Yes
   </td>
   <td>9.0.0-M+
   </td>
  </tr>
  <tr>
   <td>Eclipse Foundation
   </td>
   <td>Glassfish
   </td>
   <td>Yes
   </td>
   <td>6.0+
   </td>
  </tr>
  <tr>
   <td>Fujitsu
   </td>
   <td>Enterprise Application Server
   </td>
   <td>In Progress
   </td>
   <td>1.1+
   </td>
  </tr>
  <tr>
   <td>Payara
   </td>
   <td>Payara
   </td>
   <td>Yes
   </td>
   <td>6.2021.1.Alpha, Preview: 5.2020.5+
   </td>
  </tr>
  <tr>
   <td>IBM
   </td>
   <td>OpenLiberty
   </td>
   <td>Yes
   </td>
   <td>21.0.0.12+
   </td>
  </tr>
  <tr>
   <td>Red Hat
   </td>
   <td>Wildfly
   </td>
   <td>In Progress
   </td>
   <td>Normal: NYI, Preview: 22+
   </td>
  </tr>
</table>

## Web Servers

The most popular web servers also now support the new `jakarta.*` namespace.

<table>
  <tr>
   <td><strong>Vendor / Community</strong>
   </td>
   <td><strong>Implementation / Project</strong>
   </td>
   <td><strong>Transitioned?</strong>
   </td>
   <td><strong>Version with jakarta namespace</strong>
   </td>
  </tr>
  <tr>
   <td>Apache Software Foundation
   </td>
   <td>Tomcat
   </td>
   <td>Yes
   </td>
   <td>10.0+
   </td>
  </tr>
  <tr>
   <td>Eclipse Foundation
   </td>
   <td>Jetty
   </td>
   <td>Yes
   </td>
   <td>11.0.0+
   </td>
  </tr>
</table>

## MicroProfile Implementations

MicroProfile is a related set of specifications and APIs which utilize some of the Jakarta EE 9 and 10 specifications. Several implementations are compatible.

<table>
  <tr>
   <td><strong>Vendor / Community</strong>
   </td>
   <td><strong>Implementation / Project</strong>
   </td>
   <td><strong>Transitioned?</strong>
   </td>
   <td><strong>Version with jakarta namespace</strong>
   </td>
  </tr>
  <tr>
   <td>Apache Software Foundation
   </td>
   <td>TomEE
   </td>
   <td>Yes
   </td>
   <td>9.0.0-M+
   </td>
  </tr>
  <tr>
   <td>Fujitsu
   </td>
   <td>Launcher
   </td>
   <td>Yes
   </td>
   <td>4.0+
   </td>
  </tr>
  <tr>
   <td>IBM
   </td>
   <td>OpenLiberty
   </td>
   <td>Yes
   </td>
   <td>22.0.0.1+
   </td>
  </tr>
  <tr>
   <td>Oracle
   </td>
   <td>Helidon
   </td>
   <td>Yes
   </td>
   <td>3.0.0
   </td>
  </tr>
  <tr>
   <td>Payara
   </td>
   <td>Payara
   </td>
   <td>Yes
   </td>
   <td>Payara 6.2022.1.Alpha2
   </td>
  </tr>
  <tr>
   <td>PiranhaCloud
   </td>
   <td>Piranha
   </td>
   <td>Yes
   </td>
   <td>20.6.1
   </td>
  </tr>
  <tr>
   <td>Red Hat
   </td>
   <td>Quarkus
   </td>
   <td>Partly
   </td>
   <td>2.7.1+
   </td>
  </tr>
</table>

## Middleware Tools

Middleware tools is a broad term but include data store and messaging libraries that rely on Jakarta EE specifications.

<table>
  <tr>
   <td><strong>Vendor / Community</strong>
   </td>
   <td><strong>Implementation / Project</strong>
   </td>
   <td><strong>Transitioned?</strong>
   </td>
   <td><strong>Version with jakarta namespace</strong>
   </td>
  </tr>
  <tr>
   <td>Apache Software Foundation
   </td>
   <td>ActiveMQ Artemis
   </td>
   <td>Yes
   </td>
   <td>2.17.0+
   </td>
  </tr>
  <tr>
   <td>Oracle
   </td>
   <td>Coherence Community Edition
   </td>
   <td>In Process
   </td>
   <td>22.09
   </td>
  </tr>
</table>

## IDES

The major IDEs have steadily added 1st class support for jakarta.* namespace.

<table>
  <tr>
   <td><strong>Vendor / Community</strong>
   </td>
   <td><strong>Implementation / Project</strong>
   </td>
   <td><strong>Transitioned?</strong>
   </td>
   <td><strong>Notes</strong>
   </td>
  </tr>
  <tr>
   <td>Apache Software Foundation
   </td>
   <td>Netbeans
   </td>
   <td>Partly
   </td>
   <td>Supports JakartaEE as any 3rd party lib you add to a Java project but no native plugins or specialized support
   </td>
  </tr>
  <tr>
   <td>Eclipse Foundation
   </td>
   <td>Eclipse IDE
   </td>
   <td>Partly
   </td>
   <td>Supports JakartaEE as any 3rd party lib you add to a Java project but no native plugins or specialized support
   </td>
  </tr>
  <tr>
   <td>Jetbrains
   </td>
   <td>IntelliJ
   </td>
   <td>Yes
   </td>
   <td>Native support for creating Jakarta EE projects, plugins for running. Migration tool for the namespace switch.
   </td>
  </tr>
  <tr>
   <td>Microsoft
   </td>
   <td>VS Code
   </td>
   <td>Partly
   </td>
   <td>Supports JakartaEE as any 3rd party lib you add to a Java project, but no native plugins or specialized support
   </td>
  </tr>
</table>

## Build Tools

Maven, Gradle, and Ant have all added functionality to support the new namespace, especially concerning the various deployment plugins.

<table>
  <tr>
   <td><strong>Vendor / Community</strong>
   </td>
   <td><strong>Implementation / Project</strong>
   </td>
   <td><strong>Transitioned?</strong>
   </td>
   <td><strong>Version with jakarta namespace</strong>
   </td>
  </tr>
  <tr>
   <td>Apache Software Foundation
   </td>
   <td>Ant
   </td>
   <td>Partly
   </td>
   <td>1.10.12+
   </td>
  </tr>
  <tr>
   <td>Apache Software Foundation
   </td>
   <td>Maven
   </td>
   <td>Partly
   </td>
   <td>3.6.5+
   </td>
  </tr>
  <tr>
   <td>Gradleware
   </td>
   <td>Gradle
   </td>
   <td>Partly
   </td>
   <td>7.4+
   </td>
  </tr>
</table>

## Frameworks

Several popular frameworks assist in building Jakarta EE applications.

<table>
  <tr>
   <td><strong>Vendor / Community</strong>
   </td>
   <td><strong>Implementation / Project</strong>
   </td>
   <td><strong>Transitioned?</strong>
   </td>
   <td><strong>version with jakarta namespace</strong>
   </td>
  </tr>
  <tr>
   <td>Eclipse Foundation
   </td>
   <td>Jersey
   </td>
   <td>Yes
   </td>
   <td>3.0.0+
   </td>
  </tr>
  <tr>
   <td>Object Computing
   </td>
   <td>Micronaut
   </td>
   <td>Partly
   </td>
   <td>3.0.0+
   </td>
  </tr>
  <tr>
   <td>Red Hat
   </td>
   <td>Hibernate
   </td>
   <td>Yes
   </td>
   <td>6.0.0-Beta3
   </td>
  </tr>
  <tr>
   <td>VMware
   </td>
   <td>Spring
   </td>
   <td>Yes
   </td>
   <td>6.0.0-M1
   </td>
  </tr>
</table>

## Testing Frameworks

Testing is vitally essential, and alongside the core JUnit and TestNG libs is the popular Arquillian framework.

<table>
  <tr>
   <td><strong>Vendor / Community</strong>
   </td>
   <td><strong>Implementation / Project</strong>
   </td>
   <td><strong>Transitioned?</strong>
   </td>
   <td><strong>Version with jakarta namespace</strong>
   </td>
  </tr>
  <tr>
   <td>Red Hat
   </td>
   <td>Arquillian
   </td>
   <td>Yes
   </td>
   <td>1.7.0.Alpha10
   </td>
  </tr>
</table>

## Conclusion

The ecosystem has worked incredibly well to support the transition from `javax.*` to `jakarta.*`. The day-to-day Java developer can be confident that they have the modern successor to the Java EE specifications and the framework and tooling support they previously enjoyed.
