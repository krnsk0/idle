import { action, makeObservable, observable, runInAction } from 'mobx';
import { serialize, deserialize } from 'serializr';
import type { s } from '../semanticTypes';
import type { City } from './cityStore/city';
import type { Resource } from './cityStore/resource';
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

  // last timestamp at which gamestate was serialized & saved
  lastSaved: s.Milliseconds;

  constructor() {
    this.gameState = new GameState();
    this.gameState.initializeNewGame();

    this.lastSaved = Date.now();

    makeObservable(this, {
      _startNewGame: action,
      _tryGameStateDeserialize: action,
      tick: action.bound,
      gameState: observable,
      saveGame: action.bound,
      loadGame: action.bound,
      clearSave: action.bound,
      loadFromClipboard: action.bound,
      copySave: action.bound,
    });
  }

  /**
   * Helper for intiializing a new game state
   */
  _startNewGame(): void {
    this.gameState = new GameState();
    this.gameState.initializeNewGame();
  }

  /**
   * Helper for deserializing savegame strings. Caller must handle
   * errors.
   */
  _tryGameStateDeserialize(saveString: string): GameState {
    return deserialize<GameState>(GameState, JSON.parse(saveString), (err) => {
      if (err) {
        throw err;
      }
    });
  }

  /**
   * Tick at this level handles saving. Not called tick system
   */
  tick(now: s.Milliseconds): void {
    // run save if needed
    const timeSinceSave = now - this.lastSaved;
    if (timeSinceSave > this.gameState.saveInterval) {
      this.saveGame();
      this.lastSaved = now;
    }

    this.gameState.tick(now);
  }

  /**
   * Serialize and save game state to local storage
   */
  saveGame(): void {
    try {
      const serialized = serialize(GameState, this.gameState);
      const json = JSON.stringify(serialized);
      window.localStorage.setItem(saveKey, json);
      console.log('saved');
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
        this.gameState = this._tryGameStateDeserialize(saveString);
      } else {
        console.log('No save game found; starting new game');
        this._startNewGame();
      }
    } catch (err) {
      console.error('loading error', err);
      this._startNewGame();
    }
  }

  /**
   * Clear the save and replace state with a new state
   */
  clearSave(): void {
    window.localStorage.removeItem(saveKey);
    this._startNewGame();
  }

  /**
   * Attempt to load save from clipboard
   */
  async loadFromClipboard(): Promise<void> {
    try {
      const saveString = await window.navigator.clipboard.readText();
      runInAction(() => {
        this.gameState = this._tryGameStateDeserialize(saveString);
      });
    } catch (err) {
      console.log('error loading from clipboard', err);
    }
  }

  /**
   * Copy save game to clipboard
   */
  copySave(): void {
    try {
      const saveString = window.localStorage.getItem(saveKey);
      if (saveString) {
        const formattedSaveString = JSON.stringify(
          JSON.parse(saveString),
          null,
          2
        );
        window.navigator.clipboard.writeText(formattedSaveString);
        console.log('copied');
      } else {
        console.log('copy failed');
      }
    } catch (err) {
      console.error('copy failed', err);
    }
  }
}
