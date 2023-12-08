---
title: "Jakarta EE仕様策定委員会の運営"
date: "2021-01-13T00:00:00+00:00"
headline: "Jakarta EE仕様策定委員会の運営"
hide_page_title: true
---

このドキュメントでは、Jakarta EE仕様策定
委員会の実務について説明します。

このドキュメントへの変更は、Jakarta 
EE仕様策定委員会（<jakarta.ee-spec@eclipse.org>）のメーリングリストを通じて行われるJakarta EE仕様策定委員会の
単純な多数決により承認される必要があります。

これは公開文書です。

## 仕様策定委員会 # {#specification_committee}

Jakarta EE仕様策定委員会は、Jakarta EEワーキンググループの管轄下で、
すべての仕様プロジェクト（この用語はEFSPによって定義）の
Eclipse Foundation Specification Process（EFSP）を
実装する責任を負います。これには、 
Jakarta EE Specification Process（JESP）と呼ばれる、Jakarta用 
EFSPの適応が含まれます。

仕様策定委員会は、ワーキンググループの仕様プロジェクトによって作成された 
最終仕様の妥当性の確認に対して最終的な  
責任を負います。「妥当である」という定義は、仕様策定委員会の参加者によって異なりますが、 
一般的には、仕様が実装可能であり、 
本質的クレームに関するEclipseの知的財産ポリシーの 
側面が遵守されていることを意味すると 
理解されています。実際には、仕様策定委員会の参加者は、EFSPに従って、 
主要なライフサイクルイベントを承認するために必要な投票を通じて
権限を行使します。

仕様策定委員会は、仕様プロジェクトの運用ガイダンスドキュメントを 
作成、発行、維持する責任を 
負います。これには、最終仕様を
作成するための最小要件とプロセスが含まれます。また、互換性をテストする目的で 
仕様TCKを実行する操作ガイダンスも 
含まれます。

仕様策定委員会の委員長（またはその代理）は、 
投票の開始、結果の集計、コミュニティへの伝達、
また（適切な場合、例えば、Releaseレビューの投票の場合）結果を
EMOに報告します。

仕様策定委員会は、また、その管轄下にある仕様プロジェクトに対して、 
EFSP/JESPを実施する方法を定義し、改善する
責任を負います。

## プロジェクト管理委員会（PMC） # {#project_management_committee_pmc}

PMCの主な役割は、プロジェクトチームが 
Eclipse開発プロセスを実装していることを確認することです。特にPMCは、 
プロジェクト活動を監視して、プロジェクトチームが
オープンで透明な方法で確実に作業を行えるようにします。PMCがコミッターの選挙をレビューおよび承認（または否認）します。 
まず、コミッター候補者が 
十分な利点を示していることを検証します。

PMCは、さらに、プロジェクトチームが 
Eclipse IPポリシーを遵守し、IPデューデリジェンスのプロセスを実施する責任を負います。
実際には、PMCは知的財産貢献（CQs）を承認し、 
知的財産に関する（限定的な）ガイダンスをプロジェクトチームに提供します
（必要に応じてEclipse IPチームに委ねます）。

PMCは、トップレベルプロジェクトの構造と、 
それに含まれるオープンソース（ソフトウェアと仕様）プロジェクト
の組織化に責任を負います。

PMCは、プロジェクトリーダーシップチェーンの一環です。そのため、PMCは
苦情処理プロセスでの役割を担います。
プロジェクトの機能不全を特定して文書化します（破壊的なコミッターを
削除/更迭/追加する責任があります）。

PMCは、オープンソースプロジェクトの運営に関するその他の
監督も行います。ReleaseレビューおよびProgressレビューに関する資料をレビューし、承認します。 
また、トップレベルプロジェクト内のプロジェクト間のコミュニケーションを促進します。

## プロジェクトリードの指名 # {#project_leads_designation}

仕様プロジェクトでは、プロジェクトリードとして
1人以上のコミッターを指名する必要があります。リードは、プロジェクトが適切なマイルストーンに到達したときに、
レビューを開始する責任があります。

## 仕様策定委員会の投票 # {#specification_committee_votes}

進捗状況とReleaseレビューに関する仕様策定委員会の承認投票は、 
最低でも14日間実行されます。他の投票は、最低でも
7日間実行されます。

それぞれの要件については、[レビュー
要件/ガイドライン](#review_requirementsguidelines)で説明されます。

Eclipse Foundation 
プロジェクトハンドブックで定義されている[標準リリース 
プロセス](https://www.eclipse.org/projects/handbook/#release)に続いて、
仕様策定委員会の投票が追加されます。各種レビューの詳細については、
次のセクションで確認できます。

-   [リリース計画の作成](#creating_a_release_plan)

-   [最終仕様の作成](#creating_a_final_specification)

仕様策定委員会の委員長（または代理人）は、投票の性質（Creation/Progress/Release）を記載し、 
提案されたリリースコンテンツ
（例えば、Releaseレビュードキュメント、仕様ドキュメントおよび 
技術アーティファクト）を含むPRリクエストへのポインターを含む電子メールを
Jakarta EE仕様策定委員会（<jakarta.ee-spec@eclipse.org>）の
公開メーリングリストに送信することにより、仕様策定委員会の投票を開始します。

仕様策定委員会のメンバーは、通常の+1/0/-1投票表記を使用して、
Jakarta EE仕様策定委員会の公開メーリングリストの投票メッセージに
応じて投票します。

仕様策定委員会のメンバーが提案に反対票を投じた場合
、反対投票の理由を説明し、問題を軽減するための措置を提案するコメントを提供する
必要があります。

仕様策定委員会の委員長（または代理人）が投票結果を集計し
、コメントを集約して、jakarta.eeの仕様プロジェクトページを
介してコミュニティに提出し、投票完了後
1週間以内に 
概要を <jakarta.ee-spec@eclipse.org> および <emo@eclipse.org> に
電子メールで送信します。

仕様策定委員会は、仕様策定委員会の公開メーリング
リスト（<jakarta.ee-spec@eclipse.org>）での単純な多数決により、
投票の延長を選択することができます。

投票が失敗した場合には、仕様策定委員長（またはその代理人）は、対応する
レビューを不合格とし、投票結果のコメントを仕様チームに転送します。
そして、そして、問題を解決して、後で再び取り組むように促します。

EMOは、第1水曜日と第3水曜日にレビューが完了するようにスケジュールを
設定していることに注意してください。これは、仕様策定委員会の投票開始と、
投票が失敗した後にプロジェクトチームが再び参加するタイミングに
影響を与えます。これは、仕様策定
委員会の委員長がレビュー完了の時間を最小限に抑えたい場合、
翌月の第1水曜日および第3水曜日の少なくとも14日前に投票を
開始する必要があることを意味します。仕様
策定委員会が投票の延長を選択した場合、 EMOは独自の裁量で、
対応するレビューを次のレビュー枠に上げるか、
仕様策定委員会の投票結果を受け取るまで
レビューの承認を保留します。

## 参加者の代表者の任命 # {#participant_representative_appointments}

メンバー参加者は、Jakarta EEワーキンググループに関する仕様プロジェクトで、
メンバー参加者の参加代表者（またはコミッター）として、 代表者（メンバー参加者の代表者は、
メンバー企業の
MCCAとWGPAの対象となる必要があります）を指名または
削除するために、<emo@eclipse.org> にメモを送信することができます。

EMOは、
仕様プロジェクトのPMI \"Who's Involved\" ページの \"Participant Representatives\" と
いうタイトルのセクションで、参加者の代表者の記録を維持します（例: [ServletsのEclipseプロジェクト
\"Who's
Involved\"](https://projects.eclipse.org/projects/ee4j.servlet/who)）。

## 新しい仕様 # {#new_specifications}

Jakarta仕様は、仕様プロジェクトによって開発されます。 
Eclipse開発プロセスに従いますが、いくつかの追加があります。
新しい仕様プロジェクトを開始するには、次の手順を実行する必要があります。

1. [プロジェクト提案](https://projects.eclipse.org/node/add/project-proposal) を作成します。(*)
2. 公開[メーリング リスト](https://accounts.eclipse.org/mailing-list/jakarta.ee-spec) のメールで仕様策定委員会に連絡します。(*)
3. 仕様プロジェクトがメーリングリストでの投票により仕様策定委員会によって承認され、EMOによる作成レビューが正常に完了したら、[Jakarta EE仕様](https://jakarta.ee/specifications/)としてリストされるプルリクエストを作成します。PRには、仕様のショートネームにちなんで名付けられたフォルダにある `_index.md` ファイルを含む必要があります。Jakarta MVCの例を次に示します。[_index.md](https://github.com/jakartaee/specifications/blob/master/mvc/_index.md) は、Jakarta EE仕様GitHub [リポジトリ](https://github.com/jakartaee/specifications)の[mvc](https://github.com/jakartaee/specifications/blob/master/mvc/) フォルダーにあります。

``` 
---
title: "Jakarta MVC"
summary: "Jakarta MVCは、アクションベースのモデルビューコントローラパターンに従ってWebアプリケーションを作成するための標準を定義します。
summary60Char: "Jakarta MVCは、アクションベースのMVCパターンを標準化しています。"
project_id: "ee4j.mvc"
---

Model（モデル）、View（ビュー）、Controller（コントローラー）、つまり略してMVCは、主にHTMLアプリケーションを構築するために使用されるWebフレームワークの一般的なパターンです。モデルは、アプリケーションのデータを指し、ビューはアプリケーションのデータ表示を指し、コントローラは、入力の管理、モデルの更新、および出力の生成を担当するシステムの部分を指します。

Web UIフレームワークは、アクションベースまたはコンポーネントベースに分類できます。アクションベースのフレームワークでは、HTTPリクエストはコントローラにルーティングされ、そこでアプリケーションコードによってアクションに変換されます。コンポーネントベースのフレームワークでは、HTTPリクエストはグループ化され、通常は、アプリケーションコードからの対話は、ほとんどまたは一切行われずに、フレームワークコンポーネントによって処理されます。言い換えると、コンポーネントベースのフレームワークでは、コントローラーロジックの大部分はアプリケーションではなくフレームワークによって提供されます。
```

(*) 1および2は、どの順序でも行うことができます。実際に、プロジェクトの作成を進める前に仕様策定委員会とアイディアを共有してみるのもいいかもしれません。

## 仕様の開発 # {#developing_specifications}

開発中の仕様プロジェクトは、JESPの要求に従って、少なくとも年に1回、Progressレビュー
またはReleaseレビューを行う必要があります。実際には、
開発サイクルの開始時に行われるPlan
レビューが正常に終了すると時計が動き始め、
Progressレビューが成功するとリセットされます。

仕様プロジェクトがReleaseレビューに成功する
（それにより、開発サイクルが終了する）、または
仕様チームがサイクルの放棄を決定すると、
プロセス全体が停止します。

## リリース計画の作成 # {#creating_a_release_plan}

各仕様プロジェクトは、新しい仕様バージョンのサポートの
広範な開発への取り組みの前に、Planレビューを行う必要があります。
単純なリリース計画は、[Eclipseリリース
記録](https://www.eclipse.org/projects/handbook/#pmi-commands-release)によって定義されます。
より広範なリリース計画は、外部
ドキュメントを介して定義する方が簡単な場合があります。外部ドキュメントが作成された場合は、
Eclipseリリース記録で参照する必要があります。つまり、Eclipseリリース記録は、
リリースの詳細が文書化されている場所に関係なく必要です。

外部のリリース計画が開発された場合は、仕様プロジェクトのWebページを使用して、
利用できるようにする必要があります。例として、Jakarta EE
9リリース計画は、[プラットフォームプロジェクトのgithub
ページ](https://eclipse-ee4j.github.io/jakartaee-platform/jakartaee9/JakartaEE9ReleasePlan)に掲載されています。

リリース計画は、投票段階に進む前に、
仕様策定委員会でレビューされるべきです。

## 推奨される仕様プロジェクトのリポジトリ構造 # {#recommended_specification_project_repository_structure}

仕様プロジェクトレポジトリの構造に関する現在の推奨事項は、
APIと仕様コンテンツ用にapiおよびspec
サブディレクトリをもつ1つの \*-spec リポジトリと、TCKコンテンツ用に2つ目の \*-tck 
リポジトリをもつことです。

## 仕様の配布 # {#distributing_specifications}

各仕様プロジェクトは、jakarta.ee Webサイトの
[仕様](https://jakarta.ee/specifications/)の下にあります。

それぞれの最終仕様には、次の項目が含まれます:

-   仕様ドキュメントおよび関連するすべてのアーティファクトへのリンク
    （TCKおよび新しい実装の認証に応じて
    更新される互換実装を含む）、

-   バージョン番号とリリース日を含むメタデータ

-   仕様策定委員会全員の投票結果

## 最終仕様の作成 # {#creating_a_final_specification}

\"Final\" とマークされた仕様文書は、
（対応する仕様策定委員会からの
圧倒的多数の承認を含む）Releaseレビューに成功するまで、
一般に公開できません。 

**注意:** \"Final\" サービスリリース（x.y.z）仕様には、[省略された承認プロセス](#creating_a_final_service_release_specification)があります。
Releaseレビューは必須ではありませんが、サービスリリースには以下の要件のいくつかが引き続き適用されます。 

Releaseレビューでは、仕様プロジェクトにおいて
次の項目が実施されていることが検証されます。

1.  OSSRHステージングリポジトリを介して、api、javadocの最終ステージングリリースが作成されている
 必要があります。 

    -   Javadocには、[Eclipse Foundation仕様
 ライセンス](https://raw.githubusercontent.com/eclipse-ee4j/jakartaee-api/master/licenses/EFSL.html)を含める必要があります。

    -   以前にリリースされたAPIアーティファクトと比較して、pom.xmlのバージョンを
 増やす必要があります。

    -   既存の \"\@version ... \" JavaDocタグは、一致するように更新するか
 、削除される必要があります。

2.  候補の最終[EFTL](https://www.eclipse.org/legal/tck.php)
        ライセンスTCKアーカイブは、<http://download.eclipse.org/ee4j> の下の
        プロジェクトディレクトリにアップロードする必要があります。例: 
        <http://download.eclipse.org/ee4j/bean-validation/beanvalidation-tck-dist-2.0.5.zip>
        

3.  仕様プロジェクトに応じて
    スタンドアロンTCK結果、またはプラットフォームTCK結果を生成します。

    -   Jakarta CIインフラストラクチャでTCKを実行するための
        情報については、
        [Build\_From\_Jakarta\_EE\_TCK\_Repo\_And\_Run](https://wiki.eclipse.org/TCK:Build_From_Jakarta_EE_TCK_Repo_And_Run#Jenkins_Pipelines)を参照してください。 
        
        
4.  仕様リポジトリのイシュートラッカーで仕様を検証するために使用される
    互換実装の互換認証リクエストを作成します 
    （必要に応じて）。プロジェクトに互換認証リクエストテンプレートが
    まだない場合は、こちらを使用できます: 
    [compatibility-certification-request.md](https://github.com/jakartaee/specification-committee/blob/master/compatibility-certification-request.md)
    
5.  [Jakarta EE仕様策定委員会の仕様](https://github.com/jakartaee/specifications)
    レポジトリに対して、
    [ドラフトPR](https://help.github.com/en/articles/about-pull-requests#draft-pull-requests)
    （`draft` ラベルも割り当てる）を作成して、仕様レビューリクエストを
    開始します。これらのドラフトPRは、[PR
    テンプレート](https://github.com/jakartaee/specifications/blob/master/pull_request_template.md)で要求されるすべてを提供します。 
        
    最終審査プロセスの参考として、仕様PRに[仕様レビューチェックリスト](https://github.com/jakartaee/specification-committee/blob/master/spec_review_checklist.md)を追加する必要があります。

    -   これらのPRは、リリースを検証するために
        必要な項目を提供し、仕様に関する
        jakarta.eeのWebサイトのコンテンツを提供することを目的としています。リポジトリには、PRに期待されるコンテンツをリストしたPRテンプレートがあります。
        内容は次のとおりです。

        -   プロジェクト、仕様、ドキュメント（Wombatなど）で
            定義されている仕様コードを使用するディレクトリ

        -   仕様のバージョン（例: 1.6）に対応するサブディレクトリmajor.minorには、
            次の内容が含まれます:

            -   pdfと
                html形式で作成した上記 (2) の仕様（例: wombat\_1.6.pdfおよびwombat\_1.6.html）

            -   少なくとも1つの互換実装を示す
                TCK実行の概要の結果

            -   仕様でTCKが定義されている場合、最終的なTCKテストバンドルへのリンク。
                これは、投票が可決されると、署名して公式
                仕様のダウンロードエリアにアップロードされます。

            -   API、javadocアーティファクト用OSSRHステージングリポジトリの
                URL

            -   オプションの2番目のPRのAPIビルドからの最終的なJavaDocsを含む
                apidocsディレクトリ。

6.  この更新された仕様バージョンがプラットフォームを対象としている場合、API jarファイルのバージョン番号を更新するPRを
    [jakartaee-api](https://github.com/eclipse-ee4j/jakartaee-api)
    プロジェクトへ提出し、Jakarta EE API jarを更新します。

7.  この更新された仕様バージョンがプラットフォームの対象である場合、
    [GlassFish](https://github.com/eclipse-ee4j/glassfish)にPRを提出することにより、APIの新しいバージョン（
    および該当する場合は実装）を使用するようにEclipse GlassFishを更新します。

8.  [Eclipse 
    プロジェクト
    ハンドブック](https://www.eclipse.org/projects/handbook/#pmi-commands-release)
    の説明に従って、リリース
    記録を作成します（まだ存在しない場合）:

    -   リリース記録を参照する <ee4j-pmc@eclipse.org> に
 電子メールを送信して、PMCからのリリースに対する承認をリクエストします。

    -   [Eclipseプロジェクトハンドブック](https://www.eclipse.org/projects/handbook/#pmi-commands-iplog)
        の説明に従って、
        レビューのためにIPログをIPチームに提出します。

    -   PRが十分にレビューされて承認されたら、EMOに連絡して
        電子メールを
        <emo@eclipse.org> に送信し、公式Releaseレビュー投票を始めます。`final` および `ballot` ラベルをPRに追加する必要があります（ `draft` ラベルが存在する場合は削除します）。

9.  投票リクエストPRが承認されると、仕様プロジェクトによってステージングされたアーティファクトが
    Maven Centralにリリースされます。これに関するアドバイスは、こちらの
    [MavenReleaseScript](https://wiki.eclipse.org/MavenReleaseScript)をご覧ください。
    
1. 仕様策定委員会のメンバーは、[このチェックリスト](https://github.com/jakartaee/specification-committee/blob/master/spec_finalization_checklist.md)の “ballot completion” セクションでメインPRにコメントを追加します。
また、 `approved` ラベルが両方のPRに追加されます（ `final` および `ballot` ラベルは残します）。

1. 仕様バージョンTCKは、仕様策定委員会のメンバーがプロモートする必要があります。このプロセスに関するアドバイスは、こちらの[TCKプロモーションREADME](https://github.com/jakartaee/specification-tools/tree/master/promotion)をご覧ください。

Releaseレビューが正常に完了したら、EMOまたは仕様策定委員会が正式な投票結果を示して仕様PRを更新する必要があります。
投票の更新は、元のPRまたは後続のPRのどちらか最も効率的な方で実行できます。
仕様策定委員会は、関連するPRを[Jakarta EE仕様プロジェクトリポジトリ](https://github.com/jakartaee/specifications)にマージすることにより、仕様プロジェクトをjakarta.eeにプロモートします。


リンク: <https://github.com/jakartaee/jakarta.ee>, 
<https://gohugo.io/documentation/>

### 最終サービスリリース仕様の作成 # {#creating_a_final_service_release_specification}
    
JESPの「サービスリリース」の定義に遵守している限り、仕様サービスリリース（x.y.z）に必要な正式なReleaseレビューはありません。
つまり、サービスリリースでは機能の変更やIPスコープの拡大は許可されません。
[最終仕様](#creating_a_final_specification)の内容の多くは引き続き適用されますが、サービスリリースの承認プロセスは簡略化されます。

1. 各種アーティファクト（仕様、API、および/またはTCK）の作成とステージングは、[上記の最初のステップ1と2](#creating_a_final_specification)を使用して行われます。

2. [ステップ5の仕様PRの作成](#creating_a_final_specification)も必要です。

3. 仕様プロジェクトチームは、[仕様策定委員会の公開メーリングリスト](https://accounts.eclipse.org/mailing-list/jakarta.ee-spec)にPRのレビュー準備ができたことを通知するメモを送信する必要があります。

4. 仕様PRが独立した仕様策定委員会のメンバーによってレビューおよび承認されたら、PRをマージすることができます。
仕様プロジェクトチームは、ステージングされたアーティファクトをMaven Centralにリリースできます。

## レビュー要件/ガイドライン # {#review_requirementsguidelines}

EMOは、次の項目を検証します。

-   レビュー資料が最低基準を満たしていること（意味がある
    説明）、

-   プロジェクトリポジトリに必要な法的文書が
    含まれていること、

-   Eclipseの知的財産デューディリジェンスプロセスが
    遵守されていること。

PMCは、次の項目を検証します。

-   Eclipse開発プロセスが遵守されていること、

-   プロジェクトがオープンで透明性のある方法で運営されていること、

-   仕様ドキュメントが確立された規則に
    一致していること、

-   プロジェクトに参加するための不当な障壁がないこと、

-   提出資料が完成していること。

仕様策定委員会は、次の項目を検証します。

-   レビューのために提示されたコンテンツが範囲内であること、

-   Webサイトのドキュメントに仕様が適切かつ一貫して
    記載されていること、

-   仕様が確立された規則に一致し、
    必要な品質基準を満たしていること。

-   Planレビューの場合、十分に詳細で実行可能なリリース計画
    が作成されていること。さらに、対象のリリースの内容を記載した [Eclipseリリース
    記録](https://www.eclipse.org/projects/handbook/#pmi-commands-release)
    が存在すること。この
    記載は、外部の計画ドキュメントへの参照にすることができます。

-   Progressレビューの場合、仕様が
    実装可能でテスト可能であることを保証するために、
    互換実装とTCKについて十分な進捗があったこと。

-   Releaseレビューの場合、互換実装が完了し、
    TCKに合格し、TCKが
    仕様を十分にカバーしていること。TCKユーザーガイドには、リリースの検証に使用される
    互換実装を実行するための手順を含める必要があります。
    手順は参照によって提供される場合があります。

## 名前空間 # {#namespaces}

### Maven # {#maven}

MavenグループID、アーティファクトID、アーティファクト名は、
<https://wiki.eclipse.org/JakartaEE_Maven_Versioning_Rules> ドキュメントに記載されている
ルールに従う必要があります。

### Javaパッケージ # {#java_package}

すべての新しいクラスは、`javax.` クラスに対する変更と同様に、
`jakarta.` パッケージで作成されます。

これは、プロジェクトによって生成されたOSGiバンドルにも適用されます。

### 例外 # {#exceptions}

上記の名前空間規則に例外を要求するよう、
仕様策定委員会に請願します。

## コーディング規則 # {#coding_conventions}

可能な場合、すべてのソースコンテンツに有効な著作権および
ライセンスヘッダが含まれている必要があります。`glassfish-copyright-maven-plugin` などのツールは、
一貫性を確保するのに役立つ可能性があります。

## 仕様ドキュメント規則（現在討議中） # {#specification_document_conventions_currently_under_discussion}

三人称の時制で表記

TBD \"使用する\" 対 \"含む\"

推奨されるフォーマットは、asciidoc、markdown、textの順です。

他の仕様への最初の参照は、公式フルネームを使用する
必要があります。後続の参照では、一般的に受け入れられる略語を使用できます。

## 初期移行タスク # {#initial_migration_tasks}

レガシーJava EE
プロジェクトおよび関連する命名規則からJakarta規則への初期移行の要件は、これらのドキュメントで
概説されています。

-   [Oracle/JCPの頭字語
    ガイドライン](https://jakarta.ee/ja/legal/acronym_guidelines/)

-   [プロジェクト名とコード](https://github.com/jakartaee/specification-committee/blob/master/names.adoc)

これらの規則を使用して、プロジェクトは以下を行う必要があります。

-   [プロジェクト名と
    コード](https://github.com/jakartaee/specification-committee/blob/master/names.adoc)にあわせて仕様名を変更します

-   JavaDocsおよびREADMEファイルなどのテキストドキュメントを更新して
    これらの命名規則を使用します。

-   JCPプロセスへの参照を [Eclipse
    JESP](https://jakarta.ee/ja/about/jesp/)への参照に置き換えます

-   [プロジェクト名と
    コード](https://github.com/jakartaee/specification-committee/blob/master/names.adoc)の名称を使用するために、他の仕様への参照を更新します。

-   JCP JSRページへのリンクは、
    jakarta.ee/specifications/\<code\>/\<version\> 形式のリンクに置き換える必要があります。ここでは、<code\> は、[プロジェクト名とコード](https://github.com/jakartaee/specification-committee/blob/master/names.adoc)
    の仕様コードで、\<version\> は
    特定の仕様バージョンです。

-   既存の \"\@since XYZ 1.x\" の使用は、そのままにしておきます。これらは、
    古いJCPのバージョンを指します。今後の追加は、Jakartaプロジェクト
    名を使用する必要があります。

仕様プロジェクトでは、
TCK異議申し立てプロセスや互換性要求プロセスをサポートするために、イシューテンプレートとラベルが必要です。イシューテンプレートの作成
については、こちらのGitHubドキュメントで説明されています: 
<https://help.github.com/en/articles/creating-issue-templates-for-your-repository>。
ラベルの作成については、こちらのGitHubドキュメントで説明されています: 
<https://help.github.com/en/articles/creating-a-label>。

現在のTCK異議申し立てと互換性要求のプロセスでは、
以下のイシューラベルが必要となり、イシュートラッカーで定義する必要があります。

| ラベル | 説明 |
------------------------------------|------------------------------------
| challenge | TCK異議申し立て |
| accepted | 承認された異議申し立てリクエスト |
| challenge-appeal | 拒否されたTCK異議申し立て申請 |
| appealed-challenge | TCK異議申し立てが申請されました |
| certification | 互換認証リクエスト |
| invalid | これは正しくないようです（ラベルは既に存在します） |
| enhancement | 新しい機能またはリクエスト（ラベルは既に存在します） |

最後に、[Jakarta EE 8
リリース用のAPIプロジェクトの準備方法](https://wiki.eclipse.org/How_to_Prepare_API_Projects_to_Jakarta_EE_8_Release)に従って
最初の Jakarta EE 8リリースを作成します。
