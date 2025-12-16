---
title: "What's Up with Open Standard Enterprise Java and AI?"
date: 2025-10-02T12:00:00
summary: "Enterprise Java has always been about standards—about providing a foundation that's stable, interoperable, and vendor-neutral. If you've been around since the days of Servlets, EJBs, and JPA, you know that Jakarta EE's approach is to standardize what's proven, not chase every shiny new thing. That's why mission-critical systems still rely on Jakarta EE's backbone, and why customers look to the platform for direction and leadership. The Eclipse Foundation's stewardship and open process help to reinforce this."
seo_title: "Jakarta EE and Artificial Intelligence"
keywords: ["unlocking potential", "Jakarta EE", "AI"]
---

Enterprise Java has always been about standards—about providing a foundation that's stable, interoperable, and vendor-neutral. If you've been around since the days of Servlets, EJBs, and JPA, you know that Jakarta EE's approach is to standardize what's proven, not chase every shiny new thing. That's why mission-critical systems still rely on Jakarta EE's backbone, and why customers look to the platform for direction and leadership. The Eclipse Foundation's stewardship and open process help to reinforce this.

## Jakarta EE is a standard, and standards are for standardizing.

There is a lot going on related to AI in open and proprietary enterprise Java standards.

## Current efforts

Let's look at how the ecosystem is responding to the AI wave, and where standardization might take us.

### LangChain4j

LangChain4j is a Java framework for building LLM-powered apps, supporting RAG, agentic workflows, and integration with popular LLMs and vector stores. The focus is on enterprise use cases, security, and interoperability with Jakarta EE and Spring. As adoption grows, we can expect standard API proposals to emerge from community feedback. 

#### langchain4j-cdi 

The [langchain4j-cdi](https://github.com/langchain4j/langchain4j-cdi/) project aims to ensure that all runtimes that support CDI can make use of the full spectrum of LangChain4j features in a well-integrated and common-sense way. This integration layer provides a consistent pattern for AI integration across Jakarta EE implementations, making it easier for enterprise Java developers to adopt AI capabilities within their existing applications.  As a sub-project of https://github.com/langchain4j, langchain4j-cdi is obligated to prioritize the approaches taken by langchain4j framework in all aspects of interacting with the wider AI ecosystem, including interaction with agents. See this [tutorial](https://docs.langchain4j.dev/tutorials/agents/) to learn how langchain4j approaches agents.

### Quarkus AI

Quarkus, the Kubernetes-native Java stack, is evolving quickly. Extensions for AI integration (LangChain4j, OpenAI, vector DBs) are here now, and agentic patterns, RAG, and seamless cloud AI service integration are on the way. Note that Quarkus innovations often lead to future Jakarta EE standards.

### Spring AI

Spring AI brings abstractions for integrating AI services (LLMs, embeddings, RAG) into Spring apps, with a focus on developer productivity and cloud-native patterns.  Collaboration with Jakarta EE communities is key for aligning APIs and best practices.

### Helidon AI

Helidon, the open-source Java microservices framework, is experimenting with AI integrations—especially around observability and cloud-native deployment. It's early days, but there's a lot of potential for contributing patterns to the broader Java AI ecosystem.

### Payara AI

Payara is exploring AI-powered monitoring, anomaly detection, and integration with external AI services. The goal is to enhance operational intelligence for Jakarta EE apps and share learnings with the Jakarta EE community.

## Vendor Implementations: Tactical Response to AI Demand

Vendors are moving quickly to support AI integration—connectors for LLMs, vector databases, and observability tools. Jakarta EE's long-term approach ensures that standardized features will work consistently across all implementations. 

## Roadmap: Mutual Benefits for Jakarta EE and AI Innovations

This section explores the current, and very rapidly evolving state of AI in Java, and suggests some ways in which Jakarta EE can be relevant in each of those aspects.

### MCP (Model Control Protocol) [https://github.com/modelcontextprotocol](https://github.com/modelcontextprotocol)

Jakarta EE can provide a stable, standardized API layer via MCP, letting enterprise Java apps interact with AI models. MCP extends Jakarta EE's reach into AI/ML, enabling new use cases like model lifecycle management and governance—critical for regulated industries. Standardizing MCP reduces fragmentation and accelerates adoption.

### Agent2Agent (A2A) Protocol [https://github.com/a2aproject/A2A](https://github.com/a2aproject/A2A)

Jakarta EE's messaging and transaction infrastructure is a natural fit for secure, reliable AI-to-AI interactions with A2A. A2A patterns can leverage Jakarta EE's security, scalability, and interoperability, making it easier to orchestrate complex agentic workflows across distributed systems. Formalizing A2A enables new business logic paradigms—multi-agent collaboration, autonomous decision-making—while maintaining enterprise-grade reliability.

### RAG (Retrieval-Augmented Generation)

Jakarta EE's data access standards (Jakarta Data, JPA) can be extended to support vector databases and RAG, allowing apps to combine structured and unstructured data for richer AI experiences. RAG patterns benefit from Jakarta EE's transaction management and security, ensuring sensitive data is handled appropriately. Standardizing RAG APIs means developers can build advanced AI-powered search and recommendation features with confidence in cross-vendor compatibility.

### Agentic Workflows

Jakarta EE's event-driven architecture (Jakarta Messaging, CDI events) provides the foundation for agentic workflows, where AI agents respond to business events and orchestrate actions. Agentic patterns can leverage dependency injection, lifecycle management, and cloud-native features to build scalable, maintainable AI solutions. Embracing agentic workflows empowers enterprises to automate complex processes, improve responsiveness, and unlock new value from AI.

#### SpringAI/Embabel

[Embabel](https://github.com/embabel/embabel-agent) is a very early stage project focused on building agent-based applications with Spring AI. It provides abstractions for creating and orchestrating AI agents within the Spring ecosystem, leveraging Spring's dependency injection and configuration capabilities. Being in the very early stages of development, it represents an exploration of how agentic patterns might be implemented within a Spring context.

#### Langchain4j/Langgraph4j

[Langgraph4j](https://github.com/langgraph4j/langgraph4j) is another project in the very early stages of development, aiming to bring graph-based agent orchestration to Java applications. Built on top of LangChain4j, it allows developers to define complex agent workflows as directed graphs, where nodes represent states and edges represent transitions. This approach provides a more structured way to implement multi-agent systems, but as with other projects in this space, it's still evolving rapidly.

#### Akka

[Akka](https://akka.io/app-types/agentic-ai) is exploring how its actor model can be applied to agentic AI applications. While Akka has been around for much longer than the current AI wave, its message-passing architecture and distributed processing capabilities make it well-suited for implementing agent systems. The project is in the early stages of exploring specific patterns for AI agent orchestration, but its mature foundation in distributed systems provides a strong starting point.


## Summary and Call to Action

Jakarta EE provides the reliability, security, and interoperability needed to make these AI innovations practical and sustainable for real-world enterprise use. The synergy between Jakarta EE and these AI patterns will drive the next wave of innovation, allowing organizations to continue to use Java at the forefront of enterprise technology.

Many of the vendors mentioned above are members of the Jakarta EE working group. We, as the Jakarta EE Platform Project, believe the best way forward for the Java community regarding delivering AI features to our user community is to continue to collaborate in the established open standard processes defined by Jakarta EE. 

Jakarta EE is adopting a measured approach to AI integration, ensuring the existing standard-based platform remains robust, interoperable, and future-ready. The community is invited to participate in shaping the future—whether by experimenting with frameworks like LangChain4j and Spring AI, contributing to langchain4j-cdi, or joining the Jakarta EE Marketing Committee's AI initiatives.

**Jakarta EE Futures Call:** Join the conversation! Attend the next Jakarta EE community call, contribute to the AI working group, and help define the future of open standard enterprise Java and AI. Make your voice heard on this important issue in the MCP Java SDK: [Join the discussion](https://github.com/orgs/modelcontextprotocol/discussions/246). We need the official MCP Java SDK to be usable in Quarkus, Spring, and whatever else may come along.

We can see from the continued success of the packet core Internet that open-interopable standards are the best way to empower creators to create value. This historically proven fact is more true now than ever in the extremely frothy market of ideas in our present age of AI. Let's not forget this timeless lesson (again) by ignoring the role open standards.

Thanks to Brian Benz for doing the heavy lifting on the content of this blog post.

Sincerely,

The Jakarta EE Platform Project
