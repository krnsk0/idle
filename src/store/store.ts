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
  lastTimestamp: s.Milliseconds;
  lastSaved: s.Milliseconds;
  saveInterval: s.Milliseconds = 1000;

  // root of serialized game state
  gameState: GameState;

  constructor() {
    // member initialization
    this.gameState = new GameState();

    // initialize timestamps
    this.lastTimestamp = performance.now();
    this.lastSaved = performance.now();

    makeObservable(this, {
      lastTimestamp: observable,
      tick: action,
    });
  }

  tick(now: s.Milliseconds): void {
    // run child state ticks
    const delta = now - this.lastTimestamp;
    this.gameState.tick(delta);
    this.lastTimestamp = now;

    // run save if needed
    const timeSinceSave = now - this.lastSaved;
    if (timeSinceSave > this.saveInterval) {
      this.save();
      this.lastSaved = now;
    }
  }

  /**
   * Serialize and save; tell caller if succeeded
   */
  save() {
    console.log('saved');
    try {
      const json = JSON.stringify(serialize(GameState, this.gameState));
      window.localStorage.setItem(saveKey, json);
    } catch (err) {
      console.log('save error', err);
    }
  }
}
