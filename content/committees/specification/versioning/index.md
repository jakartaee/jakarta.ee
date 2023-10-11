---
title: "Jakarta EE Specification Versioning, Change, and Deprecation Process 1.0"
date: "2023-10-10T00:00:00+00:00"
headline: Jakarta EE Specification Versioning, Change, and Deprecation Process
aliases:
  - committees/specification/versioning/
---

## Content

- [Goals]({{< ref "#goals" >}})
- [Definitions]({{< ref "#definitions" >}})
- [Allowed Changes, Deprecation and Versioning]({{< ref "#allowedchanges" >}})
  - [General Rules]({{< ref "#general" >}}) 
  - [API]({{< ref "#api" >}})
  - [Behaviour]({{< ref "#behaviour" >}})
  - [Component Feature]({{< ref "#component" >}})
  - [Platform Feature]({{< ref "#platform" >}})

## Goals {#goals}

It is the desire of the Jakarta EE specification projects to be able to make backwards incompatible changes to new 
versions of Jakarta EE specifications.  The goal of this document is to enable that outcome while also providing 
guidance so that users can be aware of when backwards incompatible changes have occurred.  The high-level framework in 
which this document is written:

* Backwards incompatible changes are possible on major versions, but never on minor or patch versions.
* Users should have at least 1 release to be made aware of a future backwards incompatible change.
* Requirements for communicating backwards incompatible changes in specification documents and download pages.

It should be noted that this is a departure from the backwards compatibility guarantee previously offered by Java EE.

This process covers the Platform specification, its profiles, and the Component specifications that constitute them. 
Because of the capability for Component specifications to potentially release at a quicker cadence to the Platform and 
its profiles, it should be clarified that the Platform specification and its profiles are not allowed to “jump” a 
Component specification release to introduce breaking changes without first deprecating the feature/behaviour in the 
Platform specification and its profiles. This is to discourage a Component specification quickly doing two or more 
back-to-back releases to quickly remove a feature. See the Platform Feature section for further details.

## Definitions {#definitions}

We define four “realms” for changes. For clarity, “changes” here refers to additions (new methods to existing 
interfaces, and new interfaces), and removals (removing methods from existing interfaces, and removing interfaces 
entirely). The four realms for changes are:

* API changes – these are changes to the APIs available to applications, vendor implementations, and wrapper 
implementations. 
  * As an example, the removal of `isParmetersProvided` from Expression Language.
* Behaviour changes – these are changes to how a Component Feature operates. This is a “subset” of Component Feature, 
and solely covers changing existing behaviour (not the addition or removal of a feature and its related behaviour). 
  * As an example, in CDI 4.0 they changed the default bean discovery method for an empty beans.xml file from “all” to 
  “annotated”. No API changes were made, this is solely a behaviour change to an existing feature.
* Component Feature changes – these are changes to the features defined in a Component specification (e.g. Jakarta 
Enterprise Beans). This realm covers the addition and removal of features (mandatory or optional), as well as the 
transition of an existing mandatory feature to optional (or vice-versa). 
  * An example would be if Enterprise Java Beans elected to fully remove Entity Beans from the specification (they are 
  still an optional part of the EJB specification, but are excluded from the Platform specification).
* Platform Feature changes – these are changes to the Component specifications included in the Jakarta EE Platform 
specification and its profiles. This covers the addition and removal of mandatory Component specifications, the 
inclusion or exclusion of optional Component features from mandatory Component specifications, and the inclusion or 
exclusion of entire Component specifications as optional. 
  * An example would be the pruning of Entity Beans, being made optional in Jakarta EE 9, and removed in EE 10. 
  Entity Beans still exist as an optional feature within the Enterprise Beans 4.0 Component specification which was 
  used for both Jakarta EE Platform 9.1 & 10, but the Platform specification elected to remove the feature from EE10 
  (as in it didn’t include it)

## Allowed Changes, Deprecation and Versioning {#allowedchanges}
### General Rules {#general}
* It is expected that a new version of a specification will require existing vendor implementations to be modified and 
extended to implement the new version.
* For changes where the major number doesn’t change, it must not be necessary for applications that use the existing 
version to recompile or modify their existing code. Changes must be binary & behaviour-compatible for applications that 
make use of a previous version of the specification with the same major number.

Backwards incompatible changes are allowed, but their introduction should be done in a controlled manner. All 
specifications should aim to use a versioning strategy conforming to the following pattern: _Major_._Minor_._Patch_

For the cases where backwards incompatible changes are being made, we follow a deprecation process that broadly has 
two steps:
* A feature is marked as deprecated in release _N_.
* A feature is then removed in release _N_+1 (or beyond)

The usage of tools such as BND to highlight when backwards incompatible changes are being used is encouraged.
The implementation of these changes and deprecations and how this aligns to version changes depends on the realm in 
question. The broad overview however is:
* Major version increments: Backwards incompatible changes
* Minor version increments: Backwards compatible changes
* Patch version increments: Bug fixes

The goal of this convention is to communicate to users when changes do or do not impact compatibility of their existing 
code. While not prohibited, declaration of a new major version without incompatible changes must be properly justified 
and documented in the Release Plan and project page. It should be anticipated that users will presume incompatibility 
across major version changes, regardless of attempts to document and/or justify the actual compatibility of the release. 
Therefore, this practice is discouraged.

### API {#api}
API changes must conform to the following convention:
* Major version increments: Backwards incompatible changes
* Minor version increments: Additions to existing interfaces, and additions of new interfaces.
* Patch version increments: Bug fixes

#### Deprecation
API methods that are marked for deprecation should be annotated with @Deprecated, and where possible the JavaDoc for 
the method should be updated to point users towards the replacement (if there is one). This mandates a minor version 
increment.

### Behaviour {#behaviour}
When making a change to existing behaviour (e.g. changing a default value), where possible a portable means to swap 
between the old and new behaviour should be introduced. The old behaviour must be the default. 

The ability to swap between the behaviours must be determined by the specification. This ability can be removed in a 
major version.

If it is not reasonable to introduce a portable means to swap between the behaviour, the behaviour change can be made 
without it but this will require a major version change.

To summarise:
* Major version increments: Backwards incompatible changes to behaviour.
* Minor version increments: Backwards compatible new behaviour.
* Patch version increments: Bug fixes. This covers cases where the feature is not working as intended – it doesn’t 
conform to what the specification dictates.

#### Deprecation
As noted above, the “deprecation” of behaviour by changing it to something else can happen in two ways:
* Using a flag to switch from the old to the new behaviour in a minor release. The flag and support for the old 
behaviour can be dropped in a later major release
* Without using a flag to switch between the old and new behaviour in a major release. This should be avoided where 
possible to avoid sudden breaking changes.

### Component Feature {#component}
Changes to Component features follow this versioning strategy:
* Major version change - removal of an optional or mandatory feature, or the transition of an existing mandatory 
feature to being an optional one.
* Minor version change – new features (mandatory or optional), or the transition of an existing optional feature to 
being a mandatory one.
* Patch version change – bug fixes to existing features.

#### Deprecation
Component features must be “deprecated” via a process similar to the Pruning process that existed before. A mandatory 
Component Feature is transitioned to being an optional feature in release _N_ of the Component specification, and the 
optional feature should be marked as “Deprecated” in some manner (for example in a “Proposed for Removal” section of 
the specification). The optional feature may then be removed from the Component specification in release _N_+1 (or 
beyond). As noted above, the transition of the feature to being optional would mandate a major release, and the removal 
of it would mandate a subsequent major release.

An existing optional feature which has not yet been marked for deprecation must be marked as deprecated in a minor or 
major release, to then be removed in a subsequent major release.

It should be stressed that optional features do not **have** to be removed – the Component specification can maintain 
them as optional for as long as desired.

See the _Platform Feature_ section for more details on how _Component Features_ which are pruned in this manner are 
dealt with there.

### Platform Feature {#platform}
The versioning strategy for the Platform and its profiles has in effect a marching major version regardless of 
backwards incompatible changes. This means it does not need to apply for an exception or provide justification that it 
intends to do a major version increment without a backwards incompatible change; it would only require to do so if it 
was planning a release without any of the criteria that would normally indicate a major version change (e.g. only 
changing the supported Java versions).

The Platform specification and its profiles use the following versioning strategy:
* Major version changes contain one or more of the following:
  * One or more changes to the set of Component specifications included in the previous version
  * One or more changes to the set of optional Component features included in the previous version.
* Minor version changes – Additions to the supported Java versions of the Platform itself. You cannot remove a 
supported Java version in a minor release.
* Patch version changes – Bug fixes (e.g. typos).

#### Deprecation
Deprecation from a Platform specification stance has two scopes:
* Removal of Component specifications
* Removal of Component features

##### Component Specifications
Component specifications may be removed from the Platform specification via a similar manner to the original Pruning 
strategy, but with updates to reflect that the Platform specification no longer defines optional specifications or 
features (everything is either mandatory or not included).
The deprecation strategy now would be:
* Specification is marked for pruning in release _N_. This is done by explicitly marking the specification under a 
“Proposed for Removal” section.
* The specification is removed from the Platform specification in release _N_+1 (or beyond). When doing so a reference 
must be given to the version of the Platform specification that marked it as “Proposed for Removal”.

##### Component Features
When a Component feature is transitioned from being mandatory to optional, the Platform specification and its profiles 
must include a version of the specification which maintains this change for at least one release. Before an optional 
feature can be removed from the Platform specification, it must be marked for at least one release under a “Proposed 
for Removal” section. When removing an optional feature from the Platform specification or its profiles a reference 
must be provided to the version of the specification that marked the feature as “Proposed for Removal”.

It should be noted that the Platform specification and its profiles are not allowed to “jump” a release to 
introduce breaking changes without applying for an exception This is to discourage a component specification 
quickly doing two or more back-to-back releases to quickly remove a feature.

The intent is that there must be a release of the Platform specification which contains the feature in a “Proposed 
for Removal” state before it can be removed, but this should not necessarily prevent a component specification from 
moving at a quicker pace than that of the Platform.

For an example scenario:
* A Component specification defines a mandatory feature in release 2.0 and this is included in the Platform 
specification release _X_.
* The Component specification transitions the feature to being an optional one in release 3.0 and marks it for removal.
* The Component specification removes the feature entirely in release 4.0.
* Platform specification release _X_+1 must contain Component specification 3.0, mark the optional Component feature as 
included, and can also mark the optional Component feature under the “Proposed for Removal” section – it is not allowed 
to immediately include Component specification 4.0 since this would bypass the “Proposed for Removal” step.
* Platform specification release _X_+2 can proceed to include version 4.0 of the Component specification with the 
feature removed. Alternatively, the Platform specification release _X_+2 may choose to maintain Component specification 
3.0, but would not have to include the optional feature if it did not want to.

Note that if the optional feature is maintained within the Component specification for more than one release (for 
example, if there was a 3.1 release of the Component specification that still contained the optional feature as per 
the example above), Platform specification release _X_+2 can include Component specification release 3.1 without having 
to include the optional feature. The same is true if Component specification release 4.0 did not remove the optional 
feature. 






