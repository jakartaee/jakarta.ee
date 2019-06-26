---
title: "Oracle/JCP Acronym Guidelines"
date: 2019-06-26T16:10:38-04:00
description: "Supplement to the Eclipse Foundation Guidelines for Eclipse Logos & Trademarks Policy for Oracle/JCP Acronyms"
hide_sidebar: "false"
---

<p><em>Supplement to the Eclipse Foundation Guidelines for Eclipse Logos & Trademarks Policy for Oracle/JCP Acronyms</em></p>

<p>Version 1.0 - June 26, 2019</p>

<p>The goal of these guidelines is to avoid confusion and ensure that the developer community can
easily identify whether a Jakarta EE project, specification, test suite, or other related item
originates from Oracle/JCP or from the Eclipse/Jakarta EE process.</p>

<p>The list of Oracle/JCP acronyms appears at the bottom of this document.

<p>For names of Jakarta EE projects, specifications, test suites, and other related materials, the
<b>full project name/title</b> and any <b>scope statement</b> should not incorporate an identified
acronym.</p>

<ul>
  <li>OK:  "Jakarta Message Service Specification"</li>
  <li>Not OK:  "JMS Specification"</li>
  <li>Not OK:  "Jakarta Message Service (JMS) Specification"</li>
</ul>

<p>The current <b>short names</b> (or id) for Jakarta EE projects are sometimes derived from
Oracle/JCP acronyms (for example jaxrs-api, jaf and jpa-api).  For <b>repositories</b> created for
these projects, use of the current short names for these projects, within the following GitHub
organization names, continues to be acceptable: </p>

<ul>
  <li>eclipse (e.g. https://github.com/eclipse/[current short names])</li>
  <li>eclipse-ee4j</li>
  <li>jakartaee</li>
  <li>eclipse-jakartaee</li>
</ul>

<p>For <b>projects</b> created at the Eclipse Foundation, use of the current ids and short names
for these projects in URLs with the following form continues to be acceptable:</p>

<ul>
  <li>eclipse.org/projects/[current id]</li>
  <li>projects.eclipse.org/projects/[current short name]</li>
</ul>

<p>For maximum flexibility and clarity, we encourage projects to change their short names to more
closely correspond to the new specification names, if applicable, and avoid the Oracle/JCP acronyms
where possible.</p>

<p>If a specification document (or related materials) contains <b>references</b> to an Oracle/JCP
acronym, include a sentence such as the following: <i>"References in this document to JMS refer to the
Jakarta Message Service unless otherwise noted."</i>  The sentence needs to be a legible size and
should appear early in the specification document (or related materials), not in an illegibly small
footnote.  A reader should not have to scroll, turn a page, or click a link to get to the
sentence.</p>

<p>A <b>URL, repository name, package name, class name, or method</b> name may include the acronym to the right of a string identifying Eclipse or Jakarta as the origin.</p>

<ul>
  <li>OK: github.com/eclipse-ee4j/jms</li>
  <li>OK: eclipse.org/projects/ee4j.jms</li>
  <li>OK: jakarta.jms.JMSContext</li>
</ul>

<p>An email address for a project may include the acronym to the left of the @ symbol.</p>

<ul>
  <li>OK: jms-dev@eclipse.org</li>
</ul>

<p>As has been stated previously by Mike Milinkovich in the <a href="https://blogs.eclipse.org/post/mike-milinkovich/update-jakarta-ee-rights-java-trademarks">Update on Jakarta EE Rights to Java Trademarks</a> blog post:</p>

<p><q>"The javax package namespace may be used within Jakarta EE specifications but may be used “as
is” only.  No modification to the javax package namespace is permitted within Jakarta EE component
specifications. Jakarta EE specifications that continue to use the javax package namespace must
remain TCK compatible with the corresponding Java EE specifications."</q></p>

<p>Jakarta EE 8 will use existing Java EE 8 package names using the existing javax namespace, "as
is" and without modifications, consistent with this guidance.  If there are modifications, in
Jakarta EE 9 or later, to existing Jakarta EE 8 and Java EE 8 packages/APIs, new (non-javax)
package names must be used.  See above guidance on package naming.</p>

<p><b><u>Acronyms Used by Oracle or the JCP</u></b></p>
 
<p>*Java Development Kit (JDK) and Java Virtual Machine (JVM) technologies are not part of the
Jakarta project.  Contact trademark_us@oracle.com before using these acronyms.</p>

<ul>
  <li>EJB</li>
  <li>J2EE</li>
  <li>JAAS</li>
  <li>JACC</li>
  <li>JAF</li>
  <li>JAR</li>
  <li>JASPIC</li>
  <li>JAX (including JAXB, JAXP, JAX-WS, JAX-RS and other uses of “JAX”)</li>
  <li>JCA</li>
  <li>JCE</li>
  <li>JCK</li>
  <li>JCP</li>
  <li>JDBC</li>
  <li>JDK*</li>
  <li>JFC</li>
  <li>JFR</li>
  <li>JLS</li>
  <li>JMOD</li>
  <li>JMS</li>
  <li>JMX</li>
  <li>JNDI</li>
  <li>JNI</li>
  <li>JPA</li>
  <li>JPMS</li>
  <li>JRE</li>
  <li>JRMP</li>
  <li>JSF</li>
  <li>JSP</li>
  <li>JSPA</li>
  <li>JSR</li>
  <li>JSTL</li>
  <li>JTA</li>
  <li>JTS</li>
  <li>JVM*</li>
  <li>JWS</li>
  <li>RMI and RMI-IIOP</li>
  <li>SAAJ</li>
</ul>
