<template>
  <div class="auth-wrapper auth-v2">
    <b-row class="auth-inner m-0">
      <navbarAds />

      <!-- Left Text-->
      <b-col lg="8" class="d-none d-lg-flex align-items-center p-5">
        <div
          class="w-100 d-lg-flex align-items-center justify-content-center px-5"
        >
          <b-img fluid :src="imgUrl" alt="Register V2" />
        </div>
      </b-col>
      <!-- /Left Text-->

      <!-- Register-->
      <b-col lg="4" class="d-flex align-items-center auth-bg px-2 p-lg-5">
        <b-col sm="8" md="6" lg="12" class="px-xl-2 mx-auto">
          <b-card-title class="mb-1">
            {{ $t("register.title") }}
          </b-card-title>
          <b-card-text class="mb-2">
            {{ $t("register.subtitle") }}
          </b-card-text>

          <!-- form -->
          <validation-observer ref="registerForm" #default="{ invalid }">
            <b-form class="auth-register-form mt-2" @submit.prevent="register">
              <!-- username -->
              <b-form-group
                v-bind:label="$t('register.lbl_f_name')"
                label-for="register-firstname"
              >
                <validation-provider
                  #default="{ errors }"
                  v-bind:name="$t('register.lbl_f_name')"
                  vid="firstname"
                  rules="required"
                >
                  <b-form-input
                    id="register-firstname"
                    v-model="firstname"
                    name="register-firstname"
                    :state="errors.length > 0 ? false : null"
                    v-bind:placeholder="$t('register.lbl_f_name')"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>

              <b-form-group
                v-bind:label="$t('register.lbl_l_name')"
                label-for="register-lastname"
              >
                <validation-provider
                  #default="{ errors }"
                  v-bind:name="$t('register.lbl_f_name')"
                  vid="lastname"
                  rules="required"
                >
                  <b-form-input
                    id="register-lastname"
                    v-model="lastname"
                    name="register-lastname"
                    :state="errors.length > 0 ? false : null"
                    v-bind:placeholder="$t('register.lbl_f_name')"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>

              <!-- Company -->
              <b-form-group
                :label="$t('register.lbl_c_accountType')"
                label-for="register-accountType"
              >
                <validation-provider
                  #default="{ errors }"
                  name="accountType"
                  vid="accountType"
                  rules="required"
                >
                  <b-form-select
                    v-model="account"
                    id="register-accountType"
                    name="register-accountType"
                    :state="errors.length > 0 ? false : null"
                  >
                    <b-form-select-option value="" disabled selected>{{
                      $t("register.select_account")
                    }}</b-form-select-option>
                    <b-form-select-option value="COMPANY">{{
                      $t("register.company")
                    }}</b-form-select-option>
                    <b-form-select-option value="PERSONAL">{{
                      $t("register.personal")
                    }}</b-form-select-option>
                  </b-form-select>

                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
              <div v-if="account === 'COMPANY'">
                <b-form-group
                  v-bind:label="$t('register.lbl_c_name')"
                  label-for="register-companyName"
                >
                  <validation-provider
                    #default="{ errors }"
                    v-bind:name="$t('register.lbl_f_name')"
                    vid="companyName"
                    rules="required"
                  >
                    <b-form-input
                      id="register-companyName"
                      v-model="companyName"
                      name="register-companyName"
                      :state="errors.length > 0 ? false : null"
                      v-bind:placeholder="$t('register.lbl_c_name')"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>

                <b-form-group
                  v-bind:label="$t('register.lbl_c_address')"
                  label-for="register-companyAddress"
                >
                  <validation-provider
                    #default="{ errors }"
                    v-bind:name="$t('register.lbl_c_address')"
                    vid="companyAddress"
                    rules="required"
                  >
                    <b-form-input
                      id="register-companyAddress"
                      v-model="companyAddress"
                      name="register-companyAddress"
                      :state="errors.length > 0 ? false : null"
                      v-bind:placeholder="$t('register.lbl_c_address')"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>

                <b-form-group
                  v-bind:label="$t('register.lbl_c_registrationNumber')"
                  label-for="register-registrationNumber"
                >
                  <validation-provider
                    #default="{ errors }"
                    name="registrationNumber"
                    vid="registrationNumber"
                    rules="required"
                  >
                    <b-form-input
                      id="register-registrationNumber"
                      v-model="registrationNumber"
                      name="register-registrationNumber"
                      :state="errors.length > 0 ? false : null"
                      v-bind:placeholder="
                        $t('register.lbl_c_registrationNumber')
                      "
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>

                <b-form-group
                  v-bind:label="$t('register.lbl_c_vatNumber')"
                  label-for="register-vatNumber"
                >
                  <validation-provider
                    #default="{ errors }"
                    name="vatNumber"
                    vid="vatNumber"
                    rules="required"
                  >
                    <b-form-input
                      id="register-vatNumber"
                      v-model="vatNumber"
                      name="register-vatNumber"
                      :state="errors.length > 0 ? false : null"
                      v-bind:placeholder="$t('register.lbl_c_vatNumber')"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>
              </div>

              <!-- email -->
              <b-form-group
                v-bind:label="$t('register.lbl_email')"
                label-for="register-email"
              >
                <validation-provider
                  #default="{ errors }"
                  v-bind:name="$t('register.lbl_email')"
                  vid="email"
                  rules="required|email"
                >
                  <b-form-input
                    id="register-email"
                    v-model="userEmail"
                    name="register-email"
                    :state="errors.length > 0 ? false : null"
                    v-bind:placeholder="$t('register.email_placeholder')"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>

              <!-- password -->
              <b-form-group
                label-for="register-password"
                v-bind:label="$t('register.lbl_password')"
              >
                <validation-provider
                  #default="{ errors }"
                  v-bind:name="$t('register.lbl_password')"
                  vid="password"
                  rules="required"
                >
                  <b-input-group
                    class="input-group-merge"
                    :class="errors.length > 0 ? 'is-invalid' : null"
                  >
                    <b-form-input
                      id="register-password"
                      v-model="password"
                      class="form-control-merge"
                      :type="passwordFieldType"
                      :state="errors.length > 0 ? false : null"
                      name="register-password"
                      placeholder="············"
                    />
                    <b-input-group-append is-text>
                      <feather-icon
                        :icon="passwordToggleIcon"
                        class="cursor-pointer"
                        @click="togglePasswordVisibility"
                      />
                    </b-input-group-append>
                  </b-input-group>
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>

              <b-form-group label="Country" label-for="register-country">
                <validation-provider
                  #default="{ errors }"
                  name="country"
                  vid="country"
                  rules="required"
                >
                  <!-- <b-form-select v-model="country" :options="countries" id="register-country" name="register-country"
                    :state="errors.length > 0 ? false : null">
                    <template #option="{ option }">
                      {{ option }}
                      <div style="
                          display: flex;
                          align-items: center;
                          justify-content: left;
                          grid-gap: 8px;
                        ">
                        <img :src="getImg(option.src)" />
                        {{ option.text }}
                      </div>
                    </template>
                    <template #option="option">
                      {{ option }}
                      <span style="
                          display: flex;++
                          align-items: center;
                          justify-content: left;
                          grid-gap: 8px;
                        ">
                        <img :src="getImg(option.src)" /> {{ option.text }}
                      </span>
                    </template>
                  </b-form-select> -->
                  <v-select
                    v-model="country"
                    :options="countries"
                    :filterBy="
                      (option, label, search) => {
                        return (
                          (option.text || '')
                            .toLocaleLowerCase()
                            .indexOf(search.toLocaleLowerCase()) > -1
                        );
                      }
                    "
                    v-bind:label="$t('register.lbl_country')"
                    id="register-country"
                    name="country"
                    v-bind:placeholder="$t('register.country_placeholder')"
                    :value="$store.state.selected"
                    :state="errors.length > 0 ? false : null"
                  >
                    <template #selected-option="option">
                      <div
                        style="
                          display: flex;
                          align-items: center;
                          justify-content: left;
                          grid-gap: 8px;
                        "
                      >
                        <img :src="getImg(option.src)" />
                        {{ option.text }}
                      </div>
                    </template>
                    <template v-slot:option="option">
                      <span
                        style="
                          display: flex;
                          align-items: center;
                          justify-content: left;
                          grid-gap: 8px;
                        "
                      >
                        <img :src="getImg(option.src)" /> {{ option.text }}
                      </span>
                    </template>
                  </v-select>
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>

              <b-form-group>
                <b-form-checkbox
                  id="register-privacy-policy"
                  v-model="gdpr"
                  name="checkbox-1"
                  >{{ $t("register.i_agree_to") }}
                  <b-link v-b-modal.modal-scrollable>
                    {{ $t("register.lbl_privacy_term_link") }}
                  </b-link>
                </b-form-checkbox>
              </b-form-group>

              <b-button
                variant="primary"
                block
                type="submit"
                :disabled="invalid || loading || !gdpr"
              >
                <b-spinner v-if="loading" small variant="light" />
                {{ $t("register.lbl_submit") }}
              </b-button>
            </b-form>
          </validation-observer>

          <p class="text-center mt-2">
            <span>{{ $t("register.have_account") }}</span>
            <b-link :to="{ name: 'login' }">
              <span>&nbsp;{{ $t("register.lbl_login_link") }}</span>
            </b-link>
          </p>

          <!-- divider -->
        </b-col>
      </b-col>
      <!-- /Register-->
    </b-row>
    <b-modal
      id="modal-scrollable"
      scrollable
      title="User Terms of Use Coherent Accounting"
      cancel-title="Close"
      ok-title="Accept"
      cancel-variant="outline-secondary"
      centered
      size="lg"
      @ok="gdpr = true"
    >
      <b-card-text style="height: 400px">
        <span style="white-space: break-spaces">
          <p>
            Please read carefully and agree to these terms before
            to use a web-based system of
            <a href="https://coherent-accounting.com/"
              >https://coherent-accounting.com/</a
            >
            . If you have any questions or concerns about the General
            conditions, please contact us.
          </p>
          <ul>
            <li class="p-list">Scope and Application</li>
          </ul>
          <p>
            These terms of use apply when visiting and
            using a web-based system developed and available at
            <a href="https://coherent-accounting.com/"
              >https://coherent-accounting.com/</a
            >
           
with the name "Coherent Accounting". The present terms and conditions for
            terms of use govern the relationship between the developer and each
            user who uses and/or accesses the platform at address
            <a href="https://coherent-accounting.com/"
              >https://coherent-accounting.com/</a
            >. By visiting the platform and/or creating an account and
            its use, you agree, fully accept and
            you must comply with these terms of use.
          </p>
          <ul>
            <li class="p-list">General terms</li>
          </ul>
          <p>
            <b> Article 1</b>: The terms used in the General Terms and Conditions have the following
            meanings:
          </p>
          <p>
            "Developer" – software developer who developed and built
            the platform. Owner of the platform and the intellectual
            ownership of it "User" - any physical or legal entity
            a person who visits and/or accesses and/or uses a web-based
            system available at address
            <a href="https://coherent-accounting.com/"
              >https://coherent-accounting.com/</a
            >. By creating and/or using an account providing access to
            the services developed in the platform named "Coherent
            Accounting". <br />
            "Account" – a separate part in the platform containing information about
            The user. Access to the platform is provided through the account.
            The account includes user data that must be
            credible and valid. The developer is not responsible for invalid
            data. <br />
            "Platform" – a web-based system available at the Internet address
            <a href="https://coherent-accounting.com/"
              >https://coherent-accounting.com/</a
            >, through which the developed services are accessed and/or used.
            The software and new profiles are created and the internet address
            <a href="https://accounting.controlisy.bg">
              https://accounting.controlisy.bg</a
            >, on which the Software is located. <br />
            "Web-based system" - the software named "Coherent
            Accounting'. The software provides the ability to OCR invoices and
            their digitization, module for digital invoices, generation of reports
            according to Art. 117, paragraph 1 of VAT and others. Detailed description and presentation of
            platform is described on the web page
            <a href="https://coherent-accounting.com/about">
              https://coherent-accounting.com/about</a
            >.
          </p>
          <p>
            <b> Article 2</b>: The developer has the right and may amend or
            supplements the Terms of Use at any time. In case of amendment
            or addition, the robber undertakes to publish the current one
            version of the Terms of Use and will be available and accessible at
            the platform. Users will be deemed to have been notified of the relevant
            amendments or additions to the Terms of Use from the time of
            their publication on the Platform. Each User is responsible
            and is obliged to regularly monitor the platform for amendments or
            additions to the Terms of Use. Any amendments or additions
            in the Terms of Use shall enter into force immediately, unless otherwise expressly provided
            otherwise mentioned by the Developer. <br />
            At its discretion, the Developer has the right to notify anyone
            User upon modification or addition of the Terms of Use.
            <br />
            In case the User does not agree with the changes or additions
            of the Terms of Use, the User has the right and should
            stop using the Platform. As with the termination of
            the use of the Platform is terminated and the relationship with
            The developer. In the hypothesis of the previous sentence, the User
            shall not be entitled to claim any compensation from the estate of
            The developer.
          </p>
          <p>
            <b> Article 3</b>: Developer shall not be liable for termination of
            the provision of its services in the event of circumstances not
            dependent on him and beyond his control - cases of force majeure
            force, random events, problems in the global internet network,
            actions or omissions of third parties, etc.
          </p>
          <p>
            <b> Article 4</b>: The developer does not provide a warranty for the used
            tools, document flow or functionality of the Platform. IN
            hypothesis of the previous sentence The developer is not responsible
            for damages and deviations resulting from their use.
          </p>
          <p>
            <b>Article 5</b>: The developer is not responsible for the data in
            the database when the User is granted access to
            The Platform with its Account of third parties access. In case of
            establishment of unregulated access, the Developer does not bear
            responsibility for missing or deleted information, documents or otherwise
            content (unless due to his fault). The user carries
            responsibility for the storage of passwords, protection from unregulated
            access, management of information, documents or other content.
          </p>
          <p>
            <b> Ч Article 6</b>: The Developer has the right at any time to add,
            removes or changes functionality of the Platform. The developer
            can make modifications and updates to the web-based system,
            without the User's consent or prior notice.
            The User uses the Platform in the form in which it is available,
            including after the relevant changes according to the previous sentence.
          </p>
          <p>
            <b> Article 7</b>: The Developer has the right to terminate access, on
            a User in violation of any term of the Terms
            for use with 7 days' notice or additional written notice
            agreed otherwise. In the hypothesis of the previous sentence
            Developer does not owe any compensation to paid/prepaid
            sums by the User, nor any compensation to
            The user.
          </p>
          <p>
            <b> Article 9</b>: A user may be a natural person or a legal entity
            a person who will use a web-based platform professionally
            quality and will use the Platform to carry out commercial or
            professional activity. The Platform is not intended for users
            within the meaning of the Consumer Protection Act to the extent that it is
            exclusively related to the exercise of a commercial or professional activity
            activity.
          </p>
          <p>
            <b> Article 10</b>: The User is obliged to use the Platform at
            strict compliance with the Terms of Use. The user can
            uses the Platform taking into account all functionalities and
            its limitations. The User is not entitled to use the Platform for
            unlawful purposes or are in contradiction with the Terms of Use
            or would cause damage to the Developer.
          </p>
          <p>
            <b> Article 11</b>: The user is obliged to use the web-based
            system for its intended purpose only. The user
            undertakes not to use the web-based platform for out-of-scope
            j. Developer has the right to immediately terminate access to
            The platform of a User who violates the Bulgarian
            legislation or attempts to violate the integrity and functionalities
            on the platform, through additional source codes. The developer has
            right, without prior notice and without liability for
            that, to archive or delete information, documents and/or any other
            content from the Platform's database that are in violation of
            Terms of use or Bulgarian legislation.
          </p>
          <p>
           
            <b> Article 12</b>: In case the User provides his Account
            to third parties, undertakes to ensure familiarization and compliance with
            Terms of use by all persons and working with the Platform.
          </p>
          <p>
            <b> Article 13</b>: Under the Copyright and Related Rights Act,
            The Law on Trademarks and Geographical Indications and others applicable
            normative acts is prohibited materials, media files and others
            similar that are published on the web-based form to be
            copied, distributed or made available for any purpose without
            the express consent of the Developer.
          </p>
          <p>
            <b> Article 14</b>: Through your registration in the web-based system,
            The Developer provides the User non-exclusively and immediately
            right to use the Platform. The user does not acquire
            ownership and/or any intellectual property rights.
          </p>
          <ul>
            <li class="p-list">Registration</li>
          </ul>
          <p>
            To use the web-based system you need to register,
            by filling out the electronic form available in real time (on-line).
            for registration of
            <a href="https://coherent-accounting.com/"
              >https://coherent-accounting.com/</a
            >
          </p>
          <p>
            <b> Article 15</b>: The user is obliged to provide complete and true
            data about your identity, or about what is represented by
            Its legal entity, as well as the other required data for
            the registration. The developer is not responsible for the update
            of the data in the User's Account.
          </p>
          <p>
            <b> Article 16</b>: User may register only once.
            The developer prohibits registration under a fictitious name, a foreign name
            or changed first name. When providing false data or
            fake, the Developer is not responsible and may immediately
            terminate access to the Platform.
          </p>
          <p>
            <b> Article 17</b>: Upon registration, the User must enter
            e-mail and password that were not used during another registration in
            The platform. Through this e-mail and password, the User
            individualized when using the services provided.
          </p>
          <p>
            <b> Article 18</b>: By ticking the box “I agree
            Terms of Use ”, the User declares that he is familiar with
            I accept the terms of use in full. With the recording of
            the statement under the preceding sentence by the Developer, the electronic one
            a statement also acquires the quality of an electronic document in the meaning
            of the Law on electronic documents and electronic certificates
            services.
          </p>
          <p>
            <b> Article 19</b>: The User agrees and declares that he will
            provide true, accurate, current and complete information when filling out
            of the registration form and the subsequent addition or change of
            data in your Account. The developer reserves the right to any
            time to change the volume of data required for registration of
            User. Also to require completion of such data in the Account
            of an already registered User.
          </p>
          <p>
            <b> Article 20</b>: The Developer does not undertake to verify
            the content of the files and data located on its platform,
            we reserve the right to remove, disable or replace, without
            warning, of files that do not conform to the legal ones
            provisions and requirements of these Rules, as well as such,
            which could, in his judgment, endanger the security of
            the servers and/or the information stored on them, if we consider it
            this as necessary without necessarily notifying the User. Po
            discretion of the Developer may notify the User that they will be
            Measures taken.
          </p>
          <p>
            <b> Article 21</b>: After declaring your agreement with the general
            conditions, at the email address specified by the User will be
            sent data to activate the Registration.
          </p>
          <p>
            <b> Член 22</b>: След активирането на акаунта се счита, че между
            Потребителят и Разработчикът е сключен договор.
          </p>
          <ul>
            <li class="p-list">Limitation of Liability</li>
          </ul>
          <p>
            <b> Article 23</b>: The developer is not responsible for any damages
            damages and lost profits arising as a result of the suspension,
            changing or limiting the services, deleting,
            the modification, loss, unreliability, inaccuracy, or
            the incompleteness of data, materials or information transmitted,
            used, recorded or made available through
            <a href="https://coherent-accounting.com/about"
              >https://coherent-accounting.com/about</a
            >
          </p>
          <p>
            <b> Article 24</b>: The developer is not responsible for any damages
            damages and lost profits resulting from access by third parties
            User's account.
          </p>
          <p>
            <b> Article 25</b>: The developer is not responsible for any damages
            damages and lost profits arising as a result of the right
            using a web-based platform and not verified by the party
            of the User.
          </p>
          <ul>
            <li class="p-list">Other Terms</li>
          </ul>
          <p>
            <b> Article 26</b>: All disputes arising from the published on
            the Platform Terms of Use or relating thereto, even
            disputes arising out of or relating to their interpretation,
            invalidity, performance or termination, as well as disputes about
            filling in gaps or adapting the Terms of Use
            to newly arising circumstances, will be resolved against
            Bulgarian legislation.
          </p>
          <p>
            <b> Article 27</b>: The terms of use published on the Platform are
            governed by and interpreted in accordance with Bulgarian law. All
            other non-contractual obligations arising out of or in connection with
            the published Terms of Use shall be governed by and construed in accordance with
            Bulgarian law. For all not governed by the Terms of Use
            matters, the provisions of Bulgarian law apply.
          </p>
          <p>
            <b> Article 28</b>: The Developer shall try and make efforts to
            maintaining up-to-date information in the web-based system.
            The developer cannot guarantee or claim its
            comprehensiveness and reliability.
          </p>
          <p>
            <b> Article 29</b>: The developer does not guarantee the free and continuous
            access to the Platform, and does not guarantee that the Platform is
            protected from errors during its use.
          </p>
          <p>
            <b> Article 30</b>: The User in relation to the Platform communicates
            with the Developer as follows in writing by e-mail.
            Correspondence will be considered received upon written confirmation from
            User or Developer side. In case it doesn't
            received confirmation within 7 days, the correspondence is
            considered received, unless the sender's e-mail is
            message received that the letter was not delivered to the recipient due to
            technical reasons.
          </p>
        </span>
      </b-card-text>
    </b-modal>
  </div>
</template>

<script>
/* eslint-disable global-require */
import Vue from "vue";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import VuexyLogo from "@core/layouts/components/Logo.vue";
import vSelect from "vue-select";

import {
  BRow,
  BCol,
  BLink,
  BButton,
  BForm,
  BFormCheckbox,
  BFormGroup,
  BFormInput,
  BInputGroup,
  BInputGroupAppend,
  BImg,
  BCardTitle,
  BCardText,
  BDropdown,
  BDropdownItem,
  BFormSelect,
  BNavbar,
  BNavbarBrand,
  BNavbarToggle,
  BNavbarNav,
  BNavForm,
  BCollapse,
  BNavItemDropdown,
  BDropdownDivider,
  BAvatar,
  BNavItem,
  BSpinner,
  BModal,
  BFormSelectOption,
} from "bootstrap-vue";
import { required, email, password } from "@validations";
import { togglePasswordVisibility } from "@core/mixins/ui/forms";
import store from "@/store/index";
import useJwt from "@/auth/jwt/useJwt";

import navbarAds from "./navbarAds.vue";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
export default {
  components: {
    VuexyLogo,
    BRow,

    BImg,
    BCol,
    BLink,
    BButton,
    BForm,
    BCardText,
    BCardTitle,
    BFormCheckbox,
    BFormGroup,
    BDropdown,
    BFormSelect,
    BDropdownItem,
    BFormInput,
    BNavbar,
    BNavbarBrand,
    BNavbarToggle,
    BCollapse,
    BNavbarNav,
    BNavItemDropdown,
    BNavForm,
    BDropdownDivider,
    BAvatar,
    BNavItem,
    BInputGroup,
    BInputGroupAppend,
    // validations
    ValidationProvider,
    ValidationObserver,
    vSelect,
    navbarAds,
    BSpinner,
    BModal,
    BFormSelectOption,
  },
  mixins: [togglePasswordVisibility],
  data() {
    return {
      status: "",
      firstname: "",
      lastname: "",
      userEmail: "",
      password: "",
      gdpr: false,
      companyName: "",
      country: "",
      ipAddress: "",
      isoAlpha2Country: "",
      companyAddress: "",
      vatNumber: "",
      registrationNumber: "",
      sideImg: require("@/assets/images/pages/register-v2.svg"),
      // validation
      required,
      email,
      selected: null,
      country: null,
      account: null,
      countries: [],
      accountType: [
        { value: null, text: "Please select account type", disabled: true },
        { value: "COMPANY", text: "COMPANY" },
        { value: "PERSONAL", text: "PERSONAL" },
      ],
      loading: false,
    };
  },
  computed: {
    passwordToggleIcon() {
      return this.passwordFieldType === "password" ? "EyeIcon" : "EyeOffIcon";
    },
    imgUrl() {
      if (store.state.appConfig.layout.skin === "dark") {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.sideImg = require("@/assets/images/pages/register-v2-dark.svg");
        return this.sideImg;
      }
      return this.sideImg;
    },
  },
  methods: {
    register() {
      this.$refs.registerForm.validate().then((success) => {
        if (success) {
          this.loading = true;
          useJwt
            .clientToken()
            .then((res) => {
              let token = res.data.access_token;
              useJwt
                .getIpAddress()
                .then((res) => {
                  let IpAddress = res?.data?.ip;
                  useJwt
                    .register(token, {
                      firstName: this.firstname,
                      lastName: this.lastname,
                      email: this.userEmail,
                      password: this.password,
                      accountType: this.account,
                      companyAddress:
                        this.account == "COMPANY" ? this.companyAddress : "",
                      companyName:
                        this.account == "COMPANY" ? this.companyName : "",
                      companyRegistrationNumber:
                        this.account == "COMPANY"
                          ? this.registrationNumber
                          : "",
                      vatNumber:
                        this.account == "COMPANY" ? this.vatNumber : "",
                      country: this.country?.text,
                      gdpr: this.gdpr,
                      identifier: "",
                      ipAddress: IpAddress,
                      isoAlpha2Country: this.country?.value,
                    })
                    .then((response) => {
                      this.loading = false;
                      return this.$router.push({ name: "verify-email" });
                    })
                    .catch((error) => {
                      this.loading = false;
                      this.$toast({
                        component: ToastificationContent,
                        props: {
                          title: `${error.response.data.errorMessage}`,
                          icon: "EditIcon",
                          variant: "error",
                        },
                      });
                    });
                })
                .catch((error) => {
                  this.loading = false;
                });
            })
            .catch((error) => {
              this.loading = false;
              this.$toast({
                component: ToastificationContent,
                props: {
                  title: `${error.errorMessage}`,
                  icon: "EditIcon",
                  variant: "error",
                },
              });
            });
        }
      });
    },
    getImg(img) {
      let defaultPath = require("../assets/flags/aw.png");
      let path = require("../assets/flags/" + img + ".png");
      try {
        return path;
      } catch (e) {
        return defaultPath;
      }
    },
    populateCountries() {
      var optionsArr = this;
      useJwt
        .clientToken()
        .then((res) => {
          let token = res.data.access_token;
          useJwt
            .countries(token)
            .then((response) => {
              response.data.map(function (value, key) {
                optionsArr.countries.push({
                  Country: value.isoAlpha2Country,
                  value: value.isoAlpha2Country,
                  text: value.country,
                  src: value.isoAlpha2Country.toLocaleLowerCase(),
                });
              });
            })
            .catch((error) => {
              this.$toast({
                component: ToastificationContent,
                props: {
                  title: `${error}`,
                  icon: "EditIcon",
                  variant: "error",
                },
              });
            });
        })
        .catch((error) => {
          // this.$refs.registerForm.setErrors(error)
          this.$toast({
            component: ToastificationContent,
            props: {
              title: `${error.errorMessage}`,
              icon: "EditIcon",
              variant: "error",
            },
          });
        });
    },
  },
  mounted() {
    this.populateCountries();
  },
};
/* eslint-disable global-require */
</script>

<style lang="scss" scoped>
@import "@core/scss/vue/pages/page-auth.scss";
@import "@core/scss/vue/libs/vue-select.scss";

.p-list {
  font-size: 1vw;
  color: #0a64bc;
  font-weight: bold;
}

.navbar-desktop a {
  padding-right: 1rem !important;
  padding-left: 1rem !important;
  color: #6e6b7b !important;
  padding-bottom: 0 !important;
}

.v-select {
  &.item-selector-title,
  &.payment-selector {
    background-color: #fff;

    .dark-layout & {
      background-color: unset;
    }
  }
}

.v-select {
  margin-top: 3px !important;
}
</style>

<style lang="scss">
@import "@core/scss/vue/libs/vue-select.scss";
@import "@core/scss/vue/libs/vue-flatpicker.scss";

.invoice-add-wrapper {
  .add-new-client-header {
    padding: $options-padding-y $options-padding-x;
    color: $success;

    &:hover {
      background-color: rgba($success, 0.12);
    }
  }
}
</style>
