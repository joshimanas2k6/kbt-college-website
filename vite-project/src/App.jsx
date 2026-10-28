import { useState } from 'react'


function cal(){
  const [a, setA] = useState("");
  const [b,setB] = useState("");
  const [result , setResult] = useState("");

  function cal(e){
    let x = Number(a);
    let y = Number(b);

    if(e == "+"){
      setResult(x + y);
    }else if(e == "-"){
      setResult(x - y);
    }else if(e == "*"){
      setResult(x * y);
    }else{
      setResult(x / y);
    }
  }
  return (
    <div>
      A:
      <input 
        type='number'
        value={a}
        onChange={(e) => setA(e.target.value)}
      />
      B:
      <input 
        type='number'
        value={b}
        onChange={(e) => setB(e.target.value)}
      />

      <button onClick={() => cal("+")}>Add</button>
      <button onClick={() => cal("-")}>Sub</button>
      <button onClick={() => cal("*")}>Mul</button>
      <button onClick={() => cal("/")}>sub</button>

      <>
      <h3>Result: {result}</h3>
      </>
    </div>
  );
}

export default cal;