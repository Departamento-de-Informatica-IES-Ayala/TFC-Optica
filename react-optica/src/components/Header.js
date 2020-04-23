import React, { Component } from 'react';
import logo from '../assets/images/logo.png';
import { NavLink , Link, Redirect} from 'react-router-dom';
import { auth } from '../db';
import axios from "axios";
import Global from "../Global";

class Header extends Component {

    url = Global.url;

    state = {
        identity: false,
        user: {},
        userId: null,
        redirect:false,

    }

    componentDidUpdate() {

        if (this.props.logged===true && auth.currentUser!=null && this.state.identity === false) {
            let email = auth.currentUser.email
            axios.get(this.url + 'user/' + email).then((response) => {
                if (response.data.status === 'success') {
                    this.setState({
                        identity: true,
                        user: response.data.user,
                        userId: response.data.userId,
                        redirect:false
                    });
                } else {
                    this.setState({
                        identity: null
                    });
                }
            });
        }

    }

    logout=()=>{
        auth.signOut().then(()=>{
            this.setState({
                identity: false,
                user: {},
                userId: null,
                redirect:true
             })
        }).catch((e)=>{
            alert(e.message)
          });
          
    }



    render() {

        return (

            <React.Fragment>
            {this.state.redirect===true &&
                            
                <Redirect to="/tope-vision/signout"/>
            }
            

            <header id="header" className="container-fluid">
                <nav className="navbar navbar-expand-lg navbar-light" id="barra" >
                    <div className="navbar-brand">
                        <NavLink to="/tope-vision/home" activeClassName="active"><img src={logo} className="app-logo" id="logo" alt="Logotipo" /></NavLink>
                    </div>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">

                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <NavLink to="/tope-vision/home" activeClassName="active">Inicio</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/tope-vision/servicios" activeClassName="active">Servicios</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/tope-vision/tienda" activeClassName="active">Tienda</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/tope-vision/citas" activeClassName="active">Citas</NavLink>
                            </li>
                        </ul>
                        <div className="dropdown-divider "></div>
                        <ul class="navbar-nav navbar-right">

                            {this.state.identity === false || this.state.identity === null
                                ? <React.Fragment>
                                    <li class="nav-item">
                                        <NavLink to="/tope-vision/register" activeClassName="active">Registro</NavLink>
                                    </li>
                                    <li class="nav-item">
                                        <NavLink to="/tope-vision/login" activeClassName="active">Iniciar sesion</NavLink>
                                    </li>
                                </React.Fragment>
                                : <React.Fragment>
                                    <li class="nav-item dropdown" >
                                        <p class="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            {this.state.user.nombre + ' ' + this.state.user.apellidos}
                                             </p>

                                        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                                            {this.state.user.admin === false 

                                                ?<React.Fragment>
                                                 <Link className="dropdown-item" to={"/tope-vision/miperfil/" + this.state.userId} >Mi perfil</Link>
                                                 {/* <Link className="dropdown-item" to={"/tope-vision/mispedidos/" + this.state.userId} activeClassName="active">Mis pedidos</Link> */}
                                                 </React.Fragment>
                                                : <React.Fragment>
                                                <Link className="dropdown-item" to={"/tope-vision/adminperfil/" + this.state.userId} >Administracion</Link>
                                                
                                                </React.Fragment>
                                            }
                                            <div className="dropdown-divider"></div>
                                            <Link className="dropdown-item pointer" style={{cursor: "pointer"}} onClick={this.logout}>Cerrar sesion</Link>
                                        </div> 
                                    </li>
                                    </React.Fragment>
                                }
                                
                            </ul>

                            {/*AÑADIR PARTE DEL USUARIO Y BOTONES DE INICIAR SESION O REGISTRO*/ }
                        

            </div >
                    </nav >
                
            </header >
            </React.Fragment>
         );
    }
}

export default Header;