import { useState, useRef } from 'react';
import styles from './Adds.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import zero from './Images/zero.jpg'
import unicorn from './Images/unicorn.jpg'
import coke from './Images/coke.jpg'


export default function Adds(){
  let adds = [zero, coke, unicorn];
  let randomizedAdd = adds[Math.floor(Math.random() * adds.length)];
  
  
  return(

    <container className={styles.addsPlacement}>
    
    <img className={styles.addsSinglePlacement} src={randomizedAdd}></img>

    </container>
  )  
}