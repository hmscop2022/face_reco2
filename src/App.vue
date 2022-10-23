<template>
  <div id="app">
    <div class="ly_cont">
      <div class="ly_contInner">
        <Header></Header>
        <Navigation></Navigation>
        <router-view ></router-view>
        <!-- <Upload></Upload>
        <Analysis></Analysis> -->
      </div>
    </div>
    <Footer></Footer>
    <LoadingSpinner v-show="storeGetIsLoading"></LoadingSpinner>
    <ToastMessage v-show="storeGetIsToastMessage"></ToastMessage>
  </div>
</template>

<script>
import Header from './components/common/Header.vue'
import Navigation from './components/common/Navigation.vue'
import Upload from './components/upload/Upload.vue'
import Footer from './components/common/Footer.vue'
import Analysis from './components/analysis/Analysis.vue'
import LoadingSpinner from './components/common/LoadingSpinner.vue'
import ToastMessage from './components/common/ToastMessage.vue'

export default {
  name: 'app',
  computed: {
    storeGetIsLoading(){
      return this.$store.getters.getIsLoading
    },
    storeGetIsToastMessage(){
      return this.$store.getters.getIsToastMessage
    },
  },
  data () {
    return {

    }
  },
  components: {
    'Header': Header,
    'Navigation':Navigation,
    'Upload': Upload,
    'Footer': Footer,
    'Analysis':Analysis,
    'LoadingSpinner':LoadingSpinner,
    'ToastMessage':ToastMessage,
  }
}
</script>

<style src="./assets/css/common.css"></style>
<style src="./assets/css/reset.css"></style>
