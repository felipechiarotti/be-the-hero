import React, { useState } from 'react';
import logoImg from '../../assets/logo.svg';
import { Link, useHistory} from 'react-router-dom';
import {FiArrowLeft} from 'react-icons/fi';
import './style.css';
import api from '../../services/api';

export default function NewIncident(){
    const [titulo, setTitulo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [valor, setValor] = useState('');
    const ongId = localStorage.getItem('ongId');
    const history = useHistory();

    async function handleNovoCaso(e){
        e.preventDefault();

        const data ={
            titulo,
            descricao,
            valor
        }
        try{
            await api.post('casos',data, {
                headers:{
                    Authorization: ongId
                }
            });
            history.push('/perfil');
        }catch(err){

        }
        
    }
    return (
        <div className="new-incident-container">
        <div className="content">
            <section>
                <img src={logoImg} alt="Be the Hero"/>
                <h1>Cadastrar novo caso</h1>
                <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>
            
                <Link className="back-link" to="/perfil">
                    <FiArrowLeft/>
                    Voltar para Home
                </Link>
            </section>

            <form onSubmit={handleNovoCaso}>
                <input 
                    placeholder="Título do caso"
                    value={titulo}
                    onChange={e => setTitulo(e.target.value)}
                    />
                <textarea 
                    placeholder="Descrição"
                    value={descricao}
                    onChange={e => setDescricao(e.target.value)}
                    />
                <input 
                    placeholder="Valor (R$)"
                    value={valor}
                    onChange={e => setValor(e.target.value)}
                    />

               
                <button className="button" type="submit">Cadastrar</button>
            </form>
        </div>
    </div>
    );
}