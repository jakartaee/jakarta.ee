---
title: "Jakarta EE XML Schemas"
date: 2020-03-23T00:00:00-00:00
layout: "single"
---

## Content

{{< schemas/content >}}

## Introduction {#intro}

This document lists the document formats that will be used by Jakarta EE

The Jakarta EE platform specification also requires support for Jakarta Persistence and Jakarta Bean Validation. The Jakarta Persistence Schemas are available at http://jakarta.ee/xml/ns/persistence/. The Jakarta Bean Validation Schemas are available at http://www.jboss.org/xml/ns/javax/validation/configuration/.

This document describes how to use the Jakarta EE schemas and provides a list of XML Schemas for each deployment descriptor.

List of [namespaces](../../../schemas/).

## Using Jakarta EE Schemas {#using}

All Jakarta EE 9 and newer Deployment Descriptor Schemas share the namespace http://jakarta.ee/xml/ns/jakartaee. Each schema document contains a version attribute that contains the version of the specification. For example, the XML Schema document for the Jakarta Servlet specification contains the version attribute value "5.0", pertaining to the specific version of the specification as well as the schema document itself.

Each Jakarta EE XML Schema document's file name contains the specific version of the related specification. This is introduced for convenience to locate specific versions of the schema documents. However, Deployment Descriptor instances are not required to refer to a specific file. Instead, an instance must specify the version of the corresponding specification by using the version attribute. For example, Jakarta servlet Deployment Descriptor instances that must be processed with the servlet 5.0 version must indicate the version within the version attribute of the instance document, for example, "5.0". The Deployment Descriptor processors use the version information to choose the appropriate version of the schema document(s) to process the Deployment Descriptor instances.

A specific version of the Jakarta EE specification contains a set of deployment descriptor schemas to constitute the Jakarta EE Schema. The common definitions are contained in the jakartaee_<version>.xsd document that may be included by several Jakarta EE Deployment Descriptor schemas.

{{< schemas/jakartaee-list >}}

## Jakarta EE 8 {#8}

See <a href="http://xmlns.jcp.org/xml/ns/javaee#8">http://xmlns.jcp.org/xml/ns/javaee#8</a> for all Jakarta EE 8 Schemas.