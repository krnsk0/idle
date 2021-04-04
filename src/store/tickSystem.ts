import type { Resource } from './cityStore/resource';
import type { GameState } from './gameState';
import type { Store } from './store';
import type { s } from '../semanticTypes';

type TickableEntity = Store | GameState | Resource;

class TickSystem {
  tickingEntities: TickableEntity[] = [];
  lastSeenTimestamp = 0;

  /**
   * Registers a ticking entity. Intended to be called with
   * `this` as argument in ticking entity constructors
   */
  register(entity: TickableEntity): void {
    this.tickingEntities.push(entity);
  }

  /**
   * External API for running ticks on all registered ticking entities.
   *
   * Use zero for delta if we don't have a last timestamp stored.
   * Typically happens on first tick after loading, which will not
   * do anything
   */
  runTick(now: s.Milliseconds): void {
    const delta = this.lastSeenTimestamp ? now - this.lastSeenTimestamp : 0;
    this.lastSeenTimestamp = now;
    this._callTickMethods(delta, now);
  }

  /**
   * For internal use; dispatches ticks to the registered entities.
   */
  private _callTickMethods(delta: s.Milliseconds, now: s.Milliseconds): void {
    this.tickingEntities.forEach((tickingEntity) => {
      tickingEntity.tick(delta, now);
    });
  }

  runOfflineProgress(
    lastSeenTimestamp: s.Milliseconds,
    now: s.Milliseconds
  ): void {
    // TODO
  }

  /**
   * Prints list of registered entities
   */
  debug(): void {
    console.log('Ticking entities: ', this.tickingEntities);
  }

  /**
   * Unregisters all entities. Intended for use when clearing game state.
   */
  reset(): void {
    this.tickingEntities = [];
  }
}

// singleton
export const tickSystem = new TickSystem();
