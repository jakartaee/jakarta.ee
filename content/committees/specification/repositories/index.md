---
title: "Specification Repository Guidelines"
date: "2022-04-06T00:00:00+00:00"
layout: "single"
hide_sidebar: true
aliases:
    - committees/specification/repositories/
---

## Content

- [Introduction]({{< ref "#intro" >}})
- [GitHub Organizations]({{< ref "#gh-org" >}})
- [Repository Naming]({{< ref "#naming" >}})

## Introduction {#intro}

## GitHub Organizations {#gh-org}

The following GitHub Organizations are used by the Jakarta EE Working Group:

- [Jakarta Specifications](https://github.com/jakartaee/) \
Repositories in the `jakartaee` organization are associated with a Jakarta Specification project.
Specifically, repositories for Specificaton Documents, APIs, and TCKs.
Only repositories owned by Specification Projects are allowed in this organization.  All repositories 
owned by Specification Projects must be in the `jakartaee` organization.

- [Jakarta Working Group](https://github.com/jakartaee-wg/) \
Repositories in the `jakartaee-wg` organization are for use by the Jakarta EE Working Group.
These repositories are managed by the Jakarta EE Working Group, and are not governed by the EDP or JESP.
Examples of repositories in this organization are websites, collateral materials, and committee tools and assets.

- [EE4J Projects](https://github.com/eclipse-ee4j/) \
Repositories in the `eclipse-ee4j` organization are associated with EE4J projects related to Jakarta EE.
Examples of this are tools, examples, demos, tutorials, and implementations of Jakarta EE specifications.  
Repositories in the `eclipse-ee4j` organization may not be owned by Specification Projects. 
**Note** that there is absolutely no requirement that an implementation must be created by an EE4J project.

## Specification Project Repository Naming {#naming}

All repositories in the [jakartaee](https://github.com/jakartaee/) GitHub organization SHOULD begin with the short name of the related specification.  The goal of this is keep the `jakartaee` organization clean with a clear mapping to the specifications as they are published on https://jakarta.ee/specifications/

For example, a specification project will typically have two repositories. One for the specification, which contains the specification document as well as the API artifact(s). And one for the Test Compatibility Kit (TCK).  The following naming standard would be used for these two repositories:

- Specification: {SPEC-SHORT-NAME}-api \
Examples: *mail-api*, *mvc-api*, *batch-api*

- TCK: {SPEC-SHORT-NAME}-tck \
Examples: *mail-tck*, *mvc-tcK*, *batch-tck*

As noted above, separate repositories for API and TCK is the typical layout.  Specification projects are free to organize their specification, API and TCK how they see fit as long as all repositories start with the short name of the related specification. 



