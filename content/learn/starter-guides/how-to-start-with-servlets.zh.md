---
title: "从使用 Jakarta EE 10 构建 Servlets开始"
date: 2023-09-22
headline: "开始使用 Jakarta EE 10 构建 Servlets开始"
description: >-
  本指南旨在带您了解使用 Jakarta Servlet 构建一个简单的 Servlet 应用程序的过程。
keywords: ['servlet', '教程', '指南', '应用程序', 'wildfly']
hide_page_title: true
categories: ["Starter Guides"]
---

本指南旨在带您了解使用 [Jakarta Servlet](/specifications/servlet/6.0/) 构建一个简单的 Servlet 应用程序的过程。我们将首先概述我们的目标，然后逐步引导您设置环境、编写代码和部署 Servlet 应用程序。如果您是 Servlets 或 Jakarta EE 的新手，本指南应该是一个很好的起点。

我们将开发一个实现以下功能的应用程序：
- 提供一个表单，要求用户选择他们的咖啡偏好（例如，黑咖啡、拿铁、冷萃）。
- 将这些偏好存储在会话中。
- 动态生成一个“咖啡仪表板”，显示个性化的咖啡推荐。

好的，现在我们已经明确了我们的要求，您需要按照以下步骤操作：

## 设置开发环境：
- 安装 Java 开发工具包（JDK）。请确保您安装了 Java SE 11 或更高版本（我们已使用 Java SE 11 和 Java SE 17 进行测试）。您可以选择任何供应商的发行版，也可以选择 [Adoptium](https://adoptium.net/en-GB)。
- 安装支持 Jakarta EE 的应用服务器。下载任何 [Jakarta EE 兼容的](/compatibility/download/) 产品。
- 安装 [Maven](https://maven.apache.org/) 3 或更高版本  

安装 JDK 和 Maven，我们可以使用 [SDKMan](https://sdkman.io/)。我们可以按照 [如何操作](https://sdkman.io/install) 指南中提到的步骤进行。

## 如何完成本指南

在这个入门指南中，您可以使用 Eclipse Starter for Jakarta EE，完成每个步骤，或者跳过您已经知道的基础知识阶段。您也可以从 IDE 开始，或从知名的 [Maven 原型](https://maven.apache.org/guides/introduction/introduction-to-archetypes.html) 中选择一个项目结构。

## 使用 Eclipse Starter for Jakarta EE 创建一个新项目

要使用 Eclipse Starter for Jakarta EE，我们需要采取以下步骤：

1. 导航到 [https://start.jakarta.ee](https://start.jakarta.ee.)。此服务将为应用程序设置所有必要的依赖项。当前版本的 Starter 仅支持 Maven。未来，我们可能能够在 Gradle 和 Maven 之间进行选择。
   {{< figure class="margin-top-40 margin-bottom-40" src="/learn/starter-guides/images/generate-project-detailed-se-17.jpg" alt="从 start.jakarta.ee 生成 Jakarta EE 项目的表单的屏幕截图。" >}}
2. 从可用选项中选择所需的 Jakarta EE 版本。目前，选项包括 Jakarta EE 8、Jakarta EE 9.1 和 Jakarta EE 10。
   此外，您可以选择 Jakarta EE Platform 或 某种Jakarta EE Profile（Web、Core）。
3. 对于此项目，我们选择了 Jakarta EE 10 平台、Java SE 17 和 [WildFly](https://www.wildfly.org/) 作为运行时。
4. 选择所需的选项，点击生成按钮，将生成项目结构和示例代码，用以构建并运行。

## 让我们探索代码结构

解压缩生成的代码，我们将拥有一个应用程序的结构，可以在自己喜欢的 IDE 中打开，然后从命令行运行。

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

生成的源代码附带了一个嵌入式 Maven Wrapper。因此，请确保您首先为 Unix 环境（Linux 或 Mac）运行以下命令：

```bash
$ chmod +x mvnw
```

由于我们使用 WildFly 作为运行时，以下命令将运行应用程序：

```bash
$ ./mvnw clean package wildfly:run
```

另一方面，如果您安装了 Maven，可以运行以下命令：

```bash
$ mvn clean package wildfly:run
```

对于 Windows，不需要运行 `chmod` 命令；而是使用 `mvnw.cmd` 代替 `mvnw`。

好了，使用以下 URL 打开浏览器，您将看到结果。
<span>http://localhost:8080/jakartaee-hello-world</span>

我们已经在前一篇文章中介绍了如何测试，此处不再赘述。

## 设置 Jakarta Servlet

当我们的目标是与Jakarta Servlet开启我们的旅程时，让我们首先了解 Jakarta Servlets 的本质。Jakarta Servlets 最初是 Java EE 生态系统的一部分，以前称为 Java Servlets，是 Jakarta EE 平台中的一组 API，使服务器端 Java 应用程序能够处理 HTTP 请求和响应。与直接处理低级套接字编程的传统方法不同，Jakarta Servlets 提供了一种高级的、基于组件的方法来构建 web 应用程序。这使得开发人员更容易专注于业务逻辑，因为 Jakarta Servlet API 负责处理底层协议和生命周期管理。

[HttpServlet](/specifications/servlet/6.0/apidocs/jakarta.servlet/jakarta/servlet/http/httpservlet)
接口在 Jakarta Servlet API 中起着关键作用，是用以创建特定于 HTTP（HTTP-specific）  servlet的基石 。它是一个抽象类，扩展了
[GenericServlet](/specifications/servlet/6.0/apidocs/jakarta.servlet/jakarta/servlet/genericservlet)
类，并提供了像 `doGet()`、`doPost()`、`doPut()` 等方法来处理各种类型的 HTTP 请求。当您创建自定义 servlet 时，通常扩展 `HttpServlet` 类并覆盖这些方法，用以定义您的 servlet 的行为，这些行为之于每个 HTTP 请求方法会有所不同。

创建自己的 servlet 涉及几个简单的步骤。首先，创建一个扩展 `HttpServlet` 的新 Java 类。然后，覆盖您希望 servlet 处理的 HTTP 方法——通常是 `doGet()` 用于处理 GET 请求和 `doPost()` 用于 POST 请求。例如，要创建一个简单的 servlet，对于 GET 请求返回“Hello, World!”消息，您将扩展 `HttpServlet` 并像这样覆盖 `doGet()` 方法：

```java
import jakarta.servlet.*;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.*;
import java.io.IOException;
import java.io.PrintWriter;

@WebServlet("/hello")
public class HelloWorldServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        PrintWriter out = resp.getWriter();
        out.println("Hello, World!");
    }
}
```

[`@WebServlet`](/specifications/servlet/6.0/apidocs/jakarta.servlet/jakarta/servlet/annotation/webservlet)
注解是现代 Jakarta Servlets 中的一个关键特性，用于定义 Servlet 类的配置和 URL 映射。当您在类定义上方看到 `@WebServlet("/hello")` 时，它表示这个特定的 Servlet 将响应针对应用程序上下文根中的 `/hello` 路径的 HTTP 请求。

现在，如果我们编译并重新运行应用程序，并在浏览器上访问以下 URL，我们将能够看到输出。

http://localhost:8080/jakartaee-hello-world/hello

现在我们已经完成了编写一个简单的 hello world servlet 应用程序，让我们继续尝试一个更复杂的。

## 创建 Coffee Servlets 的步骤

### 1. 创建 Coffee Preferences HTML 表单

首先，创建一个名为 `coffee_preferences.html` 的 HTML 文件，其中包括各种咖啡类型的复选框。将文件放置在 `WEB-INF` 文件夹中。

```html
<!DOCTYPE html>
<html>
  <head>
     <title>咖啡偏好</title>
  </head>
  <body>
    <form action="storePreferences" method="post">
       <p>选择您的咖啡偏好：</p>
       <input type="checkbox" name="coffeeType" value="Black"> 黑咖啡<br>
       <input type="checkbox" name="coffeeType" value="Latte"> 拿铁<br>
       <input type="checkbox" name="coffeeType" value="Cold Brew"> 冷萃<br>

       <input type="submit" value="提交">
    </form>
  </body>
</html>
```

在Jakarta EE 或 Java EE web 应用程序中， `WEB-INF` 作为一个安全的目录，用于存储不应直接由客户端访问的资源。当您将 HTML 文件（或其他 web 资源，如 JSP）放置在 `WEB-INF` 文件夹中时，将无法通过客户端浏览器的直接 URL 请求对其进行访问。这种机制为某些应用程序资源供了额外的安全层，使其仅能通过 Servlet 或其他服务器端组件被访问。

### 2. 创建存储咖啡偏好的 Servlet

现在，让我们创建一个 Servlet，用于提供 `coffee_preferences.html` 并捕获所选的咖啡类型并将它们存储在会话中。

```java
package org.eclipse.jakarta.hello;

import jakarta.servlet.*;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.*;

import java.io.IOException;

@WebServlet("/storePreferences")
public class StorePreferencesServlet extends HttpServlet {

   @Override
   protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
       req.getRequestDispatcher("/WEB-INF/coffee_preferences.html").forward(req, resp);
   }

   @Override
   protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
       String[] coffeeTypes = req.getParameterValues("coffeeType");
       HttpSession session = req.getSession();
       session.setAttribute("userCoffeeTypes", coffeeTypes);

       resp.sendRedirect("coffeeDashboard");
   }
}
```

Jakarta Servlet，`StorePreferencesServlet`，旨在显示和存储用户咖啡偏好。Servlet 通过 `@WebServlet` 注解映射到 `/storePreferences` URL。doGet 方法将请求转发到位于 `/WEB-INF/coffee_preferences.html` 的 HTML 页面，该页面包含用户选择咖啡偏好的表单。另一方面，doPost 方法捕获提交表单中的用户咖啡偏好。这些偏好作为字符串数组存储在 HTTP 会话中的 `userCoffeeTypes` 属性下。一旦存储了偏好，用户将被重定向到 `coffeeDashboard` servlet。

### 3. 创建生成个性化咖啡推荐的 Servlet

现在，让我们创建另一个 Servlet，它读取存储的咖啡偏好并动态生成推荐的咖啡列表。

```java
package org.eclipse.jakarta.hello;

import jakarta.servlet.*;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.*;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.Map;

@WebServlet("/coffeeDashboard")
public class CoffeeDashboardServlet extends HttpServlet {

   //这理想情况下应该来自数据库
   private static final Map<String, String> COFFEE_DESCRIPTIONS = new HashMap<>();

   static {
       COFFEE_DESCRIPTIONS.put("Black", """
           <p>黑咖啡具有浓郁的风味，非常适合那些喜欢有点力度的咖啡的人。</p>
           <p>尝试使用法压壶或 Aeropress 等冲泡方法，享受愉快的黑咖啡体验。</p>
       """);
       COFFEE_DESCRIPTIONS.put("Latte", """
           <p>拿铁是一种奶油般的享受，适合喜欢更平滑、不那么刺激口味的人。</p>
           <p>尝试使用各种糖浆和甜味剂可以提升您的拿铁体验。</p>
       """);
       COFFEE_DESCRIPTIONS.put("Cold Brew", """
           <p>冷萃咖啡往往更平滑、酸性更小。它非常适合炎热的夏日。</p>
           <p>尝试在冰箱里过夜冲泡一批，为清晨提神。</p>
       """);
   }

   @Override
   protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
       HttpSession session = req.getSession();
       String[] coffeeTypes = (String[]) session.getAttribute("userCoffeeTypes");

       if (coffeeTypes == null || coffeeTypes.length == 0) {
           handleNoCoffeeTypes(resp);
           return;
       }

       PrintWriter out = resp.getWriter();
       out.println("""
           <html>
           <body>
           <h1>您的个性化咖啡仪表板</h1>
       """);

       for (String coffeeType : coffeeTypes) {
           String additionalInfo = COFFEE_DESCRIPTIONS.get(coffeeType);
           out.println("""
           <h2>推荐 %s</h2>
           <p>这里有一些您可能会喜欢的 %s 混合咖啡。</p>
           %s
       """.formatted(coffeeType, coffeeType, additionalInfo));
       }

       out.println("""
           </body>
       </html>
       """);
   }

   private void handleNoCoffeeTypes(HttpServletResponse resp) throws IOException {
       PrintWriter out = resp.getWriter();
       out.println("""
       <html>
           <body>
               <h1>未发现咖啡类型</h1>
               <p>请选择至少一种咖啡。</p>
           </body>
       </html>
       """);
   }
}
```

`CoffeeDashboardServlet` 类根据用户的咖啡偏好生成个性化的咖啡仪表板。Servlet 通过 `@WebServlet` 注解映射到 URL `/coffeeDashboard`。
它使用一个名为 `COFFEE_DESCRIPTIONS` 的静态 `HashMap` 来存储不同类型咖啡的描述——在本例中，这是权宜之计，理想情况下应该从数据库中获取该内容。

Servlet 覆盖了 `doGet` 方法来处理 HTTP GET 请求。在这个方法内部，它首先检索存储在 HTTP 会话中的用户咖啡偏好。如果没有找到偏好，将通过调用 `handleNoCoffeeTypes` 方法显示默认消息。否则，它将遍历所选的咖啡类型，并从 `COFFEE_DESCRIPTIONS` 映射中获取相应的描述。最后，它生成 HTML 内容以在个性化仪表板中显示这些信息。

就这样。我们的应用程序完成了；现在，我们可以再次运行它并进行测试。

## 测试应用程序

部署后，在 web 浏览器中打开并导航到：
[http://localhost:8080/jakartaee-hello-world/storePreferences](http://localhost:8080/jakartaee-hello-world/storePreferences)

它将打开以下页面：

{{< figure class="margin-top-40 margin-bottom-40 margin-left-60 margin-right-60" src="/learn/starter-guides/images/servlet-checklist.jpg" alt="一个带有标题为 \"选择您的咖啡偏好\" 的清单网页，有三个选项：\"黑咖啡\"；\"拿铁\"；和 \"冷萃\"。" >}}

选择您喜欢的咖啡类型并点击“提交”按钮；然后您将被引导到下一页。

{{< figure class="margin-top-40 margin-bottom-40 margin-left-60 margin-right-60" src="/learn/starter-guides/images/servlet-dashboard.jpg" alt="一个网页，标题为 \"您的个性化咖啡仪表板\"，副标题为 \"推荐拿铁\"，并推荐您可能会喜欢的拿铁混合咖啡。" >}}

## 结论

恭喜您！您刚刚学会了如何使用 Jakarta Servlet 开发应用程序。