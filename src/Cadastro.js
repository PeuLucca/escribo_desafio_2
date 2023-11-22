// Core
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from './AuthContext';

// Api
import { createUser } from "./api";

const Cadastro = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [ddd, setDDD] = useState("");
  const [telefone, setTelefone] = useState("");
  const [senha, setSenha] = useState("");

  const [isLogged, setIsLogged] = useState(
    localStorage.getItem('token') === "" ? false : true
  );
  const { login } = useAuth();
  const navigate = useNavigate();

  const validation = async (e) => {
    e.preventDefault();

    if (nome === "" || email === "" || ddd === "" || telefone === "" || senha === "") {
      alert("Insira todos os campos");
      setNome("");
      setEmail("");
      setDDD("");
      setTelefone("");
      setSenha("");
    } else {
      await userCreate();
    }
  }

  const userCreate = async () => {
    try {
      const newuser = {
        nome,
        email,
        telefone: { numero: telefone, ddd },
        senha,
      };
      const response = await createUser(newuser);
      if (response?.token) {
        login(response.token);
        setIsLogged(true);
      } else {
        alert(response.mensagem);
      }

      setNome("");
      setEmail("");
      setDDD("");
      setTelefone("");
      setSenha("");
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (isLogged) {
      navigate("/login");
    }
  }, [isLogged, navigate])

  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <div style={{ width: '300px', padding: '20px', boxShadow: '0px 0px 10px 0px #aaa', borderRadius: "20px" }}>
          <h2 style={{ textAlign: 'center' }}>Cadastro</h2>
          <form>
            <div style={{ marginBottom: '15px' }}>
              <input
                placeholder="Insira o Nome"
                type="text"
                name="name"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                style={{ width: '100%', padding: '10px', boxSizing: 'border-box', marginBottom: '15px' }}
              />
              <input
                placeholder="Insira o Email"
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ width: '100%', padding: '10px', boxSizing: 'border-box', marginBottom: '15px' }}
              />
              <input
                placeholder="Insira o DDD"
                type="number"
                name="ddd"
                value={ddd}
                onChange={(e) => setDDD(e.target.value)}
                style={{ width: '100%', padding: '10px', boxSizing: 'border-box', marginBottom: '15px' }}
              />
              <input
                placeholder="Insira o telefone"
                type="number"
                name="phone"
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
                style={{ width: '100%', padding: '10px', boxSizing: 'border-box' }}
              />
            </div>
            <div style={{ marginBottom: '15px' }}>
              <input
                placeholder="Crie uma senha"
                type="password"
                name="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                style={{ width: '100%', padding: '10px', boxSizing: 'border-box' }}
              />
            </div>
            <div style={{ textAlign: 'center' }}>
              <button
                type="submit"
                style={{
                  height: '40px',
                  backgroundColor: '#4CAF50',
                  color: 'white',
                  border: 'none',
                  width: '100%',
                  cursor: 'pointer',
                  borderRadius: "10px"
                }}
                onClick={(e) => validation(e)}
              >
                Criar usuário
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Cadastro;
