<template>
    <div>
      <b-card-code
        title="Vertical Form With Icons"
      >
        <b-form @submit.prevent>
          <b-row>
  
            <!-- first name -->
            <b-col cols="6">
              <b-form-group
                label="Address"
                label-for="vi-address"
              >
                <b-input-group class="input-group-merge">
                  <b-input-group-prepend is-text>
                    <feather-icon icon="UserIcon" />
                  </b-input-group-prepend>
                  <b-form-input
                    id="vi-address"
                    placeholder="Address"
                  />
                </b-input-group>
              </b-form-group>
            </b-col>
  
            <!-- email -->
            <b-col cols="6">
              <b-form-group
                label="Email"
                label-for="vi-email"
              >
                <b-input-group class="input-group-merge">
                  <b-input-group-prepend is-text>
                    <feather-icon icon="MailIcon" />
                  </b-input-group-prepend>
                  <b-form-input
                    id="vi-email"
                    type="email"
                    placeholder="Email"
                  />
                </b-input-group>
              </b-form-group>
            </b-col>
  
            <!-- mobile -->
            <b-col cols="6">
              <b-form-group
                label="Mobile"
                label-for="vi-mobile"
              >
                <b-input-group class="input-group-merge">
                  <b-input-group-prepend is-text>
                    <feather-icon icon="SmartphoneIcon" />
                  </b-input-group-prepend>
                  <b-form-input
                    id="vi-mobile"
                    type="number"
                    placeholder="Mobile"
                  />
                </b-input-group>
              </b-form-group>
            </b-col>
  
            <!-- reset and submit -->
            <b-col cols="12">
              <b-button
                v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                type="submit"
                variant="primary"
                class="mr-1"
              >
                Submit
              </b-button>
            </b-col>
          </b-row>
        </b-form>
  
        <template #code>
          {{ codeVerticalIcon }}
        </template>
      </b-card-code>
    </div>
  </template>
  <script>
  import BCardCode from '@core/components/b-card-code'
  import {
    BRow, BCol, BFormGroup, BFormInput, BFormCheckbox, BForm, BButton, BInputGroup, BInputGroupPrepend,
  } from 'bootstrap-vue'
  import Ripple from 'vue-ripple-directive'
  import { codeVerticalIcon } from '@/views/forms/form-layout/code'
  
  export default {
    components: {
      BCardCode,
      BRow,
      BCol,
      BFormGroup,
      BFormInput,
      BFormCheckbox,
      BInputGroup,
      BInputGroupPrepend,
      BForm,
      BButton,
    },
    directives: {
      Ripple,
    },
    data() {
      return {
        codeVerticalIcon,
      }
    },
  }
  </script>
  <style lang="">
      /*  */
  </style>
  