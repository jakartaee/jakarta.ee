---
title: "Guide to the Jakarta EE Specification Process"
date: "2021-03-04T00:00:00+00:00"
layout: "single"
aliases:
    - committees/specification/guide/
---

## Content

- [Introduction]({{< ref "#intro" >}})
- [Creation Review]({{< ref "#creation" >}})
- [Plan Review]({{< ref "#plan" >}})
- [Progress Review]({{< ref "#progress" >}}) *(optional)*
- [Release Review]({{< ref "#release" >}})
- [Service Release]({{< ref "#service" >}})

## Introduction {#intro}

This guide is a step-by-step practical guide to help Jakarta EE Specification projects navigate the steps of the Jakarta EE Specification Process ([JESP](https://jakarta.ee/about/jesp/)). 
It is meant as a helpful tool, so **if in doubt, alway refer to the [JESP](https://jakarta.ee/about/jesp/) for completeness**. Please do not hesitate to contact the [Specification Committee](mailto:jakarta.ee-spec@eclipse.org) if you have any questions or comments about anything related to the development of Jakarta EE Specifications.

## Creation Review {#creation}

![Creation Review](JESP_creation-review.png)

* A Jakarta Specification project is created as any other project under the Eclipse Development Process ([EDP](https://www.eclipse.org/projects/dev_process/)).
* A Jakarta Specification must be approved by the Specification Committee.

### Steps Involved

1. Create a Project Proposal (*).
2. Submit a Pull Request to the [Jakarta EE Specifications repository](https://github.com/jakartaee/specifications) using the **[creation review template](https://github.com/jakartaee/specifications/blob/master/creation_review_pr_template.md)**.
3. Send an email to the [Specification Committee](mailto:jakarta.ee-spec@eclipse.org) to request a creation review.

(*) It may be a good idea to socialize the idea with the Specification Committee to solicit support before proceeding with the project creation.

## Plan Review {#plan}

![Plan Review](JESP_plan-review.png)

* Each specification project needs to engage in a Plan Review prior to any extensive development effort in support of a new Specification Version. 

### Steps Involved

1. Submit a Pull Request to the [Jakarta EE Specifications repository](https://github.com/jakartaee/specifications) using the **[plan review template](https://github.com/jakartaee/specifications/blob/master/plan_review_pr_template.md)**.
2. Send an email to the [Specification Committee](mailto:jakarta.ee-spec@eclipse.org) to request a plan review.

## Progress Review {#progress}

![Progress Review](JESP_progress-review.png)

* A progress review can be initiated by the project when they want to inform the specification committee about their progress, but are not ready for a release yet.
* A progress review may be requested by the specification committee if no progress has been made in 12 months.

### Steps Involved

1. Submit a Pull Request to the [Jakarta EE Specifications repository](https://github.com/jakartaee/specifications) using the **[progress review template](https://github.com/jakartaee/specifications/blob/master/progress_review_pr_template.md)**.
2. Send an email to the [Specification Committee](mailto:jakarta.ee-spec@eclipse.org) to request a plan review.

## Release Review {#release}

![Release Review](JESP_release-review.png)

* A final version of a specification cannot be made generally available until after engaging in a successful release review (with corresponding super-majority approval from the specification committee).

### Steps Involved

1. Submit a Pull Request to the [Jakarta EE Specifications repository](https://github.com/jakartaee/specifications) using the **[release review template](https://github.com/jakartaee/specifications/blob/master/pull_request_template.md)**.
2. Send an email to the [Specification Committee](mailto:jakarta.ee-spec@eclipse.org) to request a release review.

## Service Release {#service}

* There is no formal release review required for a Specification service release (x.y.z) as long as the JESP definition of a “service release” is adhered to.
* That means that no functionality changes or increase in IP scope are permitted in a service release. 

### Steps Involved

1. Submit a Pull Request to the [Jakarta EE Specifications repository](https://github.com/jakartaee/specifications) using the **[service release template](https://github.com/jakartaee/specifications/blob/master/service_release_pr_template.md)**.
2. Send an email to the [Specification Committee](mailto:jakarta.ee-spec@eclipse.org) to announce that the PR is ready for review.