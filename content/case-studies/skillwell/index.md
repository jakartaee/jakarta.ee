---
title: "Skillwell Simulate"
seo_title: "Skillwell Simulate case study"
description: "How Skillwell built its enterprise learning simulation platform on Jakarta EE."
date: 2026-07-16
eyebrow: "Case Studies / Skillwell Simulate"
headline: "Skillwell Simulate"
tagline: "How Skillwell built its enterprise learning simulation platform on Jakarta EE."
links:
  [
    [href: "./documents/skillwell-simulate-jakarta-ee-case-study.pdf", text: "Download the Case Study", class: "btn btn-primary btn-lg", icon: "fa-solid fa-download"],
  ]
layout: "article"
header_wrapper_class: "header-secondary-bg-img article-header"
jumbotron_class: "col-md-12"
hide_sidebar: true
hide_page_title: true
---

## Executive summary

The ETU Platform (marketed as Skillwell Simulate) is a market-leading learning simulation platform designed to deliver scalable, immersive experiences that drive real behaviour change while maintaining enterprise-grade reliability and integration. It enables organisations to rapidly create, deliver, and scale interactive simulations, while capturing rich performance data and actionable insights.

Built on [Jakarta EE](/), the platform provides a robust and scalable foundation with seamless integration across enterprise systems and cloud services, including AI capabilities. The result is a future-ready solution that enhances engagement, accelerates skill development, and delivers measurable impact at scale.

## Background & problem definition

As enterprise learning rapidly evolves towards AI-powered, immersive experiences, [Skillwell Simulate](#about-skillwell) addresses a critical gap in corporate learning by tackling the limitations of traditional training methods, which often fail to produce measurable and lasting behaviour change.

Organisations relying on conventional approaches frequently encounter low engagement, poor knowledge retention, and limited opportunities for practical skill application, leaving employees insufficiently prepared for real-world business challenges. At the same time, learning and development (L&D) teams face significant obstacles in creating high-quality, simulation-based content, as it is typically time-consuming, costly, and difficult to scale.

Skillwell is specifically designed to overcome these challenges by enabling the rapid creation of immersive, scenario-driven simulations that closely reflect real workplace situations. This empowers authors and L&D professionals to efficiently design impactful learning experiences, while learners benefit from hands-on, realistic practice that enhances skill acquisition, improves retention, and ultimately drives meaningful behavioural change across the organisation.

In addressing these challenges, there was a clear need for technologies that could support both scalability and immersion without increasing complexity for content creators. There was also a demand for technologies that could enable rich, responsive experiences, while remaining accessible to non-technical authors. Furthermore, the platform needed mechanisms to capture and analyse learner behaviour in real time, providing meaningful feedback and insights.

Ultimately, the challenge was not only to deliver immersive learning experiences, but to identify and integrate technologies that would make those experiences scalable, efficient to produce, and easy to deploy across diverse organisational contexts.

## Technology selection & rationale

The technology stack for Skillwell Simulate was deliberately selected to address the platform's need for reliability, interactivity, and scalability in a complex enterprise learning environment.

[Jakarta EE](/) was chosen as the foundation for Skillwell Simulate due to its proven track record in supporting robust, enterprise-grade applications and its strong alignment with the platform's complex functional requirements.

To support the rich, interactive nature of simulation-based learning, **Jakarta Faces (JSF)**, combined with **PrimeFaces**, enables the development of sophisticated user interfaces required for dynamic scenarios and authoring tools. Jakarta EE's built-in **session management and security features** are particularly well-suited to managing stateful user experiences, such as simulation progress and multi-step content creation, while supporting multi-tenant environments.

Additionally, **CDI (Contexts and Dependency Injection)** facilitates a clean, modular architecture aligned with domain-driven design principles, improving maintainability and scalability. For handling complex data relationships, including learner progress, simulation logic, and analytics, **Jakarta Persistence with Hibernate** offers a powerful and reliable ORM layer capable of managing the platform's complex domain model, which includes numerous interconnected entities related to simulations, learners, and analytics.

Crucially, Jakarta EE also supports the platform's scalability needs, enabling efficient **multi-tenant deployments** across AWS regions. Finally, seamless integration with AWS services via the **AWS SDK** allows the platform to extend its capabilities into cloud-native services such as S3 storage, Transcribe (for speech to text) and AI through Amazon Bedrock, supporting both scalability and advanced functionality.

Overall, this stack is well-matched to the challenge, as it supports stateful, logic-heavy applications with clear separation of concerns across modules such as the simulator, authoring tools, AI components, and analytics.

**Portability, vendor neutrality, long-term support, and adherence to open standards** were all of critical importance in the technology selection, as they directly impact the platform's scalability, maintainability, and future-proofing. Portability was ensured through a multi-module Maven architecture that can be deployed across different environments without reliance on container-specific code, alongside database flexibility achieved through tools like Liquibase. Vendor neutrality was a key principle, reflected in the use of open technologies such as CDI for dependency injection and Jakarta Persistence for persistence, rather than proprietary frameworks, as well as a cloud-agnostic application layer that avoids lock-in to any single provider.

**Long-term support** was equally essential, with confidence drawn from the stewardship of Jakarta EE by the Eclipse Foundation and the continued active development of key components such as Weld CDI, Hibernate, and PrimeFaces. Finally, a strong commitment to open standards, including SCORM and AICC for LMS integration, SAML for secure single sign-on, RESTful design principles, and Jakarta EE specifications, ensures interoperability, easier integration with enterprise systems, and access to a broad talent pool of developers with widely transferable skills.

{{< note >}}
## Choosing Jakarta EE 8 over newer versions

Skillwell Simulate is built on **Jakarta EE 8 APIs**, a deliberate choice driven by the need for stability, ecosystem compatibility, and reduced migration risk at the time of development. When the platform was initially developed, Java EE 8 represented a mature, production-ready standard with well-established tooling and widespread industry adoption.

Key components such as Weld CDI 3.1 provided a robust and feature-rich dependency injection framework, while JSF 2.3, paired with PrimeFaces, offered strong support for building the complex, interactive user interfaces required by the platform. Additionally, Hibernate 5.x aligned seamlessly with the JPA specifications in Java EE 8, ensuring reliable persistence for the platform's complex data models.

Maintaining Jakarta EE 8 has also avoided the significant overhead associated with migrating to newer versions, particularly the extensive namespace changes from `javax.*` to `jakarta.*`, which would require substantial refactoring across an established codebase. Furthermore, many critical third-party libraries, including the AWS SDK and Spring SAML, continue to provide strong support for Java EE 8 APIs, reinforcing its practicality. The platform is deployed on Apache Tomcat 9 and runs on AWS EC2, leveraging a stable and well-supported runtime environment that aligns with the chosen version.
{{< /note >}}

### Alternatives considered

Several alternative technologies and architectural approaches were evaluated during the development of Skillwell Simulate, but ultimately not adopted:

- **The Spring Framework**, while popular, was rejected for the core platform in favour of CDI, which offers a lighter-weight, standards-based approach more consistent with Jakarta EE.
- **Modern frontend frameworks** were also considered; however, JSF with PrimeFaces was retained due to its mature, feature-rich component library and compatibility with the existing codebase.
- **A microservices architecture** was explored but set aside in favour of a modular monolith, which provides simpler deployment and stronger transactional consistency, both critical for the platform's use case.
- **NoSQL databases** were not selected, as the platform requires strict ACID transactions to reliably manage learner progress and simulation state, making MySQL with Jakarta Persistence a better fit.

These decisions were guided by factors such as team expertise, the evolution of the existing system, and the need to meet enterprise-grade requirements around security, transactions, and session management.

{{< callout >}}
## Key takeaway

Jakarta EE was chosen for:

- Enterprise-grade reliability, stability, and long-term support
- Support for complex, stateful applications and multi-tenant deployments
- Seamless integration with AWS services
- Scalability and maintainability
- Commitment to open standards and vendor-neutrality
- Ecosystem compatibility and reduced migration risk
{{< /callout >}}

## Solution

Skillwell Simulate delivers an end-to-end learning solution that seamlessly connects content creation, learner engagement, and performance analytics within a unified platform.

The process begins with subject matter experts using the Simulation Builder to design immersive, scenario-based experiences, defining both the structure of the simulation and the specific competencies to be assessed. Learners then access these simulations through their organisation's existing ecosystem, such as an LMS, via secure, SAML-based single sign-on, ensuring a smooth and compliant authentication process.

Once inside the platform, learners are placed into realistic business scenarios where their decisions and actions are tracked in real time by the core Skillwell Simulate engine, which orchestrates all interactions and data flows. The experience is enriched through integrations with AI services, including generative video content and real-time AI-driven outputs, enhancing realism and engagement.

Upon completion, the platform instantly evaluates performance against predefined benchmarks, providing immediate feedback to the learner. Simultaneously, all interaction data is processed by a dedicated analytics engine, generating detailed insights and reports that highlight individual and organisational skill gaps. This data is securely stored in the cloud and made accessible via APIs, enabling integration with enterprise BI tools, while a secure authentication layer and automated communication systems ensure compliance, scalability, and continuous learner engagement throughout the lifecycle.

### Skillwell Simulate system landscape

{{< html >}}
<figure class="text-center">
  <img
    src="./images/system-landscape-full.webp"
    srcset="
      ./images/system-landscape-sm.webp 768w,
      ./images/system-landscape-full.webp 2768w
    "
    sizes="(max-width: 768px) 100vw, 1140px"
    loading="lazy"
    decoding="async"
    alt="Structurizr system landscape diagram. Skillwell Simulate sits at the centre, connected to three user roles (Learner, ETU Customer, ETU User) and to external systems: Degreed via API, an LMS via SCORM/AICC, and Azure via SAML. It exchanges data with a Pull API, Cloud Storage, a Data Analytics System, an Email System, Amazon Bedrock, and Synthesia."
  />
  <figcaption>
    System Architecture including software systems, the users that interact with them and its surrounding environment
    <a href="./images/system-landscape-full.webp" target="_blank" rel="noopener">View full size</a>
  </figcaption>
</figure>
{{< /html >}}

### Core components

- **Skillwell Simulate:** The central hub of the platform, responsible for building, delivering, and analysing immersive learning experiences. This component orchestrates all learner interactions and data flows.
- **AI Generative Content:** Integration with Synthesia for AI-generated video assets (avatars and voiceovers) and Amazon Bedrock for leveraging foundation models to generate real-time AI outputs within simulations.
- **Data Analytics Engine:** A specialised system that processes learner performance data to generate actionable insights and HTML-based reports, informing talent management strategies.
- **Secure Enterprise Authentication Layer:** A hardened integration gateway to provide secure, federated identity management. This ensures that learners are authenticated via trusted providers like Azure or enterprise LMS/LXPs (Degreed, etc.), maintaining strict access controls and protecting sensitive PII.
- **Secure Data Storage & Pull API:** All learner activity and simulation data are securely stored in Skillwell's Cloud Storage. Customers can programmatically retrieve this data on a polling schedule via the Pull API, allowing them to feed verified skill data directly into their own internal BI tools.
- **Automated Communication:** An integrated e-mail system handles high-volume automated messaging for learner notifications and system alerts.

{{< html >}}
<figure class="text-center">
  <img
    src="./images/simulate-containers-full.webp"
    srcset="
      ./images/simulate-containers-sm.webp 768w,
      ./images/simulate-containers-full.webp 3268w
    "
    sizes="(max-width: 768px) 100vw, 1140px"
    loading="lazy"
    decoding="async"
    alt="Structurizr container diagram of the Skillwell Simulate platform. Three user roles (Learner, Admin, Author) interact with the platform, which is fronted by a SAML Authentication Service and composed of two Jakarta web applications: an Immersive Simulator that delivers simulations, and a Simulation Builder for authoring. These are backed by a Simulate Database, a Filesystem, an S3 Bucket, a Content Generation Database, and a Scope Database, and integrate outward with Degreed, an LMS, Azure, a Data Analytics System, an Email System, Amazon Bedrock, and Synthesia."
  />
  <figcaption>
    Containers Diagram with focus on the Simulation Builder
    <a href="./images/simulate-containers-full.webp" target="_blank" rel="noopener">View full size</a>
  </figcaption>
</figure>
{{< /html >}}

## Implementation & integration

Skillwell Simulate incorporates a range of supporting technologies around Jakarta EE, which acts as the central application backbone coordinating all components through a consistent integration model.

The presentation layer is built using **Jakarta Faces with PrimeFaces**, supported by standard web technologies (HTML5, CSS3, JavaScript), while dependency injection is handled by **Weld CDI**, enabling clean integration of external services as injectable components. Persistence is managed through **Hibernate with MySQL and Liquibase** to ensure controlled schema evolution, and the build and testing ecosystem includes **Maven, JUnit 5, Cucumber, and Serenity BDD** for comprehensive validation.

The platform also integrates extensively with **AWS services**, such as Bedrock for AI capabilities, Transcribe for speech processing, and S3 and CloudFront for content delivery, by wrapping these services in **CDI beans**, ensuring they fit seamlessly into the Jakarta EE architecture.

Rather than replacing existing systems, Skillwell integrates with enterprise ecosystems through standards like **SCORM** and **AICC** for LMS connectivity, **SAML** for SSO with providers such as **Azure AD**, and REST APIs for platforms like **Degreed**.

### Challenges

The migration and integration planning for Skillwell Simulate presented several significant technical challenges, largely driven by the platform's need to balance stateful user experiences with scalable, cloud-based infrastructure.

One of the primary difficulties was **managing session state** across load-balanced AWS environments, requiring the implementation of sticky sessions and rigorous integrity checks to ensure consistency. This was closely tied to the challenge of **maintaining stateful simulations across multiple requests** using `@SessionScoped` beans. Another challenge was the **Jakarta Faces learning curve**: since Java Server Faces is not mainstream, most new developers lack experience.

Within the application architecture, **resolving circular dependencies in CDI** required careful design adjustments, including the use of setter injection to break dependency cycles. Integrating modern AI capabilities, such as AWS Bedrock, into a legacy JSF 2.3 interface also required a **clean CDI layer**.

On the data side, **evolving the database schema with zero downtime** was achieved through Liquibase with tagged migrations, while ensuring secure multi-tenant data isolation demanded robust access control mechanisms at the course level. Additionally, testing a complex, multi-module architecture required **coordinated integration testing** across bounded contexts using tools like Weld-JUnit5 and Cucumber. Finally, managing AI service rate limits and associated costs introduced **operational challenges**, which were mitigated through the use of mock implementations during testing.

{{< callout_quote author="Roberto Gonzalez" title="Senior Software Engineer, Skillwell Simulate" >}}
Working with Jakarta EE has been a very positive experience for our team. The ecosystem is backed by extensive documentation and a wealth of learning resources, which makes it easy to get productive quickly. We also found the 'cargo tracker' example application especially valuable – it goes beyond a simple demo and provides a realistic, end-to-end reference that maps well to patterns you can apply in real production applications.
{{< /callout_quote >}}

## Outcomes

The adoption of Jakarta EE within Skillwell Simulate has delivered strong outcomes in terms of code quality, maintainability, and overall team productivity, while supporting long-term sustainability of the platform.

The use of dependency injection, scoped beans, and declarative transaction management has significantly improved testability and lifecycle control, leading to cleaner, more reliable code. Maintainability has been enhanced through adherence to standard Jakarta EE patterns, modularisation via Maven, and interface-driven design, allowing components to be easily extended or replaced.

This has also contributed to improved onboarding, as developers familiar with enterprise Java can quickly become productive, focusing primarily on domain-specific logic rather than learning proprietary frameworks. Modern Java features such as Records, Streams, and the Optional API have further streamlined development, reducing boilerplate and improving code clarity.

From a business perspective, the platform now supports multi-tenant deployments, seamless LMS integrations, and global delivery, while maintaining high reliability for mission-critical training. Although some trade-offs exist, such as the increasing difficulty of hiring JSF specialists and anticipated namespace migration efforts from `javax.` to `jakarta.`, the overall investment has proven worthwhile, delivering a stable, scalable, and vendor-independent solution with a lower total cost of ownership and the flexibility to evolve, including the integration of AI capabilities into an established system.

{{< callout >}}
## Key takeaway

The adoption of Jakarta EE has delivered strong outcomes in terms of:

- Code quality
- Maintainability
- Overall team productivity
- Long-term sustainability
{{< /callout >}}

## Future roadmap

Looking ahead, Skillwell Simulate is positioned for significant growth as enterprise learning increasingly shifts towards AI-driven, immersive experiences. Over the next five years, the platform is expected to scale substantially, with a projected 5–10x increase in learners and exponential growth in media storage driven by AI-generated content such as video-based simulations.

The roadmap prioritises expanding AI capabilities, including automated coaching, personalised feedback, and AI-assisted simulation authoring to dramatically reduce content creation time. New interaction models, such as natural language-based voice and text engagement, will further enhance realism, while advanced analytics will provide deeper insights linking learning outcomes directly to business performance.

To support this evolution, Jakarta EE will remain central to the platform's architecture, with a phased modernisation strategy that includes:

- Upgrading to **Jakarta EE 11** (Jakarta Faces, CDI, Jakarta Persistence, Tomcat 10+) and **Java 21 LTS** (Virtual Threads for AI/AWS async processing, pattern matching, upgrade to Hibernate 6)
- Adopting [MicroProfile](https://microprofile.io/) for cloud-native capabilities
- Progressively transitioning towards a more modular, API-driven architecture with modern frontend technologies such as React
- Implementing JWT Authentication, setting Redis for session storage, configuring CORS for frontend-backend communication
- Transitioning from Tomcat to full Jakarta EE servers for improved cloud-native features and faster startup
- Adopting Docker/Kubernetes for orchestration, leveraging stateless Jakarta EE services for horizontal scaling, and externalising sessions to Redis/Hazelcast

In the longer term, the platform aims to embrace fully cloud native principles through containerisation and orchestration, enabling greater scalability, resilience, and global distribution across regions such as the US and APAC.

### Advice to organisations considering Jakarta EE

{{< html >}}
<div class="callout-compare">
  <div class="callout-success">
    <p class="callout-success-title">Do choose Jakarta EE if:</p>
    <p>You have enterprise requirements (security, transactions), need long-term sustainability (5–10+ years), have a team with Java EE expertise, or require vendor neutrality.</p>
  </div>
  <div class="callout-danger">
    <p class="callout-danger-title">Don't choose Jakarta EE if:</p>
    <p>You are building a greenfield mobile-first app or are a small startup needing rapid MVP prototyping in weeks.</p>
  </div>
</div>
{{< /html >}}

## About Skillwell

Skillwell is a learning platform that provides personalised, adaptive learning experiences combined with simulation-based training. It is designed to support skill development by enabling learners to engage in realistic, practice-based scenarios. The platform uses AI to tailor learning pathways and address common challenges such as inefficient training, limited opportunities for practical application, and gaps in skill visibility. Skillwell is used by millions of people in organisations and educational institutions to support workforce and learner development.
