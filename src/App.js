

import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [result, setResult] = useState('');

  const handleClick = (e) => {
    if (e.target.name === '=') {
      calculate();
    } else if (e.target.name === 'C') {
      clear();
    } else if (e.target.name === 'B') {
      backspace();
    } else {
      setResult(result + e.target.name);
    }
  };

  const clear = () => {
    setResult('');
  };

  const backspace = () => {
    setResult(result.slice(0, result.length - 1));
  };

  const calculate = () => {
    try {
      setResult(eval(result).toString());
    } catch (err) {
      setResult('Error');
    }
  };

  useEffect(() => {
    const handleKeyboardInput = (event) => {
      const key = event.key;
      const allowedKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '-', '*', '/', '.', 'Enter', 'Backspace', 'Escape'];

      if (allowedKeys.includes(key)) {
        if (key === 'Enter') {
          calculate();
        } else if (key === 'Backspace') {
          backspace();
        } else if (key === 'Escape') {
          clear();
        } else {
          setResult(result + key);
        }
      }
    };

    window.addEventListener('keydown', handleKeyboardInput);

    return () => {
      window.removeEventListener('keydown', handleKeyboardInput);
    };
  }, [result]);

  return (
    <>
      <div className="container">
        <form>
          <input  type="text" min="0" max="9999" value={result}/>
        </form>
        <div className="keypad">
          <button className="highlight" onClick={clear}
          id='clear' name="C">
            Clear
          </button>
          <button className="highlight" onClick={backspace} id='backspace' name="B">
            C
          </button>
          <button className="highlight" name="/" onClick={handleClick}>
            &divide;
          </button>
          <button name="7" onClick={handleClick}>7</button>
          <button name="8" onClick={handleClick}>8</button>
          <button name="9" onClick={handleClick}>9</button>
          <button className="highlight" name="*" onClick={handleClick}>
            &times;
          </button>
          <button name="4" onClick={handleClick}>4</button>
          <button name="5" onClick={handleClick}>5</button>
          <button name="6" onClick={handleClick}>6</button>
          <button className="highlight" name="-" onClick={handleClick}>
            &ndash;
          </button>
          <button name="1" onClick={handleClick}>1</button>
          <button name="2" onClick={handleClick}>2</button>
          <button name="3" onClick={handleClick}>3</button>
          <button className="highlight" name="+" onClick={handleClick}>
            +
          </button>
          <button name="0" onClick={handleClick}>0</button>
          <button name="." onClick={handleClick}>.</button>
          <button className="highlight" id='result' onClick={calculate} name="=">
            =
          </button>
        </div>
      </div>
    </>
  );
};

export default App;
