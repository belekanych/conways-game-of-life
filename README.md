# Conway's Game of Life

## Purpose
The purpose of this project is to play with JS and to have fun.

## Rules
[Source - Wikipedia](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life)

The universe of the Game of Life is an infinite, two-dimensional orthogonal grid of square cells, each of which is in one of two possible states, live or dead (or populated and unpopulated, respectively). Every cell interacts with its eight neighbours, which are the cells that are horizontally, vertically, or diagonally adjacent. At each step in time, the following transitions occur:

1. Any live cell with fewer than two live neighbours dies, as if by underpopulation.
2. Any live cell with two or three live neighbours lives on to the next generation.
3. Any live cell with more than three live neighbours dies, as if by overpopulation.
4. Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.

These rules, which compare the behavior of the automaton to real life, can be condensed into the following:

1. Any live cell with two or three live neighbours survives.
2. Any dead cell with three live neighbours becomes a live cell.
3. All other live cells die in the next generation. Similarly, all other dead cells stay dead.

The initial pattern constitutes the seed of the system. The first generation is created by applying the above rules simultaneously to every cell in the seed, live or dead; births and deaths occur simultaneously, and the discrete moment at which this happens is sometimes called a tick.

Each generation is a pure function of the preceding one. The rules continue to be applied repeatedly to create further generations.

## Used technologies
* [Vue.js 3](https://vuejs.org/)
* [TypeScript](https://www.typescriptlang.org/)
* [Vite](https://vitejs.dev/)
* [Tailwind CSS](https://tailwindcss.com/)
* [Pinia](https://pinia.vuejs.org/)
* [Font Awesome](https://fontawesome.com/)
* [VueUse](https://vueuse.org/)
* [Docker](https://www.docker.com/)
* [Make](https://www.gnu.org/software/make/manual/make.html)

## Overview

### Features
* **Screen** - the grid is automatically displayed on UI.
* **Pencil** - ability to make cells alive
* **Eraser** - ability to make cells dead
* **Shuffle** - ability to randomly generate the grid
* **Clear** - remove all alive cells
* **Speed** - select a generation calculation speed
* **Play** - calculate the next generation automatically
* **Pause** - stop the automatic generation calculation
* **Next step** - calculate only the next generation
* **Dark mode** - select dark or light mode for UI

### Preview
Light mode:

![Light mode](/src/assets/preview-light.png "Light mode")

Dark mode:

![Dark mode](/src/assets/preview-dark.png "Dark mode")

## Installation
Docker, Docker Compose and Make are required to install the project.

To start the project run the command:
```
make start
```

To run the application locally:
```
make dev
```

To stop the project:
```
make stop
```

You can use one command to start and run the project locally:
```
make start-dev
```

To connect to the application using sh:
```
make ssh
```
