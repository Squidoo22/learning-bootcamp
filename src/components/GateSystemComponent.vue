<template>
  GateSystem
  <gate-remote-controller-component />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import GateRemoteControllerComponent from './widgets/GateRemoteControllerComponent.vue';

export default defineComponent({
  components: { GateRemoteControllerComponent },
});
</script>
