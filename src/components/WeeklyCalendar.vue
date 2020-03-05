<template>
    <section class="calendar container flex space-around align-center">
        <div class="column" v-for="(weekday, idx) in weekdays" :key="idx">
            <div class="header bold flex space-between align-center column">
                <div>{{weekday.name}}</div>
                <div class="date">{{weekday.date}}</div>
            </div>
            <div :class="{cell: true, unavail: checkIfUnavail(weekday, hour)}" v-for="(hour, idx) in hours" :key="idx" @click="makeUnavail(weekday, hour)">{{hour}}</div>
        </div>
    </section>
</template>

<script>
export default {
    data() {
        return {
            weekdays: [
                {
                    name: 'sun',
                    date: '01/03/20',
                    unavailHours: []
                },
                {
                    name: 'mon',
                    date: '02/03/20',
                    unavailHours: ['08:00', '09:00']
                },
                {
                    name: 'tue', 
                    date: '03/03/20',
                    unavailHours: ['08:00', '09:00']
                },
                {
                    name: 'wed',
                    date: '04/03/20',
                    unavailHours: ['11:00', '12:00']
                },
                {
                    name: 'thu',
                    date: '05/03/20',
                    unavailHours: ['17:00']
                },
                {
                    name: 'fri',
                    date: '06/03/20',
                },
                {
                    name: 'sat',
                    date: '07/03/20',
                }
            ],
            hours: ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00']
        }
    },
    methods: {
        makeUnavail(weekday, hour) {
            if (!weekday.unavailHours) weekday.unavailHours = []
            weekday.unavailHours.push(hour)
        },
        checkIfUnavail(weekday, hour) {
            if (!weekday.unavailHours) return true;
            return weekday.unavailHours && weekday.unavailHours.indexOf(hour) > -1;
        }
    }
}
</script>