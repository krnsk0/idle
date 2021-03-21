import { action, makeObservable, observable } from 'mobx';
import { serialize, deserialize } from 'serializr';
import type { s } from '../semanticTypes';
import './config';
import { GameState } from './gameState';
export const saveKey = 'idleSave';

/**
 * Root of state tree; top level contains timing/gameloop
 */
export class Store {
  // root of serialized game state
  gameState: GameState;
  lastSaved: s.Milliseconds;

  constructor() {
    // member initialization
    this.gameState = new GameState();
    this.lastSaved = Date.now();

    makeObservable(this, {
      tick: action,
      gameState: observable,
      loadGame: action,
    });
  }

  tick(now: s.Milliseconds): void {
    this.gameState.tick(now);

    // run save if needed
    const timeSinceSave = now - this.lastSaved;
    if (timeSinceSave > this.gameState.saveInterval) {
      this.saveGame();
      this.lastSaved = now;
    }
  }

  /**
   * Serialize and save gameState
   */
  saveGame() {
    try {
      const serialized = serialize(GameState, this.gameState);
      const json = JSON.stringify(serialized);
      window.localStorage.setItem(saveKey, json);
      console.log('saved', serialized);
    } catch (err) {
      console.log('save error', err);
    }
  }

  loadGame(): void {
    // attempt to load saved game
    try {
      const saveString = window.localStorage.getItem(saveKey);
      if (saveString) {
        // monkeypatch to supress unhelpful warnings
        const orignalConsoleWarn = console.warn;
        console.warn = () => {};

        // deserialize
        this.gameState = deserialize<GameState>(
          GameState,
          JSON.parse(saveString),
          (err) => {
            if (err) console.error('Deserialization err: ', err);
          }
        );

        // undo monekypatch
        console.warn = orignalConsoleWarn;
      } else {
        this.gameState = new GameState();
      }
    } catch (err) {
      console.error('loading error', err);
      this.gameState = new GameState();
    }
  }
}
