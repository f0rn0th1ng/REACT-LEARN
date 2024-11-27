import { useEffect,useState } from "react";

function CurrencyConverter(currency){
    const [data,setdata]=useState({});
    useEffect(()=>{
    fetch(`https://latest.currency-api.pages.dev/v1/currencies/${currency}.json`)
    .then(response=>response.json())
    .then(response=>setdata(response[currency]))
    .catch(error=>console.log(error))}
    ,[currency])
    console.log(data);
    return data;
}

export default CurrencyConverter;