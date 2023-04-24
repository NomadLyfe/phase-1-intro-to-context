function createEmployeeRecord(array) {
    const record = {
        'firstName': array[0],
        'familyName': array[1],
        'title': array[2],
        'payPerHour': array[3],
        'timeInEvents': [],
        'timeOutEvents': []
    }
    return record;
}

function createEmployeeRecords(array) {
    return array.map(createEmployeeRecord);
}

function createTimeInEvent(record, time) {
    if (time.length === 15 && time[10] === ' ') {
        const type = 'TimeIn';
        const date = time.split(' ')[0];
        const hour = Number(time.split(' ')[1]);
        record.timeInEvents = [...record.timeInEvents, {
            'type': type,
            'date': date,
            'hour': hour
        }]
        return record;
    } else {
        alert('Wrong date/time format!')
    }
}

function createTimeOutEvent(record, time) {
    if (time.length === 15 && time[10] === ' ') {
        const type = 'TimeOut';
        const date = time.split(' ')[0];
        const hour = Number(time.split(' ')[1]);
        record.timeOutEvents = [...record.timeOutEvents, {
            'type': type,
            'date': date,
            'hour': hour
        }]
        return record;
    } else {
        alert('Wrong date/time format!')
    }
}

function hoursWorkedOnDate(record, date) {
    let timeIn;
    let timeOut;
    for (const timeInElement of record.timeInEvents) {
        for (const timeOutElement of record.timeOutEvents) {
            if (timeInElement.date === date && timeOutElement.date === date) {
                timeIn = timeInElement.hour;
                timeOut = timeOutElement.hour;
            }
        }
    }
    return (timeOut - timeIn)/100;
}

function wagesEarnedOnDate(record, date) {
    const hours = hoursWorkedOnDate(record, date);
    return hours*record.payPerHour;
}

function allWagesFor(record) {
    let sum = 0;
    for (let i = 0; i < record.timeInEvents.length; i++) {
        sum += wagesEarnedOnDate(record, record.timeInEvents[i].date);
    }
    return sum;
}

function calculatePayroll(records) {
    let sum = 0;
    for (const record of records) {
        sum += allWagesFor(record);
    }
    return sum;
}
