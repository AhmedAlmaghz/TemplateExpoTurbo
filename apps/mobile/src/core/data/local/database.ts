import { Database } from '@nozbe/watermelondb'
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite'
import schema from './schema'
import Note from './models/Note'

const adapter = new SQLiteAdapter({
  schema,
  jsi: true, // Requires Dev Client
  onSetUpError: error => {
    console.error("WatermelonDB failed to initialize", error)
  }
})

export const database = new Database({
  adapter,
  modelClasses: [
    Note,
  ],
})
