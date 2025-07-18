import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; // Hook para el contexto de autenticación
import { toast } from 'react-toastify'; // Para notificaciones
import styled from 'styled-components'; // Para estilos CSS-in-JS

const LoginFormContainer = styled.div`
  max-width: 400px;
  margin: 50px auto;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  background-color: #fff;
`;

const Title = styled.h2`
  text-align: center;
  color: #333;
  margin-bottom: 30px;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
  color: #555;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;
  &:focus {
    border-color: #007bff;
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
    outline: none;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #007bff; /* Color primario de Bootstrap */
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #0056b3;
  }
  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth(); // Obtiene la función de login del contexto
    const navigate = useNavigate(); // Hook para navegación programática

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulación de autenticación: usuario 'user', contraseña 'password'
        if (username === 'user' && password === 'password') {
            login({ username: 'user' }); // Llama a la función de login del contexto
            toast.success('¡Login exitoso!'); // Muestra notificación de éxito
            navigate('/'); // Redirige a la página principal
        } else {
            toast.error('Usuario o contraseña incorrectos.'); // Muestra notificación de error
        }
    };

    return (
        <LoginFormContainer>
            <Title>Iniciar Sesión</Title>
            <form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label htmlFor="username">Usuario:</Label>
                    <Input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Introduce tu usuario (ej. user)"
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="password">Contraseña:</Label>
                    <Input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Introduce tu contraseña (ej. password)"
                        required
                    />
                </FormGroup>
                <Button type="submit">Entrar</Button>
            </form>
        </LoginFormContainer>
    );
};

export default Login;