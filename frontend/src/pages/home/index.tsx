import React from 'react';
import './styles.css';
import {FiLogIn} from 'react-icons/fi';

import Header from '../header';
import {Link} from 'react-router-dom';

const Home = () => {
    return (
        <div id='page-home'>
            <div className="content">
                <Header/>
                <main>
                    <h1>Seu marketplace de coleta de resíduos</h1>
                    <p>Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente</p>

                    <Link to='/create-points'>
                        <span><FiLogIn/></span>
                        <strong>Cadastre um ponto de coleta</strong>
                    </Link>
                </main>
            </div>        
        </div>
    );
}

export default Home;