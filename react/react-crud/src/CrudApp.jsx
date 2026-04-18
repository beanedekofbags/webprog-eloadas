import React, { useState } from 'react'
import './react.css'

const pizzaList = [
  { nev: 'Áfonyás', kategorianev: 'király', vegetarianus: 0 },
  { nev: 'Babos', kategorianev: 'lovag', vegetarianus: 0 },
  { nev: 'Barbecue chicken', kategorianev: 'lovag', vegetarianus: 0 },
  { nev: 'Betyáros', kategorianev: 'király', vegetarianus: 0 },
  { nev: 'Caribi', kategorianev: 'apród', vegetarianus: 0 },
  { nev: 'Country', kategorianev: 'király', vegetarianus: 0 },
  { nev: 'Csabesz', kategorianev: 'király', vegetarianus: 0 },
  { nev: 'Csupa sajt', kategorianev: 'lovag', vegetarianus: 1 },
  { nev: 'Erdő kapitánya', kategorianev: 'apród', vegetarianus: 0 },
  { nev: 'Erős János', kategorianev: 'lovag', vegetarianus: 0 },
  { nev: 'Excellent', kategorianev: 'király', vegetarianus: 0 },
  { nev: 'Főnök kedvence', kategorianev: 'lovag', vegetarianus: 0 },
  { nev: 'Francia', kategorianev: 'főnemes', vegetarianus: 0 },
  { nev: 'Frankfurti', kategorianev: 'király', vegetarianus: 0 },
  { nev: 'Füstös', kategorianev: 'lovag', vegetarianus: 0 },
  { nev: 'Gino', kategorianev: 'király', vegetarianus: 0 },
  { nev: 'Gombás', kategorianev: 'apród', vegetarianus: 1 },
  { nev: 'Góré', kategorianev: 'lovag', vegetarianus: 0 },
  { nev: 'Görög', kategorianev: 'király', vegetarianus: 0 },
  { nev: 'Gyros pizza', kategorianev: 'király', vegetarianus: 0 },
  { nev: 'HamAndEggs', kategorianev: 'lovag', vegetarianus: 0 },
  { nev: 'Hamm', kategorianev: 'lovag', vegetarianus: 0 },
  { nev: 'Hawaii', kategorianev: 'főnemes', vegetarianus: 0 },
  { nev: 'Hellas', kategorianev: 'király', vegetarianus: 0 },
  { nev: 'Hercegnő', kategorianev: 'király', vegetarianus: 0 },
  { nev: 'Ilike', kategorianev: 'lovag', vegetarianus: 0 },
  { nev: 'Ínyenc', kategorianev: 'lovag', vegetarianus: 0 },
  { nev: 'Jázmin álma', kategorianev: 'lovag', vegetarianus: 0 },
  { nev: 'Jobbágy', kategorianev: 'király', vegetarianus: 0 },
  { nev: 'Juhtúrós', kategorianev: 'lovag', vegetarianus: 0 },
  { nev: 'Kagylós', kategorianev: 'király', vegetarianus: 0 },
  { nev: 'Kétszínű', kategorianev: 'lovag', vegetarianus: 0 },
  { nev: 'Kiadós', kategorianev: 'király', vegetarianus: 0 },
  { nev: 'Király pizza', kategorianev: 'király', vegetarianus: 0 },
  { nev: 'Kívánság', kategorianev: 'lovag', vegetarianus: 1 },
  { nev: 'Kolbászos', kategorianev: 'apród', vegetarianus: 0 },
  { nev: 'Lagúna', kategorianev: 'király', vegetarianus: 1 },
  { nev: 'Lecsó', kategorianev: 'király', vegetarianus: 0 },
  { nev: 'Maffiózó', kategorianev: 'lovag', vegetarianus: 0 },
  { nev: 'Magvas', kategorianev: 'király', vegetarianus: 1 },
  { nev: 'Magyaros', kategorianev: 'lovag', vegetarianus: 0 },
  { nev: 'Máj Fair Lady', kategorianev: 'király', vegetarianus: 0 },
  { nev: 'Mamma fia', kategorianev: 'király', vegetarianus: 0 },
  { nev: 'Mexikói', kategorianev: 'főnemes', vegetarianus: 0 },
  { nev: 'Mixi', kategorianev: 'főnemes', vegetarianus: 1 },
  { nev: 'Nikó', kategorianev: 'király', vegetarianus: 0 },
  { nev: 'Nordic', kategorianev: 'király', vegetarianus: 0 },
  { nev: 'Nyuszó-Muszó', kategorianev: 'király', vegetarianus: 0 },
  { nev: 'Pacalos', kategorianev: 'lovag', vegetarianus: 0 },
  { nev: 'Pástétomos', kategorianev: 'király', vegetarianus: 0 },
  { nev: 'Pásztor', kategorianev: 'lovag', vegetarianus: 0 },
  { nev: 'Pipis', kategorianev: 'lovag', vegetarianus: 0 },
  { nev: 'Popey', kategorianev: 'király', vegetarianus: 0 },
  { nev: 'Quattro', kategorianev: 'király', vegetarianus: 0 },
  { nev: 'Ráki', kategorianev: 'király', vegetarianus: 0 },
  { nev: 'Rettenetes magyar', kategorianev: 'lovag', vegetarianus: 0 },
  { nev: 'Röfi', kategorianev: 'király', vegetarianus: 0 },
  { nev: 'Sajtos', kategorianev: 'apród', vegetarianus: 1 },
  { nev: 'So-ku', kategorianev: 'apród', vegetarianus: 0 },
  { nev: 'Son-go-ku', kategorianev: 'főnemes', vegetarianus: 1 },
  { nev: 'Sonkás', kategorianev: 'apród', vegetarianus: 0 },
  { nev: 'Spanyol', kategorianev: 'király', vegetarianus: 0 },
  { nev: 'Spencer', kategorianev: 'főnemes', vegetarianus: 0 },
  { nev: 'Szalámis', kategorianev: 'apród', vegetarianus: 0 },
  { nev: 'Szardíniás', kategorianev: 'lovag', vegetarianus: 0 },
  { nev: 'Szerzetes', kategorianev: 'király', vegetarianus: 0 },
  { nev: 'Szőke kapitány', kategorianev: 'király', vegetarianus: 0 },
  { nev: 'Tenger gyümölcsei', kategorianev: 'király', vegetarianus: 0 },
  { nev: 'Tonhalas', kategorianev: 'lovag', vegetarianus: 0 },
  { nev: 'Törperős', kategorianev: 'lovag', vegetarianus: 0 },
  { nev: 'Tündi kedvence', kategorianev: 'király', vegetarianus: 0 },
  { nev: 'Tüzes halál', kategorianev: 'király', vegetarianus: 0 },
  { nev: 'Vega', kategorianev: 'lovag', vegetarianus: 1 },
  { nev: 'Zöldike', kategorianev: 'főnemes', vegetarianus: 1 }
]

function CreateRegistrationTab(props) {
  const defaultFields = {nev: "", kategorianev: "", vegetarianus: 0};
  const [pizzaFields, setPizzaFields] = useState(defaultFields);
  
  let isEditing = props.editing !== null;
  const [wasEditing, setWasEditing] = useState(isEditing);
  
  function handleChange(e) {
    const {name, value} = e.target;
    setPizzaFields(
      {...pizzaFields, [name]: value}
    );
  }
  function handleRadio(e, value) {
    const {name} = e.target;
    setPizzaFields(
      {...pizzaFields, [name]: value}
    )
  }
  function editPizzaFields(e, pizza) {
    if (props.editing !== null) {
      props.editPizza(props.editing, pizza);
    }
  }
  function submitPizzaFields(e, pizza) {
    e.preventDefault();
    props.addPizza(pizza);
  }
  
  if (isEditing !== wasEditing) {
    console.log("editing updated: "+isEditing);
    isEditing ? setPizzaFields(props.editing) : setPizzaFields(defaultFields);
    setWasEditing(isEditing);
  }
  
  return (
    <>
      <div className="textbox" id="registration">
        <h1>{isEditing ? ("\""+props.editing.nev+"\" szerkesztése") : "Új pizza regisztrálása"}</h1>
        
        <label htmlFor="nev" className="section">Név</label>
          <input type="text" value={pizzaFields.nev} onChange={handleChange} name="nev" placeholder="Enter pizza name"/>
        <br/>
        <label htmlFor="kategorianev" className="section">Kategória</label>
          <input type="text" value={pizzaFields.kategorianev} onChange={handleChange} name="kategorianev" placeholder="Enter pizza category"/>
        <br/>
        <label htmlFor="vegetarianus" className="section">Vegetáriánus?</label>
          <div className="radiocontainer">
            <label htmlFor="vegetarianus-yes">Igen</label>
              <input checked={pizzaFields.vegetarianus} onChange={e => handleRadio(e, 1)} name="vegetarianus" id="vegetarianus-yes" type="radio" required/>
            <label htmlFor="vegetarianus-no">Nem</label>
              <input checked={!pizzaFields.vegetarianus} onChange={e => handleRadio(e, 0)} name="vegetarianus" id="vegetarianus-no" type="radio" required/>
          </div>
        <br/>
        <button type="button" onClick={e => isEditing ? editPizzaFields(e, pizzaFields) : submitPizzaFields(e, pizzaFields)}>{isEditing ? "SZERKESZTÉS" : "REGISZTRÁLÁS"}</button>
        <button type="button" className={isEditing ? "" : "hidden"} onClick={() => props.setEditing(null)}>VISSZA</button>
      </div>
    </>
  )
  
}

function CreatePizzaTable(props) {
  const [selected, setSelection] = useState(null);
  
  function toggleSelection(pizza) {
    if (selected !== null && pizza.nev === selected) {
      setSelection(null);
      return;
    }
    setSelection(pizza.nev);
  }
  
  function startEditing(pizza) {
    props.setEditing(pizza);
  }
  
  return (
    <>
      <div className="textbox" id="pizza-box">
        <div className="table">
          <div className="row title-row">
            <div className="cell">Név</div>
            <div className="cell">Kategória</div>
            <div className="cell">Vegetáriánus?</div>
          </div>
          {props.pizzas.map(pizza => 
            
            <div key={pizza.nev}>
              <div onClick={() => toggleSelection(pizza)} className={"row selectableElement "+(selected === pizza.nev ? "selected" : "")}>
                <div className="cell" key={"cell"+pizza.nev}>{pizza.nev}</div>
                <div className="cell" key={"cell"+pizza.kategorianev}>{pizza.kategorianev}</div>
                <div className="cell" key={"cell"+pizza.vegetarianus}>{pizza.vegetarianus === 1 ? "✓" : "✗"}</div>
              </div>
              <div className={"edit-bar "+(selected === pizza.nev ? "" : "hidden")}>
                <button className="fillbutton" onClick={() => startEditing(pizza)}>SZERKESZTÉS</button>
                <button className="fillbutton" onClick={() => props.deletePizza(pizza)}>TÖRLÉS</button>
              </div>
            </div>
            
          )}
        </div>
      </div>
    </>
  )
}

function App() {
  
  const [pizzas, setPizzas] = useState(pizzaList);
  const [editing, setEditing] = useState(null);
  
  function addPizza(pizza) {
    if (pizzas.find(p => p.nev === pizza.nev) == null) {
      setPizzas([...pizzas, pizza]);
    }
  }
  function editPizza(oldPizza, newPizza) {
    console.log(pizzas);
    if (pizzas.filter(p => p !== oldPizza).find(p => p.nev === newPizza.nev) == null) {
      let i = pizzas.findIndex(p => p.nev === oldPizza.nev);
      let modified = pizzas.slice(); modified[i] = newPizza;
      setPizzas(modified);
      setEditing(null);
      return;
    }
  }
  function deletePizza(pizza) {
    let f = pizzas.filter(p => p.nev !== pizza.nev);
    setPizzas(f);
  }
  
  return (
    <>
      <CreateRegistrationTab addPizza={addPizza} editing={editing} editPizza={editPizza} setEditing={setEditing}/>
      <CreatePizzaTable pizzas={pizzas} deletePizza={deletePizza} setEditing={setEditing}/>
    </>
  )
}
export default App;
