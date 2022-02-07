<template>
  <div>
    GateSystem
    <gate-remote-controller-component @stateChanged="onGateChangeState"/>
    <gate-schema :gateOpenedState="isGateOpenedOrInClosingProcess"/>
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
      isGateOpenedOrInClosingProcess: false
    };
  },

  methods: {
    onGateChangeState(state) {
      this.isGateOpenedOrInClosingProcess = state;
    }
  }
});
</script>
