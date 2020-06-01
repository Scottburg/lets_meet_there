import React, { useState } from 'react';
import './flightTile.css';
import { useSelector } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
// import { makeStyles } from '@material-ui/core/styles';

const FlightTile = ({ flight1, flight2, location }) => {
  const bookingUrl = 'https://www.skyscanner.net/transport/flights/';
  const places = useSelector((state) => state.places);
  const carriers = useSelector((state) => state.carriers);
  const [expanded, setExpanded] = useState(false);
  const classes = useStyles();
  function handleExpandClick() {
    setExpanded(!expanded);
  }

  return (
    <div className="flightTile">
      <div className="flightTileMain">
        <div className="flight1">
          <div className="tripDetails">
            <h3>{places[flight1.OutboundLeg.OriginId].CityName}</h3>€
            {flight1.MinPrice}
            <div>{flight1.Direct ? 'Direct Flight' : 'Indirect Flight'}</div>
            <a
              href={`${bookingUrl}${places[
                flight1.OutboundLeg.OriginId
              ].CityName.slice(0, 4)}/${places[location].CityName.slice(
                0,
                4
              )}/${flight1.OutboundLeg.DepartureDate.slice(
                0,
                10
              )}/${flight1.InboundLeg.DepartureDate.slice(0, 10)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Book
            </a>
          </div>
          {/* <div className="outbound">
          <div className="heading">
            {' '}
            Out{' '}
            <span role="img" aria-label="plane">
              🛫
            </span>
          </div>
          <div>{carriers[flight1.OutboundLeg.CarrierIds[0]].Name}</div>
          <div>{places[flight1.OutboundLeg.OriginId].Name}</div>
          <div>{flight1.OutboundLeg.DepartureDate.slice(0, 10)}</div>
        </div>
        <div className="inbound">
          <div className="heading">
            {' '}
            Return{' '}
            <span role="img" aria-label="plane">
              🛫
            </span>
          </div>
          <div>{carriers[flight1.InboundLeg.CarrierIds[0]].Name}</div>
          <div>{places[flight1.InboundLeg.OriginId].Name}</div>
          <div>{flight1.InboundLeg.DepartureDate.slice(0, 10)}</div>
        </div> */}
        </div>
        <div className="bothFlights">
          <h3>{places[location].CityName}</h3>
          <h4>{places[location].CountryName}</h4>
          <h4>€{flight2.MinPrice + flight1.MinPrice}</h4>
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </div>
        <div className="flight2">
          {/* <div className="outbound">
          <div className="heading">
            {' '}
            Out{' '}
            <span role="img" aria-label="plane">
              🛫
            </span>
          </div>
          <div>{carriers[flight2.OutboundLeg.CarrierIds[0]].Name}</div>
          <div>{places[flight2.OutboundLeg.OriginId].Name}</div>
          <div>{flight2.OutboundLeg.DepartureDate.slice(0, 10)}</div>
        </div>
        <div className="inbound">
          <div className="heading">
            {' '}
            Return
            <span role="img" aria-label="plane">
              🛫
            </span>{' '}
          </div>
          <div>{carriers[flight2.InboundLeg.CarrierIds[0]].Name}</div>
          <div>{places[flight2.InboundLeg.OriginId].Name}</div>
          <div>{flight2.InboundLeg.DepartureDate.slice(0, 10)}</div>
        </div> */}
          <div className="tripDetails">
            <h3>{places[flight2.OutboundLeg.OriginId].CityName}</h3>
            <div>€{flight2.MinPrice}</div>
            <div>{flight2.Direct ? 'Direct Flight' : 'Indirect Flight'}</div>
            <a
              href={`${bookingUrl}${places[
                flight2.OutboundLeg.OriginId
              ].CityName.slice(0, 4)}/${places[location].CityName.slice(
                0,
                4
              )}/${flight2.OutboundLeg.DepartureDate.slice(
                0,
                10
              )}/${flight2.InboundLeg.DepartureDate.slice(0, 10)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Book
            </a>
          </div>
        </div>
      </div>
      {expanded ? (
        <div className="flightTileExpand">
          {carriers[flight1.InboundLeg.CarrierIds[0]].Name}
        </div>
      ) : null}
    </div>
  );
};

export default FlightTile;

const useStyles = makeStyles((theme) => ({
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
}));
