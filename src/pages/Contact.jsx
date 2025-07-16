import '../styles/Contact.css';
import { useState } from 'react';

export default function Contacto() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  return (
    <div className="container mt-5">
      <div className="container">
        <h1 className="text-center mb-5">Contacto</h1>
        <form
          id="fs-frm"
          name="simple-contact-form"
          acceptCharset="utf-8"
          action="https://formspree.io/f/xwpklyrw"
          method="POST"
        >
          <fieldset id="fs-frm-inputs">
            <label htmlFor="full-name">Nombre y Apellido</label>
            <input
              type="text"
              name="name"
              id="full-name"
              placeholder="Nombre y Apellido"
              value={formData.name}
              required
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />

            <label htmlFor="email-address">Correo Electrónico</label>
            <input
              type="email"
              name="_replyto"
              id="email-address"
              placeholder="email@dominio.com"
              value={formData.email}
              required
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />

            <label htmlFor="message">Mensaje</label>
            <textarea
              rows="5"
              name="message"
              id="message"
              placeholder="Escriba aquí su mensaje y/o consulta."
              value={formData.message}
              required
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            ></textarea>

            <input type="hidden" name="_subject" id="email-subject" value="Consulta desde Gioielli" />
          </fieldset>
          <input type="submit" value="Enviar" className="btn btn-dark" />
        </form>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
      </div>

    </div>

  );
}
