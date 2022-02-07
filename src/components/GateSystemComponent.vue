<template>
  <h1 class="gate-system-title">Gate System</h1>
  <gate-remote-controller-component />
</template>

<script>
import { defineComponent } from 'vue';
import GateRemoteControllerComponent from './widgets/GateRemoteControllerComponent.vue';

export default defineComponent({
  components: { GateRemoteControllerComponent },
});
</script>

<style lang="scss" scoped>
.gate-system-title {
  text-align: center;
  color: #2ee59d;
}
</style>
