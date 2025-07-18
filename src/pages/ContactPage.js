import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaPaperPlane } from 'react-icons/fa'; // Iconos para contacto

// --- Styled Components para la página de Contacto ---
const ContactContainer = styled.div`
  padding: 40px 0;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  max-width: 800px;
  margin: 30px auto;
  text-align: center;
`;

const PageTitle = styled.h1`
  font-size: 2.8rem;
  color: #333;
  margin-bottom: 40px;
  position: relative;
  padding-bottom: 10px;

  &::after {
    content: '';
    display: block;
    width: 80px;
    height: 4px;
    background-color: #007bff;
    margin: 15px auto 0;
    border-radius: 2px;
  }
`;

const ContactInfo = styled.div`
  display: flex;
  justify-content: center;
  gap: 30px;
  margin-bottom: 50px;
  flex-wrap: wrap; /* Permite que los elementos se envuelvan en pantallas pequeñas */

  div {
    display: flex;
    align-items: center;
    font-size: 1.1rem;
    color: #555;

    svg {
      margin-right: 10px;
      color: #007bff;
      font-size: 1.5rem;
    }
  }
`;

const FormSection = styled.div`
  padding: 0 20px;
  text-align: left; /* Alinea el formulario a la izquierda */
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 600px;
  margin: 0 auto; /* Centra el formulario */
`;

const FormGroup = styled.div`
  margin-bottom: 15px;

  label {
    display: block;
    margin-bottom: 8px;
    font-weight: bold;
    color: #333;
  }

  input[type="text"],
  input[type="email"],
  textarea {
    width: 100%;
    padding: 12px;
    border: 1px solid #ced4da;
    border-radius: 6px;
    font-size: 1rem;
    &:focus {
      border-color: #007bff;
      box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
      outline: none;
    }
  }

  textarea {
    resize: vertical; /* Permite redimensionar verticalmente */
    min-height: 120px;
  }
`;

const SubmitButton = styled.button`
  background-color: #28a745; /* Color verde de éxito */
  color: white;
  padding: 12px 25px;
  border: none;
  border-radius: 6px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: fit-content; /* Se ajusta al contenido */
  margin: 0 auto; /* Centra el botón */

  &:hover {
    background-color: #218838; /* Verde más oscuro al pasar el ratón */
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;
// --- Fin de Styled Components ---

const ContactPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Aquí simularías el envío del formulario a un backend (API, email service, etc.)
        // Por ahora, solo mostraremos una notificación y limpiaremos el formulario
        console.log('Formulario enviado:', formData);

        setTimeout(() => {
            toast.success('¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.');
            setFormData({
                name: '',
                email: '',
                message: '',
            });
            setIsSubmitting(false);
        }, 1500); // Simula un retraso de 1.5 segundos para el envío
    };

    return (
        <ContactContainer>
            <Helmet>
                <title>Contacto | Gioielli 2025</title>
                <meta name="description" content="Contáctanos en Gioielli 2025 para cualquier consulta, sugerencia o pedido especial. Estamos aquí para ayudarte." />
                <meta name="keywords" content="contacto, formulario de contacto, soporte, atención al cliente, email, teléfono, dirección, joyería, Gioielli 2025" />
            </Helmet>

            <PageTitle>Contáctanos</PageTitle>

            <ContactInfo>
                <div>
                    <FaEnvelope /> info@gioielli2025.com
                </div>
                <div>
                    <FaPhone /> +34 123 456 789 (Simulado)
                </div>
                <div>
                    <FaMapMarkerAlt /> Escobar, Bs. As., Argentina
                </div>
            </ContactInfo>

            <FormSection>
                <h3>Envíanos un Mensaje</h3>
                <Form onSubmit={handleSubmit}>
                    <FormGroup>
                        <label htmlFor="name">Nombre:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </FormGroup>
                    <FormGroup>
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </FormGroup>
                    <FormGroup>
                        <label htmlFor="message">Mensaje:</label>
                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                        ></textarea>
                    </FormGroup>
                    <SubmitButton type="submit" disabled={isSubmitting}>
                        {isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
                        <FaPaperPlane />
                    </SubmitButton>
                </Form>
            </FormSection>
        </ContactContainer>
    );
};

export default ContactPage;