---
title: "Jakarta EEを使用する理由"
date: 2022-10-20T14:49:08-04:00
description: "Jakarta EEを選ぶ理由"
tags: ['仕様', 'jakarta ee', 'java ee']
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
            <h1 class="jumbotron-title text-center">Jakarta EEを使用する理由</h1>
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

{{< pages/about/why-jakarta-ee/table-of-contents section_ids="continuation,ubiquitous,standard,innovative" >}}

{{< pages/about/why-jakarta-ee/split-section 
    id="continuation" 
    heading="Jakarta EE" 
    subheading="is Continuation" 
    image="images/continuation-image.jpg" 
    image_wrapper_class="graph-pattern graph-pattern-1" 
    icon="images/icons/continuation-icon.svg" 
>}}

Javaは業界で広く普及しているプログラミング言語の1つであり、安定性、互換性、および移植性に関して比類のない評判を得ています。Javaの台頭とともに、Java EEはエンタープライズJavaアプリケーション開発のための一連の仕様として確立されました。Java EEは、この10年間でアプリケーション開発者の主要な技術になりました。Fortune 500企業の大半がミッションクリティカルアプリケーションをJava EEで、そして現在ではJakarta EEで走行しています。アプリケーション開発技術に対するオープンでベンダー中立、コミュニティ主導のアプローチを選択しています。

ほとんどの開発者は、Jakarta EEが、Java EEの後継であること、現在のクラウドアーキテクチャのニーズに対応する基盤のモダナイゼーションに注力していることを既に 
認識しています。しかし、この技術が業界にどのように浸透し続けているか、また主要な組織がクラウドネイティブJavaアプリケーション用にJakarta EEを選んでいる理由を十分に認識していない可能性があります。

エンタープライズアーキテクチャには、マイクロサービス、モノリシックアプリケーションなど、いくつかの戦略と設計があります。Jakarta EEは、イノベーションによる安定性と、企業のあらゆるニーズに対する長期サポートの保証を提供します。

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

ベンダー中立のコミュニティであるJakarta EEは現在、さまざまな業界でエンタープライズJavaアプリケーションのバックエンドを実行させておくために取り組んでいます。Jetty、Tomcat、Jersey、Springなど、一度は耳にしたことのある商品は、すべてJakarta EE技術に依存しています。
[Jakarta EE互換製品](/compatibility/)は、Jakarta EEプラットフォームとプロファイル仕様を実装しています。

- ![Eclipse Jetty](images/logos/jetty.png)
- ![Tomcat](images/logos/tomcat.svg)
- ![Jersey](images/logos/jersey.png)
- ![Spring](images/logos/spring.svg)

これらの製品に加え、コンポーネント仕様の一部を実装している製品も多数あります。Apache Tomcatは、4つのJakarta EE仕様を実装し、
Spring Bootは、Apache Tomcat、Eclipse Jetty、またはUndertowをランタイムとして組み込んでいます。
Eclipse Jetty、Eclipse IDE、MicroProfile、およびMicroProfileを実装するその他の業界フレームワークは、クラウドネイティブエンタープライズJavaアプリケーションをJakarta EEに依存している技術のよい例です。

これらの実装に加えて、業界では、Jakarta EEが他のJavaフレームワークでは利用できない戦略的に重要な特徴と機能を組み合わせて提供するという認識がますます高まっています。
    
{{</ pages/about/why-jakarta-ee/split-section >}}


{{< pages/about/why-jakarta-ee/split-section
    id="standard"
    heading="Jakarta EE"
    subheading="is the Standard"
    image="images/standard-image.jpg"
    image_wrapper_class="graph-pattern graph-pattern-standard"
    icon="images/icons/standard-icon.svg"
>}}

Jakarta EEは、エンタープライズJavaアプリケーション開発の標準仕様群です。安定性、移植性、および下位互換性により、よく理解されて、広く受け入れられています。

しかし、標準であることは硬直的であることを意味しません。Jakarta EEはモジュラー型で、世界中のさまざまな組織のさまざまなプラットフォームやプロフィールに適合させることができます。Jakarta EEは、コンポーネント仕様を独立に使用することも、組み合わせて使用することもできます。アプリケーションの種類とニーズに応じて、Jakarta EEプラットフォーム、Jakarta EE Webプロファイル、またはJakarta EE Coreプロファイルを使用できます。

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

Jakarta EEは、クラウドネイティブJava Innovationへの扉を開き、グローバルなコントリビューターがコミュニティとしてJakarta EEのオープンソースの未来を継続的に構築し、形作ることを可能にします。 

現在利用可能なJakarta EE 10では、モダナイズされたシンプルで軽量なクラウド ネイティブJavaアプリケーションを構築するための機能が導入されました。これにより、オープンで、ベンダー中立で、コミュニティ主導のプロセスの下、エンタープライズJava技術の進化とイノベーションの新しい基礎が提供されます。 

Jakarta EE 10リリースは、新しいプロファイルである Jakarta EE Core Profile 10を定義し、モダナイズされた軽量Javaアプリケーションおよびマイクロサービスの開発を可能にします。この新しいCoreプロファイルは、Jakarta EEアプリケーション構築のためのイノベーティブな新しいCDI-Lite仕様など、マイクロサービス開発に適したより小さなランタイムを対象としたJakarta EE仕様のサブセットを提供します。CDI-Liteは、ビルド互換の拡張機能を提供することで、ネイティブへのコンパイルを可能にするリフレクションフリーのプログラミングモデルを可能にします。
 
Jakarta EEは、イノベーションの準備が整っており、常にコミュニティからのフィードバックを求めています。このプロセスには、企業、Javaユーザーグループ、個人が参加しており、プラットフォームを前進させるためのオープンで透明性の高いプロセスとなっています。 

{{</ pages/about/why-jakarta-ee/split-section >}}

{{< grid/div class="info-cards container flex-center padding-top-60 padding-bottom-20" isMarkdown="false" >}}
    {{< pages/about/why-jakarta-ee/info-card 
        title="最新版を確認する" 
        icon="images/icons/latest-release-icon.svg"
        href="/release"
        link_text="Read More"  
    >}}
        すべてのJakarta EEリリースのバージョンを確認し、関連するプレスリリースの新機能を確認してください。
    {{</ pages/about/why-jakarta-ee/info-card >}}
    
    {{< pages/about/why-jakarta-ee/info-card 
        title="参加する"
        icon="images/icons/get-involved-icon.svg"
        href="/community/get-involved"
        link_text="Learn More"
        inverted="true"
    >}}
        クラウドネイティブJavaの未来に影響を与える方法の詳細をご覧ください。
    {{</ pages/about/why-jakarta-ee/info-card >}}

    {{< pages/about/why-jakarta-ee/info-card
        title="仕様ドキュメントを確認する"
        icon="images/icons/browse-specifications-icon.svg"
        href="/ja/specifications"
        link_text="Browse Now"
    >}}
        Jakarta EEプラットフォーム、プロファイル、およびコンポーネント仕様ドキュメントを検索します。
    {{</ pages/about/why-jakarta-ee/info-card >}}

    {{< pages/about/why-jakarta-ee/info-card 
        title="認定製品をダウンロードする"
        icon="images/icons/compatible-products-icon.png"
        href=""
        link_text="Read More"
        inverted="true"
    >}}
        クラウドネイティブアプリケーションの構築に役立つ、すべてのJakarta EE互換の認定製品をご覧ください。
    {{</ pages/about/why-jakarta-ee/info-card >}}

{{</ grid/div >}}

{{< video-modal id="video-modal-why-jakarta-ee" url="dKzAOEc4obw" >}}
