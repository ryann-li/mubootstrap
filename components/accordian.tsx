import Image, { StaticImageData } from "next/image";
import { useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

interface AccordionProps {
    title: string;
    children: string;
    className?: string;
    image: StaticImageData;
}

export default function Accordion(props: AccordionProps) {
    const [open, setOpen] = useState(false);

    return (
        <div className={props.className + ' w-full'}>
            <div className={`bg-stone-600 items-center text-lg flex text-white p-3 cursor-pointer ${open ? "rounded-t-xl" : "rounded-xl"}`} onClick={e => setOpen(!open)}>
                {props.title}
                {open ? <AiOutlineMinus className='text-md ml-auto' /> : <AiOutlinePlus className='float-right ml-auto' />}
            </div>
            {open && <div className='p-3 border rounded-b-lg bg-white text-black'>
                <Image 
                    alt="Accordion Image" 
                    className='w-1/3 mx-auto my-10 rounded-lg' 
                    src={props.image} 
                    width={300} // Set appropriate width and height
                    height={200} // Set appropriate width and height
                />
                <div className='w-2/3 mx-auto text-center'>{props.children}</div>
            </div>}
        </div>
    );
}
