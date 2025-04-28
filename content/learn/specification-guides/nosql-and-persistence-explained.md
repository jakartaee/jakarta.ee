---
title: "Jakarta NoSQL and Jakarta Persistence Explained"
date: "2024-03-12T00:00:00"
headline: "Jakarta NoSQL and Jakarta Persistence Explained" 
description: >-
    Todo
keywords: ["spec", "specification", "guide", "nosql", "database", "persistence", "data", "store"]
hide_page_title: true
weight: 8
categories: ["Specification Guides"]
---

## Abstract

The Jakarta EE ecosystem offers specifications for building database backend
applications using relational and/or NoSQL databases. The Jakarta Persistence
specification, with a rich history dating back almost 20 years, has been a
staple in the Java community for writing relational database applications. The
Jakarta NoSQL specification, with a short history dating back to 2020, provides
comprehensive support for all four types of NoSQL databases.

## Introduction

The Jakarta EE ecosystem offers specifications for building database backend
applications using relational and/or NoSQL databases. The [Jakarta Persistence](/specifications/persistence/)
specification, with a rich history dating back almost 20 years, has been a
staple in the Java community for writing relational database applications. The
[Jakarta NoSQL](/specifications/nosql/) specification, with a short history
dating back to 2020, provides comprehensive support for all four types of NoSQL
databases.

Along with an overview of each specification, this guide provides an example
application, the required dependencies and configuration, an explanation of the
most frequently used annotations for connecting to a relational or NoSQL
database, its current status, and compatible implementations.

The Jakarta EE [Adopt-a-Spec](/community/adopt-a-spec/) initiative encourages
Java User Groups (JUGs) and their members to get involved by adopting a Jakarta
EE specification. The objective is to increase developer-level participation in
the evolution of a Jakarta EE specification. There are currently eight Java
User Groups that have adopted various Jakarta EE specifications. The JUGs that
have adopted Jakarta NoSQL and Jakarta Persistence will be listed here as well.

### Example Application

For both Jakarta Persistence and Jakarta NoSQL, we will use a model of a
`carsdb` MySQL and MongoDB databases, with tables/collections named `cars` and
`dealers`, that store information about various cars and dealerships that sell
them.

Listing 1 is a Plain Old Java Object (POJO) that models the `cars`
table/collection in the `Car` class, decorated with annotations.

```java
@Entity
public class Car {

    @Id
    private int id;

    @Column
    private String make;

    @Column
    private String model;

    @Column
    dealerId;

    //The usual constructors and getters/setters are defined here
}
```
*Listing 1: The `Car` class using the Jakarta Persistence and Jakarta NoSQL
annotations.*

Similarly, Listing 2 is a POJO that models the `dealers` table/collection in
the `Dealers` class, decorated with annotations.

```java
@Entity
public class Dealer {

    @Id
    private int id;

    @Column
    private String name;

    @Column;
    private String city;

    @Column
    private String state;

    //The usual constructors and getter/setters are defined here
}
```

*Listing 2: The `Dealer` class using the Jakarta Persistence and Jakarta NoSQL
annotations.*

### Dependencies

Each of these database technologies requires a minimal set of dependencies that
are available by default if you specify the full 
[Jakarta EE Platform](/specifications/platform/) or the [Jakarta EE Web Profile](/specifications/webprofile/) 
in your `pom.xml` or `build.gradle` file. At this time, this is only true with
Jakarta Persistence.

However, you can individually specify the dependencies for a particular
specification, especially if it hasn’t yet been included in one of the Jakarta
EE profiles. Such is the case with Jakarta NoSQL.

Let’s examine the required dependencies for each specification.

#### Jakarta Persistence

If Maven is your preferred build tool, use this artifact, as shown in Listing
3, in your `pom.xml` file:

```xml
<dependency>
    <groupId>jakarta.persistence</groupId>
    <artifactId>jakarta.persistence-api</artifactId>
    <version>3.2.0</version>
</dependency>
```
*Listing 3: The Jakarta Persistence dependency defined in Maven.*

If Gradle is your preferred build tool, use this artifact, as shown in Listing
4, in your `build.gradle` file:

```gradle
implementation group: 'jakarta.persistence', name: 'jakarta.persistence-api', version: '3.2.0'
```

*Listing 4: The Jakarta Persistence dependency defined in Gradle*

#### Jakarta NoSQL

If Maven is your preferred build tool, use this artifact, as shown in Listing
5, in your `pom.xml` file:

```xml
<dependency>
    <groupId>jakarta.nosql</groupId>
    <artifactId>jakarta.nosql-api</artifactId>
    <version>1.0.0</version>
</dependency>
```

*Listing 5: The Jakarta NoSQL dependency defined in Maven.*

If Gradle is your preferred build tool, use this artifact, as shown in Listing
6, in your `build.gradle` file:

```gradle
implementation group: 'jakarta.nosql', name: 'jakarta.nosql-api', version: '1.0.0'
```

*Listing 6: The Jakarta NoSQL dependency defined in Gradle.*

Now that we have covered the application and dependencies, let’s review the
individual specifications.

### Common Annotations

For both Jakarta Persistence and Jakarta NoSQL, annotations that represent a
database entity, a primary key and database columns, share the same names.
These are `@Entity`, `@Id` and `@Column`, respectively. While similar in
design, there are notable differences that will be discussed in this document.
