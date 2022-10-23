<template lang="html">
  <div class="toastMessage_wrap">
    <div class="toastMessage">
      분석결과 화면으로 이동합니다
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="css" scoped>
.toastMessage_wrap{
  width:100%;
}
.toastMessage{
  width:80%;
  position:fixed;
  bottom: 8em;
  display:inline-block;
  left:50%;
  transform: translateX(-50%);
  padding: 10px;
  background-color: rgba(0,0,0,0.7);
  color: white;
  border-radius: 1rem;
  font-weight: bold;
  text-align: center;
}
</style>
