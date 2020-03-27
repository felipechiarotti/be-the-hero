import React, { useState} from 'react';
import './style.css';
import logoImg from '../../assets/logo.svg';
import {Link, useHistory} from 'react-router-dom';
import {FiArrowLeft} from 'react-icons/fi';
import api from '../../services/api';


export default function Register(){
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [cidade, setCidade] = useState('');
    const [uf, setUf] = useState('');

    const history = useHistory();

    async function handleRegister(e){
        e.preventDefault();
        const data ={
            nome,
            email,
            whatsapp,
            cidade,
            uf
        };
        try{
            const resposta = await api.post('ongs', data);
            alert(`Seu ID de acesso: ${resposta.data.id}`);
            history.push('/');
        }catch(err){
            alert('Erro ao criar ONG');
        }

    }


    return(
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be the Hero"/>
                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, entre na plataforma e ajude as pessoas a encontrarem os casos da sua ONG.</p>
                
                    <Link className="back-link" to="/">
                        <FiArrowLeft/>
                        Não tenho cadastro!
                    </Link>
                </section>

                <form onSubmit={handleRegister}>
                    <input 
                        placeholder="Nome da ONG"
                        value={nome}
                        onChange={e => setNome(e.target.value)}
                    />

                    <input type="email"
                        placeholder="E-mail"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />

                    <input 
                        placeholder="Whatsapp"
                        value={whatsapp}
                        onChange={e => setWhatsapp(e.target.value)}
                    />

                    <div className="input-group">
                        <input placeholder="Cidade"
                        value={cidade}
                        onChange={e => setCidade(e.target.value)}/>


                        <input style={{width:80}}placeholder="UF"
                        value={uf}
                        onChange={e => setUf(e.target.value)}/>
                    </div>

                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}