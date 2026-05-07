import { synchronize } from '@nozbe/watermelondb/sync'
import { database } from '../local/database'

export async function syncData() {
  await synchronize({
    database,
    pullChanges: async ({ lastPulledAt }) => {
      // In production, use your actual API_URL from env vars
      const response = await fetch(`http://localhost:3000/sync/pull?lastPulledAt=${lastPulledAt || 0}`)
      if (!response.ok) {
        throw new Error(await response.text())
      }
      const { changes, timestamp } = await response.json()
      return { changes, timestamp }
    },
    pushChanges: async ({ changes, lastPulledAt }) => {
      const response = await fetch(`http://localhost:3000/sync/push`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ changes, lastPulledAt }),
      })
      if (!response.ok) {
        throw new Error(await response.text())
      }
    },
    migrationsEnabledAtVersion: 1,
  })
}
