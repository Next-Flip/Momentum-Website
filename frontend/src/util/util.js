import { untar } from '../untar/untar.js'
import pako from 'pako'

class Operation {
  constructor () {
    this.resolve = undefined
    this.reject = undefined
  }

  create (worker, operation, data) {
    return new Promise((resolve, reject) => {
      worker.postMessage({ operation: operation, data: data })
      this.resolve = resolve
      this.reject = reject
    })
  }

  terminate (event) {
    if (event.status === 1) {
      this.resolve(event.data)
    } else {
      this.reject(event.error)
    }
  }
}

async function fetchPacks () {
  const response = await fetch('https://up.momentum-fw.dev/asset-packs/directory.json')
  if (response.status >= 400) {
    throw new Error('Failed to fetch asset packs (' + response.status + ')')
  }
  const data = await response.json()

  const packs = data.packs.map((pack) => {
    for (const file of pack.files) {
      if (file.type === 'pack_targz') {
        pack.url_targz = file.url
      } else if (file.type === 'pack_zip') {
        pack.url_zip = file.url
      }
    }
    if (pack.url_targz && pack.url_zip) {
      return pack
    } else {
      return null
    }
  })

  return packs
}

async function fetchPack (url) {
  const buffer = await fetch(url)
    .then(async response => {
      if (response.status >= 400) {
        throw new Error('Failed to fetch resources (' + response.status + ')')
      }
      return await response.arrayBuffer()
    })

  return new Uint8Array(buffer)
}

function fetchChannels (target) {
  return fetch('https://up.momentum-fw.dev/firmware/directory.json')
    .then((response) => {
      if (response.status >= 400) {
        throw new Error('Failed to fetch firmware channels (' + response.status + ')')
      }
      return response.json()
    })
    .then((data) => {
      const release = data.channels.find(e => e.id === 'release')
      const dev = data.channels.find(e => e.id === 'development')

      function formatChannel (channel) {
        channel.versions.sort((a, b) => {
          if ((a.version.startsWith('mntm-') && b.version.startsWith('mntm-')) &&
            (parseInt(a.version.slice('mntm-'.length)) < parseInt(b.version.slice('mntm-'.length)))) return 1
          else return -1
        })
        const output = {
          version: '',
          date: '',
          url: '',
          files: [],
          changelog: ''
        }
        const updater = channel.versions[0].files.find(file => file.target === 'f' + target && file.type === 'update_tgz')
        if (updater) {
          output.url = updater.url
        }
        output.version = channel.versions[0].version
        output.date = new Date(channel.versions[0].timestamp * 1000).toISOString().slice(0, 10)
        output.files = channel.versions[0].files.sort((a, b) => {
          if (a.url.match(/[\w.]+$/g)[0] > b.url.match(/[\w.]+$/g)[0]) return 1
          else return -1
        })
        let changelog = channel.versions[0].changelog
        changelog = changelog.replaceAll(/^( *)[-*] (.*?)\r?\n/gm, (match, g1, g2, offset, string, groups) => `<li style="padding-left: ${(g1 ? g1.length * 10 : 0) + 10}px">${g2}</li>`)
        for (let i = 5; i > 0; i--) {
          changelog = changelog.replaceAll(RegExp(`^${'#'.repeat(i)} (.*?)(\r?\n)+`, 'gm'), `<h${i}>$1</h${i}>`)
        }
        // TODO: use q-markdown
        // eslint-disable-next-line
        changelog = changelog.replaceAll(/\[([^\]]+)\]\(([^\)]+)\)/g, '<a target="_blank" href="$2">$1</a>')
        changelog = changelog.replaceAll(/\*\*(.*?)\*\*/g, '<b>$1</b>')
        changelog = changelog.replaceAll(/__(.*?)__/g, '<u>$1</u>')
        changelog = changelog.replaceAll(/`(.*?)`/g, '<code>$1</code>')
        changelog = changelog.replaceAll(/^\s*\[\/\/\]:.*?(\r?\n)+/gm, '')
        changelog = changelog.trimEnd().replaceAll(/\r?\n/g, '\n<br>\n')
        output.changelog = changelog
        return output
      }

      const releaseChannel = formatChannel(release)
      const devChannel = formatChannel(dev)

      return { release: releaseChannel, dev: devChannel }
    })
}

async function fetchFirmware (url) {
  const buffer = await fetch(url)
    .then(async response => {
      if (response.status >= 400) {
        throw new Error('Failed to fetch resources (' + response.status + ')')
      }
      const buffer = await response.arrayBuffer()
      return unpack(buffer)
    })

  return buffer
}

async function fetchRegions () {
  return fetch('https://update.flipperzero.one/regions/api/v0/bundle')
    .then((response) => {
      if (response.status >= 400) {
        throw new Error('Failed to fetch region (' + response.status + ')')
      }
      return response.json()
    })
    .then(result => {
      if (result.error) {
        throw new Error(result.error.text)
      } else if (result.success) {
        return result.success
      }
    })
}

function unpack (buffer) {
  const ungzipped = pako.ungzip(new Uint8Array(buffer))
  return untar(ungzipped.buffer)
}

function bytesToSize (bytes) {
  const sizes = ['Bytes', 'KiB', 'MiB', 'GiB', 'TiB']
  if (bytes === 0) return 'n/a'
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10)
  if (i === 0) return `${bytes} ${sizes[i]})`
  return `${(bytes / (1024 ** i)).toFixed(1)}${sizes[i]}`
}

export {
  Operation,
  fetchPacks,
  fetchPack,
  fetchChannels,
  fetchFirmware,
  fetchRegions,
  unpack,
  bytesToSize
}
