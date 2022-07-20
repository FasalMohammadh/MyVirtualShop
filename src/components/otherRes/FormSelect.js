import React from "react";
import "../css/FormSelect.css";

export default function (props)
{
    return (
        <div className={`rounded-3 p-2 d-flex border border-dark border-2 align-items-center ${props.className}  `}>
            <p className="title flex-fill px-3 m-0 border-2 border-dark border-end ">{props.title}</p>
            <select
                className='formSelect p-1 form-select form-select-lg border-0'
                value={props.value}
                onChange={props.onchangeFun}
                name={props.name}>
                {
                    props.items.map(item =>
                        <option key={item} value={item}>{item}</option>
                    )
                }
            </select>
        </div>


    );
}