import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import './style.css';
import heroesImg from '../../assets/heroes.png';
import logoImg from '../../assets/logo.svg';
import {FiLogIn} from 'react-icons/fi';
import api from '../../services/api';

export default function Logon(){

    const [id, setId] = useState('');
    const history = useHistory();

    async function handleLogon(e){
        e.preventDefault();

        try{
            const resposta = await api.post('sessions', {id});
            localStorage.setItem('ongId', id);
            localStorage.setItem('ongName', resposta.data.nome);

            history.push('/perfil');
        }catch(err){
            alert('Falha ao efetuar login');
        }
    }

    return (
        <div className="logon-container">
            <section className="form">
                <img src={logoImg} alt="Be the Hero"/>
                <form onSubmit={handleLogon}>
                    <h1>Faça seu Logon</h1>

                    <input placeholder="Sua ID" value={id}
                    onChange={e => setId(e.target.value)}/>
                    <button className="button" type="submit">Entrar</button>

                    <Link className="back-link" to="/cadastro">
                        <FiLogIn size = {16} color="#e02041"/>
                        Não tenho cadastro
                    </Link>
                </form>
            </section>

            <img src={heroesImg} alt="Heroes"/>
        </div>
    );
}