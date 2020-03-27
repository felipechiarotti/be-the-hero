import React, {useEffect, useState} from 'react';
import logoImg from '../../assets/logo.svg';
import { Link, useHistory } from 'react-router-dom';
import {FiPower, FiTrash2} from 'react-icons/fi';
import './style.css';
import api from '../../services/api';

export default function Profile(){
    const [casos, setCasos] = useState([]);
    const history = useHistory();
    const ongName = localStorage.getItem('ongName');
    const ongID = localStorage.getItem('ongId');
    useEffect(() => {
        api.get('profile', {
            headers: {
                Authorization: ongID
            }
        }).then(
            response => {
                setCasos(response.data);
            }
        )
    }, [ongID]);

    async function handleDelete(id){
        try{
            await api.delete(`casos/${id}`, {
                headers:{
                    Authorization: ongID
                }
            });

            setCasos(casos.filter(caso => caso.id !== id));
        }catch(err){
            alert('Erro ao deletar caso');
        }
    }

    function handleLogout(){
        localStorage.clear();
        history.push('/');
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be the Hero"/>
                <span>Bem vinda, {ongName}</span>
                <Link className="button" to="/casos/novo">Cadastrar novo caso</Link>
                <button type="button" onClick={handleLogout}>
                    <FiPower size={18} color="#e02041"/>
                </button>
            </header>


            <h1>
                Casos Cadastrados
            </h1>

            <ul>
                {casos.map(caso => (
                    <li key={caso.id}>
                        <strong>CASO:</strong>
                <p>{caso.titulo}</p>
                
                        <strong>DESCRIÇÃO</strong>
                        <p>{caso.descricao}</p>
                
                        <strong>VALOR:</strong>
                        <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(caso.valor)}</p>
                        <button type="button" onClick={ () => handleDelete(caso.id)}><FiTrash2 size={20} color="#a8a8b3"/></button>
                    </li>
                ))}
            </ul>
        </div>
    );
}