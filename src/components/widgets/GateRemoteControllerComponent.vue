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

export default defineComponent({
  data() {
    return {
      gateController: new GateController(),
      messagesController: MessagesController.getInstance(),
    };
  },
  created() {
    this.gateInterface = new GateInterface(this.gateController);
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
  text-align: center;

  .gate-remote-btn {
    text-decoration: none;
    display: inline-block;
    height: 45px;
    line-height: 45px;
    border-radius: 45px;
    margin: 10px 20px;
    font-family: 'Montserrat', sans-serif;
    font-size: 11px;
    text-transform: uppercase;
    text-align: center;
    letter-spacing: 3px;
    font-weight: 600;
    color: #524f4e;
    background: white;
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
    transition: 0.3s;
  }

  .gate-remote-btn:hover {
    background: #2ee59d;
    box-shadow: 0 15px 20px rgba(46, 229, 157, 0.4);
    color: white;
    transform: translateY(-7px);
    cursor: pointer;
  }
}
</style>
