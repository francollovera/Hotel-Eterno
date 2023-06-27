const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(form) {
    let errors = {
      correo: "",
      contraseña: "",
      count: 1
    };

    
    if (!regexCorreo.test(form.correo)) errors.correo = 'Ingrese un email válido';
    if (form.contraseña.length < 8 || form.contraseña.length > 200) errors.contraseña = 'La contraseña debe tener entre 8 y 200 caracteres';
    
    if (!errors.correo && !errors.constraseña) errors.count = 0;
    
    return errors;
  }
  
  export default validate;
  