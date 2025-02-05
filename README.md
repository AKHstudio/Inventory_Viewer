> [!CAUTION]  
>　現在は開発を一時的に中断しています！！

[![GitHub license](https://img.shields.io/github/license/Naereen/StrapDown.js.svg)](https://github.com/AKHstudio/Inventory_Viewer/blob/main/LICENSE)
[![GitHub release](https://img.shields.io/github/release/AKHstudio/Inventory_Viewer.svg)](https://github.com/AKHstudio/Inventory_Viewer/releases/latest)
[![Minecraft](https://img.shields.io/badge/Minecraft-BE-yellow)](https://www.minecraft.net/ja-jp/about-minecraft)
[![Create Release](https://github.com/AKHstudio/Inventory_Viewer/actions/workflows/release.yml/badge.svg)](https://github.com/AKHstudio/Inventory_Viewer/actions/workflows/release.yml)

[![JavaScript](https://shields.io/badge/JavaScript-F7DF1E?logo=JavaScript&logoColor=000&style=flat-square)](https://developer.mozilla.org/ja/docs/Web/JavaScript)
[![TypeScript](https://shields.io/badge/TypeScript-007ACC?logo=TypeScript&logoColor=fff&style=flat-square)](https://www.typescriptlang.org/)
[![Node.js](https://shields.io/badge/Node.js-339933?logo=Node.js&logoColor=fff&style=flat-square)](https://nodejs.jp/)

# What is this?

プレイヤーのインベントリを閲覧するための minecraft BE アドオンです。

# Use

`!inventory <Player name>` でインベントリを開くことができます。

現在見る以外の動作はできません。

> [!IMPORTANT]
> 権限対策で、`!inventory` の使用には tag `allow_view_inventory` が必要です。
>
> 使用には ワールド設定 > ゲーム > 実験 の ベータ api の項目をオンにしてください
>
> 名前にスペースが入っている場合でもそのまま入力してください

### Command

`/tag @s add allow_view_inventory`

# Use Library

-   [Chest-UI](https://github.com/Herobrine643928/Chest-UI)

# License

[Chest-UI](https://github.com/Herobrine643928/Chest-UI)ライブラリは [Herobrine643928](https://github.com/Herobrine643928) & [LeGend077](https://github.com/LeGend077) によって作成され維持されており、CC BY 4.0 のライセンスのもとで提供されています。
ライセンスの詳細については、こちらをご覧ください：https://creativecommons.org/licenses/by/4.0/deed.ja

一部改変し利用しています。

| 変更                   |
| ---------------------- |
| forms.js               |
| typeIds.js             |
| chest_server_form.json |
| generic_36.png         |

# Feature Ideas

-   インベントリの中身を操作する機能

# Author

## [takodayo](https://github.com/tako-dayo8) [(AKHStudio)](https://github.com/AKHstudio)

-   script
-   ui

## [AKIsan](https://github.com/AKIsan0725) [(AKHStudio)](https://github.com/AKHstudio)

-   textures
