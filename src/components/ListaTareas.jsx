import React, { Fragment, useEffect, useState } from "react";
import { ItemTarea } from "./ItemTarea";
import { Mensaje } from "./Mensaje";
import { v4 as uuid_v4 } from "uuid";

export function ListaTareas() {
    const CLAVE = "tareas-app-tareas";
    
    const [tareas, setTareas] = useState(() => {
        const tareasStorage = localStorage.getItem(CLAVE);
        return tareasStorage ? JSON.parse(tareasStorage) : [];
    });
    
    const [titulo, setTitulo] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [importante, setImportante] = useState(false);
    const [mensajeError, setMensajeError] = useState("");

    useEffect(() => {
        localStorage.setItem(CLAVE, JSON.stringify(tareas));
    }, [tareas]);

    const esTextoInvalido = (texto) => {
        let caracteresRepetidos = 0;
        for (let i = 0; i < texto.length - 1; i++) {
            if (texto[i].toLowerCase() === texto[i + 1].toLowerCase()) {
                caracteresRepetidos++;
                if (caracteresRepetidos >= 3) {
                    return "repetido";
                }
            } else {
                caracteresRepetidos = 0;
            }
        }

        const consonantes = "bcdfghjklmnñpqrstvwxyz";
        let consonantesSeguidas = 0;
        for (let i = 0; i < texto.length; i++) {
            if (consonantes.includes(texto[i].toLowerCase())) {
                consonantesSeguidas++;
                if (consonantesSeguidas >= 5) {
                    return "consonantes";
                }
            } else {
                consonantesSeguidas = 0;
            }
        }

        return null; 
    };

    const agregarTarea = (e) => {
        e.preventDefault();

        const descLimpia = descripcion.trim();
        const titLimpio = titulo.trim();

        if (descLimpia === "") {
            setMensajeError("La descripción es obligatoria.");
            return;
        }

        const errorDesc = esTextoInvalido(descLimpia);
        if (errorDesc === "repetido") {
            setMensajeError("Por favor, ingresa una descripción válida.");
            return;
        }
        if (errorDesc === "consonantes") {
            setMensajeError("Por favor, ingresa una descripción con texto real.");
            return;
        }

        if (titLimpio !== "") {
            const errorTit = esTextoInvalido(titLimpio);
            if (errorTit === "repetido") {
                setMensajeError("Por favor, ingresa un título válido.");
                return;
            }
            if (errorTit === "consonantes") {
                setMensajeError("Por favor, ingresa un título coherente.");
                return;
            }
        }

        setMensajeError("");

        const anguloAleatorio = (Math.random() * 14 - 7).toFixed(2);

        const nuevaTarea = {
            id: uuid_v4(),
            titulo: titLimpio,
            descripcion: descLimpia,
            importante: importante,
            rotacion: anguloAleatorio
        };

        setTareas((tareasAnteriores) => [...tareasAnteriores, nuevaTarea]);

        setTitulo("");
        setDescripcion("");
        setImportante(false);
    };

    const eliminarTarea = (id) => {
        const nuevasTareas = tareas.filter((tarea) => tarea.id !== id);
        setTareas(nuevasTareas);
    };

    return (
        <Fragment>
            <div className="container-fluid min-vh-100 p-4" style={{ backgroundColor: "#f4f1ea" }}>
                <h1 className="text-dark fw-bold mb-4" style={{ fontFamily: "sans-serif" }}>Post It Simulator!</h1>

                <form 
                    onSubmit={agregarTarea} 
                    className="row g-3 align-items-center mb-4 p-3 rounded text-dark mx-1"
                    style={{
                        background: "rgba(255, 255, 255, 0.25)",
                        backdropFilter: "blur(12px)",
                        WebkitBackdropFilter: "blur(12px)",
                        border: "1px solid rgba(255, 255, 255, 0.4)",
                        boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.05)"
                    }}
                >
                    <div className="col-md-3">
                        <input 
                            type="text" 
                            className="form-control" 
                            style={{ background: "rgba(255, 255, 255, 0.8)", border: "1px solid rgba(0,0,0,0.1)" }}
                            placeholder="Título" 
                            value={titulo} 
                            onChange={(e) => setTitulo(e.target.value)} 
                        />
                    </div>
                    <div className="col-md-4">
                        <input 
                            type="text" 
                            className="form-control" 
                            style={{ background: "rgba(255, 255, 255, 0.8)", border: "1px solid rgba(0,0,0,0.1)" }}
                            placeholder="Descripción" 
                            value={descripcion} 
                            onChange={(e) => setDescripcion(e.target.value)} 
                        />
                    </div>
                    <div className="col-md-2 d-flex align-items-center justify-content-start">
                        <div className="form-check">
                            <input 
                                className="form-check-input" 
                                type="checkbox" 
                                id="importanteCheck" 
                                checked={importante} 
                                onChange={(e) => setImportante(e.target.checked)} 
                            />
                            <label className="form-check-label fw-semibold text-dark" htmlFor="importanteCheck">
                                ¿Importante?
                            </label>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <button 
                            type="submit" 
                            className="btn w-100 fw-bold text-white shadow-sm" 
                            style={{ 
                                backgroundColor: "#52575d", 
                                border: "none",
                                borderRadius: "6px",
                                padding: "0.6rem",
                                letterSpacing: "0.5px"
                            }}
                        >
                            AGREGAR
                        </button>
                    </div>
                </form>

                {mensajeError && (
                    <div className="mx-1 mb-4">
                        <Mensaje tipo="danger" texto={mensajeError} />
                    </div>
                )}

                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-5 px-1 pt-2">
                    {tareas.map((item) => (
                        <div className="col" key={item.id}>
                            <ItemTarea 
                                id={item.id}
                                titulo={item.titulo} 
                                descripcion={item.descripcion} 
                                importante={item.importante}
                                rotacion={item.rotacion}
                                onEliminar={eliminarTarea}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </Fragment>
    );
}