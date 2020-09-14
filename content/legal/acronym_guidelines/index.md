---
title: "Oracle/JCP Acronym Guidelines"
date: 2019-06-26T16:10:38-04:00
description: "Guidelines for the use of existing Oracle/JCP Acronyms.  Supplement to the Eclipse Foundation Guidelines for Eclipse Logos & Trademarks Policy."
hide_sidebar: "false"
---

_Guidelines for the use of existing Oracle/JCP Acronyms. Supplement to the Eclipse Foundation [Guidelines for Eclipse Logos & Trademarks Policy](https://jakarta.ee/legal/trademark_guidelines/)_

Version 1.0 - June 26, 2019

The goal of these guidelines is to avoid confusion and ensure that the developer community can easily identify whether a Jakarta EE project, specification, test suite, or other related item originates from Oracle/JCP or from the Eclipse/Jakarta EE process.

The list of Oracle/JCP acronyms appears at the bottom of this document.

For names of Jakarta EE projects, specifications, test suites, and other related materials, the **full project name/title** and any **scope statement** should not incorporate an identified acronym.

*   OK: "Jakarta Message Service Specification"
*   Not OK: "JMS Specification"
*   Not OK: "Jakarta Message Service (JMS) Specification"

The current **short names** (or id) for Jakarta EE projects are sometimes derived from Oracle/JCP acronyms (for example jaxrs-api, jaf and jpa-api). For **repositories** created for these projects, use of the current short names for these projects, within the following GitHub organization names, continues to be acceptable:

*   eclipse (e.g. github.com/eclipse/[current_short_names])
*   eclipse-ee4j
*   jakartaee
*   eclipse-jakartaee

For **projects** created at the Eclipse Foundation, use of the current ids and short names for these projects in URLs with the following form continues to be acceptable:

*   eclipse.org/projects/[current id]
*   projects.eclipse.org/projects/[current short name]

For maximum flexibility and clarity, we encourage projects to change their short names to more closely correspond to the new specification names, if applicable, and avoid the Oracle/JCP acronyms where possible.

If a specification document (or related materials) contains **references** to an Oracle/JCP acronym, include a sentence such as the following: _"References in this document to JMS refer to the Jakarta Message Service unless otherwise noted."_ The sentence needs to be a legible size and should appear early in the specification document (or related materials), not in an illegibly small footnote. A reader should not have to scroll, turn a page, or click a link to get to the sentence.

A **URL, repository name, package name, class name, or method** name may include the acronym to the right of a string identifying Eclipse or Jakarta as the origin.

*   OK: github.com/eclipse-ee4j/jms
*   OK: eclipse.org/projects/ee4j.jms
*   OK: jakarta.jms.JMSContext

An email address for a project may include the acronym to the left of the @ symbol.

*   OK: jms-dev@eclipse.org

As has been stated previously by Mike Milinkovich in the [Update on Jakarta EE Rights to Java Trademarks](https://blogs.eclipse.org/post/mike-milinkovich/update-jakarta-ee-rights-java-trademarks) blog post:

<q>"The javax package namespace may be used within Jakarta EE specifications but may be used “as is” only. No modification to the javax package namespace is permitted within Jakarta EE component specifications. Jakarta EE specifications that continue to use the javax package namespace must remain TCK compatible with the corresponding Java EE specifications."</q>

Jakarta EE 8 will use existing Java EE 8 package names using the existing javax namespace, "as is" and without modifications, consistent with this guidance. If there are modifications, in Jakarta EE 9 or later, to existing Jakarta EE 8 and Java EE 8 packages/APIs, new (non-javax) package names must be used. See above guidance on package naming.

**<u>Acronyms Used by Oracle or the JCP</u>**

*Java Development Kit (JDK) and Java Virtual Machine (JVM) technologies are not part of the Jakarta project. Contact trademark_us@oracle.com before using these acronyms.

*   EJB
*   J2EE
*   JAAS
*   JACC
*   JAF
*   JAR
*   JASPIC
*   JAX (including JAXB, JAXP, JAX-WS, JAX-RS and other uses of “JAX”)
*   JCA
*   JCE
*   JCK
*   JCP
*   JDBC
*   JDK*
*   JFC
*   JFR
*   JLS
*   JMOD
*   JMS
*   JMX
*   JNDI
*   JNI
*   JPA
*   JPMS
*   JRE
*   JRMP
*   JSF
*   JSP
*   JSPA
*   JSR
*   JSTL
*   JTA
*   JTS
*   JVM*
*   JWS
*   RMI and RMI-IIOP
*   SAAJ
