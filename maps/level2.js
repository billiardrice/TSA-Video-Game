import { k } from "../kaboom.js";
import { initializePlayer, player, BASE_SPEED } from "../player.js";
import { GameMap } from "./index.js";

export var mapObj = null;

export const mapArray = {
  map: [
    "##############",
    "#wwwwwwwwwwww#",
    "#wwwwwwwwwwww#",
    "#wwwwwwwwwwww#",
    "#wwwwwwwwwwww#",
    "#wwwwwwwwwwww#",
    "#wwwwwwwwwwww#",
    "#wwwwwwwwwwww#",
    "#wwwwwwwwwwww#",
    "######()######",
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
      "door",
    ]),
    ")": (ctx) => ([
      k.sprite("door_right"),
      k.area(),
      k.solid(),
      "door",
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
    ]),
    "w": (ctx) => ([
      k.sprite("wood_floor"),
      k.layer("floor"),
      k.area(),
    ]),
    "t": (ctx) => ([
      k.sprite("table"),
      k.layer("floor"),
      k.area(),
    ]),
  },
  spawn: [ 7, 8.4 ],
};

export const createDialogText = (npc) => {
  npc.dialogObj = k.add([
    k.text(npc.dialog[npc.currentDialog]),
    k.origin("bot"),
    k.pos(npc.pos.add(0, -8)),
  ]);
};

export const nextDialog = (npc) => {
  npc.currentDialog = (npc.currentDialog + 1) % npc.dialog.length;
  npc.dialogObj.use(k.text(npc.dialog[npc.currentDialog]));
}

export const loadLevel2 = () => k.scene("level2", async () => {
  const music = k.play("openworld", {
    volume: 0.1,
  });
  music.loop();

  mapObj = new GameMap(mapArray);

  await initializePlayer("player", mapObj);

  const table_left = k.add([
    k.sprite("table"),
    k.pos((7*16), (5*16)),
    k.origin("center"),
    k.solid(),
    k.z(1),
    k.area({ width: 48, height: 34, offset: k.vec2(0, -2)}),
  ]);

  const billiardguy1 = k.add([
    k.sprite("billiardguy1", {anim: "idle", animSpeed: 0.2}),
    k.pos((4.5*16), (4*16)),
    k.solid(),
    k.z(2),
    k.area({ width: 9, height: 16, offset: k.vec2(4, 0) }),
    "NPC",
    {
      dialogObj: null,
      currentDialog: null,
      dialog: ["Get out of mee way buddo",
               "Com'on shoo",
               "Really ya kiddo, move",
               "The key to the next room is gamer"]
    },
  ]);

  const billiardguy2 = k.add([
    k.sprite("billiardguy2", {anim: "idle", animSpeed: 0.3}),
    k.pos((8.5*16), (4.2*16)),
    k.solid(),
    k.z(2),
    k.area({ width: 9, height: 16, offset: k.vec2(4, 0) }),
    "NPC",
    {
      dialogObj: null,
      currentDialog: null,
      dialog: ["Boy I do love billiards",
               "Billiards",
               "Ever heard of Billiards",
               "Billiards is the best game ever"]
    },
  ]);

  const billiardguy3 = k.add([
    k.sprite("billiardguy3", {anim: "idle", animSpeed: 0.3}),
    k.pos((7*16), (2*16)),
    k.solid(),
    k.z(2),
    k.area({ width: 9, height: 16, offset: k.vec2(4, 0) }),
    "NPC",
    {
      dialogObj: null,
      currentDialog: 0,
      dialog: ["Fire is epic",
               "Fire",
               "Flame",
               "Yo kiddo you want the key to the next room?",
               "Go talk to the guy in the green with the stick."]
    },
  ]);

  k.camScale(4);
});
