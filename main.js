/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title:
@author:
@tags: []
@addedOn: 2024-00-00
*/

const player = "p";
const floor = "f";
let counter = 0;
let platform = 0;
let lenCounter = 0;
let lenCounterLimit = 5;
console.log("resetting counter");

setLegend(
  [
    player,
    bitmap`
................
................
......4444......
.....4DDDD4.....
....94DDDD49....
....44DDDD44....
.....909909.....
.....999999.....
......9999......
.......99.......
....66666666....
....6.6666.6....
....6.6666.6....
......6666......
......5..5......
......5..5......`,
  ],
  [
    floor,
    bitmap`

CCCCCCCCCCCCCCCC
C99999999999999C
C9CCCCCCCCCCCC9C
C9C9999999999C9C
C9C9CCCCCCCC9C9C
C9C9C999999C9C9C
C9C9C9CCCC9C9C9C
C9C9C9C99C9C9C9C
C9C9C9C99C9C9C9C
C9C9C9CCCC9C9C9C
C9C9C999999C9C9C
C9C9CCCCCCCC9C9C
C9C9999999999C9C
C9CCCCCCCCCCCC9C
C99999999999999C
CCCCCCCCCCCCCCCC`,
  ],
);

let layer = [
  [".....ffff"],
  ["........."],
  ["........."],
  ["........."],
  ["..p..f..."],
  ["ffff....."],
];
const levels = [
  map`
${layer[0]}
${layer[1]}
${layer[2]}
${layer[3]}
${layer[4]}
${layer[5]}`,
];
let level = 0;
let currentLevel = levels[level];
setMap(currentLevel);
setSolids([player, floor]);

const genNextPlat = (id) => {
  counter += 1;
  //console.log("counter", counter)
  if (counter == 6) {
    counter = 0;
    lenCounter += 1;

    if (lenCounterLimit === lenCounter) {
      lenCounterLimit = Math.floor(Math.random() * 3) + 2;
      lenCounter = 0;
      platform = Math.floor(Math.random() * 6);
    }

    //make a better alorithem
    //console.log("platform", platform)
  }

  console.log("check vals", id, platform);
  if (id === platform) {
    return "f";
  } else {
    return ".";
  }
};

const moveTheBackGround = () => {
  setTimeout(() => {
    for (let i = 0; i < layer.length; i++) {
      const ogStr = layer[i][0];
      let newStr = "";
      if (ogStr.includes("p")) {
        newStr = `${ogStr[1]}${ogStr[3]}${ogStr[2]}${ogStr[4]}${ogStr[5]}${ogStr[6]}${ogStr[7]}${ogStr[8]}${genNextPlat(i)}`;
        //console.log(newStr)
      } else {
        for (let j = 1; j < ogStr.length; j++) {
          newStr += ogStr[j];
        }
        newStr += `${genNextPlat(i)}`;
      }
      layer[i] = [newStr];
    }

    currentLevel = `
${layer[0]}
${layer[1]}
${layer[2]}
${layer[3]}
${layer[4]}
${layer[5]}`;
    //console.log("layer", currentLevel)
    setMap(currentLevel);
    moveTheBackGround();
    //console.log("layer", layer);
  }, 500);
};

moveTheBackGround();

onInput("w", () => {
  getFirst(player).y -= 1;
});

onInput("s", () => {
  getFirst(player).y += 1; // positive y is downwards
});

setPushables({
  [player]: [],
});

afterInput(() => {});
