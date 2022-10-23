<template lang="html">
  <div class="fullScreen">
    <div class="loadingSpinner">
    </div>
  </div>
</template>

<script>
export default {
  
}
</script>

<style lang="css" scoped>
.hide{
  display:none;
}
.show{
  display:block;
}
.fullScreen {
  position: fixed;
  z-index: 9999;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.25);
  display: flex;
  justify-content: center;
  align-items: center;
}
.loadingSpinner {
  position: absolute;
  left: 50%;
  top: 50%;
  height: 60px;
  width: 60px;
  margin: 0px auto;
  -webkit-animation: rotation 0.6s infinite linear;
  -moz-animation: rotation 0.6s infinite linear;
  -o-animation: rotation 0.6s infinite linear;
  animation: rotation 0.6s infinite linear;
  border-left: 6px solid rgba(0, 174, 239, 0.15);
  border-right: 6px solid rgba(0, 174, 239, 0.15);
  border-bottom: 6px solid rgba(0, 174, 239, 0.15);
  border-top: 6px solid rgba(0, 174, 239, 0.8);
  border-radius: 100%;
}
@-webkit-keyframes rotation {
    from {
      -webkit-transform:translate(-50%, -50%) rotate(0deg);
    }
    to {
      -webkit-transform:translate(-50%, -50%) rotate(359deg);
    }
  }
  @-moz-keyframes rotation {
    from {
      -moz-transform:translate(-50%, -50%) rotate(0deg);
    }
    to {
      -moz-transform:translate(-50%, -50%) rotate(359deg);
    }
  }
  @-o-keyframes rotation {
    from {
      -o-transform:translate(-50%, -50%) rotate(0deg);
    }
    to {
      -o-transform:translate(-50%, -50%) rotate(359deg);
    }
  }
  @keyframes rotation {
    from {
      transform:translate(-50%, -50%) rotate(0deg);
    }
    to {
      transform:translate(-50%, -50%) rotate(359deg);
    }
  }
</style>
