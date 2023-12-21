---
title: "为何选择 Jakarta EE?"
date: 2022-10-20T14:49:08-04:00
description: "选择 Jakarta EE 的诸多理由"
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
            <h1 class="jumbotron-title text-center">为何选择 Jakarta EE</h1>
        </div>
        <div class="jumbotron-graphic-container">
            <div class="jumbotron-graphic-breakout-container">
                <div class="jumbotron-graphic-wrapper container">
                    <div class="jumbotron-graphic-bg">
                        <img class="jumbotron-graphic-placeholder" src="images/video-placeholder.jpg" alt="" />
                        <div class="jumbotron-graphic-play-wrapper">
                            <button class="jumbotron-graphic-play" type="button" data-toggle="modal" data-target="#video-modal-why-jakarta-ee" aria-label="点击视频了解为什么选择 Jakarta EE">
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

{{< pages/about/why-jakarta-ee/split-section
    id="standard"
    heading="Jakarta EE"
    subheading="是标准"
    image="images/standard-image.jpg"
    image_wrapper_class="graph-pattern graph-pattern-standard"
    icon="images/icons/standard-icon.svg"
>}}

Jakarta EE是一套企业Java应用程序开发的规范标准，其稳定性、可移植性和向后兼容性使其得到了广泛的理解和采纳。

但成为标准并不意味着僵硬不变。Jakarta EE是模块化的-能够适应不同的平台和配置文件，以适应世界各地不同组织的需要。Jakarta EE使您能够独立或一起使用各个规范。根据您的应用程序类型和需求，您可以选择使用Jakarta EE Platform、Jakarta EE Web Profile或Jakarta EE Core Profile。

{{</ pages/about/why-jakarta-ee/split-section >}}

{{< pages/about/why-jakarta-ee/split-section
    id="ubiquitous"
    class="row-dark"
    heading="Jakarta EE"
    subheading="无所不在"
    image="images/ubiquitous-image.jpg"
    image_wrapper_class="graph-pattern graph-pattern-ubiquitous"
    icon="images/icons/ubiquitous-icon.svg"
    reverse="true"
>}}

供应商中立的Jakarta EE社区目前正在努力保持企业级Java的后端应用程序在各个行业中的广泛运行。有很多您耳熟能详的产品，如Jetty、Tomcat、Jersey和Spring等，都依赖于Jakarta EE技术。

The [Jakarta EE 兼容产品](/zh/compatibility/) 页面展示了Jakarta EE Platform 和 Profile specifications 的兼容实现.

- ![Eclipse Jetty](images/logos/jetty.png)
- ![Tomcat](images/logos/tomcat.svg)
- ![Jersey](images/logos/jersey.png)
- ![Spring](images/logos/spring.svg)

除了这些产品之外，还有更多的产品正在实现一些单独的规范。Apache Tomcat实现了四个Jakarta EE规范，Spring Boot嵌入Apache Tomcat、Eclipse Jetty或Undertow作为运行时。

Eclipse Jetty、Eclipse IDE、MicroProfile和其他实现MicroProfile的行业框架是依赖Jakarta EE进行云原生企业Java应用程序构建的良好示例。

除了这些实现之外，业界越来越认识到Jakarta EE提供了任何其他Java框架都无法提供的具有重要战略意义的特性和功能的组合。
    
{{</ pages/about/why-jakarta-ee/split-section >}}

{{< pages/about/why-jakarta-ee/split-section 
    id="continuation" 
    heading="Jakarta EE" 
    subheading="是传承" 
    image="images/continuation-image.jpg" 
    image_wrapper_class="graph-pattern graph-pattern-1" 
    icon="images/icons/continuation-icon.svg" 
>}}

Java是业界流行的编程语言之一，在稳定性、兼容性和可移植性方面享有无与伦比的声誉。随着Java的兴起，Java EE被建立为企业Java应用程序开发的一套规范。在过去的十年里，Java EE已经成为应用程序开发人员的首选技术。绝大多数财富500强公司都在Java EE上运行其关键业务应用，现在，Jakarta EE出现了——带给业界一种开放的、与供应商无关的、社区驱动的应用程序开发技术方法。

大多数开发人员已经知道Jakarta EE是Java EE的延续，Jakarta EE专注于应用程序基础架构的现代化以满足企业的上云需求。然而，开发者们可能没有完全意识到Jakarta EE技术在行业中的深入应用，也没有意识到为什么领先的组织选择Jakarta EE作为云原生Java应用程序。

企业架构中有多种策略和设计，如微服务、单体式架构应用程序等。Jakarta EE带给企业创新与稳定性，并保证长期支持您的公司所有需求。

{{</ pages/about/why-jakarta-ee/split-section >}}

{{< pages/about/why-jakarta-ee/split-section
    class="row-dark"
    id="innovative"
    heading="Jakarta EE"
    subheading="是创新"
    image="images/innovative-image.jpg"
    icon="images/icons/innovative-icon.svg"
    reverse="true"
>}}

Jakarta EE为云原生Java创新打开了大门，允许全球贡献者以社区为平台不断构建和塑造开源Jakarta EE的未来。

Jakarta EE 10现已推出，引入了用于构建现代化、简化和轻量级云原生Java应用程序的功能，为企业Java技术的演进和创新提供了一个新的基线，采用开放、供应商中立、社区驱动的过程。

Jakarta EE 10发布了一个新的配置规范，即Jakarta EE Core Profile 10，它使得现代化和轻量级Java应用程序和微服务的开发成为可能。新的Core Profile提供了一组适用于微服务开发的较小运行时的

Jakarta EE平台规范的子集，包括用于构建Jakarta EE应用程序的创新性CDI-Lite规范。CDI-Lite允许使用无反射编程模型，通过提供构建兼容扩展来实现本地编译。

Jakarta EE已准备好进行创新，并始终寻求社区反馈。它采用开放透明的过程来推动平台前进，包括公司、Java用户组和个人都已经参与其中。

{{</ pages/about/why-jakarta-ee/split-section >}}

{{< grid/div class="info-cards container flex-center padding-top-60 padding-bottom-20" isMarkdown="false" >}}
    {{< pages/about/why-jakarta-ee/info-card 
        title="了解最新版本" 
        icon="images/icons/latest-release-icon.svg"
        href="/zh/release"
        link_text="Read More"  
    >}}
        请查看所有Jakarta EE发布版本，并在相关新闻发布中了解相关新特性。
    {{</ pages/about/why-jakarta-ee/info-card >}}
    
    {{< pages/about/why-jakarta-ee/info-card 
        title="加入我们"
        icon="images/icons/get-involved-icon.svg"
        href="/zh/community/get-involved"
        link_text="Learn More"
        inverted="true"
    >}}
        了解更多关于如何影响云原生Java未来的信息。
    {{</ pages/about/why-jakarta-ee/info-card >}}

    {{< pages/about/why-jakarta-ee/info-card
        title="起步"
        icon="images/icons/browse-specifications-icon.svg"
        href="https://start.jakarta.ee/"
        link_text="现在开始"
    >}}
        生成一个 Jakarta EE 项目作为开始。
    {{</ pages/about/why-jakarta-ee/info-card >}}

    {{< pages/about/why-jakarta-ee/info-card 
        title="下载兼容产品"
        icon="images/icons/compatible-products-icon.png"
        href=""
        link_text="Read More"
        inverted="true"
    >}}
        查看所有Jakarta EE 兼容认证产品，以帮助构建您的云原生应用程序。
    {{</ pages/about/why-jakarta-ee/info-card >}}

{{</ grid/div >}}

{{< video-modal id="video-modal-why-jakarta-ee" url="dKzAOEc4obw" >}}