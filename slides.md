---
# try also 'default' to start simple
theme: seriph
# random image from a curated Unsplash collection by Anthony
# like them? see https://unsplash.com/collections/94734566/slidev
background: https://source.unsplash.com/collection/94734566/1920x1080
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
v0.0.1  
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
<img src="https://pbs.twimg.com/profile_images/799890486773170176/KN4gKfS2_400x400.jpg" class="rounded-full w-40 mr"/>  
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
ハンドブックとは？となる圧巻の 1.5K 頁オーバー。レセプト業務の基盤システムを開発しています！

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

<!-- 本セッションでは、撮影やSNS拡散を歓迎しています。ご自由に写真を撮影して、XなどのSNSでシェアしてください。 　　
ただし、以下の点にご注意ください。　　

著作権などの法的な問題を避けるために、スライドや登壇者の写真や動画を無断で商用利用しないでください。　　
他の参加者のプライバシーや迷惑にならないように、撮影や投稿する際には配慮してください。　　
SNSでシェアする際には、ハッシュタグ「#phperkaigi #TrackA」をつけてください。　　
これにより、本セッションの関連情報を簡単に検索できるようになります。 -->

---
layout: two-cols-header
---

# 今日お話すること・話さないこと
スコープ的なお話

::left::

### 🤫話さないこと

- 技術的な詳細  

::right::

### 📣話すこと

- リリース戦略の方針  

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

---
layout: default
---

# プログラムの流れ
アジェンダ

1. リリース管理が大変な理由
1. 事例となるプロダクト＆背景説明
1. リリースに関する悩みアレコレ
1. リリース戦略
1. 運用負荷上昇のリスク
1. 出来たリリースフロー
1. 改善した結果
1. よかったこと
1. まとめ

---
transition: slide-up
---

# リリース管理が大変な理由
日々変化する状況に対応していかなければならない

* だんだんシステムが複雑になり、依存関係が発生してデプロイの難易度があがる
* 関係者も多数だと調整が大変になっていく
* 開発着手順がそのままリリース順とはならない  
開発規模の大小さまざまで、並行開発される
* 内外に向けての適切なタイミングでリリース内容を情報共有しないといけない  
必要な情報共有として修正内容、影響範囲、影響度とか多岐にわたる
* システム全体と各関係者の状況を把握していないとリリース管理ができない

---
layout: center
---

# リリースやデプロイを判断する人が固定化する問題
往々としてリーダー的なメンバーへ集中しがち。慣れな部分があるけれど、、  

この機能はいつリリースだっけ？と脳内リソースを一定消費してしまう  
リリース都度に判断を求められる

---
layout: statement
---

# 今回のお話

---

# プロジェクト概要＆特性
所謂マイクロサービスの1つのサービス

* 自社サービスから接続する BaaS（レセプト業務を扱う API）  
* スキーマ駆動開発を採用
* 接続するアプリケーションが複数存在し、それぞれ別チームが運営
* シングルテナンシー（single-tenancy）で利用する想定[^1]  
稼働するバージョンがサービスによって異なる可能性がある
* 3 チーム体制で担当サービスを平行開発する  
* 月 1 回程度の定期リリースを行う  
リリース前に品質保証テストを実施する

[^1]: センシティブな情報を扱うので、データ管理上のリスクがある。  
また、サービスを跨ってのリリース調整は難しいとの判断

---
transition: slide-up
---

# 悩みごと
プロジェクトのリリース管理上での課題感

* バージョン管理が煩雑になりそう
* アプリケーションと API 仕様書のバージョンの同期して共有しないと混乱しそう  
スキーマを公開してから、クライアント要望等で見直しが入る可能性がある
* クライアント＆環境毎にどのバージョンが反映されているか？把握するのが難しい  
仕様確認や不具合発生時の問い合わせが複数チームから発生する

---
layout: statement
---

# リリース戦略

---

# リリーストレイン
独立したチームが協調してリリース計画を行う

リリース日を決めてリリースブランチカットを行い、リリースに間に合わなかった機能は  
次のリリースタイミングに先送りする
<img src="release-train.png" class="h-90" alt="リリーストレイン" />  

---

# リリースブランチカットするタイミングについて
別プロジェクトでの事例(git-flow)

1. 開発スコープを決めて QA リソースも抑えてリリース日を決める
2. 開発開始してテスト可能になったら develop 用 build [^1] をテスト環境に開発者がリリース  
任意のタイミングで任意のブランチでのビルドも可
3. QA がテスト環境で検証。問題があれば 2 からやり直し
4. リリースのリハーサル日の前日にタグ付け <div class="mention">←　ココ！</div>  
5. Release 用 build [^2] をステージング環境でリリース・リハーサル実施
6. リリース日に本番環境へリリース

[^1]: develop ブランチへの merge を起点にしてビルド
[^2]: タグ付けを起点にしてビルド

---

# リリースブランチカットするタイミングについて
細かくリリースブスブランチを切る戦略

* リリース日が未定な状態でもバージョンタグを付ける  
開発環境へのデプロイするタイミングでタグを付ける  
統一したバージョンで関係チームと共有する
* タグ連動したリリースフローの整備  
API 仕様書もバージョン管理する  
アプリケーションにバージョン情報を埋め込む  
上記の一連をアプリケーションのリリースと連動させたバージョン管理

---

# リリース戦略の狙い
タグ付けを逐次行うスタイル

* 依存関係のあるサービスのバージョンを明確化  
共通の統一したバージョンを関係チームと認識となる状態とする
* バージョンの差分をわかりやすくする
* 小さくリリースすることでビックバンリリースにさせない  
バージョンを小出しにすることで、フィードバックサイクルを早くする
* 参照している API 仕様書のバージョンで安心して [^1] 開発が進められる  
クライアント側で対応するバージョンの選択の余地ができる  

[^1]:AP 仕様書とアプリケーションのバージョンの整合性を取ることで意図しない Breaking Change を防ぐ

---
transition: slide-up
---

# 運用負荷上昇のリスク
開発プロセスとして正しく運用されなければ絵に描いた餅になる

* サービス提供側（プロバイダ）
  * タグ付け作業
  * リリースノート作成
  * ドキュメント反映
  * リリース前準備や付帯作業
* サービス利用側（コンシューマ）
  * API 仕様書の差分を追うのが大変
  * 各環境のデプロイの調整

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

# セマンティックバージョニング 2.0.0
SemVer

```
<version core> ::= <major> "." <minor> "." <patch>
```

---

# セマンティックバージョニングとは？
バージョン番号間で互換性を表す

<blockquote>
<p>1. 基本的に数字 3 つでバージョンを表し、リリース前の不安定なバージョンには alpha や rc などがつくことがある</p>
<p>2. 一番左の数字が大きくなったら後方互換性がない</p>
<p>3. 一番左の数字が 0 のときはどの数字が上がっても後方互換性がない</p>
<p>4. たまに一番左以外の数字があがったときに後方互換性がない場合がある</p>
</blockquote>
<a href="https://dev.classmethod.jp/articles/summary-for-semver/">Semantic Versioning おさらい</a> より


---
layout: statement
---

# tagpr

---

# tagprとの出会い

<Tweet id="1576165379747246082" />

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


---

# tagprでのリリース＆バージョン管理事例
実はこのスライドも管理されていたりします

![slidev version](slidev-version.png)
バージョン番号はこれ（スライド執筆時点）

---

# tagprまとめ
GitHub flow のデメリットを補う最後のピース

* リリース手順に非常に緩い制約付けがされる  
* リリースの workflow の起点となる
* CHANGELOG やリリースノートも連動して作成される
* リリース作業自体がオープン化される  
次にリリースされる内容がわかる。BreakingChange もわかる

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

[^1]: ビルドコストを下げる為に現状は停止中

---

# tagprのTips

* 次のバージョン決定が label 連動で制御される  
Migration 有や OpenAPI 変更有のラベルと連動して Minor アップデートにする
  ```yaml
  [tagpr]
    minorLabels = migration,oas-change
  ```
* 仮リースなのか？本リリースなのか？判定する方法  
tagpr のアクション呼び出し後の outputs.tag を判定して github script 経由で後続の wokflow の dispatch を呼び分ける
  * 本リリース
  ```yaml
  if: steps.tagpr.outputs.tag != ''
  ```
  * 仮リリース
  ```yaml
  if: steps.tagpr.outputs.tag == ''
  ```

<!--
minorLabelsとmajorLabelsは以下のPRで提案させて頂きました  
https://github.com/Songmu/tagpr/pull/142
-->

---

# CDパイプライン全体像

* リリースブランチへ Merge 時  
次のリリース用のリリース用 PR 作成（tagpr 標準機能）  
次のリリースバージョン用の API 仕様書作成  
次のリリースバージョン用のコンテナイメージ作成（ECR push）  
* リリース用 PullRequest Merge 時  
タグ付け（tagpr 標準機能）  
CHANGELOG 更新（tagpr 更新）  
リリース（ノート）作成（tagpr+Github 標準機能）  
タグ付けバージョンのコンテナイメージ作成（ECR push）    
API 仕様書公開（Latest 反映）  
API 仕様書変更点（oasdiff）  
* リリースフロー  
runn を利用して ssh 接続してチーム開発環境へのデプロイを自動化  
テスト環境以降は ECR にプッシュされたイメージを利用して Github Actions でデプロイ

---

# tagprを導入して感じたメリット

* テスト環境以降のデプロイを各サービスのチームメンバーに任せられるようになった  
リリーストレインでテスト OK になったバージョンを選択してリリースに含める流れ
* API 変更点の共有を省力化  
バージョンアップ時にリリースノートのみを共有するだけ  
最新 API 仕様書が公開サーバー（S3 Web）に自動反映(差分内容見える化)  
* リリースに伴うソース凍結期間を設けなくて良くなった
* リリースマネジメントが民主化される  
次期リリース内容が見えるようになって、各チーム間でいい感じに調整が行われる

---

# tagprの波及効果

* SRE 部門も使い始めた  
ベースイメージを tagpr でバージョン管理し、依存しているリポジトリから renovate させる
* workflow を整理できてビルドコストも低減することが可能  
* 細かくリリースを心がけるようになる  
tagpr がリリース用 PR を纏めてくれることで、細かくリリースをしようとするマインドになる

---

# 参考資料＆リンク

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
