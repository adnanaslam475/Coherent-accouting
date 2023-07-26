<template>
  <section class="invoice-add-wrapper">
    <TabList />
    <!--  -->

    <validation-observer ref="invoiceEditForm" #default="{ invalid }">
      <b-form @submit.prevent="invoiceEdit(invoiceData, 'save', AccountTypeOption)">
        <b-row class="invoice-add">
          <!-- Col: Left (Invoice Container) -->
          <!-- template 05 -->

          <b-col cols="12" xl="10" md="10" v-if="invoiceData.templateId == '5' || invoiceData.templateId == ''">
            <b-card no-body class="invoice-add">
              <b-card-header class="justify-content-center">
                <div class="d-flex align-items-center mb-0">
                  <h4 class="title mr-1 mb-0">
                    {{ $t("add_invoice.invoice") }}
                  </h4>
                  <validation-provider #default="{ errors }" name="invoiceNumber" vid="Invoice" rules="required">
                    <b-input-group class="input-group-merge invoice-edit-input-group invoice-input-top">
                      <b-input-group-prepend is-text>
                        <feather-icon icon="HashIcon" />
                      </b-input-group-prepend>
                      <b-form-input id="invoice-data-id" v-model="invoiceData.invoiceNumber" />
                    </b-input-group>
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </div>
              </b-card-header>
            </b-card>

            <div>
              <!-- Account Type -->
              <div class="d-flex justify-content-between align-items-center mb-2 accountType">
                <!-- @change="scheduleTypeOptionToggle(scheduleOptionToggleValue)" 
                                -->

                <b-form-checkbox v-model="invoiceData.scheduled" class="custom-control-primary custom-switch-btn mr-2"
                  name="invoiceData.scheduled" switch>
                  <span class="switch-icon-left" style="width: 76px">{{ $t("add_invoice.scheduled") }}</span>
                  <span class="switch-icon-right" style="width: 76px">{{ $t("add_invoice.regular") }}</span>
                </b-form-checkbox>
                <b-card no-body class="invoice-preview date-issued mb-0 ml-0" v-if="invoiceData.scheduled">
                  <b-card-header class="justify-content-end">
                    <div class="mt-md-0 mt-2">
                      <div class="d-flex align-items-center mb-0">
                        <span class="title mr-1">
                          {{ $t("add_invoice.schedule_type") }}:
                        </span>
                        <validation-provider #default="{ errors }" name="scheduleType" rules="required">
                          <b-form-select v-model="invoiceData.cronScheduleApi.scheduleType"
                            @change="() => { companyIDisInvalid = false; }">
                            <b-form-select-option value="WEEKLY">{{ $t("add_invoice.WEEKLY") }}</b-form-select-option>
                            <b-form-select-option value="MONTHLY">{{ $t("add_invoice.MONTHLY") }}</b-form-select-option>
                          </b-form-select>
                          <small class="text-danger">{{ errors[0] }}</small>
                        </validation-provider>
                      </div>
                    </div>
                  </b-card-header>
                </b-card>
                <b-form-radio v-model="AccountTypeOption" plain name="accountTypeoptions" value="company" class="d-none">
                  <h5>{{ $t("add_invoice.company") }}</h5>
                </b-form-radio>
                <b-form-radio v-model="AccountTypeOption" plain name="accountTypeoptions" value="person" class="d-none">
                  <h5>{{ $t("add_invoice.person") }}</h5>
                </b-form-radio>
                <b-card no-body class="invoice-preview date-issued mb-0">
                  <b-card-header class="justify-content-end">
                    <div class="mt-md-0 mt-2">
                      <div class="d-flex align-items-center mb-0">
                        <span class="title mr-1">
                          {{ $t("add_invoice.due_date") }}:
                        </span>
                        <!-- <validation-provider #default="{ errors }" name="dueDate" rules="required"> -->
                        <flat-pickr v-model="invoiceData.dueDate"
                          class="form-control invoice-edit-input invoice-input-top" />
                        <feather-icon v-if="invoiceData.dueDate === ''" size="16" icon="CalendarIcon"
                          class="cursor-pointer clear-all" />
                        <feather-icon v-else size="16" icon="XIcon" class="cursor-pointer clear-all"
                          @click="invoiceData.dueDate = null" />
                        <!-- <small class="text-danger">{{ errors[0] }}</small>
                        </validation-provider> -->
                      </div>
                    </div>
                  </b-card-header>
                </b-card>
                <b-form-checkbox v-model="AccountTypeOptionToggleValue"
                  @change="AccountTypeOptionToggle(AccountTypeOptionToggleValue)"
                  class="custom-control-primary custom-switch-btn" name="AccountTypeOptionToggle" switch>
                  <span class="switch-icon-left">
                    {{ $t("add_invoice.person") }}
                  </span>
                  <span class="switch-icon-right">
                    {{ $t("add_invoice.company") }}
                  </span>
                </b-form-checkbox>
              </div>

              <!-- Schedule Type -->
              <div class="d-flex justify-content-between align-items-center mb-2 schedule-type"
                v-if='invoiceData.scheduled'>
                <b-card v-if="invoiceData.cronScheduleApi.scheduleType == 'MONTHLY'" no-body
                  class="invoice-preview date-issued mb-0 ml-0 mr-auto">
                  <b-card-header class="justify-content-end">
                    <div class="mt-md-0 mt-2">
                      <div class="d-flex align-items-center mb-0">
                        <span class="title mr-1">
                          {{ $t("add_invoice.select_date") }}:
                        </span>
                        <validation-provider #default="{ errors }" name="dayOfMonth" rules="required">
                          <b-form-select v-model="invoiceData.cronScheduleApi.dayOfMonth"
                            @change="() => { companyIDisInvalid = false; }" :options="dates">
                            <b-form-select-option :value="date.value" v-for="(date, index) in dates" :key="index">{{
                              date.text }}</b-form-select-option>
                          </b-form-select>
                          <small class="text-danger">{{ errors[0] }}</small>
                        </validation-provider>
                      </div>
                    </div>
                  </b-card-header>
                </b-card>
                <b-card v-if="invoiceData.cronScheduleApi.scheduleType == 'WEEKLY'" no-body
                  class="invoice-preview date-issued mb-0 ml-0 mr-auto">
                  <b-card-header class="justify-content-start">
                    <div class="w-100 mt-md-0 mt-2">
                      <div class="d-flex align-items-center mb-0">
                        <span class="title mr-1">
                          {{ $t("add_invoice.select_days") }}:
                        </span>
                        <!-- <validation-provider #default="{ errors }" name="dayOfWeek" rules="required"> -->
                        <div class="d-block">
                          <b-form-group class="d-flex w-100 mb-0" v-slot="{ ariaDescribedby }">
                            <b-form-radio-group v-model="invoiceData.cronScheduleApi.dayOfWeek"
                              @change="toggleDaySelected()" :options="days" class="d-flex"
                              :aria-describedby="ariaDescribedby">
                              <!-- <b-form-radio :value="day.value" v-for="(day, index) in days" :key="index">{{ day.text }}</b-form-radio> -->
                            </b-form-radio-group>
                          </b-form-group>
                          <small class="text-danger d-flex w-100 pl-1" v-if="isWeekSelected">The dayOfWeek field is
                            required</small>
                        </div>
                        <!-- <small class="text-danger">{{ errors[0] }}</small>
                        </validation-provider> -->
                      </div>
                    </div>
                  </b-card-header>
                </b-card>
              </div>
              <div
                class="d-flex justify-content-between flex-md-row flex-column invoice-spacing mt-0 gap-2 invoice-add-input invoice-input-middle mb-md-0">
                <div class="mt-md-0 mt-2 flex-1">
                  <b-card no-body class="invoice-add invoice-card" :style="isBlue === true
                    ? 'border: 1px solid #007aff !important'
                    : isGreen === true
                      ? 'border: 1px solid #8fce00 !important'
                      : isPurple === true
                        ? 'border: 1px solid #ad3978 !important'
                        : isOrange === true
                          ? 'border: 1px solid #FFA500 !important'
                          : 'border:1px solid #f6d1ff !important'
                    ">
                    <b-card-header class="justify-content-center invoice-header mb-1" :class="isBlue === true
                      ? 'tm_accent_bg'
                      : isGreen === true
                        ? 'green_bg'
                        : isPurple === true
                          ? 'purple_bg'
                          : isOrange === true
                            ? 'orange_bg'
                            : 'gray_bg'
                      ">
                      <h5 class="m-0" :style="isGray === true
                        ? 'color: black !important'
                        : 'color: white !important'
                        ">
                        {{ $t("add_invoice.supplier") }}
                      </h5>
                    </b-card-header>
                    <b-card-body class="invoice-body">
                      <div class="d-flex justify-content-end border-left py-50 px-25 clear-all-add">
                        <feather-icon size="16" icon="XIcon" class="cursor-pointer" @click="clearAll('supplier')" />
                      </div>
                      <div class="d-flex align-items-center mb-1">
                        <span class="title mr-1">{{ $t("companies.company_name") }}:
                        </span>
                        <b-input-group class="input-group invoice-edit-input-group">
                          <validation-provider #default="{ errors }" name="supplierCompanyName" rules="required">
                            <b-form-input v-model="invoiceData.supplierCompany.companName" @input="
                              SearchCompanyName(
                                invoiceData.supplierCompany.companName
                              )
                              " list="my-company_name" autocomplete="off" @blur="hideSuggestion()"
                              @focus="ShowSuggestion(datalist)" />
                            <b-list-group v-if="showSuggestions" id="my-company_name" class="input-suggesstions"
                              style="width: 100%">
                              <b-list-group-item v-for="data in datalist" :key="data.eic" @click="autoCompletefn(data)"
                                @mousedown="autoCompletefn(data)">
                                {{ data.company_name }}
                              </b-list-group-item>
                            </b-list-group>
                            <small class="text-danger">{{ errors[0] }}</small>
                          </validation-provider>
                        </b-input-group>
                      </div>
                      <div class="d-flex align-items-center mb-1">
                        <span class="title mr-1">
                          {{ $t("add_invoice.company_address") }}:
                        </span>

                        <b-input-group class="input-group invoice-edit-input-group">
                          <validation-provider #default="{ errors }" name="supplierCompanyAddress" rules="required">
                            <b-form-input v-model="invoiceData.supplierCompany.companyAddress
                              " autocomplete="off" />
                            <small class="text-danger">{{ errors[0] }}</small>
                          </validation-provider>
                        </b-input-group>
                      </div>
                      <div class="d-flex align-items-center mb-1">
                        <span class="title mr-1">
                          {{ $t("add_invoice.company_id_no") }}:
                        </span>
                        <b-input-group class="input-group invoice-edit-input-group">
                          <validation-provider #default="{ errors }" name="supplierCompanyIdNumber" rules="required">
                            <b-form-input v-model="invoiceData.supplierCompany.companyEic"
                              @input="SearchCompanyEic(invoiceData.supplierCompany.companyEic)" list="my-company_name"
                              autocomplete="off" @blur="hideSuggestionEic()" @focus="ShowSuggestionEic(datalistEic)"
                              @mousedown="() => { companyIDisInvalid = false; }" />
                            <b-list-group v-if="showSuggestionsEic" id="my-company_name" class="input-suggesstions"
                              style="width: 100%">
                              <b-list-group-item v-for="data in datalistEic" :key="data.eic"
                                @click="autoCompletefnEic(data)" @mousedown="autoCompletefnEic(data)">
                                {{ data.eic }}
                              </b-list-group-item>
                            </b-list-group>
                            <small class="text-danger">{{ errors[0] }}</small>
                            <small class="text-danger" v-if="companyIDisInvalid === true">{{
                              $t("add_invoice.PleaseEnterTheCompanyID") }}
                              {{ companyName }}
                            </small>
                          </validation-provider>
                        </b-input-group>
                      </div>
                      <div class="d-flex align-items-center mb-1">
                        <span class="title mr-1">{{ $t("add_invoice.company_owner") }}:
                        </span>
                        <b-input-group class="input-group invoice-edit-input-group">
                          <validation-provider #default="{ errors }" name="supplierCompanyOwner" rules="required">
                            <b-form-input v-model="invoiceData.supplierCompany.companyOwnerName
                              " autocomplete="off" />
                            <small class="text-danger">{{ errors[0] }}</small>
                          </validation-provider>
                        </b-input-group>
                      </div>
                      <div v-if="supplierVat" class="d-flex align-items-center mb-1">
                        <span class="title mr-1">
                          {{ $t("add_invoice.company_vat") }}:
                        </span>
                        <validation-provider #default="{ errors }" name="supplierVatNumber" rules="required">
                          <b-input-group class="input-group invoice-edit-input-group">
                            <b-form-input v-model="invoiceData.supplierCompany.companyVatEic
                              " autocomplete="off" />
                          </b-input-group>
                          <small class="text-danger">{{ errors[0] }}</small>
                        </validation-provider>
                      </div>
                      <div class="d-flex align-items-center mb-1">
                        <span class="mr-1"> {{ $t("add_invoice.vat") }}: </span>
                        <b-form-checkbox v-model="supplierVat" class="custom-control-primary custom-switch-btn-1"
                          name="check-button" switch>
                          <span class="switch-icon-left">
                            {{ $t("add_invoice.yes") }}
                          </span>
                          <span class="switch-icon-right">
                            {{ $t("add_invoice.no") }}
                          </span>
                        </b-form-checkbox>
                      </div>
                    </b-card-body>
                  </b-card>
                </div>
                <div>
                  <div @click="reverse" class="mb-2 reverse-button" style='cursor: pointer'>
                    <img src="@/assets/images/svg/repeat.svg" />
                  </div>
                </div>
                <div class="mt-md-0 mt-2 flex-1">
                  <b-card no-body class="invoice-add invoice-card" :style="isBlue === true
                    ? 'border: 1px solid #007aff !important'
                    : isGreen === true
                      ? 'border: 1px solid #8fce00 !important'
                      : isPurple === true
                        ? 'border: 1px solid #ad3978 !important'
                        : isOrange === true
                          ? 'border: 1px solid #FFA500 !important'
                          : 'border:1px solid #f6d1ff !important'
                    ">
                    <b-card-header class="justify-content-center invoice-header mb-1" :class="isBlue === true
                      ? 'tm_accent_bg'
                      : isGreen === true
                        ? 'green_bg'
                        : isPurple === true
                          ? 'purple_bg'
                          : isOrange === true
                            ? 'orange_bg'
                            : 'gray_bg'
                      ">
                      <h5 class="m-0" :style="isGray === true
                        ? 'color: black !important'
                        : 'color: white !important'
                        ">
                        {{ $t("add_invoice.recipient") }}
                      </h5>
                    </b-card-header>
                    <b-card-body class="invoice-body">
                      <div class="d-flex justify-content-end border-left py-50 px-25 clear-all-add">
                        <feather-icon size="16" icon="XIcon" class="cursor-pointer" @click="clearAll('recipient')" />
                      </div>
                      <div class="d-flex align-items-center mb-1">
                        <span v-if="AccountTypeOption == 'company'" class="title mr-1">{{ $t("companies.company_name")
                        }}:</span>
                        <span v-if="AccountTypeOption == 'person'" class="title mr-1">{{ $t("add_invoice.person_name")
                        }}:</span>
                        <b-input-group class="input-group invoice-edit-input-group">
                          <validation-provider #default="{ errors }" :name="AccountTypeOption == 'company'
                              ? 'recipientCompanyName'
                              : 'personName'
                            " rules="required">
                            <b-form-input v-if="AccountTypeOption == 'company'"
                              v-model="invoiceData.recipientCompany.companName" @input="
                                SearchCompanyNameRecipient(
                                  invoiceData.recipientCompany.companName
                                )
                                " list="my-company_name" autocomplete="off" @blur="hideSuggestionRecipient()"
                              @focus="ShowSuggestionRecipient(datalistRecipient)" />
                            <b-list-group v-if="showSuggestionsRecipient" id="my-company_name" class="input-suggesstions"
                              style="width: 100%">
                              <b-list-group-item button v-for="data in datalistRecipient" :key="data.eic"
                                @click="autoCompletefnRecipient(data)" @mousedown="autoCompletefnRecipient(data)">
                                {{ data.company_name }}
                              </b-list-group-item>
                            </b-list-group>
                            <b-form-input v-if="AccountTypeOption == 'person'"
                              v-model="invoiceData.recipientCompany.companyOwnerName"
                              @input="SearchCompanyPerson(invoiceData.recipientCompany.companyOwnerName)"
                              list="my-company_name" autocomplete="off" @blur="hideSuggestionPerson()"
                              @focus="ShowSuggestionPerson(datalistPerson)" />
                            <b-list-group v-if="showSuggestionsPerson" id="my-company_name" class="input-suggesstions"
                              style="width: 100%">
                              <b-list-group-item v-for="data in datalistPerson" :key="data.eic"
                                @click="autoCompletefnPerson(data)" @mousedown="autoCompletefnPerson(data)">
                                {{ data.firstMiddleAndLastName }}
                              </b-list-group-item>
                            </b-list-group>
                            <small class="text-danger">{{ errors[0] }}</small>
                          </validation-provider>
                        </b-input-group>
                      </div>
                      <div class="d-flex align-items-center mb-1">
                        <span class="title mr-1" v-if="AccountTypeOption == 'company'">{{
                          $t("add_invoice.company_address") }}:</span>
                        <span class="title mr-1" v-if="AccountTypeOption == 'person'">{{ $t("add_invoice.person_address")
                        }}:</span>
                        <b-input-group class="input-group invoice-edit-input-group">
                          <validation-provider #default="{ errors }" :name="AccountTypeOption == 'company'
                              ? 'recipientCompanyAddress'
                              : 'personAddress'
                            " rules="required">
                            <b-form-input v-model="invoiceData.recipientCompany.companyAddress
                              " autocomplete="off" />
                            <small class="text-danger">{{ errors[0] }}</small>
                          </validation-provider>
                        </b-input-group>
                      </div>
                      <div class="d-flex align-items-center mb-1">
                        <span class="title mr-1" v-if="AccountTypeOption == 'company'">{{ $t("add_invoice.company_id_no")
                        }}:</span>
                        <span class="title mr-1" v-if="AccountTypeOption == 'person'">{{ $t("add_invoice.person_id_no")
                        }}:</span>
                        <b-input-group class="input-group invoice-edit-input-group">
                          <validation-provider #default="{ errors }" :name="AccountTypeOption == 'company'
                              ? 'recipientCompanyIdNumber'
                              : 'personIdNumber'
                            " rules="required">
                            <b-form-input v-if="AccountTypeOption == 'company'"
                              v-model="invoiceData.recipientCompany.companyEic"
                              @input="SearchCompanyEicRecipient(invoiceData.recipientCompany.companyEic)"
                              list="my-company_name" autocomplete="off" @blur="hideSuggestionEicRecipient()"
                              @focus="ShowSuggestionEicRecipient(datalistEicRecipient)" />
                            <b-list-group v-if="showSuggestionsEicRecipient" id="my-company_name"
                              class="input-suggesstions" style="width: 100%">
                              <b-list-group-item v-for="data in datalistEicRecipient" :key="data.eic"
                                @click="autoCompletefnEicRecipient(data)" @mousedown="autoCompletefnEicRecipient(data)">
                                {{ data.eic }}
                              </b-list-group-item>
                            </b-list-group>

                            <b-form-input v-if="AccountTypeOption == 'person'"
                              v-model="invoiceData.recipientCompany.companyEic"
                              @input="SearchCompanyPersonIdNumber(invoiceData.recipientCompany.companyEic)"
                              list="my-company_name" autocomplete="off" @blur="hideSuggestionPersonIdNumber()"
                              @focus="ShowSuggestionPersonIdNumber(datalistPersonIdNumber)" />
                            <b-list-group v-if="showSuggestionsPersonIdNumber" id="my-company_name"
                              class="input-suggesstions" style="width: 100%">
                              <b-list-group-item v-for="data in datalistPersonIdNumber" :key="data.eic"
                                @click="autoCompletefnPersonIdNumber(data)"
                                @mousedown="autoCompletefnPersonIdNumber(data)">
                                {{ data.identificationNumber }}
                              </b-list-group-item>
                            </b-list-group>

                            <small class="text-danger">{{ errors[0] }}</small>
                          </validation-provider>
                        </b-input-group>
                      </div>
                      <div v-if="AccountTypeOption == 'company'" class="d-flex align-items-center mb-1">
                        <span class="title mr-1">{{ $t("add_invoice.company_owner") }}:
                        </span>
                        <b-input-group class="input-group invoice-edit-input-group">
                          <validation-provider #default="{ errors }" name="recipientCompanyOwner" :rules="AccountTypeOption == 'company' ? 'required' : ''
                            ">
                            <b-form-input v-model="invoiceData.recipientCompany.companyOwnerName
                              " autocomplete="off" />
                            <small class="text-danger">{{ errors[0] }}</small>
                          </validation-provider>
                        </b-input-group>
                      </div>
                      <div v-if="AccountTypeOption == 'company' && recipientVat" class="d-flex align-items-center mb-1">
                        <span class="title mr-1">
                          {{ $t("add_invoice.company_vat") }}:
                        </span>
                        <validation-provider #default="{ errors }" name="recipientVatNumber" rules="required">
                          <b-input-group class="input-group invoice-edit-input-group">
                            <b-form-input v-model="invoiceData.recipientCompany.companyVatEic
                              " autocomplete="off" />
                          </b-input-group>
                          <small class="text-danger">{{ errors[0] }}</small>
                        </validation-provider>
                      </div>
                      <div v-if="AccountTypeOption == 'company'" class="d-flex align-items-center mb-1">
                        <span class="mr-1"> {{ $t("add_invoice.vat") }}: </span>
                        <b-form-checkbox v-model="recipientVat" class="custom-control-primary custom-switch-btn-1"
                          name="check-button" switch>
                          <span class="switch-icon-left">
                            {{ $t("add_invoice.yes") }}
                          </span>
                          <span class="switch-icon-right">
                            {{ $t("add_invoice.no") }}
                          </span>
                        </b-form-checkbox>
                      </div>
                    </b-card-body>
                  </b-card>
                </div>
              </div>
            </div>
            <div class="d-flex justify-content-between align-items-center mb-2">
              <b-card no-body class="invoice-preview date-issued mb-0 ml-0">
                <b-card-header class="justify-content-end">
                  <div class="mt-md-0 mt-2">
                    <div class="d-flex align-items-center mb-0">
                      <span class="title mr-1">
                        {{ $t("company_invoices.transaction_type") }}:
                      </span>
                      <validation-provider #default="{ errors }" name="transectionType" rules="required">
                        <b-form-select v-model="invoiceData.transactionType" @change="() => {
                          companyIDisInvalid = false;
                        }
                          ">
                          <b-form-select-option value="EXPENSE">{{
                            $t("company_invoices.EXPENSE")
                          }}</b-form-select-option>
                          <b-form-select-option value="INCOME">{{
                            $t("company_invoices.INCOME")
                          }}</b-form-select-option>
                        </b-form-select>
                        <small class="text-danger">{{ errors[0] }}</small>
                      </validation-provider>
                    </div>
                  </div>
                </b-card-header>
              </b-card>
              <b-form-checkbox v-model="InvoiceTypeOptionToggleValue"
                @change="InvoiceTypeOptionToggle(InvoiceTypeOptionToggleValue)"
                class="custom-control-primary custom-switch-btn-2 flex-1 text-center" name="AccountTypeOptionToggle"
                switch>
                <span class="switch-icon-left text-uppercase">
                  {{ $t("add_invoice.PROFORMA") }}
                </span>
                <span class="switch-icon-right text-uppercase">
                  {{ $t("add_invoice.ORIGINAL") }}
                </span>
              </b-form-checkbox>
              <b-form-checkbox v-model="saleTypeOptionToggleValue"
                @change="saleTypeOptionToggle(saleTypeOptionToggleValue)"
                class="custom-control-primary custom-switch-btn-2 flex-1 text-center" name="AccountTypeOptionToggle"
                switch>
                <span class="switch-icon-left text-uppercase">
                  {{ $t("add_invoice.goods") }}
                </span>
                <span class="switch-icon-right text-uppercase">
                  {{ $t("add_invoice.service") }}
                </span>
              </b-form-checkbox>
              <b-card no-body class="invoice-preview date-issued mb-0">
                <b-card-header class="justify-content-end">
                  <div class="mt-md-0 mt-2">
                    <div class="d-flex align-items-center mb-0">
                      <span class="title mr-1">
                        {{ $t("add_invoice.date") }}:
                      </span>
                      <validation-provider #default="{ errors }" name="dateIssued" rules="required">
                        <flat-pickr v-model="invoiceData.dateIssued"
                          class="form-control invoice-edit-input invoice-input-top" />
                        <feather-icon v-if="invoiceData.dateIssued === ''" size="16" icon="CalendarIcon"
                          class="cursor-pointer clear-all" />
                        <feather-icon v-else size="16" icon="XIcon" class="cursor-pointer clear-all"
                          @click="invoiceData.dateIssued = ''" />
                        <small class="text-danger">{{ errors[0] }}</small>
                      </validation-provider>
                    </div>
                  </div>
                </b-card-header>
              </b-card>
            </div>
            <b-card no-body class="invoice-add-card mb-1">
              <!-- Items Section -->
              <b-card-body class="invoice-padding form-item-section p-0">
                <div ref="form" class="repeater-form h-auto border transaction-container border-1 border-primary"
                  :style="{ height: trHeight }">
                  <b-row ref="row" class="pb-0 m-0">
                    <!-- Item Form -->
                    <!-- ? This will be in loop => So consider below markup for single item -->
                    <b-col cols="12" class="p-0" :style="isBlue === true
                      ? 'border: 1px solid #007aff'
                      : isGreen === true
                        ? 'border: 1px solid #8fce00'
                        : isPurple === true
                          ? 'border: 1px solid #ad3978'
                          : isOrange === true
                            ? 'border: 1px solid #FFA500'
                            : 'border:1px solid #f6d1ff'
                      ">
                      <!-- ? Flex to keep separate width for XIcon and SettingsIcon -->
                      <div class="d-none d-lg-flex p-custom" :class="isBlue === true
                        ? 'tm_accent_bg'
                        : isGreen === true
                          ? 'green_bg'
                          : isPurple === true
                            ? 'purple_bg'
                            : isOrange === true
                              ? 'orange_bg'
                              : 'gray_bg'
                        " :style="isGray === true ? 'color: black !important' : 'color: white !important'">
                        <b-row class="flex-grow-1 px-1 invoice-add-transections">
                          <!-- Single Item Form Headers -->
                          <b-col cols="12" lg="1">
                            {{ $t("add_invoice.s_no") }}
                          </b-col>
                          <b-col cols="12" lg="4">
                            {{ $t("add_invoice.item_service") }}
                          </b-col>
                          <b-col cols="12" lg="1">
                            {{ $t("add_invoice.qty") }}
                          </b-col>
                          <b-col cols="12" lg="1">
                            {{ $t("add_invoice.measure") }}
                          </b-col>
                          <b-col cols="12" lg="2">
                            {{ $t("add_invoice.single_price") }}
                          </b-col>
                          <b-col cols="12" lg="1">
                            {{ $t("add_invoice.currency") }}
                          </b-col>
                          <b-col cols="12" lg="2">
                            {{ $t("add_invoice.total_price") }}
                          </b-col>
                        </b-row>
                        <div class="form-item-action-col" />
                      </div>

                      <!-- Form Input Fields OR content inside bordered area  -->
                      <!-- ? Flex to keep separate width for XIcon and SettingsIcon -->
                      <div v-for="(item, index) in invoiceData.transactions" :key="index" class="d-flex px-custom">
                        <b-row class="flex-grow-1 py-1 px-1 invoice-add-transections">
                          <!-- Single Item Form Headers -->
                          <b-col cols="12" lg="1">
                            <label class="d-inline d-lg-none">No.</label>

                            <b-form-input :value="index + 1" type="text" class="mb-0 text-left" disabled />
                          </b-col>

                          <b-col cols="12" lg="4">
                            <label class="d-inline d-lg-none">Item name or Service</label>
                            <validation-provider #default="{ errors }" name="transectionServiceOrItemDescription"
                              rules="required">
                              <b-form-input v-model="item.serviceOrItemDescription" :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'
                                " type="text" class="mb-0" />
                              <small class="text-danger">{{ errors[0] }}</small>
                            </validation-provider>
                          </b-col>
                          <b-col cols="12" lg="1">
                            <label class="d-inline d-lg-none">Qty</label>
                            <validation-provider #default="{ errors }" name="transectionQuantity" rules="required">
                              <b-form-input v-model="item.quantity" type="number" class="mb-0" placeholder="0"
                                step="0.0000000001" @input="populateValues()" />
                              <small class="text-danger">{{ errors[0] }}</small>
                            </validation-provider>
                          </b-col>
                          <b-col cols="12" lg="1">
                            <label class="d-inline d-lg-none">Measure</label>
                            <validation-provider #default="{ errors }" name="transectionMeasurement" rules="required">
                              <b-form-select v-model="item.measurement" type="text" class="mb-0"
                                :options="measureOptions" />
                              <small class="text-danger">{{ errors[0] }}</small>
                            </validation-provider>
                          </b-col>
                          <b-col cols="12" lg="2">
                            <label class="d-inline d-lg-none">Single Price</label>
                            <validation-provider #default="{ errors }" name="transectionSingleAmountTransaction"
                              rules="required|singlePriceValid">
                              <b-input-group class="input-group-merge invoice-edit-input-group">
                                <b-input-group-prepend is-text class="mb-0">
                                  <span>{{ invoiceData.currency }}</span>
                                </b-input-group-prepend>

                                <b-form-input v-model="item.singleAmountTransaction" type="number" class="mb-0" step="any"
                                  placeholder="0.00" @input="populateValues()" />
                              </b-input-group>
                              <small class="text-danger">{{ errors[0] }}</small>
                            </validation-provider>
                          </b-col>
                          <b-col cols="12" lg="1">
                            <label class="d-inline d-lg-none">Currency</label>
                            <validation-provider #default="{ errors }" name="transectionCurrency" rules="required">
                              <b-form-select v-model="invoiceData.currency" :options="currencyOptions">
                              </b-form-select>
                              <small class="text-danger">{{ errors[0] }}</small>
                            </validation-provider>
                          </b-col>
                          <b-col cols="12" lg="2">
                            <label class="d-inline d-lg-none">Total Price</label>
                            <validation-provider #default="{ errors }" name="transectionTotal" rules="required">
                              <b-input-group class="input-group-merge invoice-edit-input-group">
                                <b-input-group-prepend is-text class="mb-0">
                                  <span>{{ invoiceData.currency }}</span>
                                </b-input-group-prepend>

                                <!-- <b-form-input
                                  :value="(item.singleAmountTransaction * item.quantity).toFixed(2)"
                                  disabled
                                  class="mb-0"
                                /> -->
                                <b-form-input :value="(
                                  parseFloat(item.singleAmountTransaction) *
                                  parseFloat(item.quantity)
                                ).toFixed(2)
                                  " disabled class="mb-0" />
                              </b-input-group>
                              <small class="text-danger">{{ errors[0] }}</small>
                            </validation-provider>
                          </b-col>
                        </b-row>
                        <div class="d-flex justify-content-center py-50 px-25 position-relative top-custom">
                          <feather-icon v-if="invoiceData.transactions.length !== 1" size="16" icon="Trash2Icon"
                            class="cursor-pointer" @click="removeItem(index)" />
                          <feather-icon v-if="invoiceData.transactions.length == 1" size="16" icon="Trash2Icon"
                            class="cursor-pointer invisible" />
                        </div>
                      </div>
                    </b-col>
                  </b-row>
                </div>
              </b-card-body>
            </b-card>
            <b-button v-ripple.400="'rgba(255, 255, 255, 0.15)'" size="sm" @click="addNewItemInItemForm" class="mb-2"
              :style="isBlue === true
                ? 'background-color: #007aff !important; color: white !important'
                : isGreen === true
                  ? 'background-color: #8fce00 !important; color: white !important'
                  : isPurple === true
                    ? 'background-color: #ad3978 !important; color: white !important'
                    : isOrange === true
                      ? 'background-color: #FFA500 !important; color: white !important'
                      : 'background-color: #f6d1ff !important; color: black !important'
                ">
              {{ $t("add_invoice.add_item") }}
            </b-button>

            <b-card no-body class="invoice-add-card mb-1">
              <b-card-body class="invoice-padding form-item-section p-0">
                <b-row class="pb-0 m-0 transaction-container" :style="isBlue === true
                  ? 'border: 1px solid #007aff'
                  : isGreen === true
                    ? 'border: 1px solid #8fce00'
                    : isPurple === true
                      ? 'border: 1px solid #ad3978'
                      : isOrange === true
                        ? 'border: 1px solid #FFA500'
                        : 'border:1px solid #f6d1ff'
                  ">
                  <!-- Col: Sales Persion -->
                  <b-col cols="12" class="border border-0 row m-0 py-2">
                    <b-col cols="12" md="7" class="mt-md-6 d-flex" order="2" order-md="1">
                      <h1 class="invoiceTypeHeading text-uppercase">
                        {{ $t("add_invoice." + invoiceData.invoiceType) }}
                      </h1>
                    </b-col>

                    <!-- Col: Total -->
                    <b-col cols="12" md="5" class="mt-md-6 d-flex justify-content-end" order="1" order-md="2">
                      <div class="invoice-total-wrapper">
                        <div class="invoice-total-item">
                          <p class="invoice-total-title">
                            {{ $t("add_invoice.total_price_non_vat") }}:
                          </p>
                          <p class="invoice-total-amount">
                            <validation-provider #default="{ errors }" name="amountNonVat" rules="required">
                              <b-input-group class="input-group-merge invoice-edit-input-group">
                                <b-input-group-prepend is-text>
                                  <span>{{ invoiceData.currency }}</span>
                                </b-input-group-prepend>

                                <b-form-input v-model="invoiceData.amountNonVat" disabled />
                              </b-input-group>
                              <small class="text-danger">{{ errors[0] }}</small>
                            </validation-provider>
                          </p>
                        </div>
                        <div class="invoice-total-item">
                          <p class="invoice-total-title">
                            {{ $t("add_invoice.vat") }}:
                          </p>
                          <p class="invoice-total-amount">
                            <validation-provider #default="{ errors }" name="vat" ref="vatPercent">
                              <b-input-group class="input-group-merge invoice-edit-input-group">
                                <b-form-input v-model="invoiceData.vatPercent" step="any" type="number" class="text-right"
                                  @input="populateValues()" />

                                <b-input-group-append is-text>
                                  <span>%</span>
                                </b-input-group-append>
                              </b-input-group>
                              <small class="text-danger">{{ errors[0] }}</small>
                            </validation-provider>
                          </p>
                        </div>
                        <div class="invoice-total-item">
                          <p class="invoice-total-title">
                            {{ $t("company_invoices.vat_amount") }}:
                          </p>
                          <p class="invoice-total-amount">
                            <validation-provider #default="{ errors }" name="vatPercent" rules="required">
                              <b-input-group class="input-group-merge invoice-edit-input-group">
                                <b-input-group-prepend is-text>
                                  <span>{{ invoiceData.currency }}</span>
                                </b-input-group-prepend>

                                <b-form-input v-model="invoiceData.vatAmount" type="number" disabled />
                              </b-input-group>
                              <small class="text-danger">{{ errors[0] }}</small>
                            </validation-provider>
                          </p>
                        </div>
                        <div class="invoice-total-item">
                          <p class="invoice-total-title">
                            {{ $t("add_invoice.discount_percent") }}:
                          </p>
                          <p class="invoice-total-amount">
                            <validation-provider #default="{ errors }" name="tradeDiscountPercent" rules="required">
                              <b-input-group class="input-group-merge invoice-edit-input-group">
                                <b-form-input v-model="invoiceData.tradeDiscountPercent" step="any" type="number"
                                  class="text-right" @input="populateValues()" />

                                <b-input-group-append is-text>
                                  <span>%</span>
                                </b-input-group-append>
                              </b-input-group>
                              <small class="text-danger">{{ errors[0] }}</small>
                            </validation-provider>
                          </p>
                        </div>
                        <div class="invoice-total-item">
                          <p class="invoice-total-title">
                            {{ $t("add_invoice.discount_sum") }}:
                          </p>
                          <p class="invoice-total-amount">
                            <validation-provider #default="{ errors }" name="tradeDiscountAmount">
                              <b-input-group class="input-group-merge invoice-edit-input-group">
                                <b-input-group-prepend is-text>
                                  <span>{{ invoiceData.currency }}</span>
                                </b-input-group-prepend>

                                <!-- <b-form-input
                                  :value="
                                    tradeDiscountAmount(
                                      invoiceData.transactions,
                                      invoiceData.vatPercent,
                                      invoiceData.tradeDiscountPercent
                                    )
                                      ? tradeDiscountAmount(
                                          invoiceData.transactions,
                                          invoiceData.vatPercent,
                                          invoiceData.tradeDiscountPercent
                                        )
                                      : 0
                                  "
                                  disabled
                                /> -->
                                <b-form-input v-model="invoiceData.tradeDiscountAmount" disabled />
                              </b-input-group>
                              <small class="text-danger">{{ errors[0] }}</small>
                            </validation-provider>
                          </p>
                        </div>
                        <div class="invoice-total-item">
                          <p class="invoice-total-title font-weight-bolder custom-font">
                            {{ $t("add_invoice.total_price") }}:
                          </p>
                          <p class="invoice-total-amount">
                            <validation-provider #default="{ errors }" name="totalPrice" rules="required">
                              <b-input-group class="input-group-merge invoice-edit-input-group">
                                <b-input-group-prepend is-text>
                                  <span>{{ invoiceData.currency }}</span>
                                </b-input-group-prepend>

                                <!-- <b-form-input
                                  :value="
                                    totalPrice(
                                      invoiceData.transactions,
                                      invoiceData.vatPercent,
                                      invoiceData.tradeDiscountPercent
                                    )
                                      ? totalPrice(
                                          invoiceData.transactions,
                                          invoiceData.vatPercent,
                                          invoiceData.tradeDiscountPercent
                                        )
                                      : 0
                                  "
                                  disabled
                                  class="opacity-1 font-weight-bolder custom-font"
                                /> -->
                                <b-form-input v-model="invoiceData.totalAmount" disabled
                                  class="opacity-1 font-weight-bolder custom-font" />
                              </b-input-group>
                              <small class="text-danger">{{ errors[0] }}</small>
                            </validation-provider>
                          </p>
                        </div>
                      </div>
                    </b-col>
                  </b-col>
                </b-row>
              </b-card-body>
            </b-card>

            <!-- Bank Details Switch -->
            <b-row>
              <b-col>
                <b-col>
                  <b-form-select v-model="bankProcess" :options="banks" id="invoice-bank" name="invoice-bank"
                    v-bind:placeholder="$t('Please select bank...')" :value="$store.state.selected"
                    @change="checkProcessType(bankProcess)">

                  </b-form-select>
                </b-col>
              </b-col>
            </b-row>

            <!-- Bank Details -->
            <b-card no-body class="invoice-add-card mb-1 mt-1" v-if="isBank">
              <b-card-body class="invoice-padding form-item-section p-2 border border-1 border-primary rounded">
                <div>
                  <b-form-row>
                    <!-- Bank name -->

                    <b-col>
                      <span>{{ $t("add_invoice.bank") }}: </span>
                      <validation-provider #default="{ errors }" name="bank" rules="required">
                        <b-form-input v-model="invoiceData.bankApi.name" id="invoice-bank" name="invoice-bank"
                          v-bind:placeholder="$t('Please select bank...')" :value="$store.state.selected">

                        </b-form-input>
                        <small class="text-danger">{{ errors[0] }}</small>
                      </validation-provider>
                    </b-col>
                    <!-- bic  -->
                    <b-col>
                      <b-form-group id="input-group-1" label="BIC" label-for="BIC">
                        <validation-provider #default="{ errors }" name="BIC" rules="required">
                          <b-form-input id="invoice-bic" v-model="invoiceData.bankApi.bic"
                            :state="errors.length > 0 ? false : null" placeholder="BIC..."
                            style="background: #fcfcfc; height: 34px" />
                          <small class="text-danger">{{ errors[0] }}</small>
                        </validation-provider>
                      </b-form-group>
                    </b-col>
                    <!-- iban -->
                    <b-col>
                      <b-form-group id="input-group-1" label="IBAN" label-for="IBAN">
                        <validation-provider #default="{ errors }" name="IBAN" rules="required">
                          <b-form-input id="ivvoice-iban" v-model="invoiceData.bankApi.iban"
                            :state="errors.length > 0 ? false : null" placeholder="IBAN..."
                            style="background: #fcfcfc; height: 34px" />
                          <small class="text-danger">{{ errors[0] }}</small>
                        </validation-provider>
                      </b-form-group>
                    </b-col>
                  </b-form-row>
                </div>
              </b-card-body>
            </b-card>

            <b-row v-if="companyName.companyVatNumber == null || companyName.companyVatNumber == ''" class="mt-2">

              <b-col>
                <b-card no-body class="">
                  <b-card-body class="invoice-padding form-item-section p-2 rounded">
                    <b-form-group id="input-group-4" :label="$t('add_invoice.taxExclusive')" label-for="non-vat-clause">

                      <validation-provider #default="{ errors }" name="non-vat-clause" rules="required">
                        <v-select v-model="invoiceData.vatCondition" :options="noVatClause" id="non-vat-clause"
                          name="non-vat-clause" v-bind:placeholder="$t('Please select non-vat clause..')
                            " :value="$store.state.selected" @input="selectVatClause()">
                          <template #selected-option="option" v-if="clauseToSend != ''">

                            <div style="
                                display: flex;
                                align-items: center;
                                justify-content: left;
                                grid-gap: 8px;
                              ">
                              {{ clauseToSend }}
                            </div>
                          </template>
                          <template #selected-option="option" v-else>
                            <div style="
                                display: flex;
                                align-items: center;
                                justify-content: left;
                                grid-gap: 8px;
                              ">
                              {{ option.label }}
                            </div>
                          </template>

                          <template v-slot:option="option">
                            <span style="
                                display: flex;
                                align-items: center;
                                justify-content: left;
                                grid-gap: 8px;
                              ">
                              {{ option.label }}
                            </span>
                          </template>
                          <!-- <template #selected-option="option" v-if="clauseToSend !== ''">

                            <div style="
                                display: flex;
                                align-items: center;
                                justify-content: left;
                                grid-gap: 8px;
                              ">
                              {{ clauseToSend }}
                            </div>
                          </template>
                          <template #selected-option="option" v-else>

                            <div style="
                                display: flex;
                                align-items: center;
                                justify-content: left;
                                grid-gap: 8px;
                              ">
                              {{ option }}
                            </div>
                          </template>

                          <template v-slot:option="option">
                            <span style="
                                display: flex;
                                align-items: center;
                                justify-content: left;
                                grid-gap: 8px;
                              ">
                              {{ option }}
                            </span>
                          </template> -->
                        </v-select>
                        <small class="text-danger">{{ errors[0] }}</small>
                      </validation-provider>
                    </b-form-group>
                  </b-card-body>
                </b-card>
              </b-col>
              <b-col> </b-col>
              <b-col> </b-col>
            </b-row>
          </b-col>

          <!-- template 01 -->
          <b-col cols="12" xl="10" md="10" v-if="invoiceData.templateId == '1'">
            <div class="tm_container">
              <div class="tm_invoice_wrap">
                <div class="tm_invoice tm_style1" id="tm_download_section">
                  <div class="tm_invoice_in">
                    <div class="tm_invoice_head tm_align_center tm_mb20">
                      <div class="tm_invoice_left">
                        <div class="tm_logo">
                          <div>

                            <b-img :src="logoToUpload" fluid class="mr-1" style="
                                width: 80px;
                                height: 80px;
                                border: 1px solid black;
                              " v-if="showLogo" />
                            <feather-icon v-if="showLogo" size="16" icon="XSquareIcon" color="red" class="cursor-pointer"
                              style="position: absolute; left: 70px; top: -7px" @click="() => {
                                showLogo = false;
                                logoToUpload = '';
                                isUploading = i18n.tc(
                                  'add_invoice.upload_logo'
                                );
                                invoiceData.logoId = '';
                              }
                                " />
                            <span>
                              <label for="invoiceLogo1">
                                <div style="
                                    background-color: #f5f6fa;
                                    border: 1px solid grey;
                                    padding: 10px;
                                    border-radius: 30px;
                                    font-weight: 700;
                                    color: black;
                                    cursor: pointer;
                                  ">
                                  {{ isUploading }}
                                </div>
                              </label>
                              <input type="file" name="invoiceLogo1" id="invoiceLogo1"
                                style="display: none; visibility: none" @change="updateLogo" accept="image/*" />
                            </span>
                          </div>
                        </div>
                      </div>
                      <div class="tm_invoice_right tm_text_right">
                        <div class="tm_primary_color tm_f50 tm_text_uppercase">
                          {{ $t("add_invoice.invoice") }}
                        </div>
                      </div>
                    </div>
                    <div class="tm_invoice_info tm_mb20">
                      <div class="tm_invoice_seperator tm_gray_bg"></div>
                      <div class="tm_invoice_info_list">
                        <p class="tm_invoice_number tm_m0">
                          <!-- Invoice No: -->
                          {{ $t("add_invoice.invoice") }}:
                          <span><validation-provider #default="{ errors }" name="invoiceNumber" vid="Invoice"
                              rules="required">
                              <b-input-group class="input-group-merge invoice-edit-input-group invoice-input-top">
                                <b-input-group-prepend is-text>
                                  <feather-icon icon="HashIcon" />
                                </b-input-group-prepend>

                                <b-form-input id="invoice-data-id" v-model="invoiceData.invoiceNumber" />
                              </b-input-group>
                              <small class="text-danger">{{ errors[0] }}</small>
                            </validation-provider>
                          </span>
                        </p>
                        <div class=" mb-0">
                          <span>
                            {{ $t("add_invoice.due_date") }}:
                          </span>
                          <!-- <validation-provider #default="{ errors }" name="dueDate" rules="required"> -->
                          <flat-pickr v-model="invoiceData.dueDate"
                            class="form-control invoice-edit-input invoice-input-top" />
                          <feather-icon v-if="invoiceData.dueDate === ''" size="16" icon="CalendarIcon"
                            class="cursor-pointer" style="position: relative; bottom: 31px; left: 188px;" />
                          <feather-icon v-else size="16" icon="XIcon" class="cursor-pointer "
                            style="position: relative; bottom: 31px; left: 188px;" @click="invoiceData.dueDate = ''" />
                          <!-- <small class="text-danger">{{ errors[0] }}</small>
                        </validation-provider> -->
                        </div>
                        <div class="mb-0">
                          <!-- Date: -->
                          <span>{{ $t("add_invoice.date") }}:</span>

                          <span>
                            <validation-provider #default="{ errors }" name="dateIssued" rules="required">
                              <flat-pickr v-model="invoiceData.dateIssued"
                                class="form-control invoice-edit-input invoice-input-top" />
                              <feather-icon v-if="invoiceData.dateIssued === ''" size="16" icon="CalendarIcon"
                                class="cursor-pointer" style="position: relative; bottom: 31px; left: 188px;" />
                              <feather-icon v-else size="16" icon="XIcon" class="cursor-pointer"
                                @click="invoiceData.dateIssued = ''"
                                style="position: relative; bottom: 31px; left: 188px;" />
                              <small class="text-danger">{{ errors[0] }}</small>
                            </validation-provider>
                          </span>
                        </div>
                      </div>
                    </div>

                    <!-- Person/Company Switch -->

                    <!-- Account Type -->
                    <div class="d-flex justify-content-between align-items-center mb-2 accountType">
                      <!-- @change="scheduleTypeOptionToggle(scheduleOptionToggleValue)"                 -->
                      <b-form-checkbox v-model="invoiceData.scheduled"
                        class="custom-control-primary custom-switch-btn mr-2" name="invoiceData.scheduled" switch>
                        <span class="switch-icon-left" style="width: 76px">{{ $t("add_invoice.scheduled") }}</span>
                        <span class="switch-icon-right" style="width: 76px">{{ $t("add_invoice.regular") }}</span>
                      </b-form-checkbox>
                      <b-card no-body class="invoice-preview date-issued mb-0 ml-0"
                        v-if="disabled = invoiceData.scheduled" style="width: 27%;">
                        <b-card-header class="justify-content-end">
                          <div class="mt-md-0 mt-2">
                            <div class="d-flex align-items-center mb-0">
                              <span class="title mr-1">
                                {{ $t("add_invoice.schedule_type") }}:
                              </span>
                              <validation-provider #default="{ errors }" name="scheduleType" rules="required">
                                <b-form-select :disabled="!invoiceData.scheduled"
                                  v-model="invoiceData.cronScheduleApi.scheduleType"
                                  @change="() => { companyIDisInvalid = false; }">
                                  <b-form-select-option value="WEEKLY">{{ $t("add_invoice.WEEKLY")
                                  }}</b-form-select-option>
                                  <b-form-select-option value="MONTHLY">{{ $t("add_invoice.MONTHLY")
                                  }}</b-form-select-option>
                                </b-form-select>
                                <small class="text-danger">{{ errors[0] }}</small>
                              </validation-provider>
                            </div>
                          </div>
                        </b-card-header>
                      </b-card>
                      <b-form-radio v-model="AccountTypeOption" plain name="accountTypeoptions" value="company"
                        class="d-none">
                        <h5>{{ $t("add_invoice.company") }}</h5>
                      </b-form-radio>
                      <b-form-radio v-model="AccountTypeOption" plain name="accountTypeoptions" value="person"
                        class="d-none">
                        <h5>{{ $t("add_invoice.person") }}</h5>
                      </b-form-radio>

                      <b-form-checkbox v-model="AccountTypeOptionToggleValue"
                        @change="AccountTypeOptionToggle(AccountTypeOptionToggleValue)"
                        class="custom-control-primary custom-switch-btn" name="AccountTypeOptionToggle" switch>
                        <span class="switch-icon-left">
                          {{ $t("add_invoice.person") }}
                        </span>
                        <span class="switch-icon-right">
                          {{ $t("add_invoice.company") }}
                        </span>
                      </b-form-checkbox>
                    </div>

                    <!-- Schedule Type -->
                    <div class="d-flex justify-content-between align-items-center mb-2 schedule-type"
                      v-if='invoiceData.scheduled'>
                      <b-card v-if="invoiceData.cronScheduleApi.scheduleType == 'MONTHLY'" no-body
                        class="invoice-preview date-issued mb-0 ml-0 mr-auto">
                        <b-card-header class="justify-content-end">
                          <div class="mt-md-0 mt-2">
                            <div class="d-flex align-items-center mb-0">
                              <span class="title mr-1">
                                {{ $t("add_invoice.select_date") }}:
                              </span>
                              <validation-provider #default="{ errors }" name="dayOfMonth" rules="required">
                                <b-form-select v-model="invoiceData.cronScheduleApi.dayOfMonth"
                                  @change="() => { companyIDisInvalid = false; }" :options="dates">
                                  <b-form-select-option :value="date.value" v-for="(date, index) in dates" :key="index">{{
                                    date.text }}</b-form-select-option>
                                </b-form-select>
                                <small class="text-danger">{{ errors[0] }}</small>
                              </validation-provider>
                            </div>
                          </div>
                        </b-card-header>
                      </b-card>
                      <b-card v-if="invoiceData.cronScheduleApi.scheduleType == 'WEEKLY'" no-body
                        class="invoice-preview date-issued mb-0 ml-0 mr-auto">
                        <b-card-header class="justify-content-start">
                          <div class="w-100 mt-md-0 mt-2">
                            <div class="d-flex align-items-center mb-0">
                              <span class="title mr-1">
                                {{ $t("add_invoice.select_days") }}:
                              </span>
                              <!-- <validation-provider #default="{ errors }" name="dayOfWeek" rules="required"> -->
                              <div class="d-block">
                                <b-form-group class="d-flex w-100 mb-0" v-slot="{ ariaDescribedby }">
                                  <b-form-radio-group v-model="invoiceData.cronScheduleApi.dayOfWeek"
                                    @change="toggleDaySelected()" :options="days" class="d-flex"
                                    :aria-describedby="ariaDescribedby">
                                    <!-- <b-form-radio :value="day.value" v-for="(day, index) in days" :key="index">{{ day.text }}</b-form-radio> -->
                                  </b-form-radio-group>
                                </b-form-group>
                                <small class="text-danger d-flex w-100 pl-1" v-if="daySelected">The dayOfWeek field is
                                  required</small>
                              </div>
                              <!-- <small class="text-danger">{{ errors[0] }}</small>
                        </validation-provider> -->
                            </div>
                          </div>
                        </b-card-header>
                      </b-card>
                    </div>

                    <div class="tm_invoice_head tm_mb10">
                      <!-- Supplier -->
                      <div class="tm_invoice_left" style="width: 44%">
                        <h6 class="tm_mb2">
                          <b class="tm_primary_color">
                            {{ $t("add_invoice.supplier") }}:</b>
                        </h6>

                        <validation-provider #default="{ errors }" name="supplierCompanyIdNumber" rules="required">
                          <b-form-input v-model="invoiceData.supplierCompany.companyEic"
                            @input="SearchCompanyEic(invoiceData.supplierCompany.companyEic)" list="my-company_name"
                            autocomplete="off" @blur="hideSuggestionEic()" @focus="ShowSuggestionEic(datalistEic)"
                            @mousedown="() => { companyIDisInvalid = false; }" style="margin-bottom: 5px" />
                          <b-list-group v-if="showSuggestionsEic" id="my-company_name" class="input-suggesstions">
                            <b-list-group-item v-for="data in datalistEic" :key="data.eic"
                              @click="autoCompletefnEic(data)" @mousedown="autoCompletefnEic(data)">
                              {{ data.eic }}
                            </b-list-group-item>
                          </b-list-group>
                          <small class="text-danger">{{ errors[0] }}</small>
                          <small class="text-danger" v-if="companyIDisInvalid === true">{{
                            $t("add_invoice.PleaseEnterTheCompanyID") }} {{
    companyName }}
                          </small>
                        </validation-provider>

                        <validation-provider #default="{ errors }" name="supplierCompanyOwner" rules="required">
                          <b-form-input v-model="invoiceData.supplierCompany.companyOwnerName
                            " autocomplete="off" style="margin-bottom: 5px"
                            :placeholder="$t('add_invoice.SupplierCompanyOwnerName')" />
                          <small class="text-danger">{{ errors[0] }}</small>
                        </validation-provider>

                        <validation-provider #default="{ errors }" name="supplierCompanyName" rules="required">
                          <b-form-input v-model="invoiceData.supplierCompany.companName"
                            :placeholder="$t('add_invoice.SupplierCompanyName')" @input="
                              SearchCompanyName(
                                invoiceData.supplierCompany.companName
                              )
                              " list="my-company_name" autocomplete="off" @blur="hideSuggestion()"
                            @focus="ShowSuggestion(datalist)" style="margin-bottom: 5px" />
                          <b-list-group v-if="showSuggestions" id="my-company_name" class="input-suggesstions"
                            style="width: 47%">
                            <b-list-group-item v-for="data in datalist" :key="data.eic" @click="autoCompletefn(data)"
                              @mousedown="autoCompletefn(data)">
                              {{ data.company_name }}
                            </b-list-group-item>
                          </b-list-group>
                          <small class="text-danger">{{ errors[0] }}</small>
                        </validation-provider>

                        <validation-provider #default="{ errors }" name="supplierCompanyAddress" rules="required">
                          <b-form-input v-model="invoiceData.supplierCompany.companyAddress" autocomplete="off"
                            :placeholder="$t('add_invoice.SupplierCompanyAddress')" style="margin-bottom: 5px" />
                          <small class="text-danger">{{ errors[0] }}</small>
                        </validation-provider>
                        <div v-if="supplierVat">
                          <validation-provider #default="{ errors }" name="supplierVatNumber" rules="required">
                            <b-input-group class="input-group invoice-edit-input-group">
                              <b-form-input v-model="invoiceData.supplierCompany.companyVatEic
                                " autocomplete="off" style="margin-bottom: 5px" />
                            </b-input-group>
                            <small class="text-danger">{{ errors[0] }}</small>
                          </validation-provider>
                        </div>

                        <b-form-checkbox v-model="supplierVat" class="custom-control-primary custom-switch-btn-2"
                          name="check-button" switch>
                          <span class="switch-icon-left text-uppercase">
                            {{ $t("add_invoice.vat") }}</span>
                          <span class="switch-icon-right text-uppercase">
                            {{ $t("add_invoice.no_vat") }}
                          </span>
                        </b-form-checkbox>
                      </div>
                      <div style="width: 12%">

                        <div @click="reverse" class="reverse-button"
                          style="margin-left: 25px; position: relative; top: 27%; cursor: pointer">
                          <img src="@/assets/images/svg/repeat.svg" />
                        </div>

                      </div>
                      <!-- Recipient -->
                      <div class="tm_invoice_right tm_text_right" style="width: 44%">
                        <h6 class="tm_mb2">
                          <b class="tm_primary_color" style="margin-left: 3px">
                            {{ $t("add_invoice.recipient") }}:</b>
                        </h6>

                        <!-- Company/Person Identification-->
                        <validation-provider #default="{ errors }" :name="AccountTypeOption == 'company'
                          ? 'recipientCompanyIdNumber'
                          : 'personIdNumber'
                          " rules="required">
                          <b-form-input v-if="AccountTypeOption == 'company'"
                            v-model="invoiceData.recipientCompany.companyEic" @input="
                              SearchCompanyEicRecipient(
                                invoiceData.recipientCompany.companyEic
                              )
                              " list="my-company_name" autocomplete="off" @blur="hideSuggestionEicRecipient()" @focus="
    ShowSuggestionEicRecipient(datalistEicRecipient)
    " style="margin-bottom: 5px" :placeholder="$t('add_invoice.RecipientCompanyIDNumber')" />
                          <b-list-group v-if="showSuggestionsEicRecipient" id="my-company_name"
                            class="input-suggesstions">
                            <b-list-group-item v-for="data in datalistEicRecipient" :key="data.eic"
                              @click="autoCompletefnEicRecipient(data)" @mousedown="autoCompletefnEicRecipient(data)">
                              {{ data.eic }}
                            </b-list-group-item>
                          </b-list-group>

                          <b-form-input v-if="AccountTypeOption == 'person'"
                            v-model="invoiceData.recipientCompany.companyEic" @input="
                              SearchCompanyPersonIdNumber(
                                invoiceData.recipientCompany.companyEic
                              )
                              " list="my-company_name" autocomplete="off" @blur="hideSuggestionPersonIdNumber()"
                            @focus="
                              ShowSuggestionPersonIdNumber(
                                datalistPersonIdNumber
                              )
                              " style="margin-bottom: 5px" :placeholder="$t('add_invoice.RecipientPersonIDNumber')" />
                          <b-list-group v-if="showSuggestionsPersonIdNumber" id="my-company_name"
                            class="input-suggesstions">
                            <b-list-group-item v-for="data in datalistPersonIdNumber" :key="data.eic"
                              @click="autoCompletefnPersonIdNumber(data)" @mousedown="autoCompletefnPersonIdNumber(data)">
                              {{ data.identificationNumber }}
                            </b-list-group-item>
                          </b-list-group>

                          <small class="text-danger">{{ errors[0] }}</small>
                        </validation-provider>

                        <validation-provider #default="{ errors }" name="recipientCompanyOwner" :rules="AccountTypeOption == 'company' ? 'required' : ''
                          ">
                          <b-form-input v-model="invoiceData.recipientCompany.companyOwnerName
                            " autocomplete="off" v-if="AccountTypeOption === 'company'" style="margin-bottom: 5px"
                            :placeholder="$t('add_invoice.RecipientCompanyOwnerName')" />
                        </validation-provider>

                        <validation-provider #default="{ errors }" :name="AccountTypeOption == 'company'
                          ? 'recipientCompanyName'
                          : 'personName'
                          " rules="required">
                          <b-form-input v-if="AccountTypeOption == 'company'"
                            v-model="invoiceData.recipientCompany.companName" @input="
                              SearchCompanyNameRecipient(
                                invoiceData.recipientCompany.companName
                              )
                              " list="my-company_name" autocomplete="off" @blur="hideSuggestionRecipient()"
                            @focus="ShowSuggestionRecipient(datalistRecipient)" style="margin-bottom: 5px"
                            :placeholder="$t('add_invoice.RecipientCompanyName')" />
                          <b-list-group v-if="showSuggestionsRecipient" id="my-company_name" class="input-suggesstions">
                            <b-list-group-item v-for="data in datalistRecipient" :key="data.eic"
                              @click="autoCompletefnRecipient(data)" @mousedown="autoCompletefnRecipient(data)">
                              {{ data.company_name }}
                            </b-list-group-item>
                          </b-list-group>
                          <b-form-input v-if="AccountTypeOption == 'person'" v-model="invoiceData.recipientCompany.companyOwnerName
                            " @input="
    SearchCompanyPerson(
      invoiceData.recipientCompany.companyOwnerName
    )
    " list="my-company_name" autocomplete="off" @blur="hideSuggestionPerson()"
                            @focus="ShowSuggestionPerson(datalistPerson)" style="margin-bottom: 5px"
                            :placeholder="$t('add_invoice.RecipientPersonName')" />
                          <b-list-group v-if="showSuggestionsPerson" id="my-company_name" class="input-suggesstions">
                            <b-list-group-item v-for="data in datalistPerson" :key="data.eic"
                              @click="autoCompletefnPerson(data)" @mousedown="autoCompletefnPerson(data)">
                              {{ data.firstMiddleAndLastName }}
                            </b-list-group-item>
                          </b-list-group>
                          <small class="text-danger">{{ errors[0] }}</small>
                        </validation-provider>

                        <validation-provider #default="{ errors }" :name="AccountTypeOption == 'company'
                          ? 'recipientCompanyAddress'
                          : 'personAddress'
                          " rules="required">
                          <b-form-input v-model="invoiceData.recipientCompany.companyAddress
                            " autocomplete="off" style="margin-bottom: 5px"
                            :placeholder="$t('add_invoice.RecipientCompanyAddress')" />
                          <small class="text-danger">{{ errors[0] }}</small>
                        </validation-provider>
                        <div v-if="AccountTypeOption == 'company' && recipientVat">
                          <validation-provider #default="{ errors }" name="recipientVatNumber" rules="required">
                            <b-input-group class="input-group invoice-edit-input-group" style="margin-bottom: 5px">
                              <b-form-input v-model="invoiceData.recipientCompany.companyVatEic
                                " autocomplete="off" :placeholder="$t('add_invoice.RecipientCompanyVATNumber')" />
                            </b-input-group>
                            <small class="text-danger">{{ errors[0] }}</small>
                          </validation-provider>
                        </div>

                        <b-form-checkbox v-if="AccountTypeOption == 'company'" v-model="recipientVat"
                          class="custom-control-primary custom-switch-btn-2" name="check-button" switch>
                          <span class="switch-icon-left text-uppercase">
                            {{ $t("add_invoice.vat") }}</span>
                          <span class="switch-icon-right text-uppercase">
                            {{ $t("add_invoice.no_vat") }}
                          </span>
                        </b-form-checkbox>
                      </div>
                    </div>

                    <div class="d-flex justify-content-between align-items-center mb-2">
                      <b-card no-body class="invoice-preview date-issued mb-0 ml-0 border">
                        <b-card-header class="justify-content-end">
                          <div class="mt-md-0 mt-2">
                            <div class="d-flex align-items-center mb-0">
                              <span class="title mr-1">
                                {{ $t("company_invoices.transaction_type") }}:
                              </span>
                              <validation-provider #default="{ errors }" name="transectionType" rules="required">
                                <b-form-select v-model="invoiceData.transactionType" @change="() => {
                                  companyIDisInvalid = false;
                                }
                                  ">
                                  <b-form-select-option value="EXPENSE">{{
                                    $t("company_invoices.EXPENSE")
                                  }}</b-form-select-option>
                                  <b-form-select-option value="INCOME">{{
                                    $t("company_invoices.INCOME")
                                  }}</b-form-select-option>
                                </b-form-select>
                                <small class="text-danger">{{
                                  errors[0]
                                }}</small>
                              </validation-provider>
                            </div>
                          </div>
                        </b-card-header>
                      </b-card>
                      <b-form-checkbox v-model="InvoiceTypeOptionToggleValue" @change="
                        InvoiceTypeOptionToggle(InvoiceTypeOptionToggleValue)
                        " class="custom-control-primary custom-switch-btn-2 flex-1 text-right"
                        name="AccountTypeOptionToggle" switch>
                        <span class="switch-icon-left text-uppercase">
                          {{ $t("add_invoice.PROFORMA") }}
                        </span>
                        <span class="switch-icon-right text-uppercase">
                          {{ $t("add_invoice.ORIGINAL") }}
                        </span>
                      </b-form-checkbox>
                      <b-form-checkbox v-model="saleTypeOptionToggleValue" @change="
                        saleTypeOptionToggle(saleTypeOptionToggleValue)
                        " class="custom-control-primary custom-switch-btn-2 flex-1 text-right"
                        name="AccountTypeOptionToggle" switch>
                        <span class="switch-icon-left text-uppercase">
                          {{ $t("add_invoice.goods") }}
                        </span>
                        <span class="switch-icon-right text-uppercase">
                          {{ $t("add_invoice.service") }}
                        </span>
                      </b-form-checkbox>
                    </div>

                    <b-card no-body class="invoice-add-card mb-1 mt-2">
                      <!-- Items Section -->
                      <b-card-body class="invoice-padding form-item-section p-0">
                        <div ref="form" class="repeater-form h-auto border transaction-container"
                          :style="{ height: trHeight }">
                          <b-row ref="row" class="pb-0 m-0">
                            <!-- Item Form -->
                            <!-- ? This will be in loop => So consider below markup for single item -->
                            <b-col cols="12" class="p-0 border">
                              <!-- ? Flex to keep separate width for XIcon and SettingsIcon -->
                              <div class="d-none d-lg-flex p-custom" style="background-color: #f5f6fa">
                                <b-row class="flex-grow-1 px-1 invoice-add-transections">
                                  <!-- Single Item Form Headers -->
                                  <b-col cols="12" lg="1" class="tm_semi_bold tm_primary_color tm_gray_bg">
                                    {{ $t("add_invoice.s_no") }}
                                  </b-col>
                                  <b-col cols="12" lg="4" class="tm_semi_bold tm_primary_color tm_gray_bg">
                                    {{ $t("add_invoice.item_service") }}
                                  </b-col>
                                  <b-col cols="12" lg="1" class="tm_semi_bold tm_primary_color tm_gray_bg">
                                    {{ $t("add_invoice.qty") }}
                                  </b-col>
                                  <b-col cols="12" lg="1" class="tm_semi_bold tm_primary_color tm_gray_bg">
                                    {{ $t("add_invoice.measure") }}
                                  </b-col>
                                  <b-col cols="12" lg="2" class="tm_semi_bold tm_primary_color tm_gray_bg">
                                    {{ $t("add_invoice.single_price") }}
                                  </b-col>
                                  <b-col cols="12" lg="1" class="tm_semi_bold tm_primary_color tm_gray_bg">
                                    {{ $t("add_invoice.currency") }}
                                  </b-col>
                                  <b-col cols="12" lg="2" class="tm_semi_bold tm_primary_color tm_gray_bg">
                                    {{ $t("add_invoice.total_price") }}
                                  </b-col>
                                </b-row>
                                <div class="form-item-action-col" />
                              </div>

                              <!-- Form Input Fields OR content inside bordered area  -->
                              <!-- ? Flex to keep separate width for XIcon and SettingsIcon -->
                              <div v-for="(
                                  item, index
                                ) in invoiceData.transactions" :key="index" class="d-flex px-custom">
                                <b-row class="flex-grow-1 py-1 px-1 invoice-add-transections">
                                  <!-- Single Item Form Headers -->
                                  <b-col cols="12" lg="1">
                                    <label class="d-inline d-lg-none">No.</label>

                                    <b-form-input :value="index + 1" type="text" class="mb-0 text-left" disabled
                                      style="background-color: #f5f6fa" />
                                  </b-col>

                                  <b-col cols="12" lg="4">
                                    <label class="d-inline d-lg-none">Item name or Service</label>
                                    <validation-provider #default="{ errors }" name="transectionServiceOrItemDescription"
                                      rules="required">
                                      <b-form-input v-model="item.serviceOrItemDescription" :dir="$store.state.appConfig.isRTL
                                        ? 'rtl'
                                        : 'ltr'
                                        " type="text" class="mb-0" />
                                      <small class="text-danger">{{
                                        errors[0]
                                      }}</small>
                                    </validation-provider>
                                  </b-col>
                                  <b-col cols="12" lg="1">
                                    <label class="d-inline d-lg-none">Qty</label>
                                    <validation-provider #default="{ errors }" name="transectionQuantity"
                                      rules="required">
                                      <b-form-input v-model="item.quantity" type="number" class="mb-0" placeholder="0"
                                        step="0.0000000001" @input="populateValues()" />
                                      <small class="text-danger">{{
                                        errors[0]
                                      }}</small>
                                    </validation-provider>
                                  </b-col>
                                  <b-col cols="12" lg="1">
                                    <label class="d-inline d-lg-none">Measure</label>
                                    <validation-provider #default="{ errors }" name="transectionMeasurement"
                                      rules="required">
                                      <b-form-select v-model="item.measurement" type="text" class="mb-0"
                                        :options="measureOptions" />
                                      <small class="text-danger">{{
                                        errors[0]
                                      }}</small>
                                    </validation-provider>
                                  </b-col>
                                  <b-col cols="12" lg="2">
                                    <label class="d-inline d-lg-none">Single Price</label>
                                    <validation-provider #default="{ errors }" name="transectionSingleAmountTransaction"
                                      rules="required|singlePriceValid">
                                      <b-input-group class="input-group-merge invoice-edit-input-group">
                                        <b-input-group-prepend is-text class="mb-0">
                                          <span>{{
                                            invoiceData.currency
                                          }}</span>
                                        </b-input-group-prepend>

                                        <b-form-input v-model="item.singleAmountTransaction" type="number" class="mb-0"
                                          step="any" placeholder="0.00" @input="populateValues()" />
                                      </b-input-group>
                                      <small class="text-danger">{{
                                        errors[0]
                                      }}</small>
                                    </validation-provider>
                                  </b-col>
                                  <b-col cols="12" lg="1">
                                    <label class="d-inline d-lg-none">Currency</label>
                                    <validation-provider #default="{ errors }" name="transectionCurrency"
                                      rules="required">
                                      <b-form-select v-model="invoiceData.currency" :options="currencyOptions">
                                      </b-form-select>
                                      <small class="text-danger">{{
                                        errors[0]
                                      }}</small>
                                    </validation-provider>
                                  </b-col>
                                  <b-col cols="12" lg="2">
                                    <label class="d-inline d-lg-none">Total Price</label>
                                    <validation-provider #default="{ errors }" name="transectionTotal" rules="required">
                                      <b-input-group class="input-group-merge invoice-edit-input-group">
                                        <b-input-group-prepend is-text class="mb-0">
                                          <span>{{
                                            invoiceData.currency
                                          }}</span>
                                        </b-input-group-prepend>

                                        <b-form-input :value="(
                                              parseFloat(
                                                item.singleAmountTransaction
                                              ) * parseFloat(item.quantity)
                                            ).toFixed(2)
                                            " disabled class="mb-0" style="background-color: #f5f6fa" />
                                      </b-input-group>
                                      <small class="text-danger">{{
                                        errors[0]
                                      }}</small>
                                    </validation-provider>
                                  </b-col>
                                </b-row>
                                <div class="d-flex justify-content-center py-50 px-25 position-relative top-custom">
                                  <feather-icon v-if="invoiceData.transactions.length !== 1" size="16" icon="Trash2Icon"
                                    class="cursor-pointer" @click="removeItem(index)" />
                                  <feather-icon v-if="invoiceData.transactions.length == 1" size="16" icon="Trash2Icon"
                                    class="cursor-pointer invisible" />
                                </div>
                              </div>
                            </b-col>
                          </b-row>
                        </div>
                      </b-card-body>
                    </b-card>

                    <b-button v-ripple.400="'rgba(255, 255, 255, 0.15)'" size="sm" @click="addNewItemInItemForm"
                      class="mb-2" style="
                        background-color: #f5f6fa !important;
                        border: 1px solid grey;
                        padding: 10px;
                        border-radius: 30px;
                        color: black !important;
                      ">
                      {{ $t("add_invoice.add_item") }}
                    </b-button>

                    <!-- Bank Details Switch -->
                    <b-row class="mb-1">
                      <b-col>
                        <b-form-select v-model="bankProcess" :options="banks" id="invoice-bank" name="invoice-bank"
                          v-bind:placeholder="$t('Please select bank...')" :value="$store.state.selected"
                          @change="checkProcessType(bankProcess)">

                        </b-form-select>
                      </b-col>
                    </b-row>

                    <div class="tm_invoice_footer" style="margin-bottom: 70px">
                      <div class="tm_left_footer">
                        <div v-if="isBank">
                          <!-- <p class="tm_mb2">
                            <b class="tm_primary_color">Payment info:</b>
                          </p> -->
                          <p class="tm_m0 d-inline-flex">
                            <span style="padding: 10px 10px 0px 0px; width: 60px"><b>BIC: </b>
                            </span>

                            <span>
                              <validation-provider #default="{ errors }" name="BIC" rules="required">
                                <b-form-input id="invoice-bic" v-model="invoiceData.bankApi.bic"
                                  :state="errors.length > 0 ? false : null" placeholder="BIC..." style="
                                    background: #fcfcfc;
                                    height: 30px;
                                    width: 200px;
                                  " />
                                <small class="text-danger">{{
                                  errors[0]
                                }}</small>
                              </validation-provider>
                            </span>
                          </p>
                          <br />
                          <p class="tm_m0 d-inline-flex" style="margin-top: 5px">
                            <span style="padding: 10px 10px 0px 0px; width: 60px"><b>IBAN: </b></span>

                            <span>
                              <validation-provider #default="{ errors }" name="IBAN" rules="required">
                                <b-form-input id="ivvoice-iban" v-model="invoiceData.bankApi.iban"
                                  :state="errors.length > 0 ? false : null" placeholder="IBAN..." style="
                                    background: #fcfcfc;
                                    height: 30px;
                                    width: 200px;
                                  " />
                                <small class="text-danger">{{
                                  errors[0]
                                }}</small>
                              </validation-provider>
                            </span>
                          </p>
                          <br />
                          <p class="tm_m0 d-inline-flex" style="margin-top: 2px">
                            <span style="padding: 10px 10px 0px 0px; width: 60px"><b>{{ $t("add_invoice.bank") }}:
                              </b></span>

                            <span style="width: 200px">
                              <validation-provider #default="{ errors }" name="bank" rules="required">
                                <b-form-input v-model="invoiceData.bankApi.name" id="invoice-bank" name="invoice-bank"
                                  v-bind:placeholder="$t('Please select bank...')
                                    " :value="$store.state.selected">

                                </b-form-input>
                                <small class="text-danger">{{
                                  errors[0]
                                }}</small>
                              </validation-provider>
                            </span>
                          </p>

                          <br />
                        </div>
                        <div v-if="companyName.companyVatNumber == null || companyName.companyVatNumber == ''">
                          <p class="tm_m0 d-inline-flex" style="margin-top: 10px">
                            <span style="width: 60px"><b>{{ $t("add_invoice.non_vat_clause") }}:
                              </b></span>
                            <span style="width: 200px">
                              <validation-provider #default="{ errors }" name="non-vat-clause" rules="required">
                                <v-select v-model="invoiceData.vatCondition" :options="noVatClause" id="non-vat-clause"
                                  name="non-vat-clause" v-bind:placeholder="$t('Please select non-vat clause..')
                                    " :value="$store.state.selected" @input="selectVatClause()">
                                  <template #selected-option="option" v-if="clauseToSend != ''">

                                    <div style="
                                display: flex;
                                align-items: center;
                                justify-content: left;
                                grid-gap: 8px;
                              ">
                                      {{ clauseToSend }}
                                    </div>
                                  </template>
                                  <template #selected-option="option" v-else>
                                    <div style="
                                display: flex;
                                align-items: center;
                                justify-content: left;
                                grid-gap: 8px;
                              ">
                                      {{ option.label }}
                                    </div>
                                  </template>

                                  <template v-slot:option="option">
                                    <span style="
                                display: flex;
                                align-items: center;
                                justify-content: left;
                                grid-gap: 8px;
                              ">
                                      {{ option.label }}
                                    </span>
                                  </template>
                                  <!-- <template #selected-option="option" v-if="clauseToSend !== ''">

                            <div style="
                                display: flex;
                                align-items: center;
                                justify-content: left;
                                grid-gap: 8px;
                              ">
                              {{ clauseToSend }}
                            </div>
                          </template>
                          <template #selected-option="option" v-else>

                            <div style="
                                display: flex;
                                align-items: center;
                                justify-content: left;
                                grid-gap: 8px;
                              ">
                              {{ option }}
                            </div>
                          </template>

                          <template v-slot:option="option">
                            <span style="
                                display: flex;
                                align-items: center;
                                justify-content: left;
                                grid-gap: 8px;
                              ">
                              {{ option }}
                            </span>
                          </template> -->
                                </v-select>
                                <small class="text-danger">{{ errors[0] }}</small>
                              </validation-provider></span>
                          </p>
                        </div>
                        <b-row class="mt-2">
                          <b-col cols="12" md="7" class="mt-md-6 d-flex ml-5 pl-4 pt-3" order="2" order-md="1">
                            <h1 class="invoiceTypeHeading">
                              {{ $t("add_invoice." + invoiceData.invoiceType) }}
                            </h1>
                          </b-col>
                        </b-row>
                      </div>
                      <div class="tm_right_footer">
                        <div class="invoice-total-wrapper">
                          <div class="invoice-total-item">
                            <p class="invoice-total-title">
                              {{ $t("add_invoice.total_price_non_vat") }}:
                            </p>
                            <p class="invoice-total-amount">
                              <validation-provider #default="{ errors }" name="amountNonVat" rules="required">
                                <b-input-group class="input-group-merge invoice-edit-input-group">
                                  <b-input-group-prepend is-text>
                                    <span>{{ invoiceData.currency }}</span>
                                  </b-input-group-prepend>

                                  <b-form-input v-model="invoiceData.amountNonVat" disabled
                                    style="background-color: #f5f6fa" />
                                </b-input-group>
                                <small class="text-danger">{{
                                  errors[0]
                                }}</small>
                              </validation-provider>
                            </p>
                          </div>
                          <div class="invoice-total-item">
                            <p class="invoice-total-title">
                              {{ $t("add_invoice.vat") }}:
                            </p>
                            <p class="invoice-total-amount">
                              <validation-provider #default="{ errors }" name="vat" ref="vatPercent">
                                <b-input-group class="input-group-merge invoice-edit-input-group">
                                  <b-form-input v-model="invoiceData.vatPercent" step="any" type="number"
                                    class="text-right" @input="populateValues()" />

                                  <b-input-group-append is-text>
                                    <span>%</span>
                                  </b-input-group-append>
                                </b-input-group>
                                <small class="text-danger">{{
                                  errors[0]
                                }}</small>
                              </validation-provider>
                            </p>
                          </div>
                          <div class="invoice-total-item">
                            <p class="invoice-total-title">
                              {{ $t("company_invoices.vat_amount") }}:
                            </p>
                            <p class="invoice-total-amount">
                              <validation-provider #default="{ errors }" name="vatPercent" rules="required">
                                <b-input-group class="input-group-merge invoice-edit-input-group">
                                  <b-input-group-prepend is-text>
                                    <span>{{ invoiceData.currency }}</span>
                                  </b-input-group-prepend>

                                  <b-form-input v-model="invoiceData.vatAmount" type="number" disabled
                                    style="background-color: #f5f6fa" />
                                </b-input-group>
                                <small class="text-danger">{{
                                  errors[0]
                                }}</small>
                              </validation-provider>
                            </p>
                          </div>
                          <div class="invoice-total-item">
                            <p class="invoice-total-title">
                              {{ $t("add_invoice.discount_percent") }}:
                            </p>
                            <p class="invoice-total-amount">
                              <validation-provider #default="{ errors }" name="tradeDiscountPercent" rules="required">
                                <b-input-group class="input-group-merge invoice-edit-input-group">
                                  <b-form-input v-model="invoiceData.tradeDiscountPercent" step="any" type="number"
                                    class="text-right" @input="populateValues()" />

                                  <b-input-group-append is-text>
                                    <span>%</span>
                                  </b-input-group-append>
                                </b-input-group>
                                <small class="text-danger">{{
                                  errors[0]
                                }}</small>
                              </validation-provider>
                            </p>
                          </div>
                          <div class="invoice-total-item">
                            <p class="invoice-total-title">
                              {{ $t("add_invoice.discount_sum") }}:
                            </p>
                            <p class="invoice-total-amount">
                              <validation-provider #default="{ errors }" name="tradeDiscountAmount" rules="required">
                                <b-input-group class="input-group-merge invoice-edit-input-group">
                                  <b-input-group-prepend is-text>
                                    <span>{{ invoiceData.currency }}</span>
                                  </b-input-group-prepend>

                                  <b-form-input v-model="invoiceData.tradeDiscountAmount" disabled
                                    style="background-color: #f5f6fa" />
                                </b-input-group>
                                <small class="text-danger">{{
                                  errors[0]
                                }}</small>
                              </validation-provider>
                            </p>
                          </div>
                          <div class="invoice-total-item">
                            <p class="invoice-total-title font-weight-bolder custom-font">
                              {{ $t("add_invoice.total_price") }}:
                            </p>
                            <p class="invoice-total-amount">
                              <validation-provider #default="{ errors }" name="totalPrice" rules="required">
                                <b-input-group class="input-group-merge invoice-edit-input-group">
                                  <b-input-group-prepend is-text>
                                    <span>{{ invoiceData.currency }}</span>
                                  </b-input-group-prepend>

                                  <b-form-input v-model="invoiceData.totalAmount" disabled
                                    class="opacity-1 font-weight-bolder custom-font" style="background-color: #f5f6fa" />
                                </b-input-group>
                                <small class="text-danger">{{
                                  errors[0]
                                }}</small>
                              </validation-provider>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </b-col>

          <!-- template 02 -->
          <b-col cols="12" xl="10" md="10" v-if="invoiceData.templateId == '2'">
            <div class="tm_container">
              <div class="tm_invoice_wrap">
                <div class="tm_invoice tm_style1 tm_type1" id="tm_download_section">
                  <div class="tm_invoice_in">
                    <div class="tm_invoice_head tm_top_head tm_mb15 tm_align_center"
                      style="padding-top: 20px; padding-bottom: 20px">
                      <div class="tm_invoice_left">
                        <div class="tm_logo">
                          <div>

                            <img :src="logoToUpload" fluid class="mr-1" style="
                                width: 80px;
                                height: 80px;
                                border: 1px solid black;
                              " v-if="showLogo" />
                            <feather-icon v-if="showLogo" size="16" icon="XSquareIcon" color="red" class="cursor-pointer"
                              style="position: absolute; left: 70px; top: 13px" @click="removeLogo()" />
                            <span v-if="!showLogo">
                              <label for="invoiceLogo2">
                                <div style="
                                    border: 1px solid white;
                                    padding: 10px;
                                    border-radius: 30px;

                                    cursor: pointer;
                                  " :class="isBlue === true
                                    ? 'tm_accent_bg'
                                    : isGreen === true
                                      ? 'green_bg'
                                      : isPurple === true
                                        ? 'purple_bg'
                                        : isOrange === true
                                          ? 'orange_bg'
                                          : 'gray_bg'
                                    " :style="isGray === true
    ? 'color: black !important'
    : 'color: white !important'
    ">
                                  {{ $t('add_invoice.upload_logo') }}
                                </div>
                              </label>
                              <input type="file" name="invoiceLogo2" id="invoiceLogo2"
                                style="display: none; visibility: none" @change="updateLogo" accept="image/*" />
                            </span>
                            <span v-if="showLogo">
                              <label for="invoiceLogo2">
                                <div style="
                                    border: 1px solid white;
                                    padding: 10px;
                                    border-radius: 30px;

                                    cursor: pointer;
                                  " :class="isBlue === true
                                    ? 'tm_accent_bg'
                                    : isGreen === true
                                      ? 'green_bg'
                                      : isPurple === true
                                        ? 'purple_bg'
                                        : isOrange === true
                                          ? 'orange_bg'
                                          : 'gray_bg'
                                    " :style="isGray === true
    ? 'color: black !important'
    : 'color: white !important'
    ">
                                  {{ $t('add_invoice.change_logo') }}
                                </div>
                              </label>
                              <input type="file" name="invoiceLogo2" id="invoiceLogo2"
                                style="display: none; visibility: none" @change="updateLogo" accept="image/*" />
                            </span>
                          </div>
                        </div>
                      </div>
                      <div class="tm_invoice_right tm_text_right tm_mobile_hide">
                        <div class="tm_f50 tm_text_uppercase" :style="isGray === true
                          ? 'color: black !important'
                          : 'color: white !important'
                          ">
                          {{ $t("add_invoice.invoice") }}
                        </div>
                      </div>
                      <div class="tm_shape_bg tm_mobile_hide" :class="isBlue === true
                        ? 'tm_accent_bg'
                        : isGreen === true
                          ? 'green_bg'
                          : isPurple === true
                            ? 'purple_bg'
                            : isOrange === true
                              ? 'orange_bg'
                              : 'gray_bg'
                        "></div>
                    </div>
                    <div class="tm_invoice_info tm_mb25">
                      <div class="tm_card_note tm_mobile_hide"></div>
                      <div class="tm_invoice_info_list" style="margin-top: 5px; margin-bottom: 10px" :style="isGray === true
                        ? 'color: black !important'
                        : 'color: white !important'
                        ">
                        <p class="tm_invoice_number tm_m0 mb-1">
                          <!-- Invoice No: -->
                          {{ $t("add_invoice.invoice") }}:

                          <span><validation-provider #default="{ errors }" name="invoiceNumber" vid="Invoice"
                              rules="required">
                              <b-input-group class="input-group-merge invoice-edit-input-group invoice-input-top">
                                <b-input-group-prepend is-text>
                                  <feather-icon icon="HashIcon" />
                                </b-input-group-prepend>

                                <b-form-input id="invoice-data-id" v-model="invoiceData.invoiceNumber" />
                              </b-input-group>
                              <small class="text-danger">{{ errors[0] }}</small>
                            </validation-provider>
                          </span>
                        </p>

                        <div class="d-flex align-items-center  mb-0">
                          <span class="title mr-1">
                            {{ $t("add_invoice.due_date") }}:
                          </span>
                          <!-- <validation-provider #default="{ errors }" name="dueDate" rules="required"> -->
                          <flat-pickr v-model="invoiceData.dueDate"
                            class="form-control invoice-edit-input invoice-input-top" />
                          <feather-icon v-if="invoiceData.dueDate === ''" size="16" icon="CalendarIcon"
                            class="cursor-pointer"
                            style="position: relative; bottom: 31px; left: 188px; color: #6e6b7b;" />
                          <feather-icon v-else size="16" icon="XIcon" class="cursor-pointer "
                            style="position: relative; bottom: 31px; left: 128px; color: #6e6b7b;"
                            @click="invoiceData.dueDate = ''" />
                          <!-- <small class="text-danger">{{ errors[0] }}</small>
                        </validation-provider> -->
                        </div>
                      </div>
                      <div class="tm_invoice_seperator tm_accent_bg" :class="isBlue === true
                        ? 'tm_accent_bg'
                        : isGreen === true
                          ? 'green_bg'
                          : isPurple === true
                            ? 'purple_bg'
                            : isOrange === true
                              ? 'orange_bg'
                              : 'gray_bg'
                        "></div>
                    </div>
                    <div class="d-flex justify-content-between align-items-center mb-2 accountType">
                      <!-- @change="scheduleTypeOptionToggle(scheduleOptionToggleValue)"                 -->
                      <b-form-checkbox v-model="invoiceData.scheduled"
                        class="custom-control-primary custom-switch-btn mr-2" name="invoiceData.scheduled" switch>
                        <span class="switch-icon-left" style="width: 76px">{{ $t("add_invoice.scheduled") }}</span>
                        <span class="switch-icon-right" style="width: 76px">{{ $t("add_invoice.regular") }}</span>
                      </b-form-checkbox>
                      <b-card no-body class="invoice-preview date-issued mb-0 ml-0 "
                        v-if="disabled = invoiceData.scheduled" style="width: 27%;">
                        <b-card-header class="justify-content-end">
                          <div class="mt-md-0 mt-2">
                            <div class="d-flex align-items-center mb-0">
                              <span class="title mr-1">
                                {{ $t("add_invoice.schedule_type") }}:
                              </span>
                              <validation-provider #default="{ errors }" name="scheduleType" rules="required">
                                <b-form-select :disabled="!invoiceData.scheduled"
                                  v-model="invoiceData.cronScheduleApi.scheduleType"
                                  @change="() => { companyIDisInvalid = false; }">
                                  <b-form-select-option value="WEEKLY">{{ $t("add_invoice.WEEKLY")
                                  }}</b-form-select-option>
                                  <b-form-select-option value="MONTHLY">{{ $t("add_invoice.MONTHLY")
                                  }}</b-form-select-option>
                                </b-form-select>
                                <small class="text-danger">{{ errors[0] }}</small>
                              </validation-provider>
                            </div>
                          </div>
                        </b-card-header>
                      </b-card>
                      <b-form-radio v-model="AccountTypeOption" plain name="accountTypeoptions" value="company"
                        class="d-none">
                        <h5>{{ $t("add_invoice.company") }}</h5>
                      </b-form-radio>
                      <b-form-radio v-model="AccountTypeOption" plain name="accountTypeoptions" value="person"
                        class="d-none">
                        <h5>{{ $t("add_invoice.person") }}</h5>
                      </b-form-radio>

                      <b-form-checkbox v-model="AccountTypeOptionToggleValue"
                        @change="AccountTypeOptionToggle(AccountTypeOptionToggleValue)"
                        class="custom-control-primary custom-switch-btn" name="AccountTypeOptionToggle" switch>
                        <span class="switch-icon-left">
                          {{ $t("add_invoice.person") }}
                        </span>
                        <span class="switch-icon-right">
                          {{ $t("add_invoice.company") }}
                        </span>
                      </b-form-checkbox>
                    </div>
                    <p class="tm_invoice_date tm_m0">
                      <!-- Date: -->
                      {{ $t("add_invoice.date") }}:

                      <span>
                        <validation-provider #default="{ errors }" name="dateIssued" rules="required">
                          <flat-pickr v-model="invoiceData.dateIssued"
                            class="form-control invoice-edit-input invoice-input-top" />
                          <feather-icon v-if="invoiceData.dateIssued === ''" size="16" icon="CalendarIcon"
                            class="cursor-pointer" style="position: relative; bottom: 31px; left: 188px;" />
                          <feather-icon v-else size="16" icon="XIcon" class="cursor-pointer"
                            @click="invoiceData.dateIssued = ''" style="position: relative; bottom: 31px; left: 188px;" />
                          <small class="text-danger">{{ errors[0] }}</small>
                        </validation-provider>
                      </span>
                    </p>
                    <!-- Schedule Type -->
                    <div class="d-flex justify-content-between align-items-center mb-2 schedule-type"
                      v-if='invoiceData.scheduled'>
                      <b-card v-if="invoiceData.cronScheduleApi.scheduleType == 'MONTHLY'" no-body
                        class="invoice-preview date-issued mb-0 ml-0 mr-auto">
                        <b-card-header class="justify-content-end">
                          <div class="mt-md-0 mt-2">
                            <div class="d-flex align-items-center mb-0">
                              <span class="title mr-1">
                                {{ $t("add_invoice.select_date") }}:
                              </span>
                              <validation-provider #default="{ errors }" name="dayOfMonth" rules="required">
                                <b-form-select v-model="invoiceData.cronScheduleApi.dayOfMonth"
                                  @change="() => { companyIDisInvalid = false; }" :options="dates">
                                  <b-form-select-option :value="date.value" v-for="(date, index) in dates" :key="index">{{
                                    date.text }}</b-form-select-option>
                                </b-form-select>
                                <small class="text-danger">{{ errors[0] }}</small>
                              </validation-provider>
                            </div>
                          </div>
                        </b-card-header>
                      </b-card>
                      <b-card v-if="invoiceData.cronScheduleApi.scheduleType == 'WEEKLY'" no-body
                        class="invoice-preview date-issued mb-0 ml-0 mr-auto">
                        <b-card-header class="justify-content-start">
                          <div class="w-100 mt-md-0 mt-2">
                            <div class="d-flex align-items-center mb-0">
                              <span class="title mr-1">
                                {{ $t("add_invoice.select_days") }}:
                              </span>
                              <!-- <validation-provider #default="{ errors }" name="dayOfWeek" rules="required"> -->
                              <div class="d-block">
                                <b-form-group class="d-flex w-100 mb-0" v-slot="{ ariaDescribedby }">
                                  <b-form-radio-group v-model="invoiceData.cronScheduleApi.dayOfWeek"
                                    @change="toggleDaySelected()" :options="days" class="d-flex"
                                    :aria-describedby="ariaDescribedby">
                                    <!-- <b-form-radio :value="day.value" v-for="(day, index) in days" :key="index">{{ day.text }}</b-form-radio> -->
                                  </b-form-radio-group>
                                </b-form-group>
                                <small class="text-danger d-flex w-100 pl-1" v-if="daySelected">The dayOfWeek field is
                                  required</small>
                              </div>
                              <!-- <small class="text-danger">{{ errors[0] }}</small>
                        </validation-provider> -->
                            </div>
                          </div>
                        </b-card-header>
                      </b-card>
                    </div>

                    <!-- Supplier -->

                    <div class="tm_invoice_head tm_mb10">
                      <div class="tm_invoice_left" style="width: 47%">
                        <p class="tm_mb2">
                          <b class="tm_primary_color"> {{ $t("add_invoice.supplier") }}:</b>
                        </p>
                        <validation-provider #default="{ errors }" name="supplierCompanyIdNumber" rules="required">
                          <b-form-input v-model="invoiceData.supplierCompany.companyEic" @input="
                            SearchCompanyEic(
                              invoiceData.supplierCompany.companyEic
                            )
                            " list="my-company_name" autocomplete="off" @blur="hideSuggestionEic()"
                            @focus="ShowSuggestionEic(datalistEic)" @mousedown="() => {
                              companyIDisInvalid = false;
                            }
                              " style="margin-bottom: 5px" />
                          <b-list-group v-if="showSuggestionsEic" id="my-company_name" class="input-suggesstions"
                            style="width: 47%">
                            <b-list-group-item v-for="data in datalistEic" :key="data.eic"
                              @click="autoCompletefnEic(data)" @mousedown="autoCompletefnEic(data)">
                              {{ data.eic }}
                            </b-list-group-item>
                          </b-list-group>
                          <small class="text-danger">{{ errors[0] }}</small>
                          <small class="text-danger" v-if="companyIDisInvalid === true">{{
                            $t("add_invoice.PleaseEnterTheCompanyID") }} {{
    companyName }}
                          </small>
                        </validation-provider>
                        <validation-provider #default="{ errors }" name="supplierCompanyOwner" rules="required">
                          <b-form-input v-model="invoiceData.supplierCompany.companyOwnerName
                            " autocomplete="off" style="margin-bottom: 5px"
                            :placeholder="$t('add_invoice.SupplierCompanyOwnerName')" />
                          <small class="text-danger">{{ errors[0] }}</small>
                        </validation-provider>

                        <validation-provider #default="{ errors }" name="supplierCompanyName" rules="required">
                          <b-form-input v-model="invoiceData.supplierCompany.companName"
                            :placeholder="$t('add_invoice.SupplierCompanyOwnerName')" @input="
                              SearchCompanyName(
                                invoiceData.supplierCompany.companName
                              )
                              " list="my-company_name" autocomplete="off" @blur="hideSuggestion()"
                            @focus="ShowSuggestion(datalist)" style="margin-bottom: 5px" />
                          <b-list-group v-if="showSuggestions" id="my-company_name" class="input-suggesstions"
                            style="width: 44%">
                            <b-list-group-item v-for="data in datalist" :key="data.eic" @click="autoCompletefn(data)"
                              @mousedown="autoCompletefn(data)">
                              {{ data.company_name }}
                            </b-list-group-item>
                          </b-list-group>
                          <small class="text-danger">{{ errors[0] }}</small>
                        </validation-provider>

                        <validation-provider #default="{ errors }" name="supplierCompanyAddress" rules="required">
                          <b-form-input v-model="invoiceData.supplierCompany.companyAddress" autocomplete="off"
                            :placeholder="$t('add_invoice.SupplierCompanyAddress')" style="margin-bottom: 5px" />
                          <small class="text-danger">{{ errors[0] }}</small>
                        </validation-provider>
                        <div v-if="supplierVat">
                          <validation-provider #default="{ errors }" name="supplierVatNumber" rules="required">
                            <b-input-group class="input-group invoice-edit-input-group">
                              <b-form-input v-model="invoiceData.supplierCompany.companyVatEic
                                " autocomplete="off" style="margin-bottom: 5px" />
                            </b-input-group>
                            <small class="text-danger">{{ errors[0] }}</small>
                          </validation-provider>
                        </div>

                        <b-form-checkbox v-model="supplierVat" class="custom-control-primary custom-switch-btn-2"
                          name="check-button" switch>
                          <span class="switch-icon-left text-uppercase">
                            {{ $t("add_invoice.vat") }}</span>
                          <span class="switch-icon-right text-uppercase">
                            {{ $t("add_invoice.no_vat") }}
                          </span>
                        </b-form-checkbox>
                      </div>
                      <div style="width: 12%">
                        <div @click="reverse" class="reverse-button"
                          style="margin-left: 25px; position: relative; top: 27%; cursor: pointer">
                          <img src="@/assets/images/svg/repeat.svg" />
                        </div>
                      </div>
                      <!-- Recipient -->
                      <div class="tm_invoice_right tm_text_right" style="width: 44%">
                        <h6 class="tm_mb2">
                          <b class="tm_primary_color" style="padding-left: 3px">
                            {{ $t("add_invoice.recipient") }}:</b>
                        </h6>
                        <!-- Company/Person Identification-->
                        <validation-provider #default="{ errors }" :name="AccountTypeOption == 'company'
                          ? 'recipientCompanyIdNumber'
                          : 'personIdNumber'
                          " rules="required">
                          <b-form-input v-if="AccountTypeOption == 'company'"
                            v-model="invoiceData.recipientCompany.companyEic" @input="
                              SearchCompanyEicRecipient(
                                invoiceData.recipientCompany.companyEic
                              )
                              " list="my-company_name" autocomplete="off" @blur="hideSuggestionEicRecipient()" @focus="
    ShowSuggestionEicRecipient(datalistEicRecipient)
    " style="margin-bottom: 5px" :placeholder="$t('add_invoice.RecipientCompanyIDNumber')" />
                          <b-list-group v-if="showSuggestionsEicRecipient" id="my-company_name" class="input-suggesstions"
                            style="width: 100%">
                            <b-list-group-item v-for="data in datalistEicRecipient" :key="data.eic"
                              @click="autoCompletefnEicRecipient(data)" @mousedown="autoCompletefnEicRecipient(data)">
                              {{ data.eic }}
                            </b-list-group-item>
                          </b-list-group>

                          <b-form-input v-if="AccountTypeOption == 'person'"
                            v-model="invoiceData.recipientCompany.companyEic" @input="
                              SearchCompanyPersonIdNumber(
                                invoiceData.recipientCompany.companyEic
                              )
                              " list="my-company_name" autocomplete="off" @blur="hideSuggestionPersonIdNumber()"
                            @focus="
                              ShowSuggestionPersonIdNumber(
                                datalistPersonIdNumber
                              )
                              " style="margin-bottom: 5px" :placeholder="$t('add_invoice.RecipientPersonIDNumber')" />
                          <b-list-group v-if="showSuggestionsPersonIdNumber" id="my-company_name"
                            class="input-suggesstions" style="width: 100%">
                            <b-list-group-item v-for="data in datalistPersonIdNumber" :key="data.eic"
                              @click="autoCompletefnPersonIdNumber(data)" @mousedown="autoCompletefnPersonIdNumber(data)">
                              {{ data.identificationNumber }}
                            </b-list-group-item>
                          </b-list-group>

                          <small class="text-danger">{{ errors[0] }}</small>
                        </validation-provider>

                        <validation-provider #default="{ errors }" name="recipientCompanyOwner" :rules="AccountTypeOption == 'company' ? 'required' : ''
                          ">
                          <b-form-input v-model="invoiceData.recipientCompany.companyOwnerName
                            " autocomplete="off" v-if="AccountTypeOption === 'company'" style="margin-bottom: 5px"
                            :placeholder="$t('add_invoice.RecipientCompanyOwnerName')" />
                        </validation-provider>

                        <validation-provider #default="{ errors }" :name="AccountTypeOption == 'company'
                          ? 'recipientCompanyName'
                          : 'personName'
                          " rules="required">
                          <b-form-input v-if="AccountTypeOption == 'company'"
                            v-model="invoiceData.recipientCompany.companName" @input="
                              SearchCompanyNameRecipient(
                                invoiceData.recipientCompany.companName
                              )
                              " list="my-company_name" autocomplete="off" @blur="hideSuggestionRecipient()"
                            @focus="ShowSuggestionRecipient(datalistRecipient)" style="margin-bottom: 5px"
                            :placeholder="$t('add_invoice.RecipientCompanyName')" />
                          <b-list-group v-if="showSuggestionsRecipient" id="my-company_name" class="input-suggesstions"
                            style="width: 100%">
                            <b-list-group-item v-for="data in datalistRecipient" :key="data.eic"
                              @click="autoCompletefnRecipient(data)" @mousedown="autoCompletefnRecipient(data)">
                              {{ data.company_name }}
                            </b-list-group-item>
                          </b-list-group>
                          <b-form-input v-if="AccountTypeOption == 'person'" v-model="invoiceData.recipientCompany.companyOwnerName
                            " @input="
    SearchCompanyPerson(
      invoiceData.recipientCompany.companyOwnerName
    )
    " list="my-company_name" autocomplete="off" @blur="hideSuggestionPerson()"
                            @focus="ShowSuggestionPerson(datalistPerson)" style="margin-bottom: 5px"
                            :placeholder="$t('add_invoice.RecipientPersonName')" />
                          <b-list-group v-if="showSuggestionsPerson" id="my-company_name" class="input-suggesstions"
                            style="width: 47%">
                            <b-list-group-item v-for="data in datalistPerson" :key="data.eic"
                              @click="autoCompletefnPerson(data)" @mousedown="autoCompletefnPerson(data)">
                              {{ data.firstMiddleAndLastName }}
                            </b-list-group-item>
                          </b-list-group>
                          <small class="text-danger">{{ errors[0] }}</small>
                        </validation-provider>

                        <validation-provider #default="{ errors }" :name="AccountTypeOption == 'company'
                          ? 'recipientCompanyAddress'
                          : 'personAddress'
                          " rules="required">
                          <b-form-input v-model="invoiceData.recipientCompany.companyAddress
                            " autocomplete="off" style="margin-bottom: 5px"
                            :placeholder="$t('add_invoice.RecipientCompanyAddress')" />
                          <small class="text-danger">{{ errors[0] }}</small>
                        </validation-provider>
                        <div v-if="AccountTypeOption == 'company' && recipientVat">
                          <validation-provider #default="{ errors }" name="recipientVatNumber" rules="required">
                            <b-input-group class="input-group invoice-edit-input-group" style="margin-bottom: 5px">
                              <b-form-input v-model="invoiceData.recipientCompany.companyVatEic
                                " autocomplete="off" :placeholder="$t('add_invoice.RecipientCompanyVATNumber')" />
                            </b-input-group>
                            <small class="text-danger">{{ errors[0] }}</small>
                          </validation-provider>
                        </div>

                        <b-form-checkbox v-if="AccountTypeOption == 'company'" v-model="recipientVat"
                          class="custom-control-primary custom-switch-btn-2" name="check-button" switch>
                          <span class="switch-icon-left text-uppercase">
                            {{ $t("add_invoice.vat") }}</span>
                          <span class="switch-icon-right text-uppercase">
                            {{ $t("add_invoice.no_vat") }}
                          </span>
                        </b-form-checkbox>
                      </div>
                    </div>

                    <div class="d-flex justify-content-between align-items-center mb-2">
                      <b-card no-body class="invoice-preview date-issued mb-0 ml-0 border">
                        <b-card-header class="justify-content-end">
                          <div class="mt-md-0 mt-2">
                            <div class="d-flex align-items-center mb-0">
                              <span class="title mr-1">
                                {{ $t("company_invoices.transaction_type") }}:
                              </span>
                              <validation-provider #default="{ errors }" name="transectionType" rules="required">
                                <b-form-select v-model="invoiceData.transactionType" @change="() => {
                                  companyIDisInvalid = false;
                                }
                                  ">
                                  <b-form-select-option value="EXPENSE">{{
                                    $t("company_invoices.EXPENSE")
                                  }}</b-form-select-option>
                                  <b-form-select-option value="INCOME">{{
                                    $t("company_invoices.INCOME")
                                  }}</b-form-select-option>
                                </b-form-select>
                                <small class="text-danger">{{
                                  errors[0]
                                }}</small>
                              </validation-provider>
                            </div>
                          </div>
                        </b-card-header>
                      </b-card>
                      <b-form-checkbox v-model="InvoiceTypeOptionToggleValue" @change="
                        InvoiceTypeOptionToggle(InvoiceTypeOptionToggleValue)
                        " class="custom-control-primary custom-switch-btn-2 flex-1 text-right"
                        name="AccountTypeOptionToggle" switch>
                        <span class="switch-icon-left text-uppercase">
                          {{ $t("add_invoice.PROFORMA") }}
                        </span>
                        <span class="switch-icon-right text-uppercase">
                          {{ $t("add_invoice.ORIGINAL") }}
                        </span>
                      </b-form-checkbox>
                      <b-form-checkbox v-model="saleTypeOptionToggleValue" @change="
                        saleTypeOptionToggle(saleTypeOptionToggleValue)
                        " class="custom-control-primary custom-switch-btn-2 flex-1 text-right"
                        name="AccountTypeOptionToggle" switch>
                        <span class="switch-icon-left text-uppercase">
                          {{ $t("add_invoice.goods") }}
                        </span>
                        <span class="switch-icon-right text-uppercase">
                          {{ $t("add_invoice.service") }}
                        </span>
                      </b-form-checkbox>
                    </div>

                    <b-card no-body class="invoice-add-card mb-1 mt-2">
                      <!-- Items Section -->
                      <b-card-body class="invoice-padding form-item-section p-0">
                        <div ref="form" class="repeater-form h-auto border transaction-container"
                          :style="{ height: trHeight }">
                          <b-row ref="row" class="pb-0 m-0">
                            <!-- Item Form -->
                            <!-- ? This will be in loop => So consider below markup for single item -->
                            <b-col cols="12" class="p-0 border">
                              <!-- ? Flex to keep separate width for XIcon and SettingsIcon -->
                              <div class="d-none d-lg-flex p-custom" :class="isBlue === true
                                ? 'tm_accent_bg'
                                : isGreen === true
                                  ? 'green_bg'
                                  : isPurple === true
                                    ? 'purple_bg'
                                    : isOrange === true
                                      ? 'orange_bg'
                                      : 'gray_bg'
                                " :style="isGray === true
    ? 'color: black !important'
    : 'color: white !important'
    ">
                                <b-row class="flex-grow-1 px-1 invoice-add-transections">
                                  <!-- Single Item Form Headers -->
                                  <b-col cols="12" lg="1" class="tm_semi_bold">
                                    {{ $t("add_invoice.s_no") }}
                                  </b-col>
                                  <b-col cols="12" lg="4" class="tm_semi_bold">
                                    {{ $t("add_invoice.item_service") }}
                                  </b-col>
                                  <b-col cols="12" lg="1" class="tm_semi_bold">
                                    {{ $t("add_invoice.qty") }}
                                  </b-col>
                                  <b-col cols="12" lg="1" class="tm_semi_bold">
                                    {{ $t("add_invoice.measure") }}
                                  </b-col>
                                  <b-col cols="12" lg="2" class="tm_semi_bold">
                                    {{ $t("add_invoice.single_price") }}
                                  </b-col>
                                  <b-col cols="12" lg="1" class="tm_semi_bold">
                                    {{ $t("add_invoice.currency") }}
                                  </b-col>
                                  <b-col cols="12" lg="2" class="tm_semi_bold">
                                    {{ $t("add_invoice.total_price") }}
                                  </b-col>
                                </b-row>
                                <div class="form-item-action-col" />
                              </div>

                              <!-- Form Input Fields OR content inside bordered area  -->
                              <!-- ? Flex to keep separate width for XIcon and SettingsIcon -->
                              <div v-for="(
                                  item, index
                                ) in invoiceData.transactions" :key="index" class="d-flex px-custom">
                                <b-row class="flex-grow-1 py-1 px-1 invoice-add-transections">
                                  <!-- Single Item Form Headers -->
                                  <b-col cols="12" lg="1">
                                    <label class="d-inline d-lg-none">No.</label>

                                    <b-form-input :value="index + 1" type="text" class="mb-0 text-left" disabled />
                                  </b-col>

                                  <b-col cols="12" lg="4">
                                    <label class="d-inline d-lg-none">Item name or Service</label>
                                    <validation-provider #default="{ errors }" name="transectionServiceOrItemDescription"
                                      rules="required">
                                      <b-form-input v-model="item.serviceOrItemDescription" :dir="$store.state.appConfig.isRTL
                                        ? 'rtl'
                                        : 'ltr'
                                        " type="text" class="mb-0" />
                                      <small class="text-danger">{{
                                        errors[0]
                                      }}</small>
                                    </validation-provider>
                                  </b-col>
                                  <b-col cols="12" lg="1">
                                    <label class="d-inline d-lg-none">Qty</label>
                                    <validation-provider #default="{ errors }" name="transectionQuantity"
                                      rules="required">
                                      <b-form-input v-model="item.quantity" type="number" class="mb-0" placeholder="0"
                                        step="0.0000000001" @input="populateValues()" />
                                      <small class="text-danger">{{
                                        errors[0]
                                      }}</small>
                                    </validation-provider>
                                  </b-col>
                                  <b-col cols="12" lg="1">
                                    <label class="d-inline d-lg-none">Measure</label>
                                    <validation-provider #default="{ errors }" name="transectionMeasurement"
                                      rules="required">
                                      <b-form-select v-model="item.measurement" type="text" class="mb-0"
                                        :options="measureOptions" />
                                      <small class="text-danger">{{
                                        errors[0]
                                      }}</small>
                                    </validation-provider>
                                  </b-col>
                                  <b-col cols="12" lg="2">
                                    <label class="d-inline d-lg-none">Single Price</label>
                                    <validation-provider #default="{ errors }" name="transectionSingleAmountTransaction"
                                      rules="required|singlePriceValid">
                                      <b-input-group class="input-group-merge invoice-edit-input-group">
                                        <b-input-group-prepend is-text class="mb-0">
                                          <span>{{
                                            invoiceData.currency
                                          }}</span>
                                        </b-input-group-prepend>

                                        <b-form-input v-model="item.singleAmountTransaction" type="number" class="mb-0"
                                          step="any" placeholder="0.00" @input="populateValues()" />
                                      </b-input-group>
                                      <small class="text-danger">{{
                                        errors[0]
                                      }}</small>
                                    </validation-provider>
                                  </b-col>
                                  <b-col cols="12" lg="1">
                                    <label class="d-inline d-lg-none">Currency</label>
                                    <validation-provider #default="{ errors }" name="transectionCurrency"
                                      rules="required">
                                      <b-form-select v-model="invoiceData.currency" :options="currencyOptions">
                                      </b-form-select>
                                      <small class="text-danger">{{
                                        errors[0]
                                      }}</small>
                                    </validation-provider>
                                  </b-col>
                                  <b-col cols="12" lg="2">
                                    <label class="d-inline d-lg-none">Total Price</label>
                                    <validation-provider #default="{ errors }" name="transectionTotal" rules="required">
                                      <b-input-group class="input-group-merge invoice-edit-input-group">
                                        <b-input-group-prepend is-text class="mb-0">
                                          <span>{{
                                            invoiceData.currency
                                          }}</span>
                                        </b-input-group-prepend>
                                        <b-form-input :value="(
                                              parseFloat(
                                                item.singleAmountTransaction
                                              ) * parseFloat(item.quantity)
                                            ).toFixed(2)
                                            " disabled class="mb-0" />
                                      </b-input-group>
                                      <small class="text-danger">{{
                                        errors[0]
                                      }}</small>
                                    </validation-provider>
                                  </b-col>
                                </b-row>
                                <div class="d-flex justify-content-center py-50 px-25 position-relative top-custom">
                                  <feather-icon v-if="invoiceData.transactions.length !== 1" size="16" icon="Trash2Icon"
                                    class="cursor-pointer" @click="removeItem(index)" />
                                  <feather-icon v-if="invoiceData.transactions.length == 1" size="16" icon="Trash2Icon"
                                    class="cursor-pointer invisible" />
                                </div>
                              </div>
                            </b-col>
                          </b-row>
                        </div>
                      </b-card-body>
                    </b-card>

                    <b-button v-ripple.400="'rgba(255, 255, 255, 0.15)'" size="sm" @click="addNewItemInItemForm"
                      class="mb-2" style="
                        border: 1px solid white;
                        padding: 10px;
                        border-radius: 30px;
                       
                      " :style="isBlue === true
                        ? 'background-color: #007aff !important; color: white !important'
                        : isGreen === true
                          ? 'background-color: #8fce00 !important; color: white !important'
                          : isPurple === true
                            ? 'background-color: #ad3978 !important; color: white !important'
                            : isOrange === true
                              ? 'background-color: #FFA500 !important; color: white !important'
                              : 'background-color: #f6d1ff !important; color: black !important'
                        ">
                      {{ $t("add_invoice.add_item") }}
                    </b-button>

                    <b-row class="mb-1">
                      <b-col>
                        <b-form-select v-model="bankProcess" :options="banks" id="invoice-bank" name="invoice-bank"
                          v-bind:placeholder="$t('Please select bank...')" :value="$store.state.selected"
                          @change="checkProcessType(bankProcess)">

                        </b-form-select>
                      </b-col>
                    </b-row>

                    <div class="tm_invoice_footer tm_border_top tm_mb90 tm_m0_md pb-5">
                      <div class="tm_left_footer">
                        <div v-if="isBank">
                          <!-- <p class="tm_mb2">
                            <b class="tm_primary_color">Payment info:</b>
                          </p> -->
                          <p class="tm_m0 d-inline-flex">
                            <span style="padding: 10px 10px 0px 0px; width: 60px"><b>BIC: </b>
                            </span>
                            <span>
                              <validation-provider #default="{ errors }" name="BIC" rules="required">
                                <b-form-input id="invoice-bic" v-model="invoiceData.bankApi.bic"
                                  :state="errors.length > 0 ? false : null" placeholder="BIC..." style="
                                    background: #fcfcfc;
                                    height: 30px;
                                    width: 200px;
                                  " />
                                <small class="text-danger">{{
                                  errors[0]
                                }}</small>
                              </validation-provider>
                            </span>
                          </p>
                          <br />
                          <p class="tm_m0 d-inline-flex" style="margin-top: 5px">
                            <span style="padding: 10px 10px 0px 0px; width: 60px"><b>IBAN: </b></span>
                            <span>
                              <validation-provider #default="{ errors }" name="IBAN" rules="required">
                                <b-form-input id="ivvoice-iban" v-model="invoiceData.bankApi.iban"
                                  :state="errors.length > 0 ? false : null" placeholder="IBAN..." style="
                                    background: #fcfcfc;
                                    height: 30px;
                                    width: 200px;
                                  " />
                                <small class="text-danger">{{
                                  errors[0]
                                }}</small>
                              </validation-provider>
                            </span>
                          </p>
                          <br />
                          <p class="tm_m0 d-inline-flex" style="margin-top: 2px">
                            <span style="padding: 10px 10px 0px 0px; width: 60px"><b>{{ $t("add_invoice.bank") }}:
                              </b></span>

                            <span style="width: 200px">
                              <validation-provider #default="{ errors }" name="bank" rules="required">
                                <b-form-input v-model="invoiceData.bankApi.name" id="invoice-bank" name="invoice-bank"
                                  v-bind:placeholder="$t('Please select bank...')
                                    " :value="$store.state.selected">

                                </b-form-input>
                                <small class="text-danger">{{
                                  errors[0]
                                }}</small>
                              </validation-provider>
                            </span>
                          </p>
                          <br />
                        </div>
                        <div v-if="companyName.companyVatNumber == null || companyName.companyVatNumber == ''">
                          <p class="tm_m0 d-inline-flex" style="margin-top: 10px">
                            <span style="width: 60px"><b>{{ $t("add_invoice.non_vat_clause") }}:
                              </b></span>
                            <span style="width: 200px">
                              <validation-provider #default="{ errors }" name="non-vat-clause" rules="required">
                                <v-select v-model="invoiceData.vatCondition" :options="noVatClause" id="non-vat-clause"
                                  name="non-vat-clause" v-bind:placeholder="$t('Please select non-vat clause..')
                                    " :value="$store.state.selected" @input="selectVatClause()">
                                  <template #selected-option="option" v-if="clauseToSend != ''">

                                    <div style="
                                display: flex;
                                align-items: center;
                                justify-content: left;
                                grid-gap: 8px;
                              ">
                                      {{ clauseToSend }}
                                    </div>
                                  </template>
                                  <template #selected-option="option" v-else>
                                    <div style="
                                display: flex;
                                align-items: center;
                                justify-content: left;
                                grid-gap: 8px;
                              ">
                                      {{ option.label }}
                                    </div>
                                  </template>

                                  <template v-slot:option="option">
                                    <span style="
                                display: flex;
                                align-items: center;
                                justify-content: left;
                                grid-gap: 8px;
                              ">
                                      {{ option.label }}
                                    </span>
                                  </template>
                                  <!-- <template #selected-option="option" v-if="clauseToSend !== ''">

                            <div style="
                                display: flex;
                                align-items: center;
                                justify-content: left;
                                grid-gap: 8px;
                              ">
                              {{ clauseToSend }}
                            </div>
                          </template>
                          <template #selected-option="option" v-else>

                            <div style="
                                display: flex;
                                align-items: center;
                                justify-content: left;
                                grid-gap: 8px;
                              ">
                              {{ option }}
                            </div>
                          </template>

                          <template v-slot:option="option">
                            <span style="
                                display: flex;
                                align-items: center;
                                justify-content: left;
                                grid-gap: 8px;
                              ">
                              {{ option }}
                            </span>
                          </template> -->
                                </v-select>
                                <small class="text-danger">{{ errors[0] }}</small>
                              </validation-provider></span>
                          </p>
                        </div>
                        <b-row class="mt-2">
                          <b-col cols="12" md="7" class="mt-md-6 d-flex ml-5 pl-4 pt-3" order="2" order-md="1">
                            <h1 class="invoiceTypeHeading">
                              {{ $t("add_invoice." + invoiceData.invoiceType) }}
                            </h1>
                          </b-col>
                        </b-row>
                      </div>
                      <div class="tm_right_footer">
                        <div class="invoice-total-wrapper">
                          <div class="invoice-total-item">
                            <p class="invoice-total-title">
                              {{ $t("add_invoice.total_price_non_vat") }}:
                            </p>
                            <p class="invoice-total-amount">
                              <validation-provider #default="{ errors }" name="amountNonVat" rules="required">
                                <b-input-group class="input-group-merge invoice-edit-input-group">
                                  <b-input-group-prepend is-text>
                                    <span>{{ invoiceData.currency }}</span>
                                  </b-input-group-prepend>

                                  <b-form-input v-model="invoiceData.amountNonVat" disabled />
                                </b-input-group>
                                <small class="text-danger">{{
                                  errors[0]
                                }}</small>
                              </validation-provider>
                            </p>
                          </div>
                          <div class="invoice-total-item">
                            <p class="invoice-total-title">
                              {{ $t("add_invoice.vat") }}:
                            </p>
                            <p class="invoice-total-amount">
                              <validation-provider #default="{ errors }" name="vat" ref="vatPercent">
                                <b-input-group class="input-group-merge invoice-edit-input-group">
                                  <b-form-input v-model="invoiceData.vatPercent" step="any" type="number"
                                    class="text-right" @input="populateValues()" />

                                  <b-input-group-append is-text>
                                    <span>%</span>
                                  </b-input-group-append>
                                </b-input-group>
                                <small class="text-danger">{{
                                  errors[0]
                                }}</small>
                              </validation-provider>
                            </p>
                          </div>
                          <div class="invoice-total-item">
                            <p class="invoice-total-title">
                              {{ $t("company_invoices.vat_amount") }}:
                            </p>
                            <p class="invoice-total-amount">
                              <validation-provider #default="{ errors }" name="vatPercent" rules="required">
                                <b-input-group class="input-group-merge invoice-edit-input-group">
                                  <b-input-group-prepend is-text>
                                    <span>{{ invoiceData.currency }}</span>
                                  </b-input-group-prepend>

                                  <b-form-input v-model="invoiceData.vatAmount" type="number" disabled />
                                </b-input-group>
                                <small class="text-danger">{{
                                  errors[0]
                                }}</small>
                              </validation-provider>
                            </p>
                          </div>
                          <div class="invoice-total-item">
                            <p class="invoice-total-title">
                              {{ $t("add_invoice.discount_percent") }}:
                            </p>
                            <p class="invoice-total-amount">
                              <validation-provider #default="{ errors }" name="tradeDiscountPercent" rules="required">
                                <b-input-group class="input-group-merge invoice-edit-input-group">
                                  <b-form-input v-model="invoiceData.tradeDiscountPercent" step="any" type="number"
                                    class="text-right" @input="populateValues()" />

                                  <b-input-group-append is-text>
                                    <span>%</span>
                                  </b-input-group-append>
                                </b-input-group>
                                <small class="text-danger">{{
                                  errors[0]
                                }}</small>
                              </validation-provider>
                            </p>
                          </div>
                          <div class="invoice-total-item">
                            <p class="invoice-total-title">
                              {{ $t("add_invoice.discount_sum") }}:
                            </p>
                            <p class="invoice-total-amount">
                              <validation-provider #default="{ errors }" name="tradeDiscountAmount" rules="required">
                                <b-input-group class="input-group-merge invoice-edit-input-group">
                                  <b-input-group-prepend is-text>
                                    <span>{{ invoiceData.currency }}</span>
                                  </b-input-group-prepend>

                                  <b-form-input v-model="invoiceData.tradeDiscountAmount" disabled />
                                </b-input-group>
                                <small class="text-danger">{{
                                  errors[0]
                                }}</small>
                              </validation-provider>
                            </p>
                          </div>
                          <div class="invoice-total-item">
                            <p class="invoice-total-title font-weight-bolder custom-font">
                              {{ $t("add_invoice.total_price") }}:
                            </p>
                            <p class="invoice-total-amount">
                              <validation-provider #default="{ errors }" name="totalPrice" rules="required">
                                <b-input-group class="input-group-merge invoice-edit-input-group">
                                  <b-input-group-prepend is-text>
                                    <span>{{ invoiceData.currency }}</span>
                                  </b-input-group-prepend>

                                  <b-form-input v-model="invoiceData.totalAmount" disabled
                                    class="opacity-1 font-weight-bolder custom-font" />
                                </b-input-group>
                                <small class="text-danger">{{
                                  errors[0]
                                }}</small>
                              </validation-provider>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </b-col>

          <!-- template 03 -->
          <b-col cols="12" xl="10" md="10" v-if="invoiceData.templateId == '3'">
            <div class="tm_container">
              <div class="tm_invoice_wrap">
                <div class="tm_invoice tm_style1 tm_type2" id="tm_download_section">
                  <div class="tm_bars">
                    <span :class="isBlue === true
                      ? 'tm_accent_bg'
                      : isGreen === true
                        ? 'green_bg'
                        : isPurple === true
                          ? 'purple_bg'
                          : isOrange === true
                            ? 'orange_bg'
                            : 'gray_bg'
                      "></span>
                    <span :class="isBlue === true
                      ? 'tm_accent_bg'
                      : isGreen === true
                        ? 'green_bg'
                        : isPurple === true
                          ? 'purple_bg'
                          : isOrange === true
                            ? 'orange_bg'
                            : 'gray_bg'
                      "></span>
                    <span :class="isBlue === true
                      ? 'tm_accent_bg'
                      : isGreen === true
                        ? 'green_bg'
                        : isPurple === true
                          ? 'purple_bg'
                          : isOrange === true
                            ? 'orange_bg'
                            : 'gray_bg'
                      "></span>
                  </div>
                  <div class="tm_bars tm_type1">
                    <span :class="isBlue === true
                      ? 'tm_accent_bg'
                      : isGreen === true
                        ? 'green_bg'
                        : isPurple === true
                          ? 'purple_bg'
                          : isOrange === true
                            ? 'orange_bg'
                            : 'gray_bg'
                      "></span>
                    <span :class="isBlue === true
                      ? 'tm_accent_bg'
                      : isGreen === true
                        ? 'green_bg'
                        : isPurple === true
                          ? 'purple_bg'
                          : isOrange === true
                            ? 'orange_bg'
                            : 'gray_bg'
                      "></span>
                    <span :class="isBlue === true
                      ? 'tm_accent_bg'
                      : isGreen === true
                        ? 'green_bg'
                        : isPurple === true
                          ? 'purple_bg'
                          : isOrange === true
                            ? 'orange_bg'
                            : 'gray_bg'
                      "></span>
                  </div>
                  <div class="tm_shape">
                    <div class="tm_shape_in" :class="isBlue === true
                      ? 'tm_accent_bg'
                      : isGreen === true
                        ? 'green_bg'
                        : isPurple === true
                          ? 'purple_bg'
                          : isOrange === true
                            ? 'orange_bg'
                            : 'gray_bg'
                      "></div>
                  </div>
                  <div class="tm_shape_2 tm_primary_color">
                    <div class="tm_shape_2_in tm_accent_color" :style="isBlue === true
                      ? 'color: #007aff;'
                      : isGreen === true
                        ? 'color: #8fce00'
                        : isPurple === true
                          ? 'color: #ad3978'
                          : isOrange === true
                            ? 'color: #FFA500'
                            : 'color: #f6d1ff'
                      "></div>
                  </div>
                  <div class="tm_shape_2 tm_type1 tm_primary_color">
                    <div class="tm_shape_2_in tm_accent_color" :style="isBlue === true
                      ? 'color: #007aff;'
                      : isGreen === true
                        ? 'color: #8fce00'
                        : isPurple === true
                          ? 'color: #ad3978'
                          : isOrange === true
                            ? 'color: #FFA500'
                            : 'color: #f6d1ff'
                      "></div>
                  </div>
                  <!-- <div class="tm_shape_4 tm_primary_bg"></div> -->
                  <div class="tm_shape tm_type1">
                    <div class="tm_shape_in" :class="isBlue === true
                      ? 'tm_accent_bg'
                      : isGreen === true
                        ? 'green_bg'
                        : isPurple === true
                          ? 'purple_bg'
                          : isOrange === true
                            ? 'orange_bg'
                            : 'gray_bg'
                      "></div>
                  </div>
                  <div class="tm_invoice_in">
                    <div class="tm_invoice_head tm_align_center tm_mb20">
                      <div class="tm_invoice_left">
                        <div class="tm_logo">
                          <!-- <img src="assets/img/logo.svg" alt="Logo" /> -->
                          <div>
                            <b-img :src="logoToUpload" fluid class="mr-1" style="
                                width: 80px;
                                height: 80px;
                                border: 1px solid black;
                              " v-if="showLogo" />
                            <feather-icon v-if="showLogo" size="16" icon="XSquareIcon" color="red" class="cursor-pointer"
                              style="position: absolute; left: 70px; top: -7px" @click="() => {
                                showLogo = false;
                                logoToUpload = '';
                                isUploading = i18n.tc(
                                  'add_invoice.upload_logo'
                                );
                                invoiceData.logoId = '';
                              }
                                " />
                            <span>
                              <label for="invoiceLogo3">
                                <div style="
                                    border: 1px solid white;
                                    padding: 10px;
                                    border-radius: 30px;

                                    cursor: pointer;
                                  " :class="isBlue === true
                                    ? 'tm_accent_bg'
                                    : isGreen === true
                                      ? 'green_bg'
                                      : isPurple === true
                                        ? 'purple_bg'
                                        : isOrange === true
                                          ? 'orange_bg'
                                          : 'gray_bg'
                                    " :style="isGray === true
    ? 'color: black !important'
    : 'color: white !important'
    ">
                                  {{ isUploading }}
                                </div>
                              </label>
                              <input type="file" name="invoiceLogo3" id="invoiceLogo3"
                                style="display: none; visibility: none" @change="updateLogo" accept="image/*" />
                            </span>
                          </div>
                        </div>
                      </div>
                      <div class="tm_invoice_right tm_text_right"></div>
                    </div>
                    <div class="tm_invoice_info tm_mb20">
                      <div class="tm_invoice_info_list">
                        <p class="tm_invoice_date tm_m0">
                          <!-- Date: -->
                          {{ $t("add_invoice.date") }}:

                          <span>
                            <validation-provider #default="{ errors }" name="dateIssued" rules="required">
                              <flat-pickr v-model="invoiceData.dateIssued"
                                class="form-control invoice-edit-input invoice-input-top" />
                              <feather-icon v-if="invoiceData.dateIssued === ''" size="16" icon="CalendarIcon"
                                class="cursor-pointer" style="position: relative; bottom: 31px; left: 188px;" />
                              <feather-icon v-else size="16" icon="XIcon" class="cursor-pointer"
                                style="position: relative; bottom: 31px; left: 188px;"
                                @click="invoiceData.dateIssued = ''" />
                              <small class="text-danger">{{ errors[0] }}</small>
                            </validation-provider>
                          </span>
                        </p>
                        <div class="d-flex align-items-center mb-0">
                          <span class="title mr-1">
                            {{ $t("add_invoice.due_date") }}:
                          </span>
                          <!-- <validation-provider #default="{ errors }" name="dueDate" rules="required"> -->
                          <flat-pickr v-model="invoiceData.dueDate"
                            class="form-control invoice-edit-input invoice-input-top" />
                          <feather-icon v-if="invoiceData.dueDate === ''" size="16" icon="CalendarIcon"
                            class="cursor-pointer" style="position: relative; bottom: 31px; left: 148px;" />
                          <feather-icon v-else size="16" icon="XIcon" class="cursor-pointer "
                            style="position: relative; left: -23px;" @click="invoiceData.dueDate = ''" />
                          <!-- <small class="text-danger">{{ errors[0] }}</small>
                        </validation-provider> -->
                        </div>
                        <p class="tm_invoice_number tm_m0">
                          <!-- Invoice No: -->
                          {{ $t("add_invoice.invoice") }}:

                          <span><validation-provider #default="{ errors }" name="invoiceNumber" vid="Invoice"
                              rules="required">
                              <b-input-group class="input-group-merge invoice-edit-input-group invoice-input-top">
                                <b-input-group-prepend is-text>
                                  <feather-icon icon="HashIcon" />
                                </b-input-group-prepend>

                                <b-form-input id="invoice-data-id" v-model="invoiceData.invoiceNumber" />
                              </b-input-group>
                              <small class="text-danger">{{ errors[0] }}</small>
                            </validation-provider>
                          </span>
                        </p>
                      </div>
                    </div>

                    <!-- Person/Company Switch -->
                    <div class="d-flex justify-content-between align-items-center mb-2 accountType">
                      <!-- @change="scheduleTypeOptionToggle(scheduleOptionToggleValue)"                 -->
                      <b-form-checkbox v-model="invoiceData.scheduled"
                        class="custom-control-primary custom-switch-btn mr-2" name="invoiceData.scheduled" switch>
                        <span class="switch-icon-left" style="width: 76px">{{ $t("add_invoice.scheduled") }}</span>
                        <span class="switch-icon-right" style="width: 76px">{{ $t("add_invoice.regular") }}</span>
                      </b-form-checkbox>
                      <b-card no-body class="invoice-preview date-issued mb-0 ml-0"
                        v-if="disabled = invoiceData.scheduled" style="width: 27%;">
                        <b-card-header class="justify-content-end">
                          <div class="mt-md-0 mt-2">
                            <div class="d-flex align-items-center mb-0">
                              <span class="title mr-1">
                                {{ $t("add_invoice.schedule_type") }}:
                              </span>
                              <validation-provider #default="{ errors }" name="scheduleType" rules="required">
                                <b-form-select :disabled="!invoiceData.scheduled"
                                  v-model="invoiceData.cronScheduleApi.scheduleType"
                                  @change="() => { companyIDisInvalid = false; }">
                                  <b-form-select-option value="WEEKLY">{{ $t("add_invoice.WEEKLY")
                                  }}</b-form-select-option>
                                  <b-form-select-option value="MONTHLY">{{ $t("add_invoice.MONTHLY")
                                  }}</b-form-select-option>
                                </b-form-select>
                                <small class="text-danger">{{ errors[0] }}</small>
                              </validation-provider>
                            </div>
                          </div>
                        </b-card-header>
                      </b-card>
                      <b-form-radio v-model="AccountTypeOption" plain name="accountTypeoptions" value="company"
                        class="d-none">
                        <h5>{{ $t("add_invoice.company") }}</h5>
                      </b-form-radio>
                      <b-form-radio v-model="AccountTypeOption" plain name="accountTypeoptions" value="person"
                        class="d-none">
                        <h5>{{ $t("add_invoice.person") }}</h5>
                      </b-form-radio>

                      <b-form-checkbox v-model="AccountTypeOptionToggleValue"
                        @change="AccountTypeOptionToggle(AccountTypeOptionToggleValue)"
                        class="custom-control-primary custom-switch-btn" name="AccountTypeOptionToggle" switch>
                        <span class="switch-icon-left">
                          {{ $t("add_invoice.person") }}
                        </span>
                        <span class="switch-icon-right">
                          {{ $t("add_invoice.company") }}
                        </span>
                      </b-form-checkbox>
                    </div>

                    <!-- Schedule Type -->
                    <div class="d-flex justify-content-between align-items-center mb-2 schedule-type"
                      v-if='invoiceData.scheduled'>
                      <b-card v-if="invoiceData.cronScheduleApi.scheduleType == 'MONTHLY'" no-body
                        class="invoice-preview date-issued mb-0 ml-0 mr-auto">
                        <b-card-header class="justify-content-end">
                          <div class="mt-md-0 mt-2">
                            <div class="d-flex align-items-center mb-0">
                              <span class="title mr-1">
                                {{ $t("add_invoice.select_date") }}:
                              </span>
                              <validation-provider #default="{ errors }" name="dayOfMonth" rules="required">
                                <b-form-select v-model="invoiceData.cronScheduleApi.dayOfMonth"
                                  @change="() => { companyIDisInvalid = false; }" :options="dates">
                                  <b-form-select-option :value="date.value" v-for="(date, index) in dates" :key="index">{{
                                    date.text }}</b-form-select-option>
                                </b-form-select>
                                <small class="text-danger">{{ errors[0] }}</small>
                              </validation-provider>
                            </div>
                          </div>
                        </b-card-header>
                      </b-card>
                      <b-card v-if="invoiceData.cronScheduleApi.scheduleType == 'WEEKLY'" no-body
                        class="invoice-preview date-issued mb-0 ml-0 mr-auto">
                        <b-card-header class="justify-content-start">
                          <div class="w-100 mt-md-0 mt-2">
                            <div class="d-flex align-items-center mb-0">
                              <span class="title mr-1">
                                {{ $t("add_invoice.select_days") }}:
                              </span>
                              <!-- <validation-provider #default="{ errors }" name="dayOfWeek" rules="required"> -->
                              <div class="d-block">
                                <b-form-group class="d-flex w-100 mb-0" v-slot="{ ariaDescribedby }">
                                  <b-form-radio-group v-model="invoiceData.cronScheduleApi.dayOfWeek"
                                    @change="toggleDaySelected()" :options="days" class="d-flex"
                                    :aria-describedby="ariaDescribedby">
                                    <!-- <b-form-radio :value="day.value" v-for="(day, index) in days" :key="index">{{ day.text }}</b-form-radio> -->
                                  </b-form-radio-group>
                                </b-form-group>
                                <small class="text-danger d-flex w-100 pl-1" v-if="daySelected">The dayOfWeek field is
                                  required</small>
                              </div>
                              <!-- <small class="text-danger">{{ errors[0] }}</small>
                        </validation-provider> -->
                            </div>
                          </div>
                        </b-card-header>
                      </b-card>
                    </div>
                    <div class="tm_invoice_head tm_mb10">
                      <!-- Supplier -->
                      <div class="tm_invoice_left" style="width: 44%">
                        <p class="tm_mb2">
                          <b class="tm_primary_color"> {{ $t("add_invoice.supplier") }}:</b>
                        </p>
                        <validation-provider #default="{ errors }" name="supplierCompanyIdNumber" rules="required">
                          <b-form-input v-model="invoiceData.supplierCompany.companyEic" @input="
                            SearchCompanyEic(
                              invoiceData.supplierCompany.companyEic
                            )
                            " list="my-company_name" autocomplete="off" @blur="hideSuggestionEic()"
                            @focus="ShowSuggestionEic(datalistEic)" @mousedown="() => {
                              companyIDisInvalid = false;
                            }
                              " style="margin-bottom: 5px" placeholder="Supplier Company ID Number...." />
                          <b-list-group v-if="showSuggestionsEic" id="my-company_name" class="input-suggesstions">
                            <b-list-group-item v-for="data in datalistEic" :key="data.eic"
                              @click="autoCompletefnEic(data)" @mousedown="autoCompletefnEic(data)">
                              {{ data.eic }}
                            </b-list-group-item>
                          </b-list-group>
                          <small class="text-danger">{{ errors[0] }}</small>
                          <small class="text-danger" v-if="companyIDisInvalid === true">{{
                            $t("add_invoice.PleaseEnterTheCompanyID") }} {{
    companyName }}
                          </small>
                        </validation-provider>

                        <validation-provider #default="{ errors }" name="supplierCompanyOwner" rules="required">
                          <b-form-input v-model="invoiceData.supplierCompany.companyOwnerName
                            " autocomplete="off" style="margin-bottom: 5px"
                            :placeholder="$t('add_invoice.SupplierCompanyOwnerName')" />
                          <small class="text-danger">{{ errors[0] }}</small>
                        </validation-provider>

                        <validation-provider #default="{ errors }" name="supplierCompanyName" rules="required">
                          <b-form-input v-model="invoiceData.supplierCompany.companName"
                            :placeholder="$t('add_invoice.SupplierCompanyOwnerName')" @input="
                              SearchCompanyName(
                                invoiceData.supplierCompany.companName
                              )
                              " list="my-company_name" autocomplete="off" @blur="hideSuggestion()"
                            @focus="ShowSuggestion(datalist)" style="margin-bottom: 5px" />
                          <b-list-group v-if="showSuggestions" id="my-company_name" class="input-suggesstions">
                            <b-list-group-item v-for="data in datalist" :key="data.eic" @click="autoCompletefn(data)"
                              @mousedown="autoCompletefn(data)">
                              {{ data.company_name }}
                            </b-list-group-item>
                          </b-list-group>
                          <small class="text-danger">{{ errors[0] }}</small>
                        </validation-provider>

                        <validation-provider #default="{ errors }" name="supplierCompanyAddress" rules="required">
                          <b-form-input v-model="invoiceData.supplierCompany.companyAddress" autocomplete="off"
                            :placeholder="$t('add_invoice.SupplierCompanyAddress')" style="margin-bottom: 5px" />
                          <small class="text-danger">{{ errors[0] }}</small>
                        </validation-provider>
                        <div v-if="supplierVat">
                          <validation-provider #default="{ errors }" name="supplierVatNumber" rules="required">
                            <b-input-group class="input-group invoice-edit-input-group">
                              <b-form-input v-model="invoiceData.supplierCompany.companyVatEic
                                " autocomplete="off" style="margin-bottom: 5px" />
                            </b-input-group>
                            <small class="text-danger">{{ errors[0] }}</small>
                          </validation-provider>
                        </div>

                        <b-form-checkbox v-model="supplierVat" class="custom-control-primary custom-switch-btn-2"
                          name="check-button" switch>
                          <span class="switch-icon-left text-uppercase"> {{ $t("add_invoice.vat") }}</span>
                          <span class="switch-icon-right text-uppercase"> {{ $t("add_invoice.no_vat") }} </span>
                        </b-form-checkbox>
                      </div>
                      <div style="width: 12%">
                        <div @click="reverse" style="margin-left: 25px; position: relative; top: 27%; cursor: pointer">
                          <img src="@/assets/images/svg/repeat.svg" />
                        </div>
                      </div>
                      <!-- Recipient -->
                      <div class="tm_invoice_right tm_text_right" style="width: 44%">
                        <p class="tm_mb2">
                          <b class="tm_primary_color" style="padding-left: 3px"> {{ $t("add_invoice.recipient") }}:</b>
                        </p>

                        <!-- Company/Person Identification-->
                        <validation-provider #default="{ errors }" :name="AccountTypeOption == 'company'
                          ? 'recipientCompanyIdNumber'
                          : 'personIdNumber'
                          " rules="required">
                          <b-form-input v-if="AccountTypeOption == 'company'"
                            v-model="invoiceData.recipientCompany.companyEic" @input="
                              SearchCompanyEicRecipient(
                                invoiceData.recipientCompany.companyEic
                              )
                              " list="my-company_name" autocomplete="off" @blur="hideSuggestionEicRecipient()" @focus="
    ShowSuggestionEicRecipient(datalistEicRecipient)
    " style="margin-bottom: 5px" :placeholder="$t('add_invoice.RecipientCompanyIDNumber')" />
                          <b-list-group v-if="showSuggestionsEicRecipient" id="my-company_name"
                            class="input-suggesstions">
                            <b-list-group-item v-for="data in datalistEicRecipient" :key="data.eic"
                              @click="autoCompletefnEicRecipient(data)" @mousedown="autoCompletefnEicRecipient(data)">
                              {{ data.eic }}
                            </b-list-group-item>
                          </b-list-group>

                          <b-form-input v-if="AccountTypeOption == 'person'"
                            v-model="invoiceData.recipientCompany.companyEic" @input="
                              SearchCompanyPersonIdNumber(
                                invoiceData.recipientCompany.companyEic
                              )
                              " list="my-company_name" autocomplete="off" @blur="hideSuggestionPersonIdNumber()"
                            @focus="
                              ShowSuggestionPersonIdNumber(
                                datalistPersonIdNumber
                              )
                              " style="margin-bottom: 5px" :placeholder="$t('add_invoice.RecipientPersonIDNumber')" />
                          <b-list-group v-if="showSuggestionsPersonIdNumber" id="my-company_name"
                            class="input-suggesstions">
                            <b-list-group-item v-for="data in datalistPersonIdNumber" :key="data.eic"
                              @click="autoCompletefnPersonIdNumber(data)" @mousedown="autoCompletefnPersonIdNumber(data)">
                              {{ data.identificationNumber }}
                            </b-list-group-item>
                          </b-list-group>

                          <small class="text-danger">{{ errors[0] }}</small>
                        </validation-provider>

                        <validation-provider #default="{ errors }" name="recipientCompanyOwner" :rules="AccountTypeOption == 'company' ? 'required' : ''
                          ">
                          <b-form-input v-model="invoiceData.recipientCompany.companyOwnerName
                            " autocomplete="off" v-if="AccountTypeOption === 'company'" style="margin-bottom: 5px"
                            :placeholder="$t('add_invoice.RecipientCompanyOwnerName')" />
                        </validation-provider>

                        <validation-provider #default="{ errors }" :name="AccountTypeOption == 'company'
                          ? 'recipientCompanyName'
                          : 'personName'
                          " rules="required">
                          <b-form-input v-if="AccountTypeOption == 'company'"
                            v-model="invoiceData.recipientCompany.companName" @input="
                              SearchCompanyNameRecipient(
                                invoiceData.recipientCompany.companName
                              )
                              " list="my-company_name" autocomplete="off" @blur="hideSuggestionRecipient()"
                            @focus="ShowSuggestionRecipient(datalistRecipient)" style="margin-bottom: 5px"
                            :placeholder="$t('add_invoice.RecipientCompanyName')" />
                          <b-list-group v-if="showSuggestionsRecipient" id="my-company_name" class="input-suggesstions">
                            <b-list-group-item v-for="data in datalistRecipient" :key="data.eic"
                              @click="autoCompletefnRecipient(data)" @mousedown="autoCompletefnRecipient(data)">
                              {{ data.company_name }}
                            </b-list-group-item>
                          </b-list-group>
                          <b-form-input v-if="AccountTypeOption == 'person'" v-model="invoiceData.recipientCompany.companyOwnerName
                            " @input="
    SearchCompanyPerson(
      invoiceData.recipientCompany.companyOwnerName
    )
    " list="my-company_name" autocomplete="off" @blur="hideSuggestionPerson()"
                            @focus="ShowSuggestionPerson(datalistPerson)" style="margin-bottom: 5px"
                            :placeholder="$t('add_invoice.RecipientPersonName')" />
                          <b-list-group v-if="showSuggestionsPerson" id="my-company_name" class="input-suggesstions">
                            <b-list-group-item v-for="data in datalistPerson" :key="data.eic"
                              @click="autoCompletefnPerson(data)" @mousedown="autoCompletefnPerson(data)">
                              {{ data.firstMiddleAndLastName }}
                            </b-list-group-item>
                          </b-list-group>
                          <small class="text-danger">{{ errors[0] }}</small>
                        </validation-provider>

                        <validation-provider #default="{ errors }" :name="AccountTypeOption == 'company'
                          ? 'recipientCompanyAddress'
                          : 'personAddress'
                          " rules="required">
                          <b-form-input v-model="invoiceData.recipientCompany.companyAddress
                            " autocomplete="off" style="margin-bottom: 5px"
                            :placeholder="$t('add_invoice.RecipientCompanyAddress')" />
                          <small class="text-danger">{{ errors[0] }}</small>
                        </validation-provider>
                        <div v-if="AccountTypeOption == 'company' && recipientVat">
                          <validation-provider #default="{ errors }" name="recipientVatNumber" rules="required">
                            <b-input-group class="input-group invoice-edit-input-group" style="margin-bottom: 5px">
                              <b-form-input v-model="invoiceData.recipientCompany.companyVatEic
                                " autocomplete="off" :placeholder="$t('add_invoice.RecipientCompanyVATNumber')" />
                            </b-input-group>
                            <small class="text-danger">{{ errors[0] }}</small>
                          </validation-provider>
                        </div>

                        <b-form-checkbox v-if="AccountTypeOption == 'company'" v-model="recipientVat"
                          class="custom-control-primary custom-switch-btn-2" name="check-button" switch>
                          <span class="switch-icon-left text-uppercase"> {{ $t("add_invoice.vat") }}</span>
                          <span class="switch-icon-right text-uppercase"> {{ $t("add_invoice.no_vat") }} </span>
                        </b-form-checkbox>
                      </div>
                    </div>

                    <div class="d-flex justify-content-between align-items-center mb-2">
                      <b-card no-body class="invoice-preview date-issued mb-0 ml-0 border">
                        <b-card-header class="justify-content-end">
                          <div class="mt-md-0 mt-2">
                            <div class="d-flex align-items-center mb-0">
                              <span class="title mr-1">
                                {{ $t("company_invoices.transaction_type") }}:
                              </span>
                              <validation-provider #default="{ errors }" name="transectionType" rules="required">
                                <b-form-select v-model="invoiceData.transactionType" @change="() => {
                                  companyIDisInvalid = false;
                                }
                                  ">
                                  <b-form-select-option value="EXPENSE">{{
                                    $t("company_invoices.EXPENSE")
                                  }}</b-form-select-option>
                                  <b-form-select-option value="INCOME">{{
                                    $t("company_invoices.INCOME")
                                  }}</b-form-select-option>
                                </b-form-select>
                                <small class="text-danger">{{
                                  errors[0]
                                }}</small>
                              </validation-provider>
                            </div>
                          </div>
                        </b-card-header>
                      </b-card>
                      <b-form-checkbox v-model="InvoiceTypeOptionToggleValue" @change="
                        InvoiceTypeOptionToggle(InvoiceTypeOptionToggleValue)
                        " class="custom-control-primary custom-switch-btn-2 flex-1 text-right"
                        name="AccountTypeOptionToggle" switch>
                        <span class="switch-icon-left text-uppercase">
                          {{ $t("add_invoice.PROFORMA") }}
                        </span>
                        <span class="switch-icon-right text-uppercase">
                          {{ $t("add_invoice.ORIGINAL") }}
                        </span>
                      </b-form-checkbox>
                      <b-form-checkbox v-model="saleTypeOptionToggleValue" @change="
                        saleTypeOptionToggle(saleTypeOptionToggleValue)
                        " class="custom-control-primary custom-switch-btn-2 flex-1 text-right"
                        name="AccountTypeOptionToggle" switch>
                        <span class="switch-icon-left text-uppercase">
                          {{ $t("add_invoice.goods") }}
                        </span>
                        <span class="switch-icon-right text-uppercase">
                          {{ $t("add_invoice.service") }}
                        </span>
                      </b-form-checkbox>
                    </div>

                    <b-card no-body class="invoice-add-card mb-1 mt-2">
                      <!-- Items Section -->
                      <b-card-body class="invoice-padding form-item-section p-0">
                        <div ref="form" class="repeater-form h-auto border transaction-container"
                          :style="{ height: trHeight }">
                          <b-row ref="row" class="pb-0 m-0">
                            <!-- Item Form -->
                            <!-- ? This will be in loop => So consider below markup for single item -->
                            <b-col cols="12" class="p-0 border">
                              <!-- ? Flex to keep separate width for XIcon and SettingsIcon -->
                              <div class="d-none d-lg-flex p-custom" :class="isBlue === true
                                ? 'tm_accent_bg'
                                : isGreen === true
                                  ? 'green_bg'
                                  : isPurple === true
                                    ? 'purple_bg'
                                    : isOrange === true
                                      ? 'orange_bg'
                                      : 'gray_bg'
                                " :style="isGray === true
    ? 'color: black !important'
    : 'color: white !important'
    ">
                                <b-row class="flex-grow-1 px-1 invoice-add-transections">
                                  <!-- Single Item Form Headers -->
                                  <b-col cols="12" lg="1" class="tm_semi_bold">
                                    {{ $t("add_invoice.s_no") }}
                                  </b-col>
                                  <b-col cols="12" lg="4" class="tm_semi_bold">
                                    {{ $t("add_invoice.item_service") }}
                                  </b-col>
                                  <b-col cols="12" lg="1" class="tm_semi_bold">
                                    {{ $t("add_invoice.qty") }}
                                  </b-col>
                                  <b-col cols="12" lg="1" class="tm_semi_bold">
                                    {{ $t("add_invoice.measure") }}
                                  </b-col>
                                  <b-col cols="12" lg="2" class="tm_semi_bold">
                                    {{ $t("add_invoice.single_price") }}
                                  </b-col>
                                  <b-col cols="12" lg="1" class="tm_semi_bold">
                                    {{ $t("add_invoice.currency") }}
                                  </b-col>
                                  <b-col cols="12" lg="2" class="tm_semi_bold">
                                    {{ $t("add_invoice.total_price") }}
                                  </b-col>
                                </b-row>
                                <div class="form-item-action-col" />
                              </div>

                              <!-- Form Input Fields OR content inside bordered area  -->
                              <!-- ? Flex to keep separate width for XIcon and SettingsIcon -->
                              <div v-for="(
                                  item, index
                                ) in invoiceData.transactions" :key="index" class="d-flex px-custom">
                                <b-row class="flex-grow-1 py-1 px-1 invoice-add-transections">
                                  <!-- Single Item Form Headers -->
                                  <b-col cols="12" lg="1">
                                    <label class="d-inline d-lg-none">No.</label>

                                    <b-form-input :value="index + 1" type="text" class="mb-0 text-left" disabled
                                      style="background-color: #f5f6fa" />
                                  </b-col>

                                  <b-col cols="12" lg="4">
                                    <label class="d-inline d-lg-none">Item name or Service</label>
                                    <validation-provider #default="{ errors }" name="transectionServiceOrItemDescription"
                                      rules="required">
                                      <b-form-input v-model="item.serviceOrItemDescription" :dir="$store.state.appConfig.isRTL
                                        ? 'rtl'
                                        : 'ltr'
                                        " type="text" class="mb-0" />
                                      <small class="text-danger">{{
                                        errors[0]
                                      }}</small>
                                    </validation-provider>
                                  </b-col>
                                  <b-col cols="12" lg="1">
                                    <label class="d-inline d-lg-none">Qty</label>
                                    <validation-provider #default="{ errors }" name="transectionQuantity"
                                      rules="required">
                                      <b-form-input v-model="item.quantity" type="number" class="mb-0" placeholder="0"
                                        step="0.0000000001" @input="populateValues()" />
                                      <small class="text-danger">{{
                                        errors[0]
                                      }}</small>
                                    </validation-provider>
                                  </b-col>
                                  <b-col cols="12" lg="1">
                                    <label class="d-inline d-lg-none">Measure</label>
                                    <validation-provider #default="{ errors }" name="transectionMeasurement"
                                      rules="required">
                                      <b-form-select v-model="item.measurement" type="text" class="mb-0"
                                        :options="measureOptions" />
                                      <small class="text-danger">{{
                                        errors[0]
                                      }}</small>
                                    </validation-provider>
                                  </b-col>
                                  <b-col cols="12" lg="2">
                                    <label class="d-inline d-lg-none">Single Price</label>
                                    <validation-provider #default="{ errors }" name="transectionSingleAmountTransaction"
                                      rules="required|singlePriceValid">
                                      <b-input-group class="input-group-merge invoice-edit-input-group">
                                        <b-input-group-prepend is-text class="mb-0">
                                          <span>{{
                                            invoiceData.currency
                                          }}</span>
                                        </b-input-group-prepend>

                                        <b-form-input v-model="item.singleAmountTransaction" type="number" class="mb-0"
                                          step="any" placeholder="0.00" @input="populateValues()" />
                                      </b-input-group>
                                      <small class="text-danger">{{
                                        errors[0]
                                      }}</small>
                                    </validation-provider>
                                  </b-col>
                                  <b-col cols="12" lg="1">
                                    <label class="d-inline d-lg-none">Currency</label>
                                    <validation-provider #default="{ errors }" name="transectionCurrency"
                                      rules="required">
                                      <b-form-select v-model="invoiceData.currency" :options="currencyOptions">
                                      </b-form-select>
                                      <small class="text-danger">{{
                                        errors[0]
                                      }}</small>
                                    </validation-provider>
                                  </b-col>
                                  <b-col cols="12" lg="2">
                                    <label class="d-inline d-lg-none">Total Price</label>
                                    <validation-provider #default="{ errors }" name="transectionTotal" rules="required">
                                      <b-input-group class="input-group-merge invoice-edit-input-group">
                                        <b-input-group-prepend is-text class="mb-0">
                                          <span>{{
                                            invoiceData.currency
                                          }}</span>
                                        </b-input-group-prepend>
                                        <b-form-input :value="(
                                              parseFloat(
                                                item.singleAmountTransaction
                                              ) * parseFloat(item.quantity)
                                            ).toFixed(2)
                                            " disabled class="mb-0" style="background-color: #f5f6fa" />
                                      </b-input-group>
                                      <small class="text-danger">{{
                                        errors[0]
                                      }}</small>
                                    </validation-provider>
                                  </b-col>
                                </b-row>
                                <div class="d-flex justify-content-center py-50 px-25 position-relative top-custom">
                                  <feather-icon v-if="invoiceData.transactions.length !== 1" size="16" icon="Trash2Icon"
                                    class="cursor-pointer" @click="removeItem(index)" />
                                  <feather-icon v-if="invoiceData.transactions.length == 1" size="16" icon="Trash2Icon"
                                    class="cursor-pointer invisible" />
                                </div>
                              </div>
                            </b-col>
                          </b-row>
                        </div>
                      </b-card-body>
                    </b-card>

                    <b-button v-ripple.400="'rgba(255, 255, 255, 0.15)'" size="sm" @click="addNewItemInItemForm"
                      class="mb-2" style="
                        border: 1px solid white;
                        padding: 10px;
                        border-radius: 30px;
                      " :style="isBlue === true
                        ? 'background-color: #007aff !important; color: white !important'
                        : isGreen === true
                          ? 'background-color: #8fce00 !important; color: white !important'
                          : isPurple === true
                            ? 'background-color: #ad3978 !important; color: white !important'
                            : isOrange === true
                              ? 'background-color: #FFA500 !important; color: white !important'
                              : 'background-color: #f6d1ff !important; color: black !important'
                        ">
                      {{ $t("add_invoice.add_item") }}
                    </b-button>
                    <b-row class="mb-1">
                      <b-col>
                        <b-form-select v-model="bankProcess" :options="banks" id="invoice-bank" name="invoice-bank"
                          v-bind:placeholder="$t('Please select bank...')" :value="$store.state.selected"
                          @change="checkProcessType(bankProcess)">

                        </b-form-select>
                      </b-col>
                    </b-row>

                    <div class="tm_invoice_footer">
                      <div class="tm_left_footer">
                        <div v-if="isBank">
                          <!-- <p class="tm_mb2">
                            <b class="tm_primary_color">Payment info:</b>
                          </p> -->
                          <p class="tm_m0 d-inline-flex">
                            <span style="padding: 10px 10px 0px 0px; width: 60px"><b>BIC: </b>
                            </span>

                            <span>
                              <validation-provider #default="{ errors }" name="BIC" rules="required">
                                <b-form-input id="invoice-bic" v-model="invoiceData.bankApi.bic"
                                  :state="errors.length > 0 ? false : null" placeholder="BIC..." style="
                                    background: #fcfcfc;
                                    height: 30px;
                                    width: 200px;
                                  " />
                                <small class="text-danger">{{
                                  errors[0]
                                }}</small>
                              </validation-provider>
                            </span>
                          </p>
                          <br />
                          <p class="tm_m0 d-inline-flex" style="margin-top: 5px">
                            <span style="padding: 10px 10px 0px 0px; width: 60px"><b>IBAN: </b></span>

                            <span>
                              <validation-provider #default="{ errors }" name="IBAN" rules="required">
                                <b-form-input id="ivvoice-iban" v-model="invoiceData.bankApi.iban"
                                  :state="errors.length > 0 ? false : null" placeholder="IBAN..." style="
                                    background: #fcfcfc;
                                    height: 30px;
                                    width: 200px;
                                  " />
                                <small class="text-danger">{{
                                  errors[0]
                                }}</small>
                              </validation-provider>
                            </span>
                          </p>
                          <br />
                          <p class="tm_m0 d-inline-flex" style="margin-top: 2px">
                            <span style="padding: 10px 10px 0px 0px; width: 60px"><b>{{ $t("add_invoice.bank")
                            }}:</b></span>

                            <span style="width: 200px">
                              <validation-provider #default="{ errors }" name="bank" rules="required">
                                <b-form-input v-model="invoiceData.bankApi.name" id="invoice-bank" name="invoice-bank"
                                  v-bind:placeholder="$t('Please select bank...')
                                    " :value="$store.state.selected">

                                </b-form-input>
                                <small class="text-danger">{{
                                  errors[0]
                                }}</small>
                              </validation-provider>
                            </span>
                          </p>
                          <br />
                        </div>
                        <div v-if="companyName.companyVatNumber == null || companyName.companyVatNumber == ''">
                          <p class="tm_m0 d-inline-flex" style="margin-top: 10px">
                            <span style="width: 60px"><b>{{ $t("add_invoice.non_vat_clause") }}: </b></span>
                            <span style="width: 200px">
                              <validation-provider #default="{ errors }" name="non-vat-clause" rules="required">
                                <v-select v-model="invoiceData.vatCondition" :options="noVatClause" id="non-vat-clause"
                                  name="non-vat-clause" v-bind:placeholder="$t('Please select non-vat clause..')
                                    " :value="$store.state.selected" @input="selectVatClause()">
                                  <template #selected-option="option" v-if="clauseToSend != ''">

                                    <div style="
                                display: flex;
                                align-items: center;
                                justify-content: left;
                                grid-gap: 8px;
                              ">
                                      {{ clauseToSend }}
                                    </div>
                                  </template>
                                  <template #selected-option="option" v-else>
                                    <div style="
                                display: flex;
                                align-items: center;
                                justify-content: left;
                                grid-gap: 8px;
                              ">
                                      {{ option.label }}
                                    </div>
                                  </template>

                                  <template v-slot:option="option">
                                    <span style="
                                display: flex;
                                align-items: center;
                                justify-content: left;
                                grid-gap: 8px;
                              ">
                                      {{ option.label }}
                                    </span>
                                  </template>
                                  <!-- <template #selected-option="option" v-if="clauseToSend !== ''">

                            <div style="
                                display: flex;
                                align-items: center;
                                justify-content: left;
                                grid-gap: 8px;
                              ">
                              {{ clauseToSend }}
                            </div>
                          </template>
                          <template #selected-option="option" v-else>

                            <div style="
                                display: flex;
                                align-items: center;
                                justify-content: left;
                                grid-gap: 8px;
                              ">
                              {{ option }}
                            </div>
                          </template>

                          <template v-slot:option="option">
                            <span style="
                                display: flex;
                                align-items: center;
                                justify-content: left;
                                grid-gap: 8px;
                              ">
                              {{ option }}
                            </span>
                          </template> -->
                                </v-select>
                                <small class="text-danger">{{ errors[0] }}</small>
                              </validation-provider></span>
                          </p>
                        </div>
                        <b-row class="mt-2">
                          <b-col cols="12" md="7" class="mt-md-6 d-flex ml-5 pl-4 pt-3" order="2" order-md="1">
                            <h1 class="invoiceTypeHeading">
                              {{ $t("add_invoice." + invoiceData.invoiceType) }}
                            </h1>
                          </b-col>
                        </b-row>
                      </div>
                      <div class="tm_right_footer">
                        <div class="invoice-total-wrapper">
                          <div class="invoice-total-item" style="justify-content: right">
                            <p class="invoice-total-title">
                              {{ $t("add_invoice.total_price_non_vat") }}:
                            </p>
                            <p class="invoice-total-amount">
                              <validation-provider #default="{ errors }" name="amountNonVat" rules="required">
                                <b-input-group class="input-group-merge invoice-edit-input-group">
                                  <b-input-group-prepend is-text>
                                    <span>{{ invoiceData.currency }}</span>
                                  </b-input-group-prepend>

                                  <b-form-input v-model="invoiceData.amountNonVat" disabled
                                    style="background-color: #f5f6fa" />
                                </b-input-group>
                                <small class="text-danger">{{
                                  errors[0]
                                }}</small>
                              </validation-provider>
                            </p>
                          </div>
                          <div class="invoice-total-item" style="justify-content: right">
                            <p class="invoice-total-title">
                              {{ $t("add_invoice.vat") }}:
                            </p>
                            <p class="invoice-total-amount">
                              <validation-provider #default="{ errors }" name="vat" ref="vatPercent">
                                <b-input-group class="input-group-merge invoice-edit-input-group">
                                  <b-form-input v-model="invoiceData.vatPercent" step="any" type="number"
                                    class="text-right" @input="populateValues()" />

                                  <b-input-group-append is-text>
                                    <span>%</span>
                                  </b-input-group-append>
                                </b-input-group>
                                <small class="text-danger">{{
                                  errors[0]
                                }}</small>
                              </validation-provider>
                            </p>
                          </div>
                          <div class="invoice-total-item" style="justify-content: right">
                            <p class="invoice-total-title">
                              {{ $t("company_invoices.vat_amount") }}:
                            </p>
                            <p class="invoice-total-amount">
                              <validation-provider #default="{ errors }" name="vatPercent" rules="required">
                                <b-input-group class="input-group-merge invoice-edit-input-group">
                                  <b-input-group-prepend is-text>
                                    <span>{{ invoiceData.currency }}</span>
                                  </b-input-group-prepend>

                                  <b-form-input v-model="invoiceData.vatAmount" type="number" disabled
                                    style="background-color: #f5f6fa" />
                                </b-input-group>
                                <small class="text-danger">{{
                                  errors[0]
                                }}</small>
                              </validation-provider>
                            </p>
                          </div>
                          <div class="invoice-total-item" style="justify-content: right">
                            <p class="invoice-total-title">
                              {{ $t("add_invoice.discount_percent") }}:
                            </p>
                            <p class="invoice-total-amount">
                              <validation-provider #default="{ errors }" name="tradeDiscountPercent" rules="required">
                                <b-input-group class="input-group-merge invoice-edit-input-group">
                                  <b-form-input v-model="invoiceData.tradeDiscountPercent" step="any" type="number"
                                    class="text-right" @input="populateValues()" />

                                  <b-input-group-append is-text>
                                    <span>%</span>
                                  </b-input-group-append>
                                </b-input-group>
                                <small class="text-danger">{{
                                  errors[0]
                                }}</small>
                              </validation-provider>
                            </p>
                          </div>
                          <div class="invoice-total-item" style="justify-content: right">
                            <p class="invoice-total-title">
                              {{ $t("add_invoice.discount_sum") }}:
                            </p>
                            <p class="invoice-total-amount">
                              <validation-provider #default="{ errors }" name="tradeDiscountAmount" rules="required">
                                <b-input-group class="input-group-merge invoice-edit-input-group">
                                  <b-input-group-prepend is-text>
                                    <span>{{ invoiceData.currency }}</span>
                                  </b-input-group-prepend>

                                  <b-form-input v-model="invoiceData.tradeDiscountAmount" disabled
                                    style="background-color: #f5f6fa" />
                                </b-input-group>
                                <small class="text-danger">{{
                                  errors[0]
                                }}</small>
                              </validation-provider>
                            </p>
                          </div>
                          <div class="invoice-total-item" style="justify-content: right">
                            <p class="invoice-total-title font-weight-bolder custom-font">
                              {{ $t("add_invoice.total_price") }}:
                            </p>
                            <p class="invoice-total-amount">
                              <validation-provider #default="{ errors }" name="totalPrice" rules="required">
                                <b-input-group class="input-group-merge invoice-edit-input-group">
                                  <b-input-group-prepend is-text>
                                    <span>{{ invoiceData.currency }}</span>
                                  </b-input-group-prepend>

                                  <b-form-input v-model="invoiceData.totalAmount" disabled
                                    class="opacity-1 font-weight-bolder custom-font" style="background-color: #f5f6fa" />
                                </b-input-group>
                                <small class="text-danger">{{
                                  errors[0]
                                }}</small>
                              </validation-provider>
                            </p>
                          </div>
                        </div>

                        <div class="tm_shape_3 tm_accent_bg_10" style="z-index: -1"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </b-col>

          <!-- template 04 -->
          <b-col cols="12" xl="10" md="10" v-if="invoiceData.templateId == '4'">
            <div class="tm_container">
              <div class="tm_invoice_wrap">
                <div class="tm_invoice tm_style1 tm_type3" id="tm_download_section">
                  <div class="tm_shape_1" style="width: 100%">
                    <svg viewBox="0 0 850 151" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M850 0.889398H0V150.889H184.505C216.239 150.889 246.673 141.531 269.113 124.872L359.112 58.0565C381.553 41.3977 411.987 32.0391 443.721 32.0391H850V0.889398Z"
                        :fill="isBlue === true
                          ? '#007aff'
                          : isGreen === true
                            ? '#8fce00'
                            : isPurple === true
                              ? '#ad3978'
                              : isOrange === true
                                ? '#FFA500'
                                : '#f6d1ff'
                          " fill-opacity="1" />
                    </svg>
                  </div>
                  <div class="tm_shape_2" style="width: 100%">
                    <svg viewBox="0 0 850 151" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M0 150.889H850V0.889408H665.496C633.762 0.889408 603.327 10.2481 580.887 26.9081L490.888 93.7224C468.447 110.381 438.014 119.74 406.279 119.74H0V150.889Z"
                        :fill="isBlue === true
                          ? '#007aff'
                          : isGreen === true
                            ? '#8fce00'
                            : isPurple === true
                              ? '#ad3978'
                              : isOrange === true
                                ? '#FFA500'
                                : '#f6d1ff'
                          " fill-opacity="1" />
                    </svg>
                  </div>
                  <div class="tm_invoice_in">
                    <div class="tm_invoice_head tm_align_center tm_mb20">
                      <div class="tm_invoice_left">
                        <div class="tm_logo">
                          <!-- <img src="./assets/img/logo.svg" alt="Logo" /> -->
                          <div>
                            <b-img :src="logoToUpload" fluid class="mr-1" style="
                                width: 80px;
                                height: 80px;
                                border: 1px solid black;
                              " v-if="showLogo" />
                            <feather-icon v-if="showLogo" size="16" icon="XSquareIcon" color="red" class="cursor-pointer"
                              style="position: absolute; left: 70px; top: -7px" @click="() => {
                                showLogo = false;
                                logoToUpload = '';

                                isUploading = i18n.tc('add_invoice.upload_logo');
                                invoiceData.logoId = '';
                              }
                                " />
                            <span>
                              <label for="invoiceLogo4">
                                <div style="
                                    background-color: white;
                                    border: 1px solidwhite;
                                    padding: 10px;
                                    border-radius: 30px;
                                    font-weight: 700px;
                                    cursor: pointer;
                                  ">
                                  {{ isUploading }}
                                </div>
                              </label>
                              <input type="file" name="invoiceLogo4" id="invoiceLogo4"
                                style="display: none; visibility: none" @change="updateLogo" accept="image/*" />
                            </span>
                          </div>
                        </div>
                      </div>
                      <div class="tm_invoice_right tm_text_right">
                        <div class="tm_primary_color tm_f50 tm_text_uppercase">
                          {{ $t("add_invoice.invoice") }}
                        </div>
                      </div>
                    </div>
                    <div class="tm_invoice_info tm_mb20">
                      <div class="tm_invoice_seperator">
                        <img src="assets/img/arrow_bg.svg" alt="" />
                      </div>
                      <div class="tm_invoice_info_list">
                        <p class="tm_invoice_number tm_m0" style="z-index: 9" :style="isGray === true
                          ? 'color: black !important'
                          : 'color: white !important'
                          ">
                          <!-- Invoice No: -->
                          {{ $t("add_invoice.invoice") }}:

                          <span><validation-provider #default="{ errors }" name="invoiceNumber" vid="Invoice"
                              rules="required">
                              <b-input-group class="input-group-merge invoice-edit-input-group invoice-input-top">
                                <b-input-group-prepend is-text>
                                  <feather-icon icon="HashIcon" />
                                </b-input-group-prepend>

                                <b-form-input id="invoice-data-id" v-model="invoiceData.invoiceNumber" />
                              </b-input-group>
                              <small class="text-danger">{{ errors[0] }}</small>
                            </validation-provider>
                          </span>
                        </p>
                        <p class="tm_invoice_date tm_m0" style="z-index: 9" :style="isGray === true
                          ? 'color: black !important'
                          : 'color: white !important'
                          ">
                          <!-- Date: -->
                          {{ $t("add_invoice.date") }}:

                          <span>
                            <validation-provider #default="{ errors }" name="dateIssued" rules="required">
                              <flat-pickr v-model="invoiceData.dateIssued"
                                class="form-control invoice-edit-input invoice-input-top" />
                              <feather-icon v-if="invoiceData.dateIssued === ''" size="16" icon="CalendarIcon"
                                class="cursor-pointer"
                                style="position: relative; bottom: 31px;left: 188px; color: #6e6b7b;" />
                              <feather-icon v-else size="16" icon="XIcon" class="cursor-pointer"
                                style="position: relative; bottom: 31px;left: 188px; color: #6e6b7b;"
                                @click="invoiceData.dateIssued = ''" />
                              <small class="text-danger">{{ errors[0] }}</small>
                            </validation-provider>
                          </span>
                        </p>
                        <p class="tm_invoice_date tm_m0" style="z-index: 9" :style="isGray === true
                          ? 'color: black !important'
                          : 'color: white !important'
                          ">
                          <!-- Date: -->
                          {{ $t("add_invoice.due_date") }}:
                          <span>
                            <flat-pickr v-model="invoiceData.dueDate"
                              class="form-control invoice-edit-input invoice-input-top" />
                            <feather-icon v-if="invoiceData.dueDate === ''" size="16" icon="CalendarIcon"
                              class="cursor-pointer"
                              style="position: relative; bottom: 31px;left: 188px; color: #6e6b7b;" />
                            <feather-icon v-else size="16" icon="XIcon" class="cursor-pointer"
                              style="position: relative; bottom: 31px;left: 188px; color: #6e6b7b;"
                              @click="invoiceData.dueDate = ''" />
                          </span>
                        </p>
                        <div class="tm_invoice_info_list_bg" :class="isBlue === true
                          ? 'tm_accent_bg'
                          : isGreen === true
                            ? 'green_bg'
                            : isPurple === true
                              ? 'purple_bg'
                              : isOrange === true
                                ? 'orange_bg'
                                : 'gray_bg'
                          "></div>
                      </div>
                    </div>

                    <!-- Person/Company Switch -->
                    <div class="d-flex justify-content-between align-items-center mb-2 accountType">
                      <!-- @change="scheduleTypeOptionToggle(scheduleOptionToggleValue)"                 -->
                      <b-form-checkbox v-model="invoiceData.scheduled"
                        class="custom-control-primary custom-switch-btn mr-2" name="invoiceData.scheduled" switch>
                        <span class="switch-icon-left" style="width: 76px">{{ $t("add_invoice.scheduled") }}</span>
                        <span class="switch-icon-right" style="width: 76px">{{ $t("add_invoice.regular") }}</span>
                      </b-form-checkbox>
                      <b-card no-body class="invoice-preview date-issued mb-0 ml-0"
                        v-if="disabled = invoiceData.scheduled" style="width: 27%;">
                        <b-card-header class="justify-content-end">
                          <div class="mt-md-0 mt-2">
                            <div class="d-flex align-items-center mb-0">
                              <span class="title mr-1">
                                {{ $t("add_invoice.schedule_type") }}:
                              </span>
                              <validation-provider #default="{ errors }" name="scheduleType" rules="required">
                                <b-form-select :disabled="!invoiceData.scheduled"
                                  v-model="invoiceData.cronScheduleApi.scheduleType"
                                  @change="() => { companyIDisInvalid = false; }">
                                  <b-form-select-option value="WEEKLY">{{ $t("add_invoice.WEEKLY")
                                  }}</b-form-select-option>
                                  <b-form-select-option value="MONTHLY">{{ $t("add_invoice.MONTHLY")
                                  }}</b-form-select-option>
                                </b-form-select>
                                <small class="text-danger">{{ errors[0] }}</small>
                              </validation-provider>
                            </div>
                          </div>
                        </b-card-header>
                      </b-card>
                      <b-form-radio v-model="AccountTypeOption" plain name="accountTypeoptions" value="company"
                        class="d-none">
                        <h5>{{ $t("add_invoice.company") }}</h5>
                      </b-form-radio>
                      <b-form-radio v-model="AccountTypeOption" plain name="accountTypeoptions" value="person"
                        class="d-none">
                        <h5>{{ $t("add_invoice.person") }}</h5>
                      </b-form-radio>

                      <b-form-checkbox v-model="AccountTypeOptionToggleValue"
                        @change="AccountTypeOptionToggle(AccountTypeOptionToggleValue)"
                        class="custom-control-primary custom-switch-btn" name="AccountTypeOptionToggle" switch>
                        <span class="switch-icon-left">
                          {{ $t("add_invoice.person") }}
                        </span>
                        <span class="switch-icon-right">
                          {{ $t("add_invoice.company") }}
                        </span>
                      </b-form-checkbox>
                    </div>

                    <!-- Schedule Type -->
                    <div class="d-flex justify-content-between align-items-center mb-2 schedule-type"
                      v-if='invoiceData.scheduled'>
                      <b-card v-if="invoiceData.cronScheduleApi.scheduleType == 'MONTHLY'" no-body
                        class="invoice-preview date-issued mb-0 ml-0 mr-auto">
                        <b-card-header class="justify-content-end">
                          <div class="mt-md-0 mt-2">
                            <div class="d-flex align-items-center mb-0">
                              <span class="title mr-1">
                                {{ $t("add_invoice.select_date") }}:
                              </span>
                              <validation-provider #default="{ errors }" name="dayOfMonth" rules="required">
                                <b-form-select v-model="invoiceData.cronScheduleApi.dayOfMonth"
                                  @change="() => { companyIDisInvalid = false; }" :options="dates">
                                  <b-form-select-option :value="date.value" v-for="(date, index) in dates" :key="index">{{
                                    date.text }}</b-form-select-option>
                                </b-form-select>
                                <small class="text-danger">{{ errors[0] }}</small>
                              </validation-provider>
                            </div>
                          </div>
                        </b-card-header>
                      </b-card>
                      <b-card v-if="invoiceData.cronScheduleApi.scheduleType == 'WEEKLY'" no-body
                        class="invoice-preview date-issued mb-0 ml-0 mr-auto" style="width: 27%;">
                        <b-card-header class="justify-content-start">
                          <div class="w-100 mt-md-0 mt-2">
                            <div class="d-flex align-items-center mb-0">
                              <span class="title mr-1">
                                {{ $t("add_invoice.select_days") }}:
                              </span>
                              <!-- <validation-provider #default="{ errors }" name="dayOfWeek" rules="required"> -->
                              <div class="d-block">
                                <b-form-group class="d-flex w-100 mb-0" v-slot="{ ariaDescribedby }">
                                  <b-form-radio-group v-model="invoiceData.cronScheduleApi.dayOfWeek"
                                    @change="toggleDaySelected()" :options="days" class="d-flex"
                                    :aria-describedby="ariaDescribedby">
                                    <!-- <b-form-radio :value="day.value" v-for="(day, index) in days" :key="index">{{ day.text }}</b-form-radio> -->
                                  </b-form-radio-group>
                                </b-form-group>
                                <small class="text-danger d-flex w-100 pl-1" v-if="daySelected">The dayOfWeek field is
                                  required</small>
                              </div>
                              <!-- <small class="text-danger">{{ errors[0] }}</small>
                        </validation-provider> -->
                            </div>
                          </div>
                        </b-card-header>
                      </b-card>
                    </div>

                    <div class="tm_invoice_head tm_mb10">
                      <!-- Supplier -->
                      <div class="tm_invoice_left" style="width: 44%">
                        <p class="tm_mb2">
                          <b class="tm_primary_color"> {{ $t("add_invoice.supplier") }}</b>
                        </p>
                        <validation-provider #default="{ errors }" name="supplierCompanyIdNumber" rules="required">
                          <b-form-input v-model="invoiceData.supplierCompany.companyEic" @input="
                            SearchCompanyEic(
                              invoiceData.supplierCompany.companyEic
                            )
                            " list="my-company_name" autocomplete="off" @blur="hideSuggestionEic()"
                            @focus="ShowSuggestionEic(datalistEic)" @mousedown="() => {
                              companyIDisInvalid = false;
                            }
                              " style="margin-bottom: 5px" />
                          <b-list-group v-if="showSuggestionsEic" id="my-company_name" class="input-suggesstions">
                            <b-list-group-item v-for="data in datalistEic" :key="data.eic"
                              @click="autoCompletefnEic(data)" @mousedown="autoCompletefnEic(data)">
                              {{ data.eic }}
                            </b-list-group-item>
                          </b-list-group>
                          <small class="text-danger">{{ errors[0] }}</small>
                          <small class="text-danger" v-if="companyIDisInvalid === true">{{
                            $t("add_invoice.PleaseEnterTheCompanyID") }} {{
    companyName }}
                          </small>
                        </validation-provider>

                        <validation-provider #default="{ errors }" name="supplierCompanyOwner" rules="required">
                          <b-form-input v-model="invoiceData.supplierCompany.companyOwnerName
                            " autocomplete="off" style="margin-bottom: 5px"
                            :placeholder="$t('add_invoice.SupplierCompanyOwnerName')" />
                          <small class="text-danger">{{ errors[0] }}</small>
                        </validation-provider>

                        <validation-provider #default="{ errors }" name="supplierCompanyName" rules="required">
                          <b-form-input v-model="invoiceData.supplierCompany.companName"
                            :placeholder="$t('add_invoice.SupplierCompanyOwnerName')" @input="
                              SearchCompanyName(
                                invoiceData.supplierCompany.companName
                              )
                              " list="my-company_name" autocomplete="off" @blur="hideSuggestion()"
                            @focus="ShowSuggestion(datalist)" style="margin-bottom: 5px" />
                          <b-list-group v-if="showSuggestions" id="my-company_name" class="input-suggesstions">
                            <b-list-group-item v-for="data in datalist" :key="data.eic" @click="autoCompletefn(data)"
                              @mousedown="autoCompletefn(data)">
                              {{ data.company_name }}
                            </b-list-group-item>
                          </b-list-group>
                          <small class="text-danger">{{ errors[0] }}</small>
                        </validation-provider>

                        <validation-provider #default="{ errors }" name="supplierCompanyAddress" rules="required">
                          <b-form-input v-model="invoiceData.supplierCompany.companyAddress" autocomplete="off"
                            :placeholder="$t('add_invoice.SupplierCompanyAddress')" style="margin-bottom: 5px" />
                          <small class="text-danger">{{ errors[0] }}</small>
                        </validation-provider>

                        <div v-if="supplierVat">
                          <validation-provider #default="{ errors }" name="supplierVatNumber" rules="required">
                            <b-input-group class="input-group invoice-edit-input-group">
                              <b-form-input v-model="invoiceData.supplierCompany.companyVatEic
                                " autocomplete="off" style="margin-bottom: 5px" />
                            </b-input-group>
                            <small class="text-danger">{{ errors[0] }}</small>
                          </validation-provider>
                        </div>

                        <b-form-checkbox v-model="supplierVat" class="custom-control-primary custom-switch-btn-2"
                          name="check-button" switch>
                          <span class="switch-icon-left text-uppercase"> {{ $t("add_invoice.vat") }}</span>
                          <span class="switch-icon-right text-uppercase"> {{ $t("add_invoice.no_vat") }} </span>
                        </b-form-checkbox>

                        <!-- Recipient -->
                      </div>
                      <div style="width: 12%">
                        <div @click="reverse" class="reverse-button"
                          style="margin-left: 25px; position: relative; top: 27%; cursor: pointer; cursor: pointer">
                          <img src="@/assets/images/svg/repeat.svg" />
                        </div>
                      </div>

                      <div class="tm_invoice_right tm_text_right" style="width: 44%">
                        <p class="tm_mb2">
                          <b class="tm_primary_color"> {{ $t("add_invoice.recipient") }}:</b>
                        </p>

                        <!-- Company/Person Identification-->
                        <validation-provider #default="{ errors }" :name="AccountTypeOption == 'company'
                          ? 'recipientCompanyIdNumber'
                          : 'personIdNumber'
                          " rules="required">
                          <b-form-input v-if="AccountTypeOption == 'company'"
                            v-model="invoiceData.recipientCompany.companyEic" @input="
                              SearchCompanyEicRecipient(
                                invoiceData.recipientCompany.companyEic
                              )
                              " list="my-company_name" autocomplete="off" @blur="hideSuggestionEicRecipient()" @focus="
    ShowSuggestionEicRecipient(datalistEicRecipient)
    " style="margin-bottom: 5px" :placeholder="$t('add_invoice.RecipientCompanyIDNumber')" />
                          <b-list-group v-if="showSuggestionsEicRecipient" id="my-company_name"
                            class="input-suggesstions">
                            <b-list-group-item v-for="data in datalistEicRecipient" :key="data.eic"
                              @click="autoCompletefnEicRecipient(data)" @mousedown="autoCompletefnEicRecipient(data)">
                              {{ data.eic }}
                            </b-list-group-item>
                          </b-list-group>

                          <b-form-input v-if="AccountTypeOption == 'person'"
                            v-model="invoiceData.recipientCompany.companyEic" @input="
                              SearchCompanyPersonIdNumber(
                                invoiceData.recipientCompany.companyEic
                              )
                              " list="my-company_name" autocomplete="off" @blur="hideSuggestionPersonIdNumber()"
                            @focus="
                              ShowSuggestionPersonIdNumber(
                                datalistPersonIdNumber
                              )
                              " style="margin-bottom: 5px" :placeholder="$t('add_invoice.RecipientPersonIDNumber')" />
                          <b-list-group v-if="showSuggestionsPersonIdNumber" id="my-company_name"
                            class="input-suggesstions">
                            <b-list-group-item v-for="data in datalistPersonIdNumber" :key="data.eic"
                              @click="autoCompletefnPersonIdNumber(data)" @mousedown="autoCompletefnPersonIdNumber(data)">
                              {{ data.identificationNumber }}
                            </b-list-group-item>
                          </b-list-group>

                          <small class="text-danger">{{ errors[0] }}</small>
                        </validation-provider>

                        <validation-provider #default="{ errors }" name="recipientCompanyOwner" :rules="AccountTypeOption == 'company' ? 'required' : ''
                          ">
                          <b-form-input v-model="invoiceData.recipientCompany.companyOwnerName
                            " autocomplete="off" v-if="AccountTypeOption === 'company'" style="margin-bottom: 5px"
                            :placeholder="$t('add_invoice.RecipientCompanyOwnerName')" />
                        </validation-provider>

                        <validation-provider #default="{ errors }" :name="AccountTypeOption == 'company'
                          ? 'recipientCompanyName'
                          : 'personName'
                          " rules="required">
                          <b-form-input v-if="AccountTypeOption == 'company'"
                            v-model="invoiceData.recipientCompany.companName" @input="
                              SearchCompanyNameRecipient(
                                invoiceData.recipientCompany.companName
                              )
                              " list="my-company_name" autocomplete="off" @blur="hideSuggestionRecipient()"
                            @focus="ShowSuggestionRecipient(datalistRecipient)" style="margin-bottom: 5px"
                            :placeholder="$t('add_invoice.RecipientCompanyName')" />
                          <b-list-group v-if="showSuggestionsRecipient" id="my-company_name" class="input-suggesstions">
                            <b-list-group-item v-for="data in datalistRecipient" :key="data.eic"
                              @click="autoCompletefnRecipient(data)" @mousedown="autoCompletefnRecipient(data)">
                              {{ data.company_name }}
                            </b-list-group-item>
                          </b-list-group>
                          <b-form-input v-if="AccountTypeOption == 'person'" v-model="invoiceData.recipientCompany.companyOwnerName
                            " @input="
    SearchCompanyPerson(
      invoiceData.recipientCompany.companyOwnerName
    )
    " list="my-company_name" autocomplete="off" @blur="hideSuggestionPerson()"
                            @focus="ShowSuggestionPerson(datalistPerson)" style="margin-bottom: 5px"
                            :placeholder="$t('add_invoice.RecipientPersonName')" />
                          <b-list-group v-if="showSuggestionsPerson" id="my-company_name" class="input-suggesstions">
                            <b-list-group-item v-for="data in datalistPerson" :key="data.eic"
                              @click="autoCompletefnPerson(data)" @mousedown="autoCompletefnPerson(data)">
                              {{ data.firstMiddleAndLastName }}
                            </b-list-group-item>
                          </b-list-group>
                          <small class="text-danger">{{ errors[0] }}</small>
                        </validation-provider>

                        <validation-provider #default="{ errors }" :name="AccountTypeOption == 'company'
                          ? 'recipientCompanyAddress'
                          : 'personAddress'
                          " rules="required">
                          <b-form-input v-model="invoiceData.recipientCompany.companyAddress
                            " autocomplete="off" style="margin-bottom: 5px"
                            :placeholder="$t('add_invoice.RecipientCompanyAddress')" />
                          <small class="text-danger">{{ errors[0] }}</small>
                        </validation-provider>
                        <div v-if="AccountTypeOption == 'company' && recipientVat">
                          <validation-provider #default="{ errors }" name="recipientVatNumber" rules="required">
                            <b-input-group class="input-group invoice-edit-input-group" style="margin-bottom: 5px">
                              <b-form-input v-model="invoiceData.recipientCompany.companyVatEic
                                " autocomplete="off" :placeholder="$t('add_invoice.RecipientCompanyVATNumber')" />
                            </b-input-group>
                            <small class="text-danger">{{ errors[0] }}</small>
                          </validation-provider>
                        </div>

                        <b-form-checkbox v-if="AccountTypeOption == 'company'" v-model="recipientVat"
                          class="custom-control-primary custom-switch-btn-2" name="check-button" switch>
                          <span class="switch-icon-left text-uppercase"> {{ $t("add_invoice.vat") }}</span>
                          <span class="switch-icon-right text-uppercase"> {{ $t("add_invoice.no_vat") }} </span>
                        </b-form-checkbox>
                      </div>
                    </div>

                    <div class="d-flex justify-content-between align-items-center mb-2">
                      <b-card no-body class="invoice-preview date-issued mb-0 ml-0 border">
                        <b-card-header class="justify-content-end">
                          <div class="mt-md-0 mt-2">
                            <div class="d-flex align-items-center mb-0">
                              <span class="title mr-1">
                                {{ $t("company_invoices.transaction_type") }}:
                              </span>
                              <validation-provider #default="{ errors }" name="transectionType" rules="required">
                                <b-form-select v-model="invoiceData.transactionType" @change="() => {
                                  companyIDisInvalid = false;
                                }
                                  ">
                                  <b-form-select-option value="EXPENSE">{{
                                    $t("company_invoices.EXPENSE")
                                  }}</b-form-select-option>
                                  <b-form-select-option value="INCOME">{{
                                    $t("company_invoices.INCOME")
                                  }}</b-form-select-option>
                                </b-form-select>
                                <small class="text-danger">{{
                                  errors[0]
                                }}</small>
                              </validation-provider>
                            </div>
                          </div>
                        </b-card-header>
                      </b-card>
                      <b-form-checkbox v-model="InvoiceTypeOptionToggleValue" @change="
                        InvoiceTypeOptionToggle(InvoiceTypeOptionToggleValue)
                        " class="custom-control-primary custom-switch-btn-2 flex-1 text-right"
                        name="AccountTypeOptionToggle" switch>
                        <span class="switch-icon-left text-uppercase">
                          {{ $t("add_invoice.PROFORMA") }}
                        </span>
                        <span class="switch-icon-right text-uppercase">
                          {{ $t("add_invoice.ORIGINAL") }}
                        </span>
                      </b-form-checkbox>
                      <b-form-checkbox v-model="saleTypeOptionToggleValue" @change="
                        saleTypeOptionToggle(saleTypeOptionToggleValue)
                        " class="custom-control-primary custom-switch-btn-2 flex-1 text-right"
                        name="AccountTypeOptionToggle" switch>
                        <span class="switch-icon-left text-uppercase">
                          {{ $t("add_invoice.goods") }}
                        </span>
                        <span class="switch-icon-right text-uppercase">
                          {{ $t("add_invoice.service") }}
                        </span>
                      </b-form-checkbox>
                    </div>

                    <b-card no-body class="invoice-add-card mb-1 mt-2">
                      <!-- Items Section -->
                      <b-card-body class="invoice-padding form-item-section p-0">
                        <div ref="form" class="repeater-form h-auto border transaction-container"
                          :style="{ height: trHeight }">
                          <b-row ref="row" class="pb-0 m-0">
                            <!-- Item Form -->
                            <!-- ? This will be in loop => So consider below markup for single item -->
                            <b-col cols="12" class="p-0 border">
                              <!-- ? Flex to keep separate width for XIcon and SettingsIcon -->
                              <div class="d-none d-lg-flex p-custom" :class="isBlue === true
                                ? 'tm_accent_bg'
                                : isGreen === true
                                  ? 'green_bg'
                                  : isPurple === true
                                    ? 'purple_bg'
                                    : isOrange === true
                                      ? 'orange_bg'
                                      : 'gray_bg'
                                " :style="isGray === true
    ? 'color: black !important'
    : 'color: white !important'
    ">
                                <b-row class="flex-grow-1 px-1 invoice-add-transections">
                                  <!-- Single Item Form Headers -->
                                  <b-col cols="12" lg="1" class="tm_semi_bold">
                                    {{ $t("add_invoice.s_no") }}
                                  </b-col>
                                  <b-col cols="12" lg="4" class="tm_semi_bold">
                                    {{ $t("add_invoice.item_service") }}
                                  </b-col>
                                  <b-col cols="12" lg="1" class="tm_semi_bold">
                                    {{ $t("add_invoice.qty") }}
                                  </b-col>
                                  <b-col cols="12" lg="1" class="tm_semi_bold">
                                    {{ $t("add_invoice.measure") }}
                                  </b-col>
                                  <b-col cols="12" lg="2" class="tm_semi_bold">
                                    {{ $t("add_invoice.single_price") }}
                                  </b-col>
                                  <b-col cols="12" lg="1" class="tm_semi_bold">
                                    {{ $t("add_invoice.currency") }}
                                  </b-col>
                                  <b-col cols="12" lg="2" class="tm_semi_bold">
                                    {{ $t("add_invoice.total_price") }}
                                  </b-col>
                                </b-row>
                                <div class="form-item-action-col" />
                              </div>

                              <!-- Form Input Fields OR content inside bordered area  -->
                              <!-- ? Flex to keep separate width for XIcon and SettingsIcon -->
                              <div v-for="(
                                  item, index
                                ) in invoiceData.transactions" :key="index" class="d-flex px-custom">
                                <b-row class="flex-grow-1 py-1 px-1 invoice-add-transections">
                                  <!-- Single Item Form Headers -->
                                  <b-col cols="12" lg="1">
                                    <label class="d-inline d-lg-none">No.</label>

                                    <b-form-input :value="index + 1" type="text" class="mb-0 text-left" disabled
                                      style="background-color: #f5f6fa" />
                                  </b-col>

                                  <b-col cols="12" lg="4">
                                    <label class="d-inline d-lg-none">Item name or Service</label>
                                    <validation-provider #default="{ errors }" name="transectionServiceOrItemDescription"
                                      rules="required">
                                      <b-form-input v-model="item.serviceOrItemDescription" :dir="$store.state.appConfig.isRTL
                                        ? 'rtl'
                                        : 'ltr'
                                        " type="text" class="mb-0" />
                                      <small class="text-danger">{{
                                        errors[0]
                                      }}</small>
                                    </validation-provider>
                                  </b-col>
                                  <b-col cols="12" lg="1">
                                    <label class="d-inline d-lg-none">Qty</label>
                                    <validation-provider #default="{ errors }" name="transectionQuantity"
                                      rules="required">
                                      <b-form-input v-model="item.quantity" type="number" class="mb-0" placeholder="0"
                                        step="0.0000000001" @input="populateValues()" />
                                      <small class="text-danger">{{
                                        errors[0]
                                      }}</small>
                                    </validation-provider>
                                  </b-col>
                                  <b-col cols="12" lg="1">
                                    <label class="d-inline d-lg-none">Measure</label>
                                    <validation-provider #default="{ errors }" name="transectionMeasurement"
                                      rules="required">
                                      <b-form-select v-model="item.measurement" type="text" class="mb-0"
                                        :options="measureOptions" />
                                      <small class="text-danger">{{
                                        errors[0]
                                      }}</small>
                                    </validation-provider>
                                  </b-col>
                                  <b-col cols="12" lg="2">
                                    <label class="d-inline d-lg-none">Single Price</label>
                                    <validation-provider #default="{ errors }" name="transectionSingleAmountTransaction"
                                      rules="required|singlePriceValid">
                                      <b-input-group class="input-group-merge invoice-edit-input-group">
                                        <b-input-group-prepend is-text class="mb-0">
                                          <span>{{
                                            invoiceData.currency
                                          }}</span>
                                        </b-input-group-prepend>

                                        <b-form-input v-model="item.singleAmountTransaction" type="number" class="mb-0"
                                          step="any" placeholder="0.00" @input="populateValues()" />
                                      </b-input-group>
                                      <small class="text-danger">{{
                                        errors[0]
                                      }}</small>
                                    </validation-provider>
                                  </b-col>
                                  <b-col cols="12" lg="1">
                                    <label class="d-inline d-lg-none">Currency</label>
                                    <validation-provider #default="{ errors }" name="transectionCurrency"
                                      rules="required">
                                      <b-form-select v-model="invoiceData.currency" :options="currencyOptions">
                                      </b-form-select>
                                      <small class="text-danger">{{
                                        errors[0]
                                      }}</small>
                                    </validation-provider>
                                  </b-col>
                                  <b-col cols="12" lg="2">
                                    <label class="d-inline d-lg-none">Total Price</label>
                                    <validation-provider #default="{ errors }" name="transectionTotal" rules="required">
                                      <b-input-group class="input-group-merge invoice-edit-input-group">
                                        <b-input-group-prepend is-text class="mb-0">
                                          <span>{{
                                            invoiceData.currency
                                          }}</span>
                                        </b-input-group-prepend>

                                        <b-form-input :value="(
                                              parseFloat(
                                                item.singleAmountTransaction
                                              ) * parseFloat(item.quantity)
                                            ).toFixed(2)
                                            " disabled class="mb-0" style="background-color: #f5f6fa" />
                                      </b-input-group>
                                      <small class="text-danger">{{
                                        errors[0]
                                      }}</small>
                                    </validation-provider>
                                  </b-col>
                                </b-row>
                                <div class="d-flex justify-content-center py-50 px-25 position-relative top-custom">
                                  <feather-icon v-if="invoiceData.transactions.length !== 1" size="16" icon="Trash2Icon"
                                    class="cursor-pointer" @click="removeItem(index)" />
                                  <feather-icon v-if="invoiceData.transactions.length == 1" size="16" icon="Trash2Icon"
                                    class="cursor-pointer invisible" />
                                </div>
                              </div>
                            </b-col>
                          </b-row>
                        </div>
                      </b-card-body>
                    </b-card>

                    <b-button v-ripple.400="'rgba(255, 255, 255, 0.15)'" size="sm" @click="addNewItemInItemForm"
                      class="mb-2" style="
                        border: 1px solid black;
                        padding: 10px;
                        border-radius: 30px;
                      " :style="isBlue === true
                        ? 'background-color: #007aff !important; color: white !important'
                        : isGreen === true
                          ? 'background-color: #8fce00 !important; color: white !important'
                          : isPurple === true
                            ? 'background-color: #ad3978 !important; color: white !important'
                            : isOrange === true
                              ? 'background-color: #FFA500 !important; color: white !important'
                              : 'background-color: #f6d1ff !important; color: black !important'
                        ">
                      {{ $t("add_invoice.add_item") }}
                    </b-button>

                    <b-row class="mb-1">
                      <b-col>
                        <b-form-select v-model="bankProcess" :options="banks" id="invoice-bank" name="invoice-bank"
                          v-bind:placeholder="$t('Please select bank...')" :value="$store.state.selected"
                          @change="checkProcessType(bankProcess)">

                        </b-form-select>
                      </b-col>
                    </b-row>

                    <div class="tm_invoice_footer mb-4 pb-4">
                      <div class="tm_left_footer">
                        <div v-if="isBank">
                          <!-- <p class="tm_mb2">
                            <b class="tm_primary_color">Payment info:</b>
                          </p> -->
                          <p class="tm_m0 d-inline-flex">
                            <span style="padding: 10px 10px 0px 0px; width: 60px"><b>BIC: </b>
                            </span>
                            <span>
                              <validation-provider #default="{ errors }" name="BIC" rules="required">
                                <b-form-input id="invoice-bic" v-model="invoiceData.bankApi.bic"
                                  :state="errors.length > 0 ? false : null" placeholder="BIC..." style="
                                    background: #fcfcfc;
                                    height: 30px;
                                    width: 200px;
                                  " />
                                <small class="text-danger">{{
                                  errors[0]
                                }}</small>
                              </validation-provider>
                            </span>
                          </p>
                          <br />
                          <p class="tm_m0 d-inline-flex" style="margin-top: 5px">
                            <span style="padding: 10px 10px 0px 0px; width: 60px"><b>IBAN: </b></span>
                            <span>
                              <validation-provider #default="{ errors }" name="IBAN" rules="required">
                                <b-form-input id="ivvoice-iban" v-model="invoiceData.bankApi.iban"
                                  :state="errors.length > 0 ? false : null" placeholder="IBAN..." style="
                                    background: #fcfcfc;
                                    height: 30px;
                                    width: 200px;
                                  " />
                                <small class="text-danger">{{
                                  errors[0]
                                }}</small>
                              </validation-provider>
                            </span>
                          </p>
                          <br />
                          <p class="tm_m0 d-inline-flex" style="margin-top: 2px">
                            <span style="padding: 10px 10px 0px 0px; width: 60px"><b>{{ $t("add_invoice.bank")
                            }}:</b></span>

                            <span style="width: 200px">
                              <validation-provider #default="{ errors }" name="bank" rules="required">
                                <b-form-input v-model="invoiceData.bankApi.name" id="invoice-bank" name="invoice-bank"
                                  v-bind:placeholder="$t('Please select bank...')
                                    " :value="$store.state.selected">

                                </b-form-input>
                                <small class="text-danger">{{
                                  errors[0]
                                }}</small>
                              </validation-provider>
                            </span>
                          </p>
                          <br />
                        </div>
                        <div v-if="companyName.companyVatNumber == null || companyName.companyVatNumber == ''">
                          <p class="tm_m0 d-inline-flex" style="margin-top: 10px">
                            <span style="width: 60px"><b>{{ $t("add_invoice.non_vat_clause") }}: </b></span>
                            <span style="width: 200px">
                              <validation-provider #default="{ errors }" name="non-vat-clause" rules="required">
                                <v-select v-model="invoiceData.vatCondition" :options="noVatClause" id="non-vat-clause"
                                  name="non-vat-clause" v-bind:placeholder="$t('Please select non-vat clause..')
                                    " :value="$store.state.selected" @input="selectVatClause()">
                                  <template #selected-option="option" v-if="clauseToSend != ''">

                                    <div style="
                                display: flex;
                                align-items: center;
                                justify-content: left;
                                grid-gap: 8px;
                              ">
                                      {{ clauseToSend }}
                                    </div>
                                  </template>
                                  <template #selected-option="option" v-else>
                                    <div style="
                                display: flex;
                                align-items: center;
                                justify-content: left;
                                grid-gap: 8px;
                              ">
                                      {{ option.label }}
                                    </div>
                                  </template>

                                  <template v-slot:option="option">
                                    <span style="
                                display: flex;
                                align-items: center;
                                justify-content: left;
                                grid-gap: 8px;
                              ">
                                      {{ option.label }}
                                    </span>
                                  </template>
                                  <!-- <template #selected-option="option" v-if="clauseToSend !== ''">

                            <div style="
                                display: flex;
                                align-items: center;
                                justify-content: left;
                                grid-gap: 8px;
                              ">
                              {{ clauseToSend }}
                            </div>
                          </template>
                          <template #selected-option="option" v-else>

                            <div style="
                                display: flex;
                                align-items: center;
                                justify-content: left;
                                grid-gap: 8px;
                              ">
                              {{ option }}
                            </div>
                          </template>

                          <template v-slot:option="option">
                            <span style="
                                display: flex;
                                align-items: center;
                                justify-content: left;
                                grid-gap: 8px;
                              ">
                              {{ option }}
                            </span>
                          </template> -->
                                </v-select>
                                <small class="text-danger">{{ errors[0] }}</small>
                              </validation-provider></span>
                          </p>
                        </div>
                        <b-row class="mt-2">
                          <b-col cols="12" md="7" class="mt-md-6 d-flex ml-5 pl-4 pt-3" order="2" order-md="1">
                            <h1 class="invoiceTypeHeading">
                              {{ $t("add_invoice." + invoiceData.invoiceType) }}
                            </h1>
                          </b-col>
                        </b-row>
                      </div>
                      <div class="tm_right_footer">
                        <div class="invoice-total-wrapper">
                          <div class="invoice-total-item">
                            <p class="invoice-total-title">
                              {{ $t("add_invoice.total_price_non_vat") }}:
                            </p>
                            <p class="invoice-total-amount">
                              <validation-provider #default="{ errors }" name="amountNonVat" rules="required">
                                <b-input-group class="input-group-merge invoice-edit-input-group">
                                  <b-input-group-prepend is-text>
                                    <span>{{ invoiceData.currency }}</span>
                                  </b-input-group-prepend>

                                  <b-form-input v-model="invoiceData.amountNonVat" disabled
                                    style="background-color: #f5f6fa" />
                                </b-input-group>
                                <small class="text-danger">{{
                                  errors[0]
                                }}</small>
                              </validation-provider>
                            </p>
                          </div>
                          <div class="invoice-total-item">
                            <p class="invoice-total-title">
                              {{ $t("add_invoice.vat") }}:
                            </p>
                            <p class="invoice-total-amount">
                              <validation-provider #default="{ errors }" name="vat" ref="vatPercent">
                                <b-input-group class="input-group-merge invoice-edit-input-group">
                                  <b-form-input v-model="invoiceData.vatPercent" step="any" type="number"
                                    class="text-right" @input="populateValues()" />

                                  <b-input-group-append is-text>
                                    <span>%</span>
                                  </b-input-group-append>
                                </b-input-group>
                                <small class="text-danger">{{
                                  errors[0]
                                }}</small>
                              </validation-provider>
                            </p>
                          </div>
                          <div class="invoice-total-item">
                            <p class="invoice-total-title">
                              {{ $t("company_invoices.vat_amount") }}:
                            </p>
                            <p class="invoice-total-amount">
                              <validation-provider #default="{ errors }" name="vatPercent" rules="required">
                                <b-input-group class="input-group-merge invoice-edit-input-group">
                                  <b-input-group-prepend is-text>
                                    <span>{{ invoiceData.currency }}</span>
                                  </b-input-group-prepend>

                                  <b-form-input v-model="invoiceData.vatAmount" type="number" disabled
                                    style="background-color: #f5f6fa" />
                                </b-input-group>
                                <small class="text-danger">{{
                                  errors[0]
                                }}</small>
                              </validation-provider>
                            </p>
                          </div>
                          <div class="invoice-total-item">
                            <p class="invoice-total-title">
                              {{ $t("add_invoice.discount_percent") }}:
                            </p>
                            <p class="invoice-total-amount">
                              <validation-provider #default="{ errors }" name="tradeDiscountPercent" rules="required">
                                <b-input-group class="input-group-merge invoice-edit-input-group">
                                  <b-form-input v-model="invoiceData.tradeDiscountPercent" step="any" type="number"
                                    class="text-right" @input="populateValues()" />

                                  <b-input-group-append is-text>
                                    <span>%</span>
                                  </b-input-group-append>
                                </b-input-group>
                                <small class="text-danger">{{
                                  errors[0]
                                }}</small>
                              </validation-provider>
                            </p>
                          </div>
                          <div class="invoice-total-item">
                            <p class="invoice-total-title">
                              {{ $t("add_invoice.discount_sum") }}:
                            </p>
                            <p class="invoice-total-amount">
                              <validation-provider #default="{ errors }" name="tradeDiscountAmount" rules="required">
                                <b-input-group class="input-group-merge invoice-edit-input-group">
                                  <b-input-group-prepend is-text>
                                    <span>{{ invoiceData.currency }}</span>
                                  </b-input-group-prepend>

                                  <b-form-input v-model="invoiceData.tradeDiscountAmount" disabled
                                    style="background-color: #f5f6fa" />
                                </b-input-group>
                                <small class="text-danger">{{
                                  errors[0]
                                }}</small>
                              </validation-provider>
                            </p>
                          </div>
                          <div class="invoice-total-item">
                            <p class="invoice-total-title font-weight-bolder custom-font">
                              {{ $t("add_invoice.total_price") }}:
                            </p>
                            <p class="invoice-total-amount">
                              <validation-provider #default="{ errors }" name="totalPrice" rules="required">
                                <b-input-group class="input-group-merge invoice-edit-input-group">
                                  <b-input-group-prepend is-text>
                                    <span>{{ invoiceData.currency }}</span>
                                  </b-input-group-prepend>

                                  <b-form-input v-model="invoiceData.totalAmount" disabled
                                    class="opacity-1 font-weight-bolder custom-font" style="background-color: #f5f6fa" />
                                </b-input-group>
                                <small class="text-danger">{{
                                  errors[0]
                                }}</small>
                              </validation-provider>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="tm_padd_15_20 pt-5">
                      <p class="tm_mb2"></p>
                      <ul class="tm_m0 tm_note_list"></ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </b-col>

          <!-- Right Col: Card -->
          <b-col cols="12" md="2" xl="2" class="invoice-actions mt-md-0 mt-2">
            <!-- Action Buttons -->
            <b-card>
              <!-- Button: DOwnload -->
              <b-button v-ripple.400="'rgba(113, 102, 240, 0.15)'" variant="outline-primary" class="mb-75" block
                type="button" :disabled="loading" @click="invoiceEdit(invoiceData, 'preview', AccountTypeOption)">
                {{ $t("add_invoice.preview") }}

              </b-button>

              <!-- Button: Print -->
              <b-button v-ripple.400="'rgba(113, 102, 240, 0.15)'" variant="outline-primary" block type="submit"
                :disabled="loading">
                <b-spinner v-if="loading" small variant="light" />
                {{ $t("add_invoice.save") }}
              </b-button>
              <b-button v-ripple.400="'rgba(113, 102, 240, 0.15)'" variant="outline-primary" block type="button"
                @click="clearForm">
                {{ $t("add_invoice.clear") }}
              </b-button>

              <b-button v-if="!invoiceData.verified" v-ripple.400="'rgba(113, 102, 240, 0.15)'" variant="outline-primary"
                type="button" block :disabled="loading" @click="invoiceEdit(invoiceData, 'verify', AccountTypeOption)">
                <b-spinner v-if="loading" small variant="light" />
                {{ $t("add_invoice.verify") }}
              </b-button>
            </b-card>

            <!-- cover -->
            <div class="row mb-2">
              <div class="ml-1 cursor-pointer" style="
                  height: 23px;
                  width: 23px;
                  background-color: #ad3978;
                  margin-right: 16px;
                " @click="applyCover(1)"></div>
              <div class="cursor-pointer" style="
                  height: 23px;
                  width: 23px;
                  background-color: #007aff;
                  margin-right: 16px;
                " @click="applyCover(2)"></div>
              <div class="cursor-pointer" style="
                  height: 23px;
                  width: 23px;
                  background-color: #8fce00;
                  margin-right: 16px;
                " @click="applyCover(3)"></div>
              <div class="cursor-pointer" style="
                  height: 23px;
                  width: 23px;
                  background-color: #ffa500;
                  margin-right: 16px;
                " @click="applyCover(4)"></div>
              <div class="cursor-pointer" style="
                  height: 23px;
                  width: 23px;
                  background-color: #f6d1ff;
                  margin-right: 16px;
                " @click="applyCover(5)"></div>
            </div>

            <!-- template 1 -->
            <b-img src="../../../../assets/images/templates/template-01.png" fluid alt="template-01" :style="`border: ${isTemplateOne ? '2px solid #0A64BC' : ''
              }; cursor: pointer`" @click="switchTemplates(1)"></b-img>
            <p class="text-center" style="padding-top: 5px">
              <b>Template 01</b>
            </p>

            <!-- template 2 -->
            <b-img src="../../../../assets/images/templates/template-02-03.png" fluid alt="template-01" :style="`border: ${isTemplateTwo ? '2px solid #0A64BC' : ''
              }; cursor: pointer`" @click="switchTemplates(2)"></b-img>
            <p class="text-center" style="padding-top: 5px">
              <b>Template 02</b>
            </p>

            <!-- template 3 -->
            <b-img src="../../../../assets/images/templates/template-03-09.png" fluid alt="template-01" class="mt-0"
              :style="`border: ${isTemplateThree ? '2px solid #0A64BC' : ''
                }; cursor: pointer`" @click="switchTemplates(3)"></b-img>
            <p class="text-center" style="padding-top: 5px">
              <b>Template 03</b>
            </p>

            <!-- template 4 -->
            <b-img src="../../../../assets/images/templates/template-04-10.png" fluid alt="template-01" class="mt-0"
              :style="`border: ${isTemplateFour ? '2px solid #0A64BC' : ''
                }; cursor: pointer`" @click="switchTemplates(4)"></b-img>
            <p class="text-center" style="padding-top: 5px">
              <b>Template 04</b>
            </p>

            <!-- template 5 -->
            <b-img src="../../../../assets/images/templates/template-05.png" fluid alt="template-01" class="mt-0" :style="`border: ${isTemplateFive ? '2px solid #0A64BC' : ''
              }; cursor: pointer`" @click="switchTemplates(5)"></b-img>
            <p class="text-center" style="padding-top: 5px">
              <b>Template 05</b>
            </p>
          </b-col>
        </b-row>
      </b-form>
    </validation-observer>
    <invoice-sidebar-add-new-customer />
  </section>
</template>

<!-- <script src="assets/js/jquery.min.js"></script>
<script src="assets/js/jspdf.min.js"></script>
<script src="assets/js/html2canvas.min.js"></script>
<script src="assets/js/main.js"></script> -->
<script>
import { ValidationProvider, ValidationObserver } from "vee-validate";
import {
  required,
  email,
  confirmed,
  password,
  regex,
  vatPercentValid,
  singlePriceValid,
  qtyValid,
} from "@validations";
import Logo from "@core/layouts/components/Logo.vue";
import { ref, onUnmounted, onMounted } from "@vue/composition-api";
import { heightTransition } from "@core/mixins/ui/transition";
import Ripple from "vue-ripple-directive";
import store from "@/store";
import TabList from "../../TabList.vue";
import {
  BRow,
  BCol,
  BCard,
  BCardHeader,
  BCardBody,
  BButton,
  BCardText,
  BForm,
  BFormSelect,
  BFormGroup,
  BFormInput,
  BInputGroup,
  BInputGroupPrepend,
  BInputGroupAppend,
  BFormTextarea,
  BFormCheckbox,
  BPopover,
  VBToggle,
  BSpinner,
  BFormRadio,
  BListGroup,
  BListGroupItem,
  BFormSelectOption,
  BFormRow,
  BImg,
  BFormFile,
  BFormRadioGroup,
} from "bootstrap-vue";
import vSelect from "vue-select";
import flatPickr from "vue-flatpickr-component";
import invoiceStoreModule from "../invoiceStoreModule";
import InvoiceSidebarAddNewCustomer from "../InvoiceSidebarAddNewCustomer.vue";
import useJwt from "@/auth/jwt/useJwt";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
import router from "@/router";
import { setTimeout } from "timers";
import axios from "@/libs/axios";
import { i18n } from "@/main.js";

export default {
  components: {
    BRow,
    BCol,
    BCard,
    BCardHeader,
    BCardBody,
    BButton,
    BCardText,
    BForm,
    BFormSelect,
    BFormGroup,
    BFormInput,
    BInputGroup,
    BInputGroupPrepend,
    BInputGroupAppend,
    BFormTextarea,
    BFormCheckbox,
    BPopover,
    flatPickr,
    vSelect,
    Logo,
    InvoiceSidebarAddNewCustomer,
    BSpinner,
    ValidationProvider,
    ValidationObserver,
    BFormRadio,
    BListGroup,
    BListGroupItem,
    TabList,
    BFormSelectOption,
    BFormRow,
    BImg,
    BFormFile,
    BFormRadioGroup,
  },
  data() {
    return {
      measureOptions: [
        'кг.',
        'гр.',
        'тон',
        'литър',
        'мл.',
        'стек',
        'бр.',
      ],
      bankProcess: '',
      banks: [],
      isUploading: i18n.tc("add_invoice.upload_logo"),

      isTemplateFive: true,
      isTemplateOne: false,
      isTemplateTwo: false,
      isTemplateThree: false,
      isTemplateFour: false,
      companyIDisInvalid: false,
      scheduleOptionToggleValue: false,
      scheduleTypes: ["WEEKLY", "MONTHLY"],
      dates: [{ value: null, text: 'Please select an option' }, { value: 1, text: "1" }, { value: 2, text: "2" }, { value: 3, text: "3" }, { value: 4, text: "4" }, { value: 5, text: "5" }, { value: 6, text: "6" }, { value: 7, text: "7" }, { value: 8, text: "8" }, { value: 9, text: "9" }, { value: 10, text: "10" }, { value: 11, text: "11" }, { value: 12, text: "12" }, { value: 13, text: "13" }, { value: 14, text: "14" }, { value: 15, text: "15" }, { value: 16, text: "16" }, { value: 17, text: "17" }, { value: 18, text: "18" }, { value: 19, text: "19" }, { value: 20, text: "20" }, { value: 21, text: "21" }, { value: 22, text: "22" }, { value: 23, text: "23" }, { value: 24, text: "24" }, { value: 25, text: "25" }, { value: 26, text: "26" }, { value: 27, text: "27" }, { value: 28, text: "28" }, { value: 29, text: "29" }, { value: 30, text: "30" }, { value: 31, text: "31" }],
      // days: [{ text: i18n.tc("company_info.MON"), value: "MON" }, { text: "TUE", value: "TUE" }, { text: "WED", value: "WED" }, { text: "THU", value: "THU" }, { text: "FRI", value: "FRI" }, { text: "SAT", value: "SAT" }, { text: "SUN", value: "SUN" }],
      daySelected: false,
      clauseToSend: "",
      bankNameToSend: "",
      // bankList: [
      //   { name: i18n.tc("add_invoice.bank-1") },
      //   { name: i18n.tc("add_invoice.bank-2") },
      //   { name: i18n.tc("add_invoice.bank-3") },
      //   { name: i18n.tc("add_invoice.bank-4") },
      //   { name: i18n.tc("add_invoice.bank-5") },
      // ],

      noVatClause: [
        "чл.113 ал.9 от ЗДДС",
        "чл.140 ал.1 от ЗДДС",
        "чл.86 ал.1 от ППЗДДС",
        "чл.21 ал.2 от ЗДДС",
        "чл.22 ал.3 от ЗДДС",
        "чл.22 ал.4 от ЗДДС",
        "чл.30 ал.1 т.1 от ЗДДС",
        "чл.39 от ЗДДС",
        "чл.28 т.1 от ЗДДС",
        "чл.28 т.2 от ЗДДС",
        "чл.86 ал.3 от ЗДДС",
        "чл.41 т.1a от ЗДДС",
        "чл.46 от ЗДДС",
        "чл.163 А ал.2 от ЗДДС",
        "чл.45 ал.1 от ЗДДС",
        "чл.143 от ЗДДС",
        "чл. 47 ал. 2 от ЗДДС",
        "чл.53 ал.1 от ЗДДС",
        "фирмата не е регистрирана по ЗДДС",
        "чл.29 ал.1 и ал.2 от ЗДДС",
        "Облагане на марж - туристически услуги",
        "Облагане на марж - туристически у-ги и чл.29  ал.1 и 2 от ЗДДС",
        "чл.47, т.2 от ЗДДС",
        "чл.113, ал.3 от ЗДДС",
        "чл.113, ал.3 от ЗДДС във връзка с чл. 10, ал.5 от ЗКПО",
        "чл.21, ал.4 от ЗДДС",
        "чл.50, ал.1 т.2 от ЗДДС",
        "чл.30 ал.2 от ЗДДС",
        "чл.31 т.6 от ЗДДС",
        "чл.36 ал.1 от ЗДДС",
        "чл.41 т.4 от ЗДДС",
        "чл.26, ал.2 от ЗДДС",
        "чл. 44, ал.1, т.1 от ЗДДС",
        "чл.45 ал.3 от ЗДДС",
        "чл.69 ал.2 от ЗДДС",
        "чл.3, ал.5 от ЗДДС",
        "чл.40, т.3 от ЗДДС",
        "чл.47 от ЗДДС",
        "чл.21, ал.5 от ЗДДС",
        "чл.173 от ЗДДС",
        "чл.66Б от ЗДДС",
        "чл.42 от ЗДДС",
        "чл.46, ал.1, т.1 от ЗДДС",
      ],
      loading: false,
      required,
      email,
      confirmed,
      password,
      regex,
      vatPercentValid,
      singlePriceValid,
      qtyValid,
      isWeekSelected: false
    };
  },
  directives: {
    Ripple,
    "b-toggle": VBToggle,
  },
  mixins: [heightTransition],
  mounted() {
    // this.initTrHeight();
    this.getPaymentProcess()
  },
  created() {
    // window.addEventListener("resize", this.initTrHeight);
  },
  destroyed() {
    // window.removeEventListener("resize", this.initTrHeight);
  },
  computed: {
    bankList() {
      return [
        { name: this.$t('add_invoice.bank-1') },
        { name: this.$t('add_invoice.bank-2') },
        { name: this.$t('add_invoice.bank-3') },
        { name: this.$t('add_invoice.bank-4') },
        { name: this.$t('add_invoice.bank-5') },
      ];
    },
    days() {
      return [
        { text: i18n.tc("company_info.MON"), value: "MON" },
        { text: i18n.tc("company_info.TUE"), value: "TUE" },
        { text: i18n.tc("company_info.WED"), value: "WED" },
        { text: i18n.tc("company_info.THU"), value: "THU" },
        { text: i18n.tc("company_info.FRI"), value: "FRI" },
        { text: i18n.tc("company_info.SAT"), value: "SAT" },
        { text: i18n.tc("company_info.SUN"), value: "SUN" }
      ]
    },
  },
  methods: {
    checkProcessType(type) {
      let self = this
      console.log(type, 'this sssss===>')
      if (type == 'BANK_TRANSFER') {
        this.isBank = true
        this.invoiceData.bankApi.name = self.companyData?.companyBankName
        this.invoiceData.bankApi.bic = self.companyData?.companyBankBic
      } else {
        this.isBank = false
      }
    },
    getPaymentProcess() {
      var config = {
        method: "get",
        url: "/account/api/invoice/get-payment-processes",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
          "Access-Control-Allow-Credentials": true,
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "http://localhost:8080",
        },

      };
      axios(config)
        .then((response) => {
          console.log(response.data);
          this.banks = response.data
          console.log(this.banks, 'there are banks')

        })
        .catch(function (error) { });
    },
    reverse() {

      let temp = this.invoiceData.supplierCompany
      this.invoiceData.supplierCompany = this.invoiceData.recipientCompany
      this.invoiceData.recipientCompany = temp

    },
    removeLogo() {
      this.showLogo = false;
      this.logoToUpload = '';
      this.isUploading = i18n.tc('add_invoice.upload_logo');
      this.invoiceData.logoId = '';
    },
    async updateLogo(e) {
      this.isUploading = i18n.tc("add_invoice.uploading");
      let self = this;
      const formData = new FormData();
      formData.append("file", e.target.files[0]);
      formData.append("companyId", router.currentRoute.params.companyId);

      const request = new XMLHttpRequest();
      const token = localStorage.getItem("accessToken");
      request.open(
        "POST",
        `${axios.defaults.baseURL}/binaries/api/store-binary/${this.$route.params.companyId}`
      );

      request.setRequestHeader("Authorization", `Bearer ${token}`);
      request.onload = function () {
        if (request.status >= 200 && request.status < 300) {
          var val = JSON.parse(request.response);
          // self.logoToUpload = val.binaryId;
          self.invoiceData.logoId = val.binaryId;

          //  display the logo
          axios
            .get(
              `${axios.defaults.baseURL}/binaries/api/get-binary/${val.binaryId}/${val.companyId}`,
              { responseType: "blob" }
            )
            .then((response) => {
              if (response.status === 200) {
                // console.log(response.data);
                const reader = new FileReader();
                reader.readAsDataURL(response.data);
                reader.onload = function () {
                  const filePath = reader.result;
                  self.logoToUpload = filePath;
                  self.showLogo = true;
                  console.log(self.showLogo);
                  self.isUploading = i18n.tc("add_invoice.change_logo");
                  // console.log(filePath);
                };
              }
            })
            .catch();
        } else {
          error("oh no");
          self.isUploading = i18n.tc("add_invoice.upload_logo");
        }
      };
      request.send(formData);
      return {
        abort: () => {
          request.abort();
          abort();
        },
      };
    },

    //
    applyCover(val) {
      if (val === 1) {
        this.isPurple = true;
        this.isBlue = false;
        this.isGreen = false;
        this.isOrange = false;
        this.isGray = false;
        this.invoiceData.invoiceColor = "PURPLE";
      } else if (val === 2) {
        this.isPurple = false;
        this.isBlue = true;
        this.isGreen = false;
        this.isOrange = false;
        this.isGray = false;
        this.invoiceData.invoiceColor = "BLUE";
      } else if (val === 3) {
        this.isPurple = false;
        this.isBlue = false;
        this.isGreen = true;
        this.isOrange = false;
        this.isGray = false;
        this.invoiceData.invoiceColor = "GREEN";
      } else if (val === 4) {
        this.isPurple = false;
        this.isBlue = false;
        this.isGreen = false;
        this.isOrange = true;
        this.isGray = false;
        this.invoiceData.invoiceColor = "ORANGE";
      } else {
        this.isPurple = false;
        this.isBlue = false;
        this.isGreen = false;
        this.isOrange = false;
        this.isGray = true;
        this.invoiceData.invoiceColor = "GRAY";
      }
    },

    //
    switchTemplates(val) {
      if (val === 1) {
        this.isTemplateOne = true;
        this.isTemplateTwo = false;
        this.isTemplateThree = false;
        this.isTemplateFour = false;
        this.isTemplateFive = false;
        this.invoiceData.templateId = 1;
      } else if (val === 2) {
        this.isTemplateOne = false;
        this.isTemplateTwo = true;
        this.isTemplateThree = false;
        this.isTemplateFour = false;
        this.isTemplateFive = false;
        this.invoiceData.templateId = 2;
      } else if (val === 3) {
        this.isTemplateOne = false;
        this.isTemplateTwo = false;
        this.isTemplateThree = true;
        this.isTemplateFour = false;
        this.isTemplateFive = false;
        this.invoiceData.templateId = 3;
      } else if (val === 4) {
        this.isTemplateOne = false;
        this.isTemplateTwo = false;
        this.isTemplateThree = false;
        this.isTemplateFour = true;
        this.isTemplateFive = false;
        this.invoiceData.templateId = 4;
      } else {
        this.isTemplateOne = false;
        this.isTemplateTwo = false;
        this.isTemplateThree = false;
        this.isTemplateFour = false;
        this.isTemplateFive = true;
        this.invoiceData.templateId = 5;
      }
    },
    selectVatClause() {
      if (this.invoiceData.vatCondition === null) {
        this.clauseToSend = "";
      } else {
        this.clauseToSend = this.invoiceData.vatCondition;
      }
    },
    selectBankName() {
      if (this.invoiceData.bankApi.name === null) {
        this.bankNameToSend = "";
      } else {
        this.bankNameToSend = this.invoiceData.bankApi.name.name;
      }
    },
    addNewItemInItemForm() {
      this.$refs.form.style.overflow = "hidden";
      this.invoiceData.transactions.push(
        JSON.parse(JSON.stringify(this.itemFormBlankItem))
      );
    },
    removeItem(index) {
      this.invoiceData.transactions.splice(index, 1);
    },
    initTrHeight() {
      this.trSetHeight(null);
      this.$nextTick(() => {
        this.trSetHeight(this.$refs.form.scrollHeight);
      });
    },
    toggleDaySelected() {
      this.daySelected = false;
    },

    invoiceEdit(invoiceData, redirectPage, AccountTypeOption) {




      // console.log('scheduleddd =====>', invoiceData.scheduled)

      // let schedule = {
      //   scheduleType: "",
      //   dayOfWeek: null,
      //   dayOfMonth: null,
      // };
      // if (this.isScheduled) {

      //   schedule.scheduleType = this.offCaseScheduleType;
      //   if (this.offCaseScheduleType == "MONTHLY") {
      //     schedule.dayOfMonth = this.offCaseScheduleDayOfMonth;
      //   } else {
      //     schedule.dayOfWeek = this.offCaseScheduleDayOfWeek;
      //   }
      //   invoiceData.cronScheduleApi = schedule;
      //   console.log(this.invoiceData);
      // }
      // return;
      if (invoiceData.scheduled == true) {

        if (invoiceData.cronScheduleApi !== null) {
          if (!invoiceData.cronScheduleApi.dayOfWeek) {


            this.isWeekSelected = true;
          } else {
            this.isWeekSelected = false;

          }
        }
      }

      // Company ID validation on the basis of transactionType
      if (invoiceData.transactionType === "INCOME") {
        let self = this
        this.companyIDisInvalid = false;
        if (invoiceData.supplierCompany.companyEic !== self.supplierID) {
          this.companyIDisInvalid = true;
        }
        if (invoiceData.supplierCompany.companyEic === "") {
          this.companyIDisInvalid = false;
        }
      } else {
        this.companyIDisInvalid = false;
      }

      if (this.bankNameToSend !== "") {
        invoiceData.bankApi.name = this.bankNameToSend;
      }

      // if (this.clauseToSend !== "") {
      //   invoiceData.vatCondition = this.clauseToSend;
      // }
      // if (this.hasBankDetails === false) {
      //   invoiceData.bankApi = {
      //     name: "",
      //     bic: "",
      //     iban: "",
      //   };
      // }

      if (invoiceData.vatPercent != 0) {
        invoiceData.vatCondition = "";
      }

      if (AccountTypeOption == "person") {
        invoiceData.recipientCompany.companName =
          invoiceData.recipientCompany.companyOwnerName;
        invoiceData.recipientCompany.companyVatEic = "";
      }

      invoiceData?.transactions?.map((item) => {
        item.transactionTotalAmountNonVat = (
          parseFloat(item.singleAmountTransaction) * parseFloat(item.quantity)
        ).toFixed(2);
        return item;
      });

      // if (this.isScheduled) {
      //   if (invoiceData.cronScheduleApi !== null) {
      //     if (invoiceData.cronScheduleApi.dayOfWeek) {
      //       this.daySelected = false;
      //     } else {
      //       this.daySelected = true;
      //     }
      //   }
      // } else {
      //   invoiceData.cronScheduleApi = null;
      // }
      let self = this
      console.log(self.isBank, 'banksssss')
      if (self.isBank == false) {
        invoiceData.bankApi = null
      }

      this.$refs.invoiceEditForm.validate().then((success) => {
        if (
          success &&
          this.companyIDisInvalid === false &&
          this.isWeekSelected === false
        ) {
          if (
            success &&
            this.isTemplateOne === false &&
            this.isTemplateTwo === false &&
            this.isTemplateThree === false &&
            this.isTemplateFour === false &&
            this.isTemplateFive === false
          ) {
            this.$toast({
              component: ToastificationContent,
              props: {
                title: `Please choose some template...`,
                icon: "EditIcon",
                variant: "danger",
              },
            });
          } else {
            this.loading = true;

            // if (!invoiceData.sechduled) {
            //   invoiceData.cronScheduleApi = null

            // }
            if (redirectPage == 'verify') {
              invoiceData.verified = true

            }

            let token = useJwt.getToken();
            useJwt
              .EditCompanyInvoice(
                token,
                router.currentRoute.params.id,
                router.currentRoute.params.companyId,
                invoiceData
              )
              .then((response) => {
                this.loading = false;
                // invoice.cronScheduleApi = {

                //   scheduleType: "",
                //   dayOfWeek: null,
                //   dayOfMonth: null,

                // };
                this.$toast({
                  component: ToastificationContent,
                  props: {
                    title: this.$t('invoice_details.invoice_updated_successfully'),
                    icon: "EditIcon",
                    variant: "success",
                  },
                });

                if (redirectPage == "invoices") {
                  return this.$router.push({
                    name: "CompanyView",
                    params: {
                      id: router.currentRoute.params.companyId,
                      InvoiceId: 1,
                    },
                  });
                } else if (redirectPage == "preview") {
                  return this.$router.push({
                    name: "company-invoice-preview",
                    params: {
                      id: invoiceData.id,
                      companyId: router.currentRoute.params.companyId,
                    },
                  });
                } else if (redirectPage == "verify") {
                  return this.$router.push({
                    name: "CompanyView",
                    params: {
                      id: router.currentRoute.params.companyId,
                      InvoiceId: 2,

                    },
                  });

                }

                else {
                  return true;
                }
              })
              .catch((error) => {
                this.loading = false;
                this.$toast({
                  component: ToastificationContent,
                  props: {
                    title: `${error.response.data.errorMessage}`,
                    icon: "AlertTriangleIcon",
                    variant: "danger",
                  },
                });
              });
          }
        }
      });
    },
    showMsgBoxTwo(id, invoiceData) {
      const h = this.$createElement;
      // Using HTML string
      // More complex structure
      const messageVNode = h("div", { class: ["bvModalFont"] }, [
        h("p", { class: ["text-center card-text"] }, [
          `${this.$t("protocol.description")}`,
        ]),
      ]);
      this.$bvModal
        .msgBoxConfirm([messageVNode], {
          title: `${this.$t("protocol.title")}`,
          okVariant: "primary",
          okTitle: `${this.$t("protocol.yes")}`,
          cancelTitle: `${this.$t("protocol.no")}`,
          hideHeaderClose: false,
          centered: true,
        })
        .then((value) => {
          if (value) {
            this.loading = true;
            invoiceData.invoiceNumber = "1" + invoiceData.invoiceNumber;
            invoiceData.documentType = "PROTOCOL";
            let token = useJwt.getToken();
            useJwt
              .addCompanyInvoice(
                token,
                router.currentRoute.params.companyId,
                invoiceData
              )
              .then((response) => {
                this.loading = false;

                this.$toast({
                  component: ToastificationContent,
                  props: {
                    title: `Protocol Added Successfully`,
                    icon: "EditIcon",
                    variant: "success",
                  },
                });
                this.$router.push({
                  name: "company-invoice-edit",
                  params: {
                    id: id,
                    companyId: router.currentRoute.params.companyId,
                  },
                });
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
          } else {
            this.$router.push({
              name: "company-invoice-edit",
              params: {
                id: id,
                companyId: router.currentRoute.params.companyId,
              },
            });
          }
        });
    },
  },
  setup() {
    const INVOICE_APP_STORE_MODULE_NAME = "app-invoice";

    // Register module
    if (!store.hasModule(INVOICE_APP_STORE_MODULE_NAME))
      store.registerModule(INVOICE_APP_STORE_MODULE_NAME, invoiceStoreModule);

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(INVOICE_APP_STORE_MODULE_NAME))
        store.unregisterModule(INVOICE_APP_STORE_MODULE_NAME);
    });
    // onMounted(() => {
    //   getCompanyInfo()
    // })
    var AccountTypeOption = ref("company");
    var AccountTypeOptionToggleValue = false;

    let AccountTypeOptionToggle = (value) => {
      if (value) {
        AccountTypeOption.value = "person";
      } else {
        AccountTypeOption.value = "company";
      }
    };
    const itemFormBlankItem = {
      serviceOrItemDescription: "",
      singleAmountTransaction: 0.0,
      quantity: 0,
      measurement: "",
      transactionTotalAmountNonVat: "",
    };

    const invoiceData = ref(null);

    const hasBankDetails = ref(false);


    const isTemplateFive = ref(false);
    const isTemplateOne = ref(false);
    const isTemplateTwo = ref(false);
    const isTemplateThree = ref(false);
    const isTemplateFour = ref(false);
    var supplierID = ref(null)
    var companyName = ref("");
    const isUploading = ref("");

    const showLogo = ref(null);

    const logoToUpload = ref("");

    const isBlue = ref(false);
    const isPurple = ref(false);
    const isGreen = ref(false);
    const isOrange = ref(false);
    const isGray = ref(false);
    const companyInfo = ref(null);
    const currencyOptions = [
      { value: "лв.", text: "лв." },
      { value: "$", text: "$" },
      { value: "€", text: "€" },
    ];
    const transectionOptions = [
      { value: "INCOME", text: "INCOME" },
      { value: "EXPENSE", text: "EXPENSE" },
    ];
    var supplierVat = ref(false);
    var recipientVat = ref(false);

    var InvoiceTypeOptionToggleValue = ref(null);
    var saleTypeOptionToggleValue = ref(null);
    var isBank = ref(false)

    let uploadValue = {
      companyOwnerName: "",
      companName: "",
      companyEic: "",
      companyVatEic: "",
      companyAddress: "",
      creatorName: "", // Add this
      recipientName: "", // Add this
      creatorSignature: "", // Add this if you have a signature
      recipientSignature: "", // Add this if you have a signature
    };
    var companyBankBic = ref(null)

    store
      .dispatch("app-invoice/fetchInvoice", {
        id: router.currentRoute.params.id,
      })
      .then((response) => {
        response.data.currency =
          response?.data?.currency?.toLowerCase().trim() == "lv"
            ? "лв."
            : response?.data?.currency?.toLowerCase().trim() == "bgn"
              ? "лв."
              : response.data.currency;



        invoiceData.value = response.data;
        if (invoiceData.value.bankApi != null) {

          isBank.value = true
        }
        companyBankBic.value = response.data?.companyBankBic;
        // if (invoiceData.value.scheduled == false) {
        //   let schedule = {
        //     scheduleType: "",
        //     dayOfWeek: null,
        //     dayOfMonth: null,
        //   };
        //   invoiceData.value.cronScheduleApi = schedule

        // }


        if (invoiceData.value.templateId === "1") {
          isTemplateOne.value = true;
        } else if (invoiceData.value.templateId === "2") {
          isTemplateTwo.value = true;

        } else if (invoiceData.value.templateId === "3") {
          isTemplateThree.value = true;
        } else if (invoiceData.value.templateId === "4") {
          isTemplateFour.value = true;
        } else {
          isTemplateFive.value = true;
        }

        if (invoiceData.value.invoiceColor === "BLUE") isBlue.value = true;
        else if (invoiceData.value.invoiceColor === "PURPLE")
          isPurple.value = true;
        else if (invoiceData.value.invoiceColor === "GREEN")
          isGreen.value = true;
        else if (invoiceData.value.invoiceColor === "ORANGE")
          isOrange.value = true;
        else isGray.value = true;

        supplierID.value = response.data.supplierCompany.companyEic;

        if (
          invoiceData.value.logoId === "" ||
          invoiceData.value.logoId === null
        ) {
          isUploading.value = i18n.tc("add_invoice.upload_logo");
          showLogo.value = false;
        } else {
          // logoToUpload.value = invoiceData.value.logoId;
          showLogo.value = true;
          axios
            .get(
              `${axios.defaults.baseURL}/binaries/api/get-binary/${invoiceData.value.logoId}/${router.currentRoute.params.companyId}`,
              { responseType: "blob" }
            )
            .then((response) => {
              if (response.status === 200) {
                isUploading.value = i18n.tc("add_invoice.change_logo");
                // console.log(response.data);
                showLogo.value = true;
                const reader = new FileReader();
                reader.readAsDataURL(response.data);

                reader.onload = function () {
                  const filePath = reader.result;
                  logoToUpload.value = filePath;
                  showLogo.value = true;

                  console.log(filePath);
                  invoiceData.value.creatorName = response.data.creatorName; // Add this
                  invoiceData.value.recipientName = response.data.recipientName; // Add this
                  invoiceData.value.creatorSignature =
                    response.data.creatorSignature; // Add this if you have a signature
                  invoiceData.value.recipientSignature =
                    response.data.recipientSignature;
                };
              }
            })
            .catch();
        }

        invoiceData.value.supplierCompany = invoiceData?.value?.supplierCompany
          ? invoiceData.value.supplierCompany
          : uploadValue;
        invoiceData.value.recipientCompany = invoiceData?.value
          ?.recipientCompany
          ? invoiceData.value.recipientCompany
          : uploadValue;
        invoiceData.value.transactions =
          invoiceData?.value?.transactions?.length > 0
            ? invoiceData.value.transactions
            : [JSON.parse(JSON.stringify(itemFormBlankItem))];
        // invoiceData.value.vatPercent = invoiceData?.value?.vatPercent ? invoiceData.value.vatPercent : 20
        invoiceData.value.tradeDiscountPercent = invoiceData?.value
          ?.tradeDiscountPercent
          ? invoiceData.value.tradeDiscountPercent
          : 0;
        invoiceData.value.transactionType = invoiceData?.value?.transactionType
          ? invoiceData.value.transactionType
          : "INCOME";
        invoiceData.value.invoiceType = invoiceData?.value?.invoiceType
          ? invoiceData.value.invoiceType
          : "ORIGINAL";
        invoiceData.value.saleType = invoiceData?.value?.saleType
          ? invoiceData.value.saleType
          : "SERVICE";
        invoiceData.value.documentType = invoiceData?.value?.documentType
          ? invoiceData.value.documentType
          : "INVOICE";

        if (invoiceData.value.bankApi === null) {
          invoiceData.value.bankApi = {
            name: "",
            bic: "",
            iban: "",
          };
        }

        supplierVat.value = invoiceData?.value?.supplierCompany?.companyVatEic
          ? true
          : false;
        recipientVat.value = invoiceData?.value?.recipientCompany?.companyVatEic
          ? true
          : false;
        // ? We are adding some extra data in response for data purpose
        // * Your response will contain this extra data
        // ? [Purpose is to make it more API friendly and less static as possible]
        InvoiceTypeOptionToggleValue.value =
          invoiceData?.value?.invoiceType == "PROFORMA" ? true : false;
        saleTypeOptionToggleValue.value =
          invoiceData?.value?.saleType == "GOODS" ? true : false;
        invoiceData.value.transactions = response?.data?.transactions?.map(
          (item) => {
            return item;
          }
        );
        if (invoiceData.value.bankApi !== null) {
          if (
            invoiceData.value.bankApi.name !== "" ||
            invoiceData.value.bankApi.bic !== "" ||
            invoiceData.value.bankApi.iban !== ""
          ) {
            hasBankDetails.value = true;
          }
        }
        console.log(
          invoiceData.value.scheduled,
          invoiceData.value.cronScheduleApi
        );
        if (invoiceData.value.scheduled) {
          checkSchedule.value = true;
          isScheduled.value = true;

        } else {
          checkSchedule.value = false;
          isScheduled.value = false;
        }
        if (invoiceData.value.cronScheduleApi.dayOfWeek) {
          //  alert(invoiceData.value.cronScheduleApi.dayOfWeek);
          invoiceData.cronScheduleApi.scheduleType =
            invoiceData.value.cronScheduleApi.scheduleType;
          invoiceData.cronScheduleApi.dayOfMonth =
            invoiceData.value.cronScheduleApi.dayOfMonth;
          invoiceData.cronScheduleApi.dayOfWeek =
            invoiceData.value.cronScheduleApi.dayOfWeek;
        }
      })
      .catch((error) => {
        if (error.response.status === 404) {
          invoiceData.value = undefined;
        }
      });

    let InvoiceTypeOptionToggle = (value) => {
      if (value) {
        invoiceData.value.invoiceType = "PROFORMA";
      } else {
        invoiceData.value.invoiceType = "ORIGINAL";
      }
    };

    let saleTypeOptionToggle = (value) => {
      if (value) {
        invoiceData.value.saleType = "GOODS";
      } else {
        invoiceData.value.saleType = "SERVICE";
      }
    };
    // const handleChange = (item) => {
    //   console.log(item, 'here is handle change');

    //   supplierID.value = item.companyEic
    //   console.log(supplierID.value)

    // };

    var companyName = ref("");
    axios.get(`/account/api/company/${router.currentRoute.params.companyId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        "Access-Control-Allow-Credentials": true,
        "Access-Control-Allow-Origin": "http://localhost:8080",
      },
    })
      .then((response) => {
        console.log(response, 'asdfasdf')

        companyName.value = response.data.companyName
        companyName.value = response.data.companyName
        console.log(companyName.value, 'this is company name ')
        supplierID.value = response.data.companyIdentificationNumber


      })
      .catch((error) => {
        // console.log(error);

      });

    const amountNonVat = (item) => {
      let totalAmountNonVat = item.reduce((acc, ele) => {
        return (
          acc +
          parseFloat(ele.quantity) * parseFloat(ele.singleAmountTransaction)
        );
      }, 0);
      invoiceData.value.amountNonVat = parseFloat(
        totalAmountNonVat ? totalAmountNonVat : 0
      ).toFixed(2);
      return parseFloat(totalAmountNonVat ? totalAmountNonVat : 0).toFixed(2);
    };
    const vatAmount = (item, vatPercent) => {
      let amountNonVat = item.reduce((acc, ele) => {
        return acc + parseFloat(ele.quantity * ele.singleAmountTransaction);
      }, 0);
      let totalVatAmount =
        parseFloat(amountNonVat) * (parseFloat(vatPercent) / 100);
      invoiceData.value.vatAmount = parseFloat(totalVatAmount).toFixed(2);
      return parseFloat(totalVatAmount).toFixed(2);
    };
    const tradeDiscountAmount = (item, vatPercent, tradeDiscountPercent) => {
      tradeDiscountPercent = tradeDiscountPercent ? tradeDiscountPercent : 0;
      vatPercent = vatPercent ? vatPercent : 0;
      let amountNonVat = item.reduce((acc, ele) => {
        return acc + parseFloat(ele.quantity * ele.singleAmountTransaction);
      }, 0);
      let totaltradeDiscountAmount =
        (parseFloat(tradeDiscountPercent) / 100) *
        (parseFloat(amountNonVat) +
          (parseFloat(vatPercent) / 100) * parseFloat(amountNonVat));
      invoiceData.value.tradeDiscountAmount = parseFloat(
        totaltradeDiscountAmount
      ).toFixed(2);
      return parseFloat(totaltradeDiscountAmount).toFixed(2);
    };
    const totalPrice = (item, vatPercent, tradeDiscountPercent) => {
      tradeDiscountPercent = tradeDiscountPercent ? tradeDiscountPercent : 0;
      vatPercent = vatPercent ? vatPercent : 0;
      let amountNonVat = item.reduce((acc, ele) => {
        return acc + parseFloat(ele.quantity * ele.singleAmountTransaction);
      }, 0);
      let tradeDiscountAmount =
        (parseFloat(tradeDiscountPercent) / 100) *
        (parseFloat(amountNonVat) +
          (parseFloat(vatPercent) / 100) * parseFloat(amountNonVat));

      let totalPrice =
        parseFloat(amountNonVat) +
        (parseFloat(vatPercent) / 100) * parseFloat(amountNonVat) -
        tradeDiscountAmount;
      invoiceData.value.totalAmount = parseFloat(totalPrice).toFixed(2);
      return parseFloat(totalPrice).toFixed(2);
    };

    var populateValues = () => {
      var amountNonVat = invoiceData.value.transactions.reduce((acc, ele) => {
        return acc + parseFloat(ele.quantity * ele.singleAmountTransaction);
      }, 0);

      amountNonVat = amountNonVat ? amountNonVat : 0;
      var vatPercent = invoiceData.value.vatPercent
        ? invoiceData.value.vatPercent
        : 0;
      var tradeDiscountPercent = invoiceData.value.tradeDiscountPercent
        ? invoiceData.value.tradeDiscountPercent
        : 0;

      invoiceData.value.amountNonVat = parseFloat(amountNonVat).toFixed(2);

      var totalVatAmount =
        parseFloat(amountNonVat) * (parseFloat(vatPercent) / 100);
      invoiceData.value.vatAmount = parseFloat(totalVatAmount).toFixed(2);

      var tradeDiscountAmount =
        (parseFloat(tradeDiscountPercent) / 100) *
        (parseFloat(amountNonVat) +
          (parseFloat(vatPercent) / 100) * parseFloat(amountNonVat));
      invoiceData.value.tradeDiscountAmount =
        parseFloat(tradeDiscountAmount).toFixed(2);

      var totalPrice =
        parseFloat(amountNonVat) +
        (parseFloat(vatPercent) / 100) * parseFloat(amountNonVat) -
        tradeDiscountAmount;
      invoiceData.value.totalAmount = parseFloat(totalPrice).toFixed(2);
    };

    const clearForm = () => {
      invoiceData.value = {
        invoiceNumber: "",
        dateIssued: "",
        supplierCompany: {
          companyOwnerName: "",
          companName: "",
          companyEic: "",
          companyVatEic: "",
          companyAddress: "",
        },
        recipientCompany: {
          companyOwnerName: "",
          companName: "",
          companyEic: "",
          companyVatEic: "",
          companyAddress: "",
        },
        currency: invoiceData.value.currency,
        amountNonVat: invoiceData.value.amountNonVat,
        vatAmount: invoiceData.value.vatAmount,
        vatPercent: 20,
        tradeDiscountPercent: 0,
        tradeDiscountAmount: invoiceData.value.tradeDiscountAmount,
        totalAmount: invoiceData.value.totalAmount,

        // ? Set single Item in form for adding data
        transactions: invoiceData.value.transactions,
        transactionType: invoiceData.value.transactionType,
        invoiceType: invoiceData.value.invoiceType,
        saleType: invoiceData.value.saleType,
        documentType: "INVOICE",
        verified: invoiceData.value.verified,
        scheduled: false,
        cronScheduleApi: {
          dayOfMonth: "",
          dayOfWeek: "",
          scheduleType: "",
        },
        dueDate: "",
      };
    };
    var datalist = ref([]);
    var showSuggestions = ref(false);


    var isScheduled = ref(false);
    var isNotScheduled = ref(false);
    var checkSchedule = ref(false);
    var scheduledTypeOffCase = ref("");
    var isScheduledTypeOffCaseMonthly = ref(false);
    var isScheduledTypeOffCaseWeekly = ref(false);
    var offCaseScheduleType = ref("");
    var offCaseScheduleDayOfMonth = ref("");
    var offCaseScheduleDayOfWeek = ref("");

    const SearchCompanyName = (companyName) => {
      if (companyName.length > 0) {
        let token = useJwt.getToken();
        useJwt
          .SearchCompanyName(token, { companyName })
          .then((response) => {
            if (response?.data != undefined || response?.data.length != 0) {
              showSuggestions.value = true;
            } else {
              showSuggestions.value = false;
            }
            datalist.value = response?.data;
          })
          .catch((error) => {
            console.log("error", error);
          });
      } else {
        showSuggestions.value = false;
      }
    };

    const autoCompletefn = (item) => {
      if (item.company_name) {
        invoiceData.value.supplierCompany.companName = item.company_name;
      }
      if (item.address) {
        invoiceData.value.supplierCompany.companyAddress = item.address;
      }
      if (item.eic) {
        invoiceData.value.supplierCompany.companyEic = item.eic;
      }
      if (item.managers && item.managers[0]) {
        let managers = "";
        item?.managers?.map((item, index) => {
          managers = index == 0 ? managers + item : managers + ", " + item;
        });
        invoiceData.value.supplierCompany.companyOwnerName = managers;
      }
      showSuggestions.value = false;
      datalist.value = [];
    };

    const hideSuggestion = () => {
      setTimeout(() => {
        if (showSuggestions.value) {
          showSuggestions.value = false;
        }
      }, 100);
    };

    const ShowSuggestion = (items) => {
      if (items != undefined || items.length != 0) {
        showSuggestions.value = true;
      } else {
        showSuggestions.value = false;
      }
    };

    var datalistEic = ref([]);
    var showSuggestionsEic = ref(false);

    const SearchCompanyEic = (companyEic) => {
      if (companyEic) {
        let token = useJwt.getToken();
        useJwt
          .SearchCompanyEic(token, companyEic)
          .then((response) => {


            if (response?.data != undefined || response?.data.length != 0) {
              showSuggestionsEic.value = true;
            } else {
              showSuggestionsEic.value = false;
            }
            datalistEic.value = response?.data;
          })
          .catch((error) => {
            console.log("error", error);
          });
      } else {
        showSuggestionsEic.value = false;
      }
    };

    const autoCompletefnEic = (item) => {
      if (item.company_name) {
        invoiceData.value.supplierCompany.companName = item.company_name;
      }
      if (item.address) {
        invoiceData.value.supplierCompany.companyAddress = item.address;
      }
      if (item.eic) {
        invoiceData.value.supplierCompany.companyEic = item.eic;
      }
      if (item.managers && item.managers[0]) {
        let managers = "";
        item?.managers?.map((item, index) => {
          managers = index == 0 ? managers + item : managers + ", " + item;
        });
        invoiceData.value.supplierCompany.companyOwnerName = managers;
      }
      showSuggestionsEic.value = false;
      datalistEic.value = [];
    };

    const hideSuggestionEic = () => {
      setTimeout(() => {
        if (showSuggestionsEic.value) {
          showSuggestionsEic.value = false;
        }
      }, 100);
    };

    const ShowSuggestionEic = (items) => {
      if (items != undefined || items.length != 0) {
        showSuggestionsEic.value = true;
      } else {
        showSuggestionsEic.value = false;
      }
    };

    var datalistRecipient = ref([]);
    var showSuggestionsRecipient = ref(false);

    const SearchCompanyNameRecipient = (companyName) => {
      if (companyName.length > 0) {
        let token = useJwt.getToken();
        useJwt
          .SearchCompanyName(token, { companyName })
          .then((response) => {
            if (response?.data != undefined || response?.data.length != 0) {
              showSuggestionsRecipient.value = true;
            } else {
              showSuggestionsRecipient.value = false;
            }
            datalistRecipient.value = response?.data;
          })
          .catch((error) => {
            console.log("error", error);
          });
      } else {
        showSuggestionsRecipient.value = false;
      }
    };

    const autoCompletefnRecipient = (item) => {
      if (item.company_name) {
        invoiceData.value.recipientCompany.companName = item.company_name;
      }
      if (item.address) {
        invoiceData.value.recipientCompany.companyAddress = item.address;
      }
      if (item.eic) {
        invoiceData.value.recipientCompany.companyEic = item.eic;
      }
      if (item.managers && item.managers[0]) {
        let managers = "";
        item?.managers?.map((item, index) => {
          managers = index == 0 ? managers + item : managers + ", " + item;
        });
        invoiceData.value.recipientCompany.companyOwnerName = managers;
      }
      showSuggestionsRecipient.value = false;
      datalistRecipient.value = [];
    };

    const hideSuggestionRecipient = () => {
      setTimeout(() => {
        if (showSuggestionsRecipient.value) {
          showSuggestionsRecipient.value = false;
        }
      }, 100);
    };

    const ShowSuggestionRecipient = (items) => {
      if (items != undefined || items.length != 0) {
        showSuggestionsRecipient.value = true;
      } else {
        showSuggestionsRecipient.value = false;
      }
    };

    var datalistEicRecipient = ref([]);
    var showSuggestionsEicRecipient = ref(false);

    const SearchCompanyEicRecipient = (companyEic) => {
      if (companyEic) {
        let token = useJwt.getToken();
        useJwt
          .SearchCompanyEic(token, companyEic)
          .then((response) => {

            if (response?.data != undefined || response?.data.length != 0) {
              showSuggestionsEicRecipient.value = true;
            } else {
              showSuggestionsEicRecipient.value = false;
            }
            datalistEicRecipient.value = response?.data;
          })
          .catch((error) => {
            console.log("error", error);
          });
      } else {
        showSuggestionsEicRecipient.value = false;
      }
    };

    const autoCompletefnEicRecipient = (item) => {
      if (item.company_name) {
        invoiceData.value.recipientCompany.companName = item.company_name;
      }
      if (item.address) {
        invoiceData.value.recipientCompany.companyAddress = item.address;
      }
      if (item.eic) {
        invoiceData.value.recipientCompany.companyEic = item.eic;
      }
      if (item.managers && item.managers[0]) {
        let managers = "";
        item?.managers?.map((item, index) => {
          managers = index == 0 ? managers + item : managers + ", " + item;
        });
        invoiceData.value.recipientCompany.companyOwnerName = managers;
      }
      showSuggestionsEicRecipient.value = false;
      datalistEicRecipient.value = [];
    };

    const hideSuggestionEicRecipient = () => {
      setTimeout(() => {
        if (showSuggestionsEicRecipient.value) {
          showSuggestionsEicRecipient.value = false;
        }
      }, 100);
    };

    const ShowSuggestionEicRecipient = (items) => {
      if (items != undefined || items.length != 0) {
        showSuggestionsEicRecipient.value = true;
      } else {
        showSuggestionsEicRecipient.value = false;
      }
    };

    var datalistPerson = ref([]);
    var showSuggestionsPerson = ref(false);

    const SearchCompanyPerson = (companyPerson) => {
      if (companyPerson) {
        let token = useJwt.getToken();
        useJwt
          .SearchCompaniesPerson(token, router.currentRoute.params.companyId, {
            direction: "desc",
            sortField: "id",
            searchTerm: companyPerson,
          })
          .then((response) => {
            if (response?.data != undefined || response?.data.length != 0) {
              showSuggestionsPerson.value = true;
            } else {
              showSuggestionsPerson.value = false;
            }
            datalistPerson.value = response?.data?.elements;
          })
          .catch((error) => {
            console.log("error", error);
          });
      } else {
        showSuggestionsPerson.value = false;
      }
    };

    const autoCompletefnPerson = (item) => {
      if (item.firstMiddleAndLastName) {
        invoiceData.value.recipientCompany.companyOwnerName =
          item.firstMiddleAndLastName;
      }
      if (item.address) {
        invoiceData.value.recipientCompany.companyAddress = item.address;
      }
      if (item.identificationNumber) {
        invoiceData.value.recipientCompany.companyEic =
          item.identificationNumber;
      }
      showSuggestionsPerson.value = false;
      datalistPerson.value = [];
    };

    const hideSuggestionPerson = () => {
      setTimeout(() => {
        if (showSuggestionsPerson.value) {
          showSuggestionsPerson.value = false;
        }
      }, 100);
    };

    const ShowSuggestionPerson = (items) => {
      if (items != undefined || items.length != 0) {
        showSuggestionsPerson.value = true;
      } else {
        showSuggestionsPerson.value = false;
      }
    };

    var datalistPersonIdNumber = ref([]);
    var showSuggestionsPersonIdNumber = ref(false);

    const SearchCompanyPersonIdNumber = (companyPersonIdNumber) => {
      if (companyPersonIdNumber) {
        let token = useJwt.getToken();
        useJwt
          .SearchCompaniesPerson(token, router.currentRoute.params.companyId, {
            direction: "desc",
            sortField: "id",
            searchTerm: companyPersonIdNumber,
          })
          .then((response) => {
            if (response?.data != undefined || response?.data.length != 0) {
              showSuggestionsPersonIdNumber.value = true;
            } else {
              showSuggestionsPersonIdNumber.value = false;
            }
            datalistPersonIdNumber.value = response?.data?.elements;
          })
          .catch((error) => {
            console.log("error", error);
          });
      } else {
        showSuggestionsPersonIdNumber.value = false;
      }
    };

    const autoCompletefnPersonIdNumber = (item) => {
      if (item.firstMiddleAndLastName) {
        invoiceData.value.recipientCompany.companyOwnerName =
          item.firstMiddleAndLastName;
      }
      if (item.address) {
        invoiceData.value.recipientCompany.companyAddress = item.address;
      }
      if (item.identificationNumber) {
        invoiceData.value.recipientCompany.companyEic =
          item.identificationNumber;
      }
      showSuggestionsPersonIdNumber.value = false;
      datalistPersonIdNumber.value = [];
    };

    const hideSuggestionPersonIdNumber = () => {
      setTimeout(() => {
        if (showSuggestionsPersonIdNumber.value) {
          showSuggestionsPersonIdNumber.value = false;
        }
      }, 100);
    };

    const ShowSuggestionPersonIdNumber = (items) => {
      if (items != undefined || items.length != 0) {
        showSuggestionsPersonIdNumber.value = true;
      } else {
        showSuggestionsPersonIdNumber.value = false;
      }
    };

    const clearAll = (type) => {
      if (type == "supplier") {
        invoiceData.value.supplierCompany = {
          companyOwnerName: "",
          companName: "",
          companyEic: "",
          companyVatEic: "",
          companyAddress: "",
        };
      } else if (type == "recipient") {
        invoiceData.value.recipientCompany = {
          companyOwnerName: "",
          companName: "",
          companyEic: "",
          companyVatEic: "",
          companyAddress: "",
        };
      }
    };

    return {
      isBank,
      companyName,
      companyInfo,
      populateValues,
      logoToUpload,
      showLogo,
      isUploading,
      isTemplateFive,
      isTemplateOne,
      isTemplateTwo,
      isTemplateThree,
      isTemplateFour,

      supplierID,
      hasBankDetails,
      AccountTypeOption,
      recipientVat,
      supplierVat,
      AccountTypeOptionToggleValue,
      AccountTypeOptionToggle,
      InvoiceTypeOptionToggleValue,
      saleTypeOptionToggleValue,
      saleTypeOptionToggle,
      InvoiceTypeOptionToggle,
      invoiceData,
      currencyOptions,
      transectionOptions,
      itemFormBlankItem,
      vatAmount,
      totalPrice,
      amountNonVat,
      tradeDiscountAmount,
      datalist,
      showSuggestions,
      SearchCompanyName,
      autoCompletefn,
      hideSuggestion,
      ShowSuggestion,
      datalistEic,
      showSuggestionsEic,
      SearchCompanyEic,
      autoCompletefnEic,
      hideSuggestionEic,
      ShowSuggestionEic,
      datalistRecipient,
      showSuggestionsRecipient,
      SearchCompanyNameRecipient,
      autoCompletefnRecipient,
      hideSuggestionRecipient,
      ShowSuggestionRecipient,
      datalistEicRecipient,
      showSuggestionsEicRecipient,
      SearchCompanyEicRecipient,
      autoCompletefnEicRecipient,
      hideSuggestionEicRecipient,
      ShowSuggestionEicRecipient,
      datalistPerson,
      showSuggestionsPerson,
      SearchCompanyPerson,
      autoCompletefnPerson,
      hideSuggestionPerson,
      ShowSuggestionPerson,
      datalistPersonIdNumber,
      showSuggestionsPersonIdNumber,
      SearchCompanyPersonIdNumber,
      autoCompletefnPersonIdNumber,
      hideSuggestionPersonIdNumber,
      ShowSuggestionPersonIdNumber,
      clearForm,
      clearAll,
      isGray,
      isPurple,
      isGreen,
      isOrange,
      isBlue,

      isScheduled,
      isNotScheduled,
      checkSchedule,
      scheduledTypeOffCase,
      isScheduledTypeOffCaseMonthly,
      isScheduledTypeOffCaseWeekly,
      offCaseScheduleType,
      offCaseScheduleDayOfMonth,
      offCaseScheduleDayOfWeek,
    };
  },
};
</script>

<style lang="scss" scoped>
.reverse-button {
  position: relative;
  top: 50%;
}

// @import "assets/css/style.css";
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

<style lang="scss" scoped>
@import "~@core/scss/base/pages/app-invoice.scss";
@import "~@core/scss/base/components/variables-dark";

.flatpickr-input {
  background-color: white !important;
}

.form-item-section {
  background-color: $product-details-bg;
}

.form-item-action-col {
  width: 27px;
}

.repeater-form {
  // overflow: hidden;
  transition: 0.35s height;
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

.dark-layout {
  .form-item-section {
    background-color: $theme-dark-body-bg;

    .row .border {
      background-color: $theme-dark-card-bg;
    }
  }
}

.gap-2 {
  grid-gap: 20px;
}

.accountType {
  display: flex;
  gap: 10px;
  justify-content: end;
  margin-bottom: 2rem;
}

.cursor-pointer {
  height: 25px;
  width: 25px;
  margin-right: 16px;
}


@media (min-width: 1200px) {

  /* modify this based on when the issue occurs */
  .cursor-pointer {
    /* Example: increase the size of the buttons at larger viewport sizes */
    height: 23px;
    width: 23px;
  }
}

.invoice-add-input span.title.mr-1 {
  width: 12rem !important;
  min-width: 12rem !important;
}

.invoice-add-input .invoice-number-date .title.mr-1 {
  width: 5rem !important;
  min-width: 5rem !important;
}

.input-suggesstions {
  position: absolute;
  z-index: 99;
  width: 47%;
  border: 1px solid rgba(87, 100, 111, 0.3);
  border-radius: 0 !important;
  max-height: 15rem;
  overflow: auto;
}

.dark-layout .input-suggesstions {
  border-color: #3b4253;
}

.input-suggesstions .list-group-item {
  border-bottom: 0 !important;
  border-radius: 0 !important;
  background-color: #f8f8f8 !important;
  cursor: pointer;
}

.dark-layout .input-suggesstions .list-group-item {
  background-color: #161d31 !important;
}

.dark-layout .card.invoice-card {
  border-color: #3b4253 !important;
}

.card-header.invoice-header h5 {
  color: #fff !important;
}

.invoice-input-top {
  width: 16rem;
  max-width: 100%;
}

.invoice-input-middle .input-group.invoice-edit-input-group span {
  width: 100%;
}

.v-select {
  margin-top: 3px !important;
}

/*--------------------------------------------------------------
>> TABLE OF CONTENTS:
----------------------------------------------------------------
1. Normalize
2. Typography
3. Invoice General Style
--------------------------------------------------------------*/
/*--------------------------------------------------------------
2. Normalize
----------------------------------------------------------------*/
/* @import url("https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;700&display=swap"); */
*,
::after,
::before {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

html {
  line-height: 1.15;
  -webkit-text-size-adjust: 100%;
}

/* Sections
   ========================================================================== */
/**
 * Remove the margin in all browsers.
 */
body {
  margin: 0;
}

/**
 * Render the `main` element consistently in IE.
 */
main {
  display: block;
}

/**
 * Correct the font size and margin on `h1` elements within `section` and
 * `article` contexts in Chrome, Firefox, and Safari.
 */
h1 {
  font-size: 2em;
  margin: 0.67em 0;
}

/* Grouping content
   ========================================================================== */
/**
 * 1. Add the correct box sizing in Firefox.
 * 2. Show the overflow in Edge and IE.
 */
hr {
  -webkit-box-sizing: content-box;
  box-sizing: content-box;
  /* 1 */
  height: 0;
  /* 1 */
  overflow: visible;
  /* 2 */
}

/**
 * 1. Correct the inheritance and scaling of font size in all browsers.
 * 2. Correct the odd `em` font sizing in all browsers.
 */
pre {
  font-family: monospace, monospace;
  /* 1 */
  font-size: 1em;
  /* 2 */
}

/* Text-level semantics
   ========================================================================== */
/**
 * Remove the gray background on active links in IE 10.
 */
a {
  background-color: transparent;
}

/**
 * 1. Remove the bottom border in Chrome 57-
 * 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.
 */
abbr[title] {
  border-bottom: none;
  /* 1 */
  text-decoration: underline;
  /* 2 */
  -webkit-text-decoration: underline dotted;
  text-decoration: underline dotted;
  /* 2 */
}

/**
 * Add the correct font weight in Chrome, Edge, and Safari.
 */
b,
strong {
  font-weight: bolder;
}

/**
 * 1. Correct the inheritance and scaling of font size in all browsers.
 * 2. Correct the odd `em` font sizing in all browsers.
 */
code,
kbd,
samp {
  font-family: monospace, monospace;
  /* 1 */
  font-size: 1em;
  /* 2 */
}

/**
 * Add the correct font size in all browsers.
 */
small {
  font-size: 80%;
}

/**
 * Prevent `sub` and `sup` elements from affecting the line height in
 * all browsers.
 */
sub,
sup {
  font-size: 75%;
  line-height: 0;
  position: relative;
  vertical-align: baseline;
}

sub {
  bottom: -0.25em;
}

sup {
  top: -0.5em;
}

/* Embedded content
   ========================================================================== */
/**
 * Remove the border on images inside links in IE 10.
 */
img {
  border-style: none;
}

/* Forms
   ========================================================================== */
/**
 * 1. Change the font styles in all browsers.
 * 2. Remove the margin in Firefox and Safari.
 */
button,
input,
optgroup,
select,
textarea {
  font-family: inherit;
  /* 1 */
  font-size: 100%;
  /* 1 */
  line-height: 1.15;
  /* 1 */
  margin: 0;
  /* 2 */
}

/**
 * Show the overflow in IE.
 * 1. Show the overflow in Edge.
 */
button,
input {
  /* 1 */
  overflow: visible;
}

/**
 * Remove the inheritance of text transform in Edge, Firefox, and IE.
 * 1. Remove the inheritance of text transform in Firefox.
 */
button,
select {
  /* 1 */
  text-transform: none;
}

/**
 * Correct the inability to style clickable types in iOS and Safari.
 */
button,
[type="button"],
[type="reset"],
[type="submit"] {
  -webkit-appearance: button;
}

/**
 * Remove the inner border and padding in Firefox.
 */
button::-moz-focus-inner,
[type="button"]::-moz-focus-inner,
[type="reset"]::-moz-focus-inner,
[type="submit"]::-moz-focus-inner {
  border-style: none;
  padding: 0;
}

/**
 * Restore the focus styles unset by the previous rule.
 */
button:-moz-focusring,
[type="button"]:-moz-focusring,
[type="reset"]:-moz-focusring,
[type="submit"]:-moz-focusring {
  outline: 1px dotted ButtonText;
}

/**
 * Correct the padding in Firefox.
 */
fieldset {
  padding: 0.35em 0.75em 0.625em;
}

/**
 * 1. Correct the text wrapping in Edge and IE.
 * 2. Correct the color inheritance from `fieldset` elements in IE.
 * 3. Remove the padding so developers are not caught out when they zero out
 *    `fieldset` elements in all browsers.
 */
legend {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  /* 1 */
  color: inherit;
  /* 2 */
  display: table;
  /* 1 */
  max-width: 100%;
  /* 1 */
  padding: 0;
  /* 3 */
  white-space: normal;
  /* 1 */
}

/**
 * Add the correct vertical alignment in Chrome, Firefox, and Opera.
 */
progress {
  vertical-align: baseline;
}

/**
 * Remove the default vertical scrollbar in IE 10+.
 */
textarea {
  overflow: auto;
}

/**
 * 1. Add the correct box sizing in IE 10.
 * 2. Remove the padding in IE 10.
 */
[type="checkbox"],
[type="radio"] {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  /* 1 */
  padding: 0;
  /* 2 */
}

/**
 * Correct the cursor style of increment and decrement buttons in Chrome.
 */
[type="number"]::-webkit-inner-spin-button,
[type="number"]::-webkit-outer-spin-button {
  height: auto;
}

/**
 * 1. Correct the odd appearance in Chrome and Safari.
 * 2. Correct the outline style in Safari.
 */
[type="search"] {
  -webkit-appearance: textfield;
  /* 1 */
  outline-offset: -2px;
  /* 2 */
}

/**
 * Remove the inner padding in Chrome and Safari on macOS.
 */
[type="search"]::-webkit-search-decoration {
  -webkit-appearance: none;
}

/**
 * 1. Correct the inability to style clickable types in iOS and Safari.
 * 2. Change font properties to `inherit` in Safari.
 */
::-webkit-file-upload-button {
  -webkit-appearance: button;
  /* 1 */
  font: inherit;
  /* 2 */
}

/* Interactive
   ========================================================================== */
/*
 * Add the correct display in Edge, IE 10+, and Firefox.
 */
details {
  display: block;
}

/*
 * Add the correct display in all browsers.
 */
summary {
  display: list-item;
}

/* Misc
   ========================================================================== */
/**
 * Add the correct display in IE 10+.
 */
template {
  display: none;
}

/**
 * Add the correct display in IE 10.
 */
[hidden] {
  display: none;
}

/*--------------------------------------------------------------
2. Typography
----------------------------------------------------------------*/
body,
html {
  color: #666;
  font-family: "Inter", sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.6em;
  overflow-x: hidden;
  background-color: #f5f6fa;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  clear: both;
  color: #111;
  padding: 0;
  margin: 0 0 20px 0;
  font-weight: 500;
  line-height: 1.2em;
}

h1 {
  font-size: 60px;
}

h2 {
  font-size: 48px;
}

h3 {
  font-size: 30px;
}

h4 {
  font-size: 24px;
}

h5 {
  font-size: 18px;
}

h6 {
  font-size: 16px;
}

p,
div {
  margin-top: 0;
  line-height: 1.5em;
}

p {
  margin-bottom: 15px;
}

ul {
  margin: 0 0 25px 0;
  padding-left: 20px;
  list-style: disc;
}

ol {
  padding-left: 20px;
  margin-bottom: 25px;
}

dfn,
cite,
em,
i {
  font-style: italic;
}

blockquote {
  margin: 0 15px;
  font-style: italic;
  font-size: 20px;
  line-height: 1.6em;
  margin: 0;
}

address {
  margin: 0 0 15px;
}

img {
  border: 0;
  max-width: 100%;
  height: auto;
  vertical-align: middle;
}

a {
  color: inherit;
  text-decoration: none;
  -webkit-transition: all 0.3s ease;
  transition: all 0.3s ease;
}

a:hover {
  color: #007aff;
}

button {
  color: inherit;
  -webkit-transition: all 0.3s ease;
  transition: all 0.3s ease;
}

a:hover {
  text-decoration: none;
  color: inherit;
}

table {
  width: 100%;
  caption-side: bottom;
  border-collapse: collapse;
}

th {
  text-align: left;
}

td {
  border-top: 1px solid #dbdfea;
}

td {
  padding: 10px 15px;
  line-height: 1.55em;
}

th {
  padding: 10px 15px;
  line-height: 1.55em;
}

dl {
  margin-bottom: 25px;
}

dl dt {
  font-weight: 600;
}

b,
strong {
  font-weight: bold;
}

pre {
  color: #666;
  border: 1px solid #dbdfea;
  font-size: 18px;
  padding: 25px;
  border-radius: 5px;
}

kbd {
  font-size: 100%;
  background-color: #666;
  border-radius: 5px;
}

a:hover {
  color: #007aff;
}

ul {
  padding-left: 15px;
}

/*--------------------------------------------------------------
3. Invoice General Style
----------------------------------------------------------------*/
.tm_f10 {
  font-size: 10px;
}

.tm_f11 {
  font-size: 11px;
}

.tm_f12 {
  font-size: 12px;
}

.tm_f13 {
  font-size: 13px;
}

.tm_f14 {
  font-size: 14px;
}

.tm_f15 {
  font-size: 15px;
}

.tm_f16 {
  font-size: 16px;
}

.tm_f17 {
  font-size: 17px;
}

.tm_f18 {
  font-size: 18px;
}

.tm_f19 {
  font-size: 19px;
}

.tm_f20 {
  font-size: 20px;
}

.tm_f21 {
  font-size: 21px;
}

.tm_f22 {
  font-size: 22px;
}

.tm_f23 {
  font-size: 23px;
}

.tm_f24 {
  font-size: 24px;
}

.tm_f25 {
  font-size: 25px;
}

.tm_f26 {
  font-size: 26px;
}

.tm_f27 {
  font-size: 27px;
}

.tm_f28 {
  font-size: 28px;
}

.tm_f29 {
  font-size: 29px;
}

.tm_f30 {
  font-size: 30px;
}

.tm_f40 {
  font-size: 40px;
}

.tm_f50 {
  font-size: 50px;
}

.tm_light {
  font-weight: 300;
}

.tm_normal {
  font-weight: 400;
}

.tm_medium {
  font-weight: 500;
}

.tm_semi_bold {
  font-weight: 600;
}

.tm_bold {
  font-weight: 700;
}

.tm_m0 {
  margin: 0px;
}

.tm_mb0 {
  margin-bottom: 0px;
}

.tm_mb1 {
  margin-bottom: 1px;
}

.tm_mb2 {
  margin-bottom: 2px;
}

.tm_mb3 {
  margin-bottom: 3px;
}

.tm_mb4 {
  margin-bottom: 4px;
}

.tm_mb5 {
  margin-bottom: 5px;
}

.tm_mb6 {
  margin-bottom: 6px;
}

.tm_mb7 {
  margin-bottom: 7px;
}

.tm_mb8 {
  margin-bottom: 8px;
}

.tm_mb9 {
  margin-bottom: 9px;
}

.tm_mb10 {
  margin-bottom: 10px;
}

.tm_mb11 {
  margin-bottom: 11px;
}

.tm_mb12 {
  margin-bottom: 12px;
}

.tm_mb13 {
  margin-bottom: 13px;
}

.tm_mb14 {
  margin-bottom: 14px;
}

.tm_mb15 {
  margin-bottom: 15px;
}

.tm_mb16 {
  margin-bottom: 16px;
}

.tm_mb17 {
  margin-bottom: 17px;
}

.tm_mb18 {
  margin-bottom: 18px;
}

.tm_mb19 {
  margin-bottom: 19px;
}

.tm_mb20 {
  margin-bottom: 20px;
}

.tm_mb21 {
  margin-bottom: 21px;
}

.tm_mb22 {
  margin-bottom: 22px;
}

.tm_mb23 {
  margin-bottom: 23px;
}

.tm_mb24 {
  margin-bottom: 24px;
}

.tm_mb25 {
  margin-bottom: 25px;
}

.tm_mb26 {
  margin-bottom: 26px;
}

.tm_mb27 {
  margin-bottom: 27px;
}

.tm_mb28 {
  margin-bottom: 28px;
}

.tm_mb29 {
  margin-bottom: 29px;
}

.tm_mb30 {
  margin-bottom: 30px;
}

.tm_mb40 {
  margin-bottom: 40px;
}

.tm_mb90 {
  margin-bottom: 90px;
}

.tm_pt25 {
  padding-top: 25px;
}

.tm_pt0 {
  padding-top: 0;
}

.tm_radius_6_0_0_6 {
  border-radius: 6px 0 0 6px;
}

.tm_radius_0_6_6_0 {
  border-radius: 0 6px 6px 0;
}

.tm_radius_0 {
  border-radius: 0 !important;
}

.tm_width_1 {
  width: 8.33333333%;
}

.tm_width_2 {
  width: 16.66666667%;
}

.tm_width_3 {
  width: 25%;
}

.tm_width_4 {
  width: 33.33333333%;
}

.tm_width_5 {
  width: 41.66666667%;
}

.tm_width_6 {
  width: 50%;
}

.tm_width_7 {
  width: 58.33333333%;
}

.tm_width_8 {
  width: 66.66666667%;
}

.tm_width_9 {
  width: 75%;
}

.tm_width_10 {
  width: 83.33333333%;
}

.tm_width_11 {
  width: 91.66666667%;
}

.tm_width_12 {
  width: 100%;
}

.tm_border {
  border: 1px solid #dbdfea;
}

.tm_border_bottom {
  border-bottom: 1px solid #dbdfea;
}

.tm_border_top {
  border-top: 1px solid #dbdfea;
}

.tm_border_left {
  border-left: 1px solid #dbdfea;
}

.tm_border_right {
  border-right: 1px solid #dbdfea;
}

.tm_round_border {
  border: 1px solid #dbdfea;
  overflow: hidden;
  border-radius: 6px;
}

.tm_accent_color,
.tm_accent_color_hover:hover {
  color: #007aff;
}

.tm_accent_bg,
.tm_accent_bg_hover:hover {
  background-color: #007aff;
}

.gray_bg {
  background-color: #f6d1ff !important;
}

.purple_bg {
  background-color: #ad3978 !important;
}

.green_bg {
  background-color: #8fce00 !important;
}

.orange_bg {
  background-color: #ffa500 !important;
}

.tm_accent_bg_10 {
  background-color: rgba(0, 122, 255, 0.1);
}

.tm_accent_bg_20 {
  background-color: rgba(0, 122, 255, 0.15);
}

.tm_green_bg {
  background-color: #34c759;
}

.tm_green_bg_15 {
  background-color: rgba(52, 199, 89, 0.1);
}

.tm_primary_bg,
.tm_primary_bg_hover:hover {
  background-color: #111;
}

.tm_primary_bg_2 {
  background-color: #000036;
}

.tm_danger_color {
  color: red;
}

.tm_primary_color {
  color: #111;
}

.tm_secondary_color {
  color: #666;
}

.tm_ternary_color {
  color: #b5b5b5;
}

.tm_white_color {
  color: #fff;
}

.tm_white_color_60 {
  color: rgba(255, 255, 255, 0.6);
}

.tm_gray_bg {
  background: #f5f6fa;
}

.tm_ternary_bg {
  background-color: #b5b5b5;
}

.tm_accent_10_bg {
  background-color: rgba(0, 122, 255, 0.1);
}

.tm_accent_border {
  border-color: #007aff;
}

.tm_accent_border_10 {
  border-color: rgba(0, 122, 255, 0.1);
}

.tm_accent_border_20 {
  border-color: rgba(0, 122, 255, 0.2);
}

.tm_accent_border_30 {
  border-color: rgba(0, 122, 255, 0.3);
}

.tm_accent_border_40 {
  border-color: rgba(0, 122, 255, 0.4);
}

.tm_accent_border_50 {
  border-color: rgba(0, 122, 255, 0.5);
}

.tm_primary_border {
  border-color: #111;
}

.tm_gray_border {
  border-color: #f5f6fa;
}

.tm_primary_border_2 {
  border-color: #000036;
}

.tm_secondary_border {
  border-color: #666;
}

.tm_ternary_border {
  border-color: #b5b5b5;
}

.tm_border_color {
  border-color: #dbdfea;
}

.tm_border_1 {
  border-style: solid;
  border-width: 1px;
}

.tm_body_lineheight {
  line-height: 1.5em;
}

.tm_invoice_in {
  position: relative;
  z-index: 100;
}

.tm_container {
  max-width: none;
  padding: 30px 15px;
  margin-left: auto;
  margin-right: auto;
  position: relative;
}

.tm_text_center {
  text-align: center;
}

.tm_text_uppercase {
  text-transform: uppercase;
}

.tm_text_right {
  text-align: right;
}

.tm_align_center {
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}

.tm_border_bottom_0 {
  border-bottom: 0;
}

.tm_border_top_0 {
  border-top: 0;
}

.tm_table_baseline {
  vertical-align: baseline;
}

.tm_border_none {
  border: none !important;
}

.tm_flex {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
}

.tm_justify_between {
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
}

.tm__align_center {
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}

.tm_border_left_none {
  border-left-width: 0;
}

.tm_border_right_none {
  border-right-width: 0;
}

.tm_table_responsive {
  overflow-x: auto;
}

.tm_table_responsive>table {
  min-width: 600px;
}

.tm_50_col>* {
  width: 50%;
  -webkit-box-flex: 0;
  -ms-flex: none;
  flex: none;
}

.tm_no_border {
  border: none !important;
}

.tm_grid_row {
  display: -ms-grid;
  display: grid;
  grid-gap: 10px 20px;
  list-style: none;
  padding: 0;
}

.tm_col_2 {
  -ms-grid-columns: (1fr) [2];
  grid-template-columns: repeat(2, 1fr);
}

.tm_col_3 {
  -ms-grid-columns: (1fr) [3];
  grid-template-columns: repeat(3, 1fr);
}

.tm_col_4 {
  -ms-grid-columns: (1fr) [4];
  grid-template-columns: repeat(4, 1fr);
}

.tm_max_w_150 {
  max-width: 150px;
}

.tm_left_auto {
  margin-left: auto;
}

hr {
  background: #dbdfea;
  height: 1px;
  border: none;
  margin: 0;
}

.tm_invoice {
  background: #fff;
  border-radius: 10px;
  padding: 50px;
}

.tm_invoice_footer {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
}

.tm_invoice_footer table {
  margin-top: -1px;
}

.tm_invoice_footer .tm_left_footer {
  width: 58%;
  padding: 10px 15px;
  -webkit-box-flex: 0;
  -ms-flex: none;
  flex: none;
}

.tm_invoice_footer .tm_right_footer {
  width: 42%;
}

.tm_note {
  margin-top: 30px;
  font-style: italic;
}

.tm_font_style_normal {
  font-style: normal;
}

.tm_sign img {
  max-height: 45px;
}

.tm_coffee_shop_img {
  position: absolute;
  height: 200px;
  opacity: 0.04;
  top: 40px;
  left: 50%;
  -webkit-transform: translateX(-50%);
  transform: translateX(-50%);
}

.tm_coffee_shop_img img {
  max-height: 100%;
}

.tm_invoice.tm_style1 .tm_invoice_right {
  -webkit-box-flex: 0;
  -ms-flex: none;
  flex: none;
  width: 60%;
}

.tm_invoice.tm_style1 .tm_invoice_table {
  grid-gap: 1px;
}

.tm_invoice.tm_style1 .tm_invoice_table>* {
  border: 1px solid #dbdfea;
  margin: -1px;
  padding: 8px 15px 10px;
}

.tm_invoice.tm_style1 .tm_invoice_head {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
}

.tm_invoice.tm_style1 .tm_invoice_head .tm_invoice_right div {
  line-height: 1em;
}

.tm_invoice.tm_style1 .tm_invoice_info {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
}

.tm_invoice.tm_style1 .tm_invoice_info_2 {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  border-top: 1px solid #dbdfea;
  border-bottom: 1px solid #dbdfea;
  padding: 11px 0;
}

.tm_invoice.tm_style1 .tm_invoice_seperator {
  min-height: 18px;
  border-radius: 1.6em;
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
  margin-right: 20px;
}

.tm_invoice.tm_style1 .tm_invoice_info_list {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
}

.tm_invoice.tm_style1 .tm_invoice_info_list>*:not(:last-child) {
  margin-right: 20px;
}

.tm_invoice.tm_style1 .tm_logo img {
  max-height: 50px;
}

.tm_invoice.tm_style1 .tm_logo.tm_size1 img {
  max-height: 60px;
}

.tm_invoice.tm_style1 .tm_logo.tm_size2 img {
  max-height: 70px;
}

.tm_invoice.tm_style1 .tm_grand_total {
  padding: 8px 15px;
}

.tm_invoice.tm_style1 .tm_box_3 {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
}

.tm_invoice.tm_style1 .tm_box_3>* {
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
}

.tm_invoice.tm_style1 .tm_box_3 ul {
  margin: 0;
  padding: 0;
  list-style: none;
}

.tm_invoice.tm_style1 .tm_box_3 ul li {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
}

.tm_invoice.tm_style1 .tm_box_3 ul li:not(:last-child) {
  margin-bottom: 5px;
}

.tm_invoice.tm_style1 .tm_box_3 ul span {
  -webkit-box-flex: 0;
  -ms-flex: none;
  flex: none;
}

.tm_invoice.tm_style1 .tm_box_3 ul span:first-child {
  margin-right: 5px;
}

.tm_invoice.tm_style1 .tm_box_3 ul span:last-child {
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
}

.tm_invoice.tm_style2 .tm_invoice_head {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  border-bottom: 1px solid #dbdfea;
  padding-bottom: 15px;
  position: relative;
}

.tm_invoice.tm_style2 .tm_invoice_left {
  width: 30%;
  -webkit-box-flex: 0;
  -ms-flex: none;
  flex: none;
}

.tm_invoice.tm_style2 .tm_invoice_right {
  width: 70%;
  -webkit-box-flex: 0;
  -ms-flex: none;
  flex: none;
}

.tm_invoice.tm_style2 .tm_invoice_info {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
}

.tm_invoice.tm_style2 .tm_invoice_info_left {
  width: 30%;
  -webkit-box-flex: 0;
  -ms-flex: none;
  flex: none;
}

.tm_invoice.tm_style2 .tm_invoice_info_right {
  width: 70%;
  -webkit-box-flex: 0;
  -ms-flex: none;
  flex: none;
}

.tm_invoice.tm_style2 .tm_logo img {
  max-height: 60px;
}

.tm_invoice.tm_style2 .tm_invoice_title {
  line-height: 0.8em;
}

.tm_invoice.tm_style2 .tm_invoice_info_in {
  padding: 12px 20px;
  border-radius: 10px;
}

.tm_invoice.tm_style2 .tm_card_note {
  display: inline-block;
  padding: 6px 15px;
  border-radius: 6px;
  margin-bottom: 10px;
  margin-top: 5px;
}

.tm_invoice.tm_style2 .tm_invoice_footer .tm_left_footer {
  padding-left: 0;
}

.tm_invoice.tm_style1.tm_type1 {
  padding: 0px 50px 30px;
  position: relative;
  overflow: hidden;
  border-radius: 0;
}

.tm_invoice.tm_style1.tm_type1 .tm_invoice_head {
  // height: 110px;
  position: relative;
}

.tm_invoice.tm_style1.tm_type1 .tm_shape_bg {
  position: absolute;
  height: 100%;
  width: 70%;
  -webkit-transform: skewX(35deg);
  transform: skewX(35deg);
  top: 0px;
  right: -100px;
  overflow: hidden;
}

.tm_invoice.tm_style1.tm_type1 .tm_shape_bg img {
  height: 100%;
  width: 100%;
  -o-object-fit: cover;
  object-fit: cover;
  -webkit-transform: skewX(-35deg) translateX(-45px);
  transform: skewX(-35deg) translateX(-45px);
}

.tm_invoice.tm_style1.tm_type1 .tm_invoice_right {
  position: relative;
  z-index: 2;
}

.tm_invoice.tm_style1.tm_type1 .tm_logo img {
  max-height: 70px;
}

.tm_invoice.tm_style1.tm_type1 .tm_invoice_seperator {
  margin-right: 0;
  border-radius: 0;
  -webkit-transform: skewX(35deg);
  transform: skewX(35deg);
  position: absolute;
  height: 100%;
  width: 60.5%;
  right: -75px;
  overflow: hidden;
  border: none;
}

.tm_invoice.tm_style1.tm_type1 .tm_invoice_seperator img {
  height: 100%;
  width: 100%;
  -o-object-fit: cover;
  object-fit: cover;
  -webkit-transform: skewX(-35deg);
  transform: skewX(-35deg);
  -webkit-transform: skewX(-35deg) translateX(-10px);
  transform: skewX(-35deg) translateX(-10px);
}

.tm_invoice.tm_style1.tm_type1 .tm_invoice_info {
  position: relative;
  padding: 4px 0;
}

.tm_invoice.tm_style1.tm_type1 .tm_card_note,
.tm_invoice.tm_style1.tm_type1 .tm_invoice_info_list {
  position: relative;
  z-index: 1;
}

@media (min-width: 500px) {
  .tm_invoice.tm_style1.tm_type2 {
    position: relative;
    overflow: hidden;
    border-radius: 0;
  }

  .tm_invoice.tm_style1.tm_type2 td {
    padding-top: 12px;
    padding-bottom: 12px;
  }

  .tm_invoice.tm_style1.tm_type2 .tm_pt0 {
    padding-top: 0;
  }

  .tm_invoice.tm_style1.tm_type2 .tm_bars {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    position: absolute;
    top: 0px;
    left: 50%;
    -webkit-transform: translateX(-50%);
    transform: translateX(-50%);
    overflow: hidden;
    padding: 0 15px;
  }

  .tm_invoice.tm_style1.tm_type2 .tm_bars span {
    height: 100px;
    width: 5px;
    display: block;
    margin: -15px 20px 0;
    -webkit-transform: rotate(-40deg);
    transform: rotate(-40deg);
  }

  .tm_invoice.tm_style1.tm_type2 .tm_bars.tm_type1 {
    top: initial;
    bottom: 0;
  }

  .tm_invoice.tm_style1.tm_type2 .tm_bars.tm_type1 span {
    margin: 0 20px 0;
    position: relative;
    bottom: -15px;
  }

  .tm_invoice.tm_style1.tm_type2 .tm_shape {
    height: 230px;
    width: 250px;
    position: absolute;
    top: 0;
    right: 0;
    overflow: hidden;
  }

  .tm_invoice.tm_style1.tm_type2 .tm_shape .tm_shape_in {
    position: absolute;
    height: 350px;
    width: 350px;
    -webkit-transform: rotate(40deg);
    transform: rotate(40deg);
    top: -199px;
    left: 67px;
    overflow: hidden;
  }

  .tm_invoice.tm_style1.tm_type2 .tm_shape.tm_type1 {
    top: initial;
    bottom: 0;
    right: initial;
    left: 0;
  }

  .tm_invoice.tm_style1.tm_type2 .tm_shape.tm_type1 .tm_shape_in {
    top: 135px;
    left: -153px;
  }

  .tm_invoice.tm_style1.tm_type2 .tm_shape_2 {
    height: 120px;
    width: 120px;
    border: 5px solid currentColor;
    padding: 20px;
    position: absolute;
    bottom: -30px;
    right: 77px;
    -webkit-transform: rotate(45deg);
    transform: rotate(45deg);
  }

  .tm_invoice.tm_style1.tm_type2 .tm_shape_2 .tm_shape_2_in {
    height: 100%;
    width: 100%;
    border: 20px solid currentColor;
  }

  .tm_invoice.tm_style1.tm_type2 .tm_shape_2.tm_type1 {
    left: -76px;
    right: initial;
    bottom: 245px;
  }

  .tm_invoice.tm_style1.tm_type2 .tm_shape_2.tm_type1 .tm_shape_2_in {
    border-width: 6px;
  }

  .tm_invoice.tm_style1.tm_type2 .tm_invoice_right {
    width: 40%;
  }

  .tm_invoice.tm_style1.tm_type2 .tm_logo img {
    max-height: 65px;
  }

  .tm_invoice.tm_style1.tm_type2 .tm_invoice_footer {
    margin-bottom: 120px;
  }

  .tm_invoice.tm_style1.tm_type2 .tm_right_footer {
    position: relative;
    padding: 6px 0;
  }

  .tm_invoice.tm_style1.tm_type2 .tm_right_footer table {
    position: relative;
    z-index: 2;
  }

  .tm_invoice.tm_style1.tm_type2 .tm_left_footer {
    padding: 30px 15px;
  }

  .tm_invoice.tm_style1.tm_type2 .tm_shape_3 {
    position: absolute;
    top: 0;
    left: -40px;
    height: 100%;
    width: calc(100% + 150px);
    -webkit-transform: skewX(35deg);
    transform: skewX(35deg);
  }

  .tm_invoice.tm_style1.tm_type2 .tm_shape_4 {
    position: absolute;
    bottom: 200px;
    left: 0;
    height: 200px;
    width: 200px;
  }
}

.tm_invoice.tm_style1.tm_type3 {
  position: relative;
  overflow: hidden;
  border-radius: 0;
}

.tm_invoice.tm_style1.tm_type3 .tm_shape_1 {
  position: absolute;
  top: -1px;
  left: 0;
}

.tm_invoice.tm_style1.tm_type3 .tm_shape_2 {
  position: absolute;
  bottom: 0;
  left: 0;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
}

.tm_invoice.tm_style1.tm_type3 .tm_logo img {
  max-height: 60px;
}

.tm_invoice.tm_style1.tm_type3 .tm_invoice_head.tm_mb20 {
  margin-bottom: 65px;
}

.tm_invoice.tm_style1.tm_type3 .tm_invoice_info_list {
  position: relative;
  padding: 10px 0 10px 40px;
}

.tm_invoice.tm_style1.tm_type3 .tm_invoice_info_list_bg {
  position: absolute;
  height: 100%;
  width: calc(100% + 100px);
  top: 0;
  left: 0;
  border-radius: 20px 0 0 0px;
  -webkit-transform: skewX(-35deg);
  transform: skewX(-35deg);
}

.tm_invoice.tm_style2.tm_type1 {
  padding-top: 0;
  padding-bottom: 0;
  border-width: 40px 0 0;
  border-style: solid;
  position: relative;
  overflow: hidden;
}

.tm_invoice.tm_style2.tm_type1.tm_small_border {
  border-width: 7px 0 0;
}

.tm_invoice.tm_style2.tm_type1 .tm_shape_bg {
  position: absolute;
  height: 100%;
  width: 42%;
  -webkit-transform: skewX(-35deg);
  transform: skewX(-35deg);
  top: 0px;
  left: -100px;
}

.tm_invoice.tm_style2.tm_type1 .tm_invoice_head {
  padding-top: 15px;
  border-bottom: none;
}

.tm_invoice.tm_style2.tm_type1 .tm_logo {
  position: relative;
  z-index: 2;
}

.tm_invoice.tm_style2.tm_type1 .tm_bottom_invoice {
  position: relative;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  padding: 15px 50px 20px;
  border-top: 1px solid #dbdfea;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  margin: 30px -50px 0;
}

.tm_invoice_content {
  position: relative;
  z-index: 10;
}

.tm_invoice_wrap {
  position: relative;
  z-index: 9;
}

.tm_note_list li:not(:last-child) {
  margin-bottom: 5px;
}

.tm_list.tm_style1 {
  list-style: none;
  padding: 0;
  margin: 0;
}

.tm_list.tm_style1 svg {
  width: 16px;
  height: initial;
}

.tm_list.tm_style1 .tm_list_icon {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  position: absolute;
  left: 0;
  top: 3px;
}

.tm_list.tm_style1 li {
  padding-left: 25px;
  position: relative;
}

.tm_list.tm_style1 li:not(:last-child) {
  margin-bottom: 5px;
}

.tm_list.tm_style1.tm_text_right li {
  padding-left: 0;
  padding-right: 25px;
}

.tm_list.tm_style1.tm_text_right .tm_list_icon {
  left: initial;
  right: 0;
}

.tm_section_heading {
  border-width: 0 0 1px 0;
  border-style: solid;
}

.tm_section_heading>span {
  display: inline-block;
  padding: 8px 15px;
  border-radius: 7px 7px 0 0;
}

.tm_section_heading .tm_curve_35 {
  margin-left: 12px;
  margin-right: 0;
}

.tm_section_heading .tm_curve_35 span {
  display: inline-block;
}

.tm_padd_15_20 {
  padding: 15px 20px;
}

.tm_padd_8_20 {
  padding: 8px 20px;
}

.tm_padd_20 {
  padding: 20px;
}

.tm_padd_15 {
  padding: 15px;
}

.tm_padd_10 {
  padding: 10px;
}

.tm_padd_5 {
  padding: 5px;
}

.tm_curve_35 {
  -webkit-transform: skewX(-35deg);
  transform: skewX(-35deg);
  padding: 12px 20px 12px 30px;
  margin-left: 22px;
  margin-right: 22px;
}

.tm_curve_35>* {
  -webkit-transform: skewX(35deg);
  transform: skewX(35deg);
}

.tm_dark_invoice_body {
  background-color: #18191a;
}

.tm_dark_invoice {
  background: #252526;
  color: rgba(255, 255, 255, 0.65);
}

.tm_dark_invoice .tm_primary_color {
  color: rgba(255, 255, 255, 0.9);
}

.tm_dark_invoice .tm_secondary_color {
  color: rgba(255, 255, 255, 0.65);
}

.tm_dark_invoice .tm_ternary_color {
  color: rgba(255, 255, 255, 0.4);
}

.tm_dark_invoice .tm_gray_bg {
  background: rgba(255, 255, 255, 0.08);
}

.tm_dark_invoice .tm_border_color,
.tm_dark_invoice .tm_round_border,
.tm_dark_invoice td,
.tm_dark_invoice th,
.tm_dark_invoice .tm_border_top,
.tm_dark_invoice .tm_border_bottom {
  border-color: rgba(255, 255, 255, 0.1);
}

.tm_dark_invoice+.tm_invoice_btns {
  background: #252526;
  border-color: #252526;
}

@media (min-width: 1000px) {
  .tm_invoice_btns {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    margin-top: 0px;
    margin-left: 20px;
    position: absolute;
    left: 100%;
    top: 0;
    -webkit-box-shadow: -2px 0 24px -2px rgba(43, 55, 72, 0.05);
    box-shadow: -2px 0 24px -2px rgba(43, 55, 72, 0.05);
    border: 3px solid #fff;
    border-radius: 6px;
    background-color: #fff;
  }

  .tm_invoice_btn {
    display: -webkit-inline-box;
    display: -ms-inline-flexbox;
    display: inline-flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    border: none;
    font-weight: 600;
    cursor: pointer;
    padding: 0;
    background-color: transparent;
    position: relative;
  }

  .tm_invoice_btn svg {
    width: 24px;
  }

  .tm_invoice_btn .tm_btn_icon {
    padding: 0;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    height: 42px;
    width: 42px;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
  }

  .tm_invoice_btn .tm_btn_text {
    position: absolute;
    left: 100%;
    background-color: #111;
    color: #fff;
    padding: 3px 12px;
    display: inline-block;
    margin-left: 10px;
    border-radius: 5px;
    top: 50%;
    -webkit-transform: translateY(-50%);
    transform: translateY(-50%);
    font-weight: 500;
    min-height: 28px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    opacity: 0;
    visibility: hidden;
  }

  .tm_invoice_btn .tm_btn_text:before {
    content: "";
    height: 10px;
    width: 10px;
    position: absolute;
    background-color: #111;
    -webkit-transform: rotate(45deg);
    transform: rotate(45deg);
    left: -3px;
    top: 50%;
    margin-top: -6px;
    border-radius: 2px;
  }

  .tm_invoice_btn:hover .tm_btn_text {
    opacity: 1;
    visibility: visible;
  }

  .tm_invoice_btn:not(:last-child) {
    margin-bottom: 3px;
  }

  .tm_invoice_btn.tm_color1 {
    background-color: rgba(0, 122, 255, 0.1);
    color: #007aff;
    border-radius: 5px 5px 0 0;
  }

  .tm_invoice_btn.tm_color1:hover {
    background-color: rgba(0, 122, 255, 0.2);
  }

  .tm_invoice_btn.tm_color2 {
    background-color: rgba(52, 199, 89, 0.1);
    color: #34c759;
    border-radius: 0 0 5px 5px;
  }

  .tm_invoice_btn.tm_color2:hover {
    background-color: rgba(52, 199, 89, 0.2);
  }
}

@media (max-width: 999px) {
  .tm_invoice_btns {
    display: -webkit-inline-box;
    display: -ms-inline-flexbox;
    display: inline-flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    margin-top: 0px;
    margin-top: 20px;
    -webkit-box-shadow: -2px 0 24px -2px rgba(43, 55, 72, 0.05);
    box-shadow: -2px 0 24px -2px rgba(43, 55, 72, 0.05);
    border: 3px solid #fff;
    border-radius: 6px;
    background-color: #fff;
    position: relative;
    left: 50%;
    -webkit-transform: translateX(-50%);
    transform: translateX(-50%);
  }

  .tm_invoice_btn {
    display: -webkit-inline-box;
    display: -ms-inline-flexbox;
    display: inline-flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    border: none;
    font-weight: 600;
    cursor: pointer;
    padding: 0;
    background-color: transparent;
    position: relative;
    border-radius: 5px;
    padding: 6px 15px;
  }

  .tm_invoice_btn svg {
    width: 24px;
  }

  .tm_invoice_btn .tm_btn_icon {
    padding: 0;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    margin-right: 8px;
  }

  .tm_invoice_btn:not(:last-child) {
    margin-right: 3px;
  }

  .tm_invoice_btn.tm_color1 {
    background-color: rgba(0, 122, 255, 0.1);
    color: #007aff;
  }

  .tm_invoice_btn.tm_color1:hover {
    background-color: rgba(0, 122, 255, 0.2);
  }

  .tm_invoice_btn.tm_color2 {
    background-color: rgba(52, 199, 89, 0.1);
    color: #34c759;
  }

  .tm_invoice_btn.tm_color2:hover {
    background-color: rgba(52, 199, 89, 0.2);
  }
}

@media (max-width: 767px) {
  .tm_col_4 {
    -ms-grid-columns: (1fr) [1];
    grid-template-columns: repeat(1, 1fr);
  }

  .tm_col_2_md {
    -ms-grid-columns: (1fr) [2];
    grid-template-columns: repeat(2, 1fr);
  }

  .tm_m0_md {
    margin: 0;
  }

  .tm_mb10_md {
    margin-bottom: 10px;
  }

  .tm_mb15_md {
    margin-bottom: 15px;
  }

  .tm_mb20_md {
    margin-bottom: 20px;
  }

  .tm_mobile_hide {
    display: none;
  }

  .tm_invoice {
    padding: 30px 20px;
  }

  .tm_invoice .tm_right_footer {
    width: 100%;
  }

  .tm_invoice_footer {
    -webkit-box-orient: vertical;
    -webkit-box-direction: reverse;
    -ms-flex-direction: column-reverse;
    flex-direction: column-reverse;
  }

  .tm_invoice_footer .tm_left_footer {
    width: 100%;
    border-top: 1px solid #dbdfea;
    margin-top: -1px;
    padding: 15px 0;
  }

  .tm_invoice.tm_style2 .tm_card_note {
    margin-top: 0;
  }

  .tm_note.tm_text_center {
    text-align: left;
  }

  .tm_note.tm_text_center p br {
    display: none;
  }

  .tm_invoice_footer.tm_type1 {
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
  }

  .tm_invoice.tm_style2 .tm_invoice_head {
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
  }

  .tm_invoice.tm_style2 .tm_invoice_head>* {
    width: 100%;
  }

  .tm_invoice.tm_style2 .tm_invoice_head .tm_invoice_left {
    margin-bottom: 15px;
  }

  .tm_invoice.tm_style2 .tm_invoice_head .tm_text_right {
    text-align: left;
  }

  .tm_invoice.tm_style2 .tm_invoice_info {
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
  }

  .tm_invoice.tm_style2 .tm_invoice_info>* {
    width: 100%;
  }

  .tm_invoice.tm_style1.tm_type1 {
    padding: 30px 20px;
  }

  .tm_invoice.tm_style1.tm_type1 .tm_invoice_head {
    height: initial;
  }

  .tm_invoice.tm_style1.tm_type1 .tm_invoice_info {
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    -webkit-box-align: start;
    -ms-flex-align: start;
    align-items: flex-start;
    padding-left: 15px;
    padding-right: 15px;
  }

  .tm_invoice.tm_style1.tm_type1 .tm_invoice_seperator {
    width: 100%;
    -webkit-transform: initial;
    transform: initial;
    right: 0;
    top: 0;
  }

  .tm_invoice.tm_style1.tm_type1 .tm_logo img {
    max-height: 60px;
  }

  .tm_invoice.tm_style2.tm_type1 {
    border-width: 20px 0 0;
  }

  .tm_invoice.tm_style2.tm_type1 .tm_shape_bg {
    width: 250px;
    height: 80px;
  }

  .tm_invoice.tm_style2.tm_type1 .tm_invoice_head .tm_text_center {
    text-align: left;
  }

  .tm_invoice.tm_style2.tm_type1 .tm_logo {
    top: -8px;
    margin-bottom: 15px;
  }

  .tm_invoice.tm_style2 .tm_invoice_info_in {
    padding: 12px 15px;
  }

  .tm_border_none_md {
    border: none !important;
  }

  .tm_border_left_none_md {
    border-left-width: 0;
  }

  .tm_border_right_none_md {
    border-right-width: 0;
  }

  .tm_padd_left_15_md {
    padding-left: 15px !important;
  }

  .tm_invoice.tm_style2 .tm_logo img {
    max-height: 50px;
  }

  .tm_curve_35 {
    -webkit-transform: skewX(0deg);
    transform: skewX(0deg);
    margin-left: 0;
    margin-right: 0;
  }

  .tm_curve_35>* {
    -webkit-transform: inherit;
    transform: inherit;
  }

  .tm_invoice.tm_style1.tm_type1 .tm_invoice_seperator,
  .tm_invoice.tm_style1.tm_type1 .tm_invoice_seperator img {
    -webkit-transform: initial;
    transform: initial;
  }

  .tm_section_heading .tm_curve_35 {
    margin-left: 0;
  }

  .tm_shape_2.tm_type1 {
    display: none;
  }
}

@media (max-width: 500px) {
  .tm_border_none_sm {
    border: none !important;
  }

  .tm_flex_column_sm {
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
  }

  .tm_align_start_sm {
    -webkit-box-align: start;
    -ms-flex-align: start;
    align-items: flex-start;
  }

  .tm_m0_sm {
    margin-bottom: 0;
  }

  .tm_invoice.tm_style1 .tm_logo {
    margin-bottom: 10px;
  }

  .tm_invoice.tm_style1 .tm_invoice_head {
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
  }

  .tm_invoice.tm_style1 .tm_invoice_head .tm_invoice_left,
  .tm_invoice.tm_style1 .tm_invoice_head .tm_invoice_right {
    width: 100%;
  }

  .tm_invoice.tm_style1 .tm_invoice_head .tm_invoice_right {
    text-align: left;
  }

  .tm_list.tm_style2 li {
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
  }

  .tm_list.tm_style2 li>* {
    padding: 5px 20px;
  }

  .tm_col_2,
  .tm_col_3 {
    -ms-grid-columns: (1fr) [1];
    grid-template-columns: repeat(1, 1fr);
  }

  .tm_col_2_sm {
    -ms-grid-columns: (1fr) [2];
    grid-template-columns: repeat(2, 1fr);
  }

  .tm_table.tm_style1.tm_type1 {
    padding: 0px 20px;
  }

  .tm_box2_wrap {
    -ms-grid-columns: (1fr) [1];
    grid-template-columns: repeat(1, 1fr);
  }

  .tm_box.tm_style1.tm_type1 {
    max-width: 100%;
    width: 100%;
  }

  .tm_invoice.tm_style1 .tm_invoice_left {
    max-width: 100%;
  }

  .tm_f50 {
    font-size: 30px;
  }

  .tm_invoice.tm_style1 .tm_invoice_info {
    -webkit-box-orient: vertical;
    -webkit-box-direction: reverse;
    -ms-flex-direction: column-reverse;
    flex-direction: column-reverse;
  }

  .tm_invoice.tm_style1 .tm_invoice_seperator {
    -webkit-box-flex: 0;
    -ms-flex: none;
    flex: none;
    width: 100%;
    margin-right: 0;
    min-height: 5px;
  }

  .tm_invoice.tm_style1 .tm_invoice_info_list {
    width: 100%;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
  }

  .tm_invoice.tm_style1 .tm_invoice_seperator+.tm_invoice_info_list {
    margin-bottom: 5px;
  }

  .tm_f30 {
    font-size: 22px;
  }

  .tm_invoice.tm_style1 .tm_box_3 {
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
  }

  .tm_invoice.tm_style1 .tm_box_3 span br {
    display: none;
  }

  .tm_invoice.tm_style1 .tm_box_3>*:not(:last-child) {
    margin-bottom: 15px;
  }

  .tm_invoice.tm_style1 .tm_box_3 ul li {
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
  }

  .tm_invoice.tm_style1 .tm_box_3 ul li:not(:last-child) {
    margin-bottom: 5px;
  }
}

/*--------------------------------------------------------------
  Will apply only print window
----------------------------------------------------------------*/
@media print {
  .tm_gray_bg {
    background-color: #f5f6fa !important;
    -webkit-print-color-adjust: exact;
  }

  .tm_ternary_bg {
    background-color: #b5b5b5 !important;
    -webkit-print-color-adjust: exact;
  }

  .tm_primary_bg {
    background-color: #111 !important;
    -webkit-print-color-adjust: exact;
  }

  .tm_secondary_bg {
    background-color: #666 !important;
    -webkit-print-color-adjust: exact;
  }

  .tm_accent_bg {
    background-color: #007aff;
    -webkit-print-color-adjust: exact;
  }

  .tm_accent_bg_10 {
    background-color: rgba(0, 122, 255, 0.1) !important;
    -webkit-print-color-adjust: exact;
  }

  .tm_accent_bg_20 {
    background-color: rgba(0, 122, 255, 0.15) !important;
    -webkit-print-color-adjust: exact;
  }

  .tm_white_color {
    color: #fff !important;
    -webkit-print-color-adjust: exact;
  }

  .tm_accent_color {
    color: #007aff !important;
    -webkit-print-color-adjust: exact;
  }

  .tm_ternary_color {
    color: #b5b5b5 !important;
    -webkit-print-color-adjust: exact;
  }

  .tm_hide_print {
    display: none !important;
  }

  .tm_dark_invoice .tm_gray_bg {
    background-color: #111 !important;
    -webkit-print-color-adjust: exact;
  }

  .tm_dark_invoice {
    background: #111 !important;
    color: rgba(255, 255, 255, 0.65) !important;
    -webkit-print-color-adjust: exact;
  }

  .tm_dark_invoice .tm_gray_bg {
    background: rgba(255, 255, 255, 0.05) !important;
    -webkit-print-color-adjust: exact;
  }

  hr {
    background: #dbdfea !important;
    -webkit-print-color-adjust: exact;
  }

  .tm_col_4,
  .tm_col_4.tm_col_2_md {
    -ms-grid-columns: (1fr) [4];
    grid-template-columns: repeat(4, 1fr);
  }

  .tm_col_2_md {
    -ms-grid-columns: (1fr) [2];
    grid-template-columns: repeat(2, 1fr);
  }

  .tm_mb1 {
    margin-bottom: 1px;
  }

  .tm_mb2 {
    margin-bottom: 2px;
  }

  .tm_mb3 {
    margin-bottom: 3px;
  }

  .tm_mb4 {
    margin-bottom: 4px;
  }

  .tm_mb5 {
    margin-bottom: 5px;
  }

  .tm_mb6 {
    margin-bottom: 6px;
  }

  .tm_mb7 {
    margin-bottom: 7px;
  }

  .tm_mb8 {
    margin-bottom: 8px;
  }

  .tm_mb9 {
    margin-bottom: 9px;
  }

  .tm_mb10 {
    margin-bottom: 10px;
  }

  .tm_mb11 {
    margin-bottom: 11px;
  }

  .tm_mb12 {
    margin-bottom: 12px;
  }

  .tm_mb13 {
    margin-bottom: 13px;
  }

  .tm_mb14 {
    margin-bottom: 14px;
  }

  .tm_mb15 {
    margin-bottom: 15px;
  }

  .tm_mb16 {
    margin-bottom: 16px;
  }

  .tm_mb17 {
    margin-bottom: 17px;
  }

  .tm_mb18 {
    margin-bottom: 18px;
  }

  .tm_mb19 {
    margin-bottom: 19px;
  }

  .tm_mb20 {
    margin-bottom: 20px;
  }

  .tm_mb21 {
    margin-bottom: 21px;
  }

  .tm_mb22 {
    margin-bottom: 22px;
  }

  .tm_mb23 {
    margin-bottom: 23px;
  }

  .tm_mb24 {
    margin-bottom: 24px;
  }

  .tm_mb25 {
    margin-bottom: 25px;
  }

  .tm_mb26 {
    margin-bottom: 26px;
  }

  .tm_mb27 {
    margin-bottom: 27px;
  }

  .tm_mb28 {
    margin-bottom: 28px;
  }

  .tm_mb29 {
    margin-bottom: 29px;
  }

  .tm_mb30 {
    margin-bottom: 30px;
  }

  .tm_mb40 {
    margin-bottom: 40px;
  }

  .tm_mobile_hide {
    display: block;
  }

  .tm_invoice {
    padding: 10px;
  }

  .tm_invoice .tm_right_footer {
    width: 42%;
  }

  .tm_invoice_footer {
    -webkit-box-orient: initial;
    -webkit-box-direction: initial;
    -ms-flex-direction: initial;
    flex-direction: initial;
  }

  .tm_invoice_footer .tm_left_footer {
    width: 58%;
    padding: 10px 15px;
    -webkit-box-flex: 0;
    -ms-flex: none;
    flex: none;
    border-top: none;
    margin-top: 0px;
  }

  .tm_invoice.tm_style2 .tm_card_note {
    margin-top: 5px;
  }

  .tm_note.tm_text_center {
    text-align: center;
  }

  .tm_note.tm_text_center p br {
    display: initial;
  }

  .tm_invoice_footer.tm_type1 {
    -webkit-box-orient: initial;
    -webkit-box-direction: initial;
    -ms-flex-direction: initial;
    flex-direction: initial;
  }

  .tm_invoice.tm_style2 .tm_invoice_head {
    -webkit-box-orient: initial;
    -webkit-box-direction: initial;
    -ms-flex-direction: initial;
    flex-direction: initial;
  }

  .tm_invoice.tm_style2 .tm_invoice_head>.tm_invoice_left {
    width: 30%;
  }

  .tm_invoice.tm_style2 .tm_invoice_head>.tm_invoice_right {
    width: 70%;
  }

  .tm_invoice.tm_style2 .tm_invoice_head .tm_invoice_left {
    margin-bottom: initial;
  }

  .tm_invoice.tm_style2 .tm_invoice_head .tm_text_right {
    text-align: right;
  }

  .tm_invoice.tm_style2 .tm_invoice_info {
    -webkit-box-orient: initial;
    -webkit-box-direction: initial;
    -ms-flex-direction: initial;
    flex-direction: initial;
  }

  .tm_invoice.tm_style2 .tm_invoice_info>.tm_invoice_info_left {
    width: 30%;
  }

  .tm_invoice.tm_style2 .tm_invoice_info>.tm_invoice_info_right {
    width: 70%;
  }

  .tm_invoice.tm_style1.tm_type1 {
    padding: 0px 20px 30px;
  }

  .tm_invoice.tm_style1.tm_type1 .tm_invoice_head {
    height: 110px;
  }

  .tm_invoice.tm_style1.tm_type1 .tm_invoice_info {
    padding: 4px 0;
    -webkit-box-orient: initial;
    -webkit-box-direction: initial;
    -ms-flex-direction: initial;
    flex-direction: initial;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
  }

  .tm_invoice.tm_style1.tm_type1 .tm_invoice_seperator {
    top: initial;
    margin-right: 0;
    border-radius: 0;
    -webkit-transform: skewX(35deg);
    transform: skewX(35deg);
    position: absolute;
    height: 100%;
    width: 57.5%;
    right: -60px;
    overflow: hidden;
    border: none;
  }

  .tm_invoice.tm_style1.tm_type1 .tm_logo img {
    max-height: 70px;
  }

  .tm_invoice.tm_style2.tm_type1 {
    border-width: 20px 0 0;
  }

  .tm_invoice.tm_style2.tm_type1 .tm_shape_bg {
    height: 100%;
    width: 42%;
  }

  .tm_invoice.tm_style2.tm_type1 .tm_invoice_head .tm_text_center {
    text-align: center;
  }

  .tm_invoice.tm_style2.tm_type1 .tm_logo {
    top: initial;
    margin-bottom: initial;
  }

  .tm_invoice.tm_style2 .tm_invoice_info_in {
    padding: 12px 20px;
  }

  .tm_invoice.tm_style2 .tm_logo img {
    max-height: 60px;
  }

  .tm_curve_35 {
    -webkit-transform: skewX(-35deg);
    transform: skewX(-35deg);
    margin-left: 22px;
    margin-right: 22px;
  }

  .tm_curve_35>* {
    -webkit-transform: skewX(35deg);
    transform: skewX(35deg);
  }

  .tm_invoice.tm_style1.tm_type1 .tm_invoice_seperator {
    -webkit-transform: skewX(35deg);
    transform: skewX(35deg);
  }

  .tm_invoice.tm_style1.tm_type1 .tm_invoice_seperator img {
    -webkit-transform: skewX(-35deg) translateX(-45px);
    transform: skewX(-35deg) translateX(-45px);
  }

  .tm_section_heading .tm_curve_35 {
    margin-left: 12px;
  }

  .tm_round_border {
    border-top-width: 2px;
  }

  .tm_border_left_none_md {
    border-left-width: 1px;
  }

  .tm_border_right_none_md {
    border-right-width: 1px;
  }

  .tm_note {
    margin-top: 30px;
  }

  .tm_pagebreak {
    page-break-before: always;
  }
}
</style>
