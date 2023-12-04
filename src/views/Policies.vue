<template>
    <div>
        <b-card border-variant="primary" :header="$t('policies.policies-h-1')" header-bg-variant="primary" header-text-variant="white">
            <b-card-text class="para-1">{{ $t("policies.para-1") }}</b-card-text>
            <b-card-text class="para-2">{{ $t("policies.para-2") }}</b-card-text>
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

<style scoped>
.para-1, .para-2 {
    font-size: 1rem;
    line-height: 2rem;
    padding-top:1rem

}
</style>