---
title: "The Eclipse Foundation’s Jakarta EE Working Group Announces Jakarta EE 11 Release"
date: "2025-06-26"
publishDate: "2025-06-26"
type: "announcement"
news/tags:
  - "Jakarta EE"
  - "Release"
authors: [{ gh_handle: "jph152", name: "Jacob Harris" }]
summary: "New release modernises testing, boosts developer productivity, improves performance, and expands Java platform support"
---

**BRUSSELS \- 26 June 2025 \-** [Jakarta EE](https://jakarta.ee/), a working group hosted by the [Eclipse Foundation](http://www.eclipse.org), one of the world’s largest open source software foundations, today announced the general availability of the [Jakarta EE 11](https://jakarta.ee/release/11/) Platform, the latest version of its enterprise Java platform. This milestone release builds on previous Core Profile (December 2024\) and Web Profile (March 2025\) versions and represents a significant advancement in simplifying enterprise Java for cloud native development.

Jakarta EE 11 focuses on enhancing developer productivity, streamlining testing processes, and aligning with the latest Java LTS release, Java 21\. Highlights include modernised Test Compatibility Kits (TCKs), introduction of the Jakarta Data specification, along with major updates to the existing specifications, all designed to support the evolving needs of developers and organisations building mission-critical applications.

“The renaissance of enterprise Java continues,” said Mike Milinkovich, executive director for the Eclipse Foundation. “Jakarta EE 11 introduces meaningful improvements in performance, testing, and productivity. The combination of innovation along with API stability and compatibility is what enterprise developers are looking for. There were many parties involved in this release, but I would like to recognize the efforts of Microsoft for leading the release and Red Hat for their efforts in modernizing the compatibility testing frameworks.”

**Key Highlights of Jakarta EE 11**

**Jakarta Data (new specification)**  
Designed to simplify data access and improve developer productivity:

- **BasicRepository:** A built-in repository supertype for performing basic operations on entities.
- **CrudRepository:** Facilitates basic CRUD operations, making database interactions more straightforward and less error-prone.
- **Pagination:** Supports both offset and cursor-based pagination.
- **Query Language:** A streamlined language designed to specify the semantics of query methods within Jakarta Data repositories.

**Streamlined Specifications**  
Designed to make building applications faster and simpler for developers:

- **Managed Beans Deprecated:** Removed for a simpler and more modern programming model.
- **CDI Enhancements:** Greater emphasis on Contexts and Dependency Injection (CDI) for consistent application behavior.
- **Java Records Support:** Broader integration to ensure data integrity and reduce boilerplate code
- **Java SE SecurityManager references removed:** In alignment with JEP 411, paving the way for more modern security practices.

**Modernised TCK Framework**  
 Improves compatibility testing and reduces the barriers to adding new tests as the platform evolves:

- **Upgraded Tools:** Moved from Apache Ant and Java Test Harness to JUnit 5 and Apache Maven for enhanced efficiency and relevance.
- **Streamlined TCK Structure:** Reduced complexity, making the TCK easier to learn and use.
- **Improved Accessibility:** By updating the TCK to a multi-dependency Maven project, Jakarta EE 11 improves compatibility testing and reduces the barriers to adding new tests as the platform evolves, fostering future innovation.

Jakarta EE 11 supports Java 17 or higher and introduces concurrency enhancements for Java 21, including support for Virtual Threads for improved scalability, reduced overhead, and significant performance gains.

**Early Adoption and Certified Implementations**

Several Jakarta EE Working Group members have already [certified products as compatible with Jakarta EE 11](https://jakarta.ee/compatibility/download/), including:

- **Web Profile**: [Eclipse GlassFish](https://glassfish.org/)

- **Core Profile**: [Open Liberty (IBM)](https://openliberty.io/), [WildFly](https://www.wildfly.org/), [Fujitsu Software Enterprise Application Platform](https://www.fujitsu.com/jp/products/software/middleware/business-middleware/middleware/applatform/), and [Payara Server Community](https://www.payara.fish/products/payara-platform-community/).

Following the release, additional implementations and compatible products are anticipated as the community continues to adopt Jakarta EE 11\.

Looking ahead, work is already underway on Jakarta EE 12, targeted for release in 2026\. The upcoming version is expected to raise the platform’s API source level to Java SE 21 and support Java SE 25 at runtime. The community is actively exploring updates across most specifications, with potential additions such as Jakarta Query and Jakarta MVC, as well as enhancements to Jakarta NoSQL. Continuing its rhythm of steady progress, Jakarta EE aims to maintain a roughly two-year release cadence to support long-term planning and innovation. To connect with the global Jakarta EE community, contribute, or learn more, visit: [https://jakarta.ee/connect/](https://jakarta.ee/connect/)

Organisations with a strategic interest in enterprise Java are invited to join the Jakarta EE Working Group to participate in shaping the platform's future, marketing programs, and community engagement. Learn more about membership benefits here: [https://jakarta.ee/membership/](https://jakarta.ee/membership/).

**Perspectives from Jakarta EE Community Members**

**Fujitsu**

"Jakarta EE 11's alignment with Java SE 21 brings modern programming features, like Records and Pattern Matching, to enterprise Java development, enhancing data-oriented programming," said Shinya Echigo, Head of Application Management Division, Fujitsu."Key improvements include the new Jakarta Data specification and updated Jakarta Concurrency support for Virtual Threads, boosting efficiency and relevance for enterprise Java systems. Fujitsu remains committed to contributing to Jakarta EE technologies within the Eclipse Foundation and will soon support Jakarta EE 11 applications on our products, offering customers enhanced performance and modernized development."

**IBM**

“The release of Jakarta EE 11 continues its evolution as the platform for cloud native Java innovation. The addition of Jakarta Data, as a new specification that simplifies data access, combined with the adoption of Java Virtual Thread in Jakarta Concurrency, and support for Java 17 and 21, makes this release significant,” said Ian Robinson, CTO, IBM App Runtimes. “The comprehensive rewrite of the TCK is a welcome step that will enable more rapid testing and release cycles going forward. We anticipate full compatibility with Open Liberty and WebSphere Liberty, enabling developers to get started quickly with this important release.”

**Microsoft**

“Microsoft is proud to have played a pivotal role in the successful release of Jakarta EE 11\. This new iteration brings forth the eagerly awaited Jakarta Data specification, updates critical specifications such as Persistence, and prunes legacy specifications to modernize enterprise Java,” said Scott Hunter, Microsoft VP of Product, Azure Developer Experience. “Our collaboration with esteemed partners IBM, Red Hat, and Oracle has been instrumental in supporting Jakarta EE 11 runtimes on Azure, including Azure Kubernetes Service, Azure Red Hat OpenShift, and App Service. We eagerly anticipate continuing our joint efforts to foster innovation and support the enterprise Java community.”

**Oracle**

“Oracle offers its congratulations and appreciation to the entire Jakarta EE community on the release of Jakarta EE 11,” said Tom Snyder, vice president, Oracle Enterprise Cloud Native Java. “Ongoing enhancements in Jakarta EE, combined with advances in Java SE, provide a bright future for users of enterprise Java technologies. Oracle supports Jakarta EE 10 Core Profile and MicroProfile 6.1 with Helidon 4.1 today and intends to leverage Jakarta EE releases across our WebLogic, Coherence, and Helidon releases. We will continue investing in Jakarta EE for our products and our customers.”

**OmniFish**

“OmniFish proudly celebrates the release of Jakarta EE 11, a testament to the vibrant community driving enterprise Java's evolution. This milestone, brimming with innovation, is a shared achievement of the whole Java community. GlassFish, as always, leads the way, embodying the collaborative spirit of Jakarta EE,” said Ondro Mihalyi, Director of OmniFish. “Looking ahead, OmniFish remains committed to GlassFish's continued development as a premier Jakarta EE server, providing exceptional support for its users. We believe in Jakarta EE's pivotal role in the enterprise Java ecosystem and are dedicated to its future. Therefore, we're also working on extending Jakarta EE 11 compatibility to Piranha Cloud, making the powerful Jakarta EE APIs accessible to an even broader range of users.”

**Payara**

“Jakarta EE 11 marks a transformative milestone in enterprise Java development,” said Steve Millidge, CEO of Payara. “The introduction of specifications like Jakarta Data fundamentally enhances the ability of our customers to build modern, cloud-native applications while maintaining complete backward compatibility with legacy Java EE systems. Our custom Jakarta Data implementation demonstrates Payara's technical leadership and deep commitment to the Jakarta EE ecosystem. Payara Platform Community 7 Alpha already includes comprehensive Jakarta EE 11 support, with our middleware achieving Core Profile certification and full Web Profile and Platform Profile certification planned for upcoming releases. This positions Payara customers at the forefront of enterprise Java innovation, with access to cutting-edge capabilities that directly address today's most demanding application requirements.”

**Primeton**

“Congratulations on the launch of Jakarta EE 11, a result of collaborative efforts by all members\! As a member of the Jakarta EE Specification Committee, Primeton is proud to have contributed significantly to this milestone,” said Jun Qian, Chief Technology Director of Primeton. “As a leading software platform provider in China, Primeton recognizes the significance of Jakarta EE for the industry. The inclusion of asynchronous microservices and data specification extensions in Jakarta EE 11 is pivotal for agile data application development. We are set to showcase the new features of Jakarta EE 11 to our clients and encourage their use in projects. As the founder of the Jakarta EE Community in China, Primeton is committed to fostering the adoption and application of Jakarta EE 11 specifications throughout the country.”

**About the Eclipse Foundation**  
The Eclipse Foundation provides our global community of individuals and organisations with a business-friendly environment for open source software collaboration and innovation. We host the Eclipse IDE, Adoptium, Software Defined Vehicle, Jakarta EE, and over 420 open source projects, including runtimes, tools, specifications, and frameworks for cloud and embedded applications, IoT, AI, automotive, systems engineering, open processor designs, and many others. Headquartered in Brussels, Belgium, the Eclipse Foundation is an international non-profit association supported by over 385 members. To learn more, follow us on social media [@EclipseFdn](https://twitter.com/EclipseFdn), [LinkedIn](https://www.linkedin.com/company/34093/), or visit [eclipse.org](http://eclipse.org).

Third-party trademarks mentioned are the property of their respective owners.

---

**Media contacts:**  
Schwartz Public Relations (Germany)  
Julia Rauch/Marita Bäumer  
Sendlinger Straße 42A  
80331 Munich  
EclipseFoundation@schwartzpr.de  
\+49 (89) 211 871 \-70/ \-62

514 Media Ltd (France, Italy, Spain)  
Benoit Simoneau  
[benoit@514-media.com](mailto:benoit@514-media.com)  
M: \+44 (0) 7891 920 370

Nichols Communications (Global Press Contact)  
Jay Nichols  
[jay@nicholscomm.com](mailto:jay@nicholscomm.com)  
\+1 408-772-1551
