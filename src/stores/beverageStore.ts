import { defineStore } from "pinia";
import bases from "../data/bases.json";
import syrups from "../data/syrups.json";
import creamers from "../data/creamers.json";
import temperatures from "../data/tempretures.json";
import { db } from "../firebase";
import { collection, addDoc, deleteDoc, doc, getDocs } from "firebase/firestore";

export interface Ingredient {
  id:string;
  name: string;
  color: string;
}

export interface Beverage {
  id:string;
  name: string;
  createdAt: string;
  temperature: string;
  base: Ingredient;
  syrup: Ingredient;
  creamer: Ingredient;
}

export const useBeverageStore = defineStore("BeverageStore", {
  state: () => ({
    
    bases: bases as Ingredient[],
    syrups: syrups as Ingredient[],
    creamers: creamers as Ingredient[],
    temps: temperatures as string[],

    currentName: "" as string,
    currentBase: bases[0] as Ingredient,
    currentSyrup: syrups[0] as Ingredient,
    currentCreamer: creamers[0] as Ingredient,
    currentTemp: temperatures[0] as string,

    savedBeverages: [] as Beverage[],

    currentBeverage: null as Beverage | null,
  }),

  getters: {

    recentBeverages:  (state): Beverage[] => 
      [...state.savedBeverages].reverse(),

    hasSavedBeverages: (state): boolean =>
      state.savedBeverages.length > 0,
  },

  actions: {

    async makeBeverage() {
      const newBeverage: Beverage = {
        id: crypto.randomUUID(),
        name: this.currentName,
        createdAt: new Date().toISOString(),
        base: {...this.currentBase},
        syrup: {...this.currentSyrup},
        creamer: {...this.currentCreamer},
        temperature: this.currentTemp,
      };

      await addDoc(collection(db, "beverages"), newBeverage);
      this.currentBeverage = newBeverage;
      this.savedBeverages.push(newBeverage);
    },

    async loadBeverages() {
      const snapshot = await getDocs(collection(db, "beverages"));
      this.savedBeverages = snapshot.docs.map(d => d.data() as Beverage);
    },

    showBeverage(beverageId: string): void {
      const found = this.savedBeverages.find(b => b.id === beverageId);
      if (found) {
        this.currentBeverage = found;
        this.currentBase = { ...found.base };
        this.currentSyrup = { ...found.syrup };
        this.currentCreamer = { ...found.creamer };
        this.currentTemp = found.temperature;
      }
    },

    async removeBeverage(beverageId: string) {
      const snapshot = await getDocs(collection(db, "beverages"));
      const match = snapshot.docs.find(d => d.data().id === beverageId);
      if (match) await deleteDoc(doc(db, "beverages", match.id));

      this.savedBeverages = this.savedBeverages.filter(b => b.id !== beverageId);
      if (this.currentBeverage?.id === beverageId) {
        this.currentBeverage = null;
      }
    },

    clearBeverages(): void {
      this.savedBeverages = [];
      this.currentBeverage = null;
    },

    setBase(base: Ingredient): void {
      this.currentBase = base;
    },

    setSyrup(syrup: Ingredient): void {
      this.currentSyrup = syrup;
    },

    setCreamer(creamer: Ingredient): void {
      this.currentCreamer = creamer;
    },

    setTemperature(temp: string): void {
      this.currentTemp = temp;
    },
  },
  persist: true,
});
