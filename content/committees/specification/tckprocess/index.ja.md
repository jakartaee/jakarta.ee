---
title: "Jakarta EE TCK Process 1.3"
date: "2022-02-07T00:00:00+00:00"
aliases:
    - committees/specification/TCKProcess/
---

Eclipse Foundation仕様プロセスにおける仕様プロジェクトは、
複数の互換実装を可能にするという目的を実現するためにTechnology Compatibility Kit（TCK）を
作成する必要があります。

このドキュメントでは、次の事項を定義します。

-   移植性の実現のために適切と考えられる、TCKが提供しなければならない資料
    

-   最終TCKの承認

-   テストに対する異議申し立てプロセスとその解決方法

-   リリース済みのTCKテストを認証要件から除外する方法
 

-   リリース済み仕様に対するTCKテストの改善方針

-   自己認証手続

-   TCK異議申し立てを解決するための（TCKの）サービスリリース（x.y.z）のプロセス

## 役割と制限

TCKの役割は、
実装の互換性とアプリケーションの移植性の両方を確保することです。

TCKテストは、
仕様の規定、商標ガイドライン、ライセンス条項を含むがこれに限定されない、
アプリケーションが遵守すべきすべてのルールおよび制限事項に従って記述される必要があります。アプリケーションに関するこれらの規則および制限に従わない
テストは無効とみなされ、
異議申し立てプロセスで除外される場合があります。

### 名前空間

TCKテストは `jakarta.*` 名前空間にパッケージ化しないでください。
現時点では、TCKは他の名前空間にパッケージされていても構いませんが、
名前空間の形式は `ee.jakarta.tck.<spec-name>`  が推奨されます。

## TCKリリースの資料 {#_materials_for_a_tck_release}

アーティファクト:

-   プロジェクトは、Maven Centralまたは他のオープンソース
    チャンネルに配布するためのプロジェクトライセンス（EPL、Apacheなど）
    バージョンを作成し、自動化された非公式テストと
    実装に使用可能である必要があります。このTCKをもとに
    互換性を主張することはできません。

-   プロジェクトは、
    [EFTL](https://www.eclipse.org/legal/tck.php)ライセンスを含む最終候補バイナリを作成する必要があります。Jakarta
    EE仕様策定委員会は、最終承認後、Eclipseインフラを通じて配布するために、プロジェクトTCKバイナリ
    を署名してプロモートします。これ
    は、互換性を主張したい
    場合に自己認証に使えるTCKバイナリで、Jakarta
    ブランドの使用を許可するものです。

-   両方のTCKバイナリには、以下が含まれる必要があります

    -   ユーザーガイドのアウトライン

        -   ソフトウェア要件

        -   インストールと構成

        -   テストの実行方法

        -   異議申し立てする場所

        -   このプロセスガイドでカバーされていないTCK固有の規則

    -   TCKの検証に使用される互換実装の
        実行方法を記載した説明書

    -   上述の
        各ドキュメントを指し示すトップレベルのREADMEドキュメント

-   TCKのドキュメントには次の項目を含めることを推奨します

    -   認証申請、バグ
        レポート等のイシュートラッカーのURL

    -   互換性を主張する前に、[互換性認証](#_certification_of_compatibility)
        プロセスに
        従わなければならないことを示す文。

-   TCKバイナリは、以下を含むことができます。

    -   テストカバレッジ文書

    -   テストアサーション文書

-   プロジェクトのGitHubリリースページ(または
    同等ページ)から利用可能なリリース

    -   EFTL下の最終リリースは、次の場所でホストされる必要があります:
        [download.eclipse.org](http://download.eclipse.org)

### 最終TCKの承認 {#_ratifying_a_final_tck}

-   プロジェクトは、EFTL版TCKの最終バイナリ案を仕様策定委員会の
    承認のために提出します。

-   仕様策定委員会で、TCKの
    バイナリの承認又は不承認の採決を行います。

-   承認されたバイナリは、Jakarta
    仕様策定委員会のGPGキーで署名され、最終
    バイナリのSHA-256ハッシュのデジタル署名と、
    TCKの指紋としてバイナリのSHA-256ハッシュとともに download.eclipse.org
    で公開される予定です。

-   消費者は、Jakarta仕様策定委員会
    のGPGキーを使用して、そのバイナリやあらゆるTCKバイナリの真正性を検証することができます。

## 異議申し立て {#_challenges}

仕様は唯一その正しさの源であり、あらゆる意味
でTCKよりも優先するものとみなされています。仕様を実装し、
TCKに合格しようとする過程で、実装は、
1つ以上のテストまたはアサーションが
仕様に適合しないため、認証
要件から除外する必要があるという結論に達する可能性があります。

除外するテストのリクエストは、チャレンジ(異議申し立て)と呼ばれます。この
セクションでは、誰がTCKに異議を申し立てをすることができるのか、TCKにどのような
異議を申し立てをすることができるのか、これらの異議申し立てはどのようにされるのか、異議申し立ては、誰にどのように
対処されるのかを明らかにします。

### 誰が異議申し立てできますか？{#_who_can_file_a_challenge}

実装者は、自分の実装に関連するTCKの1つまたは複数のテストに対して
異議申し立てすることができます。実装者とは、最終的な認証済みリリースの作成に
責任を持つ団体を意味します。
**提出された異議申し立ては、その団体の総意を表すものでなければなりません。**

### 有効な異議申し立て {#_valid_challenges}

テストケース（テストクラス、\@Testメソッドなど）、テストケース構成
（デプロイメントディスクリプタなど）、テストBean、アノテーション、および
TCKの一部と見なされるその他のリソースは、異議申し立てされる可能性があります。

テスト異議申し立てのスコープでは、次のシナリオが考えられます。

-   テストアサーションが仕様と競合している。

-   テストが仕様の範囲をこえて、より厳しい要求をしている。
    

-   仕様の主張が十分に実装可能ではない。
    

-   テストが移植性がないか、または特定の実装に依存している。
    

### 無効な申し立て {#_invalid_challenges}

以下のシナリオは、テスト異議申し立て
の対象外とし、申請された場合は直ちにクローズします。

-   実装のテスト合格主張に異議を申し立てる。
    認証は自主管理制度であり、これらの問題は実装に直接提起されなければなりません
    。

-   仕様要件の有用性に異議申し立てをする。
    異議申し立てプロセスは、仕様プロセスを回避して、
    仕様要求の必要性や関連性を疑問視するために
    使用することはできません。

-   TCKが不十分であるか、または仕様に必要なアサーションが不足している。
    テスト異議申し立ての範囲外である
    「改善」の項を参照ください。

-    実装
    コミュニティの総意でない異議申し立ては、クローズされます。その後、
    実装コミュニティで合意が得られれば、再度、この問題を取り上げることができます。テスト
    異議申し立てのプロセスは、実装者が独自に内部議論を始める
    場ではありません。

-   何らかの理由ですでに除外されているテストへの異議申し立て。

-   除外されたテストは除外されるべきではなく、再追加されるべきであるという異議申し立ては、
    新たなエンハンスメントリクエストとして開かれなければならない。

### 異議申し立て実施 {#_filing_a_challenge}

異議申し立ては仕様プロジェクトのイシュートラッカーを通じて実施されなければなりません
`challenge` というラベルを使用し、次の情報を含めます。

- 関連する仕様のバージョンとセクション番号

- テストの場所

- 正確なTCKバージョン

- テスト対象の実装（名前と会社名を含む）

- テストが無効である理由、および正しいと
 信じている動作の詳細な説明

- デバッグログ、テスト出力、テストログ、実行
 スクリプト等

### 異議申し立ての解決 {#_challenge_resolution}

異議申し立ては、仕様プロジェクト
コミッターの総意に達した後、または総意を得る試みが失敗した後に、仕様プロジェクトリードまたはプロジェクト
異議申し立てトリアージチームが解決することができます。仕様
プロジェクトは、レイジーコンセンサス、投票、または[Eclipse Foundation開発プロセス](https://www.eclipse.org/projects/dev_process/)の原則に従った
任意の方法
を行使することができます。

#### 積極的な解決 {#_active_resolution}

異議申し立ての解決に失敗すると、実装
の市場投入ができなくなる可能性があります。異議申し立ては、
仕様プロジェクトで最優先され、適時に解決される必要があります。2週間以内が理想的な異議申し立ての解決期間と考える
べきでしょう。
異議申し立ては必要に応じて長くなることもありますが、原則として数ヶ月は避ける必要があります。

仕様プロジェクトで
長期間総意が得られない場合、そのテストを除外し、将来の
仕様改訂時にその論争に対処することが既定の推奨事項です。

#### 承認された異議申し立て {#_accepted_challenges}

あるテストが無効な結果をもたらすというコンセンサスが得られた場合、その
テストは認証要件から除外され、
新しい除外リスト
を含むTCKの公式配布物が直ちに更新・リリースされます。関連する `challenge` イシューは、解決されたことを示す
`accepted` ラベルを付けてクローズする必要があります。

仕様プロジェクトは、TCKテストを除外する代わりに、 `accepted` となったTCK異議申し立ての（ユーザー）回避策を承認することができます。

異議申し立てされたテストを除外する別の代替方法として、テストのバリデーションロジックを調整し、
バリデーションチェックを「拡張」することが可能な場合があります。 
例えば、あるテストが特定の変数「x」に対して値「A1」を期待するが、仕様言語が実際には「x」に対して値「A1」と「A2」のいずれか
（他の値は許さない）を有効値として認めていると主張する異議申し立てが
提起された場合、
「x」に対して「A1」または「A2」のいずれかを認めるよう、
異議申し立てされたテストを修正することは妥当な行動である可能性があります。 

この考え方は、この例のように
単純でない場合にも適用される可能性があるので、このアプローチを使用する場合は注意が必要です。
特に危険なのは、異議申し立てが発生する前に、 
すでにコンプライアンスが実証されている実装が、実際には新しい変更済みテストに合格ない可能性があることです。

このようなシナリオが引き起こす混乱と追加作業を抑えるために、
異議申し立ての前に少なくとも1つの認証された互換実装が既にある場合、
新しい修正されたTCKは、変更が公表、リリース、確定される前に、少なくとも1つ（理想的にはそれらすべて）の実装に対して
実行される必要があります。

そのような変更がリリースされ、以前に認証された実装が新しく変更されたテストで
不合格になることが後で判明した場合、恐らくそのテストを除外することが唯一の選択肢になり、そのためにはさらに別の
追加のサービスリリースが必要となります。


#### 拒否された異議申し立てと救済措置 {#_rejected_challenges_and_remedy}

`challenge` イシューが却下された場合、却下されたことを示すために
`invalid` というラベルを付けてクローズする必要があります。技術的な理由で拒否された
異議申し立ての申し立てプロセスは、「エスカレーションアピール」に概説されています。
しかしながら、実装者がTCK異議申し立てプロセスに従わなかったと感じる場合
、 `challenge-appeal` ラベルを使用して、仕様プロジェクトの
イシュートラッカーで申し立てイシューを提出する必要があります。プロジェクトリードは、
電子メールでJakarta EE仕様委員会に問題を報告する必要があります
（<jakarta.ee-spec@eclipse.org>）。委員会は、純粋にプロセスの観点で
問題を審査します。申し立てが受理された場合は、元の
TCK異議申し立て問題が再開され、申し立ての決定に関する議論とともに `appealed-challenge` のラベルが追加され
、
`challenge-appeal` イシューがクローズされます。申し立てが拒否された場合、
`challenge-appeal` イシューは、`invalid` というラベルを付けてクローズされる必要があります。

![TCKProcess](TCKProcess.png)

## 除外 {#_excludes}

除外は、使用中のテストフレームワークと互換性のある形式で
TCKプロジェクトリリースに含める必要があります。これにより、除外が
更新されると、影響を受けたテストは自動的にテスト
スイートから削除されます。

### 除外テストの追加
除外されたテストは、それぞれのメジャーEEリリースで開発されすべての仕様のテスト除外リストを空にすることにより、すべてのメジャーJakarta EEリリースに再度追加する必要があります。 

## 改善 {#_improvement}

テストに対する改善のリクエストは、使用プロジェクトのTCKイシュー
トラッカーで `enhancement` のラベルが付いたイシューとして作成する
必要があります。

## 互換性認証 {#_certification_of_compatibility}

Jakarta EEは、自己認証エコシステムです。あなたの実装を
[jarkarta.ee](https://jakarta.ee/ja/)
公式サイトの該当仕様ページに掲載したい場合は、このセクションで定義されている
認証リクエストが必要になります。

Jakarta EEロゴを使用したい、もしくは、[jarkarta.ee](https://jakarta.ee/ja/) Webサイト
をプロモーション用に使用したいすべての組織には、
追加要件があります。要件を満たしていない組織からの
認証リクエストは、要件が満たされるまで
保留されます。Jakarta EEブランドの使用方法を取得するための完全な手順の詳細については、[Jakarta EE商標
ガイドライン](https://jakarta.ee/ja/legal/trademark_guidelines/)
を参照してください。

承認済み認証リクエストは、意図されたTCK要件を満たしていることを仕様
プロジェクトから表明するものであり、
ロゴ使用の要件の１つに過ぎません。ロゴはプラットフォームおよび
プロフィール仕様にのみ適用されますが、互換
実装としてリストされるリクエストはどの仕様に対しても行うことができます。

### 認証リクエストの提出 {#_filing_a_certification_request}

認証された実装として認知されるリクエストは、
`certification` ラベルを使用して、仕様プロジェクトのイシュートラッカーを介して提出し、
次の情報を含める必要があります。

-   EFTLの条項の受諾書

-   製品名、バージョン、およびダウンロードURL（該当する場合）

-   仕様名、バージョンおよびダウンロードURL

-   TCKバージョン、デジタルSHA-256フィンガープリントおよびダウンロードURL

-   テストされた実装ランタイムのバージョン

-   TCK結果サマリーの公開URL

-   その他の仕様認証要件

-   実装の実行に使用するJavaランタイム

-   認証環境、オペレーティングシステム、クラウド... 
    に関する情報の概要

-   互換性ルールを含む
    すべてのTCK要件が満たされていることを証明するステートメント

### 追加の仕様認証要件  {#_additional_specification_certification_requirements}

仕様プロジェクトでは、認証に追加の項目が必要な場合があり、
該当TCKドキュメントの中で「Additional Certification Requirements」ラベルが付いている
セクションに定義されます。

このような追加要件の例として、次のものが挙げられます。

-   相互運用性テスト
    に使用される互換実装の名前とバージョン

-   永続性テストに使用するデータベースの名前とバージョン

-   永続性テストで使用されるNoSQL実装の名前とバージョン

### TCK結果概要の公開 {#_public_tck_results_summary}

認証が必要な期間、コミュニティはテスト結果の概要を閲覧できる
必要があります。少なくとも、結果の概要は、以下の条件を満たしている必要があります。

-   パスワード保護やサインアップなしで公開されている

-   次を含む概要ページを含めます:

    -   上記の認証リクエストのすべての情報

    -   実行および成功したテストの合計数。プラットフォームTCK
        を実行している場合は、各必須TCK、
        すなわち、プラットフォームTCKとプラットフォームTCKに統合されていない
        個々のTCKの結果を報告することを意味します。

すべてのテストの実行を示すオプションの「Test List Page」は、
概要ページからリンクできます。概要ページのURLは、認証リクエストに
含める必要があるURLです。

以下は明示的に要件ではありません。

-   第三者が自らテストを実施できること

-   TCKの完全なログ出力

実装者は、実装を使用したTCKの実行方法についての
情報やサポートを提供してもかまいませんが、必須ではありません。

### 認証の解決 {#_certification_resolution}

すでに述べたように、認証リクエストはそれ自体でJakarta EEロゴを使用する
権利を与えていません。TCKの要件が満たされたということは、
プロファイルの認証のためのJakarta EEロゴ使用の
前提条件です。必要な承認プロセスは次のとおりです。

-   2週間（14日）後のレイジーコンセンサスによる承認

-   仕様プロジェクトの多数決を実施次第の
    承認

    -   +1/-1票の合計が、
        仕様プロジェクト コミッターの50%以上である必要があります。

-   トップレベルの仕様プロジェクトリードによる承認

すべての仕様プロジェクトメンバーは、リクエストおよび関連するサポート資料の
レビューをすることが望まれます。認証のレビュー担当者は、
すべての必要なデータの有効性を慎重にチェックする必要があります。
特に、

-   データがそろっていること

-   成功したテスト数が、TCK検証に使用された最初の
    実装によるテストと一致している

-   TCKバージョンとデジタル指紋が一致している。

-   テスト結果は公開され、特別な登録や表示するための手続きが
    必要ない

仕様プロジェクトのコミッターは誰でも、明確に定義されたTCKプロセスに
合致していなければ、認証リクエストに
反対票を投ずることが可能です。つまり、(-1) 投票が存在する場合、
レイジーコンセンサスはもはや選択肢ではなく、多数決での
承認になります。

#### 承認済み認証リクエスト {#_accepted_certification_requests}

レビューされ、要件を満たした認証リクエストは、
`accepted` ラベルをイシューに付け、
クローズされます。その後、
\[Eclipse Foundation Technology Compatibility Kit
ライセンス\](<https://www.eclipse.org/legal/tck.php>)に従って、イシューへのポインタ/リンクを
\[<tck@eclipse.org>\](mailto:tck\@eclipse.org)へ、メールで送信する必要があります。Jakarta EEロゴ
または商標の使用（現在、プラットフォームまたはプロファイルにのみ
適用できます）が要求されている場合、\[Jakarta EE
商標
ガイドライン\](<https://jakarta.ee/ja/legal/trademark_guidelines/>)を参照してください。

#### 拒否された認証リクエスト{#_rejected_certification_requests}

レビューされた認証リクエストが要件を満たしていないことが判明した場合、
イシューは `invalid` ラベルを付与し、満たさなかった要件を添えて、
クローズされます。要件を更新して、
新しい認証イシューは、再作成する
必要があります。

### エスカレーションアピール {#_escalation_appeal}

TCKプロセスの問題が満足のいくように解決されていないことが
懸念される場合、Eclipse開発プロセス[Grievance
Handling](https://www.eclipse.org/projects/dev_process/#6_5_Grievance_Handling)
手順に従って解決をエスカレーションする必要があります。これは、
実装固有の問題を処理するための方法ではない点に注意してください。

### TCKでテストを追加または変更する方法 {#_how_tests_may_be_added_or_changed_in_a_tck}

仕様チームがメジャーアップデートまたはマイナーアップデートに適合すると考える場合、テストを追加、更新、削除、または除外することができます。

サービスリリースでは、仕様チームはTCKの異議申し立てに記載されている変更のみを行うべきであり、
サービスリリースノートには、どの異議申し立てに対処したかを記載する必要があります。サービスリリースで更新したテストは、
「承認された異議申し立て」に記載されたガイダンスに従ってください。

## TCKのポイントリビジョンをリリースするプロセス

TCKのポイントリビジョンをリリースするプロセスは、[jakartaee/specificationsリポジトリ](https://github.com/jakartaee/specifications)に次の詳細を含むイシューを提出する必要があります。

-   公開するTCKリリースへのリンク
-   更新された、仕様の_index.mdファイル内のTCKリンク
-   TCKから除外されたテストとその理由の概要
