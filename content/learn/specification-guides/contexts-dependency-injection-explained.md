---
title: "Jakarta Contexts Dependency Injection Explained" 
date: "2024-03-12"
headline: "Jakarta Contexts Dependency Injection Explained" 
description: >-
  Jakarta Dependency Injection provides the ability to make
  use of contextual objects in an application with maximum
  reusability, testability, and maintainability.
keywords: ["spec", "specification", "guide", "dependency injection", "design pattern", "contexts", "cdi", "scope assignment", "tutorial"]
hide_page_title: true
weight: 6
categories: ["Specification Guides"]
---

Jakarta Dependency Injection provides the ability to make
use of contextual objects in an application with maximum
reusability, testability, and maintainability. This
specification provides a means for developers to easily
obtain objects throughout classes within an application
without the requirement to use constructors, factories, or
service locators.

Jakarta Contexts and Dependency Injection, Jakarta CDI for
short, is one of the paramount specifications of the
Jakarta EE Platform, as it contains a number of powerful
complimentary services that are utilized across a majority
of Jakarta EE applications. Jakarta CDI has been known as
the "glue" for the Jakarta EE Platform because one of the
most significant features is the enablement of contextual
objects to be made available for use throughout other
classes and views within an application. The specification
makes use of the Jakarta Dependency Injection specification
to provide this capability, but Jakarta CDI also provides a
number of other features beyond dependency injection
including scope assignment, generation of preconfigured
objects, qualification, initiating code when events occur,
to mention a few.

The Jakarta Dependency Injection specification has been
updated to release 2.0 for inclusion in the Jakarta EE 10
release, and Jakarta CDI has been updated to 4.0. There
have been some significant improvements made for the
Jakarta CDI 4.0, with some pertaining to the size of the
specification. One of the major enhancements was that the
Jakarta CDI Core has been broken up into two components,
those being Jakarta CDI Full and Jakarta CDI Lite. Jakarta
CDI is comprised of three main parts:  Jakarta CDI SE,
Jakarta CDI EE, and Jakarta CDI Core.

- Jakarta CDI SE: Components required for use within Java
  SE applications
- Jakarta CDI EE: Components required for use within
  Jakarta EE applications
- Jakarta Core CDI: Components that make up the base for
  CDI
  - Jakarta CDI Full: Includes the entire suite of
    features, including those available in Jakarta CDI Lite
  - Jakarta CDI Lite: Includes a powerful subset of the
    features to provide a leaner implementation which is
    more suitable for build-time oriented applications

## Configuration for Jakarta Contexts and Dependency Injection

To utilize Jakarta CDI 4.0, include the following Maven
dependency:

```xml
<dependency>
    <groupId>jakarta.enterprise</groupId>
    <artifactId>jakarta.enterprise.cdi-api</artifactId>
    <version>4.0.0</version>
</dependency>
```

An optional XML file named beans.xml can be used to
configure Jakarta CDI for an application. Configurable
items include: Bean Discovery Mode: Mechanism to indicate
how the bean manager determines which beans to manage
Interceptors, Decorators, Alternatives In Jakarta CDI 4.0
the bean-management-mode has changed from "all" to
"annotated", which means only beans that are annotated with
a Jakarta CDI annotation are managed. This is a breaking
change in functionality that developers must be aware of
when moving to Jakarta EE 10.

## Dependency Injection

In many cases, it makes sense to reuse or share object
content across classes within an application. Dependency
Injection enables objects to be utilized across other
classes, retaining context. All of this can be done in a
lightweight and loosely coupled manner via the use of
annotations. To inject a valid Jakarta CDI object at the
class level, place the `@Inject` annotation on a field
designating the type of bean that needs to be injected.
This is known as field injection. For example, to use a
bean of type `BeanOne` in a bean of type `BeanTwo`, apply the
`@Inject` annotation on `BeanOne` at the class level within
`BeanTwo`, as follows:

```java
@Inject
BeanOne beanOne;
```

Once injected, if the object is still in scope then it will
contain any values that were assigned previously. This
provides an easy way to pass contextual objects around
within an application.

Field injection is just one way to utilize dependency
injection. There are two other forms, those being
constructor injection and setter injection. To perform
constructor injection, a CDI bean can be passed into the
constructor of another CDI bean and then assigned to a
field of that type. Setter injection is performed when a
bean’s setter method(s) are annotated with `@Inject`.

It is possible to specify more than one bean of the same
type, but use those beans in different ways. To
differentiate CDI beans in these situations, the `@Named`
annotation can be applied to provide a string based name
which can be specified in order to tell Jakarta CDI which
bean to inject. Applying `@Named` at the class level also
enables a bean to become referenced within web views via
the Jakarta Expression Language. It is also possible to
exclude beans from injection by applying the `@Vetoed`
annotation at the class level.

## Contexts and Scopes

As beans can be injected into other beans, they maintain context so that
the values which are assigned to the fields of a bean can be used from
within their injection points. These contextual objects can be assigned
scopes that prescribe the duration of a bean context. There are a number
of different Jakarta CDI scopes that can be applied to a bean. The
scopes and their respective behaviors are as follows:

- `@ApplicationScoped`: Instantiated once per application, remains available to all other objects within the same application.
- `@SessionScoped`: Instantiated once per session, remains available to all other objects within the same session. (Not available in Jakarta CDI Lite)
- `@ConversationScoped`: Instantiated once per conversation, remains available to all other objects within the same conversation. (Not available in Jakarta CDI Lite)
- `@RequestScoped`: Instantiated once per request, remains available throughout the lifecycle of the request.
- `@Dependent`: The object exists to serve exactly one bean and retains the same lifecycle as that bean.

To assign scope to a Jakarta CDI bean, place the annotation pertaining to
the desired scope at the class level.

## Producers

Jakarta CDI provides the ability to encapsulate the business logic
required to automatically construct beans of a specified type in such a
way that the constructed beans are ready for use. A Producer method is a
way to abstract bean construction details and automatically produce
objects that can be consumed. Producer methods require the following:

- Interface which declares a method
- Implementation class for the interface
- Method within a Jakarta CDI bean which is used to instantiate an
  instance of the implementation class and return it, and the method is
  annotated with `@Produces`

A producer method typically resembles a getter method and returns a fully
constructed bean of a specified type. An example looks as follows:

```java
@Produces
public MyBean getMyBean() {
    return new MyBean(configurationValues);
}
```

## Qualifiers

At times, there may be more than one implementation of a particular
interface. In such cases, a qualifier can be used to help differentiate
between which implementation needs to be invoked or injected into another
bean. Qualifiers are simply annotations that can be placed on a class,
method, or field in order to specify type. To develop a qualifier, create
a public `@interface`, and specify the `@Qualifier` annotation. The
`@Retention` and `@Target` must also be specified to indicate how long
the qualifier should be retained as well as the constructs to which the
qualifier pertains, respectively.

## Alternatives

While qualifiers provide a clean way to differentiate between beans of
the same type, another solution is alternatives. Alternatives are a
deployment-time solution for specifying which bean implementation to use.
To use alternatives, apply the `@Alternative` annotation to two or more
bean implementations of a type, and then specify the `<alternatives>`
element within the beans.xml file to designate which class to use.
Alternatives provide a great way to utilize different implementations of
classes across different environments.

```xml
<alternatives>
    <class>org.myorg.MyAltClass</class>
</alternatives>
```

## Interceptors

A Jakarta CDI interceptor is a cross cutting action that can be invoked
when certain application logic is initiated. An action or event
invocation within an application causes the interceptor to execute and
perform a task. Interceptors require an interceptor binding to be
created, as well as an interceptor class. An interceptor binding is
coded in much the same way as a qualifier, and it is used by Jakarta CDI
to determine the interceptor association. The following code shows an
interceptor binding that will be used to send a notification.

```java
@InterceptorBinding
@Retention(RUNTIME)
@Target({METHOD, TYPE})
public @interface Notify {
}
```

The binding can be applied to a class, along with the `@Interceptor`
annotation. The class must then contain a method annotated with one of
the Jakarta CDI injection point annotations, such as `@AroundInvoke`, and
the method should contain the code that would be executed. In this case,
the method would provide a means of sending a notification.

Lastly, the beans.xml file must include a reference to the interceptor
within the `<interceptors>` element. 

```xml
<interceptors>
    <class>org.myorg.interceptor.Notify</class>
</interceptors>
```

Once these pieces are in place, a class or method can be annotated with
the interceptor binding, in this case `@Notify`, to apply the interceptor.

## Events and Observers

Jakarta CDI contains an event handling API which enables synchronous or asynchronous action methods to be invoked when events are fired. The API requires an interface, one or more implementation classes, and a business method which fires the event. Much like interceptors, the event handling system makes use of qualifiers to differentiate between more than one action implementing the same interface. The event API includes an observer method, which listens for an event to occur on the payload.

To create an event, write an interface which declares an event method. The event method should accept a payload, which is typically a plain old Java object. 

public interface MyEventHandler {
    public void myEvent(EventPayload payload);
}

The next step is to develop one or more implementation classes for the interface. The class must implement the event method, accepting the event payload as an argument. The payload argument can optionally include a qualifier and the @ObservesAsync annotation if the event should be fired asynchronously.

Lastly, the class which fires the event should inject an Event of the same type as the payload, optionally including a qualifier, if needed. To fire the event, the injected Event handler’s fire() or fireAsync() method should be invoked, passing the payload. If working with asynchronous events, a handler should be coded by calling the Event’s whenCompleteAsync() method, and implementing business logic to be invoked after event completion.
   
```java
myEvent.fireAsync(payload)
       .whenCompleteAsync((event, throwable) -> {
          if (throwable != null) {
              System.out.println("there is an issue");
          } else {
              System.out.println("no issues");
              //perform action
          }
       });
```

## Java SE

Jakarta CDI can be utilized within a Java SE application using the
bootstrap API. An initializer class named `SeContainerInitializer` can be
used to create a new instance, and subsequently it can create an
SeContainer object, which can be used to work with the Jakarta CDI APIs.
A synthetic bean archive becomes available for use within the
`SeContainer`, which is dependent upon bean discovery enablement. If bean
discovery is not enabled, then the synthetic bean archive contains only
programmatically added beans.

## Extensions

Jakarta CDI provides SPIs for development of portable extensions and
build compatible extensions. CDI extensions are a means of implementing
additional functionality for the CDI container enabling various ways for
integrating with the container. Build compatible extensions are new as
of Jakarta EE 10, and they are available for use within more restricted
environments than portable extensions. They are processed at build-time,
enabling extensions while compiling to native. As such, Build Compatible
Extensions are also available in CDI Lite. The Portable extensions
mechanism is not available as part of Jakarta CDI Lite.

Portable extensions are acted upon during the application bootstrap time.
They may integrate with the container upon the invocation CDI container
initialization events. During the initialization process, a series of
initialization events are fired, and extensions may observe these events
and interact with the container. There are a number of ways in which a
portable extension can interact with the container, including:

- Providing its own beans, interceptors, and decorators
- Injection of dependencies into its own objects
- Providing a context implementation for a custom scope
- Augmenting or Overriding annotation metadata

Build Compatible Extensions provide an alternative means of interacting
with the container by performing annotation transformations. Build
Compatible Extensions are methods annotated with extension annotations,
and these extension annotations correspond to phases in which the
extensions are processed. The following are the extension
annotations/phases, along with the functionality that Build Compatible
Extensions can perform during that phase:

- `@Discovery`: Register additional classes and registering custom
  contexts
- `@Enhancement`: Alter annotations on discovered types 
- `@Registration`: Observe registered beans and observers
- `@Synthesis`: Register synthetic beans and observers
- `@Validation`: Perform custom validation

## Additional Functionality

There are many more APIs available for use within Jakarta CDI.
Stereotypes provide a means to produce a set of recurring bean roles,
including metadata, as needed. Decorators are a way to inject additional
business logic into an existing bean.

## Conclusion

Jakarta Contexts and Dependency Injection is an important specification
for all Jakarta EE solutions. It utilizes the Jakarta Dependency
Injection specification, and also provides a number of other useful
APIs to enhance application capability. The most recent releases of
Jakarta CDI that are available with Jakarta EE 10 include a new Jakarta
CDI Lite, which can be beneficial for built-time oriented applications.

