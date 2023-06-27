const regexTelefono = /^\+\d{1,3}\s?\d{4,}$/;

export const validate = (object) => {
    let error = {};
    if(object.descripcion.length < 15) {error.descripcion = "Descripcion debe tener al menos 15 caracteres"};
    if (isNaN(object.puntuacion)) { error.puntuacion = "La puntuación debe ser un número."};
    if (object.puntuacion > 5 || object.puntuacion <= 0) { error.puntuacion = "La puntuación debe estar entre 1 y 5."}

    return error;
};
export const validate2 = (object) => {
    let error2 = {};
  
    if (!object.nombre) {
      error2.nombre = "El nombre es requerido";
    } else {
      if (object.nombre.length > 15) {
        error2.nombre = "El nombre no debe tener más de 15 caracteres";
      }
      if (object.nombre.length < 5) {
        error2.nombre = "El nombre debe tener al menos 5 caracteres";
      }
    }
  
    if (!object.phone) {
      error2.phone = "El número de teléfono es requerido";
    } else {
      if (!regexTelefono.test(object.phone)) {
        error2.phone = "El número de teléfono no es válido";
      }
    }
  
    return error2;
  };
  
  