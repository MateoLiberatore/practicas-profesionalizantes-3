import React from "react";
import { FaGithub, FaLinkedin, FaEnvelope, FaGlobe } from 'react-icons/fa'; 

function SocialLink({ Icon, href, label, disabled }) {
    const [isCopied, setIsCopied] = React.useState(false);
    const isEmail = label.includes("@"); 

    const handleCopy = (e) => {
        e.preventDefault(); 
        if (navigator.clipboard && href) {
            navigator.clipboard.writeText(href)
                .then(() => {
                    setIsCopied(true);
                    setTimeout(() => setIsCopied(false), 2000); 
                })
                .catch(err => {
                    console.error("Failed to copy:", err);
                });
        }
    };
    
    const handleClick = (e) => {
        if (disabled) {
            e.preventDefault(); 
            e.stopPropagation();
            return;
        }
        
        if (isEmail) {  
            handleCopy(e);
        }
    };

    const disabledClasses = disabled 
        ? "opacity-40 cursor-not-allowed pointer-events-none transform-none hover:scale-100" 
        : "text-primary-500 hover:text-primary-700 transform hover:scale-110";

    const labelContent = isCopied ? "¡Copied!" : label;

    return (
        <a 
            href={disabled || isEmail ? '#' : href} 
            target={isEmail || disabled ? "_self" : "_blank"}
            rel="noopener noreferrer" 
            aria-label={label}
            onClick={handleClick} 
            className={`transition duration-300 flex items-center gap-2 ${disabledClasses}`}
            aria-disabled={disabled}
        >
            <Icon className="text-2xl" />
            <span className="hidden md:inline text-secondary-900 font-medium">{labelContent}</span>
        </a>
    );
}

function Socials() {
    const contactLinks = [
        { Icon: FaEnvelope, href: "liberatoremate98@gmail.com", label: "liberatoremate98@gmail.com" }, 
        { Icon: FaLinkedin, href: "https://www.linkedin.com/in/mateo-liberatore", label: "LinkedIn" },
        { Icon: FaGithub, href: "https://github.com/MateoLiberatore", label: "GitHub" },
        { Icon: FaGlobe, href: "https://tu-portfolio.web", label: "Portfolio", disabled: true }
    ];

    return (
        <div className="card-light p-3 pb-5 text-center">
            <h3 className="text-3xl font-bold mb-4 text-secondary-800">Contact</h3>
            <div className="flex justify-center flex-wrap gap-10 text-lg">
                {contactLinks.map((link, index) => (
                    <SocialLink key={index} {...link} />
                ))}
            </div>
        </div>
    );
}

export default Socials;