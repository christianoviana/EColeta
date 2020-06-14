import React from 'react';
import {FiCheckCircle, FiXCircle} from 'react-icons/fi';
import './styles.css';

interface Parameters {
    isShow:boolean,
    message:string,
    isSucess:boolean
    // clickOutsideHandler:(event: React.MouseEvent<HTMLDivElement>) => void
}

const Message: React.FC<Parameters> = (props) => {
    return (
       <div id='alert' className={`container ${props.isShow?'show':'hide'}`}>
           <div className='popup'> 
                {props.isSucess ? <div><FiCheckCircle id='FiCheckCircle'/></div> : <div><FiXCircle id='FiXCircle'/></div>}            
                <h1>{props.message}</h1>
           </div>
       </div>
    );
}

export default Message;