<template>
  <div class="spinner" :style="{alignItems: centered ? 'center' : 'flex-start', alignItems: 'center'}">
    Loading data ...
    <div class="loading-spinner">
      <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["centered"]
}
</script>

<style lang="less">
// Loading spinner
.spinner {
  display: flex;
  flex-direction: column;
}
.lds-ring {
  display: inline-block;
  position: relative;
  width: 64px;
  height: 64px;
}
.lds-ring div {
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 51px;
  height: 51px;
  margin: 6px;
  border: 6px solid darken(#00bfa5, 20%);
  border-radius: 50%;
  animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: darken(#00bfa5, 20%) transparent transparent transparent;
}
.lds-ring div:nth-child(1) {
  animation-delay: -0.45s;
}
.lds-ring div:nth-child(2) {
  animation-delay: -0.3s;
}
.lds-ring div:nth-child(3) {
  animation-delay: -0.15s;
}
@keyframes lds-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
