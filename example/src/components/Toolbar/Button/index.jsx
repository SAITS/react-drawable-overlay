import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

function Button({ icon, text, ...rest }) {
  return (
    <button className="toolbar__button" {...rest}>
      {icon && <FontAwesomeIcon icon={icon} />} {text && <span>{text}</span>}
    </button>
  )
}

export default Button
