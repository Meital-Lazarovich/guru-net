import Vue from 'vue'
import Vuex from 'vuex'
import ScheduleService from './services/ScheduleService';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    weeklyAvail: null
  },
  mutations: {
    setWeeklyAvail(state, { weeklyAvail }) {
      state.weeklyAvail = weeklyAvail;
    }
  },
  getters: {
    weeklyAvail(state) {
      return state.weeklyAvail
    },
  },
  actions: {
    async loadWeeklyAvail(context) {
      const weeklyAvail = await ScheduleService.getWeeklyAvail()
      context.commit({ type: 'setWeeklyAvail', weeklyAvail })
    }
  },
})
