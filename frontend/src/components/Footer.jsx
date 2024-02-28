import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { styles } from "../styles";
import { contact } from "../constants";
import {insta,facebook} from "../assets"

const Footer = () => {
  return (
    
    <div className="bg-gray-200 py-4 mt-auto text-center">
        <p className="text-2xl">Richa's Threading Salon & Spa</p>
        <p>{contact.email}</p>
        <p>{contact.mobile}</p>
        <p>{contact.address}</p>
        <div className="flex justify-center mt-4">
        <img src={facebook} alt="facebook" />
        <img src={insta} alt="insta" />
        </div>
        <p className="mt-10">©2019 by Richa's Threading Salon & Spa</p>
    </div>
  )
};

export default Footer;