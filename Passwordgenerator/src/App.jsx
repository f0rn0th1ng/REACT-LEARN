import { useState,useCallback,useEffect } from 'react'
import { totp } from 'otplib';

import './App.css'

function App() {
  const [length, setlength] = useState(8);
  const [whetherallownumber,setallownumber]=useState(false);
  const [whetherallowspecialchar,setallowspecialchar]=useState(false);
  const [Password,setPassword]=useState("");
  const [mode,setmode]=useState(false);
  const [secretKey, setSecretKey] = useState(''); // 用于存储密钥
  const [generatedCode, setGeneratedCode] = useState(''); // 用于存储生成的 2FA 代码


  const generate2FACode = async () => {
    if (!secretKey || secretKey.trim() === '') {
      alert('Please enter a valid secret key!');
      return;
    }
  
    console.log('Using secretKey: ', secretKey);  // 打印密钥以调试
  
    // 生成 TOTP 代码
    const code = await generateTOTP(secretKey);
    setGeneratedCode(code);
    alert('Your 2FA code: ' + code);
  };
  
  // Base32 解码函数
  function base32Decode(base32Str) {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
    let buffer = [];
    let bits = 0;
    let val = 0;
  
    for (let i = 0; i < base32Str.length; i++) {
      const char = base32Str[i].toUpperCase();
      const index = alphabet.indexOf(char);
      if (index === -1) {
        throw new Error('Invalid character in Base32 string');
      }
      val = (val << 5) | index;
      bits += 5;
      if (bits >= 8) {
        bits -= 8;
        buffer.push(val >> bits);
        val &= (1 << bits) - 1;
      }
    }
    return new Uint8Array(buffer);
  }
  
  // 生成 TOTP 代码
  const generateTOTP = async (secretKey) => {
    // 将 Base32 编码的 secretKey 解码为字节
    const decodedKey = base32Decode(secretKey);
  
    // 当前时间戳（秒）
    const epoch = Math.floor(Date.now() / 1000);
    // 计算时间窗口（每30秒为一个周期）
    const time = Math.floor(epoch / 30);
  
    // 将时间转换为 8 字节的 ArrayBuffer
    const msg = new ArrayBuffer(8);
    const view = new DataView(msg);
    view.setBigUint64(0, BigInt(time));
  
    // 使用 HMAC-SHA1 算法
    const cryptoKey = await window.crypto.subtle.importKey(
      'raw',
      decodedKey,
      { name: 'HMAC', hash: 'SHA-1' },
      false,
      ['sign']
    );
  
    // 签名操作，生成 HMAC-SHA1 哈希
    const signature = await window.crypto.subtle.sign({ name: 'HMAC' }, cryptoKey, msg);
  
    // 从签名中提取数字并计算 OTP
    const hash = new DataView(signature);
    const offset = hash.getUint8(hash.byteLength - 1) & 0xf;
    const code = (hash.getInt32(offset) & 0x7fffffff) % 1000000;
  
    // 返回6位数的 TOTP 代码
    return code.toString().padStart(6, '0');
  };
  
  
  

  const generate_password=useCallback(()=>{
      let pass="";
      let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
      let num="0123456789";
      let special_char="!@#$%^&*";
      if(whetherallownumber)str+=num;
      if(whetherallowspecialchar) str+=special_char;
      for(let i=1;i<=length;i++){
        let char=Math.floor(Math.random()*str.length);
        pass+=str.charAt(char);
      }
      setPassword(pass);
      console.log("working now");
    },[whetherallownumber,whetherallowspecialchar,length])

    const animation=()=>{
      const element1=document.getElementById("important-thing");
      const element2=document.getElementById("first_move_event");
      const element3=document.getElementById("second_move_event");
      const element4=document.getElementById("btn_for_special_code");
      if(!mode){
        element1.classList.remove("hade");
        element2.classList.remove("move_up");
        element3.classList.remove("move_up");
        element1.classList.add("show");
        element2.classList.add("move_down");
        element3.classList.add("move_down");
        element4.innerHTML='Nomral Mode'
        setmode((prev)=>!prev);
      }
      else{
        element1.classList.remove("show");
        element2.classList.remove("move_down");
        element3.classList.remove("move_down");
        element1.classList.add("hade");
        element2.classList.add("move_up");
        element3.classList.add("move_up");
        element4.innerHTML='2FA Code Mode'
        setmode((prev)=>!prev);
      }
    } 
    
    // useEffect(()=>{
    //   generate_password()
    // }, [length, whetherallownumber, whetherallowspecialchar])
  

  return (
    <div className='whole_container flex items-center justify-center w-full h-screen  '>
      <div className="flex container flex-col w-[500px] h-56 border-2 border-black  items-center relative rounded-[20px] box-border gap-2 justify-start">
          <div className="container_for_generator flex gap-2 mt-3">
              <input type="text" placeholder='Your Password will be displayed here' className='w-80 h-[40px] flex justify-center items-center box-border pl-2 rounded-[20px] border-2 border-black' value={Password} readOnly />
              <button className='btn bg-black text-white w-[90px] h-[40px] rounded-[16px]' onClick={generate_password}>Generate</button>
          </div>
          <div className="container_for_result flex gap-1" id="important-thing">
          <input type="text" placeholder='Enter Your Share Key Code' className='w-80 h-[40px] flex justify-center items-center box-border pl-2 rounded-[20px] border-2 border-black' value={secretKey} onChange={(e) => setSecretKey(e.target.value)}/>
          <button id='btn_for_generate' className=' bg-black text-white w-[90px] h-[40px] rounded-[16px]' onClick={generate2FACode}>2FA Code</button>
          </div>
          <div className="container_for_option flex flex-wrap translate-x-[-20px] gap-3 items-center translate-y-[-45px]" id='first_move_event'>
            <input type="range" min={6} max={20} value={length} className='cursor-pointer' onChange={(e)=> setlength(e.target.value)} />
            <span className='text-black'>Length:{length}</span>
            <button id='btn_for_special_code' className='generator_for_2FA_code  bg-black text-white w-[150px] h-[40px] rounded-[16px]' onClick={animation}>2FA Code Mode</button>
          </div>
          <div className="contaniner_for_special_options flex gap-2 translate-x-[-63px] translate-y-[-45px]" id='second_move_event'>
              <input type="checkbox" defaultChecked={whetherallownumber} onChange={()=>setallownumber((prev)=>!prev)} />
              <span className='text-black'>AllowNumber</span>
              <input type="checkbox" defaultChecked={whetherallowspecialchar} onChange={()=>setallowspecialchar((prev)=>!prev)} />
              <span className='text-black'>AllowSpecialChar</span>
            </div>
        </div>
    </div>
  )
}

export default App
