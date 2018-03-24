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
    tmxTile.load();
  });

	g.game.pushScene(scene);
}

export = main;
