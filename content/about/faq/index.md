---
title: "Frequently Asked Questions"
seo_title: "Frequently Asked Questions | Jakarta EE | The Future of Cloud Native Java"
description: "Learn about Jakarta EE and what it means for the future of open source, cloud native enterprise Java."
date: 2018-04-07T16:09:45-04:00
type: "about/faq"
---

Last Updated: October 19, 2018

<br/>

## Q: What is Jakarta EE?

A: Jakarta EE is the future for cloud-native, light-weight, and traditional enterprise Java applications

-   Java EE technologies contributed by Oracle are being used to create the new Jakarta EE platform

-   The Eclipse Foundation is the home of Cloud Native Java open innovation

-   The Jakarta EE Working Group is focused on modernizing Java EE technologies and governance processes to be more open and community-based

---

## Q: What is the significance of the name “Jakarta EE”? How did you come up with the name?

A: In the early days of Java, the Apache Jakarta project was the home of many exciting innovations in the Java ecosystem. It was particularly instrumental in establishing a strong open source community in and around the Java platform. [According to Wikipedia](https://en.wikipedia.org/wiki/Jakarta_Project#Project_name) the name was originally selected because it was the meeting room used at Sun Microsystems for the meetings that led to the project creation.

In February 2018,  the Community was welcomed to vote on the new name for Java EE. Almost 7,000 community members voted in our community poll, and [over 64% voted in favour of Jakarta EE](https://mmilinkov.wordpress.com/2018/02/26/and-the-name-is/). Read [Java EE to Jakarta EE](http://www.tomitribe.com/blog/2018/02/java-ee-to-jakarta-ee/) which explains the history behind the name selection.  The Apache Software Foundation kindly allowed the Eclipse Foundation to resume using that name, after it was retired at Apache in 2011.

---

## Q: What is included in the Jakarta EE platform?

A: Initially Jakarta EE is the exact equivalent to the Java EE 8 platform. All of the specifications, reference implementations (RIs), and technology compatibility kits (TCKs) that comprised [Java EE 8](http://www.oracle.com/technetwork/java/javaee/overview/index.html) have been transferred to the Eclipse Foundation.

---

## Q: What is the status of the Java EE TCKs?

A: The Java EE 8 Technology Compatibility Kits (TCKs) have been contributed by Oracle and open sourced at the Eclipse Foundation under the [Eclipse Public License (EPL-2.0)](https://www.eclipse.org/legal/epl-2.0/). The TCKs are hosted in the Foundation's [Git repositories](https://github.com/eclipse-ee4j). We expect these to be the basis for Jakarta EE 8 compatibility tests for compatible implementations of the Jakarta EE specifications.

---

## Q: How does the Jakarta EE governance model differ from Java EE governance model?

A: The main difference is that the governance model is now inherently community-based, multi-vendor, and open to participation and contribution by the enterprise consumers of these technologies. The Eclipse Foundation has a 14 year track record of providing a pragmatic, well understood governance model for all interested parties to collaborate on technology. The Foundation will ensure that the new specifications and development processes for Jakarta EE will be open, vendor-neutral, and provide a level playing field for all participants.

The Eclipse Foundation Specification Process is under development. It is being led by the Jakarta EE Specification Committee using a transparent process that will include engaging the Community for feedback.

---

## Q: How will the new release cycles work for Jakarta EE?

A: We are still working through the release cycles, so we cannot commit to any particular schedule or cadence at this time. However, there is a strong commitment by all involved to significantly increase the pace of innovation. We intend to also listen to both the developer community and the enterprise consumers of Jakarta EE technologies to understand what their desires are. Obviously there are trade-offs to be made between things such as stability versus pace of new innovation, but it is the fact these trade-offs are being addressed in an open and inclusive manner that will help drive the success of Jakarta EE.

---

## Q: What’s going to be in the next release of GlassFish, and when will it get launched?

A: As part of the move to Eclipse, GlassFish is now Eclipse GlassFish. There are going to be two releases of Eclipse GlassFish:

1.  On January 29, 2019, the community will release an **Eclipse GlassFish 5.1** which is certified as Java EE 8 compatible. This will also be the first release of all of the projects being moved to the Eclipse Foundation, and as such will be a significant event in the on-boarding of the Java EE 8 technologies into the Eclipse community.

2.  Later in 2019, the community will release an Eclipse GlassFish 5.2 which is certified as **Jakarta EE 8** compatible. 

---

## Q: Beyond the immediate roadmap, what is the overall vision for the technical future of Jakarta EE? What are the most important areas to evolve?

A: The key areas that we have heard that developers and other stakeholders want us to focus on include:

-   Enhanced support for microservices architecture

-   Move to Cloud Native Java, which includes better integrations with technologies like Docker and Kubernetes

-   Increase the pace of innovation

-   Build a vibrant developer community

-   Provide production quality reference implementations

---

## Q: What is the relationship between EE4J and Jakarta EE?

Here are two good posts that explain the relationships between the two, and when you should use which name. TL;DR - Jakarta EE is the name used unless talking about the implementations of Jakarta EE at Eclipse.

-   <http://www.agilejava.eu/2018/03/22/the-relationship-between-jakarta-ee-ee4j-and-java-ee/>

-   <https://dev.eclipse.org/mhonarc/lists/ee4j-community/msg01403.html>

---

## Q: When will there be a Jakarta EE [ 9 | 1.0 | 2019.MM.DD ] release that will include enhanced support for microservices architectures and cloud-native application development?

A: The current focus is to on board all of the projects, and get to the first release which is branded as Jakarta EE 8. Stay tuned for announcements, as this is one of the key priorities going forward.

---

## Q: Will Jakarta EE support the creation and management of microservices as a top priority for most enterprise modernization efforts?

A: Yes. We also expect that the existing Eclipse MicroProfile community and other open source communities to continue leading the way. Incorporating Java innovations from these projects and communities into new versions of the platform will be key to our success.

---

## Q: How will Jakarta EE support cloud-enablement of legacy Java systems?

A: We expect to see the community to work towards better integrations with cloud native technologies such as Kubernetes and Docker. Some of these integrations need to happen at the Java virtual machine (JVM) level. We expect the Jakarta EE community to work closely with the OpenJDK and Eclipse OpenJ9 team to provide support at the framework level as these JVM enhancements are made available.

---

## Q: What are the key intersections making sure the language and the EE platform are in lock-step?

A: The Jakarta EE release cadence and schedule have not yet been determined. Once the community decides what the correct cadence is, we can start discussions to ensure alignment with other communities like OpenJDK.

---

## Q: Who and how can one use Jakarta EE Compatibility Logo?

A: The first thing to understand is that the logo is not available for any specifications other than the Profiles (Full, Web). So, for example, implementing only Servlet does not permit the use of the Jakarta EE Compatibility logo by any organization or project.

If an open source implementation of the Jakarta EE 8 Web or Full Profile follows the TCK process and is in compliance with the Eclipse Foundation TCK license, the open source project can certainly declare that it is a Compatible Implementation.

In order to use the Jakarta EE Compatibility logo, an organization sponsoring the open source project must meet the membership eligibility requirements specified in the Jakarta EE Trademark Guidelines.

At a high level, the use of the Compatibility logo is limited to only members of the Jakarta EE Working Group who are licensees under the Jakarta EE Trademark License Agreement or approved guest members of the Working Group (who are also licensees under the Eclipse Foundation Trademark License).

We are working with our friends at the Apache Software Foundation to allow their projects to use the Compatibility logo at no charge. We are open to working with other open source foundations that are interested in making the logo available to their eligible projects.

We require membership in the Working Group because the Jakarta EE Compatibility logo and brand have value to our community and the industry. We rely on membership funding to financially support the management of the Jakarta EE specification process, compatibility rules, and developer outreach activities to drive awareness and adoption. Also, Working Group membership fees fund the promotion of the Jakarta EE Compatible brand and its value in the marketplace.

Refer to [Jakarta EE Trademark Guidelines](/legal/trademark_guidelines/) for more details.

---

## Q: How can I get involved in Jakarta EE?

A: There are a number of ways to answer that question, depending on who or what you are.

-   As a contributor you can simply contribute to the [EE4J projects](https://github.com/eclipse-ee4j) on GitHub via pull requests. You will have to sign our [Eclipse Contributor Agreement](https://www.eclipse.org/legal/ECA.php) to do that.

-   As a committer you are already involved! Thank you for your efforts on the projects you participate in. If you would like to get involved in our governance, there are numerous opportunities to do so. For example you can run in the Eclipse Foundation Board elections, or the Jakarta EE working group elections. These elected positions are very important, and provide the committer community with an opportunity to influence our governance. The first step for committers to participate in the governance is to become a Committer Member of the Eclipse Foundation.  Details about this can be found on the [Eclipse Foundation membership page](https://www.eclipse.org/membership/become_a_member/).

-   As a software vendor you can join the Eclipse Foundation as a Solutions Member, and the Jakarta EE Working Group as a Participant Member. This allows you to support the sustainability of the community, participate in marketing programs, and engage directly with the community.

-   As an enterprise you can join the Jakarta EE Working Group as an Enterprise Member. Details of the various Membership levels are provided in the [Jakarta EE Working Group Charter.](https://www.eclipse.org/org/workinggroups/jakarta_ee_charter.php) This allows you to support the sustainability of the community, participate in marketing programs, and engage directly with the community. In addition, Influencer Members participate in the Enterprise Requirements Committee to provide your specific requirements into the annual roadmap process for Jakarta EE.

-   As a Java EE and/or cloud platform vendor you can join the Eclipse Foundation and the Jakarta EE Working Group as a Strategic Member. This allows you to support the sustainability of the community, participate in marketing programs, and engage directly with the community. It also provides direct access to the governance of both the Eclipse Foundation and the Jakarta EE Working Group.
