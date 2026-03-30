# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Dharma is a 1v1 fighting arcade game built with vanilla JavaScript and HTML5 Canvas. Inspired by Street Fighter, Contra, and Tekken 5, it features sprite-based animation, a state machine pattern for character behaviors, and a parallax scrolling background system.

## Running the Project

Start a live file server (e.g., VS Code Live Server, Python's `http.server`) with `start.html` as the entry point. The character selection screen loads first, then navigates to the main game canvas at `index.html`.

## Architecture

### State Pattern

All entities (players, enemies) use a shared `State` base class from `game_stuff/state.js`. Each state implements `enter()` (set sprite frames) and `handleInput()` (transition logic). State indices are defined via frozen enum objects (`PlayerState`, `Player2State`, `EnemyState`).

### Entity Hierarchy

`BasePlayer` (in `player_stuff/player.js`) contains shared logic for movement, physics, frame animation, and rendering. `Player` and `Player2` extend it with different sprite configs, key bindings, and state sets. `Player2` overrides `draw()` to mirror the sprite horizontally. `Enemy` is standalone but follows the same patterns.

### Module Organization

```
game_stuff/            # Core game systems
  state.js             # Shared State base class
  input.js             # InputHandler with configurable key bindings
  layers.js            # Parallax background (5 layers with different speeds)
  audioHandler.js      # Sound effect playback
player_stuff/          # Player classes and state machines
  player.js            # BasePlayer, Player, Player2
  states/              # State implementations (playerStates.js, player2States.js)
enemy_stuff/           # Enemy classes and behaviors
  enemy.js             # Dragon enemy with sine-wave flight
  enemyStates.js       # Flying state
```

### Input System

`InputHandler` accepts a `keyBindings` object (`{ up, down, left, right, special }`):
- **Player 1**: W/A/S/D + X
- **Player 2**: I/J/K/L + ,

### Sprite Animation

Sprite sheets are sliced by `spriteWidth`/`spriteHeight`. `frameX` advances horizontally through frames; `frameY` selects the animation row. Frame rate is controlled per-entity via `fps` and delta-time accumulation in `advanceFrame()`.

### Game Loop

`script.js` runs the `requestAnimationFrame` loop: calculates `deltaTime`, then calls `game.update(deltaTime)` and `game.draw(ctx)`. The `Game` class owns all entities and input handlers.

## Adding New Features

**New State**: Extend `State` from `game_stuff/state.js`, implement `enter()` and `handleInput()`, add to the entity's `states` array, and add an entry to the corresponding enum.

**New Character**: Add to the `characters` array in `start.html`, create a new player class extending `BasePlayer` with appropriate sprite config.

**New Enemy**: Follow the `Enemy` class pattern with its own state set.
