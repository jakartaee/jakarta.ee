---
title: "Oracle/JCPの頭字語のガイドライン"
date: 2019-06-26T16:10:38-04:00
description: "既存のOracle/JCPの頭字語の使用に関するガイドライン。Eclipseロゴ・商標ポリシーに関するEclipse Foundationガイドラインの補足。"
hide_sidebar: "false"
---

_既存のOracle/JCPの頭字語の使用に関するガイドライン。[Eclipseのロゴ・商標ポリシーに関するEclipse Foundationガイドライン](/ja/legal/trademark_guidelines/)の補足。_

バージョン 1.0 - 2019年6月26日

これらのガイドラインの目的は、混乱を避けること、また開発者コミュニティがJakarta EEプロジェクト、仕様、テストスイート、またはその他の関連アイテムがOracle/JCPから生成されたものか、Eclipse/Jakarta EEプロセスから生成されたものかを容易に特定できるようにすることです。

Oracle/JCPの頭字語のリストは、このドキュメントの下部に表示されます。

Jakarta EEプロジェクト、仕様、テストスイート、およびその他の関連資料の名称ついては、**完全なプロジェクト名/タイトル**および**スコープステートメント**に、特定の頭字語を組み込まないでください。

* OK:「Jakarta Message Service仕様」
* 良くない例：「JMS仕様」
* 良くない例：「Jakarta Message Service (JMS)仕様」

Jakarta EEプロジェクトの現在の**ショートネーム**（またはid）は、Oracle/JCPの頭字語（jaxrs-api、jaf、jpa-apiなど）から派生している場合があります。これらのプロジェクト用に作成された**リポジトリ**については、次のGitHub組織名で、これらのプロジェクトに対する現在のショートネームを引き続き使用できます。

* eclipse (例： github.com/eclipse/[現在のショートネーム])
* eclipse-ee4j
* jakartaee
* eclipse-jakartaee

Eclipse Foundationで作成された**プロジェクト**の場合は、次の形式のURLで、これらのプロジェクトの現在のIDとショートネームを使用しても問題ありません。

* eclipse.org/projects/[現在のid]
* projects.eclipse.org/projects/[現在のショートネーム]

最大限の柔軟性と明確性を実現するために、プロジェクトでは、妥当な場合は、新しい仕様名に近いショートネームに変更することをお勧めします。また、可能であれば、Oracle/JCPの頭字語を避けることをお勧めします。

仕様文書（または関連資料）にOracle/JCPの頭字語への**参照**が含まれている場合は、次のような文を含めてください。 _「このドキュメントのJMSへの参照は、特に断りのない限り、Jakarta Message Serviceを指します。」_文は読みやすいサイズである必要があり、判読できないほど小さな脚注ではなく、仕様文書（または関連資料）の最初の部分に表示される必要があります。読み手は文章を読むためにスクロールしたり、ページをめくったり、リンクをクリックする必要はありません。

**URL、リポジトリ名、パッケージ名、クラス名、またはメソッド** 名には、EclipseまたはJakartaを起点として識別する文字列の右側に頭字語を含めることができます。

* OK: github.com/eclipse-ee4j/jms
* OK: eclipse.org/projects/ee4j.jms
* OK: jakarta.jms.JMSContext

プロジェクトの電子メールアドレスには、@（アットマーク）の左側に頭字語を含めることができます。

* OK: jms-dev@eclipse.org

Mike Milinkovich氏が[Java商標に対するJakarta EEの権利に関する更新](https://blogs.eclipse.org/post/mike-milinkovich/update-jakarta-ee-rights-java-trademarks)のブログ記事で述べたように、

<q>「javaxパッケージ名前空間は、Jakarta EE仕様内で使用できますが、『現状のまま』でのみ使用できます。Jakarta EEコンポーネントの仕様内でjavaxパッケージ名前空間を変更することはできません。javaxパッケージ名前空間を引き続き使用するJakarta EE仕様は、対応するJava EE仕様とTCKの互換性を維持する必要があります」</q>

Jakarta EE 8は、このガイダンスに従って、『現状のまま』変更せずに、既存のjavax名前空間を使用して、既存のJava EE 8パッケージ名を使用します。Jakarta EE 9以降で、既存のJakarta EE 8およびJava EE 8のパッケージ/APIに変更がある場合は、新しい（javaxではない）パッケージ名を使用する必要があります。パッケージの名前付けに関する上記のガイダンスを参照してください。

**<u>OracleまたはJCPで使用される頭字語</u>**

*Java Development Kit (JDK)およびJava Virtual Machine (JVM)技術は、Jakartaプロジェクトの一部ではありません。これらの頭字語を使用する前に、 trademark_us@oracle.com にお問い合わせください。

* EJB
* J2EE
* JAAS
* JACC
* JAF
* JAR
* JASPIC
* JAX (JAXB、JAXP、JAX-WS、JAX-RS、およびその他の「JAX」の使用を含む)
* JCA
* JCE
* JCK
* JCP
* JDBC
* JDK*
* JFC
* JFR
* JLS
* JMOD
* JMS
* JMX
* JNDI
* JNI
* JPA
* JPMS
* JRE
* JRMP
* JSF
* JSP
* JSPA
* JSR
* JSTL
* JTA
* JTS
* JVM*
* JWS
* RMIとRMI-IIOP
* SAAJ
