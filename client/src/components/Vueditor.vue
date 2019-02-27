<template>
    
</template>

<script>
// import vue
import Vue from 'vue'
// import vuex
import Vuex from 'vuex'
// import vueditor
import Vueditor from 'vueditor'
// import css
import "vueditor/dist/css/vueditor.min.css"

let config = {
// set config for toolbar
  toolbar: [
    'removeFormat', 'undo', '|', 'elements', 'fontName', 'fontSize', 'foreColor', 'backColor'
  ],
// set config for fontName  
  fontName: [
    {val: "arial black"}, {val: "times new roman"}, {val: "Courier New"}
  ],
  // set config for fontSize  
  fontSize: ['12px', '14px', '16px', '18px', '0.8rem', '1.0rem', '1.2rem', '1.5rem', '2.0rem'],
  // set config for emoji  
  emoji: ["1f600", "1f601", "1f602", "1f923", "1f603"],
  // set config for lang  
  lang: 'en',
  mode: 'default',
  iframePath: '',
  fileuploadUrl: ''
};


Vue.use(Vuex);
Vue.use(Vueditor, config);
export default {


}
</script>

<style>

</style>
