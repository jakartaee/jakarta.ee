---
title: "Frequently Asked Questions"
date: 2018-04-07T16:09:45-04:00
---
#### Q: What are we announcing on April 24?

A: The key elements of the announcement are:

* Java EE technologies contributed by Oracle will be used to create the new Jakarta EE platform, including a fresh new logo selected by the community.
* The Eclipse Foundation is the new home of Cloud Native Java 
* Jakarta EE Working Group[link to charter] priorities for modernizing the technology and its governance processes to be more open and community-based
* Results of inaugural Jakarta EE [developer survey](/documents/insights/2018-jakarta-ee-developer-survey.pdf).

---

#### Q:  What is the significance of the name “Jakarta EE”? How did you come up with the name?

A: In the early days of Java, the Apache Jakarta project was the home of many exciting innovations in the Java ecosystem. It was particularly instrumental in establishing a strong open source community in and around the Java platform. [According to Wikipedia](https://en.wikipedia.org/wiki/Jakarta_Project#Project_name) the name was originally selected because it was the meeting room used at Sun Microsystems for the meetings that led to the project creation.

In February 2018,  the Community was welcomed to vote on the new name for Java EE. Almost 7,000 community members voted in our community poll, and [over 64% voted in favour of Jakarta EE](https://mmilinkov.wordpress.com/2018/02/26/and-the-name-is/). Read [Java EE to Jakarta EE](http://www.tomitribe.com/blog/2018/02/java-ee-to-jakarta-ee/) which explains the history behind the name selection.  The Apache Software Foundation kindly allowed the Eclipse Foundation to resume using that name, after it was retired at Apache in 2011.

---

#### Q:  What is included in the Jakarta EE platform?

A: Initially Jakarta EE is the exact equivalent to the Java EE 8 platform. All of the specifications, reference implementations (RIs), and technology compatibility kits (TCKs) that comprised [Java EE 8](http://www.oracle.com/technetwork/java/javaee/overview/index.html) will be transferred to the Eclipse Foundation. 

---

#### Q:  How does the Jakarta EE governance model differ from Java EE governance model?

A: The main difference is that the governance model is now inherently community-based, multi-vendor, and open to contribution by the enterprise consumers of these technologies. The Eclipse Foundation has a 14 year track record of providing a level playing field for all interested parties to collaborate on technology. The Foundation will ensure that the new specifications and development processes for Jakarta EE will be open, vendor-neutral, and provide a level playing field for all participants. 

In the past few years, the Java Community Process (JCP) has done a better  job at integrating the community it serves by being more open and transparent.  However,  it is a body ultimately controlled by Oracle, and its intellectual property rules gave the Spec Lead a distinct advantage relative to the other stakeholders. 

---

#### Q:  How will the new release cycles work for Jakarta?
A: We are still working through the release cycles, so we cannot commit to any particular schedule or cadence at this time. However, there is a strong commitment by all involved to significantly increase the pace of innovation. We intend to also listen to both the developer community and the enterprise consumers of Jakarta EE technologies to understand what their desires are. Obviously there are trade-offs to be made between things such as stability versus pace of new innovation. 

---

#### Q:  What’s going to be in the next release of GlassFish, and when will it get launched?

A: There are going to be two releases of Eclipse GlassFish in 2018

1. In Q3 2018 the community will release an Eclipse GlassFish 5.1 which is certified as Java EE 8 compatible. This will also be the first release of all of the projects being moved to the Eclipse Foundation, and as such will be a significant event in the on-boarding of the Java EE 8 technologies into the Eclipse community.
2. In Q4 2018 the community will release an Eclipse GlassFish 5.2 which is certified as Jakarta EE 8 compatible. This will be the first pass through the new specification process, and will be an important milestone. 

---

#### Q: What is the relationship between EE4J and Jakarta EE?

A: Here are two good posts that explain the relationships between the two, and when you should use which name:

* http://www.agilejava.eu/2018/03/22/the-relationship-between-jakarta-ee-ee4j-and-java-ee/
* https://dev.eclipse.org/mhonarc/lists/ee4j-community/msg01403.html 

---

#### Q:  Beyond the immediate roadmap, what is the overall vision for the technical future of Jakarta EE? What are the most important areas to evolve?

A: The key areas that we have heard that developers and other stakeholders want us to focus on include:

* Enhanced support for microservices architecture
* Move to Cloud Native Java, which includes better integrations with technologies like Docker and Kubernetes
* Increase the pace of innovation
* Build a vibrant developer community
* Provide production quality reference implementations

---

#### Q: When will there be a Jakarta EE [ 9 | 1.0 | 2019.MM.DD ] release that will include enhanced support for microservices architectures and cloud-native application development?

A: The current focus is to on board all of the projects, and get to the first release which is branded as Jakarta EE 8. Stay tuned for announcements later this year. 

---

#### Q:  Will Jakarta EE support the creation and management of microservices as a top priority for most enterprise modernization efforts?

A: Yes. We expect that the existing Eclipse MicroProfile community and other open source communities to continue leading the way. Incorporating Java innovations from these projects and communities into new versions of the platform will be key to our success. 

---

#### Q:  How will Jakarta EE support cloud-enablement of legacy Java systems?

A: We expect to see the community to work towards better integrations with cloud native technologies such as Kubernetes and Docker. Some of these integrations need to happen at the Java virtual machine (JVM) level. We expect the Jakarta EE community to work closely with the OpenJDK and Eclipse OpenJ9 team to provide support at the framework level as these JVM enhancements are made available. 

---

#### Q:What are the key intersections making sure the language and the EE platform are in lock-step?

A: The Jakarta EE release cadence and schedule have not yet been determined. Once the community decides what the correct cadence is, we can start discussions to ensure alignment with other communities like OpenJDK.

---

#### Q:  When will the Technology Compatibility Kits (TCKs) become more open and a less arduous process required for vendor contribution to Jakarta EE?
A: Oracle has committed to open sourcing the TCKs as part of this process in 2018. Having the TCKs available under an open source license for the first time will definitely be one of the factors allowing a more rapid pace of innovation in the community. Previously the TCKs were only available to Java EE licensees, who paid significant dollars in order to get access to them. In the future, individuals in the community will be able to run TCKs to verify compatibility. (Note that this is not the same thing as certifying compatible implementations, which will still require a TBD Jakarta EE trademark license.)

---

#### Q:  How can I get involved in the Eclipse Foundation?

A: There are a number of ways to answer that question, depending on who or what you are. 

* As a **contributor** you can simply contribute to the EE4J projects on GitHub via pull requests. You will have to sign our Eclipse Contributor Agreement to do that.
* As a **committer** you are already involved! Thank you for your efforts on the projects you participate in. If you would like to get involved in our governance, there are numerous opportunities to do so. For example you can run in the Eclipse Foundation Board elections, or the Jakarta EE working group elections. These elected positions are very important, and provide the committer community with an opportunity to influence our governance. 
* As a **software vendor** you can join the Eclipse Foundation as a Solutions Member, and the Jakarta EE Working Group as a Participant Member. This allows you to support the sustainability of the community, participate in marketing programs, and engage directly with the community. 
* As an **enterprise** you can join the Eclipse Foundation as an Enterprise Member, and the Jakarta EE Working Group as an Enterprise Member. This allows you to support the sustainability of the community, participate in marketing programs, and engage directly with the community. In addition, Enterprise Members participate in the Enterprise Requirements Committee to provide your specific requirements into the annual roadmap process for Jakarta EE.
* As a **Java EE and/or cloud platform vendor** you can join the Eclipse Foundation and the Jakarta EE Working Group as a Strategic Member. This allows you to support the sustainability of the community, participate in marketing programs, and engage directly with the community. It also provides direct access to the governance of both the Eclipse Foundation and the Jakarta EE Working Group. 
