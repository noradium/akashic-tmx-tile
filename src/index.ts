import * as at from '@akashic-extension/akashic-tile';
import {TMXParser} from './TMXParser';
import {AkashicTileMapConverter} from './AkashicTileMapConverter';

export interface TMXTileParameter {
  asset: {
    /**
     * タイルセットの画像アセット
     */
    tilesetImage: g.ImageAsset;
    /**
     * タイルセットの tsx 形式のテキスト
     */
    tileset: g.TextAsset;
    /**
     * マップの tmx 形式のテキスト
     */
    map: g.TextAsset;
  };
}

export class TMXTile extends g.E {
  private tmxTileParameter: TMXTileParameter;

  constructor(param: g.EParameterObject, tmxTileParameter: TMXTileParameter) {
    super(param);
    this.tmxTileParameter = tmxTileParameter;
  }

  async load() {
    const map = await TMXParser.parse(this.tmxTileParameter.asset);
    const akashicMap = AkashicTileMapConverter.convert(map);

    akashicMap.layer.forEach(layer => {
      const tile = new at.Tile({
        scene: this.scene,
        src: this.tmxTileParameter.asset.tilesetImage,
        tileWidth: akashicMap.tileWidth,
        tileHeight: akashicMap.tileHeight,
        tileData: layer.data
      });
      this.append(tile);
    });
  }
}
