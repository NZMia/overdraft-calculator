export const inputInfo = [
  {
    key: "limit",
    name: "Arranged overdraft limit",
    min: 1,
    max: 5000,
  },

  {
    key: "rate",
    name: "Overdraft interest rate",
    min: 1,
    max: 100,
  },

  {
    key: "days",
    name: "Number of days overdrawn",
    min: 1,
    max: 31,
  },

  {
    key: "balance",
    name: "Account balance",
    min: 0
  },

  {
    key: "spending",
    name: "Total spending",
    min: 0
  },
]

export const interestFree = [
  {
    key: "student",
    value: 0
  }, 
  {
    key: "premier",
    value: 500
  }
]

export const icon = {
  dollar: {
    sign: "$",
    position: "left"
  },
  percentage: {
    sign: "%",
    position: "right"
  },
  text: {
    sign: "days",
    position: "right"
  }
}
