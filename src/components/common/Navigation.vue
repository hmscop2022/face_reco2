<template lang="html">
  <nav class="bl_tabNav">
    <ul class="bl_tabNav_inner">
      <li>
        <router-link
          to="/"
          v-bind:class="[true?'bl_tabNav_link':'', true?'ic_image':'', getIsActive('upload')?'is_active':'']"
          @click.native="onChangeTabname('upload')">업로드</router-link>
      </li>
      <li>
        <router-link
          to="/analysis"
          v-bind:class="[true?'bl_tabNav_link':'', true?'ic_fileLines':'', getIsActive('analysis')?'is_active':'']"
          @click.native="onChangeTabname('analysis')">분석결과</router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  computed: {
    storeGetTabname(){
      return this.$store.getters.getTabname
    },
  },
  methods: {
    onChangeTabname(tabname){
      this.$store.dispatch('callChangeTabname',{tabname: tabname})
    },
    getIsActive(tabname){
      if(this.$store.getters.getTabname == tabname){
        return true;
      }else{
        return false;
      }
    }
  }
}
</script>

<style lang="css" scoped>


</style>
