import React, { useEffect, useState } from 'react'

function SelectButton({children, selected, onClick }) {

    const [isMobile, setIsMobile] = useState(false)
 
    const handleResize = () => {
      if (window.innerWidth < 720) {
          setIsMobile(true)
          return
      }
      
      setIsMobile(false)
    }
    
    useEffect(() => {
      window.addEventListener("resize", handleResize)
    })
    
    return (
        <span
            onClick={onClick}
            style={{        
                border: '5px solid',
                borderColor: '#00adb5',
                borderRadius: 5,
                padding: 10,
                paddingLeft: isMobile ? 10 : 20,
                paddingRight: 20,
                cursor: 'pointer',
                backgroundColor: selected ? '#00adb5' : '',
                color: selected ? '#eeeeee' : '',
                fontWeight: selected ? 700 : 500,
                width: '23%',
            }}
        >
        {children}
        </span>
    )
}

export default SelectButton