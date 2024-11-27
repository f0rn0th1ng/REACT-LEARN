import React,{useId} from "react";

function InputBox(
    {
        label,
        amount,
        onAmountChange,
        onCurrencyChange,
        currencyOptions = [],
        selectedCurrency = "usd",
        amountDisabled = false,
        currencyDisabled = false,
        className = "",
    }
){
    const id=useId();
    return(
    // <div className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
    // style={{backgroundImage: `url(https://images.pexels.com/photos/4497591/pexels-photo-4497591.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)`}}>
        
        <div className={"bg-white p-3 rounded-lg text-sm flex ${className}"}>
            <div className="room1 w-1/2 flex flex-col">
                <label htmlFor={id} className=" text-black/40 mb-2 inline-block">{label}</label>
                <input type="number"
                className="h-7"
                id={id}
                placeholder="Amount"
                disabled={amountDisabled}
                value={amount}
                onChange={(e) => onAmountChange && onAmountChange(e.target.value)}
                />
            </div>
            <div className="room2 w-1/2 flex flex-wrap justify-end text-right">
                <p className="text-black/40 mb-2 w-full">Currency Type</p>
                    <select 
                        className='rounded-lg px-1 py-1 bg-gray-100 cursor-pointer outline-none'
                        value={selectedCurrency}
                        onChange={(e)=>onCurrencyChange && onCurrencyChange(e.target.value)}
                        disabled={currencyDisabled}
                        >
                            {currencyOptions.map((currency) => (
                                <option key={currency} value={currency}>{currency}</option>
                            ))}
                    </select>
            </div>
        </div>
//  </div>
    )
}

export default InputBox;
