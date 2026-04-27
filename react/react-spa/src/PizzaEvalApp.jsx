import React, { useState, useEffect } from 'react'
import './assets/css/pizzaeval.css'

function EvalResults(props) {
  if (!props.evalStarted) return;
  let i = 0;
  
  const [price, setPrice] = useState(0);
  
  return (
    <div className="eval-container textbox">
      <div className="table">
        <div className="row title-row">
          <div className="cell">Feltét</div>
          <div className="cell">Ár</div>
        </div>
        {props.pizzaComponents.map((name) => {
          
          const [appeared, setAppeared] = useState(false)
          let component = props.componentList.find(c => c['name'] === name);
          
          useEffect(() => {
            
            const timer = setTimeout(() => {
              setAppeared(true);
              console.log(price);
              setPrice(prev => prev + component['price']);
            }, i * 333);
            i++;
            
            return () => clearTimeout(timer);
            
          }, []);
          if (appeared) {
            return (
              <div key={name} className="row component-box">
                <div className="cell">{component['text']}</div>
                <div className="cell">{component['price'] + " HUF"}</div>
              </div>
            )
          }
          return;
        })}
      </div>
      <br/>
      <div className="row title-row component-box">
        <div className="cell">Teljes pizza ára:</div>
        <div className="cell">{`${price} HUF`}</div>
      </div>
    </div>
  )
}

function App(props) {
  const [evalStarted, setEvalStarted] = useState(false)
  
  return (
    <>
      <div id="leftside">
        <div id="pizza-moveinleft">
          {props.pizzaFrame}
        </div>
      </div>
      <div id="rightside">
        <div className="eval-button-container">
          <button onClick={() => setEvalStarted(true)}>Kiértékelés</button>
        </div>
        <EvalResults evalStarted={evalStarted} pizzaComponents={props.pizzaComponents} componentList={props.componentList}/>
      </div>
    </>
  )
}
export default App;
