import moment from 'moment';

export default {
    getWeeklyAvail,
    getHoursBetween
}

const user = {
    meetingLength: 60,
    avail: {
        startHour: '08:00',
        endHour: '17:00'
    },
    unavail: {
        sun: [], wed: [], thu: [],
        mon: [
            {
                startHour: '09:00',
                endHour: '11:00'
            }
        ],
        tue: [
            {
                startHour: '08:00',
                endHour: '10:00'
            },
            {
                startHour: '14:00',
                endHour: '17:00'
            }
        ],
        special: {
            '12/02/20': {
                startHour: '08:00',
                endHour: '13:00'
            }
        }
    }
}

const weekdays = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']

function getWeeklyAvail() {
    const userAvail = {}
    weekdays.forEach(day => {
        if (!user.unavail.hasOwnProperty(day)) userAvail[day] = []
        else {
            const hours = [];
            var currHour = moment(user.avail.startHour, 'HH:mm')
            console.log('currHour', currHour);
            const endHour = moment(user.avail.endHour, 'HH:mm')
            // while (currHour <= endHour) {
            //     hours.push(currHour)
            //     currHour = moment(currHour, 'HH:mm').add(user.meetingLength, 'minute').format('hh:mm')
            // }
            userAvail[day] = hours
        }
    })
    console.log('userAvail', userAvail);
}

function getHoursBetween(startHour, endHour) {
    const weeklyHours = [];
    const endTimestamp = moment(endHour, 'HH:mm').unix()
    // var currHour = 
    return endTimestamp
}

console.log('res:', getHoursBetween(user.avail.startHour, user.avail.endHour));