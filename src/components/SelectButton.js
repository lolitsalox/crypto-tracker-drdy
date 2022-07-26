import React from 'react'

function SelectButton({children, selected, onClick }) {

    return (
        <span
            onClick={onClick}
            style={{        
                border: '5px solid',
                borderColor: '#00adb5',
                borderRadius: 5,
                padding: 10,
                paddingLeft: 20,
                paddingRight: 20,
                cursor: 'pointer',
                backgroundColor: selected ? '#00adb5' : '',
                color: selected ? '#eeeeee' : '',
                fontWeight: selected ? 700 : 500,
                width: '22%',
            }}
        >
        {children}
        </span>
    )
}

export default SelectButton