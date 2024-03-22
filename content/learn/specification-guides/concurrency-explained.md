---
title: "Jakarta Concurrency Explained" 
date: "2024-03-12"
headline: "Jakarta Concurrency Explained" 
description: >-
  The Jakarta Concurrency specification targets application performance
  and usability by providing a standard API for developing concurrent
  application processes without compromising container integrity
keywords: ["spec", "specification", "guide", "concurrency", "explained", "tutorial"]
hide_page_title: true
weight: 7
---

Application performance can make or break a user’s experience.
Applications that provide a consistent experience and perform well are
more likely to benefit user productivity. The Jakarta Concurrency
specification targets application performance and usability by providing
a standard API for developing concurrent application processes without
compromising container integrity. It is not recommended to utilize
traditional Java SE threads or timers within a Jakarta EE container
because use of threads or timers may cause reliability issues and
unexpected results. Jakarta Concurrency provides an API that does not
intrude on container integrity, but rather, uses services that are
managed by the container and matches the functionality provided by the
Java SE Concurrency Utilities. 

Developers who are familiar with the Java SE Concurrency utilities API
will be able to leverage their existing knowledge to use this API, as
there are many similarities. Containers extend the `java.util.concurrent`
API by providing managed versions of `java.util.concurrent.ExecutorService`
interfaces. All Jakarta EE compliant containers include default executor
services, context services, and thread factories for performing
particular tasks such as spawning asynchronous tasks and scheduling tasks
to be executed at a specified time. However, it is also possible to
develop custom services, if needed, and register them with a container.

## Configuring Jakarta Concurrency

Jakarta Concurrency is part of all Jakarta EE compatible containers.
However, to explicitly add the Jakarta Concurrency API to a maven
application, add the following dependency:

```xml
<dependency>
  <groupId>jakarta.enterprise.concurrent</groupId>
  <artifactId>jakarta.enterprise.concurrent-api</artifactId>
  <version>3.0.2</version>
</dependency>
```

## Asynchronous Tasks

Jakarta EE compliant containers must contain a `ManagedExecutorService`,
which extends the Java SE `ExecutorService`. Tasks can be passed to a
ManagedExecutorService, and those tasks can then be performed within a
container managed thread and passed back to the caller once complete.
This process can occur asynchronously, allowing the application to
continue performing other tasks while the `ManagedExecutorService`
processes the task which had been handed off. The `ManagedExecutorService`
returns a `Future` object to the caller, which will return a boolean
indicating when the task has been completed. The caller can poll this
Future object and then perform some action using the resulting object
once the task has completed.

A task is developed by creating a class that must implement
`java.util.concurrent.Callable` or `java.lang.Runnable`, or any of the
functional interfaces that can be supplied to a
`java.util.concurrent.CompletionStage`. A `Callable` task class can
optionally return a result to the caller. When tasks are submitted to a
managed executor or managed CompletionStage, they become contextual,
behaving in the same manner as they had within the original container.
This means that contextual information and state can be passed to the
`ManagedExecutorService` within the task and utilized while processing.
For example, a session may contain the username of an authenticated user,
and that information can be passed to the `ManagedExecutorService` within
the task. A task class that implements `Runnable` may be structured as
follows:

```java
public class MyTask implements Runnable {
// Inject resources, if needed

    public void run() {
        // execute logic
    }
}
```

For more fine grained control, a task class can optionally implement the
`jakarta.enterprise.concurrent.ManagedTask` interface, which enables the
ability to perform actions upon lifecycle events. This is achieved by
registering a `jakarta.enterprise.concurrent.ManagedTaskListener`
instance with the task. A use case for implementing `ManagedTask` may be
to initiate a process when a particular lifecycle event occurs.

To pass a task to a `ManagedExecutorService`, the
`ManagedExecutorService` can be obtained for use within a resource
through use of the Java Naming and Directory Interface (JNDI).
Alternatively, the `ManagedExecutorService` can be configured via XML
within the web.xml of the application. After the resource has been
obtained, then the task can be submitted to it by calling upon any one of
the `submit()`, `execute()`, `invokeAll()`, `invokeAny()`, `runAsync()`,
or `supplyAsync()` methods. The following code demonstrates how to obtain
the `ManagedExecutorService` resource and submit a task to it.

```java
@Resource(name = "concurrent/_defaultManagedExecutorService")
ManagedExecutorService managedExecutorService;

// Pass task class to the ManagedExecutorService
Future futureObject = managedExecutorService.submit(myTask);
```

If there are a number of tasks which need to be executed in parallel, it
is possible to do so by passing an array of `Runnable` or `Callable` tasks to
the `ManagedExecutorService` `invokeAll()` method. The following code
demonstrates how to construct an array of builder tasks and submit them
to the `ManagedExecutorService`.

```java
ArrayList<Callable<TaskType>> builderTasks = new ArrayList<Callable<<TaskType>>();
builderTasks.add(new TaskType(1));
builderTasks.add(new TaskType(2));
List<Future<TaskType>> results = managedExecutorService.invokeAll(builderTasks);
```

In circumstances where transactions are required,
`jakarta.transaction.UserTransaction` can be used to utilize transactions
within task classes. In order to do so, obtain the `SessionContext`
resource, and then utilize it to obtain a `UserTransaction`.

## Scheduled Tasks

The `ManagedScheduledExecutorService` is a container resource that
extends the `java.util.concurrent.ScheduledExecutorService` and
`jakarta.enterprise.concurrent.ManagedExecutorService` interfaces to
provide the same managed functionality as a ManagedExecutorService, with
the additional ability to delay and schedule tasks to run at a specific
time. Task classes, which implement either `java.lang.Runnable` or
`java.util.concurrent.Callable`, can be passed to the
`ManagedScheduledExecutorService` and executed at a delayed or scheduled
interval. To pass a task to the `ManagedScheduledExecutorService`, the
service must be obtained for use into a resource via JNDI.
Alternatively, the `ManagedScheduledExecutorService` can be configured via
XML within the web.xml of the application. Once obtained, task(s) can be
submitted by calling upon any one of the `submit()`, `execute()`,
`invokeAll()`, `invokeAny()`, `runAsync()`, `supplyAsync()`, `schedule()`,
`scheduleAtFixedRate()`, or `scheduleWithFixedDelay()` methods. The
following code demonstrates how to obtain a
`ManagedScheduledExecutorService` resource and schedule a task.

```java
@Resource(name="concurrent/_defaultManagedScheduledExecutorService")
ManagedScheduledExecutorService managedScheduledExecutorService;

// Pass task class to the ManagedExecutorService
Future futureHandle = managedExecutorService.scheduleAtFixedRate(myTask, 10, TimeUnit.MINUTES);
```

## Managed Threads

A `ManagedThreadFactory` can be used to create new thread instances within
a Jakarta EE container without directly utilizing `java.util.Thread`.
These managed thread instances can be registered using JNDI.
Alternatively, `ManagedThreadFactory` can be configured via XML within the
web.xml descriptor. Managed threads execute much like a standard thread,
however, they execute in the same context as the container. To utilize a
`ManagedThreadFactory`, inject an instance into a resource and then call
upon the `newThread()`, passing the `Runnable` or `Callable` task class.
Lastly, invoke the `start()` method on the new thread to begin. Using the
example task class from the previous section, the following code
demonstrates how to create a new thread and pass the task to the thread:

```java
@Resource(name="concurrent/MyManagedThreadFactory")
ManagedThreadFactory threadFactory;
. . .
// Create task and pass to thread
MyTask task = new MyTask();
Thread taskThread = threadFactory.newThread(task);
taskThread.start();
. . .
// Destroy the thread if it is no longer needed
taskThread.interrupt();
```

## Contextual Tasks

The `ContextService` can be used to create contextual objects for Jakarta
EE without the use of a `ManagedExecutorService`. The `ContextService`
utilizes dynamic proxy capabilities which are found within the
`java.lang.reflect` package or creates non-dynamic proxy instances in order
to associate the context of the container with an object instance(s).
Since the contextual object proxy will be run as an extension of the
container that creates it, the proxy may interact with the container
resource. The contextual object proxy can also be stored and run at a
later time, if needed. Such solutions are useful for developing
applications that require context throughout a process, such as a
workflow. The `ContextService` can be registered using JNDI.
Alternatively, a `ContextService` can be configured via XML.

## Asynchronous Methods

Jakarta EE 10 introduced asynchronous methods to the Jakarta Concurrency
specification. Asynchronous methods enable developers to annotate
methods contained within CDI beans in order to have those methods invoked
asynchronously. The CDI bean must not be a Jakarta Enterprise Bean, and
the asynchronous method cannot be annotated with any library asynchronous
annotations. Asynchronous methods should contain a return type of
`java.util.concurrent.CompletableFuture`,
`java.util.concurrent.CompletionStage`, or `void`. Behind the scenes, the
application container will execute the method within a
`java.util.concurrent.CompletableFuture` or
`jakarta.enterprise.concurrent.ManagedExecutorService`. As such, the
container context is propagated to asynchronous methods. The following
code demonstrates an example of developing an asynchronous method:

```java
@Asynchronous(executor="java:module/env/concurrent/myExecutor")
public CompletableFuture<String> myMethod() {
    // Processing
    return Asynchronous.Result.complete(string);
}
```

## Thread Context Providers

Jakarta Concurrency contains a `ThreadContextProvider` SPI to provide a
standard means for third party thread context types to be provided
alongside the Jakarta EE container’s built-in thread context types. This
means that there is a standard way for third party developers to create
types that can be utilized within a compliant Jakarta EE container
without breaking compliance.

## Conclusion

Jakarta Concurrency provides a standard means for developing concurrent
solutions within a Jakarta EE container without compromising the
integrity of the container. Compliant Jakarta EE containers have
executor services, context services, and managed thread factories
configured, which can accept tasks and execute them asynchronously or at
scheduled intervals. Through the use of these services, container
context is propagated to tasks and container resources are available for
use by tasks. 

