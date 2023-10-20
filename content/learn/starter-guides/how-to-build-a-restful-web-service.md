---
title: How to Build a RESTful Web Service Using Jakarta EE
date: 2023-09-22
headline: How to Build a RESTful Web Service Using Jakarta EE
description: >-
  This guide shows you how to use Jakarta EE to make a RESTful web service.
hide_page_title: true
weight: 1
---

This guide shows you how to use Jakarta EE to make a 
[RESTful web service](https://jakarta.ee/specifications/restful-ws/).

To create a RESTful web service using [Jakarta EE](/), we will begin by
summarizing what we want to build.

We will build a service that will accept an HTTP GET{{< sup href="#footnote-1" >}}1{{</ sup >}} 
request at <span>http://localhost:8080/restfulservice/hello</span>.

It will respond with the following JSON payload, as the following listing
shows:  

```json
{"text": "Hello from Jakarta EE"}
```

We can then further customize and improve it according to our needs.

OK, now that we have specified our requirements, you will need to follow these
steps:

## Set up your development environment:

- Install a Java Development Kit (JDK). Please make sure you have Java SE 8 or
  higher (we have tested with Java SE 8, Java SE 11 and Java SE 17). You can
  choose any vendor distribution of your choice from [Adoptium](https://adoptium.net/en-GB) 
  as well.
- Install an application server that supports Jakarta EE. Download any of the
  Jakarta EE compatible [products](/compatibility/download/).
- Install [Maven](https://maven.apache.org/) 3 or higher.

To install all of these, we can use the [SDKMan](https://sdkman.io/). We can go
through the steps mentioned in the [how-to](https://sdkman.io/install) guide.

## How to complete this guide

In this getting started guide, you may start using Eclipse Starter for Jakarta
EE, finish each step, or skip fundamental setup stages that you already know.
You can also begin with an IDE or choose a project structure from well-known
[Maven archetypes](https://maven.apache.org/guides/introduction/introduction-to-archetypes.html).

## Create a new project with Eclipse Starter for Jakarta EE

To use Eclipse Starter for Jakarta EE, we need to take the following steps:

1. Navigate to start.jakarta.ee. This service will set up all the essential
  dependencies for an application. The current version of the Starter only
  supports Maven. In the future, we may be able to choose between Gradle and
  Maven.
  {{< figure class="padding-20 margin-top-40 margin-bottom-40 img-thumbnail" src="../images/generate-project.jpg" alt="A screenshot of the Generate a Jakarta EE Project form with fields filled out. More details on how to go through the form below." >}}
2. Select the desired version of Jakarta EE from the available options. As of
   now, the options include Jakarta EE 8, Jakarta 9.1, and Jakarta 10. You may
   choose the Jakarta EE profile from Platform, Core, or Web. However, for most
   options, you may safely stick with the defaults.
3. Then specify the Group, Artifact and Version for your new project.
4. Once you have done this, the following box will let you copy a command. Copy
   the command, open your terminal, paste it, and run it.
```shell
mvn archetype:generate -DarchetypeGroupId=org.eclipse.starter -DarchetypeArtifactId=jakartaee10-minimal -DarchetypeVersion=1.1.0 -DgroupId=org.eclipse.rest -DartifactId=rest-service -Dprofile=web-api -Dversion=1.0.0-SNAPSHOT -DinteractiveMode=false
```

This will give us the project structure and sample code, which we can then
build and run.

## Let's explore the code structure

When we unpack the generated code, we will have the following code structure:

```
.
├── pom.xml
└── src
    ├── main
    │   └── java
    │       └── org
    │           └── eclipse
    │               └── restfulservice
    │                   ├── ApplicationConfig.java
    │                   └── resources
    │                       ├── Hellorecord.java
    │                       └── RestResource.java
    ├── resources
    │   └── META-INF
    │       └── beans.xml
    └── webapp
```

In this code structure, along with other classes and configurations, we are
interested in two classes in particular: `RestResource.java` and
`HelloRecord.java`.

Let's open the `RestResource.java` file first.

```java
package org.eclipse.restfulservice.resources;

import jakarta.ws.rs.GET;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;

@Path("hello")
public class RestResource {
    
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public HelloRecord hello(){
        return new HelloRecord("Hello from Jakarta EE");
    }
}
```

This defines a RESTful web service that returns a JSON representation of a
`RestResource` when a `GET` request is made to the `"/hello"` endpoint.

The `jakarta.ws.rs.Path` annotation establishes a connection between the URL
given by the user and the Java class responsible for handling the request. The
`jakarta.ws.rs.GET` annotation tells us we must use the `HTTP GET` method to
access our endpoint. The `jakarta.ws.rs.Produces` annotation allows you to
specify the format of the response. In our case, it will produce a
JSON{{< sup href="#footnote-2">}}2{{</ sup >}} response by converting the
object of `HelloRecord`.

The method `hello()` is defined to return a `HelloRecord`. This is the new 
[record class](https://openjdk.org/jeps/395) that was released in Java 16.

```java
package org.eclipse.restfulservice.resources;

public record HelloRecord(String text) {
}
```

But if you use a lower version of Java, you can change it to a traditional
POJO{{< sup href="#footnote-3">}}3{{</ sup >}}.

```java
package org.eclipse.restfulservice.resources;

public final class HelloRecord {
  private final String text;

  public HelloRecord(String text) {
    this.text = text;
  }

  public String text() {
    return text;
  }
}
```

## Let's run the project from the CLI

The project structure was generated without having a runtime associated with
it. The merit of it is that we can choose from a multitude of runtimes. A list
of compatible Jakarta EE can be found [here](/compatibility/download/).

We will use WildFly in this tutorial.

To do that, we need to add an additional plugin to the `pom.xml` file.

```xml
<plugin>
  <groupId>org.wildfly.plugins</groupId>
  <artifactId>wildfly-maven-plugin</artifactId>
  <version>2.1.0.Beta1</version>
  <executions>
    <execution>
      <phase>install</phase>
      <goals>
        <goal>deploy</goal>
      </goals>
    </execution>
  </executions>
</plugin>
```

Include the above plugin in the plugins sections of the `pom.xml`.

The `wildfly-maven-plugin` is used to deploy, redeploy, undeploy or run the
Jakarta EE application. There is also the ability to execute CLI commands. The
whole configuration of this plugin can be found here: 
[WildFly Maven Plugin – Introduction](https://docs.jboss.org/wildfly/plugins/maven/latest/index.html).

There are multiple ways you can configure a local instance of WildFly. Some
configurations can be found here: 
[WildFly Maven Plugin – Run Example](https://docs.jboss.org/wildfly/plugins/maven/latest/examples/run-example.html).

However, in this tutorial, we can leave all the configurations as they are, as
we will use the default, and that's enough for us.

In particular, we are interested in `wildfly:run` CLI command. Let’s run the
following command from the command line:

```shell
mvn clean package wildfly:run
```

The command above will build the app and put it on Wildfly. If Wildfly is not
installed, it will download and run it, and then the war file will be deployed.

Once the application runs, we will get the following output in the terminal:

```shell
[INFO] Scanning for projects...
[INFO]
[INFO] ------------------in< org.eclipse:restfulservice >---------------------
[INFO] Building restfulservice 1.0.0-SNAPSHOT
[INFO] --------------------------------[ war ]---------------------------------
[INFO]
.....
skipped the log for brevity 
.....
03:35:02,323 INFO  [org.jboss.resteasy.resteasy_jaxrs.i18n] (ServerService Thread Pool -- 32) RESTEASY002225: Deploying jakarta.ws.rs.core.Application: class org.eclipse.restfulservice.ApplicationConfig
03:35:02,346 INFO  [org.wildfly.extension.undertow] (ServerService Thread Pool -- 32) WFLYUT0021: Registered web context: '/restfulservice' for server 'default-server'
03:35:02,365 INFO  [org.jboss.as.server] (management-handler-thread - 1) WFLYSRV0010: Deployed "restfulservice.war" (runtime-name : "restfulservice.war")
```

## Let's test the Service

Now that the service is running let’s visit <http://localhost:8080/restfulservice/hello>.\
It should return:

```json
{ "text": "Hello from Jakarta EE" }
```

Alternatively, we can curl from the command line:

```shell
curl -v http://localhost:8080/restfulservice/hello

*   Trying 127.0.0.1:8080...
* Connected to localhost (127.0.0.1) port 8080 (#0)
> GET /restfulservice/hello HTTP/1.1
> Host: localhost:8080
> User-Agent: curl/7.86.0
> Accept: */*
>
* Mark bundle as not supporting multiuse
< HTTP/1.1 200 OK
< Connection: keep-alive
< Content-Type: application/json
< Content-Length: 32
< Date: Sun, 18 Dec 2022 08:45:51 GMT
<
* Connection #0 to host localhost left intact
{"text":"Hello from Jakarta EE"}%      
```

Let us have a look at the URL structure.

```
http://<hostname>:<port>/<context-root>/<REST-config>/<resource-config>
```

Let’s unpack the URL pattern here:

**Hostname**: the name of the machine on which WildFly Server is installed.

**Port:** The WildFly Server's listening port for incoming HTTP requests. This is
port 8080 by default, but it can be configured.

**Context-root:** The context root to which the deployed application has been
assigned. By default, this is the filename (without the extension) of the WAR
file that is being deployed. But it can be changed when the file is being
deployed.

**REST-config:** The value we have defined for the `@ApplicationPath`
annotation in our project. By default, it is empty, which is indicated simply
by /. We can easily configure it in our `ApplicationConfig` class.

**Resource-config:** the value defined in the `@Path` annotation on the Java
class defines an endpoint. In our case, `"/hello"` is handled by the
`RestResource` class.

If we want to change the `REST-config` part, for example, to `"/api"`, we can
change the value in the  `@ApplicationPath` annotation like this:

```java
import jakarta.ws.rs.ApplicationPath;
import jakarta.ws.rs.core.Application;

@ApplicationPath("/api")
public class ApplicationConfig extends Application {    
}
```

After making this change, if we run again, we have to change the curl command
to consume the service as follows:

```shell
curl -v http://localhost:8080/restfulservice/api/hello
```

## Conclusion

Congratulations! You have just learned how to develop a RESTful web service
using Jakarta EE.

---

{{< grid/div class="footnote" isMarkdown="false" >}}
  <ol>
    <li id="footnote-1">
      HTTP GET is a request method supported by HTTP used by the World Wide
      Web. It requests a representation of the specified resource. Its general
      form is: GET /path/to/resource HTTP/1.1
    </li>
    <li id="footnote-2">
      JSON - It stands for JavaScript Object Notation. JSON is a text format
      for storing and transporting data
   </li>
    <li id="footnote-3">
      POJO - <a href="https://en.wikipedia.org/wiki/Plain_old_Java_object">Plain Old Java Object</a>
    </li>
  </ol>
{{</ grid/div >}}
