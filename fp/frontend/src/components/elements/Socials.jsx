import React from "react";
import { FaGithub, FaLinkedin, FaEnvelope, FaGlobe } from 'react-icons/fa'; 

function SocialLink({ Icon, href, label }) {
    return (
        <a 
            href={href} 
            target="_blank" 
            rel="noopener noreferrer" 
            aria-label={label}
            className="text-primary-500 hover:text-primary-700 transition duration-300 transform hover:scale-110 flex items-center gap-2"
        >
            <Icon className="text-2xl" />
            <span className="hidden md:inline text-secondary-900 font-medium">{label}</span>
        </a>
    );
}

function Socials() {
    const contactLinks = [
        { Icon: FaEnvelope, label: "liberatoremate98@gmail.com" },
        { Icon: FaLinkedin, href: "https://www.linkedin.com/in/mateo-liberatore", label: "LinkedIn" },
        { Icon: FaGithub, href: "https://github.com/MateoLiberatore", label: "GitHub" },
        { Icon: FaGlobe, href: "https://tu-portfolio.web", label: "Portfolio" }
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