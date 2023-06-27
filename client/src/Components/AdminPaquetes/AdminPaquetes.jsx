import React, { useState, useEffect } from 'react';
import style from "./AdminPaquetes.module.css";
import NavBar from '../NavBar/NavBar';
import FooterBar from '../FooterBar/FooterBar';
import { useNavigate } from 'react-router-dom';
//import Table from 'react-bootstrap/Table';
import { useDispatch, useSelector } from 'react-redux';
import { getPaquetesAdmin, actiDesactiPaquete, getHabitaciones, getServicios,crearPaquete,deletePaquete,ActualizaPaquete,filterPaquetesAdmin } from '../redux/action';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit, faSquareCheck, faSquare } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";

import {
  Table,
  Button,
  Container,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  ModalFooter
} from "reactstrap";



const AdminPaquetes = () => {
  let data = useSelector((state) => state.allpaquetesAdm);  
  data = useSelector((state) => state.filterPaquetesAdmin);    
  let habitaciones = useSelector((state) => state.gethabitaciones);
  let servicios = useSelector((state) => state.allservicios);
  let allHabitacionesSelect=[];
  let allServiciosSelect=[];
  let allImageSelect=[];
  let paqueteMod=[];
  const [modalInsertar, setState] = useState(false);
  const [modalActualizar, setStateUpdate] = useState(false);
  const [nombre, setValueNombre] = useState("");
  const [desc, setValueDesPaquete] = useState("");
  const [costo, setValueCostoPaquete] = useState("");
  let checkedHabitItems=[];
  let checkedServiItems=[];
  const [checkedHabitacionesItems, setCheckedHabItems] = useState([]);
  const [checkedServicioItems, setCheckedServItems] = useState([]);
  //const location = useLocation();
  const navigate=useNavigate()

  const [inputs, setInputs] = useState({
    nombre: "",
    desc: "",
    costo: 0,
    habitacion:[],
    servicio:[],
    url_imagen:[],
  });
  const [errors, setErrors] = useState({
    nombre: "",
    desc: "",
    costo: 0,
    habitacion:[],
    servicio:[],
    url_imagen:[],
  });
  const handleSearch =(event)=>{
    event.preventDefault();
    console.log("handleFilterNames-name");
    var filtro={
      nombre:nombre,
      desc:desc,
      costo:costo
    }
    dispatch(filterPaquetesAdmin(filtro));
  }
  function validate(inputs) {
    const errors = {};
    if (!inputs.nombre) {
      errors.nombre = "Ingrese Nombre de paquete";
    } else if (!inputs.desc) {
      errors.desc = "Ingrese la descripción del paquete";
    } else if (!inputs.costo) {
      errors.costo = "Ingrese el costo del paquete";    
    }else if (!inputs.url_imagen) {
      errors.url_imagen = "Ingrese la URL de la imagen";
    }
    return errors;
  }
  
  function handleChange(e) {
      setInputs({
        ...inputs,
        [e.target.name]: e.target.value,
      
      });
      
      setErrors(
        validate({
          ...inputs,
          [e.target.name]: e.target.value,         
        })
      );    
  }
  const handleChangeBox = (e) => {  
    let id= "";
    id= e.target.value;
    if(e.target.name==="habitaciones"){        
      setCheckedHabItems((checkedHabitacionesItems) => {
        return checkedHabitacionesItems.includes(id)
          ? checkedHabitacionesItems.filter((item) => item !== id)
          : [...checkedHabitacionesItems, id];
      });
    }else if(e.target.name==="servicios"){        
      setCheckedServItems((checkedServicioItems) => {
        return checkedServicioItems.includes(id)
          ? checkedServicioItems.filter((item) => item !== id)
          : [...checkedServicioItems, id];
      });
    }  
  };

  const [paqueteEditado, setPaqueteEditado] = useState({
    _id: "",
    nombre: "",
    desc: "",
    costo: 0,
  });
  

  const AddSelectHabitaciones = (event) => {  
    const isChecked = event.target.checked;
    let Value ="";
    Value = event.target.value;
    if(isChecked){
      allHabitacionesSelect.push(Value);
      if(modalActualizar===true){      
        setPaqueteEditado({
          ...paqueteEditado,
          arrIdHabitaciones: allHabitacionesSelect,
        })     
      }
      else{        
        inputs.habitacion=allHabitacionesSelect;   
      }
    }else{ 
      allHabitacionesSelect=allHabitacionesSelect.filter((g) => g !== Value); 
      
      if(modalActualizar===true){        
        setPaqueteEditado({
          ...paqueteEditado,
          arrIdHabitaciones: allHabitacionesSelect,
        })
      }
      else{        
        inputs.habitacion=allHabitacionesSelect;
      } 
    }
}

const AddSelectServicios = (event) => {   
  const isChecked = event.target.checked;
  let Value ="";
  Value = event.target.value;
  if(isChecked){        
    allServiciosSelect.push(Value);
    
    if(modalActualizar===true){
      setPaqueteEditado({
        ...paqueteEditado,
        arrIdServicios: allServiciosSelect,
      })
    }else{
      inputs.servicio=allServiciosSelect;
      setInputs({
        ...inputs,
        [event.target.name]: event.target.value,
      
      });
      
      setErrors(
        validate({
          ...inputs,
          [event.target.name]: event.target.value,         
        })
      );
    }

  }else{    
    allServiciosSelect=allServiciosSelect.filter((g) => g !== Value);    
    if(modalActualizar===true){
      setPaqueteEditado({
        ...paqueteEditado,
        arrIdServicios: allServiciosSelect,
      })
    }else{
      inputs.servicio=allServiciosSelect;
      setInputs({
        ...inputs,
        [event.target.name]: event.target.value,
       
      });
      
      setErrors(
        validate({
          ...inputs,
          [event.target.name]: event.target.value,         
        })
      );
    }
  }
}
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPaquetesAdmin());
  }, [dispatch])

  
  useEffect(() => {
    dispatch(getHabitaciones());
  }, [dispatch])

  useEffect(() => {
    dispatch(getServicios());
  }, [dispatch])

  const mostrarModalInsertar = () => {
    setState(true);
  };

  const handlekeyDown = (event) => {
   
    if (event.key !== "Backspace") {
      inputs.url_imagen=[];
      let Value="";
      Value = event.target.value;
      allImageSelect = []; 
      allImageSelect.push(Value.toString());      
      if(modalActualizar===true){
        setPaqueteEditado({
          ...paqueteEditado,
          image: allImageSelect,
        })
      }else{
        inputs.url_imagen=allImageSelect; 
      }
    }
   
  };
  const handleBlur = (event) => {  
    if (event.key !== "Backspace") {
      inputs.url_imagen=[];
      let Value="";
      Value = event.target.value;     
      allImageSelect = []; 
      allImageSelect.push(Value.toString());     
      if(modalActualizar===true){
        setPaqueteEditado({
          ...paqueteEditado,
          image: allImageSelect,
        })
      }else{
        inputs.url_imagen=allImageSelect; 
      }          
    }
   
  };
  const cerrarModalInsertar = () => {
    setState(false);
    setInputs({
      nombre: "",
      desc: "",
      costo: 0,
      habitacion:[],
      servicio:[],
      url_imagen:[],
    });
    setErrors({
      nombre: "",
      desc: "",
      costo: 0,
      habitacion:[],
      servicio:[],
      url_imagen:[],
    });    
    allServiciosSelect=[];
    allHabitacionesSelect=[];    
  };

  const cerrarModalActualizar = () => {
    setStateUpdate(false);
    allServiciosSelect=[];
    allHabitacionesSelect=[]; 
    setCheckedHabItems([]); 
    setCheckedServItems([]); 
    checkedHabitItems=[];
    checkedServiItems=[];   
    setPaqueteEditado([]);      
  };

  const editar = () => {     
    paqueteEditado.arrIdHabitaciones=checkedHabitacionesItems;
    paqueteEditado.arrIdServicios=checkedServicioItems;
    if (paqueteEditado.nombre.length===0) {
      Swal.fire({
        icon: "warning",
        title: "Validación de Datos",
        text: "Ingrese nombre del paquete",
      });
     }else if (paqueteEditado.desc.length===0) {
      Swal.fire({
        icon: "warning",
        title: "Validación de Datos",
        text: "Ingrese descripción del paquete",
      });
     }else if (paqueteEditado.costo.length===0) {
      Swal.fire({
        icon: "warning",
        title: "Validación de Datos",
        text: "Ingrese costo del paquete",
      });
     }else if (paqueteEditado.arrIdHabitaciones.length===0) {
      Swal.fire({
        icon: "warning",
        title: "Validación de Datos",
        text: "Seleccione al menos una habitación",
      });
     } else if (paqueteEditado.arrIdServicios.length===0) {
      Swal.fire({
        icon: "warning",
        title: "Validación de Datos",
        text: "Seleccione al menos un servicio",
      });
     }else if (paqueteEditado.image.length===0) {
      Swal.fire({
        icon: "warning",
        title: "Validación de Datos",
        text: "Ingrese una url para la imagen del paquete",
      });
     }else{ 
    let resp="";
    ActualizaPaquete(paqueteEditado).then((response) => {                            
        for( var message in response.data){                  
          for(let r of response.data[message]){                    
            resp+=r;
          }
        }   
        Swal.fire({
          icon: "success",
          title: "Actualización de Paquete",
          text: resp,
        });
        setCheckedHabItems([]); 
        setCheckedServItems([]); 
        checkedHabitItems=[];
        checkedServiItems=[];   
        paqueteMod=[];
        setPaqueteEditado({
          nombre: "",
          desc: "",
          costo: 0,
          arrIdHabitaciones:[],
          arrIdServicios:[],
          image:[],
        });
        dispatch(getPaquetesAdmin());  
      }); 
      setStateUpdate(false);
    }
    navigate("/AdminPaquetes")
  };

  const handleEdit = (PaqueteId) => {
    setCheckedHabItems([]);
    setCheckedServItems([]);
    setPaqueteEditado({
      nombre: "",
      desc: "",
      costo: 0,
      arrIdHabitaciones:[],
      arrIdServicios:[],
      image:[],
    });
    paqueteMod = data.find((pq) => pq._id === PaqueteId);   
    setPaqueteEditado(paqueteMod);   
    if(paqueteMod.arrIdHabitaciones.length>0){
      for(let h of paqueteMod.arrIdHabitaciones){       
          checkedHabitItems.push(h);    
          setCheckedHabItems(checkedHabitItems);
      }
    }
    if(paqueteMod.arrIdServicios.length>0){
      for(let s of paqueteMod.arrIdServicios){        
        checkedServiItems.push(s);      
        setCheckedServItems(checkedServiItems);
      }
    }
    setStateUpdate(true);
  };

  const handleDelete = (PaqueteId) => {
    const paqueteElimina = data.find((pq) => pq._id === PaqueteId);
    Swal.fire({
      title: "¿Estás seguro?",
      text:"Estás por eliminar este paquete",
      type: "warning",
      showCancelButton: true,
      cancelButtonText: "No",
      confirmButtonColor: "#78331a",
      confirmButtonText: "Si",
      closeOnConfirm: false
    }).then((isConfirm) => {
      if (isConfirm.isConfirmed) {
        var resp = "";
        deletePaquete(paqueteElimina._id).then((response) => {
          for (var message in response.data) {
            for (let msj of response.data[message]) {
              resp += msj;
            }
          }
          Swal.fire({
            icon: "success",
            title: "Eliminación de Paquete",
            text: resp,
          });
          dispatch(getPaquetesAdmin());
        });


      } else {
        Swal.fire({
          icon: "warning",
          title: "Eliminación de Paquete",
          text: "No se eliminó el paquete",
        });
      }
    });
   
  };


  const insertar = () => {    
   if (inputs.habitacion.length===0) {
    Swal.fire({
      icon: "warning",
      title: "Validación de Datos",
      text: "Seleccione al menos una habitación",
    });
   } else if (inputs.servicio.length===0) {
    Swal.fire({
      icon: "warning",
      title: "Validación de Datos",
      text: "Seleccione al menos un servicio",
    });
   }else if (inputs.url_imagen.length===0) {
    Swal.fire({
      icon: "warning",
      title: "Validación de Datos",
      text: "Ingrese una url para la imagen del paquete",
    });
   }else{  
     
   let resp="";
      crearPaquete(inputs).then((response) => {                            
        for( var message in response.data){                  
          for(let r of response.data[message]){                    
            resp+=r;
          }
        }               
            
        Swal.fire({
          icon: "success",
          title: "Registro de Paquete",
          text: resp,
        });
        dispatch(getPaquetesAdmin());
        setState(false);
      });
    }
  };
  

  const handleActDesactPaq = (PaqueteId, activo) => {
    const paqueteActDesac = data.find((pq) => pq._id === PaqueteId);
    if (activo === true)
      paqueteActDesac.activo = false;
    else
      paqueteActDesac.activo = true;
    Swal.fire({
      title: "¿Estás seguro?",
      text: activo === true ? "Estás por desactivar este paquete" : "Estás por activar este paquete",
      type: "warning",
      showCancelButton: true,
      cancelButtonText: "No",
      confirmButtonColor: "#78331a",
      confirmButtonText: "Si",
      closeOnConfirm: false
    }).then((isConfirm) => {
      if (isConfirm.isConfirmed) {
        var resp = "";
        actiDesactiPaquete(paqueteActDesac).then((response) => {
          for (var message in response.data) {
            for (let msj of response.data[message]) {
              resp += msj;
            }
          }
          Swal.fire({
            icon: "success",
            title: activo === true ? "Desactivación de Paquete" : "Activación de Paquete",
            text: resp,
          });
          dispatch(getPaquetesAdmin());
        });


      } else {
        Swal.fire({
          icon: "warning",
          title: activo === true ? "Desactivación de Paquete" : "Activación de Paquete",
          text: activo === true ? "No se desactivó el paquete" : "No se activó el paquete",
        });
      }
    });
  }
  return (
    <div>
      <NavBar />
      <center><h2>Lista de paquetes</h2>  </center>
      <br />
      <div className="d-flex align-items-start bg-light mb-12" style={{ height: "30px" }}>

        <div className='col-1'>
          <label>Nombre:</label>
        </div>
        <div className='col-2'>
          <input type="text"   
              onChange={(e) =>               
                setValueNombre(e.target.value)
              } 
          />
        </div>
        <div className='col-1'>
          <label>Descripción:</label>
        </div>
        <div className='col-2'>
          <input type="text" 
              onChange={(e) =>               
                setValueDesPaquete(e.target.value)
              } />
        </div>
        <div className='col-1'>
          <label>Costo:</label>
        </div>
        <div className='col-1'>
          <input type="number" 
            onChange={(e) =>               
              setValueCostoPaquete(e.target.value)
            }
          />
        </div>
        <div className='col-2'>

        </div>
        <div className='col-1'>
          <button className={style.boton} onClick={handleSearch}>Buscar</button>          
        </div>
        <div className='col-1'>
          <button className={style.boton} onClick={mostrarModalInsertar}>Nuevo Paquete</button>
        </div>
      </div>
      <br />
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Costo</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {data.map((row, idx) => {         
            return (
              <tr key={idx}>
                <td>{idx + 1}</td>
                <td>{row.nombre}</td>
                <td className="expand">{row.desc}</td>
                <td>{row.costo}</td>
                <td>{row.activo === true ? 'Activo' : 'Desactivo'}</td>
                <td className={style.fit}>
                  <span className={style.actions}>
                    <FontAwesomeIcon className={style.delete_btn}
                      onClick={() => handleActDesactPaq(row._id, row.activo)}
                      icon={row.activo === true ? faSquareCheck : faSquare} />
                    <FontAwesomeIcon className={style.edit_btn}                      
                      onClick={() => handleEdit(row._id)}
                      icon={faEdit} />
                    <FontAwesomeIcon className={style.edit_btn}                      
                      onClick={() => handleDelete(row._id)}
                      icon={faTrash} />                      
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <Modal isOpen={modalActualizar}>
        <ModalHeader>
          <div><h3>Editar Paquete</h3></div>
        </ModalHeader>

        <ModalBody>         
          <FormGroup>
            <label>
              Nombre:
            </label>
            <input
              className="form-control"
              name="nombre"
              type="text"              
              onChange={(e) =>
                setPaqueteEditado({
                  ...paqueteEditado,
                  nombre: e.target.value,
                })
              }
              value={paqueteEditado.nombre}
            />
            
          </FormGroup>
          <FormGroup>
            <label>
              Descripción:
            </label>
            <textarea
              className="form-control"
              name="desc"
              type="text"
              rows={6}
              onChange={(e) =>
                setPaqueteEditado({
                  ...paqueteEditado,
                  desc: e.target.value,
                })
              }
              value={paqueteEditado.desc}
            />            
          </FormGroup>
          <FormGroup>
            <label>
              Costo:
            </label>
            <input
              className="form-control"
              name="costo"
              type="number"              
              onChange={(e) =>
                setPaqueteEditado({
                  ...paqueteEditado,
                  costo: e.target.value,
                })
              }
              value={paqueteEditado.costo}
            />             
          </FormGroup>
          <FormGroup>
          <label>
              Elige Habitaciones:
          </label>          
          <div>
          {
            // habitaciones?.map((hab)=>(
            //   <div>                 
            //     <input  type="checkbox"
            //      checked={checked}
            //      onChange={handleCheckboxChange}
            //     class="habitaciones" onClick={(event) => AddSelectHabitaciones(event)} value={hab._id}/>                  
            //     <label  key={hab.nombre} htmlFor={hab.nombre}>{hab.nombre}</label>
            //   </div>      
            // ))
            habitaciones?.map((hab)=>(      
              <div>                 
                <input  type="checkbox"
                  // checked={h===hab._id?checked:false}
                  // checked={checked}
                  // onChange={handleCheckboxChange}   
                  checked={checkedHabitacionesItems.includes(hab._id)}
                  onChange={handleChangeBox}               
                  name="habitaciones" 
                  onClick={(event) => AddSelectHabitaciones(event)} 
                  value={hab._id}
                  />                  
                <label  key={hab.nombre} htmlFor={hab.nombre}>{hab.nombre}</label>
              </div>     
            ))
          }
          </div> 
          </FormGroup>
          <FormGroup>
          <label>
              Elige Servicios:
          </label>        
          <div>

          {
              servicios?.map((serv)=>(
                <div>                      
                  <input  type="checkbox" name="servicios" 
                   checked={checkedServicioItems.includes(serv._id)}
                   onChange={handleChangeBox}
                   onClick={(event) => AddSelectServicios(event)} 
                  value={serv._id}/>                           
                  <label  key={serv.nombre} htmlFor={serv.nombre}>{serv.nombre}</label>
                </div>      
              ))
          }
          </div>  
          <p className={style.danger}>{errors.servicio}</p>  
          </FormGroup>
          
          <FormGroup>
            <label>
              URL-Imagen:
            </label>
            <input
              className="form-control"              
              type="text"
              onKeyDown={handlekeyDown}             
              onBlur={handleBlur} 
              value={paqueteEditado.image} 
              onChange={(e) =>
                setPaqueteEditado({
                  ...paqueteEditado,
                  image: e.target.value,
                })
              }
            />            
          </FormGroup>
        </ModalBody>

        <ModalFooter>
          <Button
            className={style.boton}
            onClick={() => editar(paqueteEditado)}
          >
            Save
          </Button>
          <Button
            className={style.boton}
            onClick={() => cerrarModalActualizar()}
          >
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>
      <Modal isOpen={modalInsertar}>
        <ModalHeader>
          <div><h3>Registrar Paquete</h3></div>
        </ModalHeader>
        <ModalBody>
          <FormGroup>
            <label>
              Nombre:
            </label>
            <input
              className="form-control"
              name="nombre"
              id="nombre"
              type="text"
              onChange={handleChange}             
            />
            <p className={style.danger}>{errors.nombre}</p>  
          </FormGroup>
          <FormGroup>
            <label>
              Descripción:
            </label>
            <textarea
              className="form-control"
              name="desc"
              id="desc"
              type="text"  
              rows={6}          
              onChange={handleChange}
            />
          <p className={style.danger}>{errors.desc}</p>  
          </FormGroup>
          <FormGroup>
            <label>
              Costo:
            </label>
            <input
              className="form-control"
              name="costo"
              id="costo"              
              type="number"              
              onChange={handleChange}            
            />
             <p className={style.danger}>{errors.costo}</p> 
          </FormGroup>     

          <FormGroup>
          <label>
              Elige Habitaciones:
            </label>          
          <div>
          {
            habitaciones?.map((hab)=>(
              <div>
                <input type="checkbox" onClick={(event) => AddSelectHabitaciones(event)} value={hab._id}/>                  
                <label  key={hab.nombre} htmlFor={hab.nombre}>{hab.nombre}</label>
              </div>      
            ))
          }
          </div>  
          <p className={style.danger}>{errors.habitacion}</p>   
          </FormGroup>

          <FormGroup>
          <label>
              Elige Servicios:
            </label>
          
          <div>
            {
                servicios?.map((serv)=>(
                      <div>                       
                        <input  type="checkbox" onClick={(event) => AddSelectServicios(event)} value={serv._id}/>                  
                        <label  key={serv.nombre} htmlFor={serv.nombre}>{serv.nombre}</label>
                      </div>      
                ))
            }
        </div>  
        {/* <p className={style.danger}>{errors.servicio}</p>   */}
          </FormGroup>          
          <FormGroup>
            <label>
              URL-Imagen:
            </label>
            <input
              className="form-control"              
              type="text"
              onKeyDown={handlekeyDown}             
              onBlur={handleBlur}  
            />
            <p className={style.danger}>{errors.url_imagen}</p> 
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button
            className={style.boton}
            onClick={() => insertar()}
          >
            Save
          </Button>
          <Button
            className={style.boton}
            onClick={() => cerrarModalInsertar()}
          >
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <FooterBar />
    </div>
  
  );
}
export default AdminPaquetes;