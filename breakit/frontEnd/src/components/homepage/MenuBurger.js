import React from "react";
import { Link } from 'react-router-dom'
import {connect} from 'react-redux'
import pic from '../img/20191114--2.jpg'

import "./MenuBurger.css";

const mapStateToProps = (state) => {
  return state
}

class MenuBurger extends React.Component {
  state = {
    active: false,
    propsLoaded : false,
  }
  toggleClass = () => {
    const currentState = this.state.active;
    this.setState({
      active : !currentState
    })
  }

  componentDidMount = () => {
    setTimeout(() => {
    if (this.props.storeLoggedUser.user.spec !== undefined)   {
      this.setState({propsLoaded : !this.state.propsLoaded})
      }}, 200)
  }
  
  render() {

    return (
      
      <>
        <div className={this.state.active ? "change burgerContainer" : "burgerContainer"} onClick={this.toggleClass}>
          <div className="bar1"></div>
          <div className="mbar">
            <div className="mbar1"></div>
            <div className="mbar2"></div>
          </div>
          <div className="bar3"></div>
        </div>
        <div id="mnu" className={this.state.active ? "slider burgerMenu" : "burgerMenu"}>
          <div className="burgerProfilePicParent" ><img src={pic} alt="Profil" className="burgerProfilePic" /></div>
          <div className="burgerUserName" ><p>{this.props.storeLoggedUser.user.firstName} {this.props.storeLoggedUser.user.name} </p></div>
          <div className="burgerJob">{this.props.storeLoggedUser.user.type}</div>
          <div className="burgerJob">{this.state.propsLoaded ? this.props.storeLoggedUser.user.spec.join(' / ') : null}</div>
          <Link to="/Contact" className="burgerContact" >Contact</Link>
          <Link to="/Parameters" className="burgerParametres" >Paramètres</Link>
          <div className="burgerDeconnexion" onClick={() => /*{ if*/ (window.confirm('Êtes-vous sur(e) de vouloir vous déconnecter ?'))/* this.onCancel(item)/* }*/} href="#">Deconnexion</div>
        </div>
      </>
    );
  }
}

export default connect(mapStateToProps)(MenuBurger);