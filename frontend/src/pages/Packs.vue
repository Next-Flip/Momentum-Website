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
      <q-list v-else class="packs-grid">
        <q-card
          v-for="pack in packs"
          :key="pack.id"
          v-bind="pack"
          class="flex justify-between"
          style="flex-direction: column;"
          dark
        >
          <!-- TODO: Cycle previews -->
          <img :src="pack.preview_urls[0]">

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
            <!-- TODO: Add icon indicators for pack content -->
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
            >Installing</q-btn>
          </q-card-actions>

        </q-card>
      </q-list>
    </div>
  </q-page>
</template>

<script>
import { fetchPacks, fetchPack } from '../util/util'
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
      flags: ref({
        restarting: false,
        rpcActive: false,
        rpcToggling: false
      }),
      progress: ref(0),
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
        // TODO: Add back progress with this.progress
        this.installing = pack.id
        this.progress = 0
        const url = pack.url_targz
        const packTarGz = await fetchPack(url)
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

        await this.flipper.commands.storage.write(tempFile, packTarGz)
          .catch(error => this.rpcErrorHandler(error, 'storage.write'))
          .finally(() => {
            this.$emit('log', {
              level: 'debug',
              message: 'Packs: storage.write: ' + tempFile
            })
          })

        await this.flipper.commands.storage.tarExtract(tempFile, extractPath)
          .catch(error => this.rpcErrorHandler(error, 'storage.tarExtract'))
          .finally(() => {
            this.$emit('log', {
              level: 'debug',
              message: 'Packs: storage.tarExtract: ' + tempFile
            })
          })
      } finally {
        this.installing = null
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
    this.packs = await fetchPacks()
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
