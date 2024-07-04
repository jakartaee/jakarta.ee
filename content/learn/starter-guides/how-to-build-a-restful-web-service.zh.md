---
title: 如何使用Jakarta EE构建RESTful Web服务
date: 2023-09-22
headline: 如何使用Jakarta EE构建RESTful Web服务
description: >-
  本指南向您展示如何使用Jakarta EE创建一个RESTful web服务。
hide_page_title: true
weight: 1
categories: ["Starter Guides"]
---

这篇博文将向您介绍如何使用 Jakarta EE创建一个 [RESTful web service](https://jakarta.ee/specifications/restful-ws/) 应用程序.

使用 [Jakarta EE](/), 创建的一个RESTful web 服务样例程序的需求如下:

- 我们将创建一个服务，该服务在 <span>http://localhost:8080/restfulservice/hello</span> 接收一个HTTP GET{{< sup href="#footnote-1" >}}1{{</ sup >}}请求。

- 这个服务将返回请求一个带有JSON格式数据的响应，其内容如下：

```json
{"text": "Hello from Jakarta EE"}
```

- 后续可以根据我们的需要进行定制和改进。

OK，已经明确了需求，您可以按照以下步骤开始编程。

## 建立开发环境

- 安装Java开发工具包(JDK). 要确定是 Java SE 8 或者 更高版本 (本例使用Java SE 8进行开发,使用 Java SE 11 and Java SE 17进行测试). 您可以从[Adoptium](https://adoptium.net/en-GB) 选择需要的JDK版本。
- 安装支持Jakarta EE规范的应用服务器。可以从Jakarta EE官网下载兼容的[产品](/zh/compatibility/download/).
- 安装 [Maven](https://maven.apache.org/) 3 或更高版本

您可以使用[SDKMan](https://sdkman.io/) 安装以上所列的程序，可以按照[指南](https://sdkman.io/install) 的内容了解安装的操作步骤。

## 如何创建一个RESTful Web 服务 工程

    您可以使用Jakarta EE的Eclipse Starter完成工程创建，您也可以使用IDE，或者使用熟悉的 [Maven archetypes](https://maven.apache.org/guides/introduction/introduction-to-archetypes.html)选择一个ESTful的工程完成创建工作。

## 使用Jakarta EE的Eclipse Starter建立一个新的工程

按照以下步骤，使用Jakarta EE的Eclipse Starter完成工程创建：

1. 在导航中选择start.jakarta.ee.建立应用的所有基本依赖。Starter的当前版本仅支持Maven. 不久后将支持Gradle。
   
   {{< figure class="padding-20 margin-top-40 margin-bottom-40 img-thumbnail" src="/learn/starter-guides/images/generate-project.jpg" alt="A screenshot of the Generate a Jakarta EE Project form with fields filled out. More details on how to go through the form below." >}}

2. 从选项中选择Jakarta EE的版本，目前该选项包括Jakarta EE 8, Jakarta 9.1, and Jakarta 10等3个版本可选。 您可以从平台中选择Jakarta EE Profile（Core、  Web）。 通常默认选项就好。

3. 填写该工程的组织名称（Group），项目名称（Artifact）以及项目版本号（ Version）。

4. 完成以上工作后，拷贝下面的命令到命令行终端中执行，注意：-DgroupId的值改为您上面工程填写的Group名称，-DartifactId的值改为您上面Artifact填写的名称，-Dversion改为您上面Version填写的名称。

```
mvn archetype:generate -DarchetypeGroupId=org.eclipse.starter -DarchetypeArtifactId=jakartaee10-minimal -DarchetypeVersion=1.1.0 -DgroupId=org.eclipse.rest -DartifactId=rest-service -Dprofile=web-api -Dversion=1.0.0-SNAPSHOT -DinteractiveMode=false
```

这个命令将创建工程结构和代码样例。

## 查看一下代码结构

打开刚生成的代码目录，我们将看到如下代码目录结构：

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

在这些生成的代码文件中，我们对两个类文件尤其关注： `RestResource.java` 和`HelloRecord.java`.

我们首先打开 `RestResource.java`文件。

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

这里定义了一个RESTful web服务，当一个 `GET` 请求到 `"/hello"`访问点时，将会得到这个类的处理响应，客户端会得到一个 JSON 格式的返回数据。

 注解`jakarta.ws.rs.Path` 表示：该 Java 类会被绑定到对应值的URI请求地址。  

注解`jakarta.ws.rs.GET` 表示：只有请求以 `HTTP GET` 方法访问，才能被该类处理。

注解`jakarta.ws.rs.Produces` 表示：允许您指定请求应答的格式。在这个例子中，通过转换 `HelloRecord`对象生成一个 JSON[2](https://jakarta.ee/learn/starter-guides/how-to-build-a-restful-web-service/#footnote-2) 数据。

 `hello()` 方法返回一个 `HelloRecord`对象，这是Java 16新提供的类（[record class](https://openjdk.org/jeps/395) ）。

```java
package org.eclipse.restfulservice.resources;

public record HelloRecord(String text) {
}
```

如果您使用了低版本的java，您可以把它转换成传统的POJO{{< sup href="#footnote-3">}}3{{</ sup >}}对象。

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

## 从CLI运行工程

以上创建的工程中并没有包含运行时容器，这样做的目的是方便您选择合适的Jakarta EE兼容的运行时容器，清单详见 [这里](/compatibility/download/)。

这里我们选择WildFly。

因此，我们在 `pom.xml` 文件中增加一个plugin。在 `pom.xml`文件的plugin区域中增加以下内容

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

 `wildfly-maven-plugin` 是用来部署、重新部署、反部署或者运行 Jakarta EE 应用的Wildfly插件。这个plugin的完整配置可以查看这里: [WildFly Maven Plugin – Introduction](https://docs.jboss.org/wildfly/plugins/maven/latest/index.html)。

有很多配置本地WildFly实例的样例，部分配置的样例请查看这里: [WildFly Maven Plugin – Run Example](https://docs.jboss.org/wildfly/plugins/maven/latest/examples/run-example.html).

我们可以通过 `wildfly:run` CLI 命令来运行应用，在命令窗口中输入如下命令:

```shell
mvn clean package wildfly:run
```

这个命令将编译应用并部署到Wildfly，如果 Wildfly 没安装，它将会下载并运行Wildfly，之后部署打包的应用war文件.

一旦应用运行起来，我们在终端上将看到以下输出:

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
03:35:02,323 INFO [org.jboss.resteasy.resteasy_jaxrs.i18n] (ServerService Thread Pool -- 32) RESTEASY002225: Deploying jakarta.ws.rs.core.Application: class org.eclipse.restfulservice.ApplicationConfig
03:35:02,346 INFO [org.wildfly.extension.undertow] (ServerService Thread Pool -- 32) WFLYUT0021: Registered web context: '/restfulservice' for server 'default-server'
03:35:02,365 INFO [org.jboss.as.server] (management-handler-thread - 1) WFLYSRV0010: Deployed "restfulservice.war" (runtime-name : "restfulservice.war")
```

## 让我们测试这个服务

现在服务已经运行了，我们访问 <http://localhost:8080/restfulservice/hello>.\
它将返回以下内容:

```json
{ "text": "Hello from Jakarta EE" }
```

也可以通过命令行测试，我们可以在命令行使用 curl:

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

这里，我们回顾一下URL的结构。

```
http://<hostname>:<port>/<context-root>/<REST-config>/<resource-config>
```

**Hostname**: 安装WildFly 的服务器机器名称。

**Port:** WildFly 服务器启动的接收HTTP请求的端口。 这个端口缺省为 8080 , 但这是可以配置的。

**Context-root:** 部署应用的根路径，默认是部署的WAR文件的文件名（不包括扩展名）。当文件部署完成后，这个值可以修改。

**REST-config:** 该值对应工程中 `@ApplicationPath` 注解，缺省为空，表示为 / 。我们可以在 `ApplicationConfig` 类中进行简单配置。

**Resource-config:** 该值是Java类中的 `@Path` 注解的值。这个例子中是 `"/hello"`.

如果我们想改变 `REST-config` ,比如 改为`"/api"`, 我们可以参照以下例子在 `@ApplicationPath` 注解中进行修改:

```java
import jakarta.ws.rs.ApplicationPath;
import jakarta.ws.rs.core.Application;

@ApplicationPath("/api")
public class ApplicationConfig extends Application {    
}
```

完成如上修改后，需要重新运行应用，通过以下curl命令进行访问:

```shell
curl -v http://localhost:8080/restfulservice/api/hello
```

## 结论

恭喜! 您已经学会了如何使用Jakarta EE开发一个 RESTful web 服务。

---

{{< grid/div class="footnote" isMarkdown="false" >}}
  <ol>
    <li id="footnote-1">
      HTTP GET 是一种HTTP请求方法，它请求指定资源的表现形式。其一般形式为：GET /path/to/resource HTTP/1.1
    </li>
    <li id="footnote-2">
      JSON - 它代表 JavaScript Object Notation（JavaScript对象表示法）。JSON 是一种用于存储和传输数据的文本格式。
   </li>
    <li id="footnote-3">
      POJO - <a href="https://en.wikipedia.org/wiki/Plain_old_Java_object">简单Java对象（译注：即普通JavaBeans，是为了避免和EJB混淆所创造的简称）</a>
    </li>
  </ol>
{{</ grid/div >}}
