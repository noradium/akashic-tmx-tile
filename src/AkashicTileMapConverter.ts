import {Layer, Map} from './TMXMap';
import {AkashicLayer, AkashicTileMap} from './AkashicTileMap';

export namespace AkashicTileMapConverter {
  export function convert(tmx: Map): AkashicTileMap {
    validate(tmx);

    return {
      tileWidth: tmx.tileWidth,
      tileHeight: tmx.tileHeight,
      layer: tmx.layer.map(tmxLayer2akashicTileLayer)
    };
  }

  function validate(tmx: Map) {
    if (tmx.renderOrder !== 'right-down') {
      throwTypeError('Unsupported TMX format. renderorder is not right-down');
    }
    if (Array.isArray(tmx.tileset.length !== 1)) {
      throwTypeError('Unsupported TMX format. tileset is not single');
    }
  }

  /**
   * tmx 形式の layer 配列形式を akashic-tile 形式に変換します
   */
  function tmxLayer2akashicTileLayer(layer: Layer): AkashicLayer {
    const array = layer.data.map(index => index - 1);
    const data = [];
    for (let i = 0; i < layer.height; ++i) {
      data.push(array.slice(i * layer.width, (i + 1) * layer.width - 1));
    }
    return {
      data
    }
  }

  function throwTypeError(message: string, error?: Error) {
    throw new TypeError(`AkashicTileMapConverter: ${message}${error ? `(${error.toString()})` : ''}`);
  }
}
