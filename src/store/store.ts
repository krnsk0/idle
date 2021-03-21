import { action, makeObservable, observable } from 'mobx';
import { serialize, deserialize } from 'serializr';
import type { s } from '../semanticTypes';
import './config';
import { GameState } from './gameState';
export const saveKey = 'idleSave';

/**
 * This is the root of the observable tree intended to be passed to
 * the component tree via provider. Its main responsibilities relate
 * to saving and loading game states.
 *
 * While this class is not itself serialized, it knows how to
 * serialize and deserialize `gameState`. .
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
   * Serialize and save game state to local storage
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

  /**
   * Attempt to load save game from localstorage
   */
  loadGame(): void {
    try {
      const saveString = window.localStorage.getItem(saveKey);
      if (saveString) {
        this.gameState = deserialize<GameState>(
          GameState,
          JSON.parse(saveString),
          (err) => {
            if (err) console.error('Deserialization err: ', err);
          }
        );
      } else {
        this.gameState = new GameState();
      }
    } catch (err) {
      console.error('loading error', err);
      this.gameState = new GameState();
    }
  }

  /**
   * Clear the save and replace state with a new state
   */
  clearSave(): void {
    window.localStorage.removeItem(saveKey);
    this.gameState = new GameState();
  }

  /**
   * Attempt to load save from clipboard
   */
  async loadFromClipboard(): Promise<void> {
    try {
      const saveString = await window.navigator.clipboard.readText();
      window.localStorage.setItem(saveKey, saveString);
      this.loadGame();
    } catch (err) {
      console.log('error loading from clipboard', err);
    }
  }
}
