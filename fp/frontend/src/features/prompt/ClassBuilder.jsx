import React from 'react';
import FormHeaders from './FormHeaders';
import FormConstructor from './FormConstructor';
import FormMethods from './FormMethods';

function ClassBuilder() {
    return (
        <div className="bg-secondary-600 w-1/2 text-primary-200 rounded-2xl p-5 pb-14 ml-5 mt-5 ">
      
                <h2 className='text-6xl text-center font-bold mb-8'>Generador de Clases</h2>

                    <h3 className="font-bold text-4xl mb-4 pt-4 w-fit p-3 rounded-3xl">Headers</h3>
                        
                        <FormHeaders />
                    
                    <h3 className="font-bold text-4xl mt-8 mb-4 pt-4">Constructor</h3>
                        
                        <FormConstructor />
                    
                    <h3 className="font-bold text-4xl mt-8 mb-4 pt-4">Methods</h3>
                        <FormMethods />

</div>
    );
}

export default ClassBuilder;
