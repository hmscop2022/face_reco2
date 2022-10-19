<template lang="html">
    <header class="bl_header">
      <div>
        <span class="ic_home"></span>
        <h3 class="title">얼굴인식</h3>
      </div> <!-- /.ly_header_inner -->
    </header> <!-- /.ly_header -->
</template>

<script>
export default {
}
</script>

<style lang="css" scoped>

  .ic_home::before {
    position:absolute;
    content:"\f015";
    font: var(--fa-font-solid);
    font-size : 1.25rem;
  }
  .title {
    padding-right:1em;
    padding-left:1.5em;
    display: block;
    text-align: center;
    font-size: 1.25rem;
    font-weight: bold;
  }
</style>
