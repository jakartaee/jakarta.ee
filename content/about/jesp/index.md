---
title: "Jakarta EE Specification Process"
date: 2021-01-14T13:00:00-04:00
---

Version 1.3. Effective January 14, 2021

The Jakarta EE Specification Process (JESP) is concerned with the Specification Process as it applies to Specification Projects operating under the purview of the Jakarta EE Working Group. 

The Jakarta EE Specification Committee hereby adopts the [Eclipse Foundation Specification Process v1.2 (EFSP)](https://www.eclipse.org/projects/efsp?version=1.2) as the Jakarta EE Specification Process with the following modifications:

* Any modification to or revision of this Jakarta EE Specification Process, including the adoption of a new version of the EFSP, must be approved by a Super-majority of the Specification Committee, including a Super-majority of the Strategic Members of the Jakarta EE Working Group, in addition to any other ballot requirements set forth in the EFSP.
* All specification committee approval ballot periods will have the minimum duration as outlined below (notwithstanding the exception process defined by the EFSP, these periods may not be shortened)
  * Creation Review: 7 calendar days;
  * Plan Review:  7 calendar days;
  * Progress Review: 14 calendar days;
  * Release Review: 14 calendar days;
  * Service Release Review: 14 calendar days; and
  * JESP Update: 7 calendar days.
* A ballot will be declared invalid and concluded immediately in the event that the Specification Team withdraws from the corresponding review.
* Specification Projects must engage in at least one Progress or Release Review per year while in active development.
* Service Releases (x.y.z)
  * A Service Release includes only minor changes and/or clarifications over a Major or Minor Release. Specifically, a Service Release must not include any functionality changes or increase in IP scope. A Specification Team may consult with their PMC and Specification Committee to determine precisely what constitutes a minor change and/or clarification.
  * A Specification Team must have engaged in a successful Release Review for a Major or Minor Release prior to engaging in a Service Release. No Progress or Release Review is required for a Service Release.

All development that modifies content in the `javax` namespace must be moved to a `jakarta` namespace. All `jakarta` namespace development must occur within the scope of a Specification Project operating under the purview of the Jakarta EE Working Group’s Specification Committee and must implement the process as defined by the most recently adopted revision of the JESP.

The EFSP takes precedence in cases where this document is silent. The primacy of the EFSP notwithstanding, this document takes precedence in all matters related to Specification development undertaken by Specification Projects within the purview of the Jakarta EE Working Group.
