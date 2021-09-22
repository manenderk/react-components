import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'

const PasswordFieldComponent = ({name, id, className, placeholder, required, value, ...props}) => {
  const passwordRegex = {
    strong: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/gm,          //has at least one lowercase letter, one uppercase letter, one digit, one special character, and is at least eight characters long.
    mediumOption1: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{6,}$/gm,   //has at least one lowercase letter, one uppercase letter, one digit, one special character, and is at least six characters long.
    mediumOption2: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[#?!@$ %^&*-]).{8,}$/gm                //has at least one lowercase letter, one uppercase letter, one special character, and is at least eight characters long.
  };

  const [passwordStrength, setPasswordStrength] = useState('');
  const [fieldValue, setFieldValue] = useState(value || '');

  useEffect(() => {

    if (fieldValue !== '') {
      if(passwordRegex.strong.test(fieldValue)) {
        setPasswordStrength('Strong');
      } else if (passwordRegex.mediumOption1.test(fieldValue)) {
        setPasswordStrength('Medium');
      } else if (passwordRegex.mediumOption2.test(fieldValue)) {
        setPasswordStrength('Medium');
      } else {
        setPasswordStrength('Weak');
      }
    } else {
      setPasswordStrength('');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fieldValue])

  return (
    <>
    <input 
      type="password" 
      name={name ? name : null} 
      id={id ? id : null} 
      className={className ? className : null} 
      placeholder={placeholder ? placeholder : null} 
      required={required === 'true' ? 'required' : null}
      value={fieldValue}
      onChange={(e) => setFieldValue(e.target.value)}
      data-invalid={passwordStrength !== 'Strong' ? true : false}
    />

    {
      passwordStrength !== '' &&
      <div className="password-strength-container">
        <div className="strength-bar">
          <div className={`strength-block ${passwordStrength}`}></div>
        </div>
        <div className="password-strength-text">
          {passwordStrength}
        </div>
      </div>
    }
    </>
  )
}

PasswordFieldComponent.propTypes = {
  /**
   * Name of input field
   */
  name: PropTypes.string,

  /**
   * ID of input field
   */
  id: PropTypes.string,

  /**
   * class list for input field
   */
  className: PropTypes.string,

  /**
   * Placeholder for input field
   */
  placeholder: PropTypes.string,

  /**
   * Set required attribute
   */
  required: PropTypes.oneOf(['true', 'false']),

  /**
   * Initial value of input field
   */
  value: PropTypes.string,

  /**
   * Event emitted on value change
   */
  onChange: PropTypes.func
}

PasswordFieldComponent.defaultProps = {
  name: '',
  id: '',
  className: '',
  placeholder: '',
  required: 'false',
  value: ''
}

export default PasswordFieldComponent
