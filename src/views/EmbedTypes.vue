<template>
  <b-card-code title="">
    <div>
      <b-embed
        type="iframe"
        aspect="16by9"
        :src="item.video.link"
        allowfullscreen
      />
      <h4 class="text-primary mt-1">
        {{ $t(`${item.video.title}`)}}
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
  props: ["item"],
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
