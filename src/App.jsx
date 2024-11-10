import React, { useState ,useCallback , useEffect ,useRef} from 'react'
import styled from "styled-components"
import './App.css'

function App() {
const [length, setLength]= useState(8);
const [numAllowed, setNumAllowed] = useState(false);
const [charAllowed,setCharAllowed] = useState(false)
const [password,setPassword] = useState();
const passwordRef = useRef(null)

const passwordGenerator = useCallback(()=>{
let pass = "";
let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
if(numAllowed) str+="123456789";
if(charAllowed) str += "!@#$%^&*()_+" 

for (let i = 0; i < length; i++) {
     let char = Math.floor(Math.random()*str.length +1)
     pass += str.charAt(char)
  
}
setPassword(pass)
},[length,numAllowed,charAllowed])

const copyPassword =()=>{
  window.navigator.clipboard.writeText(password)
    passwordRef.current?.select()
    
}

useEffect(()=>{
passwordGenerator()
},[length,numAllowed,charAllowed])


  return (
    <>
    <h1>password Generator</h1>
      <Container>
        
        <InputContainer>
          <input type="text" value={password} readOnly 
          ref={passwordRef} />
          <button onClick={copyPassword} >Copy</button>
        </InputContainer>
        
        <OptionsContainer>
        <label >
        <input 
          type="range" 
          min={6}
          max={100}
          value={length}
          className='cursor-pointer'
          onChange={(e) => setLength(e.target.value)}
          name="" 
          id=""
           />
           length ({length})
           </label>
          
          <label>
            <input type="checkbox" 
            defaultChecked={numAllowed}
            onChange={()=>{
              setNumAllowed((prev)=> !prev)
            }}
            />
            Numbers
          </label>
          
          <label>
            <input type="checkbox" defaultChecked={charAllowed} 
            onChange={()=>{
              setCharAllowed((prev)=> !prev)
            }}
            />
            Special Characters
          </label>
        </OptionsContainer>
      </Container>
    </>
  )
}

const Container = styled.div`
  width: 80%;
  max-width: 400px;
  margin: 2rem auto;
  padding: 1.5rem;
  border-radius: 8px;
  background-color: #2c2c2e;
  color: #ffffff;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.2);
  font-family: Arial, sans-serif;
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  
  input[type="text"] {
    flex: 1;
    padding: 0.5rem;
    border-radius: 4px;
    border: 1px solid #ccc;
    outline: none;
    color: #333;
  }
  
  button {
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 4px;
    background-color: #007bff;
    color: #ffffff;
    cursor: pointer;
    font-weight: bold;
  }
`;

const OptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  
  label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.9rem;
  }
  
  input[type="range"] {
    flex: 1;
    cursor: pointer;
  }
  
  input[type="checkbox"] {
    cursor: pointer;
  }
`;

export default App
