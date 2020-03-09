<template>
    <section
        class="calendar container flex space-around align-center"
        v-if="weeklyAvails && weeklyHours"
    >
        <div class="arrow header flex-center">◄</div>
        <div class="column" v-for="(day, idx) in weeklyAvails" :key="idx">
            <div class="header bold flex space-between align-center column">
                <div>{{day.dayName}}</div>
                <div class="date" v-if="day.date">{{day.date}}</div>
            </div>
            <div
                v-for="(hour, idx) in weeklyHours"
                :class="{cell: true, unavail: checkIfUnavail(day, hour)}"
                :key="idx"
            >{{hour}}</div>
        </div>
        <div class="arrow header flex-center">►</div>
    </section>
</template>

<script>
export default {
    data() {
        return {
            currWeek: 0
        }
    },
    async created() {
        await this.$store.dispatch({ type: 'loadWeeklyAvails', weekCnt: this.currWeek });
        await this.$store.dispatch('loadWeeklyHours');
    },
    computed: {
        weeklyAvails() {
            return this.$store.getters.weeklyAvails;
        },
        weeklyHours() {
            return this.$store.getters.weeklyHours;
        }
    },
    methods: {
        checkIfUnavail(day, hour) {
            if (!day.hours) return true;
            return day.hours.indexOf(hour) === -1;
        }
    },
}
</script>