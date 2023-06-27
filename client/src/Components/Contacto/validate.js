const validate = (object) => {
    let error = {};
    
    if (!object.name) { error.name = "El nombre es obligatorio";
    } else if (object.name.length <= 2) {
        error.name = "El nombre debe tener por lo menos 3 caracteres";
    } else if (!/^([^0-9]*)$/.test(object.name)) {
        error.name = "El nombre no puede contener números"; };
        
    if (!object.email) {
        error.email = "El correo electrónico es obligatorio";
      } else if (!/\S+@\S+\.\S+/.test(object.email)) {
        error.email = "El correo electrónico no es válido"; }

    if (!object.phone) { error.phone = "El número de teléfono es obligatorio";
          } else if (!/^[0-9()+\-./\s]+$/.test(object.phone)) {
            error.phone = "El número de teléfono no es válido"; }
        
    if(object.description.length < 15) {error.description = "Descripcion debe tener al menos 15 caracteres"};
    if(!object.subject) {error.subject = "Al menos debe tener !Asunto!"}

    return error;
};
export default validate;