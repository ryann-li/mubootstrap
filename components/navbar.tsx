import React, { useState } from "react";
import { RxCross1, RxHamburgerMenu } from 'react-icons/rx';
import useComponentVisible from '../logic/use_component_visible';
import { nav_options, single_nav_options } from '../page_data/nav_options';
import { HR, InternalLink } from './util';
/**
 * 
 * @param props children
 * @returns nav element
 */
function MUNavItem(props: { children: React.ReactNode }) {
    return (
        <div className='rounded text-lg py-4 pr-5 pl-5 hover:bg-gray-200 duration-500 transition whitespace-nowrap'>
            {props.children}
        </div>
    )
}
/**
 * 
 * @param props children
 * @returns nav dropdown child
 */
function DropDownItem(props: { children: React.ReactNode, link: string }) {
    return (
        <div className='relative text-center'>
            <InternalLink href={props.link}><div className='p-3 hover:bg-gray-100 rounded-md whitespace-nowrap'>{props.children}</div></InternalLink>
        </div>
    )
}

/**
 * 
 * @param props children
 * @returns nav dropdown
 */
function NavDropdown(props: { children: React.ReactNode, title: string }) {
    const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(false);
    return (
        <div className='relative text-center'>
            <div className='whitespace-nowrap cursor-pointer' onClick={() => { setIsComponentVisible(!isComponentVisible) }}>
                <MUNavItem>{props.title}</MUNavItem>
            </div>
            <div ref={ref} className={`${isComponentVisible ? "border border-black shadow-sm max-h-auto" : "max-h-0 overflow-hidden"} flex flex-col absolute right-0 min-w-full bg-white rounded-md`}>
                {props.children}
            </div>
        </div>
    )
}


/**
 * 
 * @returns hamburger options for mobile devices
 */
export const MobileHamburgerOptions = () => {
    return (
        <div className='fixed z-40 h-screen right-0 bg-white w-[100%] pt-10'>
            <div className=''>
                {nav_options.map((opt, i) => {
                    return (
                        <div key={opt.parent_title}>
                            <h2 className='text-lg pl-6 text-gray-400'>{opt.parent_title}</h2>
                            <HR />
                            <div key={opt.parent_title} className='last:pb-5'>
                                {opt.children.map((child) => {
                                    return (
                                        <div key={child.dest} className='transition-all duration-500 rounded-lg'>
                                            <InternalLink href={child.dest} className='text-lg pl-6'>{child.label}</InternalLink>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    )
                })}
            </div>
            <div className='flex flex-wrap flex-col pl-6 py-2 gap-4'>
                {single_nav_options.map((opt, i) => {
                    return (
                        <div className='text-lg last:pb-6' key = {opt.dest}>
                            <InternalLink href = {opt.dest}><button className='text-white rounded-md bg-blue-600 px-3 py-2.5'>{opt.title}</button></InternalLink>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

/**
 * 
 * @returns nav hamburger menu
 */
export const MobileHamburgerMenu = () => {
    
    const [open, setOpen] = useState(false);

    const showMenu = () => setOpen(!open)

    return (
        <div className="mobile-nav">
            <div className='icon z-50 relative'>
                {open ? <RxCross1 className='relative right-0 cursor-pointer' onClick={() => {setOpen(false)}}  /> : <RxHamburgerMenu onClick={showMenu} className='relative right-0 cursor-pointer'/>}
                
            </div>
            <div className={open ? 'duration-500 fixed left-0 transition-all right-0' : 'translate-x-[100vw] left-0 duration-500 fixed right-0 transition-all'}>
                <MobileHamburgerOptions />
            </div>
        </div>
    )
}



/**
 * 
 * @returns The navbar for the website
 */
export default function MUNavbar() {
    return (
        <div>
<div className='fixed top-0 left-0 right-0 lg:relative'>
            <nav className="flex bg-white">
                <div className="pl-6 flex items-center grow">
                    <InternalLink href='/'><span className='font-bold cursor-pointer hover:text-sky-300 text-lg lg:text-2xl transition-all duration-500'>Music Unbounded</span></InternalLink>
                </div>
                <div className="hidden justify-end lg:flex lg:basis-1/3 basis-0">
                    {nav_options.map((opt, i) => {
                        return (<NavDropdown key={i} title={opt.parent_title}>
                            {opt.children.map((opt_item, i) => {
                                return (
                                    <DropDownItem key={opt_item.dest} link={opt_item.dest}>
                                        {opt_item.label}
                                    </DropDownItem>
                                )
                            })}
                        </NavDropdown>
                        )
                    })}

                    {single_nav_options.map((opt, i) => {
                        return (
                            <InternalLink href={opt.dest} key={i}><MUNavItem>{opt.title}</MUNavItem></InternalLink>
                        )
                    })}
                    
                </div>
                <div className="flex lg:hidden basis:1">
                    <div className="lg:hidden text-5xl mr-5 py-3">
                        <MobileHamburgerMenu />
                    </div>
                </div>
            </nav>
        </div>
            <div className='mr-5 my-20 lg:hidden'></div>
        </div>
    )
}