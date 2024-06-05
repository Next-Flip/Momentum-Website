<template>
  <q-page class="flex-center column full-width">
    <div class="flex-center column align-items-center">
      <template v-if="packs === null">
        <q-spinner
          color="primary"
          size="3em"
          class="q-mb-md"
        ></q-spinner>
        <p>Loading Asset Packs...</p>
      </template>
      <h5 v-else-if="packs.length < 1">Nothing to see here 🤔</h5>
      <q-list v-else class="packs-grid">
        <q-card
          v-for="pack in packs"
          :key="pack.id"
          v-bind="pack"
          class="flex justify-between"
          style="flex-direction: column;"
          dark
        >
          <q-carousel
            animated
            v-model="slides[pack.id]"
            :arrows="pack.preview_urls.length > 1"
            :navigation="pack.preview_urls.length > 1"
            transition-prev="slide-right"
            transition-next="slide-left"
            infinite
          >
            <q-carousel-slide
              v-for="(preview_url, i) in pack.preview_urls"
              :key="i"
              :name="i + 1"
              :img-src="preview_url"
            />
          </q-carousel>

          <div class="q-mt-xs q-ml-md q-mr-sm flex flex-col items-center justify-between">
            <div class="text-left text-bold">
              <div class="text-h5">{{ pack.name }}</div>
              <div class="text-h7">by {{ pack.author }}</div>
            </div>
            <q-btn
              v-if="pack.source_url"
              :href="pack.source_url"
              target="_blank"
              icon="open_in_new"
              class="main-btn"
              style="border: none; padding: 0; margin: 0; width: 50px; height: 50px;"
              flat
            />
          </div>
          <div class="q-mt-sm q-mx-md">
            <q-icon v-if="pack.stats.packs > 1" size="1.5em" left name="category">
              <q-tooltip style="font-size: 1.2em; padding: 0.1em 0.3em;">
                Contains {{ pack.stats.packs }} Asset Packs
              </q-tooltip>
            </q-icon>
            <q-icon v-if="pack.stats.anims > 0" size="1.5em" left name="ondemand_video">
              <q-tooltip style="font-size: 1.2em; padding: 0.1em 0.3em;">
                {{ pack.stats.anims }} Animation{{ pack.stats.anims > 1 ? "s" : "" }}
              </q-tooltip>
            </q-icon>
            <q-icon v-if="pack.stats.passport.length > 0" size="1.5em" left name="portrait">
              <q-tooltip style="font-size: 1.2em; padding: 0.1em 0.3em;">
                {{ !pack.stats.passport.includes("Background") ? "" : "Passport Background" + (pack.stats.passport.length > 1 ? ` and ${pack.stats.passport.slice(1).join(", ")} Mood${pack.stats.passport.length > 2 ? "s" : ""}` : "") }}
                {{ pack.stats.passport.includes("Background") ? "" : `${pack.stats.passport.join(", ")} Passport Mood${pack.stats.passport.length > 1 ? "s" : ""}` }}
              </q-tooltip>
            </q-icon>
            <q-icon v-if="pack.stats.icons > 0" size="1.5em" left name="wallpaper">
              <q-tooltip style="font-size: 1.2em; padding: 0.1em 0.3em;">
                {{ pack.stats.icons }} Icon{{ pack.stats.icons > 1 ? "s" : "" }}
              </q-tooltip>
            </q-icon>
            <q-icon v-if="pack.stats.fonts.length > 0" size="1.5em" left name="text_fields">
              <q-tooltip style="font-size: 1.2em; padding: 0.1em 0.3em;">
                {{ pack.stats.fonts.join(", ") }} Font{{ pack.stats.fonts.length > 1 ? "s" : "" }}
              </q-tooltip>
            </q-icon>
          </div>
          <div
            v-if="pack.description"
            class="text-h7 q-mt-sm q-mx-md"
          >{{ pack.description }}</div>

          <q-card-actions :align="'stretch'">
            <q-btn
              :href="pack.url_zip"
              class="main-btn"
              style="flex: 1;"
              flat
            >Download</q-btn>
            <!-- TODO: Maybe support queueing to install after -->
            <q-btn
              v-if="pack.id !== installing"
              :disable="!serialSupported || installing !== null || rpcToggling"
              @click="install(pack)"
              class="main-btn"
              style="flex: 1;"
              flat
            >{{ !serialSupported ? 'Unsupported' : rpcToggling ? 'Connecting' : !connected ? 'Connect' : 'Install' }}</q-btn>
            <q-btn
              v-else
              class="main-btn"
              :style="`flex: 1; background-image: linear-gradient(to right, #a883e9 ${progress * 100}%, transparent ${progress * 100}%);`"
              disable
              flat
            >{{ installStatus }}</q-btn>
          </q-card-actions>

        </q-card>
      </q-list>
    </div>
  </q-page>
</template>

<script>
import { fetchPacks } from '../util/util'
import { defineComponent, ref } from 'vue'
import asyncSleep from 'simple-async-sleep'

export default defineComponent({
  name: 'PagePacks',

  props: {
    flipper: Object,
    connected: Boolean,
    rpcActive: Boolean,
    rpcToggling: Boolean,
    serialSupported: Boolean,
    info: Object
  },

  setup () {
    return {
      packs: ref(null),
      slides: ref({}),
      flags: ref({
        restarting: false,
        rpcActive: false,
        rpcToggling: false
      }),
      progress: ref(0),
      installStatus: ref(null),
      installing: ref(null)
    }
  },

  watch: {
    async info (newInfo, oldInfo) {
      if (newInfo !== null && newInfo.storage_databases_present && this.connected) {
        await this.start()
      }
    }
  },

  methods: {
    async install (pack) {
      if (!this.serialSupported) return
      if (!this.connected || this.info == null || !this.rpcActive) {
        if (!this.rpcToggling) this.$emit('selectPort')
        return
      }
      try {
        const stepCount = 3
        let step = -1
        const setProgress = (progress) => {
          this.progress = (progress / stepCount) + (1 / stepCount * step)
        }
        this.progress = 0

        this.installStatus = 'Loading'
        step++
        this.installing = pack.id
        const url = pack.url_targz
        const packTarGz = await fetch(url)
          .then(async response => {
            if (response.status >= 400) {
              throw new Error('Pack returned ' + response.status)
            }
            // Read in chunks
            const totalLength = Number(response.headers.get('content-length'))
            const reader = response.body.getReader()
            let receivedLength = 0
            const chunks = []
            while (true) {
              const { done, value } = await reader.read()
              if (done) break
              chunks.push(value)
              receivedLength += value.length
              // Update progress
              setProgress(receivedLength / totalLength)
            }
            // Piece together the chunks into one array
            const chunksAll = new Uint8Array(receivedLength)
            let position = 0
            for (const chunk of chunks) {
              chunksAll.set(chunk, position)
              position += chunk.length
            }
            return chunksAll
          })
          .catch(error => {
            this.$emit('showNotif', {
              message: 'Failed to fetch pack: ' + error.toString(),
              color: 'negative'
            })
            this.$emit('log', {
              level: 'error',
              message: 'Packs: Failed to fetch pack: ' + error.toString()
            })
            throw error
          })
          .finally(() => {
            this.$emit('log', {
              level: 'debug',
              message: 'Packs: Downloaded pack from ' + url
            })
          })

        const mkdirParents = async (path) => {
          if (path.endsWith('/')) {
            path = path.slice(0, -1)
          }
          let full = ''
          for (const segment of path.split('/')) {
            if (full !== '/') {
              full += '/'
            }
            full += segment
            if (full.length < '/ext/*'.length) {
              continue // Cannot mkdir filesystems root, needs to be atleast fs root + 1 char
            }
            await this.flipper.commands.storage.mkdir(full)
              .catch(error => this.rpcErrorHandler(error, 'storage.mkdir'))
              .finally(() => {
                this.$emit('log', {
                  level: 'debug',
                  message: 'Packs: storage.mkdir: ' + full
                })
              })
          }
        }

        const extractPath = '/ext/asset_packs'
        const tempPath = '/ext/.tmp/mntm'
        const tempFile = `${tempPath}/${pack.id}.tar.gz`
        await mkdirParents(extractPath)
        await mkdirParents(tempPath)

        this.installStatus = 'Copying'
        step++
        const unbind = this.flipper.emitter.on('storageWriteRequest/progress', e => {
          setProgress(e.progress / e.total)
        })
        let start = performance.now()
        let took = 0
        await this.flipper.commands.storage.write(tempFile, packTarGz)
          .catch(error => this.rpcErrorHandler(error, 'storage.write'))
          .finally(() => {
            took = performance.now() - start
            this.$emit('log', {
              level: 'debug',
              message: `Packs: storage.write: ${tempFile} took ${Math.round(took)}ms`
            })
          })
        unbind()

        this.installStatus = 'Extracting'
        step++
        start = performance.now()
        // Lord forgive me for I have sinned
        const expectedExtractTime = took * 10 // Depends on compression ratio and sd speed, 10x is generous
        const fakeExtractProgress = setInterval(() => {
          setProgress((performance.now() - start) / expectedExtractTime)
        }, 250)
        await this.flipper.commands.storage.tarExtract(tempFile, extractPath)
          .catch(error => this.rpcErrorHandler(error, 'storage.tarExtract'))
          .finally(() => {
            clearInterval(fakeExtractProgress)
            took = performance.now() - start
            this.$emit('log', {
              level: 'debug',
              message: `Packs: storage.tarExtract: ${tempFile} to ${extractPath} took ${Math.round(took)}ms`
            })
          })
        setProgress(1)

        this.installStatus = 'Cleanup'
        await this.flipper.commands.storage.remove(tempFile, false)
          .catch(error => this.rpcErrorHandler(error, 'storage.remove'))
          .finally(() => {
            this.$emit('log', {
              level: 'debug',
              message: 'Packs: storage.remove: ' + tempFile
            })
          })
      } finally {
        this.installing = null
        this.installStatus = null
        this.progress = 0
      }
    },

    async startRpc () {
      this.flags.rpcToggling = true
      const ping = await this.flipper.commands.startRpcSession(this.flipper)
      if (!ping.resolved || ping.error) {
        this.$emit('showNotif', {
          message: 'Unable to start RPC session. Reload the page or reconnect Flipper manually.',
          color: 'negative',
          reloadBtn: true
        })
        this.$emit('log', {
          level: 'error',
          message: 'Device: Couldn\'t start rpc session'
        })
        throw new Error('Couldn\'t start rpc session')
      }
      this.flags.rpcActive = true
      this.flags.rpcToggling = false
      this.$emit('setRpcStatus', true)
      this.$emit('log', {
        level: 'info',
        message: 'Device: RPC started'
      })
    },

    async stopRpc () {
      this.flags.rpcToggling = true
      await this.flipper.commands.stopRpcSession()
      this.flags.rpcActive = false
      this.flags.rpcToggling = false
      this.$emit('setRpcStatus', false)
      this.$emit('log', {
        level: 'info',
        message: 'Device: RPC stopped'
      })
    },

    async restartRpc (force) {
      if ((this.connected && this.flags.rpcActive && !this.flags.restarting) || force) {
        this.flags.restarting = true
        await this.flipper.closeReader()
        await asyncSleep(300)
        await this.flipper.disconnect()
        await asyncSleep(300)
        await this.flipper.connect()
        await this.startRpc()
        this.$emit('log', {
          level: 'info',
          message: 'Device: Restarted RPC'
        })
      }
    },

    passNotif (config) {
      this.$emit('showNotif', config)
    },
    passLog (config) {
      this.$emit('log', config)
    },

    rpcErrorHandler (error, command) {
      error = error.toString()
      this.$emit('showNotif', {
        message: `RPC error in command '${command}': ${error}`,
        color: 'negative'
      })
      this.$emit('log', {
        level: 'error',
        message: `Device: RPC error in command '${command}': ${error}`
      })
    },

    async start () {
      if (!this.serialSupported) return
      this.flags.rpcActive = this.rpcActive
      if (!this.rpcActive) {
        setTimeout(() => {
          if (!this.rpcActive) {
            return this.restartRpc(true)
          }
        }, 1000)
        await this.startRpc()
      }
      navigator.serial.addEventListener('disconnect', e => {
        this.flags.rpcActive = false
        this.flags.rpcToggling = false
        this.$emit('setRpcStatus', false)
      })
    }
  },

  async mounted () {
    const packs = await fetchPacks()
      .catch(error => {
        this.$emit('showNotif', {
          message: 'Unable to load asset packs from the server. Reload the page and try again.',
          color: 'negative',
          reloadBtn: true
        })
        this.$emit('log', {
          level: 'error',
          message: 'Packs: Failed to fetch pack list'
        })
        throw error
      })
    for (const pack of packs) {
      this.slides[pack.id] = 1
    }
    this.packs = packs
    if (this.connected && this.info !== null && this.info.storage_databases_present) {
      await this.start()
    }
  },

  async beforeUnmount () {
    this.unbindRestart()
    await asyncSleep(3000)
  }
})
</script>
