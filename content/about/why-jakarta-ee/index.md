---
title: Why Jakarta EE?
seo_title: Why Jakarta EE for Enterprise Java Application Development
date: 2022-10-20T14:49:08-04:00
description: >
  Discover the benefits of Jakarta EE for enterprise Java application
  development. Move your apps to the cloud & enjoy stability, compatibility, &
  long-term support.
tags: ['specification', 'jakarta ee', 'java ee']
hide_breadcrumb: true
hide_sidebar: true
hide_page_title: true
headline: null
header_wrapper_class: header-why-jakarta-ee
jumbotron_class: col-lg-24
custom_jumbotron_class: jumbotron-why-jakarta-ee
custom_jumbotron: |
    <div class="jumbotron-why-jakarta-ee-container">
        <div class="jumbotron-title-container">
            <h1 class="jumbotron-title text-center">Why Jakarta EE</h1>
        </div>
        <div class="jumbotron-graphic-container">
            <div class="jumbotron-graphic-breakout-container">
                <div class="jumbotron-graphic-wrapper container">
                    <div class="jumbotron-graphic-bg">
                        <img class="jumbotron-graphic-placeholder" src="images/video-placeholder.jpg" alt="" />
                        <div class="jumbotron-graphic-play-wrapper">
                            <button class="jumbotron-graphic-play" type="button" data-toggle="modal" data-target="#video-modal-why-jakarta-ee" aria-label="Open an explainer video for why you should choose Jakarta EE">
                                <i class="fa fa-play-circle"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
container: container-fluid container-why-jakarta-ee
layout: single
page_css_file: css/why-jakarta-ee-styles.css
disable_header_bg: true
---

{{< pages/about/why-jakarta-ee/table-of-contents section_ids="standard,ubiquitous,continuation,innovative" >}}

{{< pages/about/why-jakarta-ee/split-section
    id="standard"
    heading="Jakarta EE"
    subheading="is the Standard"
    image="images/standard-image.jpg"
    image_wrapper_class="graph-pattern graph-pattern-standard"
    icon="images/icons/standard-icon.svg"
>}}

Jakarta EE is the standard, a set of [specifications](/specifications) for
enterprise Java application development. It is well-understood and widely
accepted because of its stability, portability, and backwards compatibility.

But being the standard does not mean being rigid. Jakarta EE avoids single
vendor lock-in and is modular - capable of being adapted to fit different
platforms and profiles for different organisations all over the world. Jakarta
EE enables you to use the individual specifications independently or together.
Depending on your application type and needs you may choose to utilise the
Jakarta EE Platform, Jakarta EE Web Profile or Jakarta EE Core Profile.

{{</ pages/about/why-jakarta-ee/split-section >}}

{{< pages/about/why-jakarta-ee/split-section
    id="ubiquitous"
    class="row-dark"
    heading="Jakarta EE"
    subheading="is Ubiquitous"
    image="images/ubiquitous-image.jpg"
    image_wrapper_class="graph-pattern graph-pattern-ubiquitous"
    icon="images/icons/ubiquitous-icon.svg"
    reverse="true"
>}}

The Jakarta EE vendor-neutral community is currently at work to keep the
back-end of enterprise java applications running in various industries.
Products you may know - such as Jetty, Tomcat, Jersey and Spring - all rely on
Jakarta EE technologies. The [Jakarta EE Compatible products](/compatibility/)
are implementing Jakarta EE Platform and profile specifications.

- ![Eclipse Jetty](images/logos/jetty.png)
- ![Tomcat](images/logos/tomcat.svg)
- ![Jersey](images/logos/jersey.png)
- ![Spring](images/logos/spring.svg)

In addition to these products, there are many more that are implementing some
of the individual specifications. Apache Tomcat implements four Jakarta EE
specifications, Spring Boot embeds Apache Tomcat, Eclipse Jetty, or Undertow as
a runtime. Eclipse Jetty, the Eclipse IDE, MicroProfile, and other industry
frameworks that implement MicroProfile are a good example of technologies that
rely on Jakarta EE for their cloud native enterprise Java applications.

Beyond these implementations, the industry is increasingly recognizing that
Jakarta EE delivers a combination of strategically important features and
functions that is not available in any other Java framework.
    
{{</ pages/about/why-jakarta-ee/split-section >}}

{{< pages/about/why-jakarta-ee/split-section 
    id="continuation" 
    heading="Jakarta EE" 
    subheading="is Continuation" 
    image="images/continuation-image.jpg" 
    image_wrapper_class="graph-pattern graph-pattern-1" 
    icon="images/icons/continuation-icon.svg" 
>}}

Java is one of the prevalent programming languages in the industry, with an
unbeaten reputation for stability, compatibility, and portability. With the
rise of Java, Java EE was established as a set of
[specifications](/specifications) for enterprise Java application development.
Java EE has become an application developer’s go-to technology over the past
decade. A vast majority of Fortune 500 companies are running their
mission-critical applications on Java EE, and now, Jakarta EE - they are
choosing an open, vendor-neutral, and community-driven approach to application
development technologies.

Most developers already know that Jakarta EE is the continuation of Java EE,
focusing on modernizing its foundation for today’s needs of cloud
architectures. However, they may not be fully aware of how ingrained the
technologies continue to be in the industry, or why leading organizations are
choosing Jakarta EE for cloud native Java applications.

There are several strategies and designs in enterprise architecture, such as
microservices, monolithic applications, etc. Jakarta EE brings stability with
innovation and the guarantee of long-term support for all your company needs.

{{</ pages/about/why-jakarta-ee/split-section >}}

{{< pages/about/why-jakarta-ee/split-section
    class="row-dark"
    id="innovative"
    heading="Jakarta EE"
    subheading="is Innovative"
    image="images/innovative-image.jpg"
    icon="images/icons/innovative-icon.svg"
    reverse="true"
>}}

Jakarta EE opens the door to cloud native Java Innovation, and allows global
contributors to continuously build and shape the open-source future of Jakarta
EE as a community. 

Jakarta EE 10 in now available and introduces features for building modernized,
simplified, and lightweight cloud native Java applications, delivering a new
baseline for the evolution and innovation of enterprise Java technologies under
an open, vendor-neutral, community-driven process. 

The Jakarta EE 10 release defines a new profile specification with Jakarta EE
Core Profile 10, which enables the development of modernized and lightweight
Java applications and microservices. The new Core Profile provides a subset of
Jakarta EE Platform specifications that targets smaller runtimes suitable for
microservices development, including an innovative new CDI-Lite specification
for building Jakarta EE applications. CDI-Lite allows a reflection-free
programing model that enables compiling to native by providing build
compatible extensions.
 
Jakarta EE is ready to innovate and always looking for community feedback. It
has an open and transparent process to keep the platform forward; it includes
companies, Java User Groups, and individuals in this process. 

{{</ pages/about/why-jakarta-ee/split-section >}}

{{< grid/div class="info-cards container flex-center padding-top-60 padding-bottom-20" isMarkdown="false" >}}
    {{< pages/about/why-jakarta-ee/info-card 
        title="Find the Latest Release" 
        icon="images/icons/latest-release-icon.svg"
        href="/release"
        link_text="Read More"  
    >}}
        See all the Jakarta EE release versions and find out what’s new in the
        related press release.
    {{</ pages/about/why-jakarta-ee/info-card >}}
    
    {{< pages/about/why-jakarta-ee/info-card 
        title="Get Involved"
        icon="images/icons/get-involved-icon.svg"
        href="/community/get-involved"
        link_text="Learn More"
        inverted="true"
    >}}
        Find out more about how you can influence the future of cloud native
        Java.
    {{</ pages/about/why-jakarta-ee/info-card >}}

    {{< pages/about/why-jakarta-ee/info-card
        title="Get Started"
        icon="images/icons/browse-specifications-icon.svg"
        href="https://start.jakarta.ee/"
        link_text="Start Now"
    >}}
        Generate a Jakarta EE project to get started.
    {{</ pages/about/why-jakarta-ee/info-card >}}

    {{< pages/about/why-jakarta-ee/info-card 
        title="Download Compatible Products"
        icon="images/icons/compatible-products-icon.png"
        href=""
        link_text="Read More"
        inverted="true"
    >}}
        See all Jakarta EE Compatible certified products to help build your
        cloud native application.
    {{</ pages/about/why-jakarta-ee/info-card >}}

{{</ grid/div >}}

{{< video-modal id="video-modal-why-jakarta-ee" url="dKzAOEc4obw" >}}
