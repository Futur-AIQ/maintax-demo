// TEMPORARY (Phase 1.2): the shell's search and notifications read a seed DB built once in the browser.
// Phase 2 replaces this with the persisted demo store. Call only on the client, never during server rendering.
import { type DB, buildDB } from "../../seed";

let db: DB | null = null;

export function sampleDB(): DB {
  db ??= buildDB(Date.now());
  return db;
}
