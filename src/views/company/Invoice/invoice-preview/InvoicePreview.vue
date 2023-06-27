<template>
  <section class="invoice-preview-wrapper">
    <TabList />

    <!-- Alert: No item found -->
    <b-alert variant="danger" :show="invoiceData === undefined">
      <h4 class="alert-heading">Error fetching invoice data</h4>
      <div class="alert-body">
        No invoice found with this invoice id. Check
        <b-link class="alert-link" :to="{ name: 'apps-invoice-list' }">
          Invoice List
        </b-link>
        for other invoices.
      </div>
    </b-alert>

    <b-row v-if="invoiceData" class="invoice-preview-list">
      <!-- Col: Left (Invoice Container) -->
      <!-- Template 05 -->
      <b-col cols="12" xl="10" md="10" class="w-100-print" v-if="isOriginal">
        <b-card no-body class="invoice-preview">
          <b-card-header class="justify-content-center">
            <div class="d-flex align-items-center" style="gap: 15px">
              <h4 class="m-0">{{ $t("company_invoices.invoice_no") }}:</h4>
              <p class="m-0 position-relative invoiceNumber">
                {{ invoiceData.invoiceNumber }}
              </p>
            </div>
          </b-card-header>
        </b-card>

        <div class="d-flex justify-content-between flex-md-row flex-column invoice-spacing mt-0 gap-2">
          <!-- Header: Left Content -->
          <div class="mt-md-0 mt-2 flex-1">
            <b-card no-body class="invoice-preview invoice-card" :style="isBlue === true
              ? 'border: 1px solid #007aff !important'
              : isGreen === true
                ? 'border: 1px solid #8fce00 !important'
                : isPurple === true
                  ? 'border: 1px solid #ad3978 !important'
                  : isOrange === true
                    ? 'border: 1px solid #FFA500 !important'
                    : 'border:1px solid #f6d1ff !important'
              ">
              <b-card-header class="justify-content-center invoice-header" :class="isBlue === true
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
                <div class="invoice-date-wrapper">
                  <p class="invoice-date-title">
                    {{ $t("add_invoice.name") }}:
                  </p>
                  <p class="invoice-date">
                    {{ invoiceData.supplierCompany.companName }}
                  </p>
                </div>
                <div class="invoice-date-wrapper">
                  <p class="invoice-date-title">
                    {{ $t("company_info.address") }}:
                  </p>
                  <p class="invoice-date">
                    {{ invoiceData.supplierCompany.companyAddress }}
                  </p>
                </div>
                <div class="invoice-date-wrapper">
                  <p class="invoice-date-title">
                    {{ $t("add_invoice.id_no") }}:
                  </p>
                  <p class="invoice-date">
                    {{ invoiceData.supplierCompany.companyEic }}
                  </p>
                </div>
                <div class="invoice-date-wrapper">
                  <p class="invoice-date-title">
                    {{ $t("add_invoice.owner") }}:
                  </p>
                  <p class="invoice-date">
                    {{ invoiceData.supplierCompany.companyOwnerName }}
                  </p>
                </div>
                <div v-if="invoiceData.supplierCompany.companyVatEic" class="invoice-date-wrapper">
                  <p class="invoice-date-title">
                    {{ $t("add_invoice.vat_no") }}:
                  </p>
                  <p class="invoice-date">
                    {{ invoiceData.supplierCompany.companyVatEic }}
                  </p>
                </div>
              </b-card-body>
            </b-card>
          </div>

          <div class="mt-md-0 mt-2 flex-1">
            <b-card no-body class="invoice-preview invoice-card" :style="isBlue === true
              ? 'border: 1px solid #007aff !important'
              : isGreen === true
                ? 'border: 1px solid #8fce00 !important'
                : isPurple === true
                  ? 'border: 1px solid #ad3978 !important'
                  : isOrange === true
                    ? 'border: 1px solid #FFA500 !important'
                    : 'border:1px solid #f6d1ff !important'
              ">
              <b-card-header class="justify-content-center invoice-header" :class="isBlue === true
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
                <div class="invoice-date-wrapper">
                  <p class="invoice-date-title">
                    {{ $t("add_invoice.name") }}:
                  </p>
                  <p class="invoice-date">
                    {{ invoiceData.recipientCompany.companName }}
                  </p>
                </div>
                <div class="invoice-date-wrapper">
                  <p class="invoice-date-title">
                    {{ $t("company_info.address") }}:
                  </p>
                  <p class="invoice-date">
                    {{ invoiceData.recipientCompany.companyAddress }}
                  </p>
                </div>
                <div class="invoice-date-wrapper">
                  <p class="invoice-date-title">
                    {{ $t("add_invoice.id_no") }}:
                  </p>
                  <p class="invoice-date">
                    {{ invoiceData.recipientCompany.companyEic }}
                  </p>
                </div>
                <div class="invoice-date-wrapper">
                  <p class="invoice-date-title">
                    {{ $t("add_invoice.owner") }}:
                  </p>
                  <p class="invoice-date">
                    {{ invoiceData.recipientCompany.companyOwnerName }}
                  </p>
                </div>
                <div v-if="invoiceData.recipientCompany.companyVatEic" class="invoice-date-wrapper">
                  <p class="invoice-date-title">
                    {{ $t("add_invoice.vat_no") }}:
                  </p>
                  <p class="invoice-date">
                    {{ invoiceData.recipientCompany.companyVatEic }}
                  </p>
                </div>
              </b-card-body>
            </b-card>
          </div>
        </div>
        <div class="d-flex justify-content-between align-items-center">
          <b-card no-body class="invoice-preview date-issued ml-0">
            <b-card-header class="justify-content-end">
              <div class="invoice-date-wrapper invoice-middle-content">
                <p class="invoice-date-title">
                  {{ $t("company_invoices.transaction_type") }}:
                </p>
                <p class="invoice-date">
                  {{ $t("company_invoices." + invoiceData.transactionType) }}
                </p>
              </div>
            </b-card-header>
          </b-card>
          <b-card no-body class="invoice-preview date-issued">
            <b-card-header class="justify-content-end">
              <div class="invoice-date-wrapper invoice-middle-content">
                <p class="invoice-date-title">
                  {{ $t("company_invoices.date_issued") }}:
                </p>
                <p class="invoice-date">
                  {{ invoiceData.dateIssued }}
                </p>
              </div>
            </b-card-header>
          </b-card>
        </div>
        <b-card no-body class="invoice-preview-card transaction-container" :style="isBlue === true
          ? 'border: 1px solid #007aff'
          : isGreen === true
            ? 'border: 1px solid #8fce00'
            : isPurple === true
              ? 'border: 1px solid #ad3978'
              : isOrange === true
                ? 'border: 1px solid #FFA500'
                : 'border:1px solid #f6d1ff'
          ">
          <!-- Invoice Description: Table -->
          <!-- <b-table-lite
            responsive
            class="mb-0"
            :items="invoiceData.transactions"
            :fields="[
              'no.',
              'serviceOrItemDescription',
              'qty',
              'measurement',
              'singleAmountTransaction',
              'transactionTotalAmountNonVat',
            ]"
            :thead-tr-th-class="isBlue === true
                            ? 'tm_accent_bg'
                            : isGreen === true
                            ? 'green_bg'
                            : isPurple === true
                            ? 'purple_bg'
                            : isOrange === true
                            ? 'orange_bg'
                            : 'gray_bg'"
          
            
          
                        
          >
            <template #head(no.) >
              {{ $t("add_invoice.s_no") }}
            </template>
            <template #cell(no.)="data">
              {{ data.item.index }}
            </template>

            <template #head(serviceOrItemDescription)>
              {{ $t("add_invoice.service_item_description") }}
            </template>

            <template #head(qty)>
              {{ $t("add_invoice.qty") }}
            </template>

            <template #cell(qty)="data">
              {{ data.item.quantity }}
            </template>

            <template #head(measurement)>
              {{ $t("add_invoice.measurement") }}
            </template>

            <template #head(singleAmountTransaction)>
              {{ $t("add_invoice.single_amount_transaction") }}
            </template>
            <template #cell(singleAmountTransaction)="data">
              <span
                v-if="
                  invoiceData.currency.toLowerCase().trim() == 'lv' ||
                  invoiceData.currency.toLowerCase().trim() == 'bgn' ||
                  invoiceData.currency == 'лв' ||
                  invoiceData.currency == 'лв.'
                "
                >лв. {{ data.item.singleAmountTransaction }}</span
              >
              <span v-else
                >{{ invoiceData.currency }}
                {{ data.item.singleAmountTransaction }}</span
              >
            </template>

            <template #head(transactionTotalAmountNonVat)>
              {{ $t("add_invoice.transaction_total_nonVat") }}
            </template>
            <template #cell(transactionTotalAmountNonVat)="data">
              <span
                v-if="
                  invoiceData.currency.toLowerCase().trim() == 'lv' ||
                  invoiceData.currency.toLowerCase().trim() == 'bgn' ||
                  invoiceData.currency == 'лв' ||
                  invoiceData.currency == 'лв.'
                "
                >лв. {{ data.item.transactionTotalAmountNonVat }}</span
              >
              <span v-else
                >{{ invoiceData.currency }}
                {{ data.item.transactionTotalAmountNonVat }}</span
              >
            </template>
          </b-table-lite> -->

          <div class="tm_table tm_style1 tm_mb30">
            <div class="tm_round_border">
              <div class="tm_table_responsive">
                <table>
                  <thead>
                    <tr :class="isBlue === true
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
                      <th class="tm_width_1 tm_semi_bold">
                        {{ $t("add_invoice.s_no") }}
                      </th>
                      <th class="tm_width_3 tm_semi_bold">
                        {{ $t("add_invoice.service_item_description") }}
                      </th>
                      <th class="tm_width_1 tm_semi_bold">
                        {{ $t("add_invoice.qty") }}
                      </th>
                      <th class="tm_width_1 tm_semi_bold">
                        {{ $t("add_invoice.measurement") }}
                      </th>
                      <th class="tm_width_3 tm_semi_bold">
                        {{ $t("add_invoice.single_amount_transaction") }}
                      </th>

                      <th class="tm_width_3 tm_semi_bold">
                        {{ $t("add_invoice.transaction_total_nonVat") }}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, index) in invoiceData.transactions" :key="index">
                      <td class="tm_width_1">{{ index + 1 }}</td>
                      <td class="tm_width_3">
                        {{ item.serviceOrItemDescription }}
                      </td>
                      <td class="tm_width_1">{{ item.quantity }}</td>
                      <td class="tm_width_1">{{ item.measurement }}</td>

                      <td class="tm_width_3">
                        {{ item.singleAmountTransaction }}
                      </td>

                      <td class="tm_width_3">
                        {{
                          (
                            parseFloat(item.singleAmountTransaction) *
                            parseFloat(item.quantity)
                          ).toFixed(2)
                        }}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <!-- Invoice Description: Total -->
        </b-card>

        <b-card no-body class="invoice-preview-card transaction-container" :style="isBlue === true
          ? 'border: 1px solid #007aff'
          : isGreen === true
            ? 'border: 1px solid #8fce00'
            : isPurple === true
              ? 'border: 1px solid #ad3978'
              : isOrange === true
                ? 'border: 1px solid #FFA500'
                : 'border:1px solid #f6d1ff'
          ">
          <b-card-body class="invoice-padding">
            <b-row class="invoiceStat">
              <!-- Col: Sales Persion -->
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
                      <span v-if="invoiceData.currency.toLowerCase().trim() == 'lv' ||
                        invoiceData.currency.toLowerCase().trim() == 'bgn' ||
                        invoiceData.currency == 'лв' ||
                        invoiceData.currency == 'лв.'
                        ">лв. {{ invoiceData.amountNonVat }}</span>
                      <span v-else>{{ invoiceData.currency }}
                        {{ invoiceData.amountNonVat }}</span>
                    </p>
                  </div>
                  <div class="invoice-total-item">
                    <p class="invoice-total-title">
                      {{ $t("add_invoice.vat") }} % :
                    </p>
                    <p class="invoice-total-amount">
                      {{ invoiceData.vatPercent }} %
                    </p>
                  </div>
                  <div class="invoice-total-item">
                    <p class="invoice-total-title">
                      {{ $t("company_invoices.vat_amount") }}:
                    </p>
                    <p class="invoice-total-amount">
                      <span v-if="invoiceData.currency.toLowerCase().trim() == 'lv' ||
                        invoiceData.currency.toLowerCase().trim() == 'bgn' ||
                        invoiceData.currency == 'лв' ||
                        invoiceData.currency == 'лв.'
                        ">лв. {{ invoiceData.vatAmount }}</span>
                      <span v-else>{{ invoiceData.currency }}
                        {{ invoiceData.vatAmount }}</span>
                    </p>
                  </div>
                  <div class="invoice-total-item">
                    <p class="invoice-total-title">
                      {{ $t("add_invoice.discount_percent") }}:
                    </p>
                    <p class="invoice-total-amount">
                      {{ invoiceData.tradeDiscountPercent }} %
                    </p>
                  </div>
                  <div class="invoice-total-item">
                    <p class="invoice-total-title">
                      {{ $t("add_invoice.discount_sum") }}:
                    </p>
                    <p class="invoice-total-amount">
                      <span v-if="invoiceData.currency.toLowerCase().trim() == 'lv' ||
                        invoiceData.currency.toLowerCase().trim() == 'bgn' ||
                        invoiceData.currency == 'лв' ||
                        invoiceData.currency == 'лв.'
                        ">лв. {{ invoiceData.tradeDiscountAmount }}</span>
                      <span v-else>{{ invoiceData.currency }}
                        {{ invoiceData.tradeDiscountAmount }}</span>
                    </p>
                  </div>

                  <div class="invoice-total-item">
                    <p class="invoice-total-title font-weight-bolder custom-font mb-0">
                      {{ $t("add_invoice.total_price") }}:
                    </p>
                    <p class="invoice-total-amount font-weight-bolder custom-font mb-0">
                      <span v-if="invoiceData.currency.toLowerCase().trim() == 'lv' ||
                        invoiceData.currency.toLowerCase().trim() == 'bgn' ||
                        invoiceData.currency == 'лв' ||
                        invoiceData.currency == 'лв.'
                        ">лв. {{ invoiceData.totalAmount }}</span>
                      <span v-else>{{ invoiceData.currency }}
                        {{ invoiceData.totalAmount }}</span>
                    </p>
                  </div>
                </div>
              </b-col>
            </b-row>
          </b-card-body>
        </b-card>
        <template>
          <b-modal ref="my-modal" hide-footer :title="$t('company_info.componentMethod')">
            <div class="d-block text-center">
              <form @submit.prevent="onSubmit" class="add-form">
                <label>{{ $t('tickets_page.title') }}</label>
                <input type="text" v-model="name" name="name" value="Title" :placeholder="$t('company_info.yourTitle')">
                <label>{{ $t('login.lbl_email') }}</label>
                <input type="email" v-model="email" name="email" required :placeholder="$t('company_info.yourEmail')">
                <label>{{ $t('company_info.Message') }}</label>
                <textarea name="message" v-model="message" cols="30" rows="5" :placeholder="$t('company_info.Message')">
                    </textarea>
                <input type="submit" value="Send">
              </form>
            </div>
          </b-modal>
        </template>
        <div class="mt-md-0 mt-2 flex-1" v-if="hasBankDetails">
          <b-card no-body class="invoice-preview invoice-card">
            <b-card-header class="justify-content-center invoice-header">
              <h5 class="m-0">{{ $t("add_invoice.bank_details") }}:</h5>
            </b-card-header>
            <b-card-body class="invoice-body">
              <b-row class="mt-1">
                <b-col>
                  <div class="invoice-date-wrapper" style="border-bottom: none">
                    <p class="invoice-date-title" style="width: 2rem !important">
                      {{ $t("add_invoice.name") }}:
                    </p>
                    <p class="invoice-date">
                      {{ invoiceData.bankApi.name }}
                    </p>
                  </div>
                </b-col>
                <b-col>
                  <div class="invoice-date-wrapper" style="border-bottom: none">
                    <p class="invoice-date-title" style="width: 2rem !important">
                      BIC:
                    </p>
                    <p class="invoice-date">
                      {{ invoiceData.bankApi.bic }}
                    </p>
                  </div>
                </b-col>
                <b-col>
                  <div class="invoice-date-wrapper" style="border-bottom: none">
                    <p class="invoice-date-title" style="width: 2rem !important">
                      IBAN:
                    </p>
                    <p class="invoice-date">
                      {{ invoiceData.bankApi.iban }}
                    </p>
                  </div>
                </b-col>
              </b-row>
            </b-card-body>
          </b-card>
        </div>

        <div class="d-flex justify-content-between align-items-center"
          v-if="invoiceData.vatPercent === '0' || invoiceData.vatPercent === 0">
          <b-card no-body class="invoice-preview date-issued ml-0">
            <b-card-header class="justify-content-end">
              <div class="invoice-date-wrapper invoice-middle-content">
                <p class="invoice-date-title">
                  {{ $t("add_invoice.non_vat_clause") }}:
                </p>
                <p class="invoice-date">
                  {{ invoiceData.vatCondition }}
                </p>
              </div>
            </b-card-header>
          </b-card>
        </div>
      </b-col>

      <!-- template 01 -->
      <b-col cols="12" xl="10" md="10" class="w-100-print" v-if="isTemplateOne">
        <div class="tm_container">
          <div class="tm_invoice_wrap">
            <div class="tm_invoice tm_style1" id="tm_download_section">
              <div class="tm_invoice_in">
                <div class="tm_invoice_head tm_align_center tm_mb20">
                  <div class="tm_invoice_left">
                    <div class="tm_logo">
                      <!-- <img src="./assets/img/logo.svg" alt="Logo" /> -->
                      <b-img :src="logoToUpload" fluid class="mr-1" v-if="showLogo" style="width: 110px; height: 110px" />
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
                      {{ $t("company_invoices.invoice_no") }}:
                      <b class="tm_primary_color">#{{ invoiceData.invoiceNumber }}</b>
                    </p>

                    <p class="tm_invoice_date tm_m0">
                      {{ $t("add_invoice.date") }}:
                      <b class="tm_primary_color">{{
                        invoiceData.dateIssued
                      }}</b>
                    </p>
                    <p class="tm_invoice_date tm_m0">
                      {{ $t("company_invoices.transaction_type") }}:
                      <b class="tm_primary_color">{{
                        $t("company_invoices." + invoiceData.transactionType)
                      }}</b>
                    </p>
                  </div>
                </div>
                <div class="tm_invoice_head tm_mb10">
                  <div class="tm_invoice_left pr-5" style="width: 50%">
                    <h5 class="tm_mb2">
                      <b class="tm_primary_color">
                        {{ $t("add_invoice.supplier") }}:</b>
                    </h5>

                    <p style="margin-bottom: 5px">
                      <b> {{ $t("add_invoice.name") }}: </b>{{ invoiceData.supplierCompany.companName }}
                    </p>
                    <p style="margin-bottom: 5px">
                      <b> {{ $t("company_info.address") }}: </b>{{ invoiceData.supplierCompany.companyAddress }}
                    </p>
                    <p style="margin-bottom: 5px">
                      <b> {{ $t("add_invoice.id_no") }}: </b>
                      {{ invoiceData.supplierCompany.companyEic }}
                    </p>
                    <p style="margin-bottom: 5px">
                      <b> {{ $t("add_invoice.owner") }}: </b>
                      {{ invoiceData.supplierCompany.companyOwnerName }}
                    </p>
                    <p style="margin-bottom: 5px" v-if="invoiceData.supplierCompany.companyVatEic">
                      <b> {{ $t("add_invoice.vat_no") }}: </b>
                      {{ invoiceData.supplierCompany.companyVatEic }}
                    </p>
                  </div>
                  <div class="tm_invoice_right pr-3" style="width: 50%">
                    <h5 class="tm_mb2">
                      <b class="tm_primary_color">{{ $t("add_invoice.recipient") }}:</b>
                    </h5>

                    <p style="margin-bottom: 5px">
                      <span style="width: 100px"><b> {{ $t("add_invoice.name") }}: </b></span>
                      {{ invoiceData.recipientCompany.companName }}
                    </p>
                    <p style="margin-bottom: 5px">
                      <b> {{ $t("company_info.address") }}: </b>{{ invoiceData.recipientCompany.companyAddress }}
                    </p>
                    <p style="margin-bottom: 5px">
                      <b> {{ $t("add_invoice.id_no") }}: </b>
                      {{ invoiceData.recipientCompany.companyEic }}
                    </p>
                    <p style="margin-bottom: 5px">
                      <b> {{ $t("add_invoice.owner") }}: </b>
                      {{ invoiceData.recipientCompany.companyOwnerName }}
                    </p>
                    <p style="margin-bottom: 5px" v-if="invoiceData.recipientCompany.companyVatEic">
                      <b> {{ $t("add_invoice.vat_no") }}: </b>
                      {{ invoiceData.recipientCompany.companyVatEic }}
                    </p>
                  </div>
                </div>
                <div class="tm_table tm_style1 tm_mb30">
                  <div class="tm_round_border">
                    <div class="tm_table_responsive">
                      <table>
                        <thead>
                          <tr>
                            <th class="tm_width_3 tm_semi_bold tm_primary_color tm_gray_bg">
                              {{ $t("add_invoice.s_no") }}
                            </th>
                            <th class="tm_width_4 tm_semi_bold tm_primary_color tm_gray_bg">
                              {{ $t("add_invoice.service_item_description") }}
                            </th>
                            <th class="tm_width_2 tm_semi_bold tm_primary_color tm_gray_bg">
                              {{ $t("add_invoice.single_amount_transaction") }}
                            </th>
                            <th class="tm_width_1 tm_semi_bold tm_primary_color tm_gray_bg">
                              {{ $t("add_invoice.qty") }}
                            </th>
                            <th class="tm_width_2 tm_semi_bold tm_primary_color tm_gray_bg tm_text_right">
                              {{ $t("add_invoice.transaction_total_nonVat") }}
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="(item, index) in invoiceData.transactions" :key="index">
                            <td class="tm_width_1">{{ index + 1 }}</td>
                            <td class="tm_width_3">
                              {{ item.serviceOrItemDescription }}
                            </td>

                            <td class="tm_width_2">
                              {{ item.singleAmountTransaction }}
                            </td>
                            <td class="tm_width_1">{{ item.quantity }}</td>
                            <td class="tm_width_2 tm_text_right">
                              {{
                                (
                                  parseFloat(item.singleAmountTransaction) *
                                  parseFloat(item.quantity)
                                ).toFixed(2)
                              }}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div class="tm_invoice_footer mt-2">
                    <div class="tm_left_footer">
                      <div v-if="invoiceData.bankApi !== null">
                        <p class="tm_mb2">
                          <b class="tm_primary_color">{{ $t("add_invoice.payment_info") }}:</b>
                        </p>
                        <p class="tm_m0">
                          <b>BIC: </b> {{ invoiceData.bankApi.bic }}
                        </p>
                        <p class="tm_m0">
                          <b>IBAN: </b> {{ invoiceData.bankApi.iban }}
                        </p>
                        <p class="tm_m0">
                          <b>{{ $t("add_invoice.bank_name") }}: </b>{{ invoiceData.bankApi.name }}
                        </p>
                        <p class="tm_m0" v-if="invoiceData.vatPercent === '0' ||
                          invoiceData.vatPercent === 0
                          ">
                          <b>{{ $t("add_invoice.non_vat_clause") }}: </b>
                          {{ invoiceData.vatCondition }}
                        </p>
                      </div>
                    </div>
                    <div class="tm_right_footer">
                      <table>
                        <tbody>
                          <tr>
                            <td class="tm_width_3 tm_primary_color tm_border_none tm_pt0">
                              {{ $t("add_invoice.total_price_non_vat") }}:
                            </td>
                            <td class="tm_width_3 tm_primary_color tm_text_right tm_border_none tm_pt0">
                              <span v-if="invoiceData.currency.toLowerCase().trim() ==
                                'lv' ||
                                invoiceData.currency.toLowerCase().trim() ==
                                'bgn' ||
                                invoiceData.currency == 'лв' ||
                                invoiceData.currency == 'лв.'
                                ">лв. {{ invoiceData.amountNonVat }}</span>
                              <span v-else>{{ invoiceData.currency }}
                                {{ invoiceData.amountNonVat }}</span>
                            </td>
                          </tr>

                          <tr>
                            <td class="tm_width_3 tm_primary_color tm_border_none tm_pt0">
                              {{ $t("add_invoice.vat") }} % :
                            </td>
                            <td class="tm_width_3 tm_primary_color tm_text_right tm_border_none tm_pt0">
                              {{ invoiceData.vatPercent }} %
                            </td>
                          </tr>

                          <tr>
                            <td class="tm_width_3 tm_primary_color tm_border_none tm_pt0">
                              {{ $t("company_invoices.vat_amount") }}:
                            </td>
                            <td class="tm_width_3 tm_primary_color tm_text_right tm_border_none tm_pt0">
                              <span v-if="invoiceData.currency.toLowerCase().trim() ==
                                'lv' ||
                                invoiceData.currency.toLowerCase().trim() ==
                                'bgn' ||
                                invoiceData.currency == 'лв' ||
                                invoiceData.currency == 'лв.'
                                ">лв. {{ invoiceData.vatAmount }}</span>
                              <span v-else>{{ invoiceData.currency }}
                                {{ invoiceData.vatAmount }}</span>
                            </td>
                          </tr>

                          <tr>
                            <td class="tm_width_3 tm_primary_color tm_border_none tm_pt0">
                              {{ $t("add_invoice.discount_percent") }}:
                            </td>
                            <td class="tm_width_3 tm_primary_color tm_text_right tm_border_none tm_pt0">
                              {{ invoiceData.tradeDiscountPercent }} %
                            </td>
                          </tr>

                          <tr>
                            <td class="tm_width_3 tm_primary_color tm_border_none tm_pt0">
                              {{ $t("add_invoice.discount_sum") }}:
                            </td>
                            <td class="tm_width_3 tm_primary_color tm_text_right tm_border_none tm_pt0">
                              <span v-if="invoiceData.currency.toLowerCase().trim() ==
                                'lv' ||
                                invoiceData.currency.toLowerCase().trim() ==
                                'bgn' ||
                                invoiceData.currency == 'лв' ||
                                invoiceData.currency == 'лв.'
                                ">лв. {{ invoiceData.tradeDiscountAmount }}</span>
                              <span v-else>{{ invoiceData.currency }}
                                {{ invoiceData.tradeDiscountAmount }}</span>
                            </td>
                          </tr>

                          <tr class="tm_border_top tm_border_bottom">
                            <td class="tm_width_3 tm_border_top_0 tm_bold tm_f16 tm_primary_color">
                              {{ $t("add_invoice.total_price") }}:
                            </td>
                            <td class="tm_width_3 tm_border_top_0 tm_bold tm_f16 tm_primary_color tm_text_right">
                              <span v-if="invoiceData.currency.toLowerCase().trim() ==
                                'lv' ||
                                invoiceData.currency.toLowerCase().trim() ==
                                'bgn' ||
                                invoiceData.currency == 'лв' ||
                                invoiceData.currency == 'лв.'
                                ">лв. {{ invoiceData.totalAmount }}</span>
                              <span v-else>{{ invoiceData.currency }}
                                {{ invoiceData.totalAmount }}</span>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <table style="width: 80%; margin: auto; padding-top: 5rem; border-collapse: collapse;">
                    <tr>
                      <td style="text-align: center; padding: 30px;">
                        <div style=" margin-bottom: 20px;">
                          {{ invoiceData.supplierCompany.companyOwnerName }}
                        </div>
                        <div style="height: 50px; border-bottom: 1px dashed black;">
                          <!-- Space for supplier's signature -->
                        </div>
                        <div style="margin-top: 10px;">
                          {{ new Date().toLocaleDateString() }}
                        </div>
                      </td>
                      <td style="text-align: center; padding: 30px;">
                        <div style=" margin-bottom: 20px;">
                          {{ invoiceData.recipientCompany.companyOwnerName }}
                        </div>
                        <div style="height: 50px; border-bottom: 1px dashed black;">
                          <!-- Space for recipient's signature -->
                        </div>
                        <div style="margin-top: 10px;">
                          {{ new Date().toLocaleDateString() }}
                        </div>
                      </td>
                    </tr>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </b-col>

      <!-- template 02 -->
      <b-col cols="12" xl="10" md="10" class="w-100-print" v-if="isTemplateTwo">
        <div class="tm_container">
          <div class="tm_invoice_wrap">
            <div class="tm_invoice tm_style1 tm_type1" id="tm_download_section">
              <div class="tm_invoice_in">
                <div class="tm_invoice_head tm_top_head tm_mb15 tm_align_center">
                  <div class="tm_invoice_left">
                    <div class="tm_logo">
                      <b-img :src="logoToUpload" fluid class="mr-1" v-if="showLogo" style="width: 110px; height: 110px" />
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
                    <p class="tm_invoice_number tm_m0">
                      {{ $t("company_invoices.invoice_no") }}:
                      <b>#{{ invoiceData.invoiceNumber }}</b>
                    </p>
                    <p class="tm_invoice_date tm_m0">
                      {{ $t("add_invoice.date") }}:
                      <b>{{ invoiceData.dateIssued }}</b>
                    </p>
                    <p class="tm_invoice_date tm_m0">
                      {{ $t("company_invoices.transaction_type") }}:
                      <b>{{
                        $t("company_invoices." + invoiceData.transactionType)
                      }}</b>
                    </p>
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
                <div class="tm_invoice_head tm_mb10" style="height: auto">
                  <div class="tm_invoice_left pr-5" style="width: 50%">
                    <h5 class="tm_mb2">
                      <b class="tm_primary_color">
                        {{ $t("add_invoice.supplier") }}:</b>
                    </h5>

                    <p style="margin-bottom: 5px">
                      <b> {{ $t("add_invoice.name") }}: </b>{{ invoiceData.supplierCompany.companName }}
                    </p>
                    <p style="margin-bottom: 5px">
                      <b> {{ $t("company_info.address") }}: </b>{{ invoiceData.supplierCompany.companyAddress }}
                    </p>
                    <p style="margin-bottom: 5px">
                      <b> {{ $t("add_invoice.id_no") }}: </b>
                      {{ invoiceData.supplierCompany.companyEic }}
                    </p>
                    <p style="margin-bottom: 5px">
                      <b> {{ $t("add_invoice.owner") }}: </b>
                      {{ invoiceData.supplierCompany.companyOwnerName }}
                    </p>
                    <p style="margin-bottom: 5px" v-if="invoiceData.supplierCompany.companyVatEic">
                      <b> {{ $t("add_invoice.vat_no") }}: </b>
                      {{ invoiceData.supplierCompany.companyVatEic }}
                    </p>
                  </div>
                  <div class="tm_invoice_right pr-3" style="width: 50%">
                    <h5 class="tm_mb2">
                      <b class="tm_primary_color">{{ $t("add_invoice.recipient") }}:</b>
                    </h5>

                    <p style="margin-bottom: 5px">
                      <span style="width: 100px"><b> {{ $t("add_invoice.name") }}: </b></span>
                      {{ invoiceData.recipientCompany.companName }}
                    </p>
                    <p style="margin-bottom: 5px">
                      <b> {{ $t("company_info.address") }}: </b>{{ invoiceData.recipientCompany.companyAddress }}
                    </p>
                    <p style="margin-bottom: 5px">
                      <b> {{ $t("add_invoice.id_no") }}: </b>
                      {{ invoiceData.recipientCompany.companyEic }}
                    </p>
                    <p style="margin-bottom: 5px">
                      <b> {{ $t("add_invoice.owner") }}: </b>
                      {{ invoiceData.recipientCompany.companyOwnerName }}
                    </p>
                    <p style="margin-bottom: 5px" v-if="invoiceData.recipientCompany.companyVatEic">
                      <b> {{ $t("add_invoice.vat_no") }}: </b>
                      {{ invoiceData.recipientCompany.companyVatEic }}
                    </p>
                  </div>
                </div>
                <div class="tm_table tm_style1">
                  <div class="">
                    <div class="tm_table_responsive">
                      <table>
                        <thead>
                          <tr :class="isBlue === true
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
                            <th class="tm_width_1 tm_semi_bold">
                              {{ $t("add_invoice.s_no") }}
                            </th>
                            <th class="tm_width_3 tm_semi_bold">
                              {{ $t("add_invoice.service_item_description") }}
                            </th>
                            <th class="tm_width_1 tm_semi_bold">
                              {{ $t("add_invoice.qty") }}
                            </th>
                            <th class="tm_width_1 tm_semi_bold">
                              {{ $t("add_invoice.measurement") }}
                            </th>
                            <th class="tm_width_3 tm_semi_bold">
                              {{ $t("add_invoice.single_amount_transaction") }}
                            </th>

                            <th class="tm_width_3 tm_semi_bold">
                              {{ $t("add_invoice.transaction_total_nonVat") }}
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="(item, index) in invoiceData.transactions" :key="index">
                            <td class="tm_width_1">{{ index + 1 }}</td>
                            <td class="tm_width_3">
                              {{ item.serviceOrItemDescription }}
                            </td>
                            <td class="tm_width_1">{{ item.quantity }}</td>
                            <td class="tm_width_1">{{ item.measurement }}</td>

                            <td class="tm_width_3">
                              {{ item.singleAmountTransaction }}
                            </td>

                            <td class="tm_width_3">
                              {{
                                (
                                  parseFloat(item.singleAmountTransaction) *
                                  parseFloat(item.quantity)
                                ).toFixed(2)
                              }}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div class="tm_invoice_footer tm_border_top tm_mb15 tm_m0_md">
                    <div class="tm_left_footer">
                      <div v-if="invoiceData.bankApi !== null">
                        <p class="tm_mb2">
                          <b class="tm_primary_color">{{ $t("add_invoice.payment_info") }}:</b>
                        </p>
                        <p class="tm_m0">
                          <b>BIC: </b> {{ invoiceData.bankApi.bic }}
                        </p>
                        <p class="tm_m0">
                          <b>IBAN: </b> {{ invoiceData.bankApi.iban }}
                        </p>
                        <p class="tm_m0">
                          <b>{{ $t("add_invoice.bank_name") }}: </b>{{ invoiceData.bankApi.name }}
                        </p>
                        <p class="tm_m0" v-if="invoiceData.vatPercent === 0 ||
                          invoiceData.vatPercent === '0'
                          ">
                          <b>{{ $t("add_invoice.non_vat_clause") }}: </b>
                          {{ invoiceData.vatCondition }}
                        </p>
                      </div>
                    </div>
                    <div class="tm_right_footer">
                      <table class="tm_mb15">
                        <tbody>
                          <tr class="tm_gray_bg">
                            <td class="tm_width_3 tm_primary_color">
                              {{ $t("add_invoice.total_price_non_vat") }}:
                            </td>
                            <td class="tm_width_3 tm_primary_color tm_text_right">
                              <span v-if="invoiceData.currency.toLowerCase().trim() ==
                                'lv' ||
                                invoiceData.currency.toLowerCase().trim() ==
                                'bgn' ||
                                invoiceData.currency == 'лв' ||
                                invoiceData.currency == 'лв.'
                                ">лв. {{ invoiceData.amountNonVat }}</span>
                              <span v-else>{{ invoiceData.currency }}
                                {{ invoiceData.amountNonVat }}</span>
                            </td>
                          </tr>

                          <tr class="tm_gray_bg">
                            <td class="tm_width_3 tm_primary_color">
                              {{ $t("add_invoice.vat") }} % :
                            </td>
                            <td class="tm_width_3 tm_primary_color tm_text_right">
                              {{ invoiceData.vatPercent }} %
                            </td>
                          </tr>

                          <tr class="tm_gray_bg">
                            <td class="tm_width_3 tm_primary_color">
                              {{ $t("company_invoices.vat_amount") }}:
                            </td>
                            <td class="tm_width_3 tm_primary_color tm_text_right">
                              <span v-if="invoiceData.currency.toLowerCase().trim() ==
                                'lv' ||
                                invoiceData.currency.toLowerCase().trim() ==
                                'bgn' ||
                                invoiceData.currency == 'лв' ||
                                invoiceData.currency == 'лв.'
                                ">лв. {{ invoiceData.vatAmount }}</span>
                              <span v-else>{{ invoiceData.currency }}
                                {{ invoiceData.vatAmount }}</span>
                            </td>
                          </tr>

                          <tr class="tm_gray_bg">
                            <td class="tm_width_3 tm_primary_color">
                              {{ $t("add_invoice.discount_percent") }}:
                            </td>
                            <td class="tm_width_3 tm_primary_color tm_text_right">
                              {{ invoiceData.tradeDiscountPercent }} %
                            </td>
                          </tr>

                          <tr class="tm_gray_bg">
                            <td class="tm_width_3 tm_primary_color">
                              {{ $t("add_invoice.discount_sum") }}:
                            </td>
                            <td class="tm_width_3 tm_primary_color tm_text_right">
                              <span v-if="invoiceData.currency.toLowerCase().trim() ==
                                'lv' ||
                                invoiceData.currency.toLowerCase().trim() ==
                                'bgn' ||
                                invoiceData.currency == 'лв' ||
                                invoiceData.currency == 'лв.'
                                ">лв. {{ invoiceData.tradeDiscountAmount }}</span>
                              <span v-else>{{ invoiceData.currency }}
                                {{ invoiceData.tradeDiscountAmount }}</span>
                            </td>
                          </tr>

                          <tr :class="isBlue === true
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
                            <td class="tm_width_3 tm_border_top_0 tm_bold tm_f16">
                              {{ $t("add_invoice.total_price") }}:
                            </td>
                            <td class="tm_width_3 tm_border_top_0 tm_bold tm_f16 tm_text_right">
                              <span v-if="invoiceData.currency.toLowerCase().trim() ==
                                'lv' ||
                                invoiceData.currency.toLowerCase().trim() ==
                                'bgn' ||
                                invoiceData.currency == 'лв' ||
                                invoiceData.currency == 'лв.'
                                ">лв. {{ invoiceData.totalAmount }}</span>
                              <span v-else>{{ invoiceData.currency }}
                                {{ invoiceData.totalAmount }}</span>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <table style="width: 80%; margin: auto; padding-top: 5rem; border-collapse: collapse;">
                    <tr>
                      <td style="text-align: center; padding: 30px;">
                        <div style=" margin-bottom: 20px;">
                          {{ invoiceData.supplierCompany.companyOwnerName }}
                        </div>
                        <div style="height: 50px; border-bottom: 1px dashed black;">
                          <!-- Space for supplier's signature -->
                        </div>
                        <div style="margin-top: 10px;">
                          {{ new Date().toLocaleDateString() }}
                        </div>
                      </td>
                      <td style="text-align: center; padding: 30px;">
                        <div style=" margin-bottom: 20px;">
                          {{ invoiceData.recipientCompany.companyOwnerName }}
                        </div>
                        <div style="height: 50px; border-bottom: 1px dashed black;">
                          <!-- Space for recipient's signature -->
                        </div>
                        <div style="margin-top: 10px;">
                          {{ new Date().toLocaleDateString() }}
                        </div>
                      </td>
                    </tr>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </b-col>

      <!-- template 03 -->
      <b-col cols="12" xl="10" md="10" class="w-100-print" v-if="isTemplateThree">
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
                <div class="tm_shape_2_in" :style="isBlue === true
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
                <div class="tm_shape_2_in" :style="isBlue === true
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
                <div class="tm_invoice_head tm_align_center tm_mb30">
                  <div class="tm_invoice_left">
                    <div class="tm_logo">
                      <b-img :src="logoToUpload" fluid class="mr-1" v-if="showLogo" style="width: 110px; height: 110px" />
                    </div>
                  </div>
                  <div class="tm_invoice_right tm_text_right"></div>
                </div>
                <div class="tm_invoice_info tm_mb20 tm_temp_2">
                  <div class="tm_invoice_info_list">
                    <p class="tm_invoice_date tm_m0">
                      {{ $t("add_invoice.date") }}:
                      <b class="tm_primary_color">{{
                        invoiceData.dateIssued
                      }}</b>
                    </p>
                    <p class="tm_invoice_number tm_m0">
                      {{ $t("company_invoices.invoice_no") }}:
                      <b class="tm_primary_color">#{{ invoiceData.invoiceNumber }}</b>
                    </p>
                    <p class="tm_invoice_date tm_m0">
                      {{ $t("company_invoices.transaction_type") }}:
                      <b class="tm_primary_color">{{
                        $t("company_invoices." + invoiceData.transactionType)
                      }}</b>
                    </p>
                  </div>
                </div>
                <div class="tm_invoice_head tm_mb10">
                  <div class="tm_invoice_left pr-5" style="width: 50%">
                    <h5 class="tm_mb2">
                      <b class="tm_primary_color">
                        {{ $t("add_invoice.supplier") }}:</b>
                    </h5>

                    <p style="margin-bottom: 5px">
                      <b> {{ $t("add_invoice.name") }}: </b>{{ invoiceData.supplierCompany.companName }}
                    </p>
                    <p style="margin-bottom: 5px">
                      <b> {{ $t("company_info.address") }}: </b>{{ invoiceData.supplierCompany.companyAddress }}
                    </p>
                    <p style="margin-bottom: 5px">
                      <b> {{ $t("add_invoice.id_no") }}: </b>
                      {{ invoiceData.supplierCompany.companyEic }}
                    </p>
                    <p style="margin-bottom: 5px">
                      <b> {{ $t("add_invoice.owner") }}: </b>
                      {{ invoiceData.supplierCompany.companyOwnerName }}
                    </p>
                    <p style="margin-bottom: 5px" v-if="invoiceData.supplierCompany.companyVatEic">
                      <b> {{ $t("add_invoice.vat_no") }}: </b>
                      {{ invoiceData.supplierCompany.companyVatEic }}
                    </p>
                  </div>
                  <div class="tm_invoice_right pr-3" style="width: 50%">
                    <h5 class="tm_mb2">
                      <b class="tm_primary_color">{{ $t("add_invoice.recipient") }}:</b>
                    </h5>

                    <p style="margin-bottom: 5px">
                      <span style="width: 100px"><b> {{ $t("add_invoice.name") }}: </b></span>
                      {{ invoiceData.recipientCompany.companName }}
                    </p>
                    <p style="margin-bottom: 5px">
                      <b> {{ $t("company_info.address") }}: </b>{{ invoiceData.recipientCompany.companyAddress }}
                    </p>
                    <p style="margin-bottom: 5px">
                      <b> {{ $t("add_invoice.id_no") }}: </b>
                      {{ invoiceData.recipientCompany.companyEic }}
                    </p>
                    <p style="margin-bottom: 5px">
                      <b> {{ $t("add_invoice.owner") }}: </b>
                      {{ invoiceData.recipientCompany.companyOwnerName }}
                    </p>
                    <p style="margin-bottom: 5px" v-if="invoiceData.recipientCompany.companyVatEic">
                      <b> {{ $t("add_invoice.vat_no") }}: </b>
                      {{ invoiceData.recipientCompany.companyVatEic }}
                    </p>
                  </div>
                </div>
                <div class="tm_table tm_style1 tm_mb30">
                  <div class="">
                    <div class="tm_table_responsive">
                      <table>
                        <thead>
                          <tr :class="isBlue === true
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
                            <th class="tm_width_1 tm_semi_bold">
                              {{ $t("add_invoice.s_no") }}
                            </th>
                            <th class="tm_width_3 tm_semi_bold">
                              {{ $t("add_invoice.service_item_description") }}
                            </th>
                            <th class="tm_width_1 tm_semi_bold">
                              {{ $t("add_invoice.qty") }}
                            </th>
                            <th class="tm_width_1 tm_semi_bold">
                              {{ $t("add_invoice.measurement") }}
                            </th>
                            <th class="tm_width_3 tm_semi_bold">
                              {{ $t("add_invoice.single_amount_transaction") }}
                            </th>

                            <th class="tm_width_3 tm_semi_bold">
                              {{ $t("add_invoice.transaction_total_nonVat") }}
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="(item, index) in invoiceData.transactions" :key="index">
                            <td class="tm_width_1">{{ index + 1 }}</td>
                            <td class="tm_width_3">
                              {{ item.serviceOrItemDescription }}
                            </td>
                            <td class="tm_width_1">{{ item.quantity }}</td>
                            <td class="tm_width_1">{{ item.measurement }}</td>

                            <td class="tm_width_3">
                              {{ item.singleAmountTransaction }}
                            </td>

                            <td class="tm_width_3">
                              {{
                                (
                                  parseFloat(item.singleAmountTransaction) *
                                  parseFloat(item.quantity)
                                ).toFixed(2)
                              }}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div class="tm_invoice_footer">
                    <div class="tm_left_footer">
                      <div v-if="invoiceData.bankApi !== null">
                        <p class="tm_mb2">
                          <b class="tm_primary_color">{{ $t("add_invoice.payment_info") }}:</b>
                        </p>
                        <p class="tm_m0">
                          <b>BIC: </b> {{ invoiceData.bankApi.bic }}
                        </p>
                        <p class="tm_m0">
                          <b>IBAN: </b> {{ invoiceData.bankApi.iban }}
                        </p>
                        <p class="tm_m0">
                          <b>{{ $t("add_invoice.bank_name") }}: </b>{{ invoiceData.bankApi.name }}
                        </p>
                        <p class="tm_m0" v-if="invoiceData.vatPercent === '0' ||
                          invoiceData.vatPercent === 0
                          ">
                          <b>{{ $t("add_invoice.non_vat_clause") }}: </b>
                          {{ invoiceData.vatCondition }}
                        </p>
                      </div>
                    </div>
                    <div class="tm_right_footer">
                      <table>
                        <tbody>
                          <tr>
                            <td class="tm_width_3 tm_primary_color tm_border_none tm_pt0 pl-2">
                              {{ $t("add_invoice.total_price_non_vat") }}:
                            </td>
                            <td class="tm_width_3 tm_primary_color tm_text_right tm_border_none tm_pt0">
                              <span v-if="invoiceData.currency.toLowerCase().trim() ==
                                'lv' ||
                                invoiceData.currency.toLowerCase().trim() ==
                                'bgn' ||
                                invoiceData.currency == 'лв' ||
                                invoiceData.currency == 'лв.'
                                ">лв. {{ invoiceData.amountNonVat }}</span>
                              <span v-else>{{ invoiceData.currency }}
                                {{ invoiceData.amountNonVat }}</span>
                            </td>
                          </tr>

                          <tr>
                            <td class="tm_width_3 tm_primary_color tm_border_none tm_pt0 pl-2">
                              {{ $t("add_invoice.vat") }} % :
                            </td>
                            <td class="tm_width_3 tm_primary_color tm_text_right tm_border_none tm_pt0">
                              {{ invoiceData.vatPercent }} %
                            </td>
                          </tr>

                          <tr>
                            <td class="tm_width_3 tm_primary_color tm_border_none tm_pt0 pl-2">
                              {{ $t("company_invoices.vat_amount") }}:
                            </td>
                            <td class="tm_width_3 tm_primary_color tm_text_right tm_border_none tm_pt0">
                              <span v-if="invoiceData.currency.toLowerCase().trim() ==
                                'lv' ||
                                invoiceData.currency.toLowerCase().trim() ==
                                'bgn' ||
                                invoiceData.currency == 'лв' ||
                                invoiceData.currency == 'лв.'
                                ">лв. {{ invoiceData.vatAmount }}</span>
                              <span v-else>{{ invoiceData.currency }}
                                {{ invoiceData.vatAmount }}</span>
                            </td>
                          </tr>

                          <tr>
                            <td class="tm_width_3 tm_primary_color tm_border_none tm_pt0 pl-2">
                              {{ $t("add_invoice.discount_percent") }}:
                            </td>
                            <td class="tm_width_3 tm_primary_color tm_text_right tm_border_none tm_pt0">
                              {{ invoiceData.tradeDiscountPercent }} %
                            </td>
                          </tr>

                          <tr>
                            <td class="tm_width_3 tm_primary_color tm_border_none tm_pt0 pl-2">
                              {{ $t("add_invoice.discount_sum") }}:
                            </td>
                            <td class="tm_width_3 tm_primary_color tm_text_right tm_border_none tm_pt0">
                              <span v-if="invoiceData.currency.toLowerCase().trim() ==
                                'lv' ||
                                invoiceData.currency.toLowerCase().trim() ==
                                'bgn' ||
                                invoiceData.currency == 'лв' ||
                                invoiceData.currency == 'лв.'
                                ">лв. {{ invoiceData.tradeDiscountAmount }}</span>
                              <span v-else>{{ invoiceData.currency }}
                                {{ invoiceData.tradeDiscountAmount }}</span>
                            </td>
                          </tr>

                          <tr class="tm_border_top">
                            <td class="tm_width_3 tm_border_top_0 tm_bold tm_f16 tm_primary_color pl-2">
                              {{ $t("add_invoice.total_price") }}:
                            </td>
                            <td class="tm_width_3 tm_border_top_0 tm_bold tm_f16 tm_primary_color tm_text_right">
                              <span v-if="invoiceData.currency.toLowerCase().trim() ==
                                'lv' ||
                                invoiceData.currency.toLowerCase().trim() ==
                                'bgn' ||
                                invoiceData.currency == 'лв' ||
                                invoiceData.currency == 'лв.'
                                ">лв. {{ invoiceData.totalAmount }}</span>
                              <span v-else>{{ invoiceData.currency }}
                                {{ invoiceData.totalAmount }}</span>
                            </td>
                          </tr>
                        </tbody>
                      </table>

                      <div class="tm_shape_3 tm_accent_bg_10"></div>
                    </div>
                  </div>
                </div>

                <table style="width: 80%; margin: auto; padding-top: 5rem; border-collapse: collapse;">
                  <tr>
                    <td style="text-align: center; padding: 30px;">
                      <div style=" margin-bottom: 20px;">
                        {{ invoiceData.supplierCompany.companyOwnerName }}
                      </div>
                      <div style="height: 50px; border-bottom: 1px dashed black;">
                        <!-- Space for supplier's signature -->
                      </div>
                      <div style="margin-top: 10px;">
                        {{ new Date().toLocaleDateString() }}
                      </div>
                    </td>
                    <td style="text-align: center; padding: 30px;">
                      <div style=" margin-bottom: 20px;">
                        {{ invoiceData.recipientCompany.companyOwnerName }}
                      </div>
                      <div style="height: 50px; border-bottom: 1px dashed black;">
                        <!-- Space for recipient's signature -->
                      </div>
                      <div style="margin-top: 10px;">
                        {{ new Date().toLocaleDateString() }}
                      </div>
                    </td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
        </div>



      </b-col>

      <!-- template 04 -->
      <b-col cols="12" xl="10" md="10" class="w-100-print" v-if="isTemplateFour">
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
                      <b-img :src="logoToUpload" fluid class="mr-1" v-if="showLogo" style="width: 110px; height: 110px" />
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
                      {{ $t("company_invoices.invoice_no") }}:
                      <b class="tm_primary_color" :style="isGray === true
                        ? 'color: black !important'
                        : 'color: white !important'
                        ">#{{ invoiceData.invoiceNumber }}</b>
                    </p>
                    <p class="tm_invoice_date tm_m0" style="z-index: 9" :style="isGray === true
                      ? 'color: black !important'
                      : 'color: white !important'
                      ">
                      {{ $t("add_invoice.date") }}:
                      <b class="tm_primary_color" :style="isGray === true
                        ? 'color: black !important'
                        : 'color: white !important'
                        ">{{ invoiceData.dateIssued }}</b>
                    </p>
                    <p class="tm_invoice_date tm_m0" style="z-index: 9" :style="invoiceData.invoiceColor === 'GRAY'
                      ? 'color: black !important'
                      : 'color: white !important'
                      ">
                      {{ $t("company_invoices.transaction_type") }}:
                      <b class="tm_primary_color" :style="invoiceData.invoiceColor === 'GRAY'
                        ? 'color: black !important'
                        : 'color: white !important'
                        ">{{
    $t("company_invoices." + invoiceData.transactionType)
  }}</b>
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
                <div class="tm_invoice_head tm_mb10">
                  <div class="tm_invoice_left pr-5" style="width: 50%">
                    <h5 class="tm_mb2">
                      <b class="tm_primary_color">
                        {{ $t("add_invoice.supplier") }}:</b>
                    </h5>

                    <p style="margin-bottom: 5px">
                      <b> {{ $t("add_invoice.name") }}: </b>{{ invoiceData.supplierCompany.companName }}
                    </p>
                    <p style="margin-bottom: 5px">
                      <b> {{ $t("company_info.address") }}: </b>{{ invoiceData.supplierCompany.companyAddress }}
                    </p>
                    <p style="margin-bottom: 5px">
                      <b> {{ $t("add_invoice.id_no") }}: </b>
                      {{ invoiceData.supplierCompany.companyEic }}
                    </p>
                    <p style="margin-bottom: 5px">
                      <b> {{ $t("add_invoice.owner") }}: </b>
                      {{ invoiceData.supplierCompany.companyOwnerName }}
                    </p>
                    <p style="margin-bottom: 5px" v-if="invoiceData.supplierCompany.companyVatEic">
                      <b> {{ $t("add_invoice.vat_no") }}: </b>
                      {{ invoiceData.supplierCompany.companyVatEic }}
                    </p>
                  </div>
                  <div class="tm_invoice_right pr-3" style="width: 50%">
                    <h5 class="tm_mb2">
                      <b class="tm_primary_color">{{ $t("add_invoice.recipient") }}:</b>
                    </h5>

                    <p style="margin-bottom: 5px">
                      <span style="width: 100px"><b> {{ $t("add_invoice.name") }}: </b></span>
                      {{ invoiceData.recipientCompany.companName }}
                    </p>
                    <p style="margin-bottom: 5px">
                      <b> {{ $t("company_info.address") }}: </b>{{ invoiceData.recipientCompany.companyAddress }}
                    </p>
                    <p style="margin-bottom: 5px">
                      <b> {{ $t("add_invoice.id_no") }}: </b>
                      {{ invoiceData.recipientCompany.companyEic }}
                    </p>
                    <p style="margin-bottom: 5px">
                      <b> {{ $t("add_invoice.owner") }}: </b>
                      {{ invoiceData.recipientCompany.companyOwnerName }}
                    </p>
                    <p style="margin-bottom: 5px" v-if="invoiceData.recipientCompany.companyVatEic">
                      <b> {{ $t("add_invoice.vat_no") }}: </b>
                      {{ invoiceData.recipientCompany.companyVatEic }}
                    </p>
                  </div>
                </div>
                <div class="tm_table tm_style1 tm_mb30">
                  <div class="tm_table_responsive">
                    <table>
                      <thead>
                        <tr :class="isBlue === true
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
                          <th class="tm_width_1 tm_semi_bold">
                            {{ $t("add_invoice.s_no") }}
                          </th>
                          <th class="tm_width_3 tm_semi_bold">
                            {{ $t("add_invoice.service_item_description") }}
                          </th>
                          <th class="tm_width_1 tm_semi_bold">
                            {{ $t("add_invoice.qty") }}
                          </th>
                          <th class="tm_width_1 tm_semi_bold">
                            {{ $t("add_invoice.measurement") }}
                          </th>
                          <th class="tm_width_3 tm_semi_bold">
                            {{ $t("add_invoice.single_amount_transaction") }}
                          </th>

                          <th class="tm_width_3 tm_semi_bold">
                            {{ $t("add_invoice.transaction_total_nonVat") }}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(item, index) in invoiceData.transactions" :key="index">
                          <td class="tm_width_1">{{ index + 1 }}</td>
                          <td class="tm_width_3">
                            {{ item.serviceOrItemDescription }}
                          </td>
                          <td class="tm_width_1">{{ item.quantity }}</td>
                          <td class="tm_width_1">{{ item.measurement }}</td>

                          <td class="tm_width_3">
                            {{ item.singleAmountTransaction }}
                          </td>

                          <td class="tm_width_3">
                            {{
                              (
                                parseFloat(item.singleAmountTransaction) *
                                parseFloat(item.quantity)
                              ).toFixed(2)
                            }}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div class="tm_invoice_footer mb-5" style="padding-bottom: 200px">
                    <div class="tm_left_footer">
                      <div v-if="invoiceData.bankApi !== null">
                        <p class="tm_mb2">
                          <b class="tm_primary_color">{{ $t("add_invoice.payment_info") }}:</b>
                        </p>
                        <p class="tm_m0">
                          <b>BIC: </b> {{ invoiceData.bankApi.bic }}
                        </p>
                        <p class="tm_m0">
                          <b>IBAN: </b> {{ invoiceData.bankApi.iban }}
                        </p>
                        <p class="tm_m0">
                          <b>{{ $t("add_invoice.bank_name") }}: </b>{{ invoiceData.bankApi.name }}
                        </p>
                        <p class="tm_m0" v-if="invoiceData.vatPercent === '0' ||
                          invoiceData.vatPercent === 0
                          ">
                          <b>{{ $t("add_invoice.non_vat_clause") }}: </b>{{ invoiceData.vatCondition }}
                        </p>
                      </div>
                    </div>
                    <div class="tm_right_footer">
                      <table>
                        <tbody>
                          <tr>
                            <td class="tm_width_3 tm_primary_color tm_border_none">
                              {{ $t("add_invoice.total_price_non_vat") }}:
                            </td>
                            <td class="tm_width_3 tm_primary_color tm_text_right tm_border_none tm_pt0">
                              <span v-if="invoiceData.currency.toLowerCase().trim() ==
                                'lv' ||
                                invoiceData.currency.toLowerCase().trim() ==
                                'bgn' ||
                                invoiceData.currency == 'лв' ||
                                invoiceData.currency == 'лв.'
                                ">лв. {{ invoiceData.amountNonVat }}</span>
                              <span v-else>{{ invoiceData.currency }}
                                {{ invoiceData.amountNonVat }}</span>
                            </td>
                          </tr>

                          <tr>
                            <td class="tm_width_3 tm_primary_color tm_border_none tm_pt0">
                              {{ $t("add_invoice.vat") }} % :
                            </td>
                            <td class="tm_width_3 tm_primary_color tm_text_right tm_border_none tm_pt0">
                              {{ invoiceData.vatPercent }} %
                            </td>
                          </tr>

                          <tr>
                            <td class="tm_width_3 tm_primary_color tm_border_none tm_pt0">
                              {{ $t("company_invoices.vat_amount") }}:
                            </td>
                            <td class="tm_width_3 tm_primary_color tm_text_right tm_border_none tm_pt0">
                              <span v-if="invoiceData.currency.toLowerCase().trim() ==
                                'lv' ||
                                invoiceData.currency.toLowerCase().trim() ==
                                'bgn' ||
                                invoiceData.currency == 'лв' ||
                                invoiceData.currency == 'лв.'
                                ">лв. {{ invoiceData.vatAmount }}</span>
                              <span v-else>{{ invoiceData.currency }}
                                {{ invoiceData.vatAmount }}</span>
                            </td>
                          </tr>

                          <tr>
                            <td class="tm_width_3 tm_primary_color tm_border_none tm_pt0">
                              {{ $t("add_invoice.discount_percent") }}:
                            </td>
                            <td class="tm_width_3 tm_primary_color tm_text_right tm_border_none tm_pt0">
                              {{ invoiceData.tradeDiscountPercent }} %
                            </td>
                          </tr>

                          <tr>
                            <td class="tm_width_3 tm_primary_color tm_border_none tm_pt0">
                              {{ $t("add_invoice.discount_sum") }}:
                            </td>
                            <td class="tm_width_3 tm_primary_color tm_text_right tm_border_none tm_pt0">
                              <span v-if="invoiceData.currency.toLowerCase().trim() ==
                                'lv' ||
                                invoiceData.currency.toLowerCase().trim() ==
                                'bgn' ||
                                invoiceData.currency == 'лв' ||
                                invoiceData.currency == 'лв.'
                                ">лв. {{ invoiceData.tradeDiscountAmount }}</span>
                              <span v-else>{{ invoiceData.currency }}
                                {{ invoiceData.tradeDiscountAmount }}</span>
                            </td>
                          </tr>

                          <tr class="tm_border_top tm_border_bottom">
                            <td class="tm_width_3 tm_border_top_0 tm_bold tm_f16 tm_primary_color">
                              {{ $t("add_invoice.total_price") }}:
                            </td>
                            <td class="tm_width_3 tm_border_top_0 tm_bold tm_f16 tm_primary_color tm_text_right">
                              <span v-if="invoiceData.currency.toLowerCase().trim() ==
                                'lv' ||
                                invoiceData.currency.toLowerCase().trim() ==
                                'bgn' ||
                                invoiceData.currency == 'лв' ||
                                invoiceData.currency == 'лв.'
                                ">лв. {{ invoiceData.totalAmount }}</span>
                              <span v-else>{{ invoiceData.currency }}
                                {{ invoiceData.totalAmount }}</span>
                            </td>
                          </tr>
                        </tbody>
                      </table>


                    </div>

                  </div>
                  <div style="width: 50%; float: left;">
                    <table style="width: 100%; margin: auto; padding-top: 5rem; border-collapse: collapse;">
                      <tr>
                        <td style="text-align: center; padding: 30px;">
                          <div style=" margin-bottom: 20px;">
                            {{ invoiceData.supplierCompany.companyOwnerName }}
                          </div>
                          <div style="height: 50px; border-bottom: 1px dashed black;">
                            <!-- Space for supplier's signature -->
                          </div>
                          <div style="margin-top: 10px;">
                            {{ new Date().toLocaleDateString() }}
                          </div>
                        </td>
                        <td style="text-align: center; padding: 30px;">
                          <div style=" margin-bottom: 20px;">
                            {{ invoiceData.recipientCompany.companyOwnerName }}
                          </div>
                          <div style="height: 50px; border-bottom: 1px dashed black;">
                            <!-- Space for recipient's signature -->
                          </div>
                          <div style="margin-top: 10px;">
                            {{ new Date().toLocaleDateString() }}
                          </div>
                        </td>
                      </tr>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </b-col>

      <!-- Right Col: Card -->
      <b-col cols="12" md="2" xl="2" class="invoice-actions hide-from-print">
        <b-card>
          <!-- Button: DOwnload -->
          <b-button v-ripple.400="'rgba(186, 191, 199, 0.15)'" variant="outline-secondary" class="mb-75" block
            @click="generatePDF()">
            {{ $t("download") }}
          </b-button>

          <vue-html2pdf :show-layout="false" :float-layout="true" :enable-download="true" :preview-modal="false"
            :paginate-elements-by-height="1100" filename="invoice" :pdf-quality="2" :manual-pagination="false"
            pdf-format="a3" :pdf-margin="10" pdf-orientation="portrait" pdf-content-width="1125px"
            @progress="onProgress($event)" @hasDownloaded="hasDownloaded($event)" ref="html2Pdf">
            <section class="invoice-pdf" slot="pdf-content">
              <div v-if="invoiceData">
                <invoice-download :invoice-data="invoiceData" :logo-to-upload="logoToUpload" />
              </div>
              <b-alert variant="danger" :show="invoiceData === undefined">
                <h4 class="alert-heading">Error fetching invoice data</h4>
                <div class="alert-body">
                  No invoice found with this invoice id. Check
                  <b-link class="alert-link" :to="{ name: 'apps-invoice-list' }">
                    Invoice List
                  </b-link>
                  for other invoices.
                </div>
              </b-alert>
            </section>
          </vue-html2pdf>

          <vue-html2pdf :show-layout="false" :float-layout="true" :enable-download="true" :preview-modal="false"
            :paginate-elements-by-height="1100" filename="attachinvoice" :pdf-quality="2" :manual-pagination="false"
            pdf-format="a3" :pdf-margin="10" pdf-orientation="portrait" pdf-content-width="1125px"
            @progress="onProgress($event)" @hasDownloaded="hasDownloaded($event)" ref="html2Pdfnew">
            <section class="invoice-pdf" id="new-invoice" slot="pdf-content">
              <div v-if="invoiceData">
                <invoice-download :invoice-data="invoiceData" :logo-to-upload="logoToUpload" />
              </div>
              <b-alert variant="danger" :show="invoiceData === undefined">
                <h4 class="alert-heading">Error fetching invoice data</h4>
                <div class="alert-body">
                  No invoice found with this invoice id. Check
                  <b-link class="alert-link" :to="{ name: 'apps-invoice-list' }">
                    Invoice List
                  </b-link>
                  for other invoices.
                </div>
              </b-alert>
            </section>
          </vue-html2pdf>

          <!-- Button: Print -->
          <b-button v-ripple.400="'rgba(186, 191, 199, 0.15)'" variant="outline-secondary" class="mb-75" block
            @click="printInvoice">
            {{ $t("print") }}
          </b-button>
          <!-- Button verify  -->
          <b-button v-ripple.400="'rgba(186, 191, 199, 0.15)'" variant="outline-secondary" class="mb-75" block
            @click="invoiceEdit(invoiceData)" v-if="!invoiceData.verified">
            {{ $t("add_invoice.verify") }}
          </b-button>
          <!-- Button: Edit -->
          <b-button v-ripple.400="'rgba(186, 191, 199, 0.15)'" variant="outline-secondary" class="mb-75" block :to="{
            name: 'company-invoice-edit',
            params: {
              id: $route.params.id,
              companyId: $route.params.companyId,
            },
          }">
            {{ $t("company_info.edit") }}
          </b-button>

          <!-- Button: Edit -->
          <b-button v-b-modal.modal-1 v-ripple.400="'rgba(186, 191, 199, 0.15)'" variant="outline-secondary" class="mb-75"
            block @click="selectSendEmail()">
            {{ $t("add_invoice.send_email") }}
          </b-button>
        </b-card>
      </b-col>
    </b-row>
    <b-modal ref="my-modal" hide-footer title="Using Component Methods">
      <div class="d-block text-center">
        <form @submit.prevent="onSubmit" class="add-form">
          <label>Title</label>
          <input type="text" v-model="name" name="name" value="Title" placeholder="Your Title">
          <label>Email</label>
          <input type="email" v-model="email" required name="email" placeholder="Your Email">
          <label>Message</label>
          <textarea name="message" v-model="message" cols="30" rows="5" placeholder="Message">
                    </textarea>
          <input type="submit" value="Send">
        </form>
      </div>
    </b-modal>
  </section>
</template>

<script>
import { ref, onUnmounted } from "@vue/composition-api";
import store from "@/store";
import router from "@/router";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
import {
  BImg,
  BRow,
  BCol,
  BCard,
  BCardBody,
  BTableLite,
  BCardText,
  BButton,
  BAlert,
  BLink,
  VBToggle,
  BCardHeader,
} from "bootstrap-vue";
import Logo from "@core/layouts/components/Logo.vue";
import useJwt from "@/auth/jwt/useJwt";
import Ripple from "vue-ripple-directive";
import invoiceStoreModule from "../invoiceStoreModule";
import InvoiceDownload from "../invoice-download/InvoiceDownload.vue";
import VueHtml2pdf from "vue-html2pdf";
import TabList from "../../TabList.vue";
import axios from "@/libs/axios";
import Vue from 'vue';

export default {
  directives: {
    Ripple,
    "b-toggle": VBToggle,
  },
  components: {
    BImg,
    BRow,
    BCol,
    BCard,
    BCardBody,
    BTableLite,
    BCardText,
    BButton,
    BAlert,
    BLink,
    VueHtml2pdf,
    Logo,
    BCardHeader,
    InvoiceDownload,
    TabList,
  },
  mounted() {
    // Make sure the component is mounted before accessing the reference
    Vue.use(VueHtml2pdf);
  },
  setup() {
    const invoiceData = ref(null);
    const hasBankDetails = ref(false);

    const isOriginal = ref(false);
    const isTemplateOne = ref(false);
    const isTemplateTwo = ref(false);
    const isTemplateThree = ref(false);
    const isTemplateFour = ref(false);

    // const isUploading = ref("");

    const showLogo = ref(null);

    const logoToUpload = ref("");

    const isBlue = ref(false);
    const isPurple = ref(false);
    const isGreen = ref(false);
    const isOrange = ref(false);
    const isGray = ref(false);

    // Invoice Description
    // ? Your real data will contain this information

    const INVOICE_APP_STORE_MODULE_NAME = "app-invoice";

    // Register module
    if (!store.hasModule(INVOICE_APP_STORE_MODULE_NAME))
      store.registerModule(INVOICE_APP_STORE_MODULE_NAME, invoiceStoreModule);

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(INVOICE_APP_STORE_MODULE_NAME))
        store.unregisterModule(INVOICE_APP_STORE_MODULE_NAME);
    });

    store
      .dispatch("app-invoice/fetchInvoice", {
        id: router.currentRoute.params.id,
      })
      .then((response) => {
        response.data.transactions.map((item, index) => {
          item.index = index + 1;
          return item;
        });
        invoiceData.value = response.data;

        if (invoiceData.value.templateId === "1") {
          isTemplateOne.value = true;
        } else if (invoiceData.value.templateId === "2") {
          isTemplateTwo.value = true;
        } else if (invoiceData.value.templateId === "3") {
          isTemplateThree.value = true;
        } else if (invoiceData.value.templateId === "4") {
          isTemplateFour.value = true;
        } else {
          isOriginal.value = true;
        }

        //
        if (invoiceData.value.invoiceColor === "BLUE") isBlue.value = true;
        else if (invoiceData.value.invoiceColor === "PURPLE")
          isPurple.value = true;
        else if (invoiceData.value.invoiceColor === "GREEN")
          isGreen.value = true;
        else if (invoiceData.value.invoiceColor === "ORANGE")
          isOrange.value = true;
        else isGray.value = true;

        //
        if (invoiceData.value.bankApi !== null) {
          if (
            invoiceData.value.bankApi.name !== "" ||
            invoiceData.value.bankApi.bic !== "" ||
            invoiceData.value.bankApi.iban !== ""
          ) {
            hasBankDetails.value = true;
          }
        }

        if (invoiceData.value.logoId === "") {
          // isUploading.value = "Upload Logo here";
          showLogo.value = false;
        } else {
          // logoToUpload.value = invoiceData.value.logoId;
          axios
            .get(
              `${axios.defaults.baseURL}/binaries/api/get-binary/${invoiceData.value.logoId}/${router.currentRoute.params.companyId}`,
              { responseType: "blob" }
            )
            .then((response) => {
              if (response.status === 200) {
                // console.log(response.data);
                const reader = new FileReader();
                reader.readAsDataURL(response.data);
                reader.onload = function () {
                  const filePath = reader.result;
                  logoToUpload.value = filePath;
                  showLogo.value = true;
                  // isUploading.value = "Change Logo";
                  // console.log(filePath);
                };
              }
            })
            .catch();
        }
      })
      .catch((error) => {
        if (error.response.status === 404) {
          invoiceData.value = undefined;
        }
      });

    const printInvoice = () => {
      window.print();
    };

    return {
      logoToUpload,
      showLogo,
      isOriginal,
      isTemplateOne,
      isTemplateTwo,
      isTemplateThree,
      isTemplateFour,
      hasBankDetails,
      invoiceData,
      printInvoice,
      isGray,
      isPurple,
      isGreen,
      isOrange,
      isBlue,
      sendEmail: false,
      name: '',
      email: '',
      message: '',
      file: '',
      newpdfblob: ''
    };
  },
  methods: {
    onProgress(event) {
      console.log(`Processed: ${event} / 100`);
    },
    async hasDownloaded(event) {
      console.log(" Lineeeee...... ", event);
      this.attachPDFToFile(event)
    },
    showModal() {
      this.$refs['my-modal'].show()
    },
    hideModal() {
      this.$refs['my-modal'].hide()
    },
    toggleModal() {
      // We pass the ID of the button that we want to return focus to
      // when the modal has hidden
      this.$refs['my-modal'].toggle('#toggle-btn')
    },
    uploadFile() {
      this.file = this.$refs.file.files[0];
      console.log(" File Uploading data ", this.file);
      this.fileToByteArray(this.file, function (byteArrayData) {
        console.log(" File Byte ARray ", byteArrayData);
      });
    },
    generatePDF() {

      this.$refs.html2Pdf.generatePdf();
    },
    // async beforeDownload({ html2pdf, options, pdfContent }) {
    //   await html2pdf().set(options).from(pdfContent).toPdf().get('pdf').then((pdf) => {
    //     const blob = new Blob([pdf], { type: 'application/pdf' });
    //     console.log(" New Coming before here...... ", pdf, blob);
    //   }).save();
    // },
    async selectSendEmail() {
      this.sendEmail = false;
      this.$refs['my-modal'].show();
      this.message = `Здравейте!
Моля да намерите прикачена Фактура № ${this.invoiceData.invoiceNumber} от дата: ${this.invoiceData.dateIssued} г. 
                    
Екипът на Coherent Accounting Ви пожелава успешен ден!

*Моля, не отговаряйте на това съобщение! То е автоматично генерирано. Ако имате въпроси, моля свържете се с фирмата доставчик изпратения документ.

Copyright © 2023 Coherent Accounting, All rights reserved.`;
      this.name = `Фактура с Номер: ${this.invoiceData.invoiceNumber} от : ${this.invoiceData.supplierCompany.companName}`;
      //const newpdfContent123 = this.$refs.html2Pdf.$el.innerHTML;
      //console.log(" New DONDNDNNDDN ", newpdfContent123, this.$el, this.$refs.html2Pdf);
      // this.$refs.html2Pdfnew.generatePdf()
      //these are important data
      //let data = Object.assign({}, this.$refs.html2Pdfnew.$el.innerHTML);
      //console.log(" new pdf data is ", data);
      //const newblob123 = new Blob([data], { type: 'application/pdf' });
      //this.fileToByteArray(newblob123, function (byteArrayData) {
      //console.log(" New BYYYY TTT ARRAAAYYYY ", byteArrayData);
      //});
    },
    attachPDFToFile(pdfBlob) {
      this.file = new File([pdfBlob], 'document.pdf');
      // Perform operations with the file as needed
      // For demonstration purposes, we'll just log a message
      console.log('PDF attached to file:', this.file);
      this.fileToByteArray(this.file, function (byteArrayData) {
        console.log(" hrhthththththhtthth ", byteArrayData);
      })
    },
    invoiceEdit(invoiceData) {


      invoiceData.verified = true
      console.log(invoiceData)
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
              title: `Invoice Updated Successfully`,
              icon: "EditIcon",
              variant: "success",
            },
          });


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
    },
    handleFileUpload(e) {
      this.file = e.target.files[0];
      console.log("Invoice Data ", this.file);
    },
    createBase64Image(fileObject) {
      const reader = new FileReader();

      reader.onload = (e) => {
        this.userObject.imgPersonal = e.target.result;
      };
      reader.readAsBinaryString(fileObject)
      console.log("file object", fileObject);
    },
    async fileToByteArray(file, callback) {
      var reader = new FileReader();
      reader.onloadend = function (e) {
        if (e.target.readyState === FileReader.DONE) {
          var arrayBuffer = e.target.result;
          var uint8Array = new Uint8Array(arrayBuffer);
          var byteArray = Array.from(uint8Array);
          callback(byteArray);
        }
      };
      reader.readAsArrayBuffer(file);
    },
    onSubmit(e) {
      e.preventDefault()
      console.log("fdfgdfgdfgfdg", this.name)
      //const content = this.getHTMLContent(); // Replace with your HTML content
      //this.$refs.html2Pdf.generatePdf().then((pdfBlob) => {
      // Perform actions with the generated PDF blob (e.g., send via email)
      //this.sendEmailWithAttachment(pdfBlob);
      //});
      this.email = e.target.email.value;
      console.log("Target Values", e.target.email.value, this.invoiceData.invoiceNumber);
      //this.$refs.html2Pdf.generatePdf('<h1>Your PDF Content</h1>', this.savePDF);
      this.sendEmailFromAPI(e.target.email.value, e.target.message.value, e.target.name.value, this.invoiceData.invoiceNumber);
      this.$refs['my-modal'].hide();
    },
    savePDF(pdfData) {
      const file = new File([pdfData], 'invoice.pdf', { type: 'application/pdf' });
      const url = URL.createObjectURL(file);
      const link = document.createElement('a');
      link.href = url;
      link.download = file.name;
      link.click();
      console.log(" URL FILE ", url);
      URL.revokeObjectURL(url);
      console.log(" URL 222 FILE ", url);
    },
    sendEmailWithAttachment(pdfBlob) {
      // Your logic to send email with the PDF attachment
      // ...
      console.log(pdfBlob);
    },
    getHTMLContent() {
      // Replace with your code to get the HTML content for the PDF generation
      // ...
      // Example HTML content
      const htmlContent = `
                <html>
                  <head>
                    <title>PDF Content</title>
                  </head>
                  <body>
                    <h1>PDF Content</h1>
                    <p>This is the content of the PDF.</p>
                  </body>
                </html>
              `;
      return htmlContent;
    },
    async sendEmailFromAPI(emailData, messageData, nameData, invoiceNumber) {
      //sending Email info
      const byteArray = [];
      const formData = new FormData();
      console.log(" New file generating data... ", this.file);
      //const fileDataArray =  this.fileToByteArray(this.file, function (byteArrayData) {
      const fileDataArray = this.fileToByteArray(this.file, function (byteArrayData) {
        console.log("byteArrayData  jdajdas ... ", byteArrayData);
        // Use the byte array as needed
        byteArray.push(byteArrayData);
        //return byteArrayData;
        console.log("under function data ", byteArray, emailData, messageData, nameData);
        const response = axios.post("account/api/invoice/send-to-email", {
          "file": byteArrayData,
          "invoiceNumber": invoiceNumber,
          "toEmail": emailData,
          "message": messageData,
          "title": nameData
        }, {
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem("accessToken"), // assuming accessToken is correct
            'Content-Type': 'application/json'
          },
          responseType: 'blob',
        });
      });
      setInterval(
        console.log(" Byte Code Generate ", byteArray)
        , 3000);
      //console.log(" Byte Code Generate ", fileDataArray, byteArray);
      //console.log(" New Messages Data is here... ", this.message);
      const token = localStorage.getItem("accessToken");
      //try {
      //const response = await axios.post("account/api/invoice/send-to-email", {
      //"file": byteArray,
      //"toEmail": "javeedraza25@gmail.com",
      //"message": "zzzzzzzz",
      //"title": "zazaza"
      //}, {
      //headers: {
      //'Authorization': 'Bearer ' + localStorage.getItem("accessToken"), // assuming accessToken is correct
      //'Content-Type': 'application/json'
      //},
      //responseType: 'blob',
      //});
      //} catch (error) {

      //}
      this.$toast({
        component: ToastificationContent,
        props: {
          title: `Email Send Successfully !!!`,
          icon: "EditIcon",
          variant: "success",
        },
      });
    },
    sendEmailData(e) {
      e.preventDefault() // Prevent page from reloading.
      // console.log(" New data here ");
    },
  },
};
</script>

<style lang="scss">
@import "~@core/scss/base/pages/app-invoice.scss";
</style>

<style lang="scss">
@media print {

  html,
  body {
    height: initial !important;
    overflow: initial !important;
    -webkit-print-color-adjust: exact;
  }

  // Global Styles
  body {
    background-color: transparent !important;
  }

  nav.header-navbar {
    display: none;
  }

  .main-menu {
    display: none;
  }

  .header-navbar-shadow {
    display: none !important;
  }

  .content.app-content {
    margin-left: 0;
    padding-top: 2rem !important;
  }

  footer.footer {
    display: none;
  }

  .card {
    background-color: transparent;
    box-shadow: none;
  }

  .customizer-toggle {
    display: none !important;
  }

  // Invoice Specific Styles
  .invoice-preview-wrapper {
    .row.invoice-preview {
      .col-md-8 {
        max-width: 100%;
        flex-grow: 1;
      }

      .invoice-preview-card {
        .card-body:nth-of-type(2) {
          .row {
            >.col-12 {
              max-width: 50% !important;
            }

            .col-12:nth-child(2) {
              display: flex;
              align-items: flex-start;
              justify-content: flex-end;
              margin-top: 0 !important;
            }
          }
        }
      }
    }

    // Action Right Col
    .invoice-actions {
      display: none;
    }
  }
}

@media print {
  .w-100-print {
    max-width: 100% !important;
    flex: 0 0 100% !important;
  }

  .hide-from-print {
    display: none;
  }

  .abc {
    position: fixed;
    bottom: 0;
  }
}

.gap-2 {
  grid-gap: 25px;
}

.invoice-preview-list .invoice-date-wrapper {
  display: flex;
  grid-gap: 10px;
  justify-content: flex-start;
}

.invoice-preview-list .invoice-date-wrapper p.invoice-date-title {
  width: 12rem !important;
  min-width: max-content;
  font-size: 12px;
}

.invoice-preview-list .invoice-date-wrapper.invoice-middle-content p.invoice-date-title {
  width: auto !important;
  min-width: max-content;
}

.invoiceStat .invoice-total-item {
  display: flex;
  grid-gap: 20px;
  justify-content: space-between;
}

.invoice-preview-list .invoice-date-title,
.invoiceStat .invoice-total-item .invoice-total-title {
  font-weight: 500 !important;
}

.invoice-preview-list .invoice-date {
  font-weight: bold !important;
}

.invoice-preview.date-issued {
  width: max-content;
  margin-right: 0;
  margin-left: auto;
}

.invoiceNumber {
  font-weight: 500;
  font-size: 16px;
}

.dark-layout .card.invoice-card {
  border-color: #3b4253 !important;
}

.card-header.invoice-header h5 {
  color: #fff !important;
}

.card-body.invoice-body .invoice-date-wrapper {
  margin-bottom: 0 !important;
  padding: 0.2rem 0 !important;
  border-bottom: 1px solid #ebe9f1;
}

.dark-layout .card-body.invoice-body .invoice-date-wrapper {
  border-color: #3b4253 !important;
}

.card-body.invoice-body.invoice-body-pdf {
  padding: 1rem;
  padding-top: 0;
}

.invoice-pdf {
  background-color: #f8f8f8;
}

.dark-layout .invoice-pdf {
  background-color: #161d31;
}

.invoice-preview .invoice-date-wrapper .invoice-date-title,
.invoice-preview .invoice-date-wrapper .invoice-date {
  margin-bottom: 0;
}

.invoice-pdf .gap-2 {
  gap: 15px;
}
</style>

<style lang="scss" scoped>
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
  height: 110px;
  position: relative;
}

.tm_invoice.tm_style1.tm_type1 .tm_shape_bg {
  position: absolute;
  height: 100%;
  width: 75%;
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
  width: 65.5%;
  right: -60px;
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
    // top: initial;
    // margin-top: 20px;
    margin-right: 0;
    border-radius: 0;
    -webkit-transform: skewX(35deg);
    transform: skewX(35deg);
    position: absolute;
    height: 100%;
    width: 65.5%;
    // right: -60px;
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

@media print {
  .tm_shape.tm_type1 {
    position: fixed !important;
    top: auto;
    bottom: 0 !important;
  }

  .tm_bars.tm_type1 {
    position: fixed !important;
    bottom: 0 !important;
  }

  .tm_shape_2 {
    position: fixed !important;
    bottom: 25px !important;
  }

  .tm_temp_2 {
    margin-top: 70px !important;
  }

  .tm_invoice.tm_style1.tm_type1 .tm_shape_bg {
    position: absolute;
    height: 100%;
    width: 75%;
    -webkit-transform: skewX(35deg);
    transform: skewX(35deg);
    top: 0px;
    right: -90px !important;
    overflow: hidden;
  }
}
</style>

<style scoped>
* {
  box-sizing: border-box;
}

.container {
  display: block;
  margin: auto;
  text-align: center;
  border-radius: 5px;
  background-color: #f2f2f2;
  padding: 20px;
  width: 50%;
}

label {
  float: left;
}

input[type=text],
[type=email],
textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  margin-top: 6px;
  margin-bottom: 16px;
  resize: vertical;
}

input[type=submit] {
  background-color: #4CAF50;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

input[type=submit]:hover {
  background-color: #45a049;
}
</style>
