import React, { useState } from 'react';
import style from './Preguntas.module.css';
import Accordion from 'react-bootstrap/Accordion';


function PreguntasFrecuentes() {
  const preguntas = [
    {
        pregunta: '¿Cuál es la la mejor epoca para visitarnos?',
        respuesta:
          'Cualquier época del año es ideal para visitar y disfrutar nuestras termas.'
      },
      {
        pregunta: '¿Como son las Habitaciones?',
        respuesta:
          'Todas las habitaciones y cabañas son amplias y con vistas exceletes hasta para 7 personas'
      },
      {
        pregunta: '¿Que clase de desayuno se sirve en el hotel?',
        respuesta:
          'En nuestro hotel, podrás disfrutar desayunos de tipo buffet y continental.'
      },
      {
        pregunta: '¿El hotel cuenta con estacionamiento?',
        respuesta:
          'El hotel efectivamente cuenta con estacionamiento exterior para todos sus huéspedes.'
      },
      {
        pregunta: '¿Cuentan con cunas para bebé?',
        respuesta:
          'Sí. Contamos con cunas para bebés en nuestro hotel.'
      },
      {
      pregunta: '¿Cuál es la política de cancelación?',
      respuesta:
        'Nuestra política de cancelación permite cancelar sin cargo hasta 48 horas antes.'
    },
    {
      pregunta: '¿Se permiten mascotas en las instalaciones?',
      respuesta: 'Lamentablemente no permitimos mascotas en nuestras instalaciones.'
    },
    {
      pregunta: '¿Cuáles son los horarios de check-in y check-out?',
      respuesta:
        'El horario de check-in es a partir de las 15:00 horas y el horario de check-out es hasta las 12:00 horas.'
    },
    // Agrega más preguntas y respuestas según tus necesidades
  ];

  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    if (activeIndex === index) {
      setActiveIndex(null);
    } else {
      setActiveIndex(index);
    }
  };

  return (
    <div className={style.container}>
      <h2 className={style.title}>Preguntas Frecuentes</h2>
      
      <Accordion>
        {preguntas.map((pregunta, index) => (
          <Accordion.Item className={style.acordeon} key={index} eventKey={index.toString()}>
            <Accordion.Header className={style.pregunta} onClick={() => toggleAccordion(index)}>
              {pregunta.pregunta}
              
            </Accordion.Header>
            <Accordion.Body>
              <p className={`${style.respuesta} ${style.overflow}`}>{pregunta.respuesta}</p>
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  );
}

export default PreguntasFrecuentes;
