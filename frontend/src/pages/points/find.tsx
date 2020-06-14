import React, {useState, useEffect, ChangeEvent, FormEvent} from 'react';
import Header from '../../components/header/index';
import apiIbge from '../../services/api-ibge';
import api from '../../services/api';

interface IbgeDto{
    sigla:string,
    nome:string
}

interface PointsDto{
    id:number,
    name:string,
    image_url:string,
    email:string
    whatsapp:string,
    state:string,
    city:string,
}

const FindPoints = () => {
    const [IbgeStates, setIbgeStates] = useState<IbgeDto[]>([]);
    const [points, setPoints] = useState<PointsDto[]>([]);
    const [IbgeCities, setIbgeCities] = useState<string[]>(['0']);
    const [selectedUf, setSelectedUf] = useState('0');
    const [selectedCity, setSelectedCity] = useState('0');

    useEffect(() => {
        apiIbge.get<IbgeDto[]>('/localidades/estados').then((response) => {
            const ufInitials = response.data.sort((a, b) => a.nome.localeCompare(b.nome)).map(uf => {
                return {sigla:uf.sigla, nome:uf.nome}
            });

            setIbgeStates(ufInitials);
        })
    }, []);

    useEffect(() => {       
        if (selectedUf === '0'){
            return;
        }
        apiIbge.get<IbgeDto[]>(`/localidades/estados/${selectedUf}/municipios`).then((response) => {
            const cities = response.data.sort((a, b) => a.nome.localeCompare(b.nome)).map(city => city.nome);

            setIbgeCities(cities);
        })
    }, [selectedUf]);

    useEffect(() => {  
        if (selectedUf === '0'){
            setPoints([]);
        }         
        api.get(`/points?state=${selectedUf}`).then((response) => {
            const points = response.data;

           setPoints(points);
        })
    }, [selectedUf]);

    useEffect(() => {  
        if (selectedCity === '0'){
            api.get(`/points?state=${selectedUf}`).then((response) => {
                const points = response.data;    
                setPoints(points);
            })
        } 
        else{
            api.get(`/points?state=${selectedUf}&city=${selectedCity}`).then((response) => {
                const points = response.data;    
                setPoints(points);
            })
        }             
    }, [selectedCity]);

    function handleSelectedUf(event:ChangeEvent<HTMLSelectElement>){        
        setIbgeCities([]);
        setSelectedUf(event.target.value);
    }

    function handleSelectedCity(event:ChangeEvent<HTMLSelectElement>){            
        setSelectedCity(event.target.value);
    }

    return (
      
        <div id="page-find-point">
           
            <Header backTo='/home'/>   

            <form>
                <h1>Consulta de <br/> pontos de coleta</h1>

                <fieldset>
                   <legend>
                       <h2>Endereço</h2>
                   </legend>
                    <div className="field-group">
                        <div className="field">
                            <label htmlFor='state'>Estado</label>
                            <select value={selectedUf} onChange={handleSelectedUf} name='state' id='state'>
                                <option value='0'>Selecione o Estado</option>
                                {IbgeStates.map(uf => (
                                    <option key={uf.sigla} value={uf.sigla}>{uf.nome}</option>
                                ))} 
                            </select>
                        </div>

                        <div className="field">
                            <label htmlFor='city'>Cidade</label>
                            <select value={selectedCity} onChange={handleSelectedCity} name='city' id='city'>
                                <option value='0'>Selecione a Cidade</option>
                                {IbgeCities.map((name, index) => (
                                    <option key={index} value={name}>{name}</option>
                                ))}
                            </select>
                        </div>
                    </div>    

                    <div className="points-list">
                        <ul className="points-item">
                        {
                            points.map((item) => (
                                <li key={item.id}>
                                    <img src={item.image_url}/>
                                    <span>{item.name}</span>
                                    <span>{item.email}</span>
                                    <span>{item.whatsapp}</span>
                                    <span>{item.state} - {item.city}</span>
                                </li>                                
                            ))
                        }                    
                        </ul>         
                    </div> 
                </fieldset>        
            </form> 
        </div>  
    );
}

export default FindPoints;