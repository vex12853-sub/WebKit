# WebKit

WebKitはクロスプラットフォームのウェブブラウザエンジンです。iOSおよびmacOSでは、Safari、Mail、iBooks、その他多くのアプリケーションを支えています。WebKitに関する詳細は[WebKitプロジェクトウェブサイト](https://webkit.org/)を参照してください。

## 最新版の試用

macOSでは、最新のWebKitを試すために[Safari Technology Previewをダウンロード](https://webkit.org/downloads/)してください。Linuxでは、[Epiphany Technology Previewをダウンロード](https://webkitgtk.org/epiphany-tech-preview)します。Windowsでは、自分でビルドする必要があります。

## バグの報告

1. [WebKit Bugzillaを検索](https://bugs.webkit.org/query.cgi?format=specific&product=WebKit)して、既に報告されているバグかどうかを確認します。
2. まだアカウントを作成していない場合は、[Bugzillaアカウントを作成](https://bugs.webkit.org/createaccount.cgi)してバグを報告し、コメントを追加できるようにします。
3. [ガイドライン](https://webkit.org/bug-report-guidelines/)に従ってバグを報告します。

バグが報告されると、[バグライフサイクル](https://webkit.org/bug-life-cycle)の各段階で更新される度にメールを受け取ります。バグが修正されたと考えられると、[最新のナイトリービルド](https://webkit.org/nightly)をダウンロードして修正が確認できるか尋ねられることがあります。

## コードの取得

WebKitのGitリポジトリをクローンするには、以下のコマンドを実行します：

```
git clone https://github.com/WebKit/WebKit.git WebKit
```

[git fsmonitor](https://git-scm.com/docs/git-config#Documentation/git-config.txt-corefsmonitor)を有効にすると、`git status`などの多くのgitコマンドを高速化できます。以下のコマンドを実行します：

```
git config core.fsmonitor true
```

## WebKitのビルド

### Appleプラットフォーム用のビルド

まだインストールしていない場合は、Xcodeとそのコマンドラインツールをインストールします：

1. **Xcodeをインストール** https://developer.apple.com/downloads からXcodeを取得します。OS X用にWebKitをビルドするにはXcode 5.1.1以降が必要です。iOSシミュレータ用にWebKitをビルドするにはXcode 7以降が必要です。
2. **Xcodeコマンドラインツールをインストール** ターミナルで以下のコマンドを実行します： `xcode-select --install`

デバッグシンボルとアサーションを含むmacOSデバッグビルドを作成するには、以下のコマンドを実行します：

```
Tools/Scripts/build-webkit --debug
```

パフォーマンステストや他の目的には、`--release`を使用します。

#### 埋め込みビルド

iOS、tvOS、watchOSなどの埋め込みプラットフォーム用にビルドするには、`build-webkit`にプラットフォーム引数を渡します。

例えば、埋め込みシミュレータ用にデバッグシンボルとアサーションを含むデバッグビルドを作成するには：

```
Tools/Scripts/build-webkit --debug --<platform>-simulator
```

または埋め込みデバイス用には：

```
Tools/Scripts/build-webkit --debug --<platform>-device
```

`platform`は`ios`、`tvos`または`watchos`です。

#### Xcodeの使用

`WebKit.xcworkspace`を開いて、Xcode内でWebKitをビルドおよびデバッグできます。"Everything up to WebKit + Tools"スキームを選択して、プロジェクト全体をビルドします。

Xcodeの設定でカスタムビルド場所を使用しない場合は、`WebKitBuild`ディレクトリを使用するようにワークスペース設定を更新する必要があります。メニューバーで、ファイル > ワークスペース設定を選択し、詳細ボタンをクリックして、"カスタム"、"ワークスペースに相対"を選択し、製品と中間ファイルの両方に`WebKitBuild`と入力します。

### GTKポートのビルド

プロダクションビルドの場合：

```
cmake -DPORT=GTK -DCMAKE_BUILD_TYPE=RelWithDebInfo -GNinja
ninja
sudo ninja install
```

開発ビルドの場合：

```
Tools/gtk/install-dependencies
Tools/Scripts/update-webkitgtk-libs
Tools/Scripts/build-webkit --gtk --debug
```

WebKitGTKのビルドに関する詳細は、[wikiページ](https://trac.webkit.org/wiki/BuildingGtk)を参照してください。

### WPEポートのビルド

プロダクションビルドの場合：

```
cmake -DPORT=WPE -DCMAKE_BUILD_TYPE=RelWithDebInfo -GNinja
ninja
sudo ninja install
```

開発ビルドの場合：

```
Tools/wpe/install-dependencies
Tools/Scripts/update-webkitwpe-libs
Tools/Scripts/build-webkit --wpe --debug
```

### Windowsポートのビルド

WindowsでのWebKitのビルドについては、[WebKit on Windowsページ](https://docs.webkit.org/Ports/WindowsPort.html)を参照してください。

## WebKitの実行

### Safariおよびその他のmacOSアプリケーションでの実行

以下のコマンドを実行して、ローカルビルドのWebKitでSafariを起動します：

```
Tools/Scripts/run-safari --debug
```

`run-safari`スクリプトは、`DYLD_FRAMEWORK_PATH`環境変数をビルド製品を指すように設定し、その後`/Applications/Safari.app`を起動します。`DYLD_FRAMEWORK_PATH`はシステムローダーに、`/System/Library/Frameworks`にインストールされたフレームワークよりもビルド製品を優先するよう指示します。

他のアプリケーションをローカルビルドのWebKitで実行するには、以下のコマンドを実行します：

```
Tools/Scripts/run-webkit-app <application-path>
```

### iOSシミュレータ

以下のコマンドを実行して、ローカルビルドのWebKitでiOSシミュレータを起動します：

```
run-safari --debug --ios-simulator
```

いずれの場合も、リリースビルドを作成している場合は、`--debug`の代わりに`--release`を使用します。

### Linuxポート

開発ビルドがある場合、`run-minibrowser`スクリプトを使用できます。例えば：

```
run-minibrowser --debug --wpe
```

使用するポートを示すために、`--gtk`、`--jsc-only`、または`--wpe`のいずれかを指定します。

## 貢献

おめでとうございます！これでWebKitでコーディングを開始し、プロジェクトに修正や新機能を貢献する準備が整いました。プロジェクトにコードを提出する詳細については、[Contributing Code](https://webkit.org/contributing-code/)を読んでください。
