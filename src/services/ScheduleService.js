import moment from 'moment';

export default {
    getWeeklyAvails,
    getWeeklyHours
}

const weekdays = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']

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
            '11/03/20': [
                {
                    startHour: '08:00',
                    endHour: '13:00'
                }
            ],
            '19/03/20': [
                {
                    startHour: '14:00',
                    endHour: '17:00'
                }
            ],
            '22/03/20': [
                {
                    startHour: '11:30',
                    endHour: '14:00'
                }
            ],
        }
    }
}

function getWeeklyHours() {
    return _getHoursBetween(user.avail.startHour, user.avail.endHour, user.meetingLength)
}

function getWeeklyAvails(weekCnt) {
    const weeklyAvails = []
    weekdays.forEach(day => {
        let date = moment().day(day).add(weekCnt, 'week')
        let hasPassed = moment(moment()).isAfter(date, 'time')
        date = moment(date).format('DD/MM/YY')
        let avail = { dayName: day, hours: [], date }
        let isWorkingDay = user.unavail.hasOwnProperty(day)
        let isSpecialDate = user.unavail.special.hasOwnProperty(date)
        if (!hasPassed && (isWorkingDay || isSpecialDate)) {
            let unavails = []
            if (isWorkingDay) unavails.push(...user.unavail[day])
            if (isSpecialDate) unavails.push(...user.unavail.special[date])
            let currStart = user.avail.startHour
            unavails.forEach(period => {
                avail.hours.push(..._getHoursBetween(currStart, period.startHour, user.meetingLength))
                currStart = period.endHour
            })
            avail.hours.push(..._getHoursBetween(currStart, user.avail.endHour, user.meetingLength))
        }
        weeklyAvails.push(avail)
    })
    return Promise.resolve(weeklyAvails);
}

function _getHoursBetween(startHour, endHour, minuteGap) {
    const hours = [];
    const endNumericHour = moment(endHour, 'HH:mm').hours() * 60 + moment(endHour, 'HH:mm').minutes()
    var currHour = moment(startHour, 'HH:mm').format('HH:mm')
    while (moment(currHour, 'HH:mm').minutes() + moment(currHour, 'HH:mm').hours() * 60 <= endNumericHour - minuteGap) {
        hours.push(currHour);
        currHour = moment(currHour, 'HH:mm').add(minuteGap, 'minute').format('HH:mm')
    }
    return hours
}

