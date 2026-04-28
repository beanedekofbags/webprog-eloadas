import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './assets/css/axios.css'

const pizzaList = []

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
  
  if (props.pizzas != null) {
    return (
      <>
        <div className="textbox" id="table-display">
          <div className="table">
            <div className="row title-row">
              <div className="cell">Név</div>
              <div className="cell">Kategória</div>
              <div className="cell">Vegetáriánus?</div>
            </div>
            {props.pizzas.map(pizza => 
              
              <div key={pizza.nev}>
                <div onClick={() => toggleSelection(pizza)} className={"row selectable-element "+(selected === pizza.nev ? "selected" : "")}>
                  <div className="cell" key={"cell"+pizza.nev}>{pizza.nev}</div>
                  <div className="cell" key={"cell"+pizza.kategorianev}>{pizza.kategorianev}</div>
                  <div className="cell" key={"cell"+pizza.vegetarianus}>{pizza.vegetarianus == 1 ? "✓" : "✗"}</div>
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
    );
  }
}

const axiosApi = 'src/axios_api.php';
function App() {
  
  const [pizzas, setPizzas] = useState(new Array());
  const [editing, setEditing] = useState(null);
  
  useEffect(() => {
    fetchPizzaData();
  }, []);
  
  const fetchPizzaData = async () => {
    const res = await axios.get(axiosApi);
    setPizzas(res.data.readData);
    
    console.log('read data:');
    console.log(res.data);
  };
  
  async function addPizza(pizza) {
    const res = await axios.post(axiosApi, { 'nev': pizza.nev, 'kategorianev': pizza.kategorianev, 'vegetarianus': pizza.vegetarianus });
    
    fetchPizzaData();
    console.log('create data:');
    console.log(res.data);
  }
  async function editPizza(oldPizza, newPizza) {
    const res = await axios.put(axiosApi, { 'newnev': newPizza.nev, 'kategorianev': newPizza.kategorianev, 'vegetarianus': newPizza.vegetarianus, 'oldnev': oldPizza.nev });
    setEditing(null);
    
    fetchPizzaData();
    console.log('update data:');
    console.log(res.data);
  }
  async function deletePizza(pizza) {
    console.log(pizza);
    console.log(pizza.nev);
    const res = await axios.delete(axiosApi, { data: { 'nev': pizza.nev } });
    
    fetchPizzaData();
    console.log('delete data:');
    console.log(res.data);
  }
  
  return (
    <>
      <CreateRegistrationTab addPizza={addPizza} editing={editing} editPizza={editPizza} setEditing={setEditing}/>
      <CreatePizzaTable pizzas={pizzas} deletePizza={deletePizza} setEditing={setEditing}/>
    </>
  );
}
export default App;
