import { useState, useCallback, useEffect, useRef } from 'react'
import './App.css'

function App() {

  const [rangeLength, setLength] =useState<number>(8);
  const [numbersAllowed, setNumbers ] = useState(false);
  const [charAllowed, setChars ] = useState(false);
  const [password, setPassword ] = useState('');

  const genratePassword = useCallback(() => {
    let password = '';
    let string = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if(numbersAllowed)  string+="0123456789";
    if(charAllowed) string+= "!@#$%^&*()";
    for(let i=1; i<=rangeLength; i++){
      const char = Math.floor(Math.random()* string.length+ 1);
      password += string.charAt(char);
    }
    setPassword(password);

  },[numbersAllowed, charAllowed, rangeLength]);


  useEffect(() => {
    genratePassword();
  },[rangeLength, numbersAllowed, charAllowed, genratePassword]);

  const passwordRef = useRef<HTMLInputElement | null >(null);

  const copyPasswordMethod = () => {
    window.navigator.clipboard.writeText(password);
    passwordRef?.current?.select();
  }

  return (
    <>
    <div>
      <h1 className='bg-red-400 text-center w-full'>Random Password Generator Code</h1>
      <div className=" flex justify-center m-10">

      <div className="w-full max-w-sm min-w-[200px] flex ">
        <input className="w-full bg-transparent placeholder:text-white/70 text-white text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" placeholder="Type here..." readOnly
          value={password} ref={passwordRef}
        />
        <button className="outline-none shrink-0 px-3 py-0.5 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded" onClick={copyPasswordMethod}>
          copy
        </button>
      </div>
      </div>

      <div className='flex justify-center'>

        <div>
          <input type="range" min={6} max={30} className='cursor-pointer' onChange={(e) => setLength(Number(e.target.value))} value={rangeLength} />
          <div className='text-amber-300'> Length: {rangeLength}</div>
        </div>

        <div className='flex'>
          <input type="checkbox" defaultChecked={numbersAllowed} className='cursor-pointer' onChange={(e) => setNumbers(Boolean(e.target.value))} />
          <div className='text-amber-300'> Number Allowed</div>
        </div>

        <div className='flex justify-center align-middle'>
          <input type="checkbox" defaultChecked={charAllowed} className='cursor-pointer' onChange={(e) => setChars(Boolean(e.target.value))} />
          <div className='text-amber-300'> Characters Allowed</div>
        </div>

      </div>

    </div>
    </>
  )
}

export default App
