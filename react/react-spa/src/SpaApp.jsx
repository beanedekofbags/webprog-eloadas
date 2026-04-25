import React, { useState } from 'react'
import './reactspa.css'
import PizzaBuilderApp from './PizzaBuilderApp.jsx'
import PizzaShooterApp from './PizzaEvalApp.jsx'

let componentList = new Array();

function addPizzaComponent(name, text, imgsrc, sort, price) {
  sort = sort ?? 0;
  text = text ?? name;
  let c = (
    <img src={imgsrc}/>
  );
  componentList.push({'name': name, 'text': text, 'contents': c, 'sort': sort, 'price': price});
  return c;
}

function registerPizzaComponents() {
  addPizzaComponent("base", "alap", "pizza_base.png", 0, 50);
  addPizzaComponent("sauce", "szósz", "pizza_sauce_alt.png", 1, 100);
  addPizzaComponent("cheese", "sajt", "pizza_cheese_alt2.png", 2, 120);
  addPizzaComponent("pepperoni", "szalámi", "pizza_pepperoni.png", 3, 200);
  addPizzaComponent("onion", "hagyma", "pizza_onion.png", 4, 80);
  addPizzaComponent("tomato", "paradicsom", "pizza_tomato.png", 5, 110);
  addPizzaComponent("pepper", "paprika", "pizza_pepper.png", 6, 130);
  addPizzaComponent("mushroom", "gomba", "pizza_mushroom.png", 7, 180);
}

function Page1(props) {
  return (
    <div id='page1'>
      <PizzaBuilderApp pizzaFrame={props.pizzaFrame} componentList={componentList} pizzaComponents={props.pizzaComponents} setPizzaComponents={props.setPizzaComponents} />
    </div>
  )
}

function Page2(props) {
  return (
    <div id='page2'>
      <PizzaShooterApp pizzaFrame={props.pizzaFrame} componentList={componentList} pizzaComponents={props.pizzaComponents}/>
    </div>
  )
}

function PizzaFrame(props) {
  return (
    <div id="pizza-container">
      {
        componentList.map(({name, text, contents, sort}) => 
          <div key={name} className={"pizza-component "+(props.pizzaComponents.find(c => c === name) != null ? "" : "hidden")} style={{zIndex: sort}}>
            { contents }
          </div>
        )
      }
    </div>
  )
}

function Content() {
  
  componentList = new Array();
  registerPizzaComponents();
  
  const [page, setPage] = useState(0)
  
  const defaultComponents = [
    "base",
    "sauce"
  ]
  const [pizzaComponents, setPizzaComponents] = useState(defaultComponents);
  
  let p = () => {
    switch(page) {
      case 0:
        return <Page1 pizzaFrame={<PizzaFrame pizzaComponents={pizzaComponents} />} componentList={componentList} pizzaComponents={pizzaComponents} setPizzaComponents={setPizzaComponents}/>
      case 1:
        return <Page2 pizzaFrame={<PizzaFrame pizzaComponents={pizzaComponents} />} componentList={componentList} pizzaComponents={pizzaComponents}/>
    }
  }
  
  return (
    <>
      <div className='navigation'>
        <div className='navbutton' onClick={() => setPage(0)}>PIZZA ÖSSZERAKÁSA</div>
        <div className='navbutton' onClick={() => setPage(1)}>PIZZA KIÉRTÉKELÉSE</div>
      </div>
      {p()}
    </>
  )
}

function App() {
  
  return (
    <>
      <Content />
    </>
  )
}
export default App;
