import { useState } from "react";
import Input from "./components/Input";

const App = () => {
  const [limit, setLimit] = useState(null)
  const [rete, setRate] = useState(null)
  const [days, setDays] = useState(null)

  const [accountBalance, setAccountBalance] = useState(null)
  const [limit, setLimit] = useState(null)
  return (
    <div className="page">
      <div className="grid place-items-center mx-2 my-20 sm:my-auto">
        <div className="page__form__wrapper">
            <div className="text-center mb-4">
              <h6 className="font-semibold text-[#063970] text-xl">
                Overdraft Calculator
              </h6>
            </div>
            <form className="space-y-5">
                {/* Limit */}
                <Input title="Arranged overdraft limit" />
                {/* Rates */}
                <Input title="Overdraft interest rate" />
                {/* Days */}
                <Input title="Number of days overdrawn" />

                {/* Account balance */}
                <Input title="Account balance" />
                {/* Spend */}
                <Input title="Total Spend" />

                <button type="submit" className="btn">
                    Calculate
                </button>
            </form>
        </div>
      </div>
    </div>
  )
}

export default App;
