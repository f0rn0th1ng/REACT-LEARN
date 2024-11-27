import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {InputBox} from './components/index.js'
import CurrencyConverter from './hooks/currencychange'

function App() {
  const [amount, setAmount] = useState(0)
  const [from, setFrom] = useState('usd')
  const [to, setTo] = useState('inr')
  const [convertedAmount, setConvertedAmount] = useState(0)
  const currencyInfo = CurrencyConverter(from)
  const options = Object.keys(currencyInfo)

  const Swap = () => {
    setFrom(to)
    setTo(from)
    setConvertedAmount(convertedAmount)
    setAmount(convertedAmount)
  }

  const convert = () => {
    setConvertedAmount(amount * currencyInfo[to]);
  }

  return (
    <div className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
    style={{backgroundImage: `url(https://images.pexels.com/photos/4497591/pexels-photo-4497591.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)`}}>
      <div className='w-full'>
        <div className='w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30'>
        <form onSubmit={(e) => {
            e.preventDefault()
            convert()
          }}>
          <div className='w-full mb-1'>
              <InputBox
                label="from"
                amount={amount}
                currencyOptions={options}
                onCurrencyChange={(currency) => setFrom(currency)}
                onAmountChange={(amount) => setAmount(amount)}
                selectedCurrency={from}
                      />
          </div>
          <div className='flex  absolute left-1/2 -translate-x-1/2 -translate-y-1/2'>
            <button className='bg-green-400 rounded-[20px] w-[50px] h-[30px] cursor-pointer hover:scale-105 transition-all' onClick={Swap}>Swap</button>
          </div>
              <div className='w-full mb-1 '>
                  <InputBox
                    label="to"
                    amount={convertedAmount}
                    currencyOptions={options}
                    onCurrencyChange={(currency) => {
                      console.log("doing it")
                      setTo(currency);
                    }}
                    selectedCurrency={to}
                          />
              </div>
              <div>
                <button className='bg-green-400 rounded-[20px] w-full h-[30px] cursor-pointer hover:scale-105 transition-all' type='submit'>Convert {from.toUpperCase()} to {to.toUpperCase()}</button>
              </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default App
