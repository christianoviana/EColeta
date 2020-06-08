import React from 'react';
import logo from '../../assets/logo.svg';
import {FiArrowLeft} from 'react-icons/fi';
import {Link} from 'react-router-dom';
import './styles.css';

const Header : React.FC<HeaderProps> = (props) => {
    const _backTo = props.backTo;
  
    return (
        <header>
            <img src={logo}></img>        
            {_backTo && <Link id='btnBack' to={props.backTo?props.backTo:'/'}> <FiArrowLeft id='arrow'/> Voltar </Link> }
        </header>
    );

}

interface HeaderProps {
    backTo?:string
};

export default Header;