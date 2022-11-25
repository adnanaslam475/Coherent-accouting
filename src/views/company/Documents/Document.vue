<template>
  <div>
    <b-card>
      <b-col
          v-if="!showForm"
          cols="12"
          class="d-flex justify-content-end align-items-center mb-1"
      >
        <b-col cols="2">
          <b-button
              @click="showForm = true"
              small
              type="button"
              variant="primary"
              block
          >
            Add Asset
          </b-button>
        </b-col>
      </b-col>

      <b-form v-if="showForm" @submit.prevent="createBinary">
        <b-row>
          <b-col
              class="pb-2"
              cols="12"
          >
            <b-input-group class="input-group-merge">
              <b-form-textarea
                  v-model="notes"
                  required
                  placeholder="Add notes about binary file"
                  rows="5"
              />
            </b-input-group>
          </b-col>
          <b-col cols="12">
            <file-pond
                ref="pond"
                required
                name="file"
                label-idle="Drop files here..."
                :allow-multiple="false"
                accepted-file-types="pdf, image/jpeg, image/jpg, excel, word, txt ,zip "
                :files="myFiles"
                :server="server"
            />
          </b-col>
          <b-col
              cols="12"
              class="d-flex justify-content-end align-items-center mb-1"
          >
            <b-col cols="2">
              <b-button
                  small
                  type="submit"
                  variant="primary"
                  block
              >
                Create
              </b-button>
            </b-col>
          </b-col>
        </b-row>
      </b-form>
      <b-row>
        <b-col cols="12">
          <b-table
              :fields="fields"
              :items="items"
              responsive
              class="mb-0"
              @sort-changed="checkStatus"
          >
            <template #cell(Media)="data">
              <div>
                <b-img
                    blank-color="#ccc"
                    @click="showImageDetail(data.index)"
                    :src="images[data.index]"
                    :alt="images[data.index]"
                    rounded
                    width="62px"
                />
              </div>
            </template>
            <template style="text-align: center !important" #cell(action)="data">
              <!-- <b-button variant="outline-primary" class="btn-icon"> -->

              <!-- Dropdown -->
              <b-dropdown
                  variant="link"
                  toggle-class="p-0"
                  no-caret
                  :right="$store.state.appConfig.isRTL"
              >
                <template #button-content>
                  <feather-icon
                      icon="MoreVerticalIcon"
                      size="16"
                      class="align-middle text-body ml-1"
                  />
                </template>
                <b-dropdown-item>
                  <feather-icon icon="EditIcon" />
                  <span class="align-middle ml-50">Edit</span>
                </b-dropdown-item>
                <b-dropdown-item>
                  <feather-icon icon="TrashIcon" />
                  <span class="align-middle ml-50">Delete</span>
                </b-dropdown-item>
              </b-dropdown>

              <!-- </b-button> -->
            </template>

          </b-table>
        </b-col>
        <b-col
            cols="12"
            sm="6"
            class="
            d-flex
            align-items-center
            justify-content-center justify-content-sm-end
          "
        >
          <b-pagination
              v-model="currentPage"
              :total-rows="totalRecords"
              :per-page="perPage"
              first-number
              last-number
              class="mb-0 mt-1 mt-sm-0"
              prev-class="prev-item"
              next-class="next-item"
              prev-text
              @input="getAssets"
          >
            <template #prev-text>
              <feather-icon
                  icon="ChevronLeftIcon"
                  size="18"
              />
            </template>
            <template #next-text>
              <feather-icon
                  icon="ChevronRightIcon"
                  size="18"
              />
            </template>
          </b-pagination>
        </b-col>
      </b-row>
    </b-card>
    <b-modal
        id="modal-center-media"
        title="Download Image"
        ok-only
        ok-title="Download"
    >
      <b-img
          :src="imageD"
      ></b-img>
    </b-modal>
  </div>
</template>

<script>
import vueFilePond from 'vue-filepond'
// eslint-disable-next-line import/no-extraneous-dependencies
import 'filepond/dist/filepond.min.css'
// Import image preview plugin styles
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css'
// Import image preview and file type validation plugins
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'

import axios from '@/libs/axios'
import router from '@/router'
import {
  BCard,
  BFormInput,
  BRow,
  BInputGroupAppend,
  BCol,
  BInputGroup,
  BFormTextarea,
  BButton,
  BForm,
  BPagination,
  BTable,
  BImg,
  BModal,
  BDropdown,
  BDropdownItem,
} from 'bootstrap-vue'

// Create component
const FilePond = vueFilePond(
    FilePondPluginFileValidateType,
    FilePondPluginImagePreview,
)

export default {
  components: {
    FilePond,
    BCard,
    BRow,
    BCol,
    BForm,
    BButton,
    BTable,
    BInputGroup,
    BFormTextarea,
    BFormInput,
    BInputGroupAppend,
    BPagination,
    BImg,
    BModal,
    BDropdown,
    BDropdownItem,
  },
  data() {
    const self = this
    return {
      showForm: false,
      sortDesc: false,
      sortBy: 'id',
      currentPage: 1,
      perPage: '10',
      totalRecords: '',
      totalPages: '',
      searchQuery: '',
      binary: {},
      notes: '',
      myFiles: [],
      images: [],
      items: [],
      progress: 0,
      imageD: '',
      server: {
        process: (fieldName, file, metadata, load, error, progress, abort, transfer, options) => {
          const formData = new FormData()
          formData.append('file', file)
          formData.append('companyId', router.currentRoute.params.id)

          const request = new XMLHttpRequest()
          const token = localStorage.getItem('accessToken')
          request.open('POST', `${axios.defaults.baseURL}/binaries/api/store-binary/${this.$route.params.id}`)
          request.setRequestHeader('Authorization', `Bearer ${token}`)
          request.upload.onprogress = e => {
            progress(e.lengthComputable, e.loaded, e.total)
          }
          // eslint-disable-next-line func-names
          request.onload = function () {
            if (request.status >= 200 && request.status < 300) {
              self.onResponse(request.response)
              load(request.responseText)
            } else {
              error('oh no')
            }
          }
          request.send(formData)
          return {
            abort: () => {
              request.abort()
              abort()
            },
          }
        },
      },
      fields: [
        'Media',
        {
          key: 'binaryId',
          label: 'Binary Id',
          sortable: true,
        },
        {
          key: 'notes',
          label: 'Notes',
          sortable: true,
        },
        {
          key: 'action',
          label: 'Action',
        },
      ],
    }
  },
  mounted() {
    this.getAssets()
  },
  created() {
  },
  methods: {
    checkStatus(ctx) {
      if (ctx.sortDesc === false) {
        this.direction = 'asc'
      } else {
        this.direction = 'desc'
      }
      this.sortField = ctx.sortBy
      this.getAssets()
    },
    async getAssets() {
      // http://167.86.93.80:8881/account/api/asset/list/1/1/20?sortField=id&direction=desc&type=ASSET
      const response = await axios.get(`/account/api/asset/list/${router.currentRoute.params.id}/${this.currentPage}/${this.perPage}?sortField=id&direction=desc&type=ASSET`)
      this.items = response.data.elements
      this.totalRecords = response.data.totalElements
      this.totalPages = Math.ceil(this.totalRecords / this.perPage)
      this.items.forEach((item, index) => {
        this.getImage(JSON.parse(item.binaryId), index)
      })
    },
    onResponse(r) {
      this.binary = JSON.parse(r)
    },
    async createBinary() {
      const postData = {}
      postData.binaryId = this.binary.binaryId
      postData.notes = this.notes
      postData.type = 'ASSET'
      const response = await axios.post('/account/api/asset/create', postData)
      if (response.status === 201) {
        this.notes = ''
        this.showForm = false
        await this.getAssets()
      }
    },
    // eslint-disable-next-line consistent-return
    async getImage(data, index) {
      const self = this
      const response = await axios.get(`${axios.defaults.baseURL}/binaries/api/get-binary/${data.binaryId}/${router.currentRoute.params.id}`, { responseType: 'blob' })
      if (response.status === 200) {
        const reader = new FileReader()
        reader.readAsDataURL(response.data)
        // eslint-disable-next-line func-names
        reader.onload = function () {
          self.images.push(reader.result)
        }
      } else {
        self.images.push('')
      }
    },
    showImageDetail(index) {
      this.imageD = this.images[index]
      this.$bvModal.show('modal-center-media')
    },
  },
}
</script>
