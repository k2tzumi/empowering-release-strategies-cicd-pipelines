---
# try also 'default' to start simple
theme: seriph
# random image from a curated Unsplash collection by Anthony
# like them? see https://unsplash.com/collections/94734566/slidev
background: https://cover.sli.dev
# apply any unocss classes to the current slide
class: 'text-center'
# https://sli.dev/custom/highlighters.html
highlighter: shiki
# some information about the slides, markdown enabled
iinfo: |
    マイクロサービスアーキテクチャを採用したプロジェクトにおいて、複数のチームが協力してリリーストレインを進める際に、自律的かつ効率的なリリース調整を行う方法を紹介します。
    リリース戦略においてマイクロサービスアーキテクチャの特性を考慮し、チーム間のコミュニケーションを最小限に抑えつつ、効率的なプロセスを実現するためのアプローチおよびそれを支えCI/CDのワークフローに触れます。

drawings:
  persist: false
transition: slide-left
title: リリース戦略を支えるCI/CDパイプライン
mdc: true
addons:
  - "@katzumi/slidev-addon-qrcode"
  - "slidev-addon-components"
  - "slidev-addon-rabbit"
---

# リリース戦略を支えるCI/CDパイプライン

[CI/CD Test Night #7](https://testnight.connpass.com/event/311263/)　March 26, 2024.  
v0.0.5  
@katzumi(かつみ)

<div class="pt-12">
  <span @click="$slidev.nav.next" class="px-2 py-1 rounded cursor-pointer" hover="bg-white bg-opacity-10">
    Press Space for next page <carbon:arrow-right class="inline"/>
  </span>
</div>

<div class="abs-br m-6 flex gap-2">
  <button @click="$slidev.nav.openInEditor()" title="Open in Editor" class="text-xl slidev-icon-btn opacity-50 !border-none !hover:text-white">
    <carbon:edit />
  </button>
  <a href="https://github.com/k2tzumi/empowering-release-strategies-cicd-pipelines" target="_blank" alt="GitHub" title="Open in GitHub"
    class="text-xl slidev-icon-btn opacity-50 !border-none !hover:text-white">
    <carbon-logo-github />
  </a>
</div>

<!--
The last comment block of each slide will be treated as slide notes. It will be visible and editable in Presenter Mode along with the slide. [Read more in the docs](https://sli.dev/guide/syntax.html#notes)
-->

---
transition: fade-out
layout: two-cols-header
---

# 自己紹介

katzumi（かつみ）と申します。

「障害のない社会をつくる」をビジョンに掲げている「りたりこ」という会社に所属しています
<a href="https://litalico.co.jp/">
<img src="https://litalico.co.jp/ogp.png" class="w-40" />
</a>

以下のアカウントで活動しています。

::left::

<div class="float-left">
<img src="https://pbs.twimg.com/profile_images/1768978237210935296/idy9J4l6_400x400.jpg" class="rounded-full w-40 mr"/>  
<simple-icons-x /> <a href="https://twitter.com/katzchum">katzchum</a></div>  
<QRCode width="180" height="180" value="https://twitter.com/katzchum" color="4329B9" image="Logo_of_X.svg" />

::right::

<img src="https://avatars.githubusercontent.com/u/1182787?v=4" class="rounded-full w-40 mr-12"/>

<logos-github-octocat /> [k2tzumi](https://github.com/k2tzumi)  
<simple-icons-zenn /> [katzumi](https://zenn.dev/katzumi)  

<br />

<style>
h1 {
  background-color: #2B90B6;
  background-image: linear-gradient(45deg, #4EC5D4 10%, #146b8c 20%);
  background-size: 100%;
  -webkit-background-clip: text;
  -moz-background-clip: text;
  -webkit-text-fill-color: transparent;
  -moz-text-fill-color: transparent;
}
</style>

---
layout: default
transition: fade-out
---

# 複雑なドメインと向き合っています  
ハンドブックとは？🤔 圧巻の 1.5K 頁オーバー。レセプト業務の基盤システムを開発しています！

<img src="https://github.com/k2tzumi/activerecord-pattern-unlearning-clean-architecture/blob/main/public/ISBN-978-4805887332.png?raw=true" />

---
layout: two-cols-header
transition: fade-out
---

# お願い

写真撮影、SNS での実況について

登壇者の励みになるので是非ともご意見やご感想など、フィードバック頂けると助かります mm  
あとでスライドを公開します

::left::

<Transform :scale="2.5">
　　　🙆‍♀📷<ph-projector-screen-chart-light /><br />
　　　🙅‍♂📹💸<br />
　　　🙅📸👨‍👦‍👦<br />
</Transform>

::right::

<br />
<Transform :scale="2">
<fa6-brands-square-x-twitter />
</Transform>
<br />
<a href="https://twitter.com/search?q=%23cicd_test_night">#cicd_test_night</a>

<!-- 本セッションでは、撮影やSNS拡散を歓迎しています。ご自由に写真を撮影して、XなどのSNSでシェアしてください  
ただし、以下の点にご注意ください  

著作権などの法的な問題を避けるために、スライドや登壇者の写真や動画を無断で商用利用しないでください。  
他の参加者のプライバシーや迷惑にならないように、撮影や投稿する際には配慮してください。  
SNSでシェアする際には、ハッシュタグ「#cicd_test_night」をつけてください。  
これにより、本セッションの関連情報を簡単に検索できるようになります
-->

---
layout: two-cols-header
---

# 今日お話すること・話さないこと
スコープ的なお話

::left::

### 🤫話さないこと

- 詳細な workflow や設定内容  
- ブランチワークの説明

::right::

### 📣話すこと

- リリース管理での悩み事  
- リリース戦略  
- 開発プロセスの見直し
- 省力化・自動化内容

<!--
技術詳細は少なめでリリース戦略を中心に課題と手段について説明していきます
-->

---
transition: slide-up
---

# 本プログラムのゴール🏁
リリース調整業の軽減

プロダクトのリリース戦略を考えるきっかけになれば嬉しいです  　

* 想定ターゲット層  
  * リリース間隔が 2 週〜1 ヶ月程度（定期リリース）のプロダクト
  * 開発プロセスにリリース前の受け入れテストがある  
  品質保証テスト(QAT)、ユーザー受入れテスト(UAT)
  * 複数リポジトリに分割され依存関係があるサービス  
  マイクロサービスとか、フロントエンド（アプリ含む）・バックエンドに分かれている
  * 複数チームによる開発
  * SRE とか Platform Engineering 領域

<!--
リリース戦略を考える契機になれば。。  
ターゲットは定期リリースを行っていてリリース前にQAテストがあるプロジェクトになります
-->

---
layout: default
transition: fade
---

# プログラムの流れ
Agenda

1. リリース管理のつらみ
1. 今回のお話(事例プロジェクト説明)
1. リリース戦略
1. 運用課題
1. ソリューション
1. 改善結果
1. まとめ

<!--
本日お話する流れです
-->

---
layout: image-right
image: section1.jpeg
class: mt-45
backgroundSize: 20em 60%
transition: slide-up
---

# <material-symbols-counter-1 />リリース管理つらみ

<!--
https://copilot.microsoft.com/images/create/e383aae383aae383bce382b9e7aea1e79086e381aee381a4e38289e381bf/1-65f64b7fabc649208536cdd84f326bc2?id=somMB%2fIvPRkWGRMbcxZ3sg%3d%3d&view=detailv2&idpp=genimg&idpclose=1&thId=OIG3.ig8r8v9L1MqoKuuXO91Q&FORM=SYDBIC
-->
---

# リリース管理が大変な理由
日々変化する状況に対応していかなければならない

* だんだんシステムが複雑になり、依存関係が発生してデプロイの難易度があがる
* 関係者も多数で調整が大変
* 開発着手順がそのままリリース順とはならない  
開発規模がさまざまで尚且つ並行開発される
* 内外に向けての適切なタイミングでリリース内容を共有しないといけない  
必要な情報は受け取り手によっても違うし、多岐にわたる
* システム全体と関係各位の状況を把握する必要がある

<!--
システムが複雑になり関係者が増えるとリリース作業も複雑化していきます  
全体を俯瞰できる人でないとリリース管理できない
-->

---
layout: center
transition: fade
---

# リリースやデプロイを判断する人が固定化する問題
プロジェクトリーダー的な人に負担が集中しがち。慣れな部分ではあるけれど

この機能はいつリリースだっけ？と脳内リソースを一定消費してしまう  
リリース都度に判断を求められる

<!--
リリース調整で孤独を感じている人向けにお話します
-->

---
layout: image-right
image: section2.jpeg
class: mt-45
backgroundSize: 20em 60%
transition: slide-up
---

# <material-symbols-counter-2 />今回のお話
事例となるプロジェクトの説明

<!--
https://copilot.microsoft.com/images/create/e4ba8be4be8be38397e383ade382b8e382a7e382afe38388e8aaace6988ee381aee794bbe5838f-e383ace382bbe38397e38388e6a5ade58b99e381aee8a38fe696b9/1-65f64d1ca8ee48e499a74077c19c106d?id=hxyrM%2bs1rgONQRfLvXLC%2bA%3d%3d&view=detailv2&idpp=genimg&idpclose=1&thId=OIG3.Adi9ddbrroSVBBXqRQb3&FORM=SYDBIC
-->
---

# プロジェクト概略
所謂マイクロサービスの 1 つのサービス

* 自社サービスから接続する BaaS（レセプト業務を扱う API）  
* スキーマ駆動開発を採用
* 接続するアプリケーションが複数存在し、それぞれ別チームが運営
* シングルテナンシー（single-tenancy）で利用する想定[^1]  
稼働するバージョンがサービスによって異なる可能性がある
* 3 チーム体制で担当サービスを平行開発する  
* 月 1 回程度の定期リリースする  
リリース前に品質保証テストを実施する

[^1]: センシティブな情報を扱うので、データ管理上のリスクがある。  
また、サービスを跨ってのリリース調整は難しいとの判断

<!--
ざっくり説明すると。。  
スキーマ駆動開発を採用するレセプト業務のBaaS  
クライアントによって利用されるバージョンが異なる可能性があるのが特徴  
QAだったり関係者も多いプロジェクト
-->

---
transition: fade
---

# 悩みごと
プロジェクト立ち上げ時の課題認識

<Transform :scale="1.2">

* バージョン管理の複雑さ  
複数バージョンが並行稼働する
* API 仕様書とアプリケーションの同期  
アプリケーションと API 仕様書のバージョンの同期して共有する必要がある  
スキーマを公開してから、クライアント要望などで見直される可能性
* バージョンの把握難易度  
クライアントごとや環境ごとにどのバージョンが反映されているかを把握するのが難しい  
仕様確認や不具合発生時の問い合わせが複数のチームから発生する

</Transform>


<!--
バージョン管理が煩雑になり、仕様書の共有一つとっても関係者との調整コストが掛かりそうというイメージがありました
-->

---
layout: image-right
image: section3.jpeg
class: mt-45
backgroundSize: 20em 60%
transition: slide-up
---

# <material-symbols-counter-3 />リリース戦略

<!--
https://copilot.microsoft.com/images/create/e383aae383aae383bce382b9e688a6e795a5e38292e382a4e383a1e383bce382b8e38197e3819fe794bbe5838fe38292e4bd9ce68890e38197e381a6e3818fe381a0e38195e38184-e794bbe5838fe381abe381afe99bbbe8bb8ae38282e590abe38281e381a6e3818fe381a0e38195e38184/1-65f64e52b21e46d0887dc2bef16ccee2?id=rYkJJFBDxZ%2BkU%2BTxYWjJGA%3D%3D&view=detailv2&idpp=genimg&idpclose=1&thid=OIG1.zGFoNvB1crJkMx7gZ5CO&form=SYDBIC
-->

<!--
次のスライドから、リリース戦略を考えていきます。  
これからの話は、今回のサービスと連携するサービスのリリース事情と対比して説明します。
-->

---

# リリーストレイン
特定の期間ごとにリリースする手法

<Transform :scale="0.6">

リリース日を決めてリリースブランチカットを行い、リリースに間に合わなかった機能は  
次のリリースタイミングに先送りする

![リリーストレイン](release-train.png)

</Transform>

<!--
今回の関連するサービスでは開発サイクルが眺めなので、リリース戦略の基本的な考え方はリリーストレインを採用していました。  
今回のサービスではこの一チームとしてこのフローになることになります
-->

---
transition: fade
---


# 従来のリリースブランチカットするタイミング
別プロジェクトでの事例(git-flow)

1. 開発スコープを決めて QA リソースも抑えてリリース日を決める
2. 開発開始してテスト可能になったら develop 用 build [^1] をテスト環境に開発者がリリース  
3. QA がテスト環境で検証。問題があれば 2 からやり直し  
4. <span v-mark.circle.red="1">リリースのリハーサルの前日にタグ付け</span>   
5. Release 用 build [^2] をステージング環境でリリース・リハーサル実施
6. リリース日に本番環境へリリース

[^1]: develop ブランチへの merge を起点にしてビルド  
任意のタイミングで任意のブランチでのビルドも可
[^2]: タグ付けを起点にしてビルド

<!--
* タグ付けするのはリリース直前のみ  
* イメージ作成のworkflowが２種類存在ました
-->

---

# 見直し後のリリースブランチカットするタイミング
細かくリリースブスブランチを切る戦略

* リリース日が未定な状態でもバージョンタグを付ける  
<span v-mark.red="1">開発環境へのデプロイするタイミングでタグを付ける</span>  
* タグ連動したリリースフローの整備  
API 仕様書もバージョン管理する  
アプリケーションにバージョン情報を埋め込む  
🖕をアプリケーションの<span v-mark.circle.orange="2">リリースと連動させたバージョン管理</span>

---
transition: fade
---

# 開発プロセス見直しの狙い
タグ付けを逐次行うスタイル

<v-clicks>

1. 依存関係のあるサービスのバージョンを明確化  
共通の統一したバージョンを関係チームと共有した状態にする
1. バージョンを小出しにすることで、フィードバックサイクルを早くする  
ビックバンリリースにしない  
あわせてバージョンの差分も見やすくする
1. 参照している API 仕様書のバージョンで安心して開発が進められる  
API 仕様書とアプリケーションのバージョンの乖離を発生させない  
バージョン指定で環境を再現可能にすることで、クライアント側で対応するバージョンを選択できる  

</v-clicks>

---
layout: image-right
image: section4.jpeg
class: mt-45
backgroundSize: 20em 60%
transition: slide-up
---

# <material-symbols-counter-4 /> 運用課題

<!--
https://copilot.microsoft.com/images/create/e9818be794a8e8aab2e9a18ce38292e382a4e383a1e383bce382b8e38199e3828be794bbe5838f-e382bfe382b0e38284e3838ee383bce38388e38292e4bd9ce68890e38199e3828be4babae381a8e38081e8a68be3828be581b4e381aee4babae3818ce3819de3828ce3819ee3828ce5bf99e38197e3819de38186/1-65f64f681ae54800a8100f9ac913ae5f?id=roVDparRX9MKVwlU983FMg%3D%3D&view=detailv2&idpp=genimg&idpclose=1&thid=OIG2.YbR2zIM3aoP4EJlZ93GD&form=SYDBIC
-->

---
transition: slide-up
layout: two-cols-header
---

# 運用負荷上昇のリスク
それぞれ運用負荷増となる

依存関係の元と先の両方の運用を考える必要がある

::left::

### サービス提供側（プロバイダ）
  * タグ付け作業   
  そもそも<span v-mark.circle.orange="1">タグ付けのルールどうする？🤔</span>
  * リリースノート作成
  * ドキュメント反映
  * リリース前準備や付帯作業

::right::

### サービス利用側（コンシューマ）
  * 各環境のデプロイの調整
  * API 仕様書の差分を追うのが大変
  * <span v-mark.red="2">バージョン差異の影響度がわからない</span>

---
layout: statement
transition: fade
---

# ⚠開発プロセスとして
# 正しく運用されなければ
# 絵に描いた餅になる

---
layout: image-right
image: section5.jpeg
class: mt-45
backgroundSize: 20em 60%
transition: slide-up
---

# <material-symbols-counter-5 /> ソリューション

<!--
https://copilot.microsoft.com/images/create/e78cabe381aee3818ae38282e381a1e38283e381aee38391e383bce38384e3818ce382bfe382b0e38292e4bb98e38191e38289e3828ce381a6e38081e6a49ce59381e38292e38195e3828ce381aae3818ce38289e5be90e38085e381abe7b584e381bfe4b88ae38192e38289e3828ce381a6e38081e69c80e7b582e79a84e381abe78cabe381aee3818ae38282e381a1e38283e3818c/1-65f653d08ad14c279e2baea712bbdaef?id=7PSLtzNaVj7YoOrFMHlJWw%3D%3D&view=detailv2&idpp=genimg&idpclose=1&thid=OIG1.wvFc1nvuI1JG3gcAHlBF&form=SYDBIC
-->
---
layout: statement
---

# どう立ち向かうか？

---
layout: statement
---

# OSSの開発スタイルに倣う

---
layout: statement
---

# セマンティックバージョニング
SemVer

```
<version core> ::= <major> "." <minor> "." <patch>
```

---
transition: view-transition
mdc: true
---

# セマンティックバージョニングとは？
 バージョン番号(`<major> "." <minor> "." <patch>`)間の差分で互換性を表す

<blockquote>
<p>1. 基本的に数字 3 つでバージョンを表し、リリース前の不安定なバージョンには alpha や rc などがつくことがある</p>
<p>2. 一番左の数字が大きくなったら後方互換性がない</p>
<p>3. 一番左の数字が 0 のときはどの数字が上がっても後方互換性がない</p>
<p>4. たまに一番左以外の数字があがったときに後方互換性がない場合がある</p>
</blockquote>
<a href="https://dev.classmethod.jp/articles/summary-for-semver/">Semantic Versioning おさらい</a> より


---
layout: cover
background: release-pr-cover.png
---

# tagpr

---

# tagprとの出会い

<Tweet id="1576165379747246082" />

---
transition: slide-up
---

# tagprの動き
[リリース用のpull requestを自動作成し、マージされたら自動でタグを打つtagpr](https://songmu.jp/riji/entry/2022-09-05-tagpr.html)

* リリース用の pull request が GitHub Actions で自動で作られる  
バージョン番号が書かれたファイルや CHANGELOG.md を自動更新
* その pull request をマージするとマージコミットに自動でバージョン tag が打たれる  
semver 前提

---
layout: statement
---

# Demo  
https://github.com/k2tzumi/empowering-release-strategies-cicd-pipelines

<QRCode width="180" height="180" value="https://github.com/k2tzumi/empowering-release-strategies-cicd-pipelines" color="4329B9" />

---

# tagprでのリリース＆バージョン管理事例
実はこのスライドも管理されていたりします

![slidev version](slidev-version.png)
バージョン番号はこれ（スライド執筆時点）

---
transition: fade
---

# tagprまとめ
GitHub flow のデメリットを補う最後のピース

* SemVer によるバージョン管理  
バージョン番号で影響度がわかるようになる
* リリース手順に非常に緩い制約付けがされる  
* リリースの workflow の起点となる
* CHANGELOG やリリースノートも連動して作成される
* リリース作業自体がオープン化される  
次にリリースされる内容が他のチームからもわかる

---
layout: image-right
image: section6.jpeg
class: mt-45
backgroundSize: 20em 60%
transition: slide-up
---

# <material-symbols-counter-6 />改善結果

<!--
https://copilot.microsoft.com/images/create/e38391e382a4e38397e3818ce382bfe382b0e381a7e381a4e381aae3818ce381a3e381a6e38081efbc92e58cb9e381aee78cabe3818ce382b3e3839fe383a5e3838be382b1e383bce382b7e383a7e383b3e381a7e3818de381a6e38184e3828b/1-65f65776158f421a8ba903ca37c71b05?id=vCD%2Bt6KiUmaDXkFK4uCWtA%3D%3D&view=detailv2&idpp=genimg&idpclose=1&thid=OIG1.Kz5.asEWmAtI7TJHGFCW&form=SYDBIC
-->
---

# リリースworkflowで実現したアレコレ
実装例です

* 次バージョンでの build 作成 [^1]
* OpenAPI 仕様書公開  
S3 静的ウェブサイトホスティングに sync  
以下の 3 つのバージョンでの仕様書公開
  * latest  
  リリースタイミングで反映
  * 次バージョン  
  リリースブランチに merge 時に反映
  * 過去のバージョン  
* OpenAPI の仕様書のバージョン間の差分作成  
[Tufin/oasdiff](https://github.com/Tufin/oasdiff) で breaking changes を検知

[^1]: ビルドコストを下げる為に現時点では停止中

---

# tagprのTips

* 次のバージョン決定が label 連動で制御される  
Migration 有や OpenAPI 変更有のラベルと連動して Minor アップデートにする
  ```yaml
  [tagpr]
    minorLabels = migration,oas-change
  ```
* 仮リース [^1] なのか？本リリースなのか？判定する方法  
tagpr のアクション呼び出し後の outputs.tag を判定して github script 経由で後続の wokflow の dispatch を呼び分ける
  * 本リリース
  ```yaml
  if: steps.tagpr.outputs.tag != ''
  ```
  * 仮リリース
  ```yaml
  if: steps.tagpr.outputs.tag == ''
  ```

[^1]: リリースブランチへの merge が通常の Pull Request のものか？

<!--
minorLabelsとmajorLabelsは以下のPRで提案させて頂きました  
https://github.com/Songmu/tagpr/pull/142
-->

---

# CDパイプライン全体まとめ

<Transform :scale="0.9">
✅はtagpr標準機能で実現

| イベント | ワークフロー・アクション |
| --- | --- |
| リリースブランチ Merge 時 | ✅リリース用 PR 作成<br /> 次リリースバージョンの API 仕様書作成（swagger-php, redoc） <br /> 次リリースバージョンのコンテナイメージ作成（ECR push） |
| リリース用 PR Merge 時 | ✅リリースタグ付け<br />✅API バージョン情報書き換<br />✅CHANGELOG 更新<br />✅リリース（ノート）作成（tagpr+GitHub）<br />リリースバージョンのコンテナイメージ作成（ECR push）<br />API 仕様書公開（Latest 反映）  <br />API 仕様書変更点まとめ（oasdiff） |
| チーム開発環境リリース時  | タグ指定して runn でEC2へデプロイ（ssh 自動化ツールとして利用)   |
| テスト環境以降リリース時  | タグ指定して ecspresso でECSへデプロイ(GitHub Action経由)  |

</Transform>

---

# ドキュメントの品質向上への取り組み（CI）
スキーマ駆動開発で仕様書の品質確保が重要

* OpenAPI の仕様書の静的チェック  
[stoplightio/spectral](https://github.com/stoplightio/spectral) で Lint  
OpenAPI の関連ツールで仕様書を利用可能か？を検証する
* OpenAPI の仕様書と API の実装が乖離のチェック  
runn を利用してリクエストとレスポンスが OpenAPI の仕様書通りか？テストを行う

---
layout: image-right
image: section7.jpeg
class: mt-45
backgroundSize: 20em 60%
transition: slide-up
---

# <material-symbols-counter-7 />まとめ

<!--
https://copilot.microsoft.com/images/create/e383aae383aae383bce382b9e3839ee3838de382b8e383a1e383b3e38388e381aee6b091e4b8bbe58c96e38284e382bbe383abe38395e3839ee3838de382b8e383a1e383b3e38388/1-65f6783248ae4720b7766220abc0fc26?id=cSKVXZkiOvx9Bs07mt9VCA%3D%3D&view=detailv2&idpp=genimg&idpclose=1&thid=OIG1.PjpjN0RQJT_ZCvI_ea1j&form=SYDBIC
-->
---

# tagprを導入して感じたメリット
CI/CD パイプラインを充実させることで運用負荷がかからず開発者体験の向上ができる

* テスト環境以降のデプロイ作業を各サービスのチームメンバーへタスク移譲できた  
テスト OK になったバージョンでリリーストレインに乗るイメージ
* API 変更点の共有を省力化  
バージョンアップ時にリリースノートを共有するだけ  
最新 API 仕様書をいつでも見られるようにした（遅延なし）  
差分もログとして管理される
* リリースマネジメントが民主化される  
次回のリリース内容が見えるようになって、いい感じに協調できる

<!--
【補足】  
リリースに伴うソース凍結期間を設けなくて良くなった
-->

---

# tagprの波及効果
行動様式が変わりそうな予感

* SRE 部門も使い始めた  
ベースイメージを tagpr でバージョン管理し、依存しているリポジトリで renovate させる  
→　共通コンポーネントや、ベースイメージなどプラットフォーム領域と相性が良さそう
* 細かくリリースを心がけるようになる  
tagpr がリリース用 PR を纏めてくれることで、細かくリリースをしようとするマインドになる
* バージョンのトレースがし易くなった  
ログや監視ツールに API のバージョンを表示さるようにした    
バージョン齟齬によるエラーが直ぐに判別できる

<!--
【補足】  
workflow を整理できてビルドコストも低減することが可能
-->

---

# 参考資料＆リンク

* セマンティック バージョニング 2.0.0  
https://semver.org/lang/ja/
* Songmu/tagpr  
https://github.com/Songmu/tagpr
* リリース用の pull request を自動作成し、マージされたら自動でタグを打つ tagpr  
https://songmu.jp/riji/entry/2022-09-05-tagpr.html
* tagpr で実現する Pull Request 上で進める OSS のリリースマネジメント
https://k1low.hatenablog.com/entry/2022/10/04/083000
* 登壇を支える技術  
https://zenn.dev/katzumi/articles/technology-supporting-speakers

---
layout: end
---

ご清聴ありがとうございました
