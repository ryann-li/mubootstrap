import { useEffect, useState } from "react";
import { IconContext } from "react-icons";
import { AiFillMail } from "react-icons/ai";
import MUPage from "../components/page";
import { InternalLink } from "../components/util";

export default function ThankYou() {
    const [iconColor, setIconColor] = useState(null);

    useEffect(() => {
        // This code runs only on the client side
        setIconColor("rgb(37, 99, 235)");
    }, []);

    return (
        <MUPage>
            <div className='min-h-screen my-10'>
                <div className='flex justify-center'>
                    <IconContext.Provider value={{ color: iconColor }}>
                        <AiFillMail size={"10rem"} />
                    </IconContext.Provider>
                </div>
                <h1 className='text-center text-5xl lg:text-7xl my-8'>
                    Thank <span className='text-blue-600'>You,</span>
                </h1>
                <h2 className='text-center text-2xl lg:text-4xl my-6'>
                    Your form has been successfully submitted.
                </h2>
                <h3 className='text-center text-xl lg:text-2xl text-slate-500'>
                    We will get back to your email within a week!
                </h3>
                <div className='flex justify-center'>
                    <InternalLink
                        href='/'
                        className='text-lg px-4 py-3 bg-stone-600 text-white rounded-lg'
                        type='submit'
                    >
                        Go Home
                    </InternalLink>
                </div>
            </div>
        </MUPage>
    );
}
