<template>
  <div class="iphone-wrapper">
    <div class="iphone">
      <div class="iphone-small-round-top"></div>

      <div class="iphone-round-top-left"></div>

      <div class="iphone-speaker"></div>

      <div class="iphone-content">
        <button type="button" class="iphone-btn" @click="onIphoneBtnClick">
          <span>Send Signal on Gate</span>
        </button>
        <div class="notifications-wrapper" v-if="notifications.length">
          <h4>Notifications history</h4>
          <div
            class="notification-item"
            v-for="(notification, idx) in notifications"
            :key="idx"
          >
            {{ notification }}
          </div>
        </div>
        <div class="time-settings-wrapper">
          <label>
            Set automatic gate closing time
            <input
              type="number"
              v-model.number="gateController.TimeForAutoClosing"
            />
          </label>
          <label>
            Set for gate opening/closing duration
            <input
              type="number"
              v-model.number="gateController.TimeToFinishAction"
            />
          </label>
        </div>
        <div class="gate-status-wrapper">
          <div><h4>Gate status</h4></div>
          <div>Now {{ gateStatusInfo }}</div>
        </div>
      </div>

      <div class="iphone-button-wrapper">
        <div class="iphone-button"></div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import GateInterface from '../../ts/GateInterface';
import GateController from '../../ts/GateController';
import MessagesController from '../../ts/MessagesController';
import pubSub from '../../ts/PubSub';

export default defineComponent({
  name: 'iphone-component',
  data() {
    return {
      gateController: new GateController(),
      messagesController: MessagesController.getInstance(),
    };
  },
  computed: {
    notifications() {
      return this.messagesController.notifications;
    },
    gateStatusInfo() {
      return this.messagesController.gateStatusInfo;
    },
  },
  created() {
    this.gateInterface = new GateInterface(this.gateController);
    pubSub.subscribe('gateController:stateChanged', (state: boolean) => {
      this.$emit('stateChanged', state);
    });
  },
  methods: {
    onIphoneBtnClick(): void {
      this.gateInterface.sendSignalOnGate();
    },
  },
});
</script>

<style lang="scss" scoped>
.iphone-wrapper {
  text-align: center;
}

.iphone {
  display: inline-block;
  margin: 30px;
  background-color: #f8f8f8;
  border: 1px solid #c0c0c0;
  padding: 0 10px 0 10px;
  border-radius: 25px;
  width: 350px;
  height: 600px;
  position: relative;
}

.iphone-screenshot {
  max-width: 200px;
  border: 1px solid #000000;
}

.iphone-small-round-top {
  margin: 10px auto;
  width: 5px;
  height: 5px;
  background-color: #c0c0c0;
  border-radius: 50%;
}

.iphone-round-top-left {
  float: left;
  margin-left: 65px;
  margin-top: -2px;
  width: 9px;
  height: 9px;
  background-color: #c0c0c0;
  border-radius: 50%;
}

.iphone-speaker {
  margin: 15px auto;
  margin-top: 10px;
  width: 30px;
  height: 5px;
  background-color: #c0c0c0;
  border-radius: 3px;
}

.iphone-button-wrapper {
  height: 85px;

  .iphone-button {
    border-radius: 50%;
    margin: 10px auto;
    width: 30px;
    height: 30px;
    border: 2px solid #c0c0c0;
    background: none !important;
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}

.iphone-btn {
  background: #e6e6e6;
  color: #6f6f6f;
  font-size: 16px;
  border-radius: 10px;
  border: #afafaf solid 1px;
  padding: 10px;
}

.notifications-wrapper {
  margin-top: 10px;
  height: 130px;
  overflow: auto;
}

.notifications-wrapper::-webkit-scrollbar {
  width: 6px;
  height: 4px;
  background-color: #ffffff;
}

.notifications-wrapper::-webkit-scrollbar-thumb {
  border-radius: 4px;
  background-color: #2ee59d;
}

.time-settings-wrapper {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  flex-direction: column-reverse;
  margin-top: 10px;
  input {
    margin-bottom: 5px;
    height: 25px;
    border-radius: 4px;
  }
}
</style>
