<template>
    <div>
        <b-card header-bg-variant="light" :header="$t('lbl.termofuse')" >
            <b-card-text>
        <span style="white-space: break-spaces">
          <p>
            {{ $t("lbl.termofuseone") }}
            <a href="https://coherent-accounting.com/"
              >https://coherent-accounting.com/</a
            >
            {{ $t("lbl.termofusetwo") }}
          </p>
          <ul>
            <li class="p-list">{{ $t("lbl.termofusethree") }}</li>
          </ul>
          <p>
            {{ $t("lbl.text_one") }}
            <a href="https://coherent-accounting.com/"
              >https://coherent-accounting.com/</a
            >
            {{ $t("lbl.text_two") }}
            <a href="https://coherent-accounting.com/"
              >https://coherent-accounting.com/</a
            >
            {{ $t("lbl.text_three") }}
          </p>

          <ul>
            <li class="p-list">{{ $t("lbl.gt") }}</li>
          </ul>
          <p>
            <b> {{ $t("lbl.ar1") }}</b
            >{{ $t("lbl.means") }}
          </p>
          <p>
            {{ $t("lbl.textdev") }}
            <a href="https://coherent-accounting.com/"
              >https://coherent-accounting.com/</a
            >{{ $t("lbl.textdev1") }}<br />
            {{ $t("lbl.textdev2") }} <br />

            {{ $t("lbl.textdev3") }}
            <a href="https://coherent-accounting.com/"
              >https://coherent-accounting.com/</a
            >{{ $t("lbl.throughtext") }}
            <a href="https://accounting.controlisy.bg">
              https://accounting.controlisy.bg</a
            >{{ $t("lbl.onwhich") }} <br />

            {{ $t("lbl.webbased") }}
            <a href="https://coherent-accounting.com/about">
              https://coherent-accounting.com/about</a
            >.
          </p>

          <p>
            <b> {{ $t("lbl.ar1") }} 2</b>{{ $t("lbl.devrights") }}<br />
            {{ $t("lbl.asits") }}
            <br />
            {{ $t("lbl.in_case") }}
          </p>
          <p>
            <b> {{ $t("lbl.ar1") }} 3</b> {{ $t("lbl.the_dev") }}
          </p>

          <p>
            <b> {{ $t("lbl.ar1") }} 4</b> {{ $t("lbl.devp") }}
          </p>
          <p>
            <b> {{ $t("lbl.ar1") }} 5</b>{{ $t("lbl.devpp") }}
          </p>

          <p>
            <b> {{ $t("lbl.ar1") }} 6</b>{{ $t("lbl.hasright") }}
          </p>
          <p>
            <b> {{ $t("lbl.ar1") }} 7</b>{{ $t("lbl.terminate") }}
          </p>
          <p>
            <b> {{ $t("lbl.ar1") }} 9</b>
          </p>
          <p>
            <b> {{ $t("lbl.ar1") }} 10</b>{{ $t("lbl.natural") }}
          </p>
          <p>
            <b> {{ $t("lbl.ar1") }} 11</b> {{ $t("lbl.obliged") }}
          </p>
          <p>
            <b> {{ $t("lbl.ar1") }} 12</b>{{ $t("lbl.event") }}
          </p>
          <p>
            <b> {{ $t("lbl.ar1") }} 13</b> {{ $t("lbl.copyright") }}
          </p>
          <p>
            <b> {{ $t("lbl.ar1") }} 14</b>{{ $t("lbl.registering") }}
          </p>
          <ul>
            <li class="p-list">{{ $t("lbl.regss") }}</li>
          </ul>
          <p>
            {{ $t("lbl.reset") }}
            <a href="https://coherent-accounting.com/"
              >https://coherent-accounting.com/</a
            >
          </p>
          <p>
            <b> {{ $t("lbl.ar1") }} 15</b>{{ $t("lbl.objto") }}
          </p>
          <p>
            <b> {{ $t("lbl.ar1") }} 16</b>{{ $t("lbl.usercan") }}
          </p>
          <p>
            <b> {{ $t("lbl.ar1") }} 17</b> {{ $t("lbl.upon") }}
          </p>
          <p>
            <b> {{ $t("lbl.ar1") }} 18</b> {{ $t("lbl.tick") }}
          </p>
          <p>
            <b> {{ $t("lbl.ar1") }} 19</b>{{ $t("lbl.agrees") }}
          </p>
          <p>
            <b> {{ $t("lbl.ar1") }} 20</b> {{ $t("lbl.makes") }}
          </p>
          <p>
            <b> {{ $t("lbl.ar1") }} 21</b> {{ $t("lbl.declares") }}
          </p>
          <p>
            <b> {{ $t("lbl.ar1") }} 22</b> {{ $t("lbl.active") }}
          </p>
          <ul>
            <li class="p-list">{{ $t("lbl.limits") }}</li>
          </ul>
          <p>
            <b> {{ $t("lbl.ar1") }} 23</b>{{ $t("lbl.responsible") }}
            <a href="https://coherent-accounting.com/about"
              >https://coherent-accounting.com/about</a
            >
          </p>
          <p>
            <b> {{ $t("lbl.ar1") }} 24</b>{{ $t("lbl.not") }}
          </p>
          <p>
            <b> {{ $t("lbl.ar1") }} 25</b>{{ $t("lbl.not") }}
          </p>
          <ul>
            <li class="p-list">{{ $t("lbl.othert") }} </li>
          </ul>
          <p>
            <b> {{ $t("lbl.ar1") }} 26</b>{{ $t("lbl.dispute") }}
          </p>
          <p>
            <b> {{ $t("lbl.ar1") }} 27</b>{{ $t("lbl.publish") }}
          </p>
          <p>
            <b> {{ $t("lbl.ar1") }} 28</b>{{ $t("lbl.tries") }}
          </p>
          <p>
            <b> {{ $t("lbl.ar1") }} 29</b>{{ $t("lbl.guarantee") }}
          </p>
          <p>
            <b> {{ $t("lbl.ar1") }} 30</b>{{ $t("lbl.relation") }}
          </p>
        </span>
      </b-card-text>
        </b-card>
        <div>
            
        </div>
    </div>
</template>

<script>
import {
    BCard,
    BCardText

} from "bootstrap-vue";

export default {
    components: {
        BCard,
        BCardText
    }
}
</script>

<style lang="scss" scoped>


.p-list {
  font-size: 1vw;
  color: #0a64bc;
  font-weight: bold;
}

</style>