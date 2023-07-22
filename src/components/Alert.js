import React, { useContext } from 'react';
import noteContext from '../context/notes/noteContext';

const Alert = () => {
    const context = useContext(noteContext);
    const { alert } = context;

    if (!alert) return null;

    return (
        <div style={{ height: '40px' }}>
            <div className={`alert alert-${alert.type} fade show`} role="alert">
                <strong> {alert.message} </strong>
            </div>
        </div>
    )
}

export default Alert
