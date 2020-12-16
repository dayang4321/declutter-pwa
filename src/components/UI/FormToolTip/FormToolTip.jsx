import React from 'react';
import {Tooltip,OverlayTrigger} from 'react-bootstrap'
import {ReactComponent as InfoIcon} from '../../../assets/img/svg/info-icon.svg';

import './FormToolTip.css'


const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Simple tooltip
    </Tooltip>
  );


function FormToolTip() {
    return (

        <OverlayTrigger
        placement="right"
        delay={{ show: 250, hide: 400 }}
        overlay={renderTooltip}
      >
        <div className="toolicon position-absolute">
            <InfoIcon/>
            </div>
    </OverlayTrigger>
    )
}

export default FormToolTip;