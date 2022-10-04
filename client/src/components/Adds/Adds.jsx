import { useState, useRef } from 'react';
import styles from './Adds.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import zero from './Images/zero.jpg'
import unicorn from './Images/unicorn.jpg'
import coke from './Images/coke.jpg'

export default function Adds(){

  return(

    <div className='addsPlacement'>

        <img src={zero}/>
        <img src={unicorn}/>
        <img src={coke}/>

    </div>
  )  
}