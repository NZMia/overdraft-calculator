export interface InputInfo {
  key: string,
  name: string,
  min: number,
  max?: number
}

export interface InterestFree {
  key: string,
  value: number
}

export interface Icon {
  name: string,
  sign: string,
  position: string
}

export const inputInfo: InputInfo[] = [
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

export const interestFree: InterestFree[] = [
  {
    key: "student",
    value: 0
  }, 
  {
    key: "premier",
    value: 500
  }
]

export const icon: Icon[] = [
  {
    name: "dollar",
    sign: "$",
    position: "left"
  },
 {
    name: "percentage",
    sign: "%",
    position: "right"
  },
  {
    name: "text",
    sign: "days",
    position: "right"
  }
]
