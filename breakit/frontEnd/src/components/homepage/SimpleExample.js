import React from 'react';
import { connect } from 'react-redux'
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import axios from 'axios'
import L from 'leaflet';
import LocateControl from './LocateControl';
import Logo from '../img/logo-skills-noir.svg'
import './Map.css';

//npm install leaflet.locatecontrol

const mapStateToProps = (state) => {
  return state
}
class SimpleExample extends React.Component {
  state = {
    meetups: [],
    Users: []
  }

  getMeetUp() {
    axios.get('https://opendata.paris.fr/api/records/1.0/search/?dataset=que-faire-a-paris-&q=num%C3%A9rique&rows=27&facet=category&facet=tags&facet=address_zipcode&facet=address_city&facet=pmr&facet=blind&facet=deaf&facet=access_type&facet=price_type')
      .then(result => { this.setState({ meetups: result.data.records }) })
  }
  meetupToStore = () => {
    const action = { type: 'MEETUP_LOAD', value: this.state.meetups }
    this.props.dispatch(action)
  }
  componentDidMount() {
    this.getMeetUp();
    this.getUsersOnline()
  }

  getUsersOnline() {
    axios.get('http://localhost:4000/api/user/getOnlineUsers')
      .then(res => {
        return this.setState({ Users: res.data })
      })
  }


  render() {

    const locateOptions = {
      maxZoom: 10,
      position: 'topleft',
      strings: {
        title: 'Show me where I am, yo!'
      },
      onActivate: () => { } // callback before engine starts retrieving locations
    }

    this.meetupToStore()

    const IconMeetup = L.icon({
      iconRetinaUrl: require('../img/icon-meetup.png'),
      iconUrl: require('../img/icon-meetup.png'),
      iconSize: new L.Point(30, 30),
    })

    const IconDev = L.icon({
      iconRetinaUrl: require('../img/icon-dev.png'),
      iconUrl: require('../img/icon-dev.png'),
      iconSize: new L.Point(30, 30),
    })

    const IconRh = L.icon({
      iconRetinaUrl: require('../img/icon-rh.png'),
      iconUrl: require('../img/icon-rh.png'),
      iconSize: new L.Point(30, 30),
    })
    return (

      <div>
        <img className="logo" src={Logo} alt='logo du site skills' />

        <Map id="leaflet-container" className={this.props.toggleFilter.isFiltered ? "miSize" : "fullSize"}>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url='https://{s}.tile.osm.org/{z}/{x}/{y}.png'
          />

          {this.state.Users.map((marker, i) => {
            if (marker.online) {
              if (this.props.toggleUsers.dev && marker.type === 'Dev'){
                return (
                  <Marker position={marker.geoLoc} key={i} icon={IconDev}>
                    <Popup>
                      <div className="popup_desc">
                        <div className="desciption">
                          <h2>{marker.firstName}<span> {marker.name}</span></h2>
                          <h3>{marker.type}</h3>
                          <h4>Languages : {marker.languages.join(' / ')}</h4>
                        </div>
                      </div>
                    </Popup>
                  </Marker>
                )
              }
              else if((this.props.toggleUsers.cto && marker.type === 'CTO')){
                return (
                  <Marker position={marker.geoLoc} key={i} icon={IconRh}>
                    <Popup>
                      <div className="popup_desc">
                        <div className="desciption">
                          <h2>Société : <span> {marker.name}</span></h2>
                          <h4>Secteur : <span> {marker.field}</span> </h4> 
                          <h4>Langages recherchés: {marker.languages.join(' / ')}</h4>
                          <h4>Site Web : <span> {marker.web}</span></h4>
                        </div>
                      </div>
                    </Popup>
                  </Marker>
                )
              }
            }
          })}

          {this.props.toggleList.meetups.map((marker2, i) => {
            if (this.props.toggleUsers.meetup) {
              return (
                <Marker position={[marker2.geometry.coordinates[1], marker2.geometry.coordinates[0]]} key={i} icon={IconMeetup}>
                  <Popup>
                    <div className="pop">
                      <div className="meetupdes">
                        <img className="avatar_map2" src={marker2.fields.cover_url} alt="avatar_img" />
                        <h3>{marker2.fields.title}</h3>
                        <h4>{marker2.fields.address_name}</h4>
                        <h4>{marker2.fields.address_street} {marker2.fields.address_zipcode}</h4>
                        {/* <Link to='/contact_url'>  {marker2.fields.contact_url} clic </Link> */}
                        <h4 className='linkMeetup' onClick={() => { window.open(marker2.fields.contact_url, "_blank") }}>Lien vers l'événement</h4>

                      </div>
                    </div>
                  </Popup>
                </Marker>
              )
            }
          }
          )}
          <LocateControl options={locateOptions} startDirectly />
        </Map>
      </div>)

  }
}

export default connect(mapStateToProps)(SimpleExample)
