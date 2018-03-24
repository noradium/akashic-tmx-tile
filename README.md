# akashic-tmx-tile

**akashic-tmx-tile** は、[Akashic Engine](https://github.com/akashic-games/akashic-engine)用の [TMX Map Format](http://docs.mapeditor.org/en/latest/reference/tmx-map-format/) 描画ライブラリです。
内部で [akashic-tile](https://github.com/akashic-games/akashic-tile) を利用して描画しています。

## 使い方
まず次の3つのファイルを用意しアセットとして使えるようにしておきます。
- image/tile_image.png
- text/tile.tsx
- text/map.tmx

```typescript
import {TMXTile} from 'akashic-tmx-tile';

function main(param: g.GameMainParameterObject): void {
	const scene = new g.Scene({game: g.game, assetIds: ['tile_image', 'tile', 'map']});

	scene.loaded.add(() => {
    const tmxTile = new TMXTile({scene}, {
      asset: {
        tilesetImage: <g.ImageAsset>scene.assets['tile_image'],
        tileset: <g.TextAsset>scene.assets['tile'],
        map: <g.TextAsset>scene.assets['map']
      }
    });
    scene.append(tmxTile);
    tmxTile.load(); // load map async
  });

	g.game.pushScene(scene);
}

export = main;
```

## 制約
まだ基本的な部分しか対応していません。
複数 tileset は使えないなどの制約があります。

## 利用方法

[akashic-cli](https://github.com/akashic-games/akashic-cli)をインストールした後、

```sh
akashic install akashic-tmx-tile
```

でインストールできます。

## ビルド方法

`npm run build` によりビルドできます。

```sh
npm install
npm run build
```

## ライセンス
本リポジトリは MIT License の元で公開されています。
