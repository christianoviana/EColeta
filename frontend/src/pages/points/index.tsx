import React, {useEffect, useState, ChangeEvent, FormEvent} from 'react';
import './styles.css';
import Header from '../header'; 
import {Map, TileLayer, Marker} from 'react-leaflet';
import {LeafletMouseEvent} from 'leaflet';
import api from '../../services/api';
import apiIbge from '../../services/api-ibge';
import {Link, useHistory} from 'react-router-dom';
import Dropzone from '../../components/dropzone';


interface ItemDto{
    id:number,
    title:string,
    image_url:string,
}

interface IbgeDto{
    sigla:string,
    nome:string
}

const Points = ()=>{
    const [items, setItems] = useState<ItemDto[]>([]);
    const [IbgeStates, setIbgeStates] = useState<IbgeDto[]>([]);
    const [IbgeCities, setIbgeCities] = useState<string[]>(['0']);
    const [selectedUf, setSelectedUf] = useState('0');
    const [selectedCity, setSelectedCity] = useState('0');
    const [mapPosition, setMapPosition] = useState<[number, number]>([0, 0]);
    const [userPosition, setUserPosition] = useState<[number, number]>([0, 0]);
    const [formData, setFormData] = useState({name:'', email:'', whatsapp:''});
    const [selectedItems, setSelectedItems] = useState<number[]>([]);
    const [selectedFile, setSelectedFile] = useState<File>();

    const history = useHistory();

    useEffect(() => {
        api.get('/items').then((response) => {
            setItems(response.data);
        })
    }, []);

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
        if( navigator.geolocation){
            navigator.geolocation.getCurrentPosition(position => {
                const {latitude, longitude} = position.coords;     
                setUserPosition([latitude, longitude]);
            }, error => {
                // Default
                setUserPosition([-23.5277655,-46.7781165]);
                console.log(error.code + ' - ' + error.message);
            });
        }else{
            // Default
            setUserPosition([-23.5277655,-46.7781165]);
        }       
    }, []);

    function handleSelectedUf(event:ChangeEvent<HTMLSelectElement>){        
        setIbgeCities([]);
        setSelectedUf(event.target.value);
    }

    function handleSelectedCity(event:ChangeEvent<HTMLSelectElement>){            
        setSelectedCity(event.target.value);
    }
    
    function handleMap(event:LeafletMouseEvent){            
        setMapPosition([event.latlng.lat, event.latlng.lng]);
    }
    
    function handleInput(event:ChangeEvent<HTMLInputElement>){            
        const {name, value} = event.target;
        setFormData({...formData, [name]: value});
    }

    function handleSelectedItem(id: number){  
        const alreadySelected = selectedItems.findIndex(item => item === id);

        if(alreadySelected >= 0){
            const filtered = selectedItems.filter(e => e !== id);
            setSelectedItems([...filtered]);
        }else{            
            setSelectedItems([...selectedItems, id]);
        }
    }

    function handleSubmit(event:FormEvent){  
        event.preventDefault();

        const {name, email, whatsapp} = formData;
        const city = selectedCity;
        const state = selectedUf;
        const latitude = userPosition[0];
        const longitude = userPosition[1];
        const items = selectedItems;

        const data = new FormData();     
       
        data.append('name', name);
        data.append('email', email);
        data.append('whatsapp', whatsapp);
        data.append('latitude', String(latitude));
        data.append('longitude', String(longitude));
        data.append('city', city);
        data.append('state', state);
        data.append('items', items.join(','));   
        
        if(selectedFile){            
            data.append('image', selectedFile);
        }

        api.post('/points', data).then(response => {
            console.log(response);
        });

        alert('Ponto Cadastrado com Sucesso');
        history.push('/home');
    }

    return (
       <div id="page-create-point">
           <Header backTo='/home'/>    

           <form onSubmit={handleSubmit}>
               <h1>Cadastro do <br/> ponto de coleta</h1>

                <Dropzone onFileUploaded={setSelectedFile} />

               <fieldset>
                   <legend>
                       <h2>Dados</h2>
                   </legend>

                   <div className="field">
                       <label htmlFor='name'>Nome Entidade</label>
                       <input 
                       type='text'
                       name='name'
                       id='name'
                       onChange={handleInput}
                       />
                   </div>

                   <div className="field-group">
                    <div className="field">
                        <label htmlFor='email'>Email</label>
                        <input 
                        type='email'
                        name='email'
                        id='email'
                        onChange={handleInput}
                        />
                    </div>
                    <div className="field">
                        <label htmlFor='whatsapp'>Whatsapp</label>
                        <input 
                        type='text'
                        name='whatsapp'
                        id='whatsapp'
                        onChange={handleInput}
                        />
                    </div>
                   </div>
               </fieldset>

               <fieldset>
                   <legend>
                       <h2>Endereço</h2>                       
                       <span>Selecione o endereço no mapa</span>
                   </legend>

                   <Map center={userPosition} zoom={15} onClick={handleMap}> 
                   <TileLayer
                    attribution='&amp;copy <Link href="http://osm.org/copyright">OpenStreetMap</Link> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={mapPosition}/>
                   </Map>

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
               </fieldset>

               <fieldset>
                   <legend>
                       <h2>Itens de Coleta</h2>
                       <span>Selecione um ou mais itens abaixo</span>
                   </legend>

                   <ul className="items-grid">
                   {
                        items.map((item) => (
                            <li key={item.id} 
                                onClick={() => handleSelectedItem(item.id)} 
                                className={selectedItems.includes(item.id) ? 'selected' : ''}>
                                <img src={item.image_url}/>
                                <span>{item.title}</span>
                            </li>
                        ))
                    }                    
                   </ul>
               </fieldset>

               <button type="submit">
                    Cadastrar Ponto de Coleta
               </button>
           </form>                 
       </div>
    );
}

export default Points;