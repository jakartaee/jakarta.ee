---
title: 如何使用Jakarta EE的Jakarta Persistence存储和检索数据 
date: 2023-09-22
headline: 如何使用Jakarta Persistence存储和检索数据
description: >-
  本指南向您展示如何使用Jakarta Persistence来存储和检索数据。
hide_page_title: true
weight: 2
categories: ["Starter Guides"]
---

本指南向您展示如何使用[Jakarta Persistence](/specifications/persistence/)来存储和检索数据。

我们首先将简要介绍下我们想要构建的系统。接下来，我们将构建一个能够进行数据处理的RESTful web服务，使用Jakarta Persistence将其存储在数据库中，并作为REST端点提供服务。
对于不熟悉RESTful web服务的人，建议阅读我们的[之前的文章](../how-to-build-a-restful-web-service/)。

我们将构建一个处理咖啡产品数据的应用程序。该服务将处理一条JSON数据（包含产品ID、名称和价格）。以下是JSON数据的示例：

```json
{
  "id": 1,
  "name": "Coffee-A",
  "price": "2.75"
}
```

应用程序将存储数据，并提供一些REST端点，用来进行基本的CRUD（增/删/改/查）操作。然后，我们可以根据需要对其进一步定制和改进。

好的，现在我们已经明确了我们的要求，您需要按照以下步骤操作：

## 设置您的开发环境：

- 安装Java开发工具包（JDK）。请确保您安装了Java SE 11或更高版本（Java SE 11和Java SE 17我们都测试过）。您可以选择任何供应商的发行版，也可以从[Adoptium](https://adoptium.net/)获取。
- 安装支持Jakarta EE的应用服务器。下载任何[Jakarta EE兼容的产品](/compatibility/download/)。
- 安装[Maven](https://maven.apache.org/) 3或更高版本。

要安装JDK和Maven，我们可以使用[SDKMan](https://sdkman.io/)。我们可以按照[安装指南](https://sdkman.io/install)中提到的步骤进行操作。

## 如何完成本指南

在这个入门指南中，您可能会使用Eclipse Starter for Jakarta EE完成每个步骤，也可以跳过您已经知道的基础设置。您也可以从IDE开始，或从知名的[Maven原型](https://maven.apache.org/guides/introduction/introduction-to-archetypes.html)中选择项目结构。

## 使用Eclipse Starter for Jakarta EE创建一个新项目

要使用Eclipse Starter for Jakarta EE，我们需要执行以下步骤：

1. 导航至[https://start.jakarta.ee](https://start.jakarta.ee)。此服务将为应用程序设置所有必要的依赖项。当前版本的Starter仅支持Maven。将来，我们可能能够在Gradle和Maven之间进行选择。
   {{< figure class="padding-20 margin-top-40 margin-bottom-40" src="/learn/starter-guides/images/generate-project-detailed.jpg" alt="Eclipse Starter for Jakarta EE表单的截图，相关选项已选定" >}}
2. 从可用选项中选择所需的Jakarta EE版本。目前，选项包括Jakarta EE 8、Jakarta EE 9.1和Jakarta EE 10。
   此外，您可以选择Jakarta EE Platform或Jakarta EE的Profile版本（Web、Core等）。
3. 对于此项目，我们选择了Jakarta EE 10 Platform、Java SE 11和[WildFly](https://www.wildfly.org/)作为运行时。
4. 选择了所需的选项后，点击生成按钮，将生成项目结构和示例代码，我们可以用以构建并运行。

## 探索代码结构

解压缩生成的代码，将得到一个应用程序的结构。可以在自己喜欢的IDE中打开，然后可以从命令行运行。

```
.
├── README.md
├── mvnw
├── mvnw.cmd
├── pom.xml
└── src
    └── main
        ├── java
        │   └── org
        │       └── eclipse
        │           └── jakarta
        │               └── hello
        │                   ├── Hello.java
        │                   └── HelloWorldResource.java
        └── webapp
            ├── WEB-INF
            │   └── web.xml
            ├── images
            │   └── jakartaee_logo.jpg
            └── index.html
```

生成的源码附带了一个嵌入式的Maven wrapper。因此，如果需要再在Unix环境（Linux或Mac）中使用 Maven wrapper，需要首先确保运行以下命令：

```bash
$ chmod +x mvnw
```

由于我们使用 WildFly 作为运行时环境，以下命令将运行应用程序：

```bash
$ ./mvnw clean package wildfly:run
```

另一方面，如果您安装了Maven，可以运行以下命令：

```bash
$ mvn clean package wildfly:run
```

对于Windows，不需要运行`chmod`命令；而是使用`mvnw.cmd`代替`mvnw`。

现在，如果您使用以下URL在浏览器中访问，将看到结果。

[http://localhost:8080/jakartaee-hello-world](http://localhost:8080/jakartaee-hello-world)

我们已经在之前的文章中介绍了如何测试，不再赘述。

## 设置Jakarta Persistence

鉴于我们的目标是学习使用Jakarta Persistence，让我们首先了解Jakarta Persistence本质上是什么。Java Persistence API是一种Java编程语言规范，它提供了一个对象关系映射（ORM）框架，用于管理Java应用程序中的关联数据。它简化了数据库访问，并使开发人员能够使用对象和类而不是SQL语句。它曾被称为Java Persistence API，简称JPA。

接下来，我们通过定义我们的第一个实体（@Entity）开始相关探索。实体（@Entity）是一个Java类，它与数据库中的一个表对应。本文将使用嵌入式H2数据库来存储我们的数据。

在`org.eclipse.jakarta.model.entity`包中创建一个Coffee类。

```java
package org.eclipse.jakarta.model.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import java.io.Serializable;

@Entity
public class Coffee implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String price;

    //getter和setter
}
```

正如您所看到的，我们的实体类包含几个注解。`@Entity`注解将一个Java类指定为实体类，代表一个数据库表，其中类字段对应于表列。`@Id`注解将实体类中的字段或属性标记为主键。此外，您可以使用`@GeneratedValue`注解与`@Id`来表示主键值应该自动生成。

Jakarta Persistence背后的主要思想是允许Java程序员使用对象。他们可以创建这些实体的实例，Jakarta Persistence将把它们转换成数据并存储在数据库中。当需要一个对象时，Jakarta Persistence检索数据并将其转换为一个易于使用的对象。

## 如何将实体连接到DataSource？

在使用Jakarta Persistence之前，首先需要创建一个名为`persistence.xml`的Jakarta Persistence配置文件，用以配置数据库连接。这个文件可以放在我们项目的`resources/META-INF`文件夹中。

`persistence.xml`文件允许指定JDBC连接设置或Datasource JNDI{{< sup href="#footnote-1" >}}1{{</ sup >}}名称。例如，我们可以在`persistence.xml`中指定使用WildFly默认的[H2数据库](https://www.h2database.com/html/main.html)。

```xml
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<persistence xmlns="https://jakarta.ee/xml/ns/persistence"
             xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
             xsi:schemaLocation="https://jakarta.ee/xml/ns/persistence https://jakarta.ee/xml/ns/persistence/persistence_3_1.xsd"
             version="3.0">
    
    <persistence-unit name="coffees">
        <jta-data-source>java:jboss/datasources/ExampleDS</jta-data-source>
        <properties>
            <property name="jakarta.persistence.schema-generation.database.action" value="drop-and-create" />
            <property name="jakarta.persistence.sql-load-script-source" value="META-INF/initial-data.sql" />
            <property name="eclipselink.logging.level.sql" value="FINE" />
            <property name="eclipselink.logging.parameters" value="true" />
            <property name="hibernate.show_sql" value="true" />
        </properties>
    </persistence-unit>
</persistence>
```

在`resources/META-INF`文件夹中创建一个`persistence.xml`文件，并复制上面的内容。

这个`persistence.xml`文件设置了一个名为"coffees"的持久性单元（persistence unit ）。它指定了用于数据库连接管理的JDBC数据源的JNDI名称，在WildFly中，针对H2数据库，默认设置为"java:jboss/datasources/ExampleDS"。JNDI名称的配置通常位于`WILDFLY_HOME/standalone/configuration`目录中的standalone.xml文件中，其中`WILDFLY_HOME`是WildFly的安装目录。然而，对于这个例子，不需要额外的配置，因为我们使用了默认的JNDI名称。其他运行时环境可能有稍微不同的配置，可以在它们的文档中找到。

`<properties>`元素包含几个属性，用以配置Jakarta Persistence提供者（provider）行为。例如，`persistence.xml`文件中的"jakarta.persistence.schema-generation.database.action"属性指定Jakarta Persistence提供者在生成数据库结构（schema） 时要采取的操作。其他的选项包括：

- `none`：Jakarta Persistence提供者不会生成数据库结构。
- `create`：Jakarta Persistence提供者将创建数据库结构。
- `drop`：Jakarta Persistence提供者将删除数据库结构。
- `drop-and-create`：Jakarta Persistence提供者将删除现有数据库结构并创建一个新的。

对于这个属性，还有其他可用的选项，如"create-only"、"drop-and-create-script"和"create-script"。选项的选择取决于用例和应用程序的具体要求。在本例中，在`persistence.xml`文件中选择了"drop-and-create"选项，它在开发环境中每次运行应用程序时都会删除现有数据库结构并创建一个新的。

"jakarta.persistence.sql-load-script-source"属性指定在持久性单元初始化时要执行的SQL脚本的位置。在这里，脚本位于`META-INF/initial-data.sql`文件中。因此，创建一个名为`initial-data.sql`的文件，并在其中输入以下SQL语句。

```sql
INSERT INTO coffee (name, price) VALUES ('Coffee-A', 2.75);
INSERT INTO coffee (name, price) VALUES ('Coffee-B', 1.99);
INSERT INTO coffee (name, price) VALUES ('Coffee-C', 3.25);
INSERT INTO coffee (name, price) VALUES ('Coffee-D', 2.99);
```

这个脚本的目的是确保当服务器启动时，数据库中就有一些数据可以用于测试或演示目的。

其他属性用于配置Jakarta Persistence提供者的日志记录，例如"eclipselink.logging.level.sql"和"eclipselink.logging.parameters"。最后，"hibernate.show_sql"属性用于启用Hibernate Jakarta Persistence提供者{{< sup href="#footnote-2" >}}2{{</ sup >}}的SQL查询日志记录。

## 设置Jakarta Persistence仓库

现在我们将创建一个`CafeRepository`类，负责处理`Coffee`实体的增删改查（CRUD）操作。

```java
package org.eclipse.jakarta.model;

import jakarta.ejb.Stateless;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.eclipse.jakarta.model.entity.Coffee;

import java.lang.invoke.MethodHandles;
import java.util.List;
import java.util.Optional;
import java.util.logging.Logger;

@Stateless
public class CafeRepository {
    private static final Logger logger = Logger.getLogger(MethodHandles.lookup().lookupClass().getName());

    @PersistenceContext
    private EntityManager em;

    public Coffee create(Coffee coffee) {
        logger.info("Creating coffee " + coffee.getName());
        em.persist(coffee);

        return coffee;
    }

    public List<Coffee> findAll() {
        logger.info("Getting all coffee");
        return em.createQuery("SELECT c FROM Coffee c", Coffee.class).getResultList();
    }

    public Optional<Coffee> findById(Long id) {
        logger.info("Getting coffee by id " + id);
        return Optional.ofNullable(em.find(Coffee.class, id));
    }

    public void delete(Long id) {
        logger.info("Deleting coffee by id " + id);
        var coffee = findById(id)
            .orElseThrow(() -> new IllegalArgumentException("Invalid coffee Id:" + id));
        em.remove(coffee);
    }

    public Coffee update(Coffee coffee) {
        logger.info("Updating coffee " + coffee.getName());
        return em.merge(coffee);
    }
}
```
该类使用了`@Stateless`注解，使其成为一个[无状态session bean](https://jakarta.ee/specifications/enterprise-beans/4.0/jakarta-enterprise-beans-spec-core-4.0.html#stateless-session-beans)。
无状态session bean是[企业级Jakarta bean](https://jakarta.ee/specifications/enterprise-beans/4.0/)（EJB）的一种，用于在Jakarta EE应用程序中实现业务逻辑。
无状态session bean被设计用于不需要在方法调用之间与客户端保持任何对话状态的场景。换句话说，无状态session bean不会记住任何客户端特定的数据。

让我们一步一步地分解：

### EntityManager：

[`EntityManager`](https://jakarta.ee/specifications/persistence/3.0/jakarta-persistence-spec-3.0.html#a1062)是Jakarta Persistence中用于管理实体的主要接口。它使用[`@PersistenceContext`](https://jakarta.ee/specifications/persistence/3.0/apidocs/jakarta.persistence/jakarta/persistence/persistencecontext)注解，这将自动将`EntityManager`的实例注入到类中。

### create()：

此方法以`Coffee`对象为参数，记录一条信息性（informational）消息，并使用EntityManager持久化对象。返回已持久化的`Coffee`对象。

### findAll()：

此方法从数据库中检索所有`Coffee`实体。它创建一个Jakarta Persistence查询，执行后，会返回`Coffee`对象的列表。

### findById()：

此方法以长整型ID为参数，记录一条信息性消息，并使用EntityManager搜索指定ID的`Coffee`实体。如果找到，它返回一个包含实体的`Optional<Coffee>`；否则，返回一个空的`Optional`。

### delete()：

此方法以长整型ID为参数，记录一条信息性消息，并尝试查找指定ID的`Coffee`实体。如果找到，它使用EntityManager移除实体。如果未找到实体，则抛出一个带有无效ID消息的`IllegalArgumentException`。

### update()：

此方法以`Coffee`对象为参数，记录一条信息性消息，并使用EntityManager更新数据库中现有的`Coffee`实体。返回更新后的`Coffee`对象。

## 为CRUD方法添加REST端点

最后，我们将添加一个REST端点，以便能够从远程REST客户端访问我们的`Coffee`服务。

```java
package org.eclipse.jakarta.rest;

import jakarta.inject.Inject;
import jakarta.persistence.PersistenceException;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.Response;
import org.eclipse.jakarta.model.CafeRepository;
import org.eclipse.jakarta.model.entity.Coffee;

import java.lang.invoke.MethodHandles;
import java.util.List;
import java.util.logging.Logger;

@Path("coffees")
public class CafeResource {
    private final Logger logger = Logger.getLogger(MethodHandles.lookup().lookupClass().getName());

    @Inject
    private CafeRepository cafeRepository;

    @GET
    @Path("{id}")
    @Produces("application/json")
    public Coffee findCoffee(@PathParam("id") Long id) {
        logger.info("Getting coffee by id " + id);
        return cafeRepository.findById(id)
            .orElseThrow(() -> new WebApplicationException(Response.Status.NOT_FOUND));
    }

    @GET
    @Produces("application/json")
    public List<Coffee> findAll() {
        logger.info("Getting all coffee");
        return cafeRepository.findAll();
    }

    @POST
    @Consumes("application/json")
    @Produces("application/json")
    public Coffee create(Coffee coffee) {
        logger.info("Creating coffee " + coffee.getName());
        try {
            return cafeRepository.create(coffee);
        } catch (PersistenceException ex) {
            logger.info("Error creating coffee " + coffee.getName());
            throw new WebApplicationException(Response.Status.BAD_REQUEST);
        }
    }

    @DELETE
    @Path("{id}")
    public void delete(@PathParam("id") Long id) {
        logger.info("Deleting coffee by id " + id);
        try {
            cafeRepository.delete(id);
        } catch (IllegalArgumentException e) {
            logger.info("Error deleting coffee by id " + id);
            throw new WebApplicationException(Response.Status.NOT_FOUND);
        }
    }

    @PUT
    @Consumes("application/json")
    @Produces("application/json")
    public Coffee update(Coffee coffee) {
        logger.info("Updating coffee " + coffee.getName());
        try {
            return cafeRepository.create(coffee);
        } catch (PersistenceException ex) {
            logger.info("Error updating coffee " + coffee.getName());
            throw new WebApplicationException(Response.Status.BAD_REQUEST);
        }
    }
}
```

CafeResource类是一个RESTful web服务，用于使用Jakarta RESTful Web Services管理`Coffee`实体。该类暴露了各种HTTP端点，用于执行CRUD操作，如创建、检索、更新和删除`Coffee`对象。

1. `@Path("coffees")`：此注解将web服务的基础路径设置为`"/coffees"`。此类中的所有HTTP端点都将相对于此路径。
2. `@Inject`：此注解用于注入`CafeRepository`类的实例，该类处理Coffee实体的持久化操作。
3. `@GET`、`@POST`、`@PUT`、`@DELETE`：这些注解定义了类中相应方法的HTTP方法（例如，`findCoffee()`、`findAll()`、`create()`、`delete()`和`update()`）。它们将Java方法映射到HTTP操作。
4. `@Path("{id}")`：此注解与`@GET`和`@DELETE`注解结合使用，以指定通过其ID检索或删除`Coffee`实体的路径参数“id”。
5. `@Produces`和`@Consumes`：这些注解用于定义方法可以（作为响应）生成或（作为输入)消耗的媒体类型（例如，`"application/json"`）。在本例中，方法接受并返回`Coffee`实体的JSON表示（representations）。

该类还使用Logger记录信息性消息，并通过抛出[`WebApplicationException`](https://jakarta.ee/specifications/restful-ws/3.1/apidocs/jakarta.ws.rs/jakarta/ws/rs/webapplicationexception)处理异常，使用适当的HTTP状态码（例如，[`Response.Status.NOT_FOUND`](https://jakarta.ee/specifications/restful-ws/3.1/apidocs/jakarta.ws.rs/jakarta/ws/rs/core/response.status#NOT_FOUND)或[`Response.Status.BAD_REQUEST`](https://jakarta.ee/specifications/restful-ws/3.1/apidocs/jakarta.ws.rs/jakarta/ws/rs/core/response.status#BAD_REQUEST))处理错误。

## 让我们测试一下

在将上述类添加到您的项目后，执行以下命令以构建并运行应用程序：

```bash
$ mvn clean package wildfly:run
```

此命令将清除任何以前的构建，编译和打包应用程序，然后将其部署到WildFly应用服务器。

如果一切设置正确，将可以通过Web浏览器或REST客户端访问应用程序。您可以使用cURL作为命令行REST客户端与服务交互。

以下是使用给定的基础URL和JSON有效载荷在CafeResource类中进行不同CRUD操作的cURL命令：

### 创建新的Coffee实体（HTTP POST）：

```bash
curl -X POST \
 http://localhost:8080/jakartaee-hello-world/rest/coffees \
 -H 'Content-Type: application/json' \
 -d '{\n "id": 1,\n "name": "Coffee-A",\n "price": "2.75"\n}'
```

### 检索所有Coffee实体（HTTP GET）：

```bash
curl -X GET \
 http://localhost:8080/jakartaee-hello-world/rest/coffees \
 -H 'Content-Type: application/json'
```

### 通过ID检索特定的Coffee实体（HTTP GET）：

```bash
curl -X GET \
 http://localhost:8080/jakartaee-hello-world/rest/coffees/{id} \
 -H 'Content-Type: application/json'
```

### 更新现有的Coffee实体（HTTP PUT）：

```bash
curl -X PUT \
 http://localhost:8080/jakartaee-hello-world/rest/coffees \
 -H 'Content-Type: application/json' \
 -d '{\n "id": 1,\n "name": "Coffee-A",\n "price": "2.75"\n}'
```

### 通过ID删除Coffee实体（HTTP DELETE）：

```bash
curl -X DELETE \
 http://localhost:8080/jakartaee-hello-world/rest/coffees/{id} \
 -H 'Content-Type: application/json'
```

使用检索或删除特定`Coffee`实体的cURL命令时，请确保将`{id}`占位符替换为实际的ID值。

## 结语

恭喜您！您刚刚学习了如何使用Jakarta Persistence开发web服务。

---

{{< grid/div class="footnote" isMarkdown="false" >}}
  <ol class="footnote">
    <li id="footnote-1">
      Java命名和目录接口（JNDI）是一种Java API，用于一种目录服务，它允许Java软件客户端通过名称发现和查找数据和对象。
    </li>
    <li id="footnote-2">
      Jakarta Persistence是一种具有多个兼容实现的Java ORM规范，例如EclipseLink 3.0.0和Hibernate ORM 6.0.0.Final。
    </li>
  </ol>
{{</ grid/div >}}
