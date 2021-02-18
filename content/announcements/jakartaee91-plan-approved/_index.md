---
title: "Jakarta EE 9.1 Plan Approved"
date: "2021-02-10"
type: "announcement"
announcements/tags:
  - "Specification Committee"
authors: [{gh_handle: "kwsutter", name: "Kevin Sutter"}, {gh_handle: "scottmarlow", name: "Scott Marlow"}, {gh_handle: "smillidge", name: "Steve Millidge"}]
image: "./banner.png"
summary: "The goal of the Jakarta EE 9.1 release is to deliver a set of specifications functionally equivalent to Jakarta EE 9 and adding the support for the Java SE 11 runtime. The Platform team sees Jakarta EE 9.1 as an extension to the foundational Jakarta EE 9 release."
---

The goal of the Jakarta EE 9.1 release is to deliver a set of specifications functionally equivalent to Jakarta EE 9 and adding the support for the Java SE 11 runtime. The Platform team sees Jakarta EE 9.1 as an extension to the foundational Jakarta EE 9 release. No API updates are expected in Jakarta EE 9.1.

Only the Platform and Web Profile Specifications along with the TCK and Compatible Implementations should be affected by Jakarta EE 9.1.

## Java SE 11
### API Source Level

The APIs will continue to be compiled at the Java SE 8 level. The APIs need to be usable by both Java SE 8 and Java SE 11. Thus, keeping the same Java SE 8 source/target level for the APIs will still be required.

### TCK Source Level

The TCKs will continue to be compiled at the Java SE 8 level. This would allow the same TCK to be used for Compatibility testing with either Java SE 8 or 11 runtime.

#### Signature Tests

Currently, the TCK Signature Tests are specific to the level of the Java SE runtime which is being used for testing.
The TCK may need to be updated to include the Java SE 11 signatures.

#### CORBA and RMI/IIOP Tests

For Jakarta EE 9, the CORBA tests were left as-is and these tests were executed by default, but the RMI/IIOP tests were removed as part of the default execution. Since the CORBA ORB was removed from Java SE 11, there will be an impact to the TCK to support these CORBA tests. To minimize the impact to Jakarta EE 9.1, the expectation is to leave the CORBA tests in the TCK, but make them optional.

#### Web Services Tests

Many of the Web Services related features (XML Binding, XML Web Services, Web Services Metadata, and SOAP with Attachments) were dropped from Java SE 11. But, they were picked up for optional inclusion with Jakarta EE 9.
Since these optional features were provided with the Java SE 8 runtime, the TCK may need to be adjusted when running with the Java SE 11 runtime where they are no longer provided.

### Compatible Implementation (CI) Source Level

How a Compatible Implementation supports the Java SE 11 runtime will be left as a vendor-defined solution.

## Specification Project Minor (Point) Releases?

A few of the Jakarta Specification projects are already working on their “next” releases. This type of new, innovative work needs to be encouraged and promoted.

Since the ultimate goal of Jakarta EE 9.1 is to support the Java SE 11 runtime in a timely manner, no Specification API updates will be included in 9.1. If the Specification text or Javadoc needs to be updated to clarify some processing without any functional impact to the API, those types of changes should be entertained via a Service Release (x.y.z). The exact process for Specification Service Releases (extent of changes, reviews required, ballots required, etc) is still being worked out.

The preferred approach would be for these Specification projects to continue with their proposed “next” releases -- taking them through the required plan and review processes. But, don’t attempt to tie them to the Jakarta EE 9.1 release. These would just be independent updates to the Jakarta Specifications that could be discussed for inclusion in a future Jakarta EE Platform release.
