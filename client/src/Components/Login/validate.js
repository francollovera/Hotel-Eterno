const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const regexTelefono = /^\+\d{1,3}\s?\d{4,}$/;

function validate(form) {
    let errors = {
      nombre: "",
      correo: "",
      contraseña: "",
      telefono: "",
      count: 1
    };

    
    if (form.nombre.length < 6 || form.nombre.length > 50) errors.nombre = 'El nombre debe tener entre 6 y 50 caracteres';
    if(!regexCorreo.test(form.correo)) errors.correo = 'Ingrese un email válido';
    if (form.contraseña.length < 8 || form.contraseña.length > 200) errors.contraseña = 'La contraseña debe tener entre 8 y 200 caracteres';
    if (!regexTelefono.test(form.telefono))errors.telefono = 'Ingrese un número de celular válido';
    
    if (!errors.nombre && !errors.correo && !errors.constraseña && !errors.telefono) errors.count = 0;
    
    return errors;
  }
  
  export default validate;
  