---
title: "Jakarta EE互換実装と互換製品"
date: "2021-03-11T00:00:00+00:00"
headline: "Jakarta EE互換実装と互換製品"
hide_page_title: true
---

**Jakarta EE**は、エンタープライズJavaアプリケーション開発に使用されるオープンな[仕様](https://jakarta.ee/specifications/ "Jakarta EE Specifications")のセットです。これは、Java EE技術の後継で、将来のクラウドネイティブJavaエンタープライズ アプリケーションの仕様を前進させることに興味を持つJava開発者が集まった幅広いコミュニティです。各仕様リリースには、関連するTechnology Compatibility Kit（TCK）が含まれます。TCKへのリンクは、該当する仕様リリースページにあります。例えば、[Jakarta EE Platform 9.0](https://jakarta.ee/specifications/platform/9/)、または、コンポーネント仕様の場合は、[Jakarta Authentication 2.0](https://jakarta.ee/specifications/authentication/2.0/)を参照してください。

Jakarta EEワーキンググループでは、コンポーネント仕様のすべての**互換実装**に焦点を当てることができます。さらに、Jakarta EEワーキンググループは、Jakarta EEプラットフォームまたはJakarta EE Webプロファイル仕様の互換実装である**互換製品**に焦点を当てています。 

実装をJakarta EE互換として指定する際の最初のステップは、対応する仕様との互換性を実証するために、各TCKに対応する適切な仕様をパスし、[Eclipse Foundation Technology Compatibility Kit License](https://www.eclipse.org/legal/tck.php)の利用規約に準拠していることを確認することです。これは、実装者が、TCKのマニュアルに記載されている要件、特にTCKユーザーガイドに記載されている要件を含め、各仕様のすべての互換性要件を確認していることを前提としています。

TCKが成功裏に通過したら、次のステップは、それを世界に知らせることです。つまり、次の項目を実施します。 
1.   GitHubのイシューを提出して仕様プロジェクトチームに通知し、承認を得て、 
2.   PRを作成して、Jakarta EEワーキンググループが適切な仕様ページに**互換実装**をリストできるよう支援します。**互換製品**の場合は、Jakarta EEプラットフォーム仕様および/またはJakarta EE Webプロファイル仕様の実装が互換製品[ページ](https://jakarta.ee/ja/compatibility/)に掲載されます。 

Jakarta EEワーキンググループへのメンバーシップを含む、追加の必要な手順があります。互換製品ページに掲載されている製品は、[Jakarta EE商標ガイドライン](https://jakarta.ee/ja/legal/trademark_guidelines/)に従い、Jakarta EE互換ロゴを使用することができます。


### Jakarta EEコンポーネント仕様の*互換実装*としてリストされる方法
 
個々のJakarta EEコンポーネントの仕様ページで、あなたの実装を互換実装ページとして表示するには、次の手順に従います。
1.   [Jakarta EE TCKプロセス](https://jakarta.ee/ja/committees/specification/tckprocess/)に従って、該当するTCKテストのすべての要件を完全に満たして実行し、[Eclipse Foundation TCKライセンス](https://www.eclipse.org/legal/tck.php)に準拠します
      - 仕様の互換性を主張し続ける限り、TCKの結果を公開し、TCKの結果の公開リストを維持してください。
      - TCKの結果を[tck@eclipse.org](mailto:tck@eclipse.org)にメールで送信します。
2.	[GitHubリポジトリ](https://github.com/eclipse-ee4j/)の仕様プロジェクトに[認証リクエスト](https://raw.githubusercontent.com/jakartaee/specification-committee/master/compatibility-certification-request.md)イシューを提出します
3.	Jakarta EE仕様リポジトリに対して[GitHubプルリクエスト（PR）](https://github.com/jakartaee/specifications/pulls)を開き、必要な情報を入力します


### Jakarta EEプラットフォームまたはJakarta EE Webプロファイルの*互換製品*として掲載される方法 

あなたの製品を互換製品ページに表示し、Jakarta EE互換ロゴを使用できるようにするには、次の手順に従います。
 1. ブランドと互換ロゴの要件
     - Jakarta EEワーキンググループに[参加します](https://jakarta.ee/membership/)
     - [Jakarta EE商標ガイドライン](https://jakarta.ee/ja/legal/trademark_guidelines/)を参照します。
     - [Jakarta EE Compatibility Trademark License Agreement](https://app.hellosign.com/s/Aoi0Sx4E)を実行（デジタル署名）します（または[License Agreement PDF](/legal/trademark_guidelines/jakarta-ee-trademark-license.pdf)を印刷し、署名した契約書を[emo-records@eclipse.org](mailto:emo-records@eclipse.org)に返送します）
2.	互換認証とjakarta.eeの互換製品ページ掲載の要件 
    - [Jakarta EE TCKプロセス](https://jakarta.ee/ja/committees/specification/tckprocess/)に従って、該当するTCKテストのすべての要件を完全に満たし、実行します
      - 互換性を主張し続ける限り、TCKの結果を公開し、TCKの結果の公開リストを維持します。
      - TCKの結果を[tck@eclipse.org](mailto:tck@eclipse.org)にメールで送信します。
    - [GitHubリポジトリ](https://github.com/eclipse-ee4j/jakartaee-platform)に仕様プロジェクトを含む[認証リクエスト](https://raw.githubusercontent.com/jakartaee/specification-committee/master/compatibility-certification-request.md)を提出します。
    - [GitHubイシュー](https://github.com/jakartaee/jakarta.ee/issues/new?template=compatibility.md)を開き、Jakarta EE互換製品リポジトリに対して必要な情報を入力します
