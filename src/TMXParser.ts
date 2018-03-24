import * as xml2JS from 'xml2js';
import {Layer, Map, Tileset} from './TMXMap';

export namespace TMXParser {
  export async function parse(
    param: {
      tilesetImage: g.ImageAsset,
      tileset: g.TextAsset;
      map: g.TextAsset;
    }
  ) {
    const mapJson = await parseXML(param.map.data);
    return parseMapJson(mapJson);
  }

  async function parseXML(data: string) {
    return new Promise((resolve, reject) => {
      xml2JS.parseString(data, {trim: true}, function (err, result) {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });
  }

  function parseMapJson(mapJson: any): Map {
    try {
      return {
        version: mapJson['map']['$']['version'],
        width: parseInt(mapJson['map']['$']['width'], 10),
        height: parseInt(mapJson['map']['$']['height'], 10),
        tileWidth: parseInt(mapJson['map']['$']['tilewidth'], 10),
        tileHeight: parseInt(mapJson['map']['$']['tileheight'], 10),
        orientation: mapJson['map']['$']['orientation'],
        renderOrder: mapJson['map']['$']['renderorder'],
        layer: parseLayerJson(mapJson['map']['layer']),
        tileset: parseTilesetJson(mapJson['map']['tileset'])
      }
    } catch (error) {
      throwTypeError('map format is invalid.', error);
    }
  }

  function parseTilesetJson(tilesetJson: any): Tileset[] {
    try {
      return tilesetJson.map((tileset: any) => {
        return {
          firstgid: tileset['$']['firstgid'],
          source: tileset['$']['source'],
          name: tileset['$']['name'],
          tileWidth: tileset['$']['tileWidth'],
          tileHeight: tileset['$']['tileHeight'],
          tileCount: tileset['$']['tileCount']
        };
      });
    } catch (error) {
      throwTypeError('map tileset format is invalid.', error);
    }
  }

  function parseLayerJson(layerJson: any): Layer[] {
    try {
      return layerJson.map((layer: any) => {
        return {
          width: parseInt(layer['$']['width'], 10),
          height: parseInt(layer['$']['height'], 10),
          visible: parseInt(layer['$']['visible'], 10),
          data: layer['data'][0]['_'].split(',')
        };
      });
    } catch (error) {
      throwTypeError('map layer format is invalid.', error);
    }
  }

  function throwTypeError(message: string, error?: Error) {
    throw new TypeError(`TMXParser: ${message}${error ? `(${error.toString()})` : ''}`);
  }
}
