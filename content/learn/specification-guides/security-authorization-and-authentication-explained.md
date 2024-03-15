---
title: "Jakarta Security, Jakarta Authorization, and Jakarta Authentication Explained" 
date: "2024-03-12"
headline: "Jakarta Security, Jakarta Authorization, and Jakarta Authentication Explained" 
description: >-
  Jakarta EE provides the robust Jakarta Security specification that when
  paired with the Jakarta Authentication and Jakarta Authorization
  specifications, provides APIs that deliver end-to-end security.  
keywords: ["security", "authorization", "authentication", "specification", "spec", "guide", "tutorial"]
hide_page_title: true
weight: 2
---

Security is a major component of application development.  Jakarta EE provides
the robust Jakarta Security specification that when paired with the Jakarta
Authentication and Jakarta Authorization specifications, provides APIs that
deliver end-to-end security. There are a large number of application processes
that require security measures, and these specifications provide the ability to
do so in a straightforward manner using annotations and minimal XML
configurations.  Jakarta EE compliant containers and deployment environments
adhere to the constructs of the Authentication and Authorization policies to
ensure that applications can be secured in a standard way and deployed across a
number of different environments.

## Overview of Application Security

Applications consist of both protected and unprotected resources, and
application security is involved with protected resources. With respect to web
applications, security begins when the initial request is made to the main
application URL, at which point the application container determines whether
the client is authorized access to the resource.  Part of this initial process
is to also determine whether the client is required to be authenticated to
visit the requested URL, and if so, an authentication process needs to occur.
Authentication requires some type of credential from the client, oftentimes a
username/password, or perhaps a JWT Token, and this credential then needs to be
validated.

Once the credential has been validated, the application container then consults
a security policy to determine if the client has authorization to access the
requested resource.  The security policy outlines different roles required to
access the resource, and the validation process attempts to map the user to one
of the roles which has access.

Each of the steps outlined thus far are required for front end security,
providing access to requested resources.  There are also security mechanisms
required to protect business methods in a similar manner.  Jakarta Security
contains APIs for securing the entire application.  Given this explanation, the
following sections provide an overview of what role these specifications play
in the process.

## Configuration for Jakarta Security

Jakarta Security is part of any container that is compatible with the Jakarta
EE Platform.  However, to explicitly add the Jakarta Security API to a maven
application, add the following dependency:

```xml
<dependency>
    <groupId>jakarta.security.enterprise</groupId>
    <artifactId>jakarta.security.enterprise-api</artifactId>
    <version>3.0.0</version>
</dependency>

Along with an implementation:
<dependency>
    <groupId>org.glassfish.soteria</groupId>
    <artifactId>jakarta.security.enterprise</artifactId>
    <version>3.0.0</version>
</dependency>
```

## Jakarta Security

The Jakarta Security specification provides a standard means for securing
Jakarta EE applications through the use of Authentication mechanisms.  The
mechanisms provide implementations for the `HttpAuthenticationMechanism`
interface, which are used to specify how a user is authenticated, and whether
an authenticated user gains access to a requested resource. The
`HttpAuthenticationMechanism` interface enables developers to work with code
configuring through annotations, rather than XML. Jakarta Security enables
security for each of the authentication methods that are defined by the Servlet
specification by providing authentication mechanisms for each:

- Basic HTTP: When the `BasicAuthenticationMechanismDefinition` annotation is
  applied, if an unauthorized request is received, the container will negotiate
  with the client to achieve authorization.
- Form-Based: The `FormAuthenticationMechanismDefinition` provides options for
  specifying a login page and an error page. When the login page is specified,
  the server will send the standard login form to the client, which will then
  send the form contents through authentication business logic.
- Custom Form: The `CustomFormAuthenticationMechanism` annotation allows one to
  specify a login page just like the form-based authentication, but a custom
  login page incorporating logic which invokes the `SecurityContext` is used.
  The `SecurityContext` enables a custom authentication implementation to be
  applied.
- OpenID Connect: The `OpenIdAuthenticationMechanismDefinition` annotation
  authenticates according to the Authorization Code flow and Refresh tokens, as
  defined by the OpenID Connect specification.  The mechanism requires metadata
  about the OpenID Connect Provider to function properly.

It should be noted that custom authentication mechanisms can be developed by
implementing the `HttpAuthenticationMechanism` interface.  This interface defines
methods which align with those contained within the Jakarta Authentication
`ServerAuth` interface to ensure that a caller is properly authenticated and
authorized to access a requested resource.

- `validateRequest` (required): Provided to allow a caller to authenticate to a
  resource.
- `secureResponse`: Provided to allow post processing to occur on the response
  generated by a servlet and/or servlet filter.
- `cleanSubject`:  Provided to allow for cleanup after logout.

Authentication mechanisms are configured by placing an annotation respective to
the desired type of authentication, onto a Jakarta CDI bean.  For instance, to
apply Basic authentication, the following annotation can be placed on an
`ApplicationScoped` Jakarta CDI bean.

```java
@BasicAuthenticationMechanismDefinition(
    realmName = “myRealm”)
@ApplicationScoped
public class MyClass {}
```

In a similar manner, form based authentication can be configured using the
following.  In this case, the `@LoginToContinue` method redirects the user to the
login screen or to an error page if the login attempt is unsuccessful.

```java
@FormAuthenticationMechanismDefinition (
    loginToContinue = @LoginToContinue (
        loginPage = “/authenticate.html”,
        errorPage = “/loginError.html”))
@ApplicationScoped
public class MyClass {}
```

Jakarta Security defines an `IdentityStore` API which can be used to
communicate with Identity Stores used to authenticate a user and obtain a
user’s defined roles. Default identity stores are provided by the compliant
container for database and LDAP authentication using the
`@DatabaseIdentityStoreDefinition` or `@LdapIdentityStoreDefinition`,
respectively. It is also possible to create a custom Identity store by
implementing the `IdentityStore` interface. For instance, to configure an LDAP
identity store, one may do the following:

```java
@LdapIdentityStoreDefinition(
    url = “ldap://myserver:port”,
    callerBaseDn = “ou=caller,dc=example,dc=org”,
    gropuSearchBase = “ou=group,dc=example,dc=org”,
    groupSearchFilter = “”)
@ApplicationScoped
public class MyClass {}
```

The `SecurityContext` provides an elegant way to programmatically work with
security APIs via a Jakarta CDI bean. The `SecurityContext` interface is
available at runtime, so it can be injected and utilized to do things such as
authenticate a user, check role membership, and more.

## Jakarta Authentication

Jakarta Authentication is integrated into Jakarta Security as a low level
Service Provider Implementation (SPI) for authentication mechanisms.  Mentioned
in the previous section, authentication mechanisms are controllers that
interact with a caller and a container’s environment to obtain the caller’s
credentials, validate the credentials, and pass an authenticated identity to
the container. Jakarta Authentication consists of several profiles, with each
telling how a specific container can integrate with and adapt to this SPI.

- Servlet Container Lite Profile
- REST Profile
- SOAP Profile

The authentication specification covers a wide focus on client and server
authentication. An authentication context is responsible for constructing,
initializing, and coordinating the invocation of one or more encapsulated
authentication modules. At a high level, a typical authentication process flow
works as follows:


1. Client sends a secure request to the server
2. Server validates the request
3. Server dispatches request to service and sends back a secure response
4. Client validates the response

Request and response messages are implementations of a `MessageInfo` interface.
Typically, a runtime would perform the following steps to secure or validate a
message. Steps 1-4 below are performed one time, while 5 is repeated for each
message.

1. Acquire `AuthConfigProvider`, which is used for obtaining an authentication
   configuration for relevant messaging layer and application identifier.
2. Acquire `AuthConfig` from the provider:
  a) `ClientAuthConfig`: Client configuration
  b) `ServerAuthConfig`: Server configuration
3. Acquire `AuthContext` Identifier for client or server from the corresponding
   `AuthConfig`.
4. Acquire Authentication Context which will be used to process identified
   messages.  
  a) `ClientAuthContext`: Client context
  b) `ServerAuthContext`: Server Context
5. Process Messages

An authentication module is invoked to validate a message, and it is passed a
`Subject` object to receive the credentials of the source of the message and a
separate Subject object to represent the credentials of the recipient of the
message. The authentication modules contexts return `AuthStatus` values with
the status, and `AuthExceptions` if an exception occurs. It should be noted
that there can be more than one authentication module, and these can be invoked
independently and concurrently.

## Jakarta Authorization

Jakarta Authorization is another integral specification that goes hand in hand
with Jakarta Security. It consists of a low-level SPI for authorization policy
modules, which are repositories of permissions which determine whether a
subject has a given permissions to access a requested resource. This
specification defines a contract between containers and authorization policy
modules, which provides authorization functionality to suit the operational
environment. The contract is divided into three subcontracts, which together,
describe the installation and configuration of the authorization providers.

- Provider Configuration Subcontract: Defines requirements placed on providers
  and containers such that `Policy` providers may be integrated with containers.
- Policy Configuration Subcontract: Defines interactions between container
  deployment tools and providers to support translation of authorization
  policies into policy statements within a Java SE Policy provider.
- Policy Decision and Enforcement Subcontract: Defines the interactions between
  container policy enforcement points and providers that implement policy
  decisions that are required by containers.

Jakarta Authorization provides a standard means for working within the
boundaries of each of the three subcontracts. The Policy Configuration
Subcontract works along with the standard `java.security.Policy` to provide
standard policies for a container.  It also provides a means of configuring
policies using policy providers, such that the policy can be changed to reflect
what is needed for the specific environment. Jakarta Authorization also
provides a means for configuring security groups, roles, and constraints for
restricting access to particular pages within an application. The Policy
Configuration Subcontract specifies a means for ensuring that the container
will adhere to a standard method for specifying such roles and permissions.
Lastly, the Policy Decision and Enforcement Subcontract ensures that policies
are enforced in a standard way across Jakarta Servlets and Jakarta Enterprise
Beans.

## Conclusion

Jakarta Security, Jakarta Authentication, and Jakarta Authorization
specifications together provide robust security standards that can be applied
to Jakarta EE applications. Since these specifications are standards across
all compliant containers, developers can implement security that can be easily
maintained or modified, as needed. Jakarta Security provides a means for
declaratively specifying authentication types, identity stores, and for working
with the API, rather than using XML. Along with Authentication and
Authorization, Jakarta Security provides the tools and APIs to properly secure
applications.

