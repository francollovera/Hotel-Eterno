// action.js
import axios from "axios";
export const SET_ORDER_BY_NAME = "SET_ORDER_BY_NAME";
export const SET_ORDER_BY_CAPACITY = "SET_ORDER_BY_CAPACITY";
export const SET_ORDER_BY_PRICE = "SET_ORDER_BY_PRICE";
export const GET_PAQUETES = "GET_PAQUETES";
export const GET_PAQUETES_DISPONIBLES = "GET_PAQUETES_DISPONIBLES";
export const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
export const GET_HABITACIONES = "GET_HABITACIONES";
export const GET_HABITACIONES_ADMIN = "GET_HABITACIONES_ADMIN";
export const SET_FILTERED_HABITACIONES = "SET_FILTERED_HABITACIONES";
export const SET_USUARIO = "SET_USUARIO";
export const DELETE_USUARIO = "DELETE_USUARIO";
export const ERROR = "ERROR";
export const GET_HABITACIONES_DISPONIBLES = "GET_HABITACIONES_DISPONIBLES";
export const SET_FILTERS = "SET_FILTERS";
export const SUGERENCIA_EMAIL = "SUGERENCIA_EMAIL";
export const ORDER_PAQUETES = "ORDER_PAQUETES";
export const GET_PAQUETES_BY_ID = "GET_PAQUETES_BY_ID";
export const CREATE_RESERVA = "CREATE_RESERVA";
export const GET_RESERVA_BY_USER = "GET_RESERVA_BY_USER";
export const SET_ADULTS = "SET_ADULTS";
export const SET_CHILDREN = "SET_CHILDREN";
export const SET_SELECTEDROOM = "SET_SELECTEDROOM";
export const SET_SELECTEDSERVICE = "SET_SELECTEDSERVICE";
export const SET_DATES = "SET_DATES";
export const SET_PRECIO = "SET_PRECIO";
export const SET_SELECTEDPAQUETE = "SET_SELECTEDPAQUETE";
export const FILTER_NAME_PAQUETE = "FILTER_NAME_PAQUETE";
export const FILTERS_NAME_PAQUETE = "FILTERS_NAME_PAQUETE";
export const FILTER_MIN_PRECIO_PAQUETE = "FILTER_MIN_PRECIO_PAQUETE";
export const FILTER_MAX_PRECIO_PAQUETE = "FILTER_MAX_PRECIO_PAQUETE";
export const GET_USUARIO_BY_CORREO = "GET_USUARIO_BY_CORREO";
export const DELETE_DETAIL_CAR = "DELETE_DETAIL_CAR";
export const CLEAR_ALL_CAR = "CLEAR_ALL_CAR";
export const ALL_RESENA = "ALL_RESENA";
export const DATA_USUARIO = "DATA_USUARIO";
export const RESENA_USUARIO = "RESENA_USUARIO";
export const POST_RESENA = "POST_RESENA";
export const DELETE_RESENA = "DELETE_RESENA";
export const USUARIO_RESERVACION = "USUARIO_RESERVACION";
export const GET_SERVICIOS = "GET_SERVICIOS";
export const GET_TIPOS = "GET_TIPOS";
export const GET_PAQUETES_ADMIN = "GET_PAQUETES_ADMIN";
export const ACTI_DESACTI_PAQUETE = "ACTI_DESACTI_PAQUETE";
export const FILTER_PAQUETES_ADMIN = "FILTER_PAQUETES_ADMIN";
export const DELETE_STATE_PERFIL = "DELETE_STATE_PERFIL";
export const GET_USUARIOS = "GET_USUARIOS";
export const GET_SERVICIOS_ADMIN = "GET_SERVICIOS_ADMIN";
export const GET_USUARIOS_ADMIN = "GET_USUARIOS_ADMIN";
export const GET_RESERVA = "GET_RESERVA";
export const DELETE_IMAGE_USER = "DELETE_IMAGE_USER";
export const GET_HABITACIONES_ID = "GET_HABITACIONES_ID";


export const setOrderByName = (orderType) => {
  return {
    type: SET_ORDER_BY_NAME,
    payload: orderType,
  };
};

export const setOrderByCapacity = (orderType) => {
  return {
    type: SET_ORDER_BY_CAPACITY,
    payload: orderType,
  };
};
// export const setOrderByPrice = (orderType) => {
//   return {
//     type: SET_ORDER_BY_PRICE,
//     payload: orderType
//   };
// };

export const getPaquetes = () => {
  return async function(dispatch) {
    console.log("entro a paquetes");
    const response = (await axios.get(`/paquete`)).data;
    return dispatch({
      type: GET_PAQUETES,
      payload: response,
    });
  };
};

export const getServicios = () => {
  return async function(dispatch) {
    console.log("entro a paquetes");
    const response = (await axios.get(`/servicio`)).data;
    return dispatch({
      type: GET_SERVICIOS,
      payload: response,
    });
  };
};
export const getServiciosAdmin = () => {
  return async function(dispatch) {
    try {
      const { data } = await axios.get("/servicio");
      return dispatch({
        type: GET_SERVICIOS_ADMIN,
        payload: data,
      });
    } catch (error) {
      return dispatch({
        type: ERROR,
        payload: error,
      });
    }
  };
};
export const getUsuarios = () => {
  return async function(dispatch) {
    console.log("entro a usuario");
    let { data } = await axios.get(`/infoUsuario`);
    data = data.filter((usuario) => usuario.activo);
    return dispatch({
      type: GET_USUARIOS,
      payload: data,
    });
  };
};
export const getUsuariosAdmin = () => {
  return async function(dispatch) {
    let { data } = await axios.get(`/usuarios/`);
    return dispatch({
      type: GET_USUARIOS_ADMIN,
      payload: data,
    });
  };
};
export function getPaquetesDisponibles(fechaInicio, fechaFin) {
  return async function(dispatch) {
    try {
      const response = (
        await axios.get(
          `/paquete/disponible?fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`
        )
      ).data;
      console.log(response);
      return dispatch({
        type: GET_PAQUETES_DISPONIBLES,
        payload: response,
      });
    } catch (error) {
      alert(error.message);
    }
  };
}

export function getPaqueteById(id) {
  return async function(dispatch) {
    console.log("entro a paquetes");
    const response = (await axios.get(`/paquete/` + id)).data;
    return dispatch({
      type: GET_PAQUETES_BY_ID,
      payload: response,
    });
  };
}
export const orderxPaquetes = (order) => {
  return { type: ORDER_PAQUETES, payload: order };
};
export const filterNamePaquete = (filter) => {
  return { type: FILTER_NAME_PAQUETE, payload: filter };
};
export const filtersNamePaquete = (filter) => {
  return { type: FILTERS_NAME_PAQUETE, payload: filter };
};
export const filterMinPrecioPaquete = (precio) => {
  return { type: FILTER_MIN_PRECIO_PAQUETE, payload: precio };
};
export const filterMaxPrecioPaquete = (precio) => {
  return { type: FILTER_MAX_PRECIO_PAQUETE, payload: precio };
};

export const createReserva = (reserva) => {
  let url = `/reservation`;
  const response = axios.post(url, reserva);

  return response;
};

export function getReservaByUsuario(usuario) {
  return async function(dispatch) {
    const response = (await axios.get(`/reservation/` + usuario)).data;
    return dispatch({
      type: GET_RESERVA_BY_USER,
      payload: response,
    });
  };
}

export function getUsuarioByCorreo(correo) {
  return async function(dispatch) {
    const response = (await axios.get(`/auth/correo/` + correo)).data;
    return dispatch({
      type: GET_USUARIO_BY_CORREO,
      payload: response,
    });
  };
}

export const BorrarDetailCarrito = (idDetail) => {
  return { type: DELETE_DETAIL_CAR, payload: idDetail };
};

export const ClearAllCarrito = (carrito) => {
  return { type: CLEAR_ALL_CAR, payload: carrito };
};

export const set_Currents_Page = (currentPage) => {
  return {
    type: SET_CURRENT_PAGE,
    payload: currentPage,
  };
};
export const getHabitaciones = () => {
  return async function(dispatch) {
    try {
      let { data } = await axios.get("/habitacion");
      data = data.filter((habitacion) => habitacion.activo);
      return dispatch({
        type: GET_HABITACIONES,
        payload: data,
      });
    } catch (error) {
      return dispatch({
        type: ERROR,
        payload: error,
      });
    }
  };
};

export const getHabitacionesAdmin = () => {
  return async function(dispatch) {
    try {
      const { data } = await axios.get("/habitacion");
      return dispatch({
        type: GET_HABITACIONES_ADMIN,
        payload: data,
      });
    } catch (error) {
      return dispatch({
        type: ERROR,
        payload: error,
      });
    }
  };
};

export const setFilteredHabitaciones = (array) => {
  return {
    type: SET_FILTERED_HABITACIONES,
    payload: array,
  };
};

export const setFilters = (key, value) => {
  return {
    type: SET_FILTERS,
    payload: [key, value],
  };
};

export const setUsuario = (correo) => {
  return { type: SET_USUARIO, payload: correo };
};

export const deleteUsuario = () => {
  return { type: DELETE_USUARIO };
};

export const getHabitacionesDisponibles = (fechaInicio, fechaFin) => {
  return async function(dispatch) {
    try {
      const { data } = await axios.get(
        `/habitacion/disponible?fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`
      );
      return dispatch({ type: GET_HABITACIONES_DISPONIBLES, payload: data });
    } catch (error) {
      alert(error.message);
    }
  };
};

export const sugerenciaCliente = (userData) => {
  return async (dispatch) => {
    try {
      const newSugerencia = await axios.post("/auth/notification", userData);
      console.log(userData);
      return dispatch({ type: SUGERENCIA_EMAIL, payload: newSugerencia.data });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const setAdultsA = (number) => {
  return { type: SET_ADULTS, payload: number };
};

export const setChildrenA = (number) => {
  return { type: SET_CHILDREN, payload: number };
};

export const setSelectedRoomA = (array) => {
  return { type: SET_SELECTEDROOM, payload: array };
};

export const setSelectedServiceA = (array) => {
  return { type: SET_SELECTEDSERVICE, payload: array };
};

export const setDatesA = (obj) => {
  return { type: SET_DATES, payload: obj };
};

export const setPrecioA = (number) => {
  return { type: SET_PRECIO, payload: number };
};

export const setSelectedPaqueteA = (array) => {
  return { type: SET_SELECTEDPAQUETE, payload: array };
};
export const getAllResena = () => {
  return async (dispatch) => {
    try {
      const getAll = await axios.get("/resena");

      return dispatch({ type: ALL_RESENA, payload: getAll.data });
    } catch (error) {
      console.log(error.message);
    }
  };
};
export const getUsuariobyEmail = (email) => {
  return async (dispatch) => {
    try {
      const getUsuario = await axios.get(`/infoUsuario/${email}`);

      return dispatch({ type: DATA_USUARIO, payload: getUsuario.data });
    } catch (error) {
      console.log(error.message);
    }
  };
};
export const getResenaUsuario = (email) => {
  return async (dispatch) => {
    try {
      const getUsuario = await axios.get(`/resena/${email}`);

      return dispatch({ type: RESENA_USUARIO, payload: getUsuario.data });
    } catch (error) {
      console.log(error.message);
    }
  };
};
export const postResena = (resena) => {
  return async (dispatch) => {
    try {
      const dataResena = await axios.post(`/resena`, resena);

      return dispatch({ type: POST_RESENA, payload: dataResena.data });
    } catch (error) {
      console.log(error.message);
    }
  };
};
export const deleteResena = (id) => {
  return async (dispatch) => {
    try {
      const dataDelete = await axios.delete(`/resena/${id}`);

      return dispatch({ type: DELETE_RESENA, payload: dataDelete.data });
    } catch (error) {
      console.log(error.message);
    }
  };
};
export const getReservationUsuario = (usuario) => {
  return async (dispatch) => {
    try {
      const dataReservation = await axios.get(`/reservation/${usuario}`);

      return dispatch({
        type: USUARIO_RESERVACION,
        payload: dataReservation.data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const getTipos = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get("/tipo");

      return dispatch({
        type: GET_TIPOS,
        payload: data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const getPaquetesAdmin = () => {
  return async function(dispatch) {
    const response = (await axios.get(`/paquete/admin`)).data;
    return dispatch({
      type: GET_PAQUETES_ADMIN,
      payload: response,
    });
  };
};

export const actiDesactiPaquete = (paquete) => {
  let url = `http://localhost:3001/paquete/admin`;
  const response = axios.post(url, paquete);
  return response;
};

export const crearPaquete = (paquete) => {
  let url = `http://localhost:3001/paquete/admin/paquete`;
  const response = axios.post(url, paquete);
  return response;
};

export const deletePaquete = (id) => {
  let url = `http://localhost:3001/paquete/${id}`;
  const response = axios.delete(url);
  return response;
};

export const ActualizaPaquete = (paqueteMod) => {
  let url = `/paquete/${paqueteMod._id}`;
  const response = axios.put(url, paqueteMod);
  return response;
};

export const filterPaquetesAdmin = (filter) => {
  return { type: FILTER_PAQUETES_ADMIN, payload: filter };
};

export const deleteStateResenaAndUserArr = () => {
  return { type: DELETE_STATE_PERFIL };
};


export const getReserva = () => {
  return async (dispatch) => {
    try {
      const {data} = await axios.get('/reservation');

      return dispatch({
        type: GET_RESERVA,
        payload: data
      });
    } catch (error) {
      console.log(error.message);
    }
  }
};
export const deleteImageUser = (id) => {
  return async (dispatch) => {
    try {
      await axios.delete(`/infoUsuario/${id}`,);
      return dispatch({ type: DELETE_IMAGE_USER });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const habitacionById = (id) => {
  return async function (dispatch) {
    try {
      const {data} = await axios.get(
        `/habitacion/numero/${id}`
      );
      
      return dispatch({
        type: GET_HABITACIONES_ID,
        payload: data,
      });
    } catch (error) {
      return dispatch({
        type: ERROR,
        payload: error,
      });
    }
  };
};

