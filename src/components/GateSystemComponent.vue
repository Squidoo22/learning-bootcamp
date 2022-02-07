<template>
  <div>
    <h1 class="gate-system-title">Gate System</h1>
    <gate-remote-controller-component @stateChanged="onGateChangeState" />
    <gate-schema :gateOpenedState="isGateOpenedOrInClosingProcess" />
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import GateRemoteControllerComponent from './widgets/GateRemoteControllerComponent.vue';
import GateSchema from './widgets/GateSchema.vue';

export default defineComponent({
  components: { GateRemoteControllerComponent, GateSchema },
  data() {
    return {
      isGateOpenedOrInClosingProcess: false,
    };
  },

  methods: {
    onGateChangeState(state) {
      this.isGateOpenedOrInClosingProcess = state;
    },
  },
});
</script>

<style lang="scss" scoped>
.gate-system-title {
  text-align: center;
  color: #2ee59d;
}
</style>
