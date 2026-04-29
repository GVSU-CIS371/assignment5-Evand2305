<template>
  <Mug>
    <Cold v-if="isIced" />
    <Hot v-else />
    
    <Contents v-if="isBaseOnly">
      <template v-slot:bottom>
        <Base />
      </template>
    </Contents>
 
    <Contents v-else-if="isNoSyrup">
      <template v-slot:top>
        <Creamer />
      </template>
      <template v-slot:bottom>
        <Base />
      </template>
    </Contents>

    <Contents v-else>
      <template v-slot:top>
        <Creamer />
      </template>
      <template v-slot:mid>
        <Syrup />
      </template>
      <template v-slot:bottom>
        <Base />
      </template>
    </Contents>
  </Mug>
</template>
<script setup lang="ts">
import Contents from "./Contents.vue";
import Mug from "./Mug.vue";
import Syrup from "./Syrup.vue";
import Base from "./Base.vue";
import Creamer from "./Creamer.vue";
import Hot from "./Hot.vue";
import Cold from "./Cold.vue";
import {computed} from "vue";
import {useBeverageStore} from "../stores/beverageStore";

const beverageStore = useBeverageStore();

type Props = {
  isIced: boolean;
};
defineProps<Props>();

const isBaseOnly = computed(
  () => beverageStore.currentCreamer.id === "c1" && beverageStore.currentSyrup.id === "s1"
);
 
const isNoSyrup = computed(
  () => beverageStore.currentSyrup.id === "s1" && beverageStore.currentCreamer.id !== "c1"
);

</script>
