---
title: "Jakarta Persistence Explained" 
date: "2024-03-12"
headline: "Jakarta Persistence Explained" 
description: >-
  Enterprise applications typically require persistence for data storage. The
  specification is foundational for many technologies since relational
  databases are widely used within the industry. The Jakarta Persistence
  specification, also known as Jakarta Persistence API (JPA), encompasses a
  number of APIs that facilitate the creation, reading, updating, and deletion
  of data within data stores.
keywords: ["spec", "specification", "guide", "tutorial", "persistence", "database", "sql", "query", "named", "typed", "data"]
hide_page_title: true
weight: 4
---

Enterprise applications typically require persistence for data storage. The
specification is foundational for many technologies since relational databases
are widely used within the industry. The Jakarta Persistence specification,
also known as Jakarta Persistence API (JPA), encompasses a number of APIs that
facilitate the creation, reading, updating, and deletion of data within data
stores. The specification provides an Entity Manager API which is used to
facilitate the lifecycle of entities within an application. The `Query` and
`TypedQuery` APIs are used to retrieve data utilizing both static and dynamic
queries. The Metamodel API enables the ability to obtain metadata regarding
managed entities and persistence objects. Lastly, the Criteria API provides a
means for defining queries through the use of object based query objects to
perform strongly-typed queries.

The APIs that are part of Jakarta Persistence work together to form a powerful
solution for mapping Java classes to database tables and creating, reading,
updating, and deleting data. Although the specification is quite large and
there are many capabilities that provide developers with fine grained control
over entity classes and their data, it is also very easy to get started with
basic object mapping and querying. This document will provide a brief overview
of Jakarta Persistence, and you are encouraged to look at the full
specification documentation for more detail on each of the APIs.

## Configuring Jakarta Persistence

Jakarta Persistence is included in the Jakarta EE Platform and Jakarta EE Web
Profile. If using the platform or web profile, there is no need to add Jakarta
Persistence as a separate dependency. However, if adding individual
specifications, the following Maven dependency should be added to include
Jakarta Persistence:

```xml
<dependency>
    <groupId>jakarta.persistence</groupId>
    <artifactId>jakarta.persistence-api</artifactId>
    <version>3.1.0</version>
</dependency>
```

In order to connect to a database, it must be registered with the application
via an XML configuration file known as the persistence.xml. There are a couple
of different ways to register the database. The database connection information
can be provided within the application server container. The application server
would then provide a JNDI connection name which can be registered to
applications within the persistence.xml. Alternatively, all database connection
information can be defined within the persistence.xml directly. The benefit of
registering the database within the application server container is that the
credentials do not need to be entered into the persistence.xml, as the
application server manages database connectivity. The following XML
demonstrates how to register an application server defined data source to an
application within the persistence context:

```xml
<persistence version="3.0" xmlns="https://jakarta.ee/xml/ns/persistence" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="https://jakarta.ee/xml/ns/persistence https://jakarta.ee/xml/ns/persistence/persistence_3_0.xsd">
    <!-- Define Persistence Unit -->
    <persistence-unit name="PetServicePU" transaction-type="JTA">
        <jta-data-source>jdbc/sample</jta-data-source>
        <exclude-unlisted-classes>false</exclude-unlisted-classes>
    </persistence-unit>
</persistence>
```

## Overview of Example

In order to demonstrate how Jakarta Persistence maps database tables to Java
entity classes, this paper uses an example database schema. The schema was
developed for creation with Apache Derby, but it should be easily transportable
for use with other databases. In this example, a pet database is used to store
pet types, pets, and the pet owners. The database schema is created using the
following SQL:

```sql
create table PET_TYPE (
ID         NUMERIC PRIMARY KEY,
PET_TYPE   VARCHAR(50));

create table PET_OWNER (
ID         NUMERIC PRIMARY KEY,
FIRST_NAME VARCHAR(100),
LAST_NAME  VARCHAR(100));

create table PET (
ID         NUMERIC PRIMARY KEY,
TYPE_ID    NUMERIC REFERENCES PET_TYPE(ID),
OWNER_ID   NUMERIC REFERENCES PET_OWNER(ID),
NAME       VARCHAR(100),
COLOR      VARCHAR(50),
BIRTH_DATE DATE);
```

There are three tables in the schema. The `PET_TYPE` table contains the type of
pet, the `PET_OWNER` table contains the owner information, and the `PET` table
contains the information about the pet. The `PET` table relates to both the
`PET_TYPE` and `PET_OWNER` tables.

## Mapping Entities to Database Tables

Database tables can be mapped directly to Plain Old Java Objects (POJOs) that
contain special annotations for Jakarta Persistence. These classes are called
entity classes. A single table typically maps to a single entity class, and
the columns of a table map to the fields declared within the entity class.
However, in advanced cases it is possible to map entities in different ways to
make the data more flexible. The entity class must contain the `equals()`,
`hashCode()`, and `toString()` methods. There are a large number of annotations
that can be used to customize entity classes in order to achieve the database
mapping solution to suit the needs of the task. This article will only provide
a brief overview of some of the most widely used annotations. 

The `@Table` annotation is used to specify the database table name to which the
entity class maps. Any relational database table that will be used with
Jakarta Persistence must contain a primary key, which will map to a field
annotated with `@Id` within the entity class. By default, database column names
map directly to the field that are declared within an entity class using
camelcase field names rather than underscores. However, a field name may be
different than that of the corresponding database column so long as the field
name is annotated with `@Column(name=”THE_FIELD_NAME”)`.

Considering the example database schema, the following entity class would map
to the `PET_OWNER` database table:

```java
@Entity
@Table(name = "PET_OWNER")
public class PetOwner implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = false)
    @Column(name = "ID")
    private Integer id;
    @Column(name = "FIRST_NAME")
    private String firstName;
    @Column(name = "LAST_NAME")
    private String lastName;
    @OneToMany(mappedBy = "petOwner")
    private Collection<Pet> petCollection;

    public PetOwner() {
    }

    public PetOwner(Integer id) {
        this.id = id;
    }

    // Accessor methods removed for brevity…

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (id != null ? id.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        if (!(object instanceof PetOwner)) {
            return false;
        }
        PetOwner other = (PetOwner) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "org.eclipse.jakartapets.entity.PetOwner[ id=" + id + " ]";
    }
    
}
```

## Entity Relationships

Relational databases are built around the idea of breaking down data types into
their simplest form possible, and creating tables to hold the data. Since
tables correlate to simple form (aka: first normal form), oftentimes it takes
more than one table to store the data associated along with corresponding
attribute data. Relating tables to each other is also known as “joining” the
tables, usually by providing a column(s) to hold the key(s) for the related
tables. Entity classes can also provide relationships to other entities in a
similar manner. 

There are a number of ways to relate entity classes to each other, typically
using one of the following relationship annotations: `@OneToOne`, `@OneToMany`,
`@ManyToOne`, or `@ManyToMany`. Applying these annotations on entity class fields
enables one to join entity classes to each other and thereby obtain access to
related data via the use of accessor methods. Typically when using these
annotations, attributes are used to specify the database columns which are used
to store the keys for the related table. The following extract from an entity
class shows how to relate the `PET` database table to the `PET_OWNER` database
table. To begin, the `PET` table needs a `PET_OWNER` column added to it to hold the
primary key of the corresponding `OWNER_ID` database record.

```java
@JoinColumn(name = "PET_OWNER", referencedColumnName = "OWNER_ID")
    @ManyToOne
    private PetOwner petOwner;
```

In the case of the example database schema, the `OWNER_ID` column is a foreign
key for the `ID` column of the `PET_OWNER` table. There can be more than one `PET`
for a single `PET_OWNER`. In this case, the `@ManyToOne` annotation should be
applied to the petOwner field of the Pet entity class. It is important to note
that one may specify a fetch type with the entity relationship annotations,
which dictates how the data from related tables is retrieved. Fetch type
options are `EAGER` and `LAZY`. The default `FetchType` for each is as follows:
- `@ManyToMany`: `FetchType.LAZY`
- `@ManyToOne`:  `FetchType.EAGER`
- `@OneToMany`:  `FetchType.LAZY`
- `@OneToOne`: `FetchType.EAGER`

By design, Jakarta Persistence enables developers to create polymorphic
associations and polymorphic queries. This provides the ability for entity
classes to contain embedded classes, subclasses, etc., in advanced situations
where beneficial. 

## Generators

As mentioned previously, any database table that maps to an entity class is
required to have a primary key. Generators are a means for allowing entity
classes to automatically generate a primary key field value. In many cases,
databases use sequences to create new keys. Database sequences are
auto-incrementing numbers which are generated by the database for each row of a
database table, and use of sequences is the most efficient way to generate a
primary key in terms of performance. Generators can be developed using one of
the following techniques:
- AUTO: Persistence provider determines how to generate the number
- IDENTITY: Relies upon database to automatically increment with each insertion
- SEQUENCE: Relies upon a database sequence to generate the number
- TABLE: Simulates a sequence using by storing the numeric value in a database table

The following code demonstrates how to configure a generator using a database
sequence:

```java
@Id
    @GeneratedValue(strategy=GenerationType.SEQUENCE,
    generator="pet_owner_s_generator")
    @SequenceGenerator(name="pet_owner_s_generator",sequenceName="pet_owner_s", allocationSize=1)
```

## Entity Manager

An entity manager must be obtained from within an application resource and it
is responsible for executing queries and returning data. Typically the
persistence context contains configuration for a persistence unit. After a
persistence unit has been configured, an entity manager can be injected into a
resource via the `@PersistenceContext` annotation, and as such, it will reference
the configured persistence context. New in Jakarta EE 10, Entity Manager now
implements `java.lang.AutoCloseable` so that it will be automatically closed when
no longer required. The following lines demonstrate how to inject the
persistence context.

```java
@PersistenceContext(unitName = "PetServicePU")
private EntityManager em;
```

After an entity manager has been injected into a resource, it can be called
upon to create, return, update, and delete database records working directly
with the entity classes. There are also a number of other roles that an
`EntityManager` may play within the context of persistence, including locking and
concurrency for transactions, the ability to perform listening and provide
callbacks, and entity graphs, to name a few. The following sections outline

## Metamodel API

Jakarta Persistence specifies an API that can be used to obtain metadata
regarding entities that are managed by a persistence unit. For each entity
class that belongs to a particular package, a metamodel class is automatically
created by Jakarta Persistence which has the same name as the entity class
along with a trailing underscore. The metamodel class contains attributes that
correspond to the fields of the entity class. The metamodel class for `PetOwner`
is named `PetOwner_`, and the following code is contained within the class.

```java
@Static Metamodel(PetOwner.class)
public class PetOwner_ {
  
  public static volatile SingularAttribute<PetOwner, Long> id;
  public static volatile SingularAttribute<PetOwner, String> firstName;
  public static volatile SingularAttribute<PetOwner, String> lastName;
}
```

The metamodel class and attributes play an important role when using the
Criteria API to build queries and obtain data from the entity class. The
section on Criteria API will provide more information about using the metamodel
API.

how to perform basic operations with an Entity Manager.

## Creating Database Records

As entity classes map to database tables, they can be used to create new
records. Creating a record is as easy as instantiating a new entity class,
populating it with data, and persisting it by calling upon the entity manager
`create()` method and passing the new object.

## Writing Queries

Jakarta Persistence enables the ability to retrieve data from entity classes.
The basic semantics of a query consist of the `SELECT` clause, the `FROM` clause,
and an optional `WHERE` clause. Jakarta Persistence offers a few different ways
to construct queries, those being: Jakarta Persistence Query Language, Criteria
API, and Named Queries. Using Jakarta Persistence Query Language, one can
develop SQL-like queries to obtain data from the database through the use of
entity classes. The Criteria Query API enables developers to use a
CriteriaBuilder to construct queries, compound selections, expressions,
predicates, and orderings. Lastly, Named Queries allow one to associate a
static Jakarta Persistence Query Language queries to a name, and then call upon
those names using an entity manager to execute.

### Jakarta Persistence Query Language

Jakarta Persistence Query Language (JPQL) is one of the most commonly used
techniques for performing queries on entity classes. Using JPQL syntax, a
query can be coded to extract the required data from one or more entity
classes, and it can then be stored within a corresponding entity class or a
collection of entity classes. Queries are constructed by formulation of a
string using the JPQL syntax to query the object(s) from entity classes, as
follows:

```java
String query = "select object(o) from PetOwner o";
```

The query above will retrieve all `PetOwner` entities, which means that it will
return all records within the `PET_OWNER` database table. Note that the query is
written to return an object(o), which is an object of the `PetOwner` entity. In
this case, `PetOwner` is also referred to as "o", as the "o" is listed directly
after the entity class name as an alias. Within Jakarta Persistence,
everything is based upon Java objects. The "from" clause tells the entity
manager from which entity class the object(s) should be retrieved. 

To execute the query, pass it to the Entity Manager `getQuery()` method and then
call upon `getResultSet()` to return the collection of `PetOwner` entities. If
only one record will be returned by the query, then call upon
`getSingleResult()`:

```java
List<PetOwner> petOwnerList = em.createQuery(query).getResultList();
```

In JPQL, the `WHERE` clause specifies which objects to retrieve from the entity
by providing conditions to filter the result set. One such type of condition
is to specify that an object field is equal to, less than, or greater than some
value. Values specified within a JPQL query can be dynamic via the use of
parameters. In order to pass named parameters to a JPQL query, use a bind
variable in the and then call upon the `setParameter()` method when invoking the
query, passing the bind variable name and the value. It is also possible to
utilize positional numbers, rather than bind variables, which utilize a numeric
position within the query to substitute for the parameter value. In the
following example, the `:lastName` bind variable will be used to substitute the
value passed into the query using `setParameter()`.

```java
Long countOfOwners = (Long) 
     em.createQuery("select count(o) from PetOwner o" +
                   "where o.lastName = :lastName")
       .setParameter("lastName", "JONES")
       .getSingleResult();
```

A large number of expressions can be provided within the `WHERE` clause so that
the result set can be fine tuned. As with standard SQL, it is also possible to
order or group the results of the query by specifying a `GROUP BY`, `HAVING` or an
`ORDER BY` clause.

After obtaining the data within the collection, it can be traversed and the
data can be utilized. It is also possible to retrieve only selected fields
from an entity using JPQL, and there are a variety of functions available for
use. For instance, to return the count of records within an entity, the
`count()` function can be used as follows:

```java
Long countOfOwners = (Long) 
     em.createQuery("select count(o) from PetOwner o")        
        .getSingleResult();
```

One can also use native SQL to construct a query in situations where JPQL will
not accommodate the required query by calling upon createNativeSql() and
passing a String-based SQL query. Jakarta EE 10 introduces a number of new
functions that can be used with JPQL: CEILING, EXP, EXTRACT, FLOOR, LOCAL DATA,
LOCAL DATETIME, LOCAL TIME, LN, POWER, ROUND, and SIGN.

### Criteria Query API

The Criteria API enables one to develop queries through the use of object based
query definition objects, rather than the use of strings. Through the use of
an object graph, it is possible to construct queries in a strongly typed manner
which provide results similar to those that can be achieved using JPQL.

The overall sequence for creating and executing a query using the Criteria API
is as follows:

1. Obtain a `CriteriaBuilder` from the `EntityManager` by calling
   `getCriteriaBuilder()`
2. Create a `CriteriaQuery` instance by invoking one of the CriteriaBuilder
   `createQuery()` methods and passing the entity class for the desired
   `CriteriaQuery`
3. Create the `CriteriaQuery` root by calling the `from()` method of the
   `CriteriaQuery` instance, and passing the entity class for the desired root
4. Specify the type that the query will return by calling upon the `select()`
   method of the `CriteriaQuery` instance
5. Create a `TypedQuery<T>` instance to prepare the query for execution, and
   specify the type of the query result
6. Call the `getResultList()` method on the `TypedQuery` instance to execute the
   query and obtain the results

The process to obtain all objects from the `PetOwner` entity class is as follows:

```java
CriteriaBuilder cb = em.getCriteriaBuilder();
CriteriaQuery<Pet> cq = cb.createQuery(PetOwner.class);
Root<PetOwner> petOwner = cq.from(PetOwner.class);
cq.select(PetOwner);
TypedQuery<PetOwner> tq = em.createQuery(cq);
List<PetOwner> allOwners = q.getResultList();
```

To obtain a selection of attributes from an object, the metamodel API can be
used to specify the desired attributes by name. The following code
demonstrates how to obtain the lastName attribute of a `PetOwner` object:

```java
Root<PetOwner> petOwner = cq.from(PetOwner.class);
cq.select(petOwner.get(PetOwner_.lastName));
```

The `where()` method of the `CriteriaQuery` can be used to apply conditions
that will filter the query results, much like those provided in JPQL. Again,
the individual attributes can be applied to expressions using the metamodel
API. The Criteria Query API also provides a number of conditional methods to
use along with expressions: `equal`, `notEqual`, `lt`, `le`, `gt`, `ge`, `eq`,
`between`, and `like`. The following code demonstrates how to obtain all
`PetOwner` objects where `lastName` is not equal to `'SMITH'`:

```java
cq.where(cb.notEqual(petOwner.get(PetOwner_.lastName), "SMITH"));
```

There are a myriad of other functionalities available with the Criteria Query
API. Those include grouping, order by, and the ability to apply functions.
The following functions are new in Jakarta EE 10: `ceiling()`, `exp()`, `floor()`,
`localDate()`, `localDateTime()`, `localTime()`, `ln()`, `power()`, `round()`, and `sign()`.
Also is the ability to use expressions as conditions within Criteria CASE
expressions, new with Jakarta EE 10.

### Named Queries

Named Queries provide a way to create a statically typed query using JPQL and
assign it to a name. The name can then be specified to invoke the query.
Named queries can be specified within an entity class using the `@NamedQueries`
annotation. The `@NamedQueries` annotation contains a grouping of `@NamedQuery`
annotations, which allow a name to be assigned to a string-based JPQL query.
The `@NamedNativeQuery` annotation provides the ability to specify native SQL
within a named query. The following code shows how to create a named query for
the `PetOwner` entity class:

```java
@NamedQueries({
    @NamedQuery(name = "PetOwner.findAll", query = "SELECT o FROM PetOwner o"),
    @NamedQuery(name = "PetOwner.findByLast", query = "SELECT o FROM PetOwner o where o.lastName = :lastName")
)}
```

The entity manager can also be used to create a named query by calling upon its
`createNamedQuery()` method and passing a string based JPQL query to it. The
named query can be executed by the Entity Manager, as shown in the following
code:

```java
List<PetOwner> owners =
em.getResultSet("PetOwner.findByLast").setParameter("lastName","JONES");
```

## Sql Result Set Mappings

Oftentimes, queries need to return distinct fields, rather than entire objects.
When the fields being returned from a query do not correspond to the object
relational mapping metadata, a `SqlResultSetMapping` must be used. This solution
enables explicit field mapping to be provided to enable the persistence
provider to map the results correctly. A brief example would be if one wishes
to create a native query to obtain all pet names along with the pet type. This
query will involve a join and it will return fields that are part of more than
one entity.

```java
Query qry = em.createNativeQuery("select p.name, t.type " +
    "from PET p, PET_TYPE t " +
    "where t.id = p.type_id");

@SqlResultSetMapping(name="PetTypeResults", entities={
      @EntityResult(entityClass=org.eclipse.entity.Pet.class, fields={
          @FieldResult(name="name", column="name")
         }),
      @EntityResult(entityClass=org.eclipse.entity.PetType.class, fields={
          @FieldResult(name="petType", column="pet_type")
         })
  })
```

## Performing Updates and Deletes

Entity managers make it easy to perform updates on an entity. To modify an
entity, simply set the new values using the entity class accessor methods and
then pass the updated entity to the entity manager `merge()` method. For
instance, to modify the name of a Pet, set the new name and then pass the
updated entity to `merge()` as follows:

```java
myPet.setName("Rover");
em.merge(myPet);
```

To remove an entity (record from a database), pass the entity to the entity
manager `remove()` method. 

```java
em.remove(myPet);
```

Note, when performing updates and deletes on an entity, it is typically a good
idea to perform the update within the scope of a transaction.

## Generating Database Schemas

Jakarta Persistence provides the capability to generate database schema objects
when an application is deployed. It can also be configured to load data into
the objects and remove the schema objects once the application is destroyed.
This may be useful if an application is being used for a demo and the database
should be recreated with each new deployment to the container. To specify
these schema creation, loading, and removal configurations, provide properties
to the persistence context XML configuration within the persistence.xml. The
following properties can be embedded inside of the <persistence-unit> element
to configure these generation settings: 

- `jakarta.persistence.schema-generation.database.action`
  - Values: drop-and-create
- `jakarta.persistence.schema-generation.create-source`
  - Value: script
- `jakarta.persistence.schema-generation.create-script-source`
  - Value: <path to script>
- `jakarta.persistence.sql-load-script-source`
  - Value: <path to script>
- `jakarta.persistence.schema-generation.drop-source`
  - Value: script
- `jakarta.persistence.schema-generation.drop-script-source`
  - Value: <path to script>

## Stored Procedures

A stored procedure is a code construct that is stored within a relational
database. When invoked, the stored procedure will execute and can optionally
return an outcome. Jakarta Persistence provides the `StoredProcedureQuery`
interface to enable the invocation of database stored procedures. The
`StoredProcedureQuery` interface is an extension of the `Query` interface. To
invoke a stored procedure, the `@NamedStoredProcedureQuery` annotation can be
used to specify the procedure, its parameters, and result type. 

The steps to register a stored procedure with the persistence provider are as
follows:

1. Call upon the entity manager `createStoredProcedureQuery()` method, passing
   the name of the stored procedure. This will return a `StoredProcedureQuery`
   object.
2. Register stored procedure parameters, if needed, by calling upon the
   `StoredProcedureQuery` `registerStoredProcedureParameter()` method and name,
   data type, and `ParameterMode` (IN/OUT).
3. Execute the stored procedure by calling upon the `StoredProcedureQuery`
   `execute()` method.
4. Optionally retrieve the result by calling upon the `StoredProcedureQuery`
   `getOutputParameterValue()` method and passing the parameter name.

## Conclusion

Jakarta Persistence contains a vast amount of functionality, and this
explanation document hardly scratches the surface. However, the use of Jakarta
Persistence can also be quite simplistic, depending upon the requirements of
the application. Every application using Jakarta Persistence requires a
persistence context, and an entity manager is used to facilitate the
interactions with the underlying database. There are a number of options for
developing queries using Java object mapping. Jakarta Persistence also enables
creation, update, and removal of entities, amongst a number of other options.
