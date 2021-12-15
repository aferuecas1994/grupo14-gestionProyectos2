import { useRef, useState } from 'react';

const useFormObjetivos = (initial) => {
    const form = useRef(initial);
    const [formData, setFormData] = useState({});

        
    const getFormData = () => { 
    const fd = new FormData(form.current);
    const obj = {"objetivos":[]};
    fd.forEach((value, key) => {

        if(key.includes("ESPECIFICO")){
            obj["objetivos"]=[...obj.objetivos,{
                tipo:"ESPECIFICO",
                descripcion: value
            }]
        }else if(key.includes("GENERAL")){
            obj["objetivos"]=[...obj.objetivos,{
                tipo:"GENERAL",
                descripcion: value
            }]
        }else if(key.includes("presupuesto")){
            obj[key] = parseFloat(value);

        }
        else{
            obj[key] = value
        }

        

    });

    return obj;
    };
    
    const updateFormData = () => {
    setFormData(getFormData());
    };
    return { form, formData, updateFormData };
};

export default useFormObjetivos;