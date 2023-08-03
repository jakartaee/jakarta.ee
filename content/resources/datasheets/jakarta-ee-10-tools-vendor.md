---
title: Jakarta EE 10 Tools Vendor Datasheet
headline: Tools Vendor Datasheet
subtitle: Jakarta EE 10
tagline: Start your migration today!
hide_page_title: true
---

## Background

Jakarta EE 10 is a major release of the Jakarta EE platform, which provides a
comprehensive set of APIs and services for developing and deploying Enterprise
Java applications. Jakarta EE 10 includes a number of new features and
improvements over Jakarta EE 9, including:

- **Support for Java 11 and 17:**

  Jakarta EE 10 requires Java 11 as the minimum supported version of Java. This
  means that applications developed on Jakarta EE 10 will be able to take
  advantage of the latest features and performance improvements in Java 11. Java
  17 support is also available.

- **20 Specifications updated:**

  Jakarta EE 10 includes a number of improvements to existing specifications,
  including:

  - Jakarta CDI 4.0: including CDI-Lite that enables build time extensions.
  - Jakarta Security 3.0: supporting OpenID Connect.
  - Jakarta Servlet 6.0: for simplified programming and improved security.
  - Jakarta Faces (JSF) 4.0: with a modernized API using CDI.
  - Jakarta EL 5.0: a standard way to evaluate expressions in Java code.
  - Jakarta JSON Binding 3.0: with new support for polymorphic types.
  - Jakarta Annotations 2.1
  - Jakarta Batch 2.1
  - Jakarta Messaging 3.1
  - Jakarta Persistence 3.1: standardizing UUID as Basic Type and extending
    Query language and Query API.
  - Jakarta RESTful Web Services 3.1: standardizes a Java SE Bootstrap API and
    standard support for multipart/form-data.
  - Jakarta Concurrency 3.0: moved to the Web Profile and enhances parallel and
    reactive programming models available to applications

Jakarta EE 10 is a major release that provides a number of new features and
improvements that can help developers to build more powerful and efficient
enterprise Java applications.

## Implementation Roadmaps

The following components and implementations are some of the compatible
products according to the list available at 
https://jakarta.ee/compatibility/download/:

| Implementation                                   | Version (Compatible with Jakarta EE 10)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Available |
| ---                                              | ---                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | ---       |
| Eclipse GlassFish                                | 7.0 [(download)](https://download.eclipse.org/ee4j/glassfish/glassfish-7.0.4.zip)                                                                                                                                                                                                                                                                                                                                                                                                                                                           | now       |
| FUJITSU Software Enterprise Application Platform | 1.1.0 [(download)](https://www.fujitsu.com/jp/products/software/middleware/business-middleware/middleware/applatform/jakartaee-report/eap110-ee10full-tck-results)                                                                                                                                                                                                                                                                                                                                                                          | now       |
| IBM WebSphere Liberty                            | 23.0.0.3, Java 17 [(download)](https://www.ibm.com/support/fixcentral/swg/selectFixes?parent=ibm%7EWebSphere&product=ibm/WebSphere/WebSphere+Liberty&release=23.0.0.3&platform=All&function=fixId&fixids=wlp-jakartaee10-23.0.0.3&includeSupersedes=0) {{<grid/div>}}{{</grid/div>}} 23.0.0.3, Java 11 [(download)](https://www.ibm.com/support/fixcentral/swg/selectFixes?parent=ibm%7EWebSphere&product=ibm/WebSphere/WebSphere+Liberty&release=23.0.0.3&platform=All&function=fixId&fixids=wlp-jakartaee10-23.0.0.3&includeSupersedes=0) | now       |
| Open Liberty                                     | 23.0.0.3, Java 17 [(download)](https://public.dhe.ibm.com/ibmdl/export/pub/software/openliberty/runtime/release/23.0.0.3/openliberty-jakartaee10-23.0.0.3.zip) {{<grid/div>}}{{</grid/div>}}  23.0.0.3, Java 11 [(download)](https://public.dhe.ibm.com/ibmdl/export/pub/software/openliberty/runtime/release/23.0.0.3/openliberty-jakartaee10-23.0.0.3.zip)                                                                                                                                                                                | now       |
| Payara Server Community                          | 6.2023.7 [(download)](https://github.com/payara/Payara/releases/tag/payara-server-6.2022.1) {{<grid/div>}}{{</grid/div>}} 6.2023.7 [(download)](https://github.com/payara/Payara/releases/tag/payara-server-6.2022.1.Alpha4)                                                                                                                                                                                                                                                                                                                | now       |
| Payara Server Enterprise                         | 6.4.0 [(download)](https://nexus.payara.fish/repository/payara-enterprise-evaluations/fish/payara/distributions/payara-enterprise-evaluation/6.4.0-Smiling-Barramundi/payara-enterprise-evaluation-6.4.0-Smiling-Barramundi.zip)                                                                                                                                                                                                                                                                                                            | now       |
| WildFly                                          | 27.0.0.Alpha5, Java 17 [(download)](https://github.com/wildfly/certifications/blob/EE10/WildFly_27.0.0.Alpha5/jakarta-full-platform-jdk17.adoc) {{<grid/div>}}{{</grid/div>}} 27.0.0.Alpha5, Java 11 [(download)](https://www.wildfly.org/downloads/)                                                                                                                                                                                                                                                                                        | now       |

## Jakarta EE 10 Full Release

Jakarta EE 10 was released on September 22, 2022. More details can be found at
https://jakarta.ee/release/10/.

{{< grid/div class="row" isMarkdown="false" >}}
  {{< grid/div class="col-md-6" isMarkdown="false" >}}
    <a class="btn btn-secondary margin-top-30 margin-bottom-30 margin-left-auto margin-right-auto btn-block" href="https://gist.github.com/dblevins/9a6d4b1c90986a4116dd738c9e5ef212">
      <i class="fa fa-github"></i>
      Full Affected Packages
    </a>
  {{</ grid/div >}}
  {{< grid/div class="col-md-18" >}}

| Name                        | Description                                                            |
| ---                         | ---                                                                    |
| javax.activation            | JavaBeansTM Activation Framework                                       |
| javax.annotation            | Common Annotations for the Java Platform                               |
| javax.batch                 | Batch Applications for the Java Platform                               |
| javax.decorator             | Contexts and Dependency Injection for Java                             |
| javax.ejb                   | Enterprise JavaBeans                                                   |
| javax.el                    | Expression Language                                                    |
| javax.enterprise            | Contexts and Dependency Injection for Java                             |
| javax.enterprise.concurrent | Concurrency Utilities for Java EE                                      |
| javax.faces                 | JavaServer Faces                                                       |
| javax.inject                | Dependency Injection for Java                                          |
| javax.interceptor           | Interceptors                                                           |
| javax.jms                   | Java Message Service                                                   |
| javax.json                  | Java API for JSON Processing                                           |
| javax.json.bind             | Java API for JSON Binding                                              |
| javax.jws                   | Implementing Enterprise Web Services                                   |
| javax.mail                  | JavaMail                                                               |
| javax.persistence           | Java Persistence API                                                   |
| javax.resource              | Java EE Connector Architecture                                         |
| javax.security.auth.message | Java Authentication Service Provider Interface for Containers (JASPIC) |
| javax.security.enterprise   | Java EE Security API                                                   |
| javax.security.jacc         | Java Authorization Contract for Containers (JACC)                      |
| javax.servlet               | Java Servlet                                                           |
| javax.servlet.jsp           | JavaServer Pages                                                       |
| javax.servlet.jsp.jstl      | Standard Tag Library for JavaServer Pages (JSTL)                       |
| javax.transaction           | Java Transaction API (JTA)                                             |
| javax.validation            | Bean Validation                                                        |
| javax.websocket             | Java API for WebSocket                                                 |
| javax.ws.rs                 | Java API for RESTful Web Services (JAX-RS)                             |
| javax.xml.bind              | Java Architecture for XML Binding (JAXB)                               |
| javax.xml.soap              | SOAP with Attachments API for Java (SAAJ)                              |
| javax.xml.ws                | Java API for XML-Based Web Services (JAX-WS)                           |


  {{</ grid/div >}}
{{</ grid/div >}}
