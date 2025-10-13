import React, { useState } from 'react';
import Button from './Button';

/**
 * @component CollapsibleSection
 * @description Contenedor colapsable determinista.
 */
function CollapsibleSection(props) {
    var state = useState(true);
    var isOpen = state[0];
    var setIsOpen = state[1];

    function handleToggle() {
        setIsOpen(!isOpen);
    }

    return (
        <section className="collapsible-section">
            <header className="cs-header">
                <h3>{props.title}</h3>
            </header>

            {isOpen && <div className="cs-content">{props.children}</div>}

            <div className="cs-toggle">
                <Button type="secondary" onClick={handleToggle} className={props.buttonClassName}>
                    {isOpen ? 'Ocultar' : 'Mostrar'}
                </Button>
            </div>
        </section>
    );
}

export default CollapsibleSection;
