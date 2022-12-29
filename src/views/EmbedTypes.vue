<template>
  <b-card-code title="">
    <div>
      <b-embed
        type="iframe"
        aspect="16by9"
        src="https://www.youtube.com/embed/zpOULjyy-n8?rel=0"
        allowfullscreen
      />
      <h4 class="text-primary mt-1">
        Lorem ipsum dolor sit
      </h4>
    </div>

    <template #code>
      {{ codeTypes }}
    </template>
  </b-card-code>
</template>

<script>
import BCardCode from "@core/components/b-card-code";
import { BEmbed, BCardText } from "bootstrap-vue";
import { codeTypes } from "./code";
import axios from "axios";
export default {
  components: {
    BCardCode,
    BEmbed,
    BCardText,
  },
  data() {
    return { codeTypes };
  },
};
</script>
