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
  </div>
</template>

<script>
import Header from './components/common/Header.vue'
import Navigation from './components/common/Navigation.vue'
import Upload from './components/upload/Upload.vue'
import Footer from './components/common/Footer.vue'
import Analysis from './components/analysis/Analysis.vue'

export default {
  name: 'app',
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
  }
}
</script>

<style src="./assets/css/common.css"></style>
<style src="./assets/css/reset.css"></style>
