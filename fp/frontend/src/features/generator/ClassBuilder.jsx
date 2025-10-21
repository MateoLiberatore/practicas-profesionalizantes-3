import React from "react";
import FormHeaders from "./FormHeaders";
import FormConstructor from "./FormConstructor";
import FormMethods from "./FormMethods";

const sections = [
    { title: "Headers", component: FormHeaders },
    { title: "Constructor", component: FormConstructor },
    { title: "Methods", component: FormMethods },
];

function renderSections() {
    return sections.map(function renderSection({ title, component: Section }) {
        return (
            <React.Fragment key={title}>
                <h3 className="h3-style">&gt; {title}</h3>
                <Section />
            </React.Fragment>
        );
    });
}

function ClassBuilder() {
    return (
        <div className="bg-secondary-600 text-primary-200 rounded-2xl p-5 pb-20 mt-5 mx-auto w-full
                        md:w-11/12
                        lg:w-4/5
                        xl:w-3/4">
            <h2 className="text-7xl flex items-center justify-center
                text-center font-bold mb-8 mt-4 pb-4 mx-auto rounded-xl">
                &gt; Generador de Clases
            </h2>
            {renderSections()}
        </div>
    );
}

export default ClassBuilder;