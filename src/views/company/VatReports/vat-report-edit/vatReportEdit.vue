<template>
  <section class="invoice-add-wrapper">
    <b-form>
      <b-card no-body>
        <b-card-header
          class="justify-content-center mb-2"
          style="border-bottom: 0.5px lightgrey solid"
        >
          <div class="d-flex align-items-center mb-0">
            <h4 class="title mr-1 mb-0">VAT Report</h4>
          </div>
        </b-card-header>
        <b-card-body>
          <!--  -->
          <b-row>
            <b-col cols="12" xl="6" md="6">
              <b-row>
                <b-col cols="8" xl="8" md="8" class="mt-1 pt-0"
                  ><h6>
                    <b>
                      СПРАВКА-ДЕКЛАРАЦИЯ ЗА ДАНЪК ВЪРХУ ДОБАВЕНАТА СТОЙНОСТ
                    </b>
                  </h6>
                </b-col>
                <b-col cols="2" xl="2" md="2"> </b-col>
              </b-row>
            </b-col>
            <b-col cols="12" xl="6" md="6" style="align-content: flex-end">
              <!--  -->
              <b-row>
                <b-col cols="3" xl="3" md="3"></b-col>
                <b-col cols="7" xl="7" md="7"> <p>TД на НАП/офис</p></b-col>
                <b-col cols="2" xl="2" md="2"></b-col>
              </b-row>
              <!--  -->
              <b-row>
                <b-col cols="3" xl="3" md="3"></b-col>
                <b-col cols="9" xl="9" md="9">
                  <p>
                    Входящ No................../....................... г.
                  </p></b-col
                >
                <!-- <b-col cols="2" xl="2" md="2"></b-col> -->
              </b-row>
              <!--  -->
              <b-row class="mt-0">
                <b-col cols="3" xl="3" md="3"></b-col>
                <b-col cols="6" xl="6" md="6">
                  <p>Попълва се от приходната администрация</p></b-col
                >
                <b-col cols="2" xl="2" md="2"></b-col>
              </b-row>

              <!--  -->
              <b-row>
                <b-col cols="3" xl="3" md="3"><p>Данъчен период:</p></b-col>
                <b-col cols="6" xl="6" md="6">
                  <b-form-input id="input-01" v-model="vatReportData.period" />
                  <small><b>мм / гггг</b></small></b-col
                >
                <b-col cols="3" xl="3" md="3"></b-col>
              </b-row>
              <!--  -->
            </b-col>
          </b-row>

          <!--  -->
          <b-row class="pb-2" style="border-bottom: 1px solid lightgrey">
            <b-col cols="12" xl="6" md="6" class="mt-2">
              <b-row
                ><b-col cols="8" xl="8" md="8" class="mt-1"
                  ><h6>
                    <b>
                      A. Наименование и адрес за кореспонденция на
                      регистрираното лице
                    </b>
                  </h6>
                </b-col>
                <b-col cols="4" xl="4" md="4"> </b-col
              ></b-row>
              <b-row>
                <b-col cols="8" xl="8" md="8" class="mt-1">
                  <b-form-input
                    id="input-02"
                    v-model="vatReportData.nameAndAddress"
                  />
                </b-col>
                <b-col cols="4" xl="4" md="4"> </b-col>
              </b-row>
            </b-col>
            <b-col cols="12" xl="6" md="6">
              <b-row class="mt-2">
                <b-col cols="3" xl="3" md="3"></b-col>
                <b-col cols="6" xl="6" md="6"> <p>ИН по ЗДДС:</p></b-col>
                <b-col cols="3" xl="3" md="3">
                  <b-form-input id="input-03" v-model="vatReportData.vatNumber"
                /></b-col>
              </b-row>

              <!--  -->
              <b-row class="mt-1">
                <b-col cols="3" xl="3" md="3"></b-col>
                <b-col cols="6" xl="6" md="6"> <p>ИН:</p></b-col>
                <b-col cols="3" xl="3" md="3">
                  <b-form-input id="input-04"
                /></b-col>
              </b-row>
            </b-col>
          </b-row>

          <!--  -->
          <b-row class="mt-2">
            <b-col cols="4" xl="4" md="4" class="mt-1"> </b-col>
            <b-col cols="8" xl="8" md="8" style="padding-left: 0px"
              ><h5>
                <b>
                  Раздел А: Данни за начислен данък върху добавената стойност
                </b>
              </h5>
            </b-col>
          </b-row>

          <!--  input column 01 and 20-->
          <b-row class="mt-1 pb-2" style="border-bottom: 1px solid lightgrey">
            <b-col cols="4" xl="4" md="4" class=""
              ><p>
                Общ размер на данъчните основи за облагане с ДДС (сума от кл. 11
                до кл. 16)
              </p>
            </b-col>
            <b-col cols="1" xl="1" md="1" style="padding: 0px"
              ><b-form-input
                id="input-column-01"
                v-model="vatReportData.cell01"
              />
            </b-col>
            <b-col
              cols="1"
              xl="1"
              md="1"
              style="text-align: center; padding-top: 7px"
              ><h4>01</h4>
            </b-col>
            <b-col cols="4" xl="4" md="4" class=""
              ><p>Всичко начислен ДДС (сума от кл.21 до кл.24)</p>
            </b-col>
            <b-col cols="1" xl="1" md="1" style="padding: 0px"
              ><b-form-input
                id="input-column-20"
                v-model="vatReportData.cell20"
              />
            </b-col>
            <b-col
              cols="1"
              xl="1"
              md="1"
              style="text-align: center; padding-top: 7px"
              ><h4>20</h4>
            </b-col>
          </b-row>

          <!--  -->
          <b-row class="mt-1">
            <b-col cols="5" xl="5" md="5" class=""
              ><h5>
                <b>Данъчна основа, подлежаща на облагане със ставка 20%:</b>
              </h5>
            </b-col>
          </b-row>

          <!--input column 11 and 21  -->
          <b-row class="mt-1">
            <b-col cols="4" xl="4" md="4" class=""
              ><p>
                - данъчна основа на облагаемите доставки, вкл. Доставките при
                условията на дистанционни продажби с място на изпълнение на
                територията на страната
              </p>
            </b-col>
            <b-col cols="1" xl="1" md="1" style="padding: 0px"
              ><b-form-input
                id="input-column-11"
                v-model="vatReportData.cell11"
              />
            </b-col>
            <b-col
              cols="1"
              xl="1"
              md="1"
              style="text-align: center; padding-top: 7px"
              ><h4>11</h4>
            </b-col>
            <b-col cols="4" xl="4" md="4" class=""><p>Начислен ДДС:</p> </b-col>
            <b-col cols="1" xl="1" md="1" style="padding: 0px"
              ><b-form-input
                id="input-column-21"
                v-model="vatReportData.cell21"
              />
            </b-col>
            <b-col
              cols="1"
              xl="1"
              md="1"
              style="text-align: center; padding-top: 7px"
              ><h4>21</h4>
            </b-col>
          </b-row>

          <!-- input column 12 and 22 -->
          <b-row class="mt-1">
            <b-col cols="4" xl="4" md="4" class=""
              ><p>
                - данъчна основа на ВОП и данъчна основа на получени доставки по
                чл.82, ал. 2 - 5 ЗДДС
              </p>
            </b-col>
            <b-col cols="1" xl="1" md="1" style="padding: 0px"
              ><b-form-input
                id="input-column-12"
                v-model="vatReportData.cell12"
              />
            </b-col>
            <b-col
              cols="1"
              xl="1"
              md="1"
              style="text-align: center; padding-top: 7px"
              ><h4>12</h4>
            </b-col>
            <b-col cols="4" xl="4" md="4" class=""
              ><p>
                Начислен ДДС за ВОП и за получени доставки по чл. 82, ал. 2-5
                ЗДДС
              </p>
            </b-col>
            <b-col cols="1" xl="1" md="1" style="padding: 0px"
              ><b-form-input
                id="input-column-22"
                v-model="vatReportData.cell22"
              />
            </b-col>
            <b-col
              cols="1"
              xl="1"
              md="1"
              style="text-align: center; padding-top: 7px"
              ><h4>22</h4>
            </b-col>
          </b-row>

          <!-- input column 23 -->
          <b-row class="mt-1">
            <b-col cols="4" xl="4" md="4" class=""> </b-col>
            <b-col cols="1" xl="1" md="1" style="padding: 0px"> </b-col>
            <b-col
              cols="1"
              xl="1"
              md="1"
              style="text-align: center; padding-top: 7px"
            >
            </b-col>
            <b-col cols="4" xl="4" md="4" class=""
              ><p>
                Начислен данък за доставки на стоки и услуги за лични нужди
              </p>
            </b-col>
            <b-col cols="1" xl="1" md="1" style="padding: 0px"
              ><b-form-input
                id="input-column-23"
                v-model="vatReportData.cell23"
              />
            </b-col>
            <b-col
              cols="1"
              xl="1"
              md="1"
              style="text-align: center; padding-top: 7px"
              ><h4>23</h4>
            </b-col>
          </b-row>

          <!-- input columns 13 and 24 -->
          <b-row class="mt-1 pb-2" style="border-bottom: 1px solid lightgrey">
            <b-col cols="4" xl="4" md="4" class=""
              ><p>Данъчна основа на облагаемите доставки със ставка 9%</p>
            </b-col>
            <b-col cols="1" xl="1" md="1" style="padding: 0px"
              ><b-form-input
                id="input-column-13"
                v-model="vatReportData.cell13"
              />
            </b-col>
            <b-col
              cols="1"
              xl="1"
              md="1"
              style="text-align: center; padding-top: 7px"
              ><h4>13</h4>
            </b-col>
            <b-col cols="4" xl="4" md="4" class=""
              ><p>Начислен ДДС (9%)</p>
            </b-col>
            <b-col cols="1" xl="1" md="1" style="padding: 0px"
              ><b-form-input
                id="input-column-24"
                v-model="vatReportData.cell24"
              />
            </b-col>
            <b-col
              cols="1"
              xl="1"
              md="1"
              style="text-align: center; padding-top: 7px"
              ><h4>24</h4>
            </b-col>
          </b-row>

          <!--  -->
          <b-row class="mt-1">
            <b-col cols="5" xl="5" md="5" class=""
              ><h5>
                <b>Данъчна основа, подлежаща на облагане със ставка 0%:</b>
              </h5>
            </b-col>
          </b-row>

          <!-- input column 14-->
          <b-row class="mt-1">
            <b-col cols="4" xl="4" md="4" class=""
              ><p>- данъчна основа за доставки по глава трета от ЗДДС</p>
            </b-col>
            <b-col cols="1" xl="1" md="1" style="padding: 0px"
              ><b-form-input
                id="input-column-14"
                v-model="vatReportData.cell14"
              />
            </b-col>
            <b-col
              cols="1"
              xl="1"
              md="1"
              style="text-align: center; padding-top: 7px"
              ><h4>14</h4>
            </b-col>
            <b-col cols="6" xl="6" md="6" class=""> </b-col>
          </b-row>

          <!-- input column 15  -->
          <b-row class="mt-1">
            <b-col cols="4" xl="4" md="4" class=""
              ><p>- данъчна основа ВОД на стоки</p>
            </b-col>
            <b-col cols="1" xl="1" md="1" style="padding: 0px"
              ><b-form-input
                id="input-column-15"
                v-model="vatReportData.cell15"
              />
            </b-col>
            <b-col
              cols="1"
              xl="1"
              md="1"
              style="text-align: center; padding-top: 7px"
              ><h4>15</h4>
            </b-col>
            <b-col cols="6" xl="6" md="6" class=""> </b-col>
          </b-row>

          <!-- input column 16  -->
          <b-row class="mt-1">
            <b-col cols="4" xl="4" md="4" class=""
              ><p>
                - данъчна основа на доставки по чл. 140, 146 и чл. 173 ЗДДС
              </p>
            </b-col>
            <b-col cols="1" xl="1" md="1" style="padding: 0px"
              ><b-form-input
                id="input-column-16"
                v-model="vatReportData.cell16"
              />
            </b-col>
            <b-col
              cols="1"
              xl="1"
              md="1"
              style="text-align: center; padding-top: 7px"
              ><h4>16</h4>
            </b-col>
            <b-col cols="6" xl="6" md="6" class=""> </b-col>
          </b-row>

          <!-- input column 17 -->
          <b-row class="mt-1">
            <b-col cols="4" xl="4" md="4" class=""
              ><p>
                - Данъчна основа на доставки на услуги по чл. 21, ал. 2 с място
                на изпълнение на територията на друга държава членка
              </p>
            </b-col>
            <b-col cols="1" xl="1" md="1" style="padding: 0px"
              ><b-form-input
                id="input-column-17"
                v-model="vatReportData.cell17"
              />
            </b-col>
            <b-col
              cols="1"
              xl="1"
              md="1"
              style="text-align: center; padding-top: 7px"
              ><h4>17</h4>
            </b-col>
            <b-col cols="6" xl="6" md="6" class=""> </b-col>
          </b-row>

          <!--  input column 18-->
          <b-row class="mt-1">
            <b-col cols="4" xl="4" md="4" class=""
              ><p>
                - Данъчна основа на доставки по чл. 69, ал. 2 ЗДДС, вкл.
                доставките при условията на дистанционни продажби с място на
                изпълнение на територията на друга държава членка както и на
                доставки като посредник в тристранна операция
              </p>
            </b-col>
            <b-col cols="1" xl="1" md="1" style="padding: 0px"
              ><b-form-input
                id="input-column-18"
                v-model="vatReportData.cell18"
              />
            </b-col>
            <b-col
              cols="1"
              xl="1"
              md="1"
              style="text-align: center; padding-top: 7px"
              ><h4>18</h4>
            </b-col>
            <b-col cols="6" xl="6" md="6" class=""> </b-col>
          </b-row>

          <!-- input column 19 -->
          <b-row class="mt-1 pb-2" style="border-bottom: 1px solid lightgrey">
            <b-col cols="4" xl="4" md="4" class=""
              ><p>
                - Данъчна основа на освободените доставки и освободените ВОП
              </p>
            </b-col>
            <b-col cols="1" xl="1" md="1" style="padding: 0px"
              ><b-form-input
                id="input-column-19"
                v-model="vatReportData.cell19"
              />
            </b-col>
            <b-col
              cols="1"
              xl="1"
              md="1"
              style="text-align: center; padding-top: 7px"
              ><h4>19</h4>
            </b-col>
            <b-col cols="6" xl="6" md="6" class=""> </b-col>
          </b-row>

          <!--  -->
          <b-row class="mt-2">
            <b-col cols="4" xl="4" md="4" class="mt-1"> </b-col>
            <b-col cols="8" xl="8" md="8" style="padding-left: 0px"
              ><h5>
                <b> Раздел Б: Данни за упражнено право на данъчен кредит </b>
              </h5>
            </b-col>
          </b-row>

          <!-- input column 30 -->
          <b-row class="mt-1">
            <b-col cols="4" xl="4" md="4" class=""
              ><p>
                - Данъчна основа и данък на получените доставки по чл. 82, ал.
                2-5 ЗДДС и вноса без право на данъчен кредит или без данък
              </p>
            </b-col>
            <b-col cols="1" xl="1" md="1" style="padding: 0px"
              ><b-form-input
                id="input-column-30"
                v-model="vatReportData.cell30"
              />
            </b-col>
            <b-col
              cols="1"
              xl="1"
              md="1"
              style="text-align: center; padding-top: 7px"
              ><h4>30</h4>
            </b-col>
            <b-col cols="6" xl="6" md="6" class=""> </b-col>
          </b-row>

          <!--  -->
          <b-row class="mt-1">
            <b-col cols="4" xl="4" md="4" class=""
              ><p>
                Данъчна основа на получените доставки, ВОП, получените доставки
                по чл. 82, ал. 2-5 ЗДДС, вноса, както и данъчна основа на
                получените доставки, използвани за извършване на доставки по чл.
                69, ал. 2 ЗДДС:
              </p>
            </b-col>
            <b-col cols="8" xl="8" md="8" style="padding: 0px"> </b-col>
          </b-row>

          <!-- input column 31 and 41 -->
          <b-row class="mt-1">
            <b-col cols="4" xl="4" md="4" class=""
              ><p>- с право на пълен данъчен кредит</p>
            </b-col>
            <b-col cols="1" xl="1" md="1" style="padding: 0px"
              ><b-form-input
                id="input-column-31"
                v-model="vatReportData.cell31"
              />
            </b-col>
            <b-col
              cols="1"
              xl="1"
              md="1"
              style="text-align: center; padding-top: 7px"
              ><h4>31</h4>
            </b-col>
            <b-col cols="4" xl="4" md="4" class=""
              ><p>ДДС с право на пълен данъчен кредит</p>
            </b-col>
            <b-col cols="1" xl="1" md="1" style="padding: 0px"
              ><b-form-input
                id="input-column-41"
                v-model="vatReportData.cell41"
              />
            </b-col>
            <b-col
              cols="1"
              xl="1"
              md="1"
              style="text-align: center; padding-top: 7px"
              ><h4>41</h4>
            </b-col>
          </b-row>

          <!-- input column 32 and 42 -->
          <b-row class="mt-1">
            <b-col cols="4" xl="4" md="4" class=""
              ><p>- с право на частичен данъчен кредит</p>
            </b-col>
            <b-col cols="1" xl="1" md="1" style="padding: 0px"
              ><b-form-input
                id="input-column-32"
                v-model="vatReportData.cell32"
              />
            </b-col>
            <b-col
              cols="1"
              xl="1"
              md="1"
              style="text-align: center; padding-top: 7px"
              ><h4>32</h4>
            </b-col>
            <b-col cols="4" xl="4" md="4" class=""
              ><p>ДДС с право на частичен данъчен кредит</p>
            </b-col>
            <b-col cols="1" xl="1" md="1" style="padding: 0px"
              ><b-form-input
                id="input-column-42"
                v-model="vatReportData.cell42"
              />
            </b-col>
            <b-col
              cols="1"
              xl="1"
              md="1"
              style="text-align: center; padding-top: 7px"
              ><h4>42</h4>
            </b-col>
          </b-row>

          <!-- input column 43 -->
          <b-row class="mt-1">
            <b-col cols="6" xl="6" md="6" class=""> </b-col>
            <b-col cols="4" xl="4" md="4" class=""
              ><p>Годишна корекция по чл. 73, ал. 8 (+/-)</p>
            </b-col>
            <b-col cols="1" xl="1" md="1" style="padding: 0px"
              ><b-form-input
                id="input-column-43"
                v-model="vatReportData.cell43"
              />
            </b-col>
            <b-col
              cols="1"
              xl="1"
              md="1"
              style="text-align: center; padding-top: 7px"
              ><h4>43</h4>
            </b-col>
          </b-row>

          <!--  input column 33 and 40-->
          <b-row class="mt-1 pb-2" style="border-bottom: 1px solid lightgrey">
            <b-col cols="4" xl="4" md="4" class=""
              ><p>- коефициент по чл. 73, ал. 5 ЗДДС</p>
            </b-col>
            <b-col cols="1" xl="1" md="1" style="padding: 0px"
              ><b-form-input
                id="input-column-33"
                v-model="vatReportData.cell33"
              />
            </b-col>
            <b-col
              cols="1"
              xl="1"
              md="1"
              style="text-align: center; padding-top: 7px"
              ><h4>33</h4>
            </b-col>
            <b-col cols="4" xl="4" md="4" class=""
              ><p>Общо данъчен кредит (кл.41 + кл.42 х кл. 33 + кл.43)</p>
            </b-col>
            <b-col cols="1" xl="1" md="1" style="padding: 0px"
              ><b-form-input
                id="input-column-40"
                v-model="vatReportData.cell40"
              />
            </b-col>
            <b-col
              cols="1"
              xl="1"
              md="1"
              style="text-align: center; padding-top: 7px"
              ><h4>40</h4>
            </b-col>
          </b-row>

          <!--  -->
          <b-row class="mt-2">
            <b-col cols="4" xl="4" md="4" class="mt-1"> </b-col>
            <b-col cols="8" xl="8" md="8" style="padding-left: 0px"
              ><h5><b> Раздел В: Резултат за периода </b></h5>
            </b-col>
          </b-row>

          <!-- input column 50 and 60 -->
          <b-row class="mt-1 pb-2" style="border-bottom: 1px solid lightgrey">
            <b-col cols="4" xl="4" md="4" class=""
              ><p>ДДС за внасяне (кл.20 - кл.40) >= 0</p>
            </b-col>
            <b-col cols="1" xl="1" md="1" style="padding: 0px"
              ><b-form-input
                id="input-column-50"
                v-model="vatReportData.cell50"
              />
            </b-col>
            <b-col
              cols="1"
              xl="1"
              md="1"
              style="text-align: center; padding-top: 7px"
              ><h4>50</h4>
            </b-col>
            <b-col cols="4" xl="4" md="4" class="">
              <p>ДДС за възстановяване (кл.20 - кл.40) < 0</p>
            </b-col>
            <b-col cols="1" xl="1" md="1" style="padding: 0px"
              ><b-form-input
                id="input-column-60"
                v-model="vatReportData.cell60"
              />
            </b-col>
            <b-col
              cols="1"
              xl="1"
              md="1"
              style="text-align: center; padding-top: 7px"
              ><h4>60</h4>
            </b-col>
          </b-row>

          <!--  -->
          <b-row class="mt-2">
            <b-col cols="4" xl="4" md="4" class="mt-1"> </b-col>
            <b-col cols="8" xl="8" md="8" style="padding-left: 0px"
              ><h5><b> Раздел Г: ДДС за внасяне </b></h5>
            </b-col>
          </b-row>

          <!-- input column 70 and 71 -->
          <b-row class="mt-1 pb-2" style="border-bottom: 1px solid lightgrey">
            <b-col cols="4" xl="4" md="4" class=""
              ><p>
                Данък за внасяне от кл. 50, приспаднат по реда на чл. 92, ал. 1
                ЗДДС
              </p>
            </b-col>
            <b-col cols="1" xl="1" md="1" style="padding: 0px"
              ><b-form-input
                id="input-column-70"
                v-model="vatReportData.cell70"
              />
            </b-col>
            <b-col
              cols="1"
              xl="1"
              md="1"
              style="text-align: center; padding-top: 7px"
              ><h4>70</h4>
            </b-col>
            <b-col cols="4" xl="4" md="4" class="">
              <p>Данък за внасяне от кл. 50, внесен ефективно</p>
            </b-col>
            <b-col cols="1" xl="1" md="1" style="padding: 0px"
              ><b-form-input
                id="input-column-71"
                v-model="vatReportData.cell71"
              />
            </b-col>
            <b-col
              cols="1"
              xl="1"
              md="1"
              style="text-align: center; padding-top: 7px"
              ><h4>71</h4>
            </b-col>
          </b-row>

          <!--  -->
          <b-row class="mt-2">
            <b-col cols="4" xl="4" md="4" class="mt-1"> </b-col>
            <b-col cols="8" xl="8" md="8" style="padding-left: 0px"
              ><h5><b> Раздел Д: ДДС, подлежащ на възстановяване </b></h5>
            </b-col>
          </b-row>

          <!-- input column 80 and 81 -->
          <b-row class="mt-1">
            <b-col cols="4" xl="4" md="4" class=""
              ><p>
                Съгласно чл. 92, ал. 1 ЗДДС в 30-дневен срок от подаването на
                тази декларация
              </p>
            </b-col>
            <b-col cols="1" xl="1" md="1" style="padding: 0px"
              ><b-form-input
                id="input-column-80"
                v-model="vatReportData.cell80"
              />
            </b-col>
            <b-col
              cols="1"
              xl="1"
              md="1"
              style="text-align: center; padding-top: 7px"
              ><h4>80</h4>
            </b-col>
            <b-col cols="4" xl="4" md="4" class="">
              <p>
                Съгласно чл. 92, ал. 3 ЗДДС в 30-дневен срок от подаването на
                тази декларация
              </p>
            </b-col>
            <b-col cols="1" xl="1" md="1" style="padding: 0px"
              ><b-form-input
                id="input-column-81"
                v-model="vatReportData.cell81"
              />
            </b-col>
            <b-col
              cols="1"
              xl="1"
              md="1"
              style="text-align: center; padding-top: 7px"
              ><h4>81</h4>
            </b-col>
          </b-row>

          <!-- input column 82 -->
          <b-row class="mt-1">
            <b-col cols="6" xl="6" md="6" class=""> </b-col>
            <b-col cols="4" xl="4" md="4" class="">
              <p>
                Съгласно чл. 92, ал. 4 ЗДДС в 30-дневен срок от подаването на
                тази декларация
              </p>
            </b-col>
            <b-col cols="1" xl="1" md="1" style="padding: 0px"
              ><b-form-input
                id="input-column-82"
                v-model="vatReportData.cell82"
              />
            </b-col>
            <b-col
              cols="1"
              xl="1"
              md="1"
              style="text-align: center; padding-top: 7px"
              ><h4>82</h4>
            </b-col>
          </b-row>

          <b-row class="mt-1">
            <b-col cols="12" xl="12" md="12"> <p>Долуподписаният:</p></b-col>
          </b-row>

          <b-row class="mt pb-2" style="border-bottom: 1px solid lightgrey">
            <b-col cols="4" xl="4" md="4" class=""
              ><b-form-input
                id="responsible-person"
                v-model="vatReportData.responsiblePerson"
              />
            </b-col>
            <b-col cols="2" xl="2" md="2" style="padding: 0px"
              ><p>декларирам, че:</p>
            </b-col>
          </b-row>

          <!--  -->
          <b-row class="mt-1">
            <b-col cols="4" xl="4" md="4"> </b-col>
            <b-col cols="8" xl="8" md="8">
              <p>
                представлявам лицето, посочено в кл. А, и посочената в този
                формуляр информация е вярна и точна.
              </p></b-col
            >
          </b-row>

          <b-row class="">
            <b-col cols="4" xl="4" md="4"> </b-col>
            <b-col cols="8" xl="8" md="8">
              <p>са налице обстоятелствата по чл. 92, ал. 3 и 4 ЗДДС.</p></b-col
            >
          </b-row>

          <b-row class="mt-1">
            <b-col cols="4" xl="4" md="4"> </b-col>
            <b-col cols="8" xl="8" md="8" style="padding-left: 0px">
              <p>
                Известно ми е, че за неверни данни нося отговорност по чл. 313
                НК
              </p></b-col
            >
          </b-row>

          <b-row class="">
            <b-col cols="4" xl="4" md="4" class=""
              ><p>Дата на съставяне:</p>
            </b-col>
            <b-col cols="1" xl="1" md="1" style="padding: 0px"
              ><b-form-input
                id="invoice-data-id"
                v-model="vatReportData.dateCreated"
              />
            </b-col>
            <b-col cols="4" xl="4" md="4" style="padding-top: 7px"
              ><p>Длъжност: Изпълнителен директор</p>
            </b-col>
          </b-row>

          <b-row class="mt-2 mb-2 text-end">
            <b-col cols="10" md="11" xl="10"></b-col>
            <b-col cols="2" md="2" xl="2"
              ><b-button
                variant="primary"
                style="margin-left: 100px"
                @click="editVatReport()"
              >
                Update
              </b-button></b-col
            >
          </b-row>
        </b-card-body>
      </b-card>
    </b-form>
  </section>
</template>
  
  
  <script>
import {
  BCard,
  BForm,
  BRow,
  BCol,
  BCardBody,
  BFormInput,
  BButton,
  BLink,
  BCardHeader,
} from "bootstrap-vue";

import { ref, onUnmounted } from "@vue/composition-api";
import store from "@/store";
import useJwt from "@/auth/jwt/useJwt";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
import router from "@/router";
import vatReportsStoreModule from "../vatReportsStoreModule";

export default {
  components: {
    BForm,
    BCard,
    BRow,
    BCol,
    BFormInput,
    BButton,
    BLink,
    BCardBody,
    BCardHeader,
    vatReportsStoreModule,
  },
  data() {
    return {};
  },
  methods: {
    state() {
      return 1;
    },

    //edit vat report
    editVatReport() {
      // console.log(data);
      let token = useJwt.getToken();
      useJwt
        .editCompanyVatReport(
          token,
          router.currentRoute.params.id,
          this.vatReportData
        )
        .then((response) => {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: `Vat Updated Successfully`,
              icon: "EditIcon",
              variant: "success",
            },
          });
          this.$router.push({ name: 'CompanyView', params: { id: router.currentRoute.params.companyId }})

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
    },
  },

  setup() {
    const INVOICE_APP_STORE_MODULE_NAME = "vat-reports";

    // Register module
    if (!store.hasModule(INVOICE_APP_STORE_MODULE_NAME))
      store.registerModule(
        INVOICE_APP_STORE_MODULE_NAME,
        vatReportsStoreModule
      );

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(INVOICE_APP_STORE_MODULE_NAME))
        store.unregisterModule(INVOICE_APP_STORE_MODULE_NAME);
    });

    const vatReportData = ref({
      responsiblePerson: "",
        taxPeriod: "",
        nameAndAddress: "",
        vatNumber: "",
        input04: "",
        inputColumn01: "",
        inputColumn11: "",
        inputColumn12: "",
        inputColumn13: "",
        inputColumn14: "",
        inputColumn15: "",
        inputColumn16: "",
        inputColumn17: "",
        inputColumn18: "",
        inputColumn19: "",
        inputColumn20: "",
        inputColumn21: "",
        inputColumn22: "",
        inputColumn23: "",
        inputColumn24: "",
        inputColumn25: "",
        inputColumn26: "",
        inputColumn30: "",
        inputColumn31: "",
        inputColumn32: "",
        inputColumn33: "",
        inputColumn40: "",
        inputColumn41: "",
        inputColumn42: "",
        inputColumn50: "",
        inputColumn60: "",
        inputColumn70: "",
        inputColumn80: "",
        inputColumn81: "",
        dateCreated: "",
    });
    store
      .dispatch("vat-reports/fetchSingleVatReport", {
        id: router.currentRoute.params.id,
      })
      .then((response) => {
        vatReportData.value = response.data;
        // console.log(vatReportData.value);
      })
      .catch((error) => {
        if (error.response.status === 404) {
          vatReportData.value = undefined;
        }
      });

    return {
      vatReportData,
    };
  },
};
</script>
  
  <style lang="scss">
</style>