import { k } from "../kaboom.js";
import { initializePlayer } from "../player.js";
import { GameMap } from "./index.js";

export var mapObj = null;

export const mapArray = {
  map: [
    "##################################",
    "##################################",
    "################()################",
    "__________________________________",
    "__________________________________",
    "**********************************",
    "**********************************",
    "~~*~~~~~*~~~~~*~~~~~*~~~~~*~~~~~*~",
    "**********************************",
    "**********************************",
    "__________________________________",
    "##################################",
    "##################################",
    "##################################",
  ],
  objs: [
    {
      pos: [[8, 1], [11, 1]], comps: [
        k.area(),
        k.solid(),
      ],
    },
    {
      pos: [[27, 10]], comps: [
        k.sprite("car_red", { frame: 0 }),
        k.area(),
        k.solid(),
      ],
    },
    {
      pos: [[29, 10]], comps: [
        k.sprite("car_red", { frame: 1 }),
        k.area(),
        k.solid(),
      ],
    },
  ],
  legend: {
    width: 16,
    height: 16,
    "#": (ctx) => ([
      k.sprite("wall_stone"),
      k.area(),
      k.solid(),
    ]),
    "(": (ctx) => ([
      k.sprite( "door_left"),
      k.area(),
      k.solid(),
    ]),
    ")": (ctx) => ([
      k.sprite("door_right"),
      k.area(),
      k.solid(),
    ]),
    "_": (ctx) => ([
      k.sprite("sidewalk"),
      k.layer("floor"),
      k.area(),
    ]),
    "B": (ctx) => ([
      k.sprite("bouncer"),
      k.area(),
      k.solid(),
    ]),
    "*": (ctx) => ([
      k.sprite("pavement"),
      k.layer("floor"),
      k.area(),
    ]),
    "!": (ctx) => ([
      k.sprite("pavement_vert"),
      k.layer("floor"),
      k.area(),
    ]),
    "~": (ctx) => ([
      k.sprite("pavement_horiz"),
      k.layer("floor"),
      k.area(),
    ]),
    "j": (ctx) => ([
      k.sprite("pavement_junction_up"),
      k.layer("floor"),
      k.area(),
    ])
  },
  spawn: [ 16, 6 ],

};

export const loadLevel1 = () => k.scene("level1", async () => {
  const music = k.play("openworld", {
    volume: 0.1,
  });
  music.loop();

  mapObj = new GameMap(mapArray);

  await initializePlayer("player", mapObj);

  const bouncerLeft = k.add([
    k.sprite("bouncer_left", {anim: "idle"}),
    k.pos(286,38),
    k.solid(),
    k.z(2),
    k.area({ width: 10, height: 16}),
  ]);

  const bouncerRight = k.add([
    k.sprite("bouncer_right", {anim: "idle"}),
    k.pos(242,38),
    k.solid(),
    k.z(2),
    k.area({ width: 10, height: 16}),
  ]);

  k.camScale(4);
});
