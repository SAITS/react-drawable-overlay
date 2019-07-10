import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const Button = ({ icon, text, ...rest }) => (
  <button className="toolbar__button" {...rest}>
    {icon && <FontAwesomeIcon icon={icon} />} {text && <span>{text}</span>}
  </button>
)

export default Button
