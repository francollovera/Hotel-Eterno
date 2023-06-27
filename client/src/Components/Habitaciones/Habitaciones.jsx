import React from "react";
import { Link } from "react-router-dom";
import style from "./Habitaciones.module.css";
import imagen from './habitacion.jpg';


import { connect } from 'react-redux';
import { setOrderByName, setOrderByCapacity, getHabitaciones, setFilteredHabitaciones, setFilters } from '../redux/action';

const mapStateToProps = (state) => {
  return {
    orderByName: state.orderByName,
    orderByCapacity: state.orderByCapacity,
    habitaciones: state.gethabitaciones,
    filters: state.filters
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getHabitaciones: () => dispatch(getHabitaciones()),
    setOrderByName: (orderType) => dispatch(setOrderByName(orderType)),
    setOrderByCapacity: (orderType) => dispatch(setOrderByCapacity(orderType)),
    setFilteredHabitaciones: (array) => dispatch(setFilteredHabitaciones(array)),
    setFilters: (key,value) => dispatch(setFilters(key,value))
  };
};

class Habitaciones extends React.Component {
  constructor(props) {
    super(props);
  }

  handleFiltersChange = (event) => {
    this.props.setFilters(event.target.name, event.target.value );
  };

  componentDidMount() {
    this.props.getHabitaciones();
  };

  render() {
    let habitacionesFiltradas = this.props.habitaciones.slice();
    
    if (this.props.orderByName === 'asc') {
      habitacionesFiltradas.sort((a, b) => a.nombre.localeCompare(b.nombre));
    } else if (this.props.orderByName === 'desc') {
      habitacionesFiltradas.sort((a, b) => b.nombre.localeCompare(a.nombre));
    }

    if (this.props.orderByCapacity === 'asc') {
      habitacionesFiltradas.sort((a, b) => a.capacidad - b.capacidad);
    } else if (this.props.orderByCapacity === 'desc') {
      habitacionesFiltradas.sort((a, b) => b.capacidad - a.capacidad);
    }

    if (this.props.filters.searchQuery) {
      habitacionesFiltradas = habitacionesFiltradas.filter((habitacion) =>
        habitacion.nombre.toLowerCase().includes(this.props.filters.searchQuery.toLowerCase())
      
      );
    }

    if (this.props.filters.minPrice !== '') {
      habitacionesFiltradas = habitacionesFiltradas.filter((habitacion) => 
        habitacion.precio >= this.props.filters.minPrice
      )
    }

    if (this.props.filters.maxPrice !== '') {
      habitacionesFiltradas = habitacionesFiltradas.filter((habitacion) => 
        habitacion.precio <= this.props.filters.maxPrice
      )
    }    

    let habitacionLinks = habitacionesFiltradas.map((habitacion, index) => (
      <Link to={`/habitacion/${habitacion.numero}`} className={`${style.link} + btn btn`} key={index}>
        {habitacion.nombre}<br></br>
       <label for="Name">Precio:$</label>
        {habitacion.precio}
      </Link>
    ));

    this.props.setFilteredHabitaciones(habitacionesFiltradas);

    return (
      <div className={`container  ${style.section}`}>
        <div className="row">
      <div className="col-md-4">
        <div className="row">
          <div className="col-md-6">
        <select className={`form-select mb-3  ${style.linksordenamiento}`} value={this.props.orderByName} onChange={(e) => this.props.setOrderByName(e.target.value)}>
          
          <option value="">Ordenar por Nombre</option>
          <option value="asc">A-Z</option>
          <option value="desc">Z-A</option>
        </select>
        </div>
          <div className="col-md-6">
        <select className={`form-select mb-3  ${style.linksordenamiento}`} value={this.props.orderByCapacity} onChange={(e) => this.props.setOrderByCapacity(e.target.value)}>
          <option value="">Ordenar por Capacidad</option>
          <option value="asc">Menor a Mayor</option>
          <option value="desc">Mayor a Menor</option>
        </select>
        </div>
        </div>
      </div>
      <div className="col-md-4">
        <div className="form-inline">
        <input
          type="text"
          placeholder="Buscar habitaciones"
          name="searchQuery"
          value={this.props.filters.searchQuery}
          onChange={this.handleFiltersChange}
          className={`form-control + ${style.searchInput}`}
        />

        <input 
          type="number"
          placeholder="Precio mínimo"
          name="minPrice"
          value={this.props.filters.minPrice}
          onChange={this.handleFiltersChange}
          className={`form-control + ${style.searchInput}`}        
        />
        

        <input 
          type="number"
          placeholder="Precio máximo"
          name="maxPrice"
          value={this.props.filters.maxPrice}
          onChange={this.handleFiltersChange}
          className={`form-control + ${style.searchInput}`}
        />
         </div>
      </div>
    </div>
    <div className="row">
        
        <div className="col-md-6">
          <h2 className={style.title}>Habitaciones</h2>
          
          <div className={style.links}>
            
            {habitacionLinks}
          
        </div>
        </div>
          <div className="col-md-6 d-flex align-items-center justify-content-center">
  <img src={imagen} alt="Habitación" className={`img-fluid mx-auto d-block mr-5  ${style.image}`} />
  </div>
      </div>
      </div>
      

    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Habitaciones)