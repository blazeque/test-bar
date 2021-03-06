import React, { useContext, useState } from 'react';

import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import { ModalContext } from '../context/ModalContext';
import axios from 'axios';
 

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles(theme => ({
  paper: {
    position: 'absolute',
    width: 600,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    overflow: 'auto',
    maxHeight: '90%'
  },
}));


function Recipe({ recipe }) {

  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const classes = useStyles();

  const { information, setId } = useContext(ModalContext);

  const handleOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
    setId(null);
  }

  const handleClick = () => {
    setId(recipe.idDrink);
    handleOpen();
  }

  const orderDrink = () => {
    const URL = 'http://localhost:3003/api/todos'
    const description = recipe.strDrink
    try {
      axios.post(URL, { description })
      alert('Drink ordered')
      setOpen(false);
    } catch {
      console.log('Erro')
    }
  }

  const showIngredients = information => {
    let ingredients = [];
    for (let i = 1; i < 16; i++) {

      if (information[`strIngredient${i}`] === null) break;

      ingredients.push(
        <li>{information[`strIngredient${i}`]} {information[`strMeasure${i}`]}</li>
      );
    }

    return ingredients;
  }

  return (
    <div className="card">
      <div className="card-header">
        <h3>{recipe.strDrink}</h3>
      </div>
      <img src={recipe.strDrinkThumb} alt={recipe.strDrink} className="card-img-top mw-100" />
      <div className="card-body">
        <button
          className="btn btn-block btn-info"
          onClick={handleClick}
        >
          See Recipe
        </button>

        <Modal
          open={open}
          onClose={handleClose}
        >
          <div style={modalStyle} className={classes.paper}>
            <div className="top-modal">
            <p onClick={handleClose} className="btn btn-info close-button">X</p>
            <h2>{information.strDrink}</h2>
            </div>
         
            <h3 className="mt-4">Instructions</h3>
            <p>
              {information.strInstructions}
            </p>
            <img src={information.strDrinkThumb} alt="" className="img-fluid" />
            <div className="cantitys">
               <h3>Ingredients and Cantitys</h3>
            <ul>
              {showIngredients(information)}
            </ul>
            </div>
 
            <button className="btn btn-info btn-order" onClick={orderDrink}>Order</button>
          </div>
        </Modal>
      </div>
    </div>
  );
}

export default Recipe;