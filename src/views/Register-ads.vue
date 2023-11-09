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
      title="Условия на Ползване Coherent Accounting"
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
            Моля, запознайте се внимателно и се съгласете с тези условия, преди
            да използвате уеб-базирана система на
            <a href="https://coherent-accounting.com/"
              >https://coherent-accounting.com/</a
            >
            . Ако имате каквито и да било въпроси или притеснения относно Общите
            условия, моля свържете се с нас.
          </p>
          <ul>
            <li class="p-list">Обхват и приложение</li>
          </ul>
          <p>
            Настоящите условия за ползване се прилагат при посещаването и
            използване на уеб-базирана система, разработена и достъпна на адрес
            <a href="https://coherent-accounting.com/"
              >https://coherent-accounting.com/</a
            >
            с наименование „Coherent Accounting“. Настоящите условията за
            ползване уреждат взаимоотношенията между разработчикът и всеки
            потребител, който използва и/или достъпва платформата на адрес
            <a href="https://coherent-accounting.com/"
              >https://coherent-accounting.com/</a
            >. Със посещаването на платформата и/или създаване на акаунт и
            неговото използване, се съгласявате, изцяло приемате и се
            задължавате да спазвате настоящите условия за ползване.
          </p>
          <ul>
            <li class="p-list">Общи условия</li>
          </ul>
          <p>
            <b> Член 1</b>: Използваните термини в Общите условия имат следните
            значения:
          </p>
          <p>
            "Разработчик" – софтуерен разработчик, разработил и изградил
            платформата . Собственик на платформата и интелектуалната
            собственост върху нея "Потребител" – всяко физическо или юридическо
            лице, което посещава и/или достъпва и/или използва уеб-базирана
            система достъпна на адрес
            <a href="https://coherent-accounting.com/"
              >https://coherent-accounting.com/</a
            >. Чрез създаване и/или използване на акаунт предоставящ достъп до
            услугите разработени в платформата с наименование "Coherent
            Accounting". <br />
            "Акаунт" – отделна част в платформата, съдържаща информация за
            Потребителят. Чрез акаунта се предоставя достъп до платформата.
            Акаунтът включва данни за потребителят, които трябва да бъдат
            достоверни и валидни. Разработчикът не носи отговорност за невалидни
            данни. <br />
            "Платформа" – уеб-базирана система достъпна на интернет адресът
            <a href="https://coherent-accounting.com/"
              >https://coherent-accounting.com/</a
            >, чрез който се достъпва и/или използват разработените услуги.
            Софтуерът и се създават нови профили и интернет адресът
            <a href="https://accounting.controlisy.bg">
              https://accounting.controlisy.bg</a
            >, на който се намира Софтуера. <br />
            "Уеб-базирана система" – софтуерът с наименование „Coherent
            Accounting“. Софтуерът предоставя възможност за OCR на фактури и
            дигитализация им, модул за дигитални фактури, генериране на отчети
            по чл. 117, ал.1 от ЗДДС и други. Подробно описание и представяне на
            платформа е описана на уеб страница
            <a href="https://coherent-accounting.com/about">
              https://coherent-accounting.com/about</a
            >.
          </p>
          <p>
            <b> Член 2</b>: Разработчикът има правото и може да изменя или
            допълва Условията за ползване по всяко време. В случай на изменение
            или допълнение, разбойникът се задължава да публикува актуалната
            версия на Условията за ползване и ще бъдат налични и достъпни на
            платформата. Потребителите ще се считат за уведомени за съответните
            изменения или допълнения на Условията за ползване от момента на
            тяхното публикуване на Платформа. Всеки Потребител носи отговорност
            и е длъжен редовно да следи на платформата за изменения или
            допълнения на Условията за ползване. Всички изменения или допълнения
            в Условията за ползване влизат незабавно, освен ако не е изрично
            друго упоменато от Разработчикът. <br />
            По своя преценка Разработчикът има право до уведомява всеки
            Потребител при промяна или допълнение на Условията за ползване.
            <br />
            В случай, че Потребител не е съгласен с промените или допълненията
            на Условията за ползване, то Потребителят има правото и следва да
            прекрати използването на Платформата. Като с прекратяването на
            използването на Платформата се прекратяват и взаимоотношенията с
            Разработчикът. В хипотезата по предходното изречение Потребителят
            няма право да изисква каквото и да е обезщетение от стана на
            Разработчикът.
          </p>
          <p>
            <b> Член 3</b>: Разработчикът не носи отговорност за прекратяване на
            предоставянето на услугите си при настъпване на обстоятелства не
            зависещи от него и извън неговия контрол - случаи на непреодолима
            сила, случайни събития, проблеми в глобалната интернет мрежа,
            действия или бездействия на трети лица и т.н.
          </p>
          <p>
            <b> Член 4</b>: Разработчикът не предоставя гаранция за използваните
            инструменти, документооборота или функционалности на Платформата. В
            хипотеза на предходното изречение Разработчикът не носи отговорност
            за вреди и отклонения произтичащи от тяхното използване.
          </p>
          <p>
            <b> Член 5</b>: Разработчикът не носи отговорност за данните в
            базата данни, когато Потребителят се предоставя достъп до
            Платформата с неговият Акаунт на трети лица достъп. В случай на
            установяване на не регламентиран достъп, Разработчикът не носи
            отговорност за липсваща или изтрита информация, документи или друго
            съдържание (доколкото не се дължи на негова вина). Потребителят носи
            отговорност за съхранението на пароли, опазване от нерегламентиран
            достъп, управлението на информация, документи или друго съдържание.
          </p>
          <p>
            <b> Член 6</b>: Разработчикът има правото по всяко време да добавя,
            премахва или променя функционалности на Платформата. Разработчикът
            може да прави модификации и обновяване на уеб-базираната система,
            без съгласието на Потребителят или предварително уведомление.
            Потребителят използва Платформата във вида, в който е налична,
            включително след съответните промени съгласно предходното изречение.
          </p>
          <p>
            <b> Член 7</b>: Разработчикът има право да прекрати достъпа, на
            даден Потребител при нарушение на което и да е условие от Условията
            за ползване с 7 дневно предизвестие или допълнително писмено
            договорено друго. В хипотезата по предходното изречение
            Разработчикът не дължи никакви обезщетения на заплатени/предплатени
            суми от страна на Потребителят, нито каквото и да е обезщетение на
            Потребителят.
          </p>
          <p>
            <b> Член 9</b>: Потребител може да е физическо лице или юридическо
            лице, което ще използва уеб-базирана платформа професионално
            качество и ще използва Платформата за извършване на търговска или
            професионална дейност. Платформата не е предназначен за потребители
            по смисъла на Закона за защита на потребителите, доколкото е
            изключително свързан с упражняването на търговска или професионална
            дейност.
          </p>
          <p>
            <b> Член 10</b>: Потребителят е длъжен да използва Платформата при
            строго спазване на Условията за ползване. Потребителят може да
            използва Платформата като се съобразява с всички функционалности и
            ограничения й. Потребителят няма право да използва платформата за
            противозаконни цели или са в противоречения с Условията на ползване
            или биха нанесли щети на Разработчикът.
          </p>
          <p>
            <b> Член 11</b>: Потребителят е длъжен да използва уеб-базираната
            система само и единствено по предназначение. Потребителят се
            задължава да не използва уеб-базираната платформа за извън обхвата
            й. Разработчикът има правото незабавно да прекрати достъпа до
            Платформата на Потребител, който нарушава Българското
            законодателство или се опитва да наруши целостта и функционалности
            на платформата, чрез допълнителни сорс кодове. Разработчикът има
            право, без предварително уведомление и без да носи отговорност за
            това, да архивира или изтрие информация, документи и/или всяко друго
            съдържание от базата данни на Платформата, които са в нарушение на
            Условията за ползване или Българското законодателство.
          </p>
          <p>
            <b> Член 12</b>: В случай , че Потребителят предостави своят Акаунт
            на трети лица, се задължава да осигури запознаване и спазване на
            Условията за ползване от всички лица и работата с Платформата.
          </p>
          <p>
            <b> Член 13</b>: По Закона за авторско право и сродните му права,
            Закона за марките и географските означения и останалите приложими
            нормативни актове е забранено материали, медийни файлове и други
            подобни, които са публикувани на уеб-базираната формата да бъдат
            копирани, разпространявани или предоставяни с каквото и да е цел без
            изричното съгласие на Разработчикът.
          </p>
          <p>
            <b> Член 14</b>: Чрез регистрацията си в уеб-базираната система,
            Разработчикът предоставя на Потребителя неизключително и срочно
            право на ползване на Платформа. Потребителят не придобива
            собственост и/или каквито и да е права на интелектуална собственост.
          </p>
          <ul>
            <li class="p-list">Регистрация</li>
          </ul>
          <p>
            За да ползвате уеб-базирана система е необходимо да се регистрирате,
            като попълните достъпната в реално време (on-line) електронна форма
            за регистрация на
            <a href="https://coherent-accounting.com/"
              >https://coherent-accounting.com/</a
            >
          </p>
          <p>
            <b> Член 15</b>: Потребителят е длъжен да предостави пълни и верни
            данни относно своята самоличност, или относно представляваното от
            Него юридическо лице, както и другите изискуеми от данни за
            регистрацията. Разработчикът не носи отговорност за актуализацията
            на данните в Акаунта на Потребителят.
          </p>
          <p>
            <b> Член 16</b>: Потребителят може да се регистрира само веднъж.
            Разработчикът забранява регистрацията под измислено име, чуждо име
            или изменено собствено име. При предоставяне на неверни данни или
            фалшиви, Разработчикът не носи отговорност и може незабавно да
            прекрати достъпа до Платформата.
          </p>
          <p>
            <b> Член 17</b>: При регистрацията Потребителят трябва да въведе
            e-mail и парола, които не са използвани при друга регистрация в
            Платформата. Чрез това e-mail и парола Потребителят се
            индивидуализира при използване на предоставяните услуги.
          </p>
          <p>
            <b> Член 18</b>: С отбелязване с отметка в полето „Съгласявам се
            Условия на Ползване ” , Потребителят декларира, че е запознат с
            Условията за ползване и ги приема изцяло. Със записването на
            изявлението по предходното изречение от Разработчикът, електронното
            изявление придобива и качеството на електронен документ по смисъла
            на Закона за електронния документ и електронните удостоверителни
            услуги.
          </p>
          <p>
            <b> Член 19</b>: Потребителят се съгласява и декларира, че ще
            предостави вярна, точна, актуална и пълна информация при попълване
            на регистрационната форма и последващото добавяне или промяна на
            данни в Акаунта си. Разработчикът запазва правото да може по всяко
            време да променя обема на изискваните данни за регистрация на
            Потребител. Също така да изисква допълване на такива данни в Акаунта
            на вече регистриран Потребител.
          </p>
          <p>
            <b> Член 20</b>: Разработчикът не се ангажира да проверява
            съдържанието на разположените на неговата платформа файлове и данни,
            си запазваме правото за премахване, деактивиране или заместване, без
            предупреждение, на файлове, които не съответстват на законовите
            разпоредби и на изискванията на тези Правила, както и на такива,
            които и биха могли по негова преценка да застрашат сигурността на
            сървърите и/или на съхраняваната на тях информация, ако той сметнем
            това за необходимо без задължителното да уведоми Потребителят. По
            преценка на Разработчика може да уведоми Потребителят, че ще бъдат
            предприети мерки.
          </p>
          <p>
            <b> Член 21</b>: След деклариране на Вашето съгласие с общите
            условия, на посочения от Потребителят електронен адрес ще бъдат
            изпратени данни за активиране на Регистрацията.
          </p>
          <p>
            <b> Член 22</b>: След активирането на акаунта се счита, че между
            Потребителят и Разработчикът е сключен договор.
          </p>
          <ul>
            <li class="p-list">Ограничаване на отговорността</li>
          </ul>
          <p>
            <b> Член 23</b>: Разработчикът не носи отговорност за претърпени
            вреди и пропуснати ползи, настъпили вследствие спирането,
            променянето или ограничаването на услугите, изтриването,
            модифицирането, загубването, недостоверността, неточността, или
            непълнотата на данни, материали или информация, пренасяни,
            използвани, записвани или станали достъпни чрез
            <a href="https://coherent-accounting.com/about"
              >https://coherent-accounting.com/about</a
            >
          </p>
          <p>
            <b> Член 24</b>: Разработчикът не носи отговорност за претърпени
            вреди и пропуснати ползи, настъпили вследствие достъп на трети лица
            Акаунта на Потребителят.
          </p>
          <p>
            <b> Член 25</b>: Разработчикът не носи отговорност за претърпени
            вреди и пропуснати ползи, настъпили вследствие на правилното
            използване на уеб-базирана платформа и не проверени данни от страна
            на Потребителят.
          </p>
          <ul>
            <li class="p-list">Други условия</li>
          </ul>
          <p>
            <b> Член 26</b>: Всички спорове, породени от публикуваните на
            платформата Условия за ползване или отнасящи се до тях, дори и
            споровете, породени или отнасящи се до тяхното тълкуване,
            недействителност, изпълнение или прекратяване, както и споровете за
            попълване на празноти или приспособяването на Условията за ползване
            към нововъзникнали обстоятелства, ще бъдат разрешавани спрямо
            Българското законодателство.
          </p>
          <p>
            <b> Член 27</b>: Условията за ползване публикувани на Платформата се
            уреждат от и тълкуват в съответствие с българското право. Всички
            други извъндоговорни задължения, породени от или във връзка с
            публикуваните Условията за ползване, се уреждат и тълкуват спрямо
            българското право. За всички неуредени от Условията за ползване
            въпроси се прилагат разпоредбите на българското право.
          </p>
          <p>
            <b> Член 28</b>: Разработчикът се старае и полага усилия за
            поддържане на актуална информация в уеб-базираната система.
            Разработчикът не може да гарантира или претендира за нейната
            изчерпателност и надеждност.
          </p>
          <p>
            <b> Член 29</b>: Разработчикът не гарантира свободният и непрекъснат
            достъп до Платформата, както и не гарантира, че Платформата е
            защитена от грешки по време на използването й.
          </p>
          <p>
            <b> Член 30</b>: Потребителят по отношение на Платформата комуникира
            с Разработчикът, както следва в писмена форма по електронна поща.
            Кореспонденция ще се счита за получена при писмено потвърждение от
            страна на Потребителят или Разработчикът. В случай, че не бъде
            получено потвърждение в рамките на 7 дни , кореспонденцията се
            приема за получена, освен ако на електронната поща на изпращача бъде
            получено съобщение, че писмото не е доставено до получателя поради
            технически причини.
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
