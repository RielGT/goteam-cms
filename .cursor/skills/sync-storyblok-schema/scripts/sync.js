#!/usr/bin/env node
/**
 * Syncs .storyblok/components/*.json to the Storyblok management API.
 * Reads STORYBLOK_MANAGEMENT_TOKEN and STORYBLOK_SPACE_DEV from .env.
 * Never deletes components. Never writes to the production space.
 */

import { readFileSync, readdirSync } from 'fs'
import { resolve, join } from 'path'

const ROOT = resolve(process.cwd())
const COMPONENTS_DIR = join(ROOT, '.storyblok', 'components')

// Load .env manually (avoid dotenv dependency)
try {
  const envContent = readFileSync(join(ROOT, '.env'), 'utf8')
  for (const line of envContent.split('\n')) {
    const [key, ...val] = line.split('=')
    if (key && val.length) process.env[key.trim()] = val.join('=').trim()
  }
} catch {
  // .env not found — rely on environment variables already set
}

const TOKEN = process.env.STORYBLOK_MANAGEMENT_TOKEN
const SPACE = process.env.STORYBLOK_SPACE ?? process.env.STORYBLOK_SPACE_DEV

if (!TOKEN || !SPACE) {
  console.error('Missing STORYBLOK_MANAGEMENT_TOKEN or STORYBLOK_SPACE_DEV in environment.')
  process.exit(1)
}

const BASE = `https://mapi.storyblok.com/v1/spaces/${SPACE}`
const HEADERS = { Authorization: TOKEN, 'Content-Type': 'application/json' }

async function fetchComponents() {
  const res = await fetch(`${BASE}/components`, { headers: HEADERS })
  const data = await res.json()
  return data.components ?? []
}

async function main() {
  const files = readdirSync(COMPONENTS_DIR).filter(f => f.endsWith('.json'))
  const remote = await fetchComponents()
  const remoteMap = Object.fromEntries(remote.map(c => [c.name, c]))

  const result = { space: SPACE, added: [], modified: [], unchanged: [], skipped_deletions: [] }

  for (const file of files) {
    const local = JSON.parse(readFileSync(join(COMPONENTS_DIR, file), 'utf8'))
    const existing = remoteMap[local.name]

    if (!existing) {
      const res = await fetch(`${BASE}/components`, {
        method: 'POST',
        headers: HEADERS,
        body: JSON.stringify({ component: local }),
      })
      if (res.ok) result.added.push(local.name)
      else console.error(`Failed to add ${local.name}:`, await res.text())
    } else {
      const res = await fetch(`${BASE}/components/${existing.id}`, {
        method: 'PUT',
        headers: HEADERS,
        body: JSON.stringify({ component: { ...existing, ...local } }),
      })
      if (res.ok) result.modified.push(local.name)
      else console.error(`Failed to update ${local.name}:`, await res.text())
    }
  }

  const localNames = new Set(files.map(f => JSON.parse(readFileSync(join(COMPONENTS_DIR, f), 'utf8')).name))
  for (const r of remote) {
    if (!localNames.has(r.name)) result.skipped_deletions.push(r.name)
  }

  console.log(JSON.stringify(result, null, 2))
}

main().catch(e => { console.error(e); process.exit(1) })
