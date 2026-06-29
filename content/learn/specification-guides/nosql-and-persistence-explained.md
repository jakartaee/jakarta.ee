---
title: "Jakarta NoSQL and Jakarta Persistence Explained"
date: "2025-04-29T00:00:00"
headline: "Jakarta NoSQL and Jakarta Persistence Explained" 
description: >-
  The Jakarta EE ecosystem offers specifications for building database backend
  applications using relational and/or NoSQL databases. 
keywords: ["spec", "specification", "guide", "nosql", "database", "persistence", "data", "store"]
hide_page_title: true
categories: ["Specification Guides"]
related_specifications:
  - name: "Jakarta Persistence"
    href: "/specifications/persistence/"
  - name: "Jakarta NoSQL"
    href: "/specifications/nosql/"
  - name: "Jakarta Data"
    href: "/specifications/data/"
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

We will examine these annotations in the overview section of both
specifications.

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

## Jakarta Persistence Overview

The [Jakarta Persistence](/specifications/persistence/) specification,
currently at version 3.2 for Jakarta EE 11, defines a standard for management
of persistence and object/relational mapping in Java environments.

### Background

Having evolved from JSR 338, [Java Persistence 2.2](https://jcp.org/en/jsr/detail?id=338), 
as one of the specifications supporting Java EE 8, Jakarta Persistence has a
rich history dating back to May 2006, as it was initially developed by the
[Enterprise JavaBeans 3.0](https://jcp.org/en/jsr/detail?id=220) expert group 
(JSR 220) with the release of Java EE 5. Delivered in December 2009, Java EE 6
included JSR 317, [Java Persistence 2.0](https://jcp.org/en/jsr/detail?id=317),
the first independent persistence specification.

After the release of Java EE 8 in August 2017, Oracle donated Java EE to the
Eclipse Foundation. Due to trademark laws, the Eclipse Foundation was required
to change the Java EE name and the `javax.*` namespace to what ultimately
became **Jakarta EE** and `jakarta.*`, respectively.

### Configuration

You have two choices for specifying database connection configuration: a
`persistence.xml` file or the [`PersistenceConfiguration`](/specifications/persistence/3.2/apidocs/jakarta.persistence/jakarta/persistence/persistenceconfiguration) 
class in your application.

#### persistence.xml File

The `persistence.xml` file, usually located under the `resources/META-INF`
directory of your project, registers your database with your application.

Listing 7 demonstrates how to connect to the `carsdb` MySQL database using the
standard JDBC driver, `com.mysql.cj.jdbc.Driver`; the database URL,
`jdbc:mysql://localhost:3306/carsdb`; the database user, `root`; and an empty value
for the database password. The persistence unit name, `mysql-persistence-unit`.

```xml
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<persistence xmlns="https://jakarta.ee/xml/ns/persistence"
             xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
             xsi:schemaLocation="https://jakarta.ee/xml/ns/persistence https://jakarta.ee/xml/ns/persistence/persistence_3_2.xsd"
             version="3.2">
    
    <persistence-unit name="mysql-persistence-unit">
        <properties>
            <property name="jakarta.persistence.jdbc.driver" value="com.mysql.cj.jdbc.Driver" />
            <property name="jakarta.persistence.jdbc.url"    value="jdbc:mysql://localhost:3306/carsdb" />
            <property name="jakarta.persistence.jdbc.user" value="root" />
            <property name="jakarta.persistence.jdbc.password" value="" />
        </properties>
    </persistence-unit>
</persistence>
```

*Listing 7: Establishing a connection to a MySQL database using the
`persistence.xml` file.*

#### PersistenceConfiguration Class

The `PersistenceConfiguration` class, new for Jakarta Persistence 3.2,
represents a configuration of a persistence unit that allows you to
programmatically create an instance of [`EntityManagerFactory`](/specifications/persistence/3.2/apidocs/jakarta.persistence/jakarta/persistence/entitymanagerfactory), an interface
designed to work with the `PersistenceConfiguration` class, that will
ultimately create an instance of the [`EntityManager`](/specifications/persistence/3.2/apidocs/jakarta.persistence/jakarta/persistence/entitymanager) 
interface.

Listing 8 demonstrates how to connect to the `carsdb` MySQL database using: the
standard JDBC driver, `com.mysql.cj.jdbc.Driver`; the database URL,
`jdbc:mysql://localhost:3306/carsdb`; the database user, `root`; and an empty
value for the database password. The persistence unit name,
`mysql-persistence-unit`.

```java
@Produces @ApplicationScoped @Documents
EntityManagerFactory configure() {
    return new PersistenceConfiguration()
            .name("mysql-persistence-unit")
            .managedClass(Car.class)
            .property(persistenceConfiguration.JDBC_DRIVER,"com.mysql.cj.jdbc.Driver")
            .property(PersistenceConfiguration.JDBC_URL,"jdbc:mysql://localhost:3306/carsdb")
            .property(PersistenceConfiguration.JDBC_USER,"root")
            .property(PersistenceConfiguration.JDBC_PASSWORD,"")
            .createEntityManagerFactory();
}
```

*Listing 8: Establishing a connection to a MySQL database using the
`PersistenceConfiguration` class.*

### Annotations

The annotations shown in the example application shown in Listings 1 and 2, are
defined under the `jakarta.persistence` package.

#### @Entity

The [`@Entity`](/specifications/persistence/3.2/apidocs/jakarta.persistence/jakarta/persistence/entity) 
annotation declares that the annotated class is an entity. Specific rules for
using this annotation include:

- Must be a `non-final` top-level class or static inner class
- Must have a `public` or `protected` constructor with no parameters
- Must have no `final` methods or persistent instance variables

It is also important to note that an `enum`, `record`, or `interface` may not
be designated as an entity.

A notable difference from Jakarta NoSQL is that a `record` may be designated as
an entity.

#### @Id

The [`@Id`](/specifications/persistence/3.2/apidocs/jakarta.persistence/jakarta/persistence/id)
annotation identifies the primary key of the specified entity. The field or
property to which the `@Id` annotation is applied should have one of the
following Java types:

- any Java primitive type (int, double, byte, etc.)
- any Java primitive wrapper type (Integer, Double, Byte, etc.)
- `String`
- `UUID`
- `java.util.Date`
- `java.sql.Date`
- `BigDecimal`
- `BigInteger`

A notable difference from Jakarta NoSQL is that `java.util.Date` and
`java.sql.Date` are allowed Java types.

#### @Column

The [`@Column`](/specifications/nosql/1.0/apidocs/jakarta.nosql.core/jakarta/nosql/column) 
annotation specifies the database column mapped by the annotated persistent
property or field.

There are 14 optional parameters for this annotation (as opposed to two in
Jakarta NoSQL) that include:

* **name:** a string that allows you to wire together the name of the column
  and the name of its corresponding attribute in the application, should they
  be different.  
* **table**: a string that defines the name of the table that contains the
  column  
* **insertable**: a boolean for whether the column should be included in
  **SQL** **INSERT** statements generated by the persistence provider  
* **updatable**: a boolean for whether the column should be included in **SQL**
  **UPDATE** statements generated by the persistence provider.

If a **@Column** annotation is not explicitly specified, the default values will apply.

The **name** parameter is useful in a situation where the database contains a
foreign key from another table using snake case, but the variable in the
corresponding POJO is in camel case as shown in Listing 9.

```java
@Column("dealer_id")
private int dealerId;
```

*Listing 9: Demonstrating how to use the `@Column` annotation.*

You also have the ability to do this in Jakarta NoSQL, however, the notable
difference is that the name of the method is `value()` as opposed to `name()`.

### Current Status

The current version of Jakarta Persistence is 3.2 and has been included in the
Jakarta EE 11 Platform and Web Profile.

### Compatible Implementations

Two of the compatible implementations for Jakarta Persistence 3.2 are 
[EclipseLink 5.x](https://github.com/eclipse-ee4j/eclipselink/releases/tag/5.0.0-B03) 
and [Hibernate 7.x](https://github.com/hibernate/hibernate-orm/releases/tag/7.0.0.Alpha2).

### Specification Adopters

Jakarta Persistence has been adopted by [SouJava](https://soujava.org.br/).

## Jakarta NoSQL Overview

The [Jakarta NoSQL](/specifications/nosql/) specification, currently at version
1.0 supporting Jakarta EE 11, defines a set of APIs and provides a standard
implementation for most NoSQL databases and streamlining the integration of
Java applications with those databases.

### Background

The journey to Jakarta NoSQL started out with the development of its ultimate
implementation, [Eclipse JNoSQL](https://www.jnosql.org/), before the
specification was even a concept. Introduced to the Java community in March
2017, Eclipse JNoSQL was originally planned to be a community project led by
[Otávio Santana](https://otaviojava.com/) under the auspices of the 
[Java Community Process](https://jcp.org/en/home/index).

The plan to develop Jakarta NoSQL was approved in October 2020, and choosing
Eclipse JNoSQL as its implementation was a natural fit.

### NoSQL Database Types

There are four types of NoSQL databases:

- Key-Value
- Column Family
- Document
- Graph

Let’s quickly review all four of these.

#### Key-Value

Key-Value NoSQL databases store data in a simple key-value format. Each data
item is stored as a key-value pair, where the key is unique and used to access
its corresponding value. These databases are highly scalable and provide fast
access to data, making them suitable for use cases that require high throughput
and low-latency data retrieval.

Example databases include: [Redis](https://redis.io/), 
[MemcacheDB](https://en.wikipedia.org/wiki/MemcacheDB) and [Riak](https://riak.com/).

#### Column Family

Column Family databases store data in a tabular format with columns and rows.
Unlike traditional relational databases, these databases allow a flexible
schema design that can handle vast amounts of structured and semi-structured
data. Column Family databases are suitable for use cases that require high
scalability, fault-tolerance, and efficient querying.

Example databases include: [Apache Cassandra](https://cassandra.apache.org/) and 
[Apache Hadoop Hbase](https://hbase.apache.org/).

#### Document

Document NoSQL databases store data in a semi-structured document format such
as JSON or Binary JSON (BSON). Each document can have its own structure and
fields, providing flexibility in data modeling. These databases are suitable
for handling complex and evolving data structures, and support powerful
    querying and indexing capabilities.

Example databases include: [MongoDB](https://www.mongodb.com/) and 
[Apache CouchDB](https://couchdb.apache.org/).

#### Graph

Graph NoSQL databases store data in a graph structure consisting of nodes
(vertices) and relationships (edges). Each node represents an entity, and edges
represent relationships and connections between these entities. These databases
are ideal for handling highly connected data and performing complex graph-based
queries.

Example databases include: [Neo4J](https://neo4j.com/), [ArangoDB](https://arangodb.com/) 
and [OrientDB](https://orientdb.org/).

### Supported NoSQL Databases

Jakarta NoSQL supports many of today’s common NoSQL databases, as shown in
Figure 1.

{{< figure 
  class="margin-bottom-40"
  src="../images/nosql-dbs.jpg" 
  alt="List of supported NoSQL databases in Jakarta NoSQL: ArangoDB; Apache TinkerPop; biazegraph; basho; Tom Sawyer Software; Cassandra; Couchbase; IBM Graph; CouchDB redux; Infinispan; Elastic; Grakn.ai; hazelcast; Apache HBASE; Azure Cosmos DB; Stardog; Titan; JanusGraph; KeyLines Network Insight; Linkurious; M; mongoDB; Solr; Scylla; neo4j; Oracle NoSQL Database; Orient DB; redis; riak; and RavenDB." 
  caption="Figure 1: The list of supported NoSQL databases in Jakarta NoSQL." 
>}}

### Configuration

As defined in the [Configuration and Credentials](/specifications/nosql/1.0/jakarta-nosql-1.0#_configuration_and_credentials) 
section of the Jakarta NoSQL specification document:

Configuration and credentials for NoSQL databases are not standardized within
the Jakarta NoSQL specification. Each Jakarta NoSQL provider is responsible for
providing its own configuration mechanism, allowing developers to configure the
connection to the NoSQL database according to their specific requirements.

So, for our example application, we will connect to a NoSQL database via a
properties file such as `microprofile-config.properties`. In Listing 10, we
want to use the `carsdb` MongoDB database and connect via `localhost` on
the standard `27017` MongoDB port.

```properties
jnosql.document.database=carsdb
jnosql.mongodb.host=localhost:27017
```

*Listing 10: Establishing a connection to a MongoDB database.*

### Annotations

The annotations shown in the example application shown in Listings 1 and 2, are
defined under the [`jakarta.nosql`](/specifications/nosql/1.0/apidocs/jakarta.nosql.core/jakarta/nosql/package-summary) 
package. 

#### @Entity

The `@Entity` annotation declares that the annotated class is an entity.
Specific rules for using this annotation include:

- At least one field must be annotated with `@Id` or `@Column`.
- Must have a public or protected constructor with no parameters (or with
  parameters annotated with `@Id` or `@Column`).
- Constructor parameters without annotations will be ignored, and instead
  utilize a non-argument constructor.

It is also important to note that an `enum` or `interface` may not be designated as
an entity. However, a `record` may be designated as an entity.

A notable difference from Jakarta Persistence is that an `enum`, `record`, or
`interface` may not be designated as an entity.

#### @Id

The `@Id` annotation identifies the primary key of the specified entity. The
field or property to which the `@Id` annotation is applied should have one of
the following Java types:

- any Java primitive type (`int`, `double`, `byte`, etc.)
- any Java primitive wrapper type (`Integer`, `Double`, `Byte`, etc.)
- `String`
- `UUID`
- `BigDecimal`
- `BigInteger`

The mapped column for the primary key of the entity is assumed to be the
primary key of the database table.

A notable difference from Jakarta Persistence is that `java.util.Date` and
`java.sql.Date` are Java types that are not allowed. They are marked as
deprecated in Jakarta Persistence 3.2, so use of the **`java.time` API** is
encouraged there as well.

#### @Column

The [`@Column`](/specifications/nosql/1.0/apidocs/jakarta.nosql.core/jakarta/nosql/column) 
annotation specifies the database column mapped by the annotated persistent
property or field. If a `@Column` annotation is not explicitly specified, the
field will be ignored.

There are two optional parameters for this annotation:

- **udt**: a string that defines the user-defined type for this column.
- **value**: a string that defines the name of the column.

The **value** parameter is useful in a situation where the database contains a
foreign key from another collection defined using snake case, but the variable
in the corresponding POJO is in camel case, as shown in Listing 11.

```java
@Column("brewer_id")
private int brewerId;
```

*Listing 11: Demonstrating how to use the `@Column` annotation.*

You also have the ability to do this in Jakarta Persistence, however, the
notable difference is that the name of the method is `name()` as opposed to
`valuename()`.

### Current Status

The current version of Jakarta NoSQL is 1.0.0, and is not part of the Jakarta
EE 11 Platform. It is a candidate for inclusion in Jakarta EE 12.

### Compatible Implementations

One of the compatible implementations for Jakarta NoSQL is [Eclipse JNoSQL](https://www.jnosql.org/) 
1.x.

### Specification Adopters

Jakarta NoSQL has been adopted by the 
[Garden State JUG](https://gsjug.org/) and [SouJava](https://soujava.org.br/).

## Conclusion

The Jakarta NoSQL and Jakarta Persistence specifications allow you to build
robust backend database applications.

While there are obvious differences in these specifications, the use of the
`@Entity`, `@Id`, and `@Column` annotations is very similar. This makes it easier for
developers to move from NoSQL to relational database applications or vice
versa.

The [Jakarta Data](/specifications/data/) specification, introduced in the summer of 2022,
is included in the Jakarta EE 11 Platform and Web Profile. This new
specification aims to be a top-level specification supporting both Jakarta
NoSQL and Jakarta Persistence.

Looking ahead to Jakarta EE 12, the Jakarta NoSQL [committers](https://projects.eclipse.org/projects/ee4j.nosql/who) 
will be working towards having this specification included in the Jakarta EE
12, scheduled for release in 2026. In the meantime, however, you can still
build your NoSQL applications with Jakarta NoSQL.

This GitHub [repository](https://github.com/mpredli01/jakartaee-11) contains
examples on how to use some of the Jakarta EE specifications. Please note that
there are some parts of this repository that are a work in progress. Feedback
would indeed be appreciated!
