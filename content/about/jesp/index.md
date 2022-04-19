---
title: "Jakarta EE Specification Process"
date: 2021-01-14T13:00:00-04:00
hide_sidebar: true
---

# Jakarta EE Specification Process

version 1.3. Effective April 5/2022

The Jakarta EE Specification Process (JESP) is concerned with the Specification Process as it applies to Specification Projects operating under the purview of the Jakarta EE Working Group. 

The Jakarta EE Specification Committee hereby adopts the [Eclipse Foundation Specification Process v1.2](https://www.eclipse.org/projects/efsp?version=1.2) (EFSP) as the Jakarta EE Specification Process with the following modifications:

1. Any modification to or revision of this Jakarta EE Specification Process, including the adoption of a new version of the EFSP, must be approved by a Super-majority of the Specification Committee, including a Super-majority of the Strategic Members of the Jakarta EE Working Group, in addition to any other ballot requirements set forth in the EFSP.
2. All specification committee approval ballot periods will have the minimum duration as outlined below (notwithstanding the exception process defined by the EFSP, these periods may not be shortened)
  a. Creation Review: 7 calendar days;
  b. Plan Review:  7 calendar days;
  c. Progress Review: 14 calendar days;
  d. Release Review: 14 calendar days;
  e. Service Release Review: 14 calendar days; and
  f. JESP Update: 7 calendar days.

3. A ballot will be declared invalid and concluded immediately in the event that the Specifiation Team withdraws from the corresponding review.
4. Specification Projects must engage in at least one Progress or Release Review  per year while in active development.

All development that modifies content in the `javax` namespace must be moved to a `jakarta` namespace. All `jakarta` namespace development must occur within the scope of a Specification Project operating under the purview of the Jakarta EE Working Group’s Specification Committee and must implement the process as defined by the most recently adopted revision of the JESP.
Use of the `jakarta` namespace is limited to API artifacts (all API jars, javadoc, and schema namespaces).
It must not be used for any deployment, including applications, TCKs, tools, libraries or any other assets produced by Specification Projects.

The EFSP takes precedence in cases where this document is silent. The primacy of the EFSP notwithstanding, this document takes precedence in all matters related to Specification development undertaken by Specification Projects within the purview of the Jakarta EE Working Group.