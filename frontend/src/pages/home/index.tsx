import React from 'react';
import './styles.css';
import {FiLogIn, FiSearch} from 'react-icons/fi';

import Header from '../../components/header/index';
import {Link} from 'react-router-dom';

const Home = () => {
    return (
        <div id='page-home'>
            <div className="content">
                <Header/>
                <main>
                    <h1>Seu marketplace de coleta de resíduos</h1>
                    <p>Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente</p>

                    <Link to='/find-points' className='purple'>
                        <span><FiSearch/></span>
                        <strong>Encontre um ponto de coleta</strong>
                    </Link>

                    <Link to='/create-points' className='primary-color'>
                        <span><FiLogIn/></span>
                        <strong>Cadastre um ponto de coleta</strong>
                    </Link>                 
                </main>
            </div>        
        </div>
    );
}

export default Home;