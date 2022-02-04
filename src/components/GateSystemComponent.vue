<template>
  GateSystem
  <gate-remote-controller-component />
</template>

<script>
import { defineComponent } from 'vue';
import GateRemoteControllerComponent from './widgets/GateRemoteControllerComponent.vue';

export default defineComponent({
  components: { GateRemoteControllerComponent },
  setup() {},
});
</script>
