export interface AkashicTileMap {
  tileWidth: number;
  tileHeight: number;
  layer: AkashicLayer[];
}

export interface AkashicLayer {
  data: number[][];
}
