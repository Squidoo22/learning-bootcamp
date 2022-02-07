<template>
  <div class="gate-remote-controller">
    <button class="gate-remote-btn" @click="onRemoteControllerClick">
      <span>{{ getBtnTxt() }}</span>
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import GateInterface from '../../ts/GateInterface';
import GateController from '../../ts/GateController';
import MessagesController from '../../ts/MessagesController';
import pubSub from '../../ts/PubSub';

export default defineComponent({
  data() {
    return {
      gateController: new GateController(),
      messagesController: MessagesController.getInstance(),
    };
  },
  created() {
    this.gateInterface = new GateInterface(this.gateController);
    pubSub.subscribe('gateController:stateChanged', (state: boolean) => {this.$emit('stateChanged', state)});
  },
  methods: {
    onRemoteControllerClick(): void {
      this.gateInterface.sendSignalOnGate();
    },
    getBtnTxt() {
      const text = this.messagesController.gateStatusInfo;

      return text;
    },
  },
});
</script>

<style lang="scss" scoped>
.gate-remote-controller {
  .gate-remote-btn {
    background-color: red;
  }
}
</style>
