---
title: "Why Jakarta EE?"
date: 2022-10-20T14:49:08-04:00
description: ""
categories: []
keywords: []
slug: ""
aliases: []
toc: false
draft: false
hide_breadcrumb: true
hide_sidebar: true
hide_page_title: true
headline: null
header_wrapper_class: header-why-jakarta-ee
jumbotron_class: ' '
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
                        <img class="jumbotron-graphic-placeholder" src="/images/about/why-jakarta-ee/video-placeholder.jpg" />
                        <div class="jumbotron-graphic-play-wrapper">
                            <button class="jumbotron-graphic-play" type="button" data-toggle="modal" data-target="#video-modal-why-jakarta-ee">
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

{{< pages/about/why-jakarta-ee/table-of-contents section_ids="continuation,ubiquitous,standard,innovative" >}}

{{< pages/about/why-jakarta-ee/section 
    id="continuation" 
    heading="Jakarta EE" 
    subheading="is Continuation" 
    image="images/continuation-image.jpg" 
    image_wrapper_class="graph-pattern graph-pattern-1" 
    icon="images/continuation-icon.svg" 
>}}
    {{% markdown %}}

Java is one of the prevalent programming languages in the industry, with an unbeaten reputation for stability, compatibility, and portability. With the rise of Java, Java EE was established as a set of specifications for enterprise Java application development. Java EE has become an application developer’s go-to technology over the past decade. A vast majority of Fortune 500 companies are running their mission-critical applications on Java EE, and now, Jakarta EE - they are choosing an open, vendor-neutral, and community-driven approach to application development technologies.

Most developers already know that Jakarta EE is the continuation of Java EE, focusing on modernizing its foundation for today’s needs of cloud 
architectures. However, they may not be fully aware of how ingrained the technologies continue to be in the industry, or why leading organizations are choosing Jakarta EE for cloud native Java applications.

There are several strategies and designs in enterprise architecture, such as microservices, monolithic applications, etc. Jakarta EE brings stability with innovation and the guarantee of long-term support for all your company needs.

    {{%/ markdown %}}
{{</ pages/about/why-jakarta-ee/section >}}

{{< pages/about/why-jakarta-ee/section
    id="ubiquitous"
    class="row-dark"
    heading="Jakarta EE"
    subheading="is Ubiquitous"
    image="images/ubiquitous-image.jpg"
    image_wrapper_class="graph-pattern graph-pattern-ubiquitous"
    icon="images/ubiquitous-icon.svg"
    reverse="true"
>}}
    {{% markdown %}}

The Jakarta EE vendor-neutral community is currently at work to keep the back-end of enterprise java applications running in various industries. Products you may know - such as Jetty, Tomcat, Jersey and Spring - all rely on Jakarta EE technologies.
The [Jakarta EE Compatible products](/compatibility/) are implementing Jakarta EE Platform and profile specifications.

    {{%/ markdown %}}
    {{< pages/about/why-jakarta-ee/technologies >}}
    {{% markdown %}}

In addition to these products, there are many more that are implementing some of the individual specifications. Apache Tomcat implements four Jakarta EE specifications,
Spring Boot embeds Apache Tomcat, Eclipse Jetty, or Undertow as a runtime.
Eclipse Jetty, the Eclipse IDE, MicroProfile, and other industry frameworks that implement MicroProfile are a good example of technologies that rely on Jakarta EE for their cloud native enterprise Java applications.

Beyond these implementations, the industry is increasingly recognizing that Jakarta EE delivers a combination of strategically important features and functions that is not available in any other Java framework.
    
    {{%/ markdown %}}
{{</ pages/about/why-jakarta-ee/section >}}


{{< pages/about/why-jakarta-ee/section
    id="standard"
    heading="Jakarta EE"
    subheading="is the Standard"
    image="images/standard-image.jpg"
    image_wrapper_class="graph-pattern graph-pattern-standard"
    icon="images/standard-icon.svg"
>}}
    {{% markdown %}}

Jakarta EE is the standard, a set of specifications for enterprise Java application development. It is well-understood and widely accepted because of its stability, portability, and backwards compatibility.

But being the standard does not mean being rigid. Jakarta EE is modular - capable of being adapted to fit different platforms and profiles for different organisations all over the world. Jakarta EE enables you to use the individual specifications independently or together.  Depending on your application type and needs you may choose to utilise the Jakarta EE Platform, Jakarta EE Web Profile or Jakarta EE Core Profile.

    {{%/ markdown %}}
{{</ pages/about/why-jakarta-ee/section >}}

{{< pages/about/why-jakarta-ee/section
    class="row-dark"
    id="innovative"
    heading="Jakarta EE"
    subheading="is Innovative"
    image="images/innovative-image.png"
    icon="images/innovative-icon.svg"
    reverse="true"
>}}
    {{% markdown %}}

Jakarta EE opens the door to cloud native Java Innovation, and allows global contributors to continuously build and shape the open-source future of Jakarta EE as a community. 

Jakarta EE 10 in now available and introduces features for building modernized, simplified, and lightweight cloud native Java applications, delivering a new baseline for the evolution and innovation of enterprise Java technologies under an open, vendor-neutral, community-driven process. 

The Jakarta EE 10 release defines a new profile specification with Jakarta EE Core Profile 10, which enables the development of modernized and lightweight Java applications and microservices. The new Core Profile provides a subset of Jakarta EE Platform specifications that targets smaller runtimes suitable for microservices development, including an innovative new CDI-Lite specification for building Jakarta EE applications. CDI-Lite allows a reflection-free programing model that enables compiling to native by providing build compatible extensions.
 
Jakarta EE is ready to innovate and always looking for community feedback. It has an open and transparent process to keep the platform forward; it includes companies, Java User Groups, and individuals in this process. 

    {{%/ markdown %}}
{{</ pages/about/why-jakarta-ee/section >}}

{{< grid/div class="container flex-center" isMarkdown="false" >}}
    {{< pages/about/why-jakarta-ee/info-card 
        title="Find the Latest Release" 
        icon="latest-release-icon.png"
        href="/release"
        link_text="Read More"  
    >}}
See all the Jakarta EE release versions and find out what’s new in the related press release.
    {{</ pages/about/why-jakarta-ee/info-card >}}
{{</ grid/div >}}

{{< video-modal id="video-modal-why-jakarta-ee" url="dKzAOEc4obw" >}}