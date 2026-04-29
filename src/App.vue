<template>
  <div>
    <Beverage :isIced="beverageStore.currentTemp === 'Cold'" />
    <ul>
      <!-- Temperature -->
      <li>
        <template v-for="temp in beverageStore.temps" :key="temp">
          <label>
            <input
              type="radio"
              name="temperature"
              :id="`r${temp}`"
              :value="temp"
              v-model="beverageStore.currentTemp"
            />
            {{ temp }}
          </label>
        </template>
      </li>

      <!-- Base -->
      <li>
        <template v-for="base in beverageStore.bases" :key="base.id">
          <label>
            <input
              type="radio"
              name="base"
              :id="`r${base.id}`"
              :value="base"
              v-model="beverageStore.currentBase"
            />
            {{ base.name }}
          </label>
        </template>
      </li>

      <!-- Creamer -->
      <li>
        <template v-for="creamer in beverageStore.creamers" :key="creamer.id">
          <label>
            <input
              type="radio"
              name="creamer"
              :id="`r${creamer.id}`"
              :value="creamer"
              v-model="beverageStore.currentCreamer"
            />
            {{ creamer.name }}
          </label>
        </template>
      </li>

      <!-- Syrup -->
      <li>
        <template v-for="syrup in beverageStore.syrups" :key="syrup.id">
          <label>
            <input
              type="radio"
              name="syrup"
              :id="`r${syrup.id}`"
              :value="syrup"
              v-model="beverageStore.currentSyrup"
            />
            {{ syrup.name }}
          </label>
        </template>
      </li>
    </ul>

    <div style="display: flex; justify-content: center;">
      <input
        id="beverage-name"
        type="text"
        placeholder="Beverage Name"
        v-model="beverageStore.currentName"
      />
      <button @click="beverageStore.makeBeverage()">🍺 Make Beverage</button>
    </div>
  </div>
  <div id="beverage-container" style="margin-top: 20px">
    <template v-if="beverageStore.hasSavedBeverages">
      <template v-for="beverage in beverageStore.recentBeverages" :key="beverage.id">
        <label>
          <input
            type="radio"
            name="saved-beverage"
            :value="beverage.id"
            :checked="beverageStore.currentBeverage?.id === beverage.id"
            @change="beverageStore.showBeverage(beverage.id)"
          />
          {{ beverage.name }}
        </label>
      </template>
    </template>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import Beverage from "./components/Beverage.vue";
import { useBeverageStore } from "./stores/beverageStore";
const beverageStore = useBeverageStore();
onMounted(() => beverageStore.loadBeverages());
</script>

<style lang="scss">
body,
html {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  background-color: #6e4228;
  background: linear-gradient(to bottom, #6e4228 0%, #956f5a 100%);
}
ul {
  list-style: none;
}
</style>