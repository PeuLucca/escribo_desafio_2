// Core
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from './AuthContext';

// Api
import { logUser, getUserInfo } from "./api";

const Login = () => {
  const { login, logout } = useAuth();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [isLogged, setIsLogged] = useState(localStorage.getItem('token') === "" ? false : true);
  const [userDetails, setUserDetails] = useState([]);
  const navigate = useNavigate();

  const validation = async (e) => {
    e.preventDefault();

    if (email === "" || senha === "") {
      alert("Email/senha incorreto ou vazio");
      setEmail("");
      setSenha("");
    } else {
      await logUserIn();
    }
  }

  const logUserIn = async () => {
    try {
      const response = await logUser({ email, senha });
      if (response?.token) {
        login(response.token);
        setIsLogged(true);
      } else {
        alert(response.mensagem);
      }
      setEmail("");
      setSenha("");
    } catch (e) {
      console.log(e);
    }
  };

  const handleLogout = () => {
    logout();
    setIsLogged(false);
    setUserDetails([]);
  };

  const fetchLoggedUser = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await getUserInfo(token);
      setUserDetails([response]);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    console.log(userDetails);
  }, [userDetails])

  useEffect(() => {
    const fetchData = async () => {
      if (isLogged) {
        await new Promise(resolve => setTimeout(resolve, 100));
        await fetchLoggedUser();
      }
    };
  
    fetchData();
    return () => {};
  }, [,isLogged]);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <div style={{ width: '300px', padding: '20px', boxShadow: '0px 0px 10px 0px #aaa', borderRadius: "20px" }}>
          <h2 style={{ textAlign: 'center' }}>Login</h2>
          {isLogged ? (
            <>
              <button
                onClick={() => handleLogout()}
                style={{
                  height: '40px',
                  backgroundColor: '#ff0000',
                  color: 'white',
                  border: 'none',
                  width: '100%',
                  cursor: 'pointer',
                  borderRadius: "10px",
                  marginBottom: '10px',
                }}
              >
                Deslogar
              </button>
            </>
            ) : (
            <form>
              <div style={{ marginBottom: '15px' }}>
                <input
                  placeholder="Insira o Email"
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ width: '100%', padding: '10px', boxSizing: 'border-box' }}
                />
                </div>
                <div style={{ marginBottom: '15px' }}>
                  <input
                    placeholder="Insira a senha"
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
                    Entrar
                  </button>
                </div>
                  <a
                    style={{ color: "#1000FF", fontSize: "12px", fontWeight: "bold", cursor: "pointer" }}
                    onClick={() => navigate("/cadastro")}
                  >
                    Não tem cadastro? Clique aqui!
                  </a>
            </form>
            )}
        </div>
      </div>
      {
        isLogged ? (
          <div style={{ display: 'flex', justifyContent: 'left', alignItems: 'left' }}>
            <div style={{ width: '100%', padding: '20px', boxShadow: '0px 0px 10px 0px #aaa', borderRadius: "20px" }}>
              <h2>Informações do usuário logado</h2>
              {
                userDetails.map((user)=> (
                  <div style={{ overflow: "hidden" }}>
                    <p><b>Id:</b> {user.id}</p>
                    <p><b>Nome:</b> {user.nome}</p>
                    <p><b>Email:</b> {user.email}</p>
                    <p><b>Telefone:</b> ({user.ddd}) {user.telefone}</p>
                    <p><b>Data de Criação:</b> {user.data_criacao}</p>
                    <p><b>Data de Atualização:</b> {user.data_atualizacao}</p>
                    <p><b>Último Login:</b> {user.ultimo_login}</p>
                    <p><b>Token:</b> {user.token}</p>
                    <p><b>Senha:</b> {user.senha}</p>
                  </div>
                ))
              }
            </div>
          </div>
        ) : null
      }
      
    </div>
  );
}

export default Login;