import React, { useState } from 'react';
import Button from './Button';

function CollapsibleSection(props) {
    const [isOpen, setIsOpen] = useState(true);

    function handleToggle() {
        setIsOpen(!isOpen);
        if (props.onChange) {
            props.onChange(!isOpen);
        }
    }

    const contentClasses = `cs-content collapsible-section-content ${!isOpen ? 'collapsed' : ''}`;

    return (
        <section className="collapsible-section" {...props}>
            {props.title && (
                <header className="cs-header">
                    <h3>{props.title}</h3>
                </header>
            )}

            <div className={contentClasses}>
                {props.children}
            </div>

            <div className="cs-toggle">
                <Button type="secondary" onClick={handleToggle} className="hide-show">
                    {isOpen ? 'Ocultar' : 'Mostrar'}
                </Button>
            </div>
        </section>
        
    );
}

export default CollapsibleSection;