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
ハンドブックとは？となる圧巻の1.5K頁オーバー。レセプト業務の基盤システムを開発しています！

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
  * リリース間隔が2週〜1ヶ月程度（定期リリース）のプロダクト
  * 開発プロセスにリリース前の受け入れテストがある  
  品質保証テスト(QAT)、ユーザー受入れテスト(UAT)
  * 複数リポジトリに分割され依存関係があるサービス  
  マイクロサービスとか、フロントエンド（アプリ含む）・バックエンドに分かれている
  * 複数チームによる開発
  * SREとかPlatform Engineering領域

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
* 開発規模がばらばらな修正が平行して発生し、開発着手順がそのままリリース順とはならない
* 内外に向けての適切なタイミングでリリース内容を情報共有しないといけない  
必要な情報共有として修正内容、影響範囲、影響度とか多岐にわたる
* システム全体と各関係者の状況を把握していないとリリース管理ができない

---
layout: center
---

# リリースやデプロイを判断する人が固定化する問題
往々としてリーダー的なメンバーへ集中しがち。慣れな部分があるけれど、、  

この機能はいつリリースだっけ？と脳内リソースを一定消費してしまう  
リリースの都度の判断を求められる

---
layout: statement
---

# 今回のお話

---

# プロジェクト概要＆特性
所謂マイクロサービスの一つのサービス

* 自社サービスから接続するBaaS（レセプト業務を扱うAPI）  
* スキーマ駆動開発を採用
* 接続するアプリケーションが複数存在し、それぞれ別チームが運営
* シングルテナンシー（single-tenancy）で利用する想定[^1]  
稼働するバージョンがサービスによって異なる可能性がある
* 3チーム体制で担当サービスを平行開発する  
* 月1回程度の定期リリースを行う  
リリース前に品質保証テストを実施する

[^1]: センシティブな情報を扱うので、データ管理上のリスクがある。  
また、サービスを跨ってのリリース調整は難しいとの判断

---
transition: slide-up
---

# 悩みごと
プロジェクトのリリース管理上での課題感

* バージョン管理が煩雑になりそう
* アプリケーションとAPI仕様書のバージョンの同期して共しないと混乱しそう  
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

リリース日を決めてリリースブランチカットを行い、リリースに間に合わなかった機能は次のリリースへ先送りする
<img src="release-train.png" class="h-90" alt="リリーストレイン" />  

---

# リリースブランチカットするタイミングについて
別プロジェクトでの事例

1. 開発スコープを決めてQAリソースも抑えてリリース日を決める
2. 開発開始してテスト可能になったらdevelopブランチをテスト環境に開発者がリリース
3. QAがテスト環境で検証。問題があれば2からやり直し
4. リリース日のおよそ1週間前にタグ付け <div class="mention">←　ココ！</div>  
基本はdevelopブランチをタグ付け。   
<span v-mark.underline.orange>QAで問題があったり間に合わない場合は、Revertしたり</span>、しなかったりして、いい感じにタグ付け
5. ステージング環境でタグ付けしたバージョンでリリース・リハーサル実施
6. リリース日に本番環境へリリース

---

# リリースブランチカットするタイミングについて
細かくリリースブスブランチを切る戦略

* 開発環境へのデプロイするタイミングでタグ付けして統一したバージョンで関係チームと共有する
* タグ連動したリリースフローを整備する  
アプリケーションだけでなくAPI仕様書も同じバージョン番号を利用して管理・共有するようにする

---

# リリース戦略の狙い
タグ付けを逐次行うスタイル

* 依存関係のあるサービスのバージョンを明確化  
共通の統一したバージョンを関係チームと認識となる状態とする
* バージョンの差分をわかりやすくする
* 小さくリリースすることでビックバンリリースにさせない
* 参照しているAPI仕様書のバージョンで安心して [^1] 開発が進められる  
クライアント側で対応するバージョンの選択の余地ができる  

[^1]:AP仕様書とアプリケーションのバージョンの整合性を取ることで意図しないBreaking Changeを防ぐ

---

# 懸念される運用負荷＆求められる技術的要素
開発プロセスとして正しく運用されなければ絵に描いた餅になる

* サービス提供側（プロバイダ）
  * タグ付け作業
  * リリースノート作成
  * ドキュメント反映
  * リリース前準備や付帯作業
* サービス利用側（コンシューマ）
  * API仕様書の差分を追うのが大変
  * 各環境のデプロイの調整

---

# tagpr

* tagprで実現するPull Request上で進めるOSSのリリースマネジメント
https://k1low.hatenablog.com/entry/2022/10/04/083000

リリースマネジメントが民主化する

---

# 裏話
じつはこのスライドはtagprでリリース管理されています！  
GitHub Actionsのワークフローはそちらを見て貰えるとわかります




