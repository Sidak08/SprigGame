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

setSolids([player, floor]);

onInput("w", () => {
  getFirst(player).y -= 1;
});

onInput("a", () => {
  getFirst(player).x -= 1;
});

onInput("s", () => {
  getFirst(player).y += 1; // positive y is downwards
});

onInput("d", () => {
  getFirst(player).x += 1;
});

const makeThePlayerMove = () => {
  setTimeout(() => {
    getFirst(player).x += 1;
    makeThePlayerMove();
  }, 1000); // 1000 milliseconds = 1 second
};

makeThePlayerMove();

let level = 0;
const levels = [
  map`
.......ffffffffffffff
.....................
.....................
.....................
.p...................
fffffffffff..........`,
];
const currentLevel = levels[level];
setMap(currentLevel);

setPushables({
  [player]: [],
});

afterInput(() => {});
