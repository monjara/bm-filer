import { defineManifest } from '@crxjs/vite-plugin'
import packageJson from './package.json'
const { version } = packageJson

const [major, minor, patch, label = '0'] = version
  .replace(/[^\d.-]+/g, '')
  .split(/[.-]/)

export default defineManifest(async (_env) => ({
  manifest_version: 3,
  name: 'bookmark filer',
  version: `${major}.${minor}.${patch}.${label}`,
  version_name: version,
  description: 'bookmark filer like vim keybindings',
  default_locale: 'en',
  permissions: ['bookmarks', 'favicon', 'storage'],
  web_accessible_resources: [
    {
      resources: ['_favicon/*', 'index.html'],
      matches: ['<all_urls>'],
      extension_ids: ['*'],
    },
  ],
  content_scripts: [
    {
      matches: ['<all_urls>'],
      js: ['src/content_scripts/index.ts', 'src/main.tsx'],
    },
  ],
  background: {
    service_worker: 'src/background/index.ts',
    type: 'module',
  },
}))
