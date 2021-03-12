---
title: "Jakarta EE Compatible Implementations and Compatible Products"
date: "2021-03-11T00:00:00+00:00"
---


**Jakarta EE** is a set of open [specifications](https://jakarta.ee/specifications/ "Jakarta EE Specifications") used for enterprise Java application development. It is a continuation of Java EE technology that gathers the wide community of Java developers interested in advancing the specifications for future cloud native Java enterprise applications. Each specification release includes its respective Technology Compatibility Kit (TCK). You can find a link to the TCK on the appropriate specification release page, for example see [Jakarta EE Platform 9.0](https://jakarta.ee/specifications/platform/9/) or in the case of individual specification see [Jakarta Authentication 2.0](https://jakarta.ee/specifications/authentication/2.0/).

The Jakarta EE Working Group enables highlighting all **compatible implementations** of the individual specifications. In addition, the Jakarta EE Working Group highlights **compatible products**, which are compatible implementations of either the Jakarta EE Platform or the Jakarta EE Web Profile specifications. 

The first step in having an implementation be designated as Jakarta EE compatible is ensuring it passes the appropriate specification respective TCK in order to demonstrate compatibility with their corresponding specifications and is compliant with the [Eclipse Foundation Technology Compatibility Kit License](https://www.eclipse.org/legal/tck.php) for the terms of use. This assumes the implementer has reviewed all compatibility requirements in the respective specification, including those in the TCK documentation, notably those in the TCK User Guide.

The second step, once the TCK is successfully passed, is letting the world know about it. That is,  
1.   Let the specification project team know by filing a GitHub issue in order to get their acknowledgement and approval, and 
2.   Help the Jakarta EE Working Group get your **compatible implementation** of a specification listed on the appropriate specification page by creating a PR. In the case of **compatible products**, implementations of either the Jakarta EE Platform specification and/or the Jakarta EE Web Profile specification will be listed on the Compatible Products [page](https://jakarta.ee/compatibility/). 

There are additional steps required, including membership in the Jakarta EE working group. Products listed on the Compatible Products pages are welcome to use Jakarta EE Compatible logo per [Jakarta EE Trademark Guidelines](https://jakarta.ee/legal/trademark_guidelines/).


### How to Get Listed as a Compatible Implementation of an Individual Jakarta EE Specification
 
To get your implementation listed as Compatible Implementation page on an individual Jakarta EE component specification page here is what need to be done:
1.   Follow the [Jakarta EE TCK process](https://jakarta.ee/committees/specification/tckprocess/) to completely run and satisfy all of the requirements of the applicable TCK test and be in compliance with [Eclipse Foundation TCK License](https://www.eclipse.org/legal/tck.php)
  a. Publish the TCK results and maintain the public listing of your TCK results for as long as you continue to claim the specification compatibility.
  b. Email the TCK results to [tck@eclipse.org](mailto:tck@eclipse.org)
2.	File a [Certification Request](https://raw.githubusercontent.com/jakartaee/specification-committee/master/compatibility-certification-request.md) Issue with the specification project in the [GitHub repository](https://github.com/eclipse-ee4j/)
3.	Open a [GitHub Pull Request (PR)](https://github.com/jakartaee/specifications/pulls) against the Jakarta EE Specifications repository and fill in the required information


### How to Get Listed as a Compatible Product of a Jakarta EE Platform or Jakarta EE Web Profile 

To get your product listed on the Compatible Products page and in order to be able to use Jakarta EE Compatible logo, please follow these steps:
1.	Branding and compatible logo requirements
  a. [Join](https://jakarta.ee/membership/) the Jakarta EE Working Group
  b. Get familiar with [Jakarta EE Trademark Guidelines](https://jakarta.ee/legal/trademark_guidelines/).
  c. Execute (digitally sign) the [Jakarta EE Compatibility Trademark License Agreement](https://app.hellosign.com/s/DQ9uVw4b) (or print the [License Agreement PDF](https://jakarta.ee/legal/trademark_guidelines/jakarta-ee-trademark-license.pdf) and return the signed agreement to [emo-records@eclipse.org](mailto:emo-records@eclipse.org))
2.	Certification and listing on jakarta.ee Compatible Product pages requirements 
  a. Follow the [Jakarta EE TCK process](https://jakarta.ee/committees/specification/tckprocess/) to completely run and satisfy all of the requirements of the applicable TCK test
    i. Publish the TCK results and maintain the public listing of your TCK results for as long as you continue to claim compatibility.
    ii. Email the TCK results to [tck@eclipse.org](mailto:tck@eclipse.org)
  b. File a [Certification Request](https://raw.githubusercontent.com/jakartaee/specification-committee/master/compatibility-certification-request.md) with a specification project in the [GitHub repository](https://github.com/eclipse-ee4j/jakartaee-platform)
  c. Open a [GitHub issue](https://github.com/jakartaee/jakarta.ee/issues/new?template=compatibility.md) against the Jakarta EE Compatible Products repository and fill in the required information
