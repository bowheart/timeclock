import React from 'react'


const SECOND = 1000
const MINUTE = SECOND * 60
const HOUR = MINUTE * 60
const DAY = HOUR * 24


export const Entries = {
  calculate: {
    time(entries) {
      return entries.reduce(
        (totalTime, nextEntry) => totalTime + Entry.calculate.time(nextEntry),
        0
      )
    }
  },


  filter: {
    byDay(day, entries) {
      let targetDay = +day.startOf('day')

      return entries.filter(entry =>
        +moment(entry.in).startOf('day') === targetDay
      )
    },


    byRange(start, end, entries) {
      start = +start
      end = +end

      return entries.filter(entry => {
        let _in = +moment(entry.in)

        return _in >= start && _in <= end
      })
    }
  },


  print: {
    hoursInRange(start, end, entries, format) {
      let rangeEntries = Entries.filter.byRange(start, end, entries)
      let diff = Entries.calculate.time(rangeEntries)

      return formatDiff(diff, format)
    },


    moneyInRange(start, end, entries) {
      let rangeEntries = Entries.filter.byRange(start, end, entries)
      let diff = Entries.calculate.time(rangeEntries)
      let hours = diff / 1000 / 60 / 60

      return (hours * 28).toFixed(2)
    }
  }
}


export const Entry = {
  calculate: {
    time(entry) {
      let _in = moment(entry.in)
      let out = moment(entry.out || undefined)

      return out.diff(_in)
    }
  },


  print: {
    hours(entry, format) {
      let diff = Entry.calculate.time(entry)

      return formatDiff(diff, format)
    }
  }
}


export const Task = {
  calculate: {
    payPeriodEnd(payPeriodStart, {payPeriodDuration}) {
      return payPeriodStart
        .clone()
        .add(payPeriodDuration - 1, 'days')
        .endOf('day')
    },


    payPeriodRange(task, now=moment()) {
      let start = Task.calculate.payPeriodStart(task, now)
      let end = Task.calculate.payPeriodEnd(start, task)

      return { start, end }
    },


    payPeriodStart({payPeriodDuration, payPeriodStart}, now=moment()) {
      let start = moment(payPeriodStart)
      let diff = now.diff(start)
      let diffPayPeriodDurations = Math.floor(diff / (DAY * payPeriodDuration))

      return start.add(diffPayPeriodDurations * payPeriodDuration, 'days')
    }
  },


  print: {
    hoursAllTime(entries, format) {
      let diff = Entries.calculate.time(entries)
      return formatDiff(diff, format)
    },


    hoursLastPayPeriod(task, entries, format) {
      let { start, end } = Task.calculate.payPeriodRange(
        task,
        moment().subtract(task.payPeriodDuration, 'days')
      )

      return Entries.print.hoursInRange(start, end, entries, format)
    },


    hoursThisPayPeriod(task, entries, format) {
      let { start, end } = Task.calculate.payPeriodRange(task)

      return Entries.print.hoursInRange(start, end, entries, format)
    },


    hoursToday(entries, format) {
      let dayEntries = Entries.filter.byDay(moment(), entries)
      let diff = Entries.calculate.time(dayEntries)

      return formatDiff(diff, format)
    },


    lastPayPeriodRange(task) {
      return Task.print.payPeriodRange(
        task,
        moment().subtract(task.payPeriodDuration, 'days')
      )
    },


    moneyAllTime(entries) {
      let diff = Entries.calculate.time(entries)
      let hours = diff / 1000 / 60 / 60

      return (hours * 28).toFixed(2)
    },


    moneyLastPayPeriod(task, entries) {
      let { start, end } = Task.calculate.payPeriodRange(
        task,
        moment().subtract(task.payPeriodDuration, 'days')
      )

      return Entries.print.moneyInRange(start, end, entries)
    },


    moneyThisPayPeriod(task, entries) {
      let { start, end } = Task.calculate.payPeriodRange(task)

      return Entries.print.moneyInRange(start, end, entries)
    },


    moneyToday(entries) {
      let dayEntries = Entries.filter.byDay(moment(), entries)
      let diff = Entries.calculate.time(dayEntries)
      let hours = diff / 1000 / 60 / 60

      return (hours * 28).toFixed(2)
    },


    payPeriodRange(task, now=moment()) {
      let { start, end } = Task.calculate.payPeriodRange(task, now)

      return start.format('MMM D - ') + end.format('MMM D')
    }
  }
}


export function formatDiff(diff, format='h:mm:ss') {
  let duration = moment.duration(diff)

  if (format === 'short') return formatDuration(duration)

  let hours = Math.floor(duration.asHours())
  let minutes = duration.minutes()
  let seconds = duration.seconds()

  if (format === 'long') return formatDurationLong(duration, hours, minutes, seconds)

  return format.replace('hh', padLeft(hours))
    .replace('h', hours)
    .replace('mm', padLeft(minutes))
    .replace('m', minutes)
    .replace('ss', padLeft(seconds))
    .replace('s', seconds)
}


export function formatDuration(
  duration,
  hoursStr='h',
  minutesStr='m',
  secondsStr='s'
) {
  let hours = Math.floor(duration.asHours())
  let minutes = duration.minutes()
  let seconds = duration.seconds()

  if (+duration > HOUR) {
    return `${hours} ${hoursStr}, ${minutes} ${minutesStr}`
  }

  if (+duration > MINUTE) {
    return `${minutes} ${minutesStr}, ${seconds} ${secondsStr}`
  }

  if (+duration > SECOND) {
    return `${seconds} ${secondsStr}`
  }

  return '-'
}


export function formatDurationLong(duration, hours, minutes, seconds) {
  let hoursStr = 'hour' + (hours === 1 ? '' : 's')
  let minutesStr = 'minute' + (minutes === 1 ? '' : 's')
  let secondsStr = 'second' + (seconds === 1 ? '' : 's')

  return formatDuration(duration, hoursStr, minutesStr, secondsStr)
}


export function getDisplayName(Component) {
  return Component.displayName || Component.name || 'Unknown'
}


export function padLeft(str, padLength=2, char='0') {
  return (
    Array(padLength + 1).join(char) + str
  ).slice(-padLength)
}
