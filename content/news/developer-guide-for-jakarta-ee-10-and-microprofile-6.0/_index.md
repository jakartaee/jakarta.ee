---
title: Developer Guide for Jakarta EE 10 and MicroProfile 6.0
date: 2023-05-17
publishDate: 2023-05-17
type: announcements
news/tags:
  - Jakarta EE
  - MicroProfile
authors: [{ gh_handle: Emily-Jiang, name: Emily Jiang }]
summary: >-
  On 22nd September 2022, Jakarta EE 10 was released. Three months later,
  MicroProfile 6.0 was released with Jakarta EE 10 Core Profile alignment. We
  are very proud to announce that Open Liberty 23.0.0.3 supports both Jakarta
  EE 10 and MicroProfile 6.0, and it is the **first** runtime that support both
  Jakarta EE 10 and MicroProfile 6.0 in a production ready version. In this
  blog, we are going to discuss some of the main features in Jakarta EE 10 and
  MicroProfile 6.0 and then demonstrate how you can use them.
---

On 22nd September 2022, [Jakarta EE 10](https://jakarta.ee/specifications/platform/10/) was released. Three months later,
  [MicroProfile 6.0](https://microprofile.io/2023/01/10/microprofile-6-0-release/) was released with Jakarta EE 10 Core Profile alignment. We
very proud to announce that [Open Liberty 23.0.0.3](https://openliberty.io/blog/2023/04/04/23.0.0.3.html) 
supports both Jakarta EE 10 and MicroProfile 6.0, and it is the first runtime
that support both Jakarta EE 10 and MicroProfile 6.0 in a production ready
version. In this blog, we are going to discuss some of the main features in
Jakarta EE 10 and MicroProfile 6.0 and then demonstrate how you can use them.
Let’s first introduce you to Open Liberty.

## Open Liberty

[Open Liberty](https://openliberty.io/) is an IBM open-source project, which 
allows you to build cloud-native apps and microservices while running only what
you need. It is the most flexible server runtime available to Java developers.
Open Liberty has many amazing features. Let’s list the top four features.

### Just enough runtime

Open Liberty powered by OSGi is very scalable and it only loads the enough
runtime for running your application. When packaging your image, you don’t get
the whole runtime image but only the necessary portion that is sufficient to
execute your application. This feature enables you to package a small size of
runtime, which reduces the memory footprint.

### Zero migration

This feature is unique to Open Liberty. Open Liberty does not remove any old
features. If your application uses a particular Open Liberty feature, you can
stay assured that your application does not need to do any migration when you
move up to a later release. You can benefit from the performance boost or Java
support without any effort.

### Developer joy - Liberty Dev Mode

Open Liberty has a niche feature called [Liberty Dev Mode](https://openliberty.io/blog/2019/11/13/liberty-dev-mode-vscode.html), 
which enables you to develop your application and view the changes straightaway
without the need to restart your application in a separate step, as well as any
tests can be executed automatically. Liberty Dev Mode helps make the developers
happy and productive as it automates some tedious tasks behind the scenes so
you can focus on writing the code.  You can make code or configuration changes
and you can see the results immediately.

You can use Liberty Dev Mode by starting your application via `mvn 
liberty:dev` or `gradle libertyDev`. Liberty also integrates Liberty Tools for 
3 popular IDEs, VSCode, Intellij and Eclipse. Below is the animation showing 
how Liberty Dev Model works.

{{< figure src="./images/liberty-dev-mode.gif" >}}

The animation shows an example of Liberty Dev Mode in action:

- The developer wants to create a Health endpoint for use in Kubernetes. 
  The endpoint is at localhost:9080/health but it returns 404 because it is 
  not available as yet.
- The developer edits the server config to add the MicroProfile Health 
  feature. On saving, Liberty Dev Mode detects that the feature isn’t 
  installed and automatically installs it behind the scenes from a maven repo.
- The developer creates the new class for the Health endpoint, adds the code and 
  saves it.  The new code is automatically compiled and added to the application 
  so when the browser is refreshed the endpoint is already available.  No manual 
  build or redeploy is required.

If you’re developing for containerized deployments, Liberty Dev Mode works in
containers too giving you a developer experience that closely matches
production, thus reducing the likelihood of issues making it to production. For
using Liberty Dev Mode in containers, use the commands `mvn:liberty:devc` or
`gradle libertyDevc`.

With the tooling support, developers can just concentrate on the business
logic. Open Liberty offers many APIs for developers to write cloud native
applications. Let’s take a look at the APIs!

### Cloud Native APIs provider

APIs are critically important for application development. They influence what
you can do, your productivity, but they also potentially lock you in to a
particular vendor.  Open source helps to some extend with the issue of vendor
lock-in, but only if that project or its APIs are governed by an open community
and many products support them, otherwise you’re still locked in.

Liberty has been based on open-source standards from its inception and
continues this philosophy today. Many enterprises have developed Java EE
applications over the years. Java EE was contributed to the Eclipse Foundation
by Oracle in 2017 and standardized as Jakarta EE. For enterprise applications,
Jakarta EE gives them a strategic path forward. Jakarta EE (and Java EE) can
be augmented with MicroProfile as you look to modernize your applications.  For
your Java EE or Jakarta EE applications, you can add in Health endpoints for
Kubernetes, Metrics for Prometheus and Grafana, and more.

If you’re looking to create new cloud-native Microservices, you can start with
MicroProfile. Standardized at Eclipse, MicroProfile gives you APIs for writing
REST services, working with API contracts, handling faults, publishing health
and metrics, and more. If you find you need more than MicroProfile, such as
Database support, you can choose from the Jakarta EE capabilities and remain
within the standards.

Open Liberty is a strong supporter for Jakarta EE and MicroProfile. It was used
as a rectification implementation for releasing MicroProfile 4.1, 5.0 and then
the later 6.0.

In the next section, let’s discuss some of latest API update for both Jakarta
EE 10 and MicroProfile 6.0.

## Jakarta EE 10

After Java EE moved to Eclipse Foundation in 2017, it was rebranded to be
Jakarta EE. Jakarta EE started its first release of Jakarta EE 8 in September
2019, which was to update the maven coordinators from javax.* to jakarta.*.
Then in 2021, Jakarta EE 9 was released to perform the big bang namespace
changes from javax to jakarta. Jakarta EE 9.1 was released soon after in 2Q
2021 to support Java SE 11.

However, till then, Jakarta EE had no functional updates since its rehoming to
Eclipse Foundation. Jakarta EE 10 was released in September 2022 with major
functionality updates. It includes the following highlights:

-	Jakarta EE 10 brought a new Core Profile for cloud native applications. The
  Core Profile was created for MicroProfile to consume. 
-	New CDI Lite defined in the CDI specification.
-	The Jakarta Concurrency specification was added to Jakarta EE 10 Web Profile.
-	A few new APIs were added to some specifications.
-	Some deprecated APIs or functionalities were removed.
-	Java SE 8 support was removed. The minimum Java SE version for Jakarta EE 10
  is Java SE 11.
-	JPMS support: module-info added to the Jakarta EE specifications.

This blog will focus on the functionality updates in this release. Jakarta EE
10 consists of three types of releases: Platform, Web Profile and Core Profile,
demonstrated below.

{{< figure src="./images/jakarta-ee-10-platform.jpg" >}}

Let’s discuss the three types of releases: Core Profile, Web Profile and
Platform in more details.

### Jakarta EE 10 Core Profile

As shown in the diagram, seven specifications are included in the Core Profile.
Let’s dive into these specifications.

#### CDI Lite

CDI Lite was the new concept for Jakarta EE 10. It was introduced for the
runtimes that wish to explore the build time compilation. As you might know,
the previous CDI 3.0 or earlier versions has runtime extension, validation and
injection and these functions are performed during application starting. In
order to support build time compilation, a new programming model must be
provided, which leads to CDI Lite. CDI Lite is not a specification but part of
CDI 4.0 specification. Here is the [scope](https://jakarta.ee/specifications/cdi/4.0/jakarta-cdi-spec-4.0.html#spi_lite)
of CDI Lite. Below are the main functionalities provided by CDI Lite.

- The concepts of CDI bean, Qualifiers, Scopes, Bean names, Alternatives,
  Stereotypes. CDI Lite only provides the built-in scopes of `@Dependent`,
  `@RequestScoped` and `@ApplicationScoped`.
- Programming model
- Inheritance
- Dependency injection and lookup
- Interceptor bindings
- Events firing and observing 
- Programmatic access to containers
- Build compatible extensions. This is the new section in CDI 4.0. It
  introduced the new interface of `BuildCompatibleExtension` and the
  `@Discovery`, `@Enhancement`, `@Registration`, `@Synthesis` and `@Validaton`
  phase.

#### Jakarta Restful Web Services 3.1

A minor update was added to Jakarta REST, which led to the release of Jakarta
REST 3.1. It contains the following updates:

- Support for multipart media type. The new API **jakarta.ws.rs.core.EntityPart**
  was introduced to be used with new Multipart capability.  Multipart entities
  may be received in a resource method as a collection of **EntityPart** objects.
- Better alignment with JSON-B. JSON-B entity providers MUST favor `Jsonb`
  instances provided by `ContextResolver<Jsonb>` over their own default context.
- Automatic loading of provider extensions: Added requirement that JAX-RS
  implementations MUST automatically register certain service providers.
- Deprecation of `@Context` in favour of `@Inject`.
- Default exception mapper. All exceptions now use a default exception mapper
  if one is not provided for the given exception. `WebApplicationExceptions` 
  exceptions return the given response code, all others give 500.

#### JSON Binding 3.0

JSON-B introduced backward incompatible changes, which led to the release 3.0.
Some of the updates are listed below.

- Deserialization of the null to the `JsonValue.NULL_VALUE` and deprecation of
  `@JsonbProperty.nillable()`
- Support for handling polymorphic types. Application can request JSON-B to
  deserialize to a more generic type and JSON-B provider uses the providing
  mapping to automatically choose the correct subclass. Polymorphic type
  handling is supported for deserialization and serialization. Polymorphic
  handling is ensured by annotation `JsonbTypeInfo` and `@JsonbSubtype`.

#### JSON Processing 2.1

This release includes a number of changes, listed below.

- Some new APIs were introduced to create JsonValue from primitive types such as 
  - `jakarta.json.JsonNumber`
  - `jakarta.json.JsonString`
  - `jakarta.json.JsonArray`
  - `jakarta.json.JsonObject`
- Added standard property `JsonConfig.KEY_STRATEGY` to handle duplicated keys. 
  - `JsonConfig.KEY_STRATEGY=LAST`
    - The setting above will ensure the last occurence of duplicated keys was chosen.
- Clarified the behaviour of `JsonObjectBuilder.build()` method and `JsonGenerator.close()`

#### Annotations 2.1

The release has the following update:

- Allow **@Priority** to be used anywhere
- Add **@Nullable** and **@NotNull**

#### Interceptors 2.1

This spec has no other updates except updating the dependency of Annotation 2.1.

#### Use Jakarta EE 10 Core Profile with Open Liberty

In Open Liberty, you can specify the following snippet in the server.xml to
pull in Jakarta EE 10 Core Profile.

INSERT IMAGE

### Jakarta EE 10 Web Profile

Jakarta EE 10 Web Profile has 11 more updates in addition to the Core Profile
update. Some of the spec updates are listed below.

#### CDI 4.0

CDI 4.0 splits the CDI Core into CDI Lite and CDI Full, as shown in the diagram
below.

{{< figure src="./images/cdi-4.0.jpg" >}}

CDI 4.0 also contains the following changes.

##### Empty beans.xml

Empty beans.xml reacts differently in CDI 4.0 compared to the previous versions
of CDI. In the versions prior to CDI 4.0, an empty beans.xml makes all classes
potential beans. In CDI 4.0, it means only classes with [bean defining annotations](https://jakarta.ee/specifications/cdi/4.0/jakarta-cdi-spec-4.0.html#bean_defining_annotations)
will be considered for CDI beans.

Open Liberty provides a way to get old behavior by adding the following line in
your beanx.xml.

 `<cdi emptyBeansXmlCDI3Compatibility="true"/>`

##### New Language model

A new jakarta.enterprise:jakarta.enterprise.lang-model API artifact has been
added for the Build Compatible Java Language Model, which achieves reflection
free. This language model was used by Build Time Compilation Extensions.

When developing cloud native applications, you should ensure it works for
either CDI Lite or CDI Full. In order to achieve the portability, you should
use the following best practices.

- Always add a beans.xml file to an archive which contains classes with bean
  defining annotations
- Never add classes with bean defining annotations to an archive without beans.xml

##### The following deprecated classes or methods were removed

- `@New` qualifier, which was replaced by `@Dependent` beans (since CDI 1.1)
- `Bean#isNullable()`, which was not used by the implementation (since CDI 1.1)
- `BeanManager#fireEvent()`,which was replaced by `BeanManager.getEvent()` (since CDI 2.0)
- `BeanManager#createInjectionTarget(AnnotatedType)`, which was replaced by
  `BeanManager#getInjectionTargetFactory(AnnotatedType)` (since CDI 1.1)
- `BeforeBeanDiscovery#addAnnotatedType(AnnotatedType)`, which was replaced by
  `BeforeBeanDiscovery#addAnnotatedType(AnnotatedType, String)` (since CDI 1.1)

#### Jakarta Concurrency 3.0

This release contains the following updates:

- Context propagation to parallel streams operations and propagation of third party context types.

```
@ContextServiceDefinition(
     name = "java:app/concurrent/myContext",
     propagated = { SECURITY, APPLICATION, VENDOR1_CTX })
@ManagedScheduledExecutorDefinition(
     name = "java:comp/concurrent/myExecutor",
     context = "java:app/concurrent/myContext",
     maxAsync = 5)
public class MyServlet …
```

In the above code snippet, the context Security, Application and Vendor1_CTX
will be propagated to a parallel and the thread will be managed by the managed
executor `myExecutor`.

- Modernization of the Trigger mechanism with time zone support

```
myExecutor.schedule(task, new CronTrigger(
     "0 9 * OCT-MAY MON-FRI",
     ZoneId.of("America/Chicago")))
```

The above code snippet defines a job in the time zone of Chicago, America.

-	Resource definition annotations and corresponding deployment descriptor
  elements
-	Introduced the Asynchronous methods 
-	Context-aware completion stages and completable futures

```
@Asynchronous(executor = "java:comp/concurrent/myExecutor")
CompletableFuture myMethod(param1, param2)
```

In the above code snippet, the thread executing the method myMethod will be
managed by the managed executor.

#### Jakarta Faces 4.0

Jakarta Faces 4.0 contains the following removals:

-	Renamed "http://xmlns.jcp.org/jsf/" URI to "jakarta.faces." URN
-	Old URIs will still work but are stabilized. It is recommended to move to the new URNs.
-	Removed all JSP support
-	Removed native Managed Beans (`@ManagedBean` and related)
-	Removed `MethodBinding`, `ValueBinding` and other native Expression Language code. 
-	Removed `CURRENT_COMPONENT` constants from `UIComponent` class
-	Removed deprecated methods of `StateManager` class
-	Removed entire `ResourceResolver` class.  Use `ResourceHandler` instead
-	Removed `PreJsf2ExceptionHandlerFactory` class

#### Jakarta Pages 3.1

Jakarta Pages 3.1 has new option added to indicate whether to emit an error
when EL is not found via either Page Directive or web.xml.

```
<%@ page errorOnELNotFound="false" %>
<jsp-config> 
     <jsp-property-group> 
        <url-pattern>*.jsp</url-pattern> 
        <error-on-el-not-found>true</error-on-el-not-found>
     </jsp-property-group> 
</jsp-config>
```

When the option is enabled, a `PropertyNotFoundException` will be thrown
instead of rendering an empty string.  For example, this error will appear on
the page: 

```
jakarta.el.PropertyNotFoundException: Unknown identifier [notfound]
at jakarta.servlet.jsp.el.NotFoundELResolver.getValue(NotFoundELResolver.java:68)
at org.apache.jasper.el.JasperELResolver.getValue(JasperELResolver.java:113)
at [internal classes]
```

The following capabilities have been deprecated.

- Deprecate methods that override `ELResolver.getFeatureDescriptors()` as that
  method has been deprecated as of EL 5.0.
- Deprecate the `isThreadSafe` page directive attribute as the related Servlet
  API interface `SingleThreadModel` has been removed as of the Servlet 6.0
  specification.
- Deprecate the `jsp:plugin` action and related actions as the associated HTML
  elements are no longer supported by any major browser.

#### Jakarta Persistence 3.1

The Persistence 3.1 specification adds the following capabilities:

-	Added support for `java.util.UUID` as a persistent-capable type, as well as
  support for auto-generation of UUID-type primary keys.
-	Added `CEILING`, `EXP`, `FLOOR`, `LN`, `POWER`, `ROUND`, and `SIGN` numeric functions to
  Jakarta Persistence Query Language.
-	Added `ceiling()`, `exp()`, `floor()`, `ln()`, `power()`, `round()`, and `sign()` to
  Criteria API.
-	Added LOCAL DATE, LOCAL DATETIME, and LOCAL TIME functions to Jakarta
  Persistence Query Language.
-	Added `localDate()`, `localDateTime()`, and `localTime()` to `Criterial` API.
-	Adds `EXTRACT` function to Jakarta Persistence Query Language.
-	Added support for Expressions as conditions in Criteria CASE expressions.

#### Jakarta Servlet 3.0

Many previously deprecated APIs or methods have been removed. More changes are
listed below.

- Clarify the behaviour of decoding and normalization of URI paths;
  `getRealPath(String)`; `getRemoteAddress()` and `setCharacterEncoding(null)`
- Update `Cookie` class, related classes and the specification to remove
  references to FC 2109 and to replace them with RFC 6265 
- Provide generic attribute support to cookies, including session cookies, to
  provide support for additional attributes such as the `SameSite` attribute 
- Remove the recommendation that Servlet containers should include an
  `X-Powered-By` header 
- Add new methods to obtain unique identifiers for the current request and/or
  associated connection 
- Add a new method `getErrorOnELNotFound()` to `JspPropertyGroupDescriptor` to
  align with changes in the Jakarta Pages 3.1 specification. 

#### Jakarta Security 3.0

New OpenID Connect `HttpAuthenticationMethod`

- New interfaces and annotations provided in new packages:
  `jakarta.security.enterprise.identitystore` and
  `jakarta.security.enterprise.identitystore.openid`

#### Jakarta Tags 3.0

The following changes were made to Jakarta Tags 3.0.

- Remove dependency on XML Binding from the API pom
- Rename Tag URIs to ‘jakarta.tags.*’
  -	http://xmlns.jcp.org/jsp/jstl/core → jakarta.tags.core
  -	http://xmlns.jcp.org/jsp/jstl/fmt → jakarta.tags.fmt
  -	http://java.sun.com/jsp/jstl/functions → jakarta.tags.functions
  -	http://java.sun.com/jsp/jstl/sql → jakarta.tags.sql 
  -	http://java.sun.com/jsp/jstl/xml → jakarta.tags.xml 
- Removal of deprecated methods if any exist and are removed.

#### Use Jakarta EE 10 Web Profile with Open Liberty

In Open Liberty, you can specify the following snippet in the server.xml to
pull in Jakarta EE 10 Web Profile.

```
<featureManager>
        <feature>webProfile-10.0</feature>
</featureManager>
```

### Jakarta EE 10 Platform

Jakarta EE 10 Platform includes Jakarta EE 10 Web Profile and 7 other
specifications including Authorization, Activation, Batch, Connectors, Mail,
Messaging and EJB. It also consists of 5 optional specifications. The optional
specifications including SOAP with Attachments 4.0, XML Binding 4.0 and XML Web
Services 4.0 have some updates and Open Liberty implemented them as part of
Jakarta EE 10 platform implementation.

#### Jakarta Batch 2.1

The following changes were added:

- Defines Jakarta Batch integration with Jakarta Contexts and Dependency
  Injection (CDI) within and outside of the Jakarta EE Platform
- Require Jakarta Batch + CDI integration (which in previous releases was
  optional from the Jakarta Batch perspective

#### Jakarta Authorization 2.1

The following changes were made to this release:

- Add `getPolicyConfiguration` methods without state requirement 
- Add methods to `PolicyConfiguation` to read permissions 
- Generic return value for `getContext()`

#### Jakarta Mail 2.1

This release splits the implementation from the APIs

- In the class `jakarta.mail.Session` , the method `public StreamProvider
  getStreamProvider()` returns the `StreamProvider` instance of the Session
- `StreamProvider` is used to create instances of the encoders/decoders as
  required by the API

#### Use Jakarta EE 10 Platform with Open Liberty

In Open Liberty, you can specify the following snippet in the server.xml to
pull in Jakarta EE 10 Platform.

```
<featureManager>
        <feature>jakartaee-10.0</feature>
</featureManager>
```

## MicroProfile 6.0

MicroProfile was created in 2016 and then moved to Eclipse Foundation in 2017.
It was created by IBM, Red Hat, Tomitribe, Payara, and others. In the past few
years, it has done many releases. The release of MicroProfile 6.0 in December
2022 embraces Jakarta EE 10 Core Profile. Below is the diagram of the
MicroProfile releases.

{{< figure src="./images/microprofile-releases.jpg" >}}

This blog will bring you up to date what MicroProfile 6.0 delivers.
MicroProfile adopts semantic versions. As you may know, MicroProfile 6.0
contains backward incompatible changes. Below are the full details of the
release.

{{< figure src="./images/microprofile-changes.jpg" >}}

MicroProfile 6.0 introduced a new specification MicroProfile Telemetry, which
supercedes MicroProfile OpenTracing. MicroProfile Metrics 5.0 has backward
incompatible changes, while MicroProfile OpenAPI 3.1 and MicroProfile JWT
Authentication 2.1 only contains minor changes. This release also includes
Jakarta EE 10 Core Profile. Let’s take a look at the four updated MicroProfile
specifications.

### MicroProfile OpenAPI 3.1

This releases supports Jakarta Bean Validation integration as well as other
annotation updates.

#### Integrating with Jakarta Bean Validation

MicroProfile OpenAPI 3.1 integrates with Jakarta Bean Validation. A limited
subset of Jakarta Bean Validation annotations can be read by MP OpenAPI and
those constraints are automatically reflected in the schema. In the previous
version, in order to document a field contains a positive number, you have to
use the `@Schema` annotation. From this release, `@Schema` annotation is no
longer needed.

```
public class MyClass {
  @Positive
  @Schema(minimum = 0, exclusiveMinimum = true)
  public int myField;
}
```

#### SecurityRequirementsSet modeling optional or multiple auth

The `@SecurityRequirementsSet` annotation can be used to model both an optional
authentication requirement, and multiple authentication requirements. The
following examples demonstrates how to specify multiple or optional
requirements.

Optional Auth Example:

```
@SecurityRequirement(name = "APIKeyAuth")
@SecurityRequirement(name = "BearerTokenAuth")
@SecurityRequirementSet({})
```

Multiple Auth Example:

```
@SecurityRequirementSet({
  @SecurityRequirement(name = "APIKeyAuth")
  @SecurityRequirement(name = "BearerTokenAuth")
})
```

#### AdditionalProperties added to @Schema

The `additionalProperties` attribute is added to the `@Schema` annotation. It can
be set to True, False or a class representing a schema. The following example
demonstrates the Schema `MyClass` contains `additionalProperty AnotherClass`.

Example: 

```
@Schema(additionalProperties = AnotherClass.class)
public class MyClass {
  /* ... */
}
```

```
schemas:
  'MyClass':
    type: 'object'
    additionalProperties;
      $ref: '#/components/schemas/AnotherClass'
    properties: [ ... ]
```

#### APIResponse can be applied on the classes

The annotation `APIResponse` can be applied directly to the resource class,
indicating that it applies to all resource methods within the class. In the
example below, the `APIResponse` applies to both methods `get` and `search`.

```
@PATH("/")
@APIResponse(responseCode = "429", description = "Client is rated limited")
public class MyClass {
  
  @GET
  public Response get(...) { ... }

  @GET
  public Response search(...) { ... }
}
```

The annotation declared at the class level add to those declared at the method
level if all annotations have different response codes.

The annotation declared on the method override those on the class if they have
the same response code.

#### The extensions attribute added to Extension

Most OpenAPI annotations have been extended to include an extensions attribute
of type `Extension[]`. In the following example, the extensions attribute is
added to the `@Extension` in the annotation `@SecuritySchema`.

```
@SecurityScheme(
  securitySchemeName = "testSecurityScheme"
  type = OPENIDCONNECT,
  openIdConnectUrl = "http://example.org"
  extensions = @Extension(name = "x-tokenName", value = "tokenId")
)
```

```
securitySchemes;
  testSecuritySchemes;
    type: 'openIdConnect'
    openIdConnectUrl: 'http://example.org'
    x-tokenName: 'tokenId'
```

### MicroProfile JWT Authentication 2.1

MicroProfile JWT Authentication 2.1 introduces the following new
configurations.

- `mp.jwt.verify.token.age=3600`
- `mp.jwt.verify.clock.skew=60`
- `mp.jwt.decrypt.key.algorithm=RSA-OAEP`

They are used to indicate the token age, clock skew in seconds and then decrypt
key algorithm for the JWS tokens.

### MicroProfile Metrics 5.0

MicroProfile Metrics 5.0 reworked its APIs so that the implementors can use
their chosen Metrics libraries such as Micrometer or OpenTelemetry Metrics.
Consequently, some annotations were removed such as `@SimplyTimed`,
`@ConcurrentGauge`, `@Metered`. Some annotations such as `@Gauge`, `@Counter`,
`@Metric` and `@Timer`.

The ones below have been removed.

- org.eclipse.microprofile.metrics.annotations.SimplyTimed
- org.eclipse.microprofile.metrics.annotations.ConcurrentGauge
- org.eclipse.microprofile.metrics.annotations.Metered

And the ones below this have been updated.

- org.eclipse.microprofile.metrics.annotations.Gauge
- org.eclipse.microprofile.metrics.annotations.Counter
- org.eclipse.microprofile.metrics.annotations.Metric
- org.eclipse.microprofile.metrics.annotations.Timer

The corresponding API/SPIs were updated or removed as well. For more
information regarding the changes, please refer to [this](https://download.eclipse.org/microprofile/microprofile-metrics-5.0.0/microprofile-metrics-spec-5.0.0.html#release_notes_5_0) 
release note.

It also supports multi-dimensional metrics as follows.

- `car_speed{driver=”Emily",mp_scope="carScope",} 115`

 MicroProfile Metrics 5.0 enables application metrics to be grouped in custom
 scopes and allows querying of metrics by those scopes, detailed below in the
 table.

 | Request                                          | Description                                                                             |
 |---                                               |---                                                                                      |
 | /metrics                                         | Returns all registered metrics, same as the previous versions of MicroProfile Metrics   |
 | /metrics?scope=<scope_name>                      | Returns metrics registered for the respective scope                                     |
 | /metrics?scope=<scope_name>&name=<metric_name>   | Returns metrics that match the metric name for the respective scope                     |

 Open Liberty provides the feature mpMetrics-5.0 to track metrics from Liberty
 components and the JVM to help you understand how your servers are performing.
 This feature provides the MicroProfile Metrics API, which you can use to add
 metrics to your applications as well as the ability to group application
 metrics into custom scopes and allows querying of metrics by those scopes.

 This feature is based on Micrometer, which can ship metrics to your choice of
 monitoring systems including AppOptics, Azure Monitor, Netflix Atlas,
 CloudWatch, Datadog, Dynatrace, Elastic, Ganglia, Graphite, Humio,
 Influx/Telegraf, JMX, KairosDB, New Relic, Prometheus, SignalFx, Google
 Stackdriver, StatsD, and Wavefront.

### MicroProfile Telemetry 1.0

MicroProfile Telemetry 1.0 was added to MicroProfile 6.0 to superceed
MicroProfile OpenTracing. Consequently, MicroProfile OpenTracing was moved out
of MicroProfile 6.0 and remained as a standalone specification. MicroProfile
Telemetry 1.0 Adopts [OpenTelemetry Tracing](https://opentelemetry.io/). The
tracing is disabled by default. In order to get tracing, you need to set the
property `otel.sdk.disabled=false`.

It supports three types of instrumentations:

- Automatic Instrumentation:
  - Jakarta RESTful Web Services and MicroProfile Rest Client automatically enlisted in distributed tracing
- Manual Instrumentation:
  -	Manual instrumentation can be added via annotations `@WithSpan` or via CDI
    injection `@Inject Tracer` or `@Inject Span` or programmatic lookup 
    ```
    Span.current()
    @WithSpan
    @SpanAttribute
    @Inject io.opentelemetry.api.OpenTelemetry
    @Inject io.opentelemetry.api.trace.Tracer
    @Inject io.opentelemetry.api.trace.Span
    @Inject io.opentelemetry.api.baggage.Baggage```
- Agent Instrumentation:
  - Use [OpenTelemetry Java Instrumetion](https://github.com/open-telemetry/opentelemetry-java-instrumentation) 
    project to gather telemetry data without any code modification.

MicroProfile Telemetry provides the support for the injection of
OpenTelemetry, Tracer, Span and Baggage. The following diagram demonstrates
how MicroProfile Telemetry can be used to trace requests that involve
multiple microservices and how the traces can then be viewed on browsers.

{{< figure src="./images/telemetry.jpg" >}}

The spans can be in otlp or other format, and they can be sent to the backend
Jaeger or Zipkin to be displayed such as the following diagram. This diagram
shows individual traces with multiple spans included. Each span records an
individual operation. With the span information, if something goes wrong,
spotting errors is no longer a challenge.

{{< figure src="./images/compare-traces.jpg" >}}

I have covered all MicroProfile 6.0 content. You can find the compatible
implementation for MicroProfile 6.0 here. Open Liberty is one of the first one.

### Using MicroProfile 6.0 with Open Liberty

Configure the feature microProfile-6.0 in your server.xml to use MicroProfile
6.0. For more information, please refer to this blog.

```
<featureManager>
        <feature>microProfile-6.0</feature>
</featureManager>
```

### Using both Jakarta EE 10 and MicroProfile 6.0 with Open Liberty

Open Liberty supports both Jakarta EE 10 and MicroProfile 6.0. If you want to
use both technologies together, you can simply add the following to your
server.xml

```
<featureManager>
        <feature>platform-10.0</feature>
        <feature>microPorfile-6.0</feature>
</featureManager>
```

### Migration from older Jakarta EE and MicroProfile

Open Liberty lists specification differences for Jakarta EE versions and
MicroProfile versions. Refer to [this doc page](https://openliberty.io/docs/latest/reference/diff/jakarta-ee10-diff.html) 
lists the behaviour differences from Jakarta EE 9.1 to Jakarta EE 10 and [this page](https://openliberty.io/docs/latest/reference/diff/mp-50-60-diff.html) 
for the differences between MicroProfile 5.0 and MicroProfile 6.0. To learn more on Jakarta EE, MicroProfile as well as other cloud native technologies, checkout the [Open Liberty Guides](https://openliberty.io/guides/). To create your cloud native applications using MicroProfile 6.0 and Jakarta EE 10, use [Open Liberty starter ](https://openliberty.io/start/)to start coding.

## Useful links

- [Jakarta EE](https://jakarta.ee/)
- [MicroProfile](https://microprofile.io/)
- [Open Liberty](https://openliberty.io/)
- Create applications using MicroProfile and Jakarta EE
  - [Open Liberty Starter](https://openliberty.io/start/)
  - [MicroProfile Starter](https://start.microprofile.io/)
  - [Jakarta EE Starter](https://start.jakarta.ee/)

