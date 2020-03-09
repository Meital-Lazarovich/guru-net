import Vue from 'vue'
import Vuex from 'vuex'
import ScheduleService from './services/ScheduleService';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    weeklyAvails: [],
    weeklyHours: [],
    currWeek: 0,
  },
  mutations: {
    setWeeklyAvails(state, { weeklyAvails }) {
      state.weeklyAvails = weeklyAvails;
    },
    setWeeklyHours(state, { weeklyHours }) {
      state.weeklyHours = weeklyHours;
    }
  },
  getters: {
    weeklyAvails(state) {
      return state.weeklyAvails
    },
    weeklyHours(state) {
      return state.weeklyHours
    },
  },
  actions: {
    async loadWeeklyAvails(context, { weekCnt }) {
      const weeklyAvails = await ScheduleService.getWeeklyAvails(weekCnt)
      context.commit({ type: 'setWeeklyAvails', weeklyAvails })
    },
    async loadWeeklyHours(context) {
      const weeklyHours = await ScheduleService.getWeeklyHours()
      context.commit({ type: 'setWeeklyHours', weeklyHours })
    }
  },
})
