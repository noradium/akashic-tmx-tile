export interface Map {
  version: string;
  width: number;
  height: number;
  tileWidth: number;
  tileHeight: number;
  orientation: 'orthogonal' | 'isometric' | 'staggered' | 'hexagonal'
  renderOrder: 'right-down' | 'right-up' | 'left-down' | 'left-up';
  layer: Layer[];
  tileset: Tileset[];
}

export interface Layer {
  width: number;
  height: number;
  visible: 0 | 1;
  data: number[];
}

export interface Tileset {
  firstgid: number;
  source: string;
  name: string;
  tileWidth: number;
  tileHeight: number;
  tileCount: number;
}
