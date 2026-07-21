---
title: "Getting Started with Jakarta EE: A Comprehensive Beginner's Guide to the Get Started"
date: 2025-10-21T00:00:00 
headline: "Getting Started with Jakarta EE: A Comprehensive Beginner's Guide to the Get Started"
seo_title: "Getting Started with Jakarta EE: A Comprehensive Beginner's Guide to the Get Started" 
description: >-
    This comprehensive beginner's guide walks you through the Jakarta EE Get
    Started tool, helping new developers quickly create and understand Jakarta
    EE applications. Learn about version selection, profiles, Java compatibility,
    runtime options, and project structure to kickstart your enterprise Java
    journey.
guide_topics: ["platform"]
hide_page_title: true
weight: 2
categories: ["Starter Guides"]
---

As a new Java developer or a student preparing for a career in enterprise
software, understanding Jakarta EE is essential. Evolving from Java EE, it
provides a reliable platform with APIs for building scalable, secure, and
portable applications. Jakarta EE is used across industries such as banking,
e-commerce, healthcare, and government.

## What is Jakarta EE and Why It Matters

[Jakarta EE](/) is a set of specifications used for building
Java products and frameworks for building large-scale enterprise applications.
It powers systems like banks, e-commerce sites, and corporate platforms. It
builds on Java SE with additional APIs for web development, database access,
messaging, and security. If your goal is to create production-grade Java
applications, Jakarta EE provides the tools and standards to get there.

## Understanding the Jakarta EE Get Started

The [Jakarta EE](https://start.jakarta.ee) Get Started quickly creates a
ready-to-run Jakarta EE application, removing the usual setup hassle. Instead
of starting with an empty folder, you get a complete, working project that’s
ready to build on, like starting with a pre-built LEGO set you can customize
right away. It includes proper Maven configuration, standard directory
structures, and example code that demonstrates key Jakarta EE concepts.

## Navigating the Starter UI

The starter interface presents a clean, intuitive design that guides you
through the configuration process step by step. Head to
[start.jakarta.ee](https://start.jakarta.ee) and you'll see a clean, simple
form.  

<!-- Add image -->
{{< figure 
  src="../images/generate-a-jakarta-ee-project.webp" 
  alt="The Jakarta EE Starter UI showing options to generate a Jakarta EE project." 
  imgClass="img-responsive" 
>}}

Let's walk through each option:

### Jakarta EE Version Selection

The first dropdown lets you choose the Jakarta EE version. By default, it’s set to Jakarta EE 11, the latest long-term support release. Each version adds new features and improvements.

- [**Jakarta EE 11**](https://jakarta.ee/specifications/platform/11/)**:** Start here if you're learning\! (2024) \- Needs Java 17+. The most modern version has helpful features that make web development easier to learn  
- [**Jakarta EE 10**](https://jakarta.ee/specifications/platform/10/)**:** A good alternative (2022) \- Needs Java 11+. Has simpler tools for building REST APIs and web services that beginners will appreciate  
- [**Jakarta EE 9.1**](https://jakarta.ee/specifications/platform/9.1/)**:** Skip this one \- it's mainly for companies updating old projects  
- [**Jakarta EE 9**](https://jakarta.ee/specifications/platform/9/)**:** Important to know: This is where **`javax.*`** changed to **`jakarta.*.`** If you see old tutorials using javax.servlet, you'll need to change it to **`jakarta.servlet`**  
- [**Jakarta EE 8**](https://jakarta.ee/specifications/platform/8/)**:** You'll see this in older tutorials and books \- uses the old **`javax.*`** names. Good to recognize, but don't start new projects with this

The version you pick determines which features are available and the minimum Java version you need. For a new project, choosing the latest release gives you modern features and a longer support window.

### Jakarta EE Profile Options

The profile selection is crucial as it determines the scope of APIs available in your application. Think of profiles like pizza sizes: **Core** (personal) \= basics only, **Web** (medium) \= perfect for learning, **Platform** (party size) \= everything included. 

Let’s learn a little more about them. 

* [**Web Profile**](https://jakarta.ee/specifications/webprofile/): This lightweight profile is designed for web application development. It includes key APIs like Jakarta Servlets, Jakarta Pages, Jakarta Faces, CDI (Contexts and Dependency Injection), EJB Lite, Jakarta Persistence, and Jakarta RESTful Web Services. The Web Profile is a good fit for most modern web apps and microservices because it keeps the runtime small while still providing the core enterprise features you need.  
    
* [**Core Profile**](https://jakarta.ee/specifications/coreprofile/): Introduced in Jakarta EE 10, this is an even lighter profile designed for microservices and cloud-native applications. It includes only the most essential APIs needed for building modern services, making it ideal for containerized deployments where resource efficiency is paramount.  
    
* [**Platform**](https://jakarta.ee/specifications/platform/): The full Jakarta EE platform includes every specification and API. Choose this option if you’re building large, complex applications that need advanced features like full EJB support, Jakarta Messaging, batch processing, or comprehensive web services.

### Java SE Version Configuration

Your Java version selection must align with your Jakarta EE version
requirements. The starter clearly indicates compatibility:

Here's what each version offers:

* **Java SE 21** - Latest LTS with virtual threads and pattern matching (choose this for new projects\!)  
* **Java SE 17** - Most popular in companies right now, great IDE support everywhere  
* **Java SE 11** - Older but still standard in corporate environments (minimum for Jakarta EE 10\)  
* **Java SE 8** - Only if you're stuck with Jakarta EE 8 or older systems

**What's LTS?** Long-term support versions get security updates for years.
Non-LTS versions (such as 19 and 20\) only receive 6 months of updates. If you
use these for major projects and need a security fix later, you'll have to
upgrade to a newer Java version to obtain it. That's why companies prefer LTS
versions! 

### Runtime Server Selection

The runtime dropdown offers several application server options, each with distinct characteristics:

* [**WildFly**](https://www.wildfly.org/), developed by Red Hat, is recognized
  for its rapid startup times and minimal memory usage, making it a popular
  choice in production environments, supported by a robust community and
  comprehensive documentation.  
    
* [**GlassFish**](https://glassfish.org/) serves as the reference
  implementation, where new Jakarta EE features appear first, ensuring 100%
  specification compliance, making it an excellent choice for learning and
  testing portability.  
    
* [**Payara**](https://www.payara.fish/) builds upon GlassFish by adding
  enterprise features, commercial support options, and cloud deployment
  optimizations, thereby bridging the gap between open-source flexibility and
  business requirements.   
    
* [**TomEE**](https://tomee.apache.org/): Apache's lightweight option that
  extends the familiar [Apache Tomcat](https://tomcat.apache.org/) with Jakarta
  EE capabilities, making it a natural choice if you've used Tomcat before or
  have applications that started simple and grew to need enterprise features.   
    
* [**Open Liberty**](https://openliberty.io/): IBM's open-source runtime,
  optimized for cloud-native deployments with features like instant startup and
  efficient memory usage. It offers excellent Kubernetes integration and
  sophisticated configuration management.

Now you might ask, why are there so many runtime options? Jakarta EE is a
specification (like a blueprint), and different companies create their own
implementations. This competition drives innovation and offers a choice
tailored to your needs. The good news is that your Jakarta EE application will
run on any of these servers without requiring code changes, so you're never
locked in.

### Docker Support Configuration

[Docker](https://www.docker.com/) is like a shipping container for your
application. Just as shipping containers allow goods to be transported
consistently across different ships, trucks, and trains, Docker containers
enable your application to run consistently across different computers,
servers, and cloud platforms.

While not essential for learning Jakarta EE basics, Docker is increasingly
important in real-world jobs where applications are deployed to cloud
platforms, run in Kubernetes clusters, or utilize CI/CD pipelines.

### Maven Coordinates

The Group and Artifact IDs follow Maven naming conventions:

* **Group ID** (org.eclipse in the example): Typically, your organization's
  reverse domain name. This ensures global uniqueness and helps organize
  dependencies. In a corporate setting, this is `com.yourcompany.department.`  
    
* **Artifact ID** (jakartaee-hello-world): Your project's name. Choose
  something descriptive that follows Java naming conventions (lowercase,
  hyphen-separated). This becomes your WAR file name and application context
  root.

**What's Maven?** [Maven](https://maven.apache.org/) is Java's build tool \- it
downloads libraries your app needs, compiles your code, and packages everything
into a deployable file. Think of it like npm for JavaScript or pip for Python.
The good news is that the starter includes a Maven wrapper (**`mvnw`**), so you
don't even need to install Maven separately.

## Understanding the Generated Project Package

When you click Generate Project, the starter creates a ready-to-use application
packaged as a ZIP file. It is more than just a template; it is a working
project that shows REST services, dependency injection, and proper Jakarta EE
configuration. Inside, you will find source code, configuration files, build
scripts, and documentation so you can start coding right away.

Unzip your downloaded project and open it in your IDE. Here's what you got:

```
jakartaee-hello-world/
├── 📄 README.md                                → Instructions (start here!)
├── 📄 pom.xml                                  → Maven config (defines dependencies)
├── 🔧 mvnw & mvnw.cmd                          → Maven wrapper (builds without installing Maven)
├── 📁 src/
│   ├── 📁 main/
│   │   ├── 📁 java/                            → Your Java code goes here
│   │   │   └── 📁 com/yourname/
│   │   │       ├── 📄 HelloApplication.java    → Starts REST services
│   │   │       ├── 📄 HelloWorldResource.java  → Your first REST endpoint
│   │   │       └── 📄 Hello.java               → A simple data class
│   │   └── 📁 webapp/                          → Web files (HTML, CSS, etc.)
│   │       ├── 📄 index.html                   → Welcome page
│   │       └── 📁 WEB-INF/
│   │           └── 📄 web.xml                  → Config file (mostly empty now!)
└── 📁 target/                                  → Build output (appears after compiling)
```

## Exploring the Complete Project Structure

After extracting the generated ZIP file, you’ll see a well-organized project
that follows Maven’s standard directory layout. This is a key convention that
every Java developer should be familiar with.

### Root Directory Files and Their Purposes

**[README.md](http://README.md):**  This Markdown file serves as the
primary documentation for your project. It contains quick-start instructions
and build commands. In a professional setting, maintaining clear README
documentation is crucial for team collaboration. The generated README includes
everything a new team member needs to get started.

**pom.xml**: The Maven Project Object Model file is your project's cornerstone.
This XML file manages:

- Project identification (groupId, artifactId, version)  
- Dependencies management with specific versions  
- Build lifecycle configuration  
- Plugin configurations for compilation, packaging, and deployment  
- Properties for version management and configuration

Understanding POM files is essential for enterprise Java development. The
generated POM adheres to best practices, including property-based version
management and accurate scope declarations.

**Dockerfile**: When Docker support is enabled, this file defines your
container image:

```dockerfile
FROM quay.io/wildfly/wildfly:latest-jdk21
COPY target/jakartaee-hello-world.war /opt/jboss/wildfly/standalone/deployments/
```

This simple yet effective Dockerfile uses WildFly's official image and
leverages its automatic deployment scanner.

**Maven Wrapper Files (`mvnw, mvnw.cmd, .mvn/`):** These ensure build
reproducibility across different environments. Team members don't need Maven
installed because the wrapper automatically downloads the correct version of
Maven.

### Source Code Organization

This is where your application logic lives. The package structure
**`org/eclipse/jakarta/hello/`** follows Java naming conventions.

**HelloApplication.java**: This class bootstraps [Jakarta RESTful Web Services](https://jakarta.ee/specifications/restful-ws/):

```java
@ApplicationPath("rest")
public class HelloApplication extends Application {
    // This empty class is sufficient to enable JAX-RS  
}
```

This class is like the front desk of a hotel - it tells Jakarta EE where to
find your REST endpoints.   
**`@ApplicationPath("rest")`** means all your API endpoints will start with
**`/rest/`**

For example, if your app runs on `http://localhost:8080/myapp`, your APIs will be
available at `http://localhost:8080/myapp/rest/...`.

You don't need to write any code in this class; the annotation does all the
work!

**HelloWorldResource.java**:  This is where the magic happens! This class
defines what happens when someone visits your API URLs. It handles incoming web
requests (such as when someone types a URL in their browser), processes the
request, and decides what to send back. It also automatically converts Java
objects to JSON for web responses. Let’s think about the specific annotations. 

* **`@Path:`** Defines the URL pattern (e.g., `@Path("/hello")` creates endpoint /rest/hello)  
* **`@GET:`** Responds to GET requests (like clicking a link or typing a URL in a browser)  
* **`@POST:`** Responds to POST requests (like submitting a form)  
* **`@Produces:`** Tells the browser what type of content you're sending back  
* **`@PathParam:`** Captures parts of the URL as variables

```java
package org.eclipse.jakarta.hello;

import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.QueryParam;
import jakarta.ws.rs.core.MediaType;

@Path("hello")
public class HelloWorldResource {

    @GET
    @Produces({ MediaType.APPLICATION_JSON })
    public Hello hello(@QueryParam("name") String name) {
        if ((name == null) || name.trim().isEmpty()) {
            name = "world";
        }

        return new Hello(name);
    }
}
```

**Hello.java**: This is a simple Java class that represents the data your API
sends and receives. In real-world applications, these are commonly referred to
as POJOs (Plain Old Java Objects) or DTOs (Data Transfer Objects). Jakarta EE
automatically converts these objects to JSON when sending responses.

```java
package org.eclipse.jakarta.hello;

public class Hello {

    private String name;

    public Hello(String name) {
        this.name = name;
    }

    public String getHello(){
        return name;
    }
}
```

The above Hello.java will produce JSON:

```json
{
    "message": "Hello, World!"
}
```

**Web Application Resources (src/main/webapp/)**

This folder contains all content that is served directly to web browsers.

- **index.html**: This is the first page visitors see when they go to your
  application's main URL.  
    
- **WEB-INF/web.xml**: This is your application's configuration file, also
  known as the "deployment descriptor." It tells the server how to run your
  application. In modern Jakarta EE, most configuration is done with
  annotations, so this file is often minimal

### Build Output Directory

**target/**: This folder is created automatically when you build your project.
It contains:

- Compiled classes  
- The packaged WAR file  
- Test results  
- Generated resources

This directory is typically excluded from version control (via .gitignore) as
it contains only generated artifacts.

## Setting Up Your Development Environment

Before working with the generated project, you need a properly configured
development environment. This setup process is a one-time investment that
prepares you for professional Jakarta EE development.

### Installing the Java Development Kit (JDK)

I prefer using SDKMAN for installing Java, as it makes version management
extremely easy and handles environment variables for me. Visit the SDKMAN
website and follow the instructions; it's a fairly simple process.  

If you prefer a traditional approach, visit
[Adoptium.net](https://adoptium.net) or your preferred Java distribution
website to download the installer. Just make sure to set JAVA\_HOME properly \-
SDKMAN handles this automatically, but manual installations require manual
configuration.

Verify installation with:

`java —version`\  
`javac —version`

Both commands should report version 21 (or your selected version).

### Development Tools and IDE Setup

While not strictly required, an Integrated Development Environment (IDE)
significantly improves productivity:

* **IntelliJ IDEA** offers excellent Jakarta EE support with its Ultimate
  Edition. Features include intelligent code completion, automatic deployment,
  and integrated application server management.  
    
* **Eclipse IDE for Enterprise Java Developers**: Free and open-source with
  comprehensive Jakarta EE tooling. Natural choice given Jakarta EE's Eclipse
  Foundation ownership.  
    
* **Visual Studio Code**: Lightweight option with Java extensions. While not as
  feature-rich for enterprise Java, it's increasingly popular among developers.

## Running and Testing Your Application

Now that you understand your project structure, let's get your application up
and running! Our project uses Maven to build and run the application. 

If you're on Mac, Linux, or Unix, you need to make the Maven wrapper
executable:

**`chmod +x mvnw`**

It makes the **`mvnw`** script runnable on your system.

Now for the exciting part - let's start your application! If you choose a
different runtime, refer to your [README.md](http://README.md) file, where you
will find instructions on how to run it.  

`./mvnw clean package wildfly:run`

The windows equivalent would be: 

`mvnw.cmd clean package wildfly:run`

The Maven command performs several operations:

1. **`clean:`** Removes previous build artifacts  
2. **`package:`** Compiles code and creates the WAR file  
3. **`wildfly:run:`** Downloads WildFly (if needed) and deploys your
   application

Access your application at **`http://localhost:8080/jakartaee-hello-world`**.
The welcome page provides links to explore the REST endpoint. 

Try **`http://localhost:8080/jakartaee-hello-world/rest/hello?name=YourName`**
to see JSON response generation in action.

## **Next Steps**

1. **Join the community:** [Jakarta EE Community](https://jakarta.ee/community/)  
2. **Watch tutorials:** Search "Jakarta EE for beginners" on YouTube  
3. **Read the guides:** [Jakarta EE Tutorial](https://jakarta.ee/learn/)  
4. **Build something real:** Start with a todo app or student management system

## **Remember: Every Expert Started Here**

That senior developer at your dream company? They started with a "Hello World"
just like this. The difference between you and them is just time and practice.
You've already taken the first step, and keep going!


