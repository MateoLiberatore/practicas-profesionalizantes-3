import React from 'react';
import Button from '../../components/UI/Button';
import InputControl from '../../components/UI/InputControl';


function LandingView({ LoginComponent }) {
  return (

<div className="
    relative h-screen flex items-center bg-transparent 
    ">
    <div className="
        bg-secondary-600
        w-full max-w-md 
        p-8 
        ml-16
        rounded-md  
        shadow-[0_0px_50px_rgba(0,0,0,0.3)]
        shadow-primary-500 
        flex flex-col 
        gap-6 
        ">
        
        <header className="text-center">
            <h1 className="text-6xl font-bold  text-primary-300"> 
                &gt;PreCode
            </h1>
        </header>

        <div> 
            {LoginComponent} 
        </div>

        <footer className="text-center text-sm text-primary-300 pt-3 border-t border-primary-300">
            © 2025 PreCode
        </footer>
    </div>
</div>
    


  );
};

export default LandingView;