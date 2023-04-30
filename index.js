
function createEmployeeRecord(employeeData) {
    let employee = {
      firstName: employeeData[0],
      familyName: employeeData[1],
      title: employeeData[2],
      payPerHour: employeeData[3],
      timeInEvents: [],
      timeOutEvents: []
    };
    return employee;
  }

function createEmployeeRecords(employeeArray) {
    let employees = [];
    employeeArray.forEach(emp => employees.push(createEmployeeRecord(emp)));
    return employees;
  }


function createTimeInEvent(employee, timeStamp) {
    const [date, hour] = timeStamp.split(" ");
  
    employee.timeInEvents.push({
      type: "TimeIn",
      hour: parseInt(hour),
      date: date
    });
  
    return employee;
  }

function createTimeOutEvent(employee, timeStamp) {
    const [date, hour] = timeStamp.split(" ");
  
    employee.timeOutEvents.push({
      type: "TimeOut",
      hour: parseInt(hour),
      date: date
    });
  
    return employee;
  }

function hoursWorkedOnDate(employee, date) {
    const timeIn = employee.timeInEvents.find(e => e.date === date).hour;
    const timeOut = employee.timeOutEvents.find(e => e.date === date).hour;
  
    return (timeOut - timeIn) / 100;
  }

function wagesEarnedOnDate(employee, date) {
    const wages = hoursWorkedOnDate(employee, date) * employee.payPerHour;
    return wages;
  }

function allWagesFor(employee) {
    let totalWages = 0;
  
    for (const event of employee.timeInEvents) {
      totalWages += wagesEarnedOnDate(employee, event.date);
    }
  
    return totalWages;
  }

function calculatePayroll(employees) {
    let totalPayroll = 0;
  
    employees.forEach(employee => {
      totalPayroll += allWagesFor(employee);
    });
  
    return totalPayroll;
  }
  