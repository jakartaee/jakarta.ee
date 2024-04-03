---
title: "Jakarta RESTful Web Services Explained" 
date: "2024-03-12"
headline: "Jakarta RESTful Web Services Explained" 
description: >-
  Jakarta REST is the solution for development of building Representational
  State Transfer web services on the Jakarta EE Platform. 
keywords: ["spec", "specification", "guide", "rest", "restful", "api", "web services", "http"]
hide_page_title: true
weight: 3
categories: ["Specification Guides"]
---

Jakarta REST is the solution for development of building Representational State
Transfer web services on the Jakarta EE Platform. The specification is easy to
learn, and it enables one to construct powerful REST APIs and it also includes
APIs for working with web services as a client. As such, this specification
is key to the development of microservices and cloud based applications, and it
is part of the Jakarta EE Web Profile as well as the full platform.

Using the API, a web service can be developed by placing just a few annotations
on a plain old Java object (POJO). The API includes annotations for performing
many tasks, such as producing REST responses in specified format(s), consuming
data, and performing standard data operations such as CREATE, READ, UPDATE, and
DELETE. The specification also includes advanced features for development of
robust REST APIs.

## Configuration

If using the Jakarta EE Web Profile or the full Jakarta EE Platform, Jakarta
REST will be bundled so there are no additional dependencies. However, if not
using either of these options, you will need to include the following
dependency:

```xml
<dependency>
    <groupId>jakarta.ws.rs</groupId>
    <artifactId>jakarta.ws.rs-api</artifactId>
    <version>3.1.0</version>
</dependency>
```

To configure an application for Jakarta REST, a class must be created which
extends `jakarta.ws.rs.core.Application`. This class must be annotated with
`@ApplicationPath`, supplying the String-based root path of the URI to the
RESTful resources for the application. For instance, if an application name is
"HelloWorld" and `@ApplicationPath("resources")` is specified, then the URI
format to reach any web services that are registered within the HelloWorld
application is http://hostname:port/HelloWorld/resources/<<service-path>>,
substituting <<service-path>> with the service to access. The `Application`
class can also be utilized to enable all REST services within the application,
or to specify individual web service classes.

## Overview of the API

To create a basic web service resource class, only the `@Path` and `@GET`
annotations are required. The `@Path` annotation can be placed on any Java class
that will be a REST resource class, and it is used to specify the URI path that
should be used to access the endpoint. The `@GET` annotation should be applied
to a method to indicate that it must be called upon with an HTTP `Get` call. In
the following example, assuming the use of the application name and path as
specified previously, the URI to access the `ping()` method would be as follows:\
http://localhost:port/HelloWorld/resources/jakartaee10

```java
@Path("jakartaee10")
public class JakartaEE10Resource {
    
    @GET
    public Response ping(){
        return Response
                .ok("ping Jakarta 10")
                .build();
    }
}
```

When the URI to the service is visited, the message `"ping Jakarta 10"` will be
displayed. The resource method can optionally include a `@Path` annotation,
specifying a custom path for accessing the endpoint. If more than one method
annotated with `@GET` is specified within the same resource class, then one of
them must specify a string-based path in order to differentiate. If
`@Path("/ping")` were applied to the `ping()` method, then the URI to access the
endpoint would change to the following:\
http://localhost:port/HelloWorld/resources/jakartaee10/ping

In the example above, a return type of `jakarta.ws.rs.core.Response` is returned
from the `ping()` method. Returning a Response type enables an HTTP response to
be returned to the caller, indicating success or failure of a service call.
For instance, the following conditional will return an `OK` or `FAILURE` status
depending upon a condition:

```java
if (valid) {
    return Response.ok("Successful").build();
} else {
    return Response.getStatus();
}
```

Although an HTTP response can be nice to receive, it is possible to return
different types of data from a web service, such as a plain text or JSON. By
default, Jakarta REST should negotiate with the client to determine the type of
data to return. However, to explicitly specify a type of data to be returned,
the `@Produces` annotation can be applied to the resource method and a
`jakarta.ws.rs.core.MediaType` can be applied. Applying following annotations
to an resource method would result in a JSON response at the URI\
http://localhost:port/HelloWorld/resources/jakartaee10/json :

```
@GET
@Path("/json")
@Produces(MediaType.APPLICATION_JSON)
```

Jakarta REST contains annotations for each of the common other HTTP methods:
`@PUT`, `@POST`, `@DELETE`, `@PATCH`, `@HEAD`, and `@OPTIONS`. The annotation
`@POST` is used to pass information to a web service resource. One can pass
information to a web service resource in a variety of ways, and in a variety of
formats. In most cases, Jakarta REST will negotiate with the client to
automatically determine the type of data being passed into a service. However,
in some cases it may be suitable to explicitly specify the type being consumed
by the service by specifying the `@Consumes` annotation and passing a
`jakarta.ws.rs.core.MediaType`. For instance, if a JSON payload is being passed
to a web service resource in order to update a database record, the `@POST`
annotation can be applied to the method.

```java
@Path("/postMessage")
@POST
public String updateService(Message message) {...}
```

There are various ways to pass parameters to a web service resource. They
differ in the way that they are passed via the URI. A path parameter can be
specified within the `@Path` by enclosing the parameter name within curly
braces `{}`. If a parameter is passed in this manner, then it must be explicitly
specified within the web service resource method signature by specifying
`@PathParam` and passing the `String` based variable name. A web service
resource method can accept zero or more parameters in this manner. In the
following example, the `helloService` accepts a name as a path parameter:

```java
@GET
@Path("/hello/{name}")
public String helloService(@PathParam("name") String name){
    return "Hello " + name;
}
```

A query parameter can also be passed via the URI by adding a question mark
character (`?`) at the end of the URI and explicitly delimiting each parameter
with an ampersand (`&`) character. Query parameters are specified in format
`parameter_name=parameter_value`. In this way, the `@Path` designation does not
contain any variables, but the web service resource method must contain each
query parameter by specifying the `@QueryParam` annotation and providing the name
of the query parameter. For instance, to specify name from the example above
as a query parameter, the URI would be\
http://localhost:port/HelloWorld/resources/hello?name=Josh

```java
@GET
@Path("/hello")
public String helloServiceQueryParams(@QueryParam("name") String name){
    return "Hello " + name;
}
```

Oftentimes web forms contain a large number of fields that need to be submitted
for processing. The values from these fields could be passed to a web service
resource using an HTML form and corresponding `@FormParam` parameters within the
web service resource method definition. The `@FormParam` annotation works very
similar to the `@QueryParam`, except that it reads the parameters submitted via
an HTML form. The following demonstrates an HTML form that will submit to the
`helloService` resource, passing a parameter.

```java
<html>
    <head>
        <title>Hello Page</title>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    </head>
    <body>
        <form action="/resources/jakartaee10/helloForm">
            <p>
                What is your name: <input type="text" name="name" />

                <input type="submit" value="Say Hello" />
        </form>
    </body>
</html>
```

The associated web service resource should include `@FormParam` as follows:

```java
@POST
@Path("/helloForm")
public String helloFormParams(@FormParam("name") String name){
    return "Hello " + name;
}
```

## Client API

Jakarta REST includes a client API that can be used for calling upon web
service resources to obtain data, and passing data to services. The API is high
level and allows easy access, but it also includes some lower level features
for configuration, if needed. Most of the client API resides within the
`jakarta.ws.rs.client` package, and the `jakarta.ws.rs.client.ClientBuilder` is
a resource that is required for creating a new `jakarta.ws.rs.client.Client`.
The lifecycle of a client is as follows:

1) Obtain an instance of `Client`
2) Create a `WebTarget`
3) Create a request from `WebTarget`
4) Submit request or obtain a prepared Invocation to submit at a later time

The following code demonstrates this workflow to call upon the `HelloWorld jakartaee10` 
endpoint:

```java
Client client = ClientBuilder.newClient();
Response res = client.target("http://localhost:8080/HelloWorld/resources/jakartaee10")
                .request("text/plain").get();
                
System.out.println("Status + " + res.getStatus());
```

The client enables chaining of methods using a  builder pattern to perform
tasks such as setting properties for a `Client`, passing parameters to a
service, and so forth.

```java
Response res = client.target("http://localhost:8080/HelloWorld/resources/jakartaee10/hello")
     .queryParam("name", "Duke")
     .request("text/plain").get();
```

The use of `WebTarget` enables the compilation of complex web service endpoints.
Using a builder pattern, a complex URI can be constructed by adding path
segments, as needed. For instance, a base `WebTarget` can be created, and then
paths can be added to it by calling upon the `WebTarget` `path()` method and
passing `String` based path segments as follows:

```
WebTarget base = client.target("http://localhost:8080/HelloWorld/resources/jakartaee10");
Response response = base.path("hello").path("Duke")
        .queryParam("name", "Duke")
        .request("text/plain").get();
 System.out.println("Status + " + response.readEntity(String.class));
```

There are more features available using Jakarta REST clients. To learn
additional information please refer to the specification documentation.

## Additional Features

Jakarta REST is a mature specification, and as such, it contains a number of
features that provide advanced configuration and use of RESTful web services
enabling flexibility and extensibility. One such feature is called a
"provider", and providers enable the use of cross cutting actions within
Jakarta REST. A provider can be used to take a specific action based upon an
event or a type action that occurs when a service resource is invoked. For
instance, a provider can be used to automatically convert an HTTP payload to a
Java object, or vice versa. Providers can be automatically registered with an
application by specifying the `@Provider` annotation on the provider class
implementation, or they can be manually registered.

Jakarta REST contains a number of default providers that can be used out of the
box. Two such providers that are oftentimes used are filters and interceptors.
Filters enable cross cutting actions to take place such as automatic logging or
request validation, when certain events occur. There is a way to prioritize
which filters are invoked and also to specify ordering of invocations.
Interceptors also are initiated in a similar manner as filters, but the primary
use of interceptors is to intercept requests and manipulate HTTP payloads.

Asynchronous processing can provide the end user with a better experience, as
it can greatly improve the performance of an application. Jakarta REST
provides asynchronous processing for both the client and the server. On the
server, asynchronous processing enables the resource method to send a message
to Jakarta REST to indicate that a response is forthcoming at some point in the
future. This allows the client to suspend the connection, perform other tasks,
and then resume the connection to check back on the pending future response
occasionally. In a similar manner, the client API can request an async
response from a web service, returning a `Future` object. The `Future` can then be
checked upon and process a response once it returns.

Server sent events provide a one-way communication based on the HTTP protocol
from the server to the client. The connection is long-running and remains
open, enabling multiple messages to be sent. Server sent events include both a
Client and a Server API. The Client API uses an `SseEventSource` object to
register an event consumer to perform some action on an event. The Server API
uses the `@Produces` annotation to indicate that `MediaType.SERVER_SENT_EVENTS`
will be produced by the web service resource. An object known as an
`SseEventSink` along with an `Sse` object are injected into the method, and they
enable the server to send multiple messages to the client using an open
`text/event-stream`. A `SseBroadcaster` can be created by calling upon
`Sse.newBroadcaster()`, and it provides the ability to broadcast a message to all
registered consumers.

## Conclusion

Jakarta REST provides an easy-to-use API for developing RESTful web services
for Jakarta EE. REST can be configured by adding an `Application` class and
specifying a root path which can be used to access web service resources. The
`@Path` annotation can be placed on a class to designate it as a Jakarta REST
resource, and methods annotated with `@GET`, `@POST`, or other HTTP request
types can be used to create web service resources. Web services can be used to
produce or consume data. There is also a full featured client available with
Jakarta REST, as well as advanced features such as asynchronous invocation and
server sent events.

