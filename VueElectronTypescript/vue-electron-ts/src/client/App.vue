<template>
  <div id="app">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
  </div>
</template>

<script lang="ts">
import HelloWorld from './components/HelloWorld.vue';
import {IpcRenderer} from "electron";
import { defineComponent } from 'vue'

// Add to global window interface
declare global {
  interface Window { ipcRenderer: IpcRenderer }
}

export default defineComponent({
  components: {
    HelloWorld,
  },
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
