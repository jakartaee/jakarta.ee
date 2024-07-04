---
title: 使用Jakarta EE对RESTful Web服务进行认证保护
date: 2023-09-29
headline: 使用Jakarta EE对RESTful Web服务进行认证保护
seo_title: 使用Jakarta EE对RESTful Web服务进行认证保护 | Jakarta EE
description: >-
  本指南向您展示如何使用Jakarta Authentication功能对RESTful服务进行访问认证。
tags: ['rest', 'api', 'service', '入门', 'authentication', 'auth', 'security']
hide_page_title: true
weight: 2
categories: ["Starter Guides"]
---

本指南向您展示如何使用[Jakarta Authentication](https://jakarta.ee/specifications/authentication/)对RESTful服务进行访问认证。

在我们深入探讨如何对RESTful Web服务进行认证之前，让我们首先概述一下本篇文章中的使用场景。

我们构建一个RESTful Web 服务，该服务通过<span>http://localhost:8080/jakartaee-hello-world/rest/hello</span>的HTTP GET方法进行访问，正常情况下请求会得到如下响应：

```json
{
  "hello": "world"
}
```

在本文中，我们将重点介绍对这个服务进行访问认证保护，这里只是个简单的样例，实际生产中需要进一步增强逻辑以满足更复杂的需求。

通过一个简单样例，我们可以更好地了解如何使用Jakarta EE对RESTful Web 服务进行认证保护所涉及的基本步骤。如果您对RESTful Web 服务还不了解，请阅读我之前的文章[如何构建RESTful Web服务](../how-to-build-a-restful-web-service)。

## 准备开发环境：

- 安装Java开发工具包（JDK）。请确保您拥有Java SE 11或更高版本（我们已使用Java SE 11和Java SE 17进行了测试）。您可以选择任何您喜欢的供应商发行版，也可以从[Adoptium](https://adoptium.net/)获取。
- 安装支持Jakarta EE的应用程序服务器。您可以下载任何与Jakarta EE兼容的[产品](/compatibility/download/)。
- 安装[Maven](https://maven.apache.org/) 3或更高版本。

我们可以使用[SDKMan](https://sdkman.io/)安装JDK和Maven，可以按照[如何操作](https://sdkman.io/install)指南中提到的步骤进行操作。

## 如何完成本指南

在本入门指南中，您可以使用Jakarta EE的Eclipse Starter，完成每个步骤，或者跳过您已经知道的基本设置阶段。您还可以使用IDE选择熟悉的[Maven原型](https://maven.apache.org/guides/introduction/introduction-to-archetypes.html)进行工程构建。

## 使用Jakarta EE的Eclipse Starter创建新项目

要使用Jakarta EE的Eclipse Starter，我们需要采取以下步骤：

1. 访问https://start.jakarta.ee。该服务将为应用程序设置所有必要的依赖项。当前版本的Starter仅支持Maven。不久会支持Gradle。
   {{< figure class="margin-top-40 margin-bottom-40" src="/learn/starter-guides/images/generate-project-detailed.jpg" alt="来自start.jakarta.ee的表单截图，用于生成Jakarta EE项目。" >}}

2. 从可用选项中选择所需的Jakarta EE版本。目前，选项包括Jakarta EE 8、Jakarta EE 9.1和Jakarta EE 10。此外，您可以选择Jakarta EE Platform或某种Jakarta EE Profile（Web、Core）。

3. 对于此项目，我们选择了Jakarta EE 10 Platform、Java SE 11和[WildFly](https://www.wildfly.org/)作为运行时。

4. 选择了所需的选项后，点击生成按钮。将生成项目结构和示例代码，以便可以构建和运行。

## 让我们查看代码结构

解压生成的代码，会得到一个应用程序的结构。可以在您喜欢的IDE中打开，然后直接用命令行运行。

```txt
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

生成的源代码包含一个嵌入式的Maven Wrapper。如果是Unix环境（Linux或Mac），请首先运行以下命令：

```bash
$ chmod +x mvnw
```

由于我们使用的是WildFly作为运行时，因此以下命令将运行应用程序：

```bash
$ ./mvnw clean package wildfly:run
```

另一方面，如果您已经安装了Maven，可以用以下命令运行：

```bash
$ mvn clean package wildfly:run
```

对于Windows系统，不需要运行`chmod`命令；而是应该使用`mvnw.cmd`来代替`mvnw`。

好了，在浏览器中访问以下URL，您将看到结果。

http://localhost:8080/jakartaee-hello-world

我们在之前的文章中已经介绍过关于测试的内容，此处不再赘述。

## 设置Jakarta认证

保护您的RESTful Web 服务的第一步是对发出请求的用户进行身份验证。在Jakarta EE中，可以通过使用[Jakarta Authentication](/specifications/authentication/)规范来实现。这个规范可以用来设置各种形式的认证认证，包括基本认证、基于表单的认证、摘要认证和基于令牌的认证。

### 认证

下面谈谈基本认证。我们需要在web.xml文件中进行以下配置，对其进行设置：

```xml
<security-constraint>
   <web-resource-collection>
      <web-resource-name>受保护的REST服务</web-resource-name>
      <url-pattern>/rest/*</url-pattern>
   </web-resource-collection>
   <auth-constraint>
      <role-name>user</role-name>
   </auth-constraint>
</security-constraint>

<login-config>
   <auth-method>BASIC</auth-method>
   <realm-name>ApplicationRealm</realm-name>
</login-config>

<security-role>
   <role-name>user</role-name>
</security-role>
```

这为应用程序设置了基本认证，并保护`/rest`路径下的资源。

我们来详细分析一下：

- **安全约束（Security Constraint）：** 这用于定义特定一组网络资源的访问控制规则。
  
  - **网络资源集合（Web Resource Collection）：** `<web-resource-collection>` 标签用于将URL分组，以便配置安全约束。在此配置中，网络资源集合被命名为“受保护的REST服务”，并适用于`/rest`路径下的所有URL，由`<url-pattern>/rest/*</url-pattern>`定义。
  
  - **认证约束（Auth Constraint）：** `<auth-constraint>` 标签用于定义角色，这些角色 被允许访问网络资源集合中定义的URL。在本例中，只有具有`'user'`角色的用户才被允许访问。

- **登录配置（Login Config）：** 这个标签用于定义服务器应使用的认证方法。在本例中，它被设置为BASIC，这意味着将使用HTTP基本认证。`<realm-name>`被设置为`ApplicationRealm`，这是服务器用于认证的领域。

- **安全角色（Security Role）：** 最后，`<security-role>` 标签用于定义可以在Web应用程序中使用的角色。在本例中，定义了“user”角色。请注意，在`<role-name>`标签中使用的名称需要与服务器或应用程序安全设置中定义的角色匹配。

### 授权

认证成功后，下一步是授权。授权是一个过程，用以确定经过认证的实体是否有权访问所需资源或执行特定操作。

Jakarta EE使用基于角色的访问控制（RBAC）进行授权。在RBAC中，访问决策基于系统中各个用户所拥有的角色。实体的角色会与应用程序部署描述符中定义的安全约束进行匹配。

Jakarta EE提供了几个注解来保障应用程序的安全：

- `@RolesAllowed:` 表示哪些安全角色被允许调用指定的方法。
- `@DenyAll:` 拒绝所有安全角色调用指定的方法。
- `@PermitAll:` 接受所有安全角色对指定方法的调用。
- `@RunAs:` 定义执行指定方法的安全身份。

现在，让我们保护我们的RESTful服务，我们只需在`HelloWorldResource`中进行以下更改：

```java
@Path("hello")
public class HelloWorldResource {

   @GET
   @RolesAllowed("user")
   @Produces({ MediaType.APPLICATION_JSON })
   public Hello hello(@QueryParam("name") String name) {
      if ((name == null) || name.trim().isEmpty())  {
         name = "world";
      }

      return new Hello(name);
   }
}
```

在本文中，我们将使用`@RolesAllowed`注解来保护这个服务。

重新运行应用程序，服务将会受到保护。我们试一下。

```bash
$ curl -v http://localhost:8080/jakartaee-hello-world/rest/hello
```

这将产生以下结果：

```txt
* Trying 127.0.0.1:8080...
* Connected to localhost (127.0.0.1) port 8080 (#0)
> GET /jakartaee-hello-world/rest/hello HTTP/1.1
> Host: localhost:8080
> User-Agent: curl/7.87.0
> Accept: */*
>
* Mark bundle as not supporting multiuse
< HTTP/1.1 401 Unauthorized
< Expires: 0
< Connection: keep-alive
< WWW-Authenticate: Basic realm="ApplicationRealm"
< Cache-Control: no-cache, no-store, must-revalidate
< Pragma: no-cache
< Content-Type: text/html;charset=UTF-8
< Content-Length: 71
< Date: Wed, 05 Jul 2023 01:18:44 GMT
<
* Connection #0 to host localhost left intact
<html><head><title>Error</title></head><body>Unauthorized</body></html>
```

正如我们所见，我们的curl命令收到了一个401未授权的响应，因为它缺少请求资源所需的有效认证凭据。

下一步是创建一个凭据，以便我们可以安全地访问这个服务。

## 定义用户

在WildFly中，`application-users.properties`和`application-roles.properties`文件通常位于您的WildFly安装目录下的standalone/configuration文件夹中。由于我们使用的是嵌入式WildFly，要找到这个文件夹，我们需要导航到`target/server/standalone/configuration`文件夹。

`application-users.properties`用于定义用户及其密码（哈希后的），而`application-roles.properties`用于将用户映射到角色。

下面是如何操作的步骤：

1. 导航到WildFly的bin（`/target/server/bin`）文件夹。
2. 使用`add-user.sh`（对于Windows则是`add-user.bat`）脚本来创建一个新用户。

脚本将引导您完成添加新用户的过程：

```bash
$ ./add-user.sh
```

按照提示操作：

```txt
What type of user do you wish to add? 
 a) Management User (mgmt-users.properties) 
 b) Application User (application-users.properties)
(a): b

Enter the details of the new user to add.
Using realm 'ApplicationRealm' as discovered from the existing property files.
Username : your_username
Password : your_password
Re-enter Password : your_password
What roles do you want this user to belong to? (Please enter a comma separated list, or leave blank for none)[  ]: your_role
```

请根据您的实际情况替换`your_username`、`your_password`和`your_role`。在输入角色时，如果您想让用户拥有多个角色，请使用逗号分隔每个角色的名称。如果您不想将用户分配到任何角色，请留空。

这些是在WildFly中定义用户和角色的简单步骤。请重新启动WildFly服务器以确保您的更改生效。

然而，我们需要确认在运行maven时不会清理target文件夹。因为maven的clean命令会完全删除target文件夹，我们创建的用户数据将会丢失。

因此，请在不使用`clean`的情况下运行：

```bash
./mvnw package wildfly:run
```

现在让我们再次运行curl命令：

```bash
curl --user username:password http://localhost:8080/jakartaee-hello-world/rest/hello
```

请将上述命令中的username和password替换为您在`add-user.sh`提示中配置的用户名和密码。

如果用户名和密码正确，我们将得到以下输出。

```json
{
  "hello": "world"
}
```

## 结论

恭喜！您刚刚学习了如何使用[Jakarta Authentication](/specifications/authentication)来对REST 服务进行认证。虽然这是一个重要的起点，但现实的应用程序通常会将用户和角色数据存储在数据库或LDAP服务器中，而不是属性文件中。请注意，安全性是多方面的，包括HTTPS的使用和数据库保护等方面。为了获得全面的了解，建议参考官方的Jakarta EE安全文档，了解其他相关在线资源。
