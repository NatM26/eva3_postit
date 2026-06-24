import React, { Fragment } from "react";

export function Mensaje(props) {
    return (
        <Fragment>
            <div className={"alert alert-" + props.tipo}>
                <p>{props.texto}</p>
            </div>
        </Fragment>
    );
}