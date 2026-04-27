import React, { useState } from 'react'
import './assets/css/pizzabuilder.css'

function App(props) {
  
  let pizza = document.getElementById("pizza-container");
  
  function toggleComponent(name) {
    if (props.pizzaComponents.find(c => c === name) == null) {
      props.setPizzaComponents([...props.pizzaComponents, name])
    }
    else {
      props.setPizzaComponents(props.pizzaComponents.filter(c => c !== name))
    }
    if (pizza != null) {
      pizza.animate([
        {transform: "scale(0.96)"},
        {transform: "scale(1.0)"},
      ],
      {
        duration: 300,
        easing: "ease-out"
      })
    }
  }
  return (
    <>
      <div id="leftside">
        <>
          {
            props.componentList.map(({name, text, contents, sort}) => {
                if (name === "base") return;
                return (
                  <div className={"pizza-button " + (props.pizzaComponents.find(c => c === name) != null ? "selected" : "")} key={name} onClick={() => toggleComponent(name)}>
                    { text }
                  </div>
                )
              }
            )
          }
        </>
      </div>
      <div id="rightside">
        <div id="pizza-moveinright">
          <div id="pizza-rotate">
            {props.pizzaFrame}
          </div>
        </div>
      </div>
    </>
  )
}
export default App;
