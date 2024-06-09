<template>
  <div class="updater column flex-center text-center">
    <template v-if="!flags.updateInProgress">
      <template v-if="flags.ableToUpdate && info.storage_sdcard_present">
        <div class="flex q-mt-sm">
          <q-select
            v-model="fwModel"
            :options="fwOptions"
            :suffix="fwOptions.find(({label}) => label === fwModel.label) ? fwOptions.find(({label}) => label === fwModel.label).version : ''"
            id="fw-select"
            style="width: 222px; border-radius: 14px; border-width: 2px;"
            popup-content-style="width: 222px; height: auto; max-height: 320px; border-radius: 14px; border: 2px solid white;"
            popup-content-class="bg-black text-gray-3"
            options-selected-class="bg-black text-white"
            behavior="menu"
            borderless
            dark
          >
            <template v-slot:option="scope">
              <q-item v-bind="scope.itemProps">
                <q-item-section class="items-start">
                  <q-item-label v-text="scope.opt.label" />
                </q-item-section>
                <q-item-section class="items-end">
                  <q-item-label v-text="scope.opt.version" :class="'fw-option-label ' + scope.opt.value"/>
                </q-item-section>
              </q-item>
            </template>
          </q-select>
          <q-btn
            v-if="fwModel"
            @click="update()"
            padding="12px 30px"
            :class="(!$q.screen.xs ? 'q-ml-lg' : 'q-mt-sm') + ' main-btn'"
            flat
          >Flash ⚡</q-btn>
        </div>
      </template>
      <template v-else>
        <span v-if="info.storage_sdcard_present">Your firmware doesn't support self-update. Install latest release with <a href="https://update.flipperzero.one">qFlipper desktop tool</a>.</span>
        <span v-else>Self-update is impossible without an SD card.</span>
      </template>
    </template>
    <template v-else>
      <p>{{ updateStage }}</p>
      <q-btn
        v-if="flags.updateError"
        flat
        class="q-mt-md main-btn"
        @click="flags.updateInProgress = false; flags.updateError = false"
      >Cancel</q-btn>
      <ProgressBar
        v-if="write.filename.length > 0"
        :title="write.filename"
        :progress="write.progress"
        style="width: 400px"
      />
    </template>
  </div>
  <div v-if="flags.ableToUpdate && info.storage_sdcard_present" id="changelog">
    <div v-html="channels[fwModel.value] ? channels[fwModel.value].changelog : ''" />
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { fetchChannels, fetchFirmware, fetchRegions } from '../util/util'
import ProgressBar from './ProgressBar.vue'
import semver from 'semver'
import asyncSleep from 'simple-async-sleep'
import { PB } from '../flipper/protobuf/proto-compiled'

export default defineComponent({
  name: 'Updater',

  components: {
    ProgressBar
  },

  props: {
    flipper: Object,
    rpcActive: Boolean,
    info: Object
  },

  setup () {
    return {
      flags: ref({
        restarting: false,
        rpcActive: false,
        rpcToggling: false,
        ableToUpdate: true,
        updateInProgress: false,
        updateError: false
      }),
      channels: ref({}),
      fwModel: ref({
        label: 'Release', value: 'release', version: ''
      }),
      fwOptions: ref([
        {
          label: 'Release', value: 'release', version: ''
        },
        {
          label: 'Dev', value: 'dev', version: ''
        }
      ]),
      updateStage: ref(''),
      write: ref({
        filename: '',
        progress: 0
      })
    }
  },

  watch: {
    async fwModel (newModel, oldModel) {
      localStorage.setItem('selectedFwChannel', newModel.value)
    }
  },

  methods: {
    async update () {
      this.flags.updateInProgress = true
      this.$emit('update', 'start')
      this.$emit('log', {
        level: 'info',
        message: 'Updater: Update started'
      })
      await this.loadFirmware()
        .catch(error => {
          this.flags.updateError = true
          this.updateStage = error
          this.$emit('showNotif', {
            message: error.toString(),
            color: 'negative'
          })
          this.$emit('log', {
            level: 'error',
            message: 'Updater: ' + error.toString()
          })
          throw error
        })
      this.flags.updateInProgress = false
    },

    async loadFirmware () {
      this.updateStage = 'Loading firmware bundle...'
      if (this.info.hardware_region !== '0') {
        const regions = await fetchRegions()
          .catch(error => {
            this.$emit('showNotif', {
              message: 'Failed to fetch regions: ' + error.toString(),
              color: 'negative'
            })
            this.$emit('log', {
              level: 'error',
              message: 'Updater: Failed to fetch regions: ' + error.toString()
            })
            throw error
          })

        let bands
        if (regions.countries[regions.country]) {
          bands = regions.countries[regions.country].map(e => regions.bands[e])
        } else {
          bands = regions.default.map(e => regions.bands[e])
          regions.country = 'JP'
        }
        const options = {
          countryCode: regions.country,
          bands: []
        }

        for (const band of bands) {
          const bandOptions = {
            start: band.start,
            end: band.end,
            powerLimit: band.max_power,
            dutyCycle: band.duty_cycle
          }
          const message = PB.Region.Band.create(bandOptions)
          options.bands.push(message)
        }

        this.$emit('log', {
          level: 'debug',
          message: 'Updater: Region provisioning message: ' + JSON.stringify(options)
        })

        options.countryCode = new TextEncoder().encode(regions.country)
        const message = PB.Region.create(options)
        const encoded = new Uint8Array(PB.Region.encodeDelimited(message).finish()).slice(1)

        await this.flipper.commands.storage.write('/int/.region_data', encoded)
          .catch(error => this.rpcErrorHandler(error, 'storage.write'))

        this.$emit('log', {
          level: 'info',
          message: 'Updater: Set Sub-GHz region: ' + regions.country
        })
      }

      if (this.channels[this.fwModel.value] && this.channels[this.fwModel.value].url) {
        const files = await fetchFirmware(this.channels[this.fwModel.value].url)
          .catch(error => {
            this.flags.updateError = true
            this.updateStage = error
            this.$emit('showNotif', {
              message: 'Failed to fetch firmware: ' + error.toString(),
              color: 'negative'
            })
            this.$emit('log', {
              level: 'error',
              message: 'Updater: Failed to fetch firmware: ' + error.toString()
            })
            throw error
          })
          .finally(() => {
            this.$emit('log', {
              level: 'debug',
              message: 'Updater: Downloaded firmware from ' + this.channels[this.fwModel.value].url
            })
          })

        this.updateStage = 'Loading firmware files'
        this.$emit('log', {
          level: 'info',
          message: 'Updater: Loading firmware files'
        })

        let path = '/ext/update/'
        await this.flipper.commands.storage.stat('/ext/update')
          .catch(async error => {
            if (error.toString() !== 'ERROR_STORAGE_NOT_EXIST') {
              this.rpcErrorHandler(error, 'storage.stat')
            } else {
              await this.flipper.commands.storage.mkdir('/ext/update')
                .catch(error => this.rpcErrorHandler(error, 'storage.mkdir'))
                .finally(() => {
                  this.$emit('log', {
                    level: 'debug',
                    message: 'Updater: storage.mkdir: /ext/update'
                  })
                })
            }
          })

        for (const file of files) {
          if (file.size === 0) {
            path = '/ext/update/' + file.name
            if (file.name.endsWith('/')) {
              path = path.slice(0, -1)
            }
            await this.flipper.commands.storage.mkdir(path)
              .catch(error => this.rpcErrorHandler(error, 'storage.mkdir'))
              .finally(() => {
                this.$emit('log', {
                  level: 'debug',
                  message: 'Updater: storage.mkdir: ' + path
                })
              })
          } else {
            this.write.filename = file.name.slice(file.name.lastIndexOf('/') + 1)
            const unbind = this.flipper.emitter.on('storageWriteRequest/progress', e => {
              this.write.progress = e.progress / e.total
            })
            await this.flipper.commands.storage.write('/ext/update/' + file.name, file.buffer)
              .catch(error => this.rpcErrorHandler(error, 'storage.write'))
              .finally(() => {
                this.$emit('log', {
                  level: 'debug',
                  message: 'Updater: storage.write: /ext/update/' + file.name
                })
              })
            unbind()
          }
          await asyncSleep(300)
        }
        this.write.filename = ''
        this.write.progress = 0

        this.updateStage = 'Loading manifest...'
        this.$emit('log', {
          level: 'info',
          message: 'Updater: Loading update manifest'
        })

        await this.flipper.commands.system.update(path + '/update.fuf')
          .catch(error => this.rpcErrorHandler(error, 'system.update'))
          .finally(() => {
            this.$emit('log', {
              level: 'debug',
              message: 'Updater: system.update: OK'
            })
          })

        this.updateStage = 'Update in progress, pay attention to your Flipper'
        this.$emit('log', {
          level: 'info',
          message: 'Updater: Rebooting Flipper'
        })

        await this.flipper.commands.system.reboot(2)
          .catch(error => this.rpcErrorHandler(error, 'system.reboot'))
      } else {
        this.flags.updateError = true
        this.updateStage = 'Failed to fetch channel'
        this.$emit('showNotif', {
          message: 'Unable to load firmware channel from the build server. Reload the page and try again.',
          color: 'negative',
          reloadBtn: true
        })
        this.$emit('log', {
          level: 'error',
          message: 'Updater: Failed to fetch channel'
        })
      }
    },

    compareVersions () {
      if (semver.lt((this.info.protobuf_version_major + '.' + this.info.protobuf_version_minor) + '.0', '0.6.0')) {
        this.flags.ableToUpdate = false
      }
    },

    rpcErrorHandler (error, command) {
      error = error.toString()
      this.$emit('showNotif', {
        message: `RPC error in command '${command}': ${error}`,
        color: 'negative'
      })
      this.$emit('log', {
        level: 'error',
        message: `Updater: RPC error in command '${command}': ${error}`
      })
    }
  },

  async mounted () {
    this.channels = await fetchChannels(this.info.hardware_target)
      .catch(error => {
        this.$emit('showNotif', {
          message: 'Unable to load firmware channels from the build server. Reload the page and try again.',
          color: 'negative',
          reloadBtn: true
        })
        this.$emit('log', {
          level: 'error',
          message: 'Updater: failed to fetch channels'
        })
        throw error
      })
    this.compareVersions()
    this.fwOptions[0].version = this.channels.release.version
    this.fwOptions[1].version = this.channels.dev.version

    const overrideChannel = (new URLSearchParams(location.search)).get('channel')
    const override = this.fwOptions.find(e => e.value === overrideChannel)
    const selectedBefore = this.fwOptions.find(e => e.value === localStorage.getItem('selectedFwChannel'))
    if (override) {
      this.fwModel = override
    } else if (selectedBefore) {
      this.fwModel = selectedBefore
    } else {
      this.fwModel = this.fwOptions[0]
    }
  }
})
</script>
