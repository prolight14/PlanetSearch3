# PlanetSearch3Plans

Outline
-------

1. Everything will be **pixalated** even text. (Yes I'll have to create a special pixelated font just for my game) 
2. Helix (the main character) will travel through space and explore planets
3. All the gameplay will be split into 8 chapters or worlds that will take at least **1 hour** to play through (max 3 hours) 

Specific game design decisions
------------------------------

- There are now a few different types of collectibles:

    - Currencies
    - Key items 
    - Power ups
    - Abilities

 - Each of these will inherit from the collectibles class

- **Which means**: Power ups are now split into 2 categories; the temporary ones (Power ups) and the permanent ones (abilities)
(TODO: Elaborate more on this later)

- Jumping and falling:
    
    - You can now control **exactly** how high you jump. As soon as you release the jump button/key you will fall back down
    - If you fall to the bottom of a level (or fall in something really dangerous you **can't** walk in) you will be put 
    back on the last solid static piece of ground, block... whatever

- You'll now collect exp or score points after defeating **any** enemy.
    
    - When you collect enough exp or score points, you'll level up, which means you get to chose what to upgrade (or in 
    some cases just your hp/atk whatever will just take turns get increased) 
    something (like hp, atk whatever), then your lvl will increase by 1

    - Bosses force you to level up (or in some cases just give you like a heart or 5 hp or something related to health)

- Keys that unlock boss doors will have a different image so you can tell it's a boss key and be separate from normal keys.

- Things like ladders will stand out from the background so you can see them
- Doors and things like blocks will be styled differently to match their environment
- Two things that go together will be styled so it's obvious. For example, boss key to boss door
- Dying in this game won't be so easy or quick, if you do die you'll get a game over screen then your only option is to 
return to the title screen

- There will be shops
- You can buy items that do stuff like temporary attack up or rpg-like elements/action commands

Implementation details
----------------------

- Phaser 3/4 will be used
- Matterjs for physics
- Some plugin for ui... maybe?
- A fast version of the cartesian system will be used 
- A plug-in for a bridge between the cartesian system and Phaser 3/4 for space.
Tilemaps will be used, no more glitchy cartesian systems (unless it's in space or water to something)
- Careful game object heirarchies will be used
- Saving will be handled myself and save files will be as small and efficient as possible
- If a game object does not have an `oncollide` method I will not let it collide with anything
or collision **should** be defined
- Millisecond timers should be turned into a timer class so that when the game lags the same object won't get repeaditly created because of a constant time being mismatched with game fps 
- A flexible test environment will be created (meaning I can test parts of the game without having to play the entire game up untill that point)

What software will be used to create the game
----------------------------------------
- Visual Studio code with Phaser 3/4 intellisense
- Piskel (sprites)
- Tiled (levels)
- Bfxr (sound fx)
- FL studio/Famitracker/milky tracker for music

Storyline
---------
Keep a compelling storyline to keep the player playing!
