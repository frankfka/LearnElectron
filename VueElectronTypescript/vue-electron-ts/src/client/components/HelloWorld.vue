<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <input v-model="inputVal" type="text">
    <p>Input is: {{ inputVal }}</p>
    <button @click="onSubmitClicked">Search</button>
    <button @click="onSubmitClickedAsync">Search Async</button>
    <p>Returned value is: {{ mainReturnVal }}</p>
  </div>
</template>

<script lang="ts">
import {IpcRenderer} from "electron";
import {defineComponent} from "vue";

const ipcRenderer: IpcRenderer = window.ipcRenderer;

const HelloWorld = defineComponent({
  data: function () {
    return {
      inputVal: '',
      mainReturnVal: ''
    }
  },
  props: {
    msg: String
  },
  created() {
    // Register async callback
    ipcRenderer.removeAllListeners('async-reply')
    ipcRenderer.on('async-reply', (event, args) => {
      this.mainReturnVal = args
    })
  },
  methods: {
    onSubmitClicked: function(): void {
      console.log(this.inputVal)
      this.mainReturnVal = ipcRenderer.sendSync('sync-message', this.inputVal)
    },
    onSubmitClickedAsync: function(): void {
      console.log(this.inputVal)
      ipcRenderer.send('async-message', this.inputVal)
    }
  },
})
export default HelloWorld;
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
