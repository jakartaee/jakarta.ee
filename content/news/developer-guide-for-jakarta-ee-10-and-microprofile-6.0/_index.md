---
title: Developer Guide for Jakarta EE 10 and MicroProfile 6.0
date: 2023-05-17
publishDate: 2023-05-17
type: announcements
news/tags:
  - Jakarta EE
  - MicroProfile
authors: [{ gh_handle: Emily-Jiang, name: Emily Jiang }]
summary: ""
---

On 22nd September 2022, Jakarta EE 10 was released. Three months later,
MicroProfile 6.0 was released with Jakarta EE 10 Core Profile alignment. We are
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

Insert Image Here

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

Insert Image Here

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

INSERT IMAGE

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




