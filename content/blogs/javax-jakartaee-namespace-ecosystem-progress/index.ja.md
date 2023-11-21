---
title: "javaxからjakarta名前空間に関するエコシステムの進捗状況"
date: 2022-08-31T09:00:00
summary: "Jakarta EEエコシステムは、さまざまなライブラリ、フレームワーク、サーバ、ツールをjavax名前空間からjakarta.ee名前空間に移行することに尽力してきました。この作業は、Jakarta EE 10の今後のリリースで本質的に完了します。JakartaEEの開発者は、各カテゴリーに幅広い選択肢があり、優れた選択肢を提供します。"
author: Martijn Verburg
email: martijn@londonjavacommunity.co.uk
---

 

## はじめに

2019年9月10日、Eclipse Foundationは、[Jakarta EE 8](https://jakarta.ee/release/8/)、フルプラットフォームとWebプロファイル仕様および関連するTechnology Compatibility Kit (TCK)のリリースを発表しました。これらの仕様は、Java EE 8仕様と完全に互換性がありました。それらには、同じAPIと同じプログラミングモデルを使用するJavadocが含まれていました。決定的な違いは、Eclipse Foundationが[Jakarta EE仕様プロセス](https://jakarta.ee/about/jesp/)と[Eclipse開発プロセス](https://www.eclipse.org/projects/dev_process/)の下でJakartaEE仕様を開発したことです。これらは、Java EEのJava Community Process (JCP)のオープンでコミュニティ主導の後継です。

名前空間の観点から見ると、Jakarta EE 8は、まだ「javax.*」という名前を使用しています。しかし、2020年12月8日のJakarta EE 9リリースでは、Jakarta EE仕様の「javax」に代わる名前空間として「jakarta.*」が導入されます。

この新しい名前空間をすべての実装(MicroProfile実装を含む)、Webサーバー、ミドルウェアツール、ビルドツール、IDE、およびフレームワークで実現するために、エコシステム全体で作業が開始されました。この作業の多くは、2021年5月25日のJakarta EE 9.1のリリースによって順調に進められたか、完了しましたが、まだいくつかのギャップがありました。

この作業は、Jakarta EE 10の今後のリリースで本質的に完了します。JakartaEEの開発者は、各カテゴリーに幅広い選択肢があり、優れた選択肢を提供します。

このブログ記事では（執筆時点 – 2022年9月）、移行の進行状況を概説しています。日々の開発者には、[JavaEE to Jakarta EE 10 Recipes](https://link.springer.com/book/10.1007/978-1-4842-8079-9)という本も役に立つかもしれません。

### フィードバックとエラッタ

何か問題が生じていますか？コメント欄でお知らせください！

## 互換実装

新しい「jakarta.*」名前空間をサポートする複数のJakarta EE 9およびJakarta EE 10の実装があります。

|**ベンダー/コミュニティ**|**実装/プロジェクト**|**移行済み?**|**jakarta名前空間に対応したバージョン**|
|:----|:----|:----|:----|
|Apache Software Foundation|TomEE|はい|9.0.0-M+|
|Eclipse Foundation|Glassfish|はい|6.0+|
|富士通|Enterprise Application Platform|進行中|1.1+|
|Payara|Payara|はい|6.2021.1.Alpha、プレビュー： 5.2020.5+|
|IBM|OpenLiberty|はい|21.0.0.12+|
|Red Hat|Wildfly|進行中|標準： NYI、プレビュー： 22+|

## Webサーバー

最も人気のあるWebサーバーも現在、新しい「jakarta.*」名前空間をサポートしています。

|**ベンダー/コミュニティ**|**実装/プロジェクト**|**移行済み?**|**jakarta名前空間に対応したバージョン**|
|:----|:----|:----|:----|
|Apache Software Foundation|Tomcat|はい|10.0+|
|Eclipse Foundation|Jetty|はい|11.0.0+|

## MicroProfile実装

MicroProfileは、Jakarta EE 9および10仕様の一部を使用する関連する仕様とAPIのセットです。いくつかの実装互換があります。

|**ベンダー/コミュニティ**|**実装/プロジェクト**|**移行済み?**|**jakarta名前空間に対応したバージョン**|
|:----|:----|:----|:----|
|Apache Software Foundation|TomEE|はい|9.0.0-M+|
|富士通|Launcher|はい|4.0+|
|IBM|OpenLiberty|はい|22.0.0.1+|
|Oracle|Helidon|はい|3.0.0|
|Payara|Payara|はい|Payara 6.2022.1.Alpha2|
|PiranhaCloud|Piranha|はい|20.6.1|
|Red Hat|Quarkus|一部|2.7.1+|

## ミドルウェアツール

ミドルウェアツールは広義の用語ですが、Jakarta EE仕様に依存するデータストアとメッセージングライブラリが含まれます。

|**ベンダー/コミュニティ**|**実装/プロジェクト**|**移行済み?**|**jakarta名前空間に対応したバージョン**|
|:----|:----|:----|:----|
|Apache Software Foundation|ActiveMQ Artemis|はい|2.17.0+|
|Oracle|Coherence Community Edition|処理中|22.09|

## IDE

主要なIDEは、着実にjakarta.*名前空間の第一級のサポートを追加しています。

|**ベンダー/コミュニティ**|**実装/プロジェクト**|**処理中?**|**メモ**|
|:----|:----|:----|:----|
|Apache Software Foundation|Netbeans|一部|Javaプロジェクトに追加するサードパーティ製のライブラリとしてJakarta EEをサポートしますが、ネイティブのプラグインや特殊なサポートはしてません|
|Eclipse Foundation|Eclipse IDE|一部|Javaプロジェクトに追加するサードパーティ製のライブラリとしてJakarta EEをサポートしますが、ネイティブのプラグインや特殊なサポートはしてません|
|Jetbrains|IntelliJ|Yes|Jakarta EEプロジェクトを作成するためのネイティブのサポート、実行するためのプラグイン。名前空間スイッチの移行ツール。|
|Microsoft|VS Code|一部|Javaプロジェクトに追加するサードパーティ製のライブラリとしてJakarta EEをサポートしますが、ネイティブのプラグインや特殊なサポートはしていません|

## ビルドツール

Maven、Gradle、およびAntは、特に様々な展開プラグインに関して、新しい名前空間をサポートするためのすべての追加機能を備えています。

|**ベンダー/コミュニティ**|**実装/プロジェクト**|**移行済み?**|**jakarta名前空間に対応したバージョン**|
|:----|:----|:----|:----|
|Apache Software Foundation|Ant|一部|1.10.12+|
|Apache Software Foundation|Maven|一部|3.6.5+|
|Gradleware|Gradle|一部|7.4+|

## フレームワーク

いくつかの一般的なフレームワークは、Jakarta EEアプリケーションの構築を支援します。

|**ベンダー/コミュニティ**|**実装/プロジェクト**|**移行済み?**|**jakarta名前空間に対応したバージョン**|
|:----|:----|:----|:----|
|Eclipse Foundation|Jersey|はい|3.0.0+|
|Object Computing|Micronaut|一部|3.0.0+|
|Red Hat|Hibernate|はい|6.0.0-Beta3|
|VMware|Spring|はい|6.0.0-M1|

## テストフレームワーク

テストは非常に重要であり、コアJUnitおよびTestNGライブラリと並んで人気のあるArquillianフレームワークがあります。

|**ベンダー/コミュニティ**|**実装/プロジェクト**|**移行済み?**|**jakarta名前空間に対応したバージョン**|
|:----|:----|:----|:----|
|Red Hat|Arquillian|はい|1.7.0.Alpha10|

## 結論

エコシステムは、「javax.*」から「jakarta.*」への移行をサポートするために非常にうまく機能しました。日々のJava開発者は、これまで楽しんでいたJava EE仕様、フレームワーク、ツールのモダンな後継が使えることを確信できます。
