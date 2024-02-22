---
title: "Jakarta Servlet, Jakarta Faces and Jakarta Server Pages Explained" 
date: "2024-02-22"
headline: "Jakarta Servlet, Jakarta Faces and Jakarta Server Pages Explained" 
description: >-
  The Jakarta EE Platform offers a number of APIs that can be used to create
  web based user interfaces. The most mature and perhaps most well known is
  the Jakarta Servlet specification. Jakarta Servlet was first released in
  1996, and it enables Java developers to create web pages containing dynamic
  web content using pure Java.
hide_page_title: true
weight: 1
---

The Jakarta EE Platform offers a number of APIs that can be used to create web
based user interfaces. The most mature and perhaps most well known is the
Jakarta Servlet specification. Jakarta Servlet was first released in 1996, and
it enables Java developers to create web pages containing dynamic web content
using pure Java. The specification has changed much over the years and it is
able to interact with modern technologies and comply with the modern era of web
technologies with features such as HTTP/2. Jakarta Server Pages (JSP) was
first released in 1999, and it enables developers to create web based user
interfaces using a mixture of HTML markup and special Jakarta Servlet tags.
JSP enables easy creation of dynamic web views, and it has also made great
progressions over the years to position it for standard model-view-controller
development. Model-View-Controller development specifies clear separation of
view code from business logic, and in the early years of JSP it was common to
see business logic intermixed with HTML code. To that end, Jakarta Faces was
initially released in 2004, and it provides the ability to develop web based
user interfaces with XML for the view and a corresponding Java class to contain
the business logic for the view. This specification has adapted over the years
to continue as a relevant web based user interface API for modern times.

This document will provide a brief overview for each of these three view
technologies, comparing the APIs. In general, Jakarta Servlet APIs are the
least often used for development of application user interfaces since the
learning curve is often a bit higher. Although it may not be as widely used
for development, it does contain a standard API which is widely supported, and
most other user interface specifications are built upon it. Both Jakarta
Server Pages and Jakarta Faces utilize Jakarta Servlet under the hood, which
also makes Jakarta Servlet a foundational technology for building Jakarta EE
web application user interfaces.

## Configuration

Each of these three UI technologies requires some minimal configuration. All
of these APIs are available for use by default if using the full Jakarta EE
Platform or the Jakarta EE Web Profile. However, to add the specifications
individually, the following dependencies are required:

Jakarta Servlet Dependency:

```xml
<dependency>
    <groupId>jakarta.servlet</groupId>
    <artifactId>jakarta.servlet-api</artifactId>
    <version>6.0.0</version>
    <scope>provided</scope>
</dependency>
```

Jakarta Server Pages Dependency:

```xml
<dependency>
    <groupId>jakarta.servlet.jsp</groupId>
    <artifactId>jakarta.servlet.jsp-api</artifactId>
    <version>3.1.0</version>
    <scope>provided</scope>
</dependency>
```

Jakarta Faces Dependency:

```xml
<dependency>
    <groupId>jakarta.faces</groupId>
    <artifactId>jakarta.faces-api</artifactId>
    <version>4.0.1</version>
</dependency>
```

### Additional Configuration

Jakarta Servlet used to require servlet registration and mapping within the
web.xml for each servlet that is part of an application. Modern servlets do
not require any configuration by default, as servlet registration and mapping
is performed by placing the `@WebServlet` annotation on a servlet class. This
annotation accepts the servlet path as an attribute.

Jakarta Faces requires some additional configuration in order to route the web
requests through the Faces servlet. There is an optional configuration with
Jakarta Faces which allows developers to specify the default extension for the
user interface pages. However, the default extension is .xhtml if this
configuration is not specified. The configuration should be placed within the
web.xml.

```xml
<servlet>
   <servlet-name>Faces Servlet</servlet-name>
   <servlet-class>jakarta.faces.webapp.FacesServlet</servlet-class>
   <load-on-startup>1</load-on-startup>
</servlet>
<servlet-mapping>
   <servlet-name>Faces Servlet</servlet-name>
   <url-pattern>*.xhtml</url-pattern>
</servlet-mapping>
```

## Jakarta Servlet Overview

Jakarta Servlet enables developers to write web UIs using pure Java. At its
simplest, a servlet is developed by creating a Java class and extending the
`Servlet` interface. There are two classes that are generally used to extend
`Servlet` interface: `GenericServlet` and `HttpServlet`. In most cases, `HttpServlet`
is extended. The `service()` method is called upon when the servlet is loaded
into the web browser. The `Servlet` interface defines a service method that is
invoked to act upon each request. There are a number of methods that are
automatically called upon via the `service()` method, and a servlet should
implement those methods which provide the processing needed for the task at
hand.

- `doGet()`: handles HTTP GET requests for displaying data
- `doPost()`: handles HTTP POST requests for performing inserts
- `doPut()`: handles HTTP PUT requests for performing updates
- `doDelete()`: handles HTTP DELETE requests for performing deletions
- `doHead()`: handles HTTP HEAD requests
- `doOptions()`: handles HTTP OPTIONS requests
- `doTrace()`: handles HTTP TRACE requests

In the case of loading some simple dynamic content, implementing the `doGet()`
method may be all that is required. The `@WebServlet` annotation can be applied
to a servlet class in order to register it with the container. The path to
which a user must visit to invoke the servlet should be passed to the
`@WebServlet` annotation. In the following example the servlet can be invoked by
visiting the URL path containing the host name, port, and servlet path of
/HelloServlet within a web browser:

```java
@WebServlet("/HelloServlet")
public class HelloServlet extends HttpServlet {
    static String PAGE_HEADER = "<html><head><title>hello</title></head><body>";
    static String PAGE_FOOTER = "</body></html>";
    @Inject
    HelloService service;

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException,ServletException {
        resp.setContentType("text/html");
        PrintWriter writer = resp.getWriter();
        writer.println(PAGE_HEADER);
        try {
            writer.println(service.printMessage("Jakarta EE!"));
        } catch (Exception e) {
            e.printStackTrace();
        }
        writer.println(PAGE_FOOTER);
        writer.close();
    }
}
```

When the servlet URL is visited by a client, a request is sent to the host
server, and then it hands off the request to the servlet container. The
servlet container then determines which servlet to invoke and then calls upon
it with the request and response objects.

The servlet life cycle is as follows:

1. Loading and Instantiation: Servlet container loads the servlets that are
   registered and instantiates them for use.
2. Initialization: Servlet initialization occurs calling upon the `init()` method
   of the servlet.
3. `RequestHandling`: Request objects of type `ServletRequest` are handled, and
   then `ServletResponse` objects are filled out and passed as parameters to the
   `service()` method. At this stage, single requests or multiple asynchronous
   requests can be processed, depending upon configuration.
4. End of Service: Once a container determines that a servlet is no longer
   needed, the `destroy()` method of the servlet is called to allow the servlet
   to release resources, if needed.

In some cases, data needs to be passed in from a web form to a servlet for
processing. This can be achieved through the use of HTML forms and request
parameters. Parameters can be sent to a servlet through the URI and they are
processed via name-value pairs. Multiple values can be assigned to any
parameter name. Once the parameters are passed, the servlet contains a number
of methods that can be used for accessing the parameters.

### Additional Features

There are a number of other important features that Jakarta Servlet provides
that go above and beyond the basics of displaying dynamic content and accepting
request parameters. This section will provide a high level overview for a
number of these features. Many of these additional features can be registered
within the web.xml of an application, or they can be registered using
annotations.

Servlet Filters are lightweight and reusable Java components that allow
on-the-fly modifications of header and payload for both the request and
response. Jakarta Servlet provides a framework for writing filters and
applying them to servlets. To write a filter, a class must extend
`jakarta.servlet.Filter`, and implement the `doFilter()` method. The `@WebFilter`
annotation can be applied to a class, along with metadata, to define it as a
filter.

Servlet Listeners can be used to listen for events and perform actions when the
corresponding events occur. There are a number of different event types, from
servlet startup/shutdown, to session or request events. Listener classes must
implement a listener interface corresponding to the associated type of event
listener being developed. Listener events include: `AsyncListener`,
`ServletContextListener`, `ServletContextAttributeListener`,
`ServletRequestListener`, `ServletRequestAttributeListener`, `HttpSessionListener`,
`HttpSessionBindingListener`, `HttpSessionAttributeListener`,
`HttpSessionActivationListener`. Listeners can be registered by applying the
`@WebListener` annotation to a listener class.

Servlet containers allow files to be uploaded when data is sent via
`multipart/form-data`. To indicate that a servlet is used for performing upload,
it must have the `@MultipartConfig` annotation applied to it.

Servlets can access information pertaining to attributes and headers via
provided APIs. Attributes are associated with each request, and they can be
set to specify information. Headers are also associated with every HTTP
request, and they can be used to specify information about sessions and
caching, amongst other things.

Servlets can make use of the URI path to invoke different resources. The path
portion of a URI identifies which resource should be processed. Part of the
Jakarta Servlet specification outlines a standard set of guidelines that should
be followed by compliant containers when processing URI paths. A servlet
request path conforms to the following format:

```java
requestURI = contextPath + servletPath + pathInfo
```

Jakarta Servlet containers utilize non-blocking request processing, which helps
to improve scalability and makes it easy to increase the number of
simultaneously processed connections. Non-Blocking IO makes it possible to
read and write when needed, without requiring a connection to wait for other
processes to complete. Jakarta Servlet provides an API for working with
non-blocking requests.

HTTP/2 Server Push enables a servlet to push required resources to a client
when needed. This provides the ability to load resources before they are
needed so that overall performance of servlet applications is significantly
improved.

There are APIs for processing cookies, working with SSL, and much more. This
brief overview only scratches the surface of Jakarta Servlet capability. To
learn more, please review the specification.

## Jakarta Server Pages Overview

The Jakarta Server Pages specification enables developers to utilize HTTP and
XML markup, custom processing tags, expression language, and embedded Java code
in order to process and display dynamic web content. Jakarta Server Pages are
an abstraction built on top of Jakarta Servlet, abstracting many of the
complexities involved with the Servlet API. As such, Jakarta Server Pages
inherits many of the features that are encompassed within the Jakarta Servlet
specification.

A JSP page is merely an HTML page that contains optional tags and/or embedded
code, and it contains a page suffix of .jsp. The following is an example of a
very basic JSP. The page accesses a JavaBean containing a property named
message, which is assigned the value of `Jakarta EE!`. The message will be
displayed when the page is viewed. This JSP is the equivalent of the servlet
example from the previous section.

```jsp
<%@page language="java" contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>JSP Page</title>
    </head>
    <body>
        <jsp:useBean id="helloBean" class="com.mycompany.helloworld.HelloBean" />
    
        <jsp:getProperty name="helloBean" property="message" />
        
    </body>
</html>
```

The code for the corresponding `HelloBean` is as follows:

```java
public class HelloBean {
    private String message = "Jakarta EE!";

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
```

One of the first things to note is that the @ page directive should be placed
at the top of a JSP and it may contain a number of page dependent attributes
that are communicated to the JSP container. Jakarta Server Pages allows for a
mixture of tags and embedded code within a page to display dynamic content
within a page. However, it is a best practice to maintain a clean separation
of web view markup and business logic. Therefore, it is advised to keep
business logic in Java code within classes, rather than to embed. There are
three types of JSP page elements for creating dynamic content:

- Directive Element: Provide global information for the translation phase of a
  page.
  - Format: `<%@  directive %>`
- Action Element: Provide information for the request processing phase.
- Scripting Element: Provide communication between template text and actions.
  There are three types of scripting elements:
  - Declarations: Used to declare variables `<%! declaration %>`
  - Scriptlets: Used to embed Java code into a page `<% code %>`
  - Expressions: Used to provide expressions such as conditionals 
    `<%= expression %>`

The following JSP demonstrates how to embed code via a scriptlet in order to
conditionally display content. In the example, if the message field within
HelloBean is not null, then it will be displayed, otherwise a default message
of "No value in bean" will be displayed.

```jsp
<%@page language="java" contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>JSP Page</title>
    </head>
    <body>
        <jsp:useBean id="helloBean" class="com.mycompany.helloworld.HelloBean" />
    
        <% if (helloBean.getMessage() != null) { %>
            <jsp:getProperty name="helloBean" property="message" />
        <% } else { %>
            No value in bean.
        <% } %>
    </body>
</html>
```

Jakarta Expression language is used to simplify data access from different
sources. Expressions are placed within pages using the following format 
`${ expression }` when the expression will be evaluated immediately. To defer the
evaluation of the expression, the syntax of `#{ expression }` can be used. When
the JSP compiler sees this syntax, it generates the code to evaluate the
expression. There is an entire specification around Jakarta Expression
Language so it is an expansive topic. There is also an additional tag library
known as Jakarta Server Pages Standard Tag Library (JSTL) which contains a
number of tags for doing things such as calling functions or performing
conditionals without embedding code in a page. However, as an example of using
Jakarta Expression Language, one can utilize conditionals to determine whether
values are less than, equal to, or greater than other values by specifying `lt`,
`eq`, or `gt`, respectively. For example the following would produce the value
`"true"`:

```
${ 10 lt 50}
```

There are a number of implicit objects that are made available for use within
pages, and within server side business logic. These objects can be used for
doing things such as obtaining the request URI. The following objects are
available for use:

- `request`: Belongs to the `HttpServletRequest` class, and makes all request
  inputs available to the server.
- `requestScope`:  Maps request scoped attribute names to their values.
- `response`: Belongs to the HttpServletResponse class, and determines the
  details that are passed back to a client after a request has been made.
- `page`: Supplies access to the current servlet information.
- `pageContext`:  Page Context Object.
- `session`: Maintains information throughout a session.
- `sessionScope`: Maps session scoped attribute names to their values.
- `application`: Contains application based parameters.
- `applicationScope`: Maps application scoped attribute names to their values.
- `param`: Maps parameter names to a single String based parameter value.
- `params`: Maps parameter names to a String[] of values for that parameter.
- `pageScope`:  Maps page scoped attribute names to their values.
- `header`: Maps header names to single String header values.
- `headerValues`: Maps header names to a Sting[] of values for the associated name.
- `cookie`: Maps cookie names to a single Cookie object.
- `initParam`: Maps context initialization parameter names to their String based
  parameter value.
- `out`: Used to write content to the client. 
- `exception`: Used to display error messages within a JSP page.
- `config`: Supplies access to the servlet context, name, and configuration
  parameters.

For instance, to obtain a request parameter value from within a Java class, the
request object can be called upon by invoking the `getParameter()` method.

```java
String message = request.getParameter("message");
```

Jakarta Server Pages also makes a number of actions available for use within a
page. These actions can be applied by specifying the following tags:

- `jsp:include`: Enables inclusion of static and dynamic resources within the
  same context of the current page.
- `jsp:forward`: Allows current request to be dispatched to a static resource,
  JSP Page, or servlet within the same context of the current page. 
- `jsp:param`: Used to specify key/value information within the `jsp:include`,
  `jsp:forward`, or `jsp:params` tags.
- `jsp:plugin`: Specifies an associated plugin for the page. Deprecated as of JSP
  3.1
- `jsp:params`: Associated with plugins. Deprecated as of JSP 3.1
- `jsp:fallback`: Associated with plugins. Deprecated as of JSP 3.1
- `jsp:attribute`: Allows page author to define value of an action attribute in
  the body of an XML element, or it can be used to enable the page author to
  specify the attributes of the element being output by a `jsp:element` action.
- `jsp:body`: Used to define the body of a standard or custom action.
- `jsp:element`: Dynamically creates an XML element and adds it to the response.
- `jsp:useBean`: Associates a Java object to a JSP variable, making it available
  for use within the page.
- `jsp:setProperty`: Sets values of properties within a page.
- `jsp:getProperty`: Places value of bean instance property into the implicit
  "out" object, from which the value can be displayed as output.
- `jsp:invoke`: Only used in tag files for invoking a JSP fragment.
- `jsp:doBody`: Only used in tag files for invoking the body of a tag.
- `jsp:text`: Encloses template data in a JSP page.
- `jsp:output`: Only used in JSP documents for modifying some properties of the
  output of a JSP document or tag file.

There are a number of other optional directives that can be placed on a page
within the `<%@ directive %>` enclosing characters. These directives enable
developers to do things such as specify tag libraries that can be used within a
page using the taglib directive. The include directive allows other JSP file
contents to be substituted or included within the page at translation time. It
should be noted that JSP pages can also be built completely out of XML using
JSP documents. When developing JSP Documents, XML tags are strictly enforced.

A page that is written as a JSP is compiled down to a Jakarta Servlet and
processed by the container. Jakarta Server Pages enables the reuse of page
fragments via the use of templates, and encapsulation of functionality via
components that can be written once and reused throughout an application.
Templates contain text or XML and make it easy to embed dynamic content using
JSP scriptlets and tags.

Jakarta Server Pages is a very mature framework, and as such, it contains very
robust tooling support. It enables a clean separation of roles, as front end
developers can work on the user interface without requiring use of Java code in
most cases. Although it is possible to embed Java code inside of JSP views, it
is not recommended, as it is a best practice to code business logic within Java
classes. To learn more about the details of Jakarta Server Pages, please refer
to the specification.

## Jakarta Faces Overview

Jakarta Faces is built upon Jakarta Servlet and provides even more abstraction
than Jakarta Server Pages. Jakarta Faces provides strict enforcement of the
Model-View-Controller paradigm, maintaining a clean separation of view code
from business logic. Jakarta Faces is a server-side web framework that enables
developers the ability to focus different portions of an application
development life cycle to different teams with expertise in those areas. The
specification has matured over the years to enable excellent support for modern
technologies, such as microservices.

At the heart of Jakarta Faces is its templating framework, facelets, which
provides excellent support for applying templates throughout and reuse of page
content. Jakarta Faces facelet views adhere to XML, and the page suffix ends
with .xhtml. The views are composed of custom components and events that are
processed by the Jakarta Faces runtime. There are components for just about
every web application construct…from input text fields, to calendar widgets, to
maps. Not only does facelets allow for templating, but it also provides great
support for development of reusable components. In fact, there are libraries
of reusable components available for use and entire component libraries that
are open source providing ready-to-use components for building applications
with Jakarta Faces.

Jakarta Faces has a request processing lifecycle, much like that of Jakarta
Server Pages. There are a series of phases that each request goes through, and
this overview will not go into depth on the phases. However, it is important
to note that these phases determine when validations, conversions, and events
are processed throughout the lifecycle of a Jakarta Faces request/response.

Jakarta Faces allows communication between the front end and the back end via
the use of Contexts and Dependency Injection (CDI) beans. CDI beans can be
referenced within Jakarta Faces views using Expression Language, enclosing
expressions within `#{ expression }`. The following Faces view provides similar
output as that of the Jakarta Servlet example from earlier in this article,
displaying a message from a Java class on screen:

```xml
<?xml version='1.0' encoding='UTF-8' ?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml"
      xmlns:h="jakarta.faces.html">
    <h:head>
        <title>Facelet Title</title>
    </h:head>
    <h:body>
        <h:outputText value="#{helloCdi.message}"/>
    </h:body>
</html>
```

The corresponding CDI Bean is named `HelloCdi`, and it contains the following
code. For the first example, only the message field is used.

```java
import jakarta.faces.view.ViewScoped;
import jakarta.inject.Named;

@Named
@ViewScoped
public class HelloCdi implements java.io.Serializable {
    
    private String message = "Hello Jakarta Faces!";
    private String changedText;
    public HelloCdi(){
        
    }
    
    public void changeMessage() {
        this.message = changedText;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getChangedText() {
        return changedText;
    }

    public void setChangedText(String changedText) {
        this.changedText = changedText;
    }
}
```

To break the example down, <html> tag lists tag library namespaces that can be
utilized within the view, and maps them to a corresponding letter. In the
example, the `xmlns:h="jakarta.faces.html"` maps the letter "h" to the Jakarta
Faces HTML tag library namespace. As such, any of the Jakarta Faces HTML tags
must be prefaced with "h:". Another often used namespace that is part of
Jakarta Faces contains the Faces core components. This namespace is typically
bound to the letter "f" as such: `xmlns:f="jakarta.faces.core"`, and the core
components cover converters, validators, and others. The body of the XHTML
form contains opening and closing `<h:head>` and `<h:body>` tags. Any parameters
that need to be placed into the head of the view would be placed within the
`h:head` section, and any components that will be used to compose the view would
be placed within the `h:body` section. In the example, the Jakarta Faces
`h:outputText` component is contained within the `h:body` and it is used to display
the data which is stored within the message property of the CDI bean. Note
that the CDI bean has the `@ViewScoped` annotation applied, which makes this bean
hold state for the life of the view. When the user navigates away from the
page, the state is lost. However, a CDI bean can contain any of the valid CDI
scopes.

Jakarta Faces makes templating easy, providing the ability to create portions
of a page such as a footer once, and then apply that portion to other pages.
Using templating, it is possible to create headers, footers, menus on the top,
left, or right, and so forth. To utilize facelets templating, the facelets
namespace must be brought into a page within the `<html>` tag
`xmlns:ui="jakarta.faces.facelets"`. The facelets "insert" and "include"
components enable one to include facelets pages within each other.

```xhtml
<h:body>
    <div id="body">        
            . . .
    </div>
    <div id="footer">
        <ui:insert name="footer">
            <ui:include src="/template/applicationFooter.xhtml"/>
        </ui:insert>
    </div>
</h:body>
```

As mentioned, Jakarta Faces contains a large number of components for use
within the views, and they can be easily wired up to save values and
communicate with backend business logic via CDI beans. To name a few, the
`inputText` component translates to an HTML input component of type text, the
`commandButton` component translates to a button which submits form contents, and
the `dataTable` component allows data to be displayed within an HTML table. It
is easy to develop a create, remove, update, delete data application using a
dataTable component. The Jakarta Faces HTML components that ship with the
platform are basic without much styling applied, but there are many third party
component providers that contain enhanced styling that can make forms and
tables very visually appealing. 

As an example of Jakarta Faces forms functionality, the following page contains
a Jakarta Faces form. Inside the form are an `outputText` component to display a
message bound to a CDI property, an `inputText` component that is bound to a
property within a CDI bean, which can have its value changed from the view
since it contains a setter method. The view also contains a `commandButton`
which is bound to an action method within the bean. When the `commandButton` is
pressed, the text which has been entered into the `inputText` component is
assigned to the message property and redisplayed on the screen.

```xhtml
<?xml version='1.0' encoding='UTF-8' ?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml"
      xmlns:h="jakarta.faces.html">
    <h:head>
        <title>Facelet Title</title>
    </h:head>
    <h:body>
        <h:form id="helloForm">
            <h:outputText id="message" value="#{helloCdi.message}"/>
            
            <h:inputText id="inputMessage" value="#{helloCdi.changedText}"/>
            <br/><br/>
            <h:commandButton id="submitButton" action="#{helloCdi.changeMessage}" value="Change Message"/>
            
        </h:form>
    </h:body>
</html>
```

Jakarta Faces also includes a navigational API which provides the ability to
navigate from one view to another. There are two different forms of navigation
within Jakarta Faces. An optional faces-config.xml file can be included within
the WEB-INF folder of the application, and navigational rules, amongst other
configurations, can be specified via XML. The following navigational rule can
be placed within this file and it will route the user to the
authentication.xhtml page when a value of `GOTO_LOGIN` is returned from an action
method within a CDI bean. 

```xml
<navigation-rule>
        <from-view-id>/*</from-view-id>
        <navigation-case>
            <from-outcome>GOTO_LOGIN</from-outcome>
            <to-view-id>authenticate.xhtml</to-view-id>
        </navigation-case>
</navigation-rule>
```

Navigation can also occur by returning the name of the view to which navigation
should occur from an action method. For instance, when a user clicks a command
button to initiate an action method, it could return a `String` of
"authenticate.xhtml" to navigate to that page. There are also components that
contain an "outcome" attribute, which can be used to specify the name of the
view to which navigation should route the user.

Jakarta Faces includes a validation framework to validate data as it is entered
into data fields or submitted via a form. Jakarta Faces comes with a number of
validators, which perform validation on numbers, etc. However, it is also easy
to develop custom validators that can be applied to components within a Faces
form. In a similar fashion, Jakarta Faces includes a converter framework that
allows data to be converted automatically by the supplied converters or by
custom created converters. An example of a converter would be converting all
characters of a String to uppercase, or converting a `String` to a date object.

The following example demonstrates how to apply a length validator to the
`inputText` field. Note that the applied `validateLength` converter is part of the
Jakarta Faces core component library, so it contains a prefix of “f”.

```xhtml
<h:inputText id="inputMessage" value="#{helloCdi.changedText}">
    <f:validateLength minimum="10" maximum="200" />
</h:inputText>
```

It is possible to provide a label attribute on an `inputText` field to change the
label color of a field label when the contents fail validation. Another option
is to associate an outputText with a particular error message if validation
fails. Modern applications utilize JavaScript and AJAX (Asynchronous
JavaScript and XML) to submit forms and display content to users without page
refreshes. This process also helps the user identify issues with form entry
more easily. The Jakarta Faces components are ready to use with AJAX by
applying the core `ajax` component to corresponding Faces tags. There is no
JavaScript code necessary, as Jakarta Faces abstracts the code intricacies from
the developer. The following code demonstrates how to apply AJAX to a command
button and process the inputMessage and the commandButton action, and then
finally refresh the value of the component assigned to an ID of “message”.

```xhtml
<h:commandButton id="ajaxSubmitButton"
                  value="Ajax Change Message"
                  actionListener="#{helloCdi.changeMessage()}">
    <f:ajax execute="inputMessage, @this" render="message"/>
</h:commandButton>
```

Jakarta Faces supports features such as resource bundles, which enable
internationalization and the ability to store static messages. Centralizing
text within resource bundles makes management much easier. There is also an
`outputStylesheet` component that can be used to easily apply style sheets to
pages, and each of the components contains styling attributes. As mentioned
previously, there are a number of third party component libraries that have
components that already have styling applied to them. There is also a dialog
API, which makes it easy to embed dialogs into Jakarta Faces forms. 

In the most recent release, there have been a number of new features added.
There is now a new API for developing facelets programmatically. One can now
also use extensionless pages so that each page no longer requires the .xhtml
suffix. Some of the components have also been updated with new attributes and
options. So many other features haven’t even been mentioned in this brief
overvew, and to learn more about them, please refer to the specification.

## Conclusion

Jakarta EE contains a number of web application user interface specifications
that enable the development of complex front ends in a standard manner. The
Jakarta Servlet APIs lay the foundation for most of the user interface
specifications, and servlets can be coded completely with Java. They enable
developers to have fine grained control over requests and responses within a
web application. Jakarta Server Pages is an abstraction built on top of
Jakarta Servlet and it enables developers to more easily develop user
interfaces using a mixture of JSP tags and HTML. It also contains many
features which enable fine grained control over web application UIs without
requiring much Java code. Lastly, Jakarta Faces provides a clean separation of
roles for a development team. It utilizes facelets for the user interface and
templating, making it easy to extend pages and create custom components.
Jakarta Faces also contains validators and converters, along with modern use
features such as the ability to apply AJAX to components. These specifications
provide developers with a variety of techniques for creation of web user
interfaces, allowing the ability to select the best choice for the task at
hand.
