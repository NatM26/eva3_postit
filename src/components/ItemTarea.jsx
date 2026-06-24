import React, { Fragment } from "react";

export function ItemTarea({ id, titulo, descripcion, importante, rotacion, onEliminar }) {
    
    const anguloEfectivo = rotacion ? rotacion : 0;

    const estiloPostIt = {
        backgroundColor: importante ? "#ffccd5" : "#fffecb",
        color: "#2b2b2b",
        transform: `rotate(${anguloEfectivo}deg)`,
        WebkitTransform: `rotate(${anguloEfectivo}deg)`,
        transition: "transform 0.15s ease",
        minHeight: "220px",
        boxShadow: "4px 4px 10px rgba(0, 0, 0, 0.08)", 
        border: "none",
        borderRadius: "1px",
        display: "flex",
        flexDirection: "column",
        padding: "1.2rem"
    };

    return (
        <Fragment>
            <div className="card h-100 position-relative" style={estiloPostIt}>
                <button 
                    type="button" 
                    className="btn-close position-absolute top-0 end-0 m-2" 
                    style={{ fontSize: "0.75rem", opacity: 0.4 }}
                    aria-label="Close"
                    onClick={() => onEliminar(id)}
                ></button>
                
                <div className="card-body p-0 d-flex flex-column pt-2">
                    {}
                    {titulo && (
                        <h5 className="card-title fw-bold mb-2" style={{ fontFamily: "'Segoe UI', Roboto, Helvetica, sans-serif", fontSize: "1.25rem", color: "#000" }}>
                            {titulo}
                        </h5>
                    )}
                    {}
                    <p className="card-text flex-grow-1" style={{ fontFamily: "'Segoe Print', 'Comic Sans MS', cursive", fontSize: "1.05rem", lineHeight: "1.4", color: "#3a3a3a" }}>
                        {descripcion}
                    </p>
                </div>
            </div>
        </Fragment>
    );
}