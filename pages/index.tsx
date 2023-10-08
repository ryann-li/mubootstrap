import Cello from '../assets/cello.jpg'
import Clarinet from '../assets/clarinet.jpg'
import Community from '../assets/community.png'
import Flute from '../assets/flute.jpeg'
import Guitar from '../assets/guitar.jpg'
import Person from '../assets/person.svg'
import Background from '../assets/piano.png'
import Piano from '../assets/piano2.jpg'
import Trombone from '../assets/trombone.jpg'
import Trumpet from '../assets/trumpet.jpg'
import Tuba from '../assets/tuba.jpg'
import Viola from '../assets/viola.jpg'
import Violin from '../assets/violin.jpg'
import Accordian from '../components/accordian'
import MUPage from '../components/page'
import Made from '../assets/pianobg.png'
import { InternalLink, PageTitle, Bin } from '../components/util'

/**
 * 
 * @returns index page
 */
export default function Home() {
    function ConcertText(props: any) {
        return (
            <div className='text-gray-300 text-3xl text-center'><div {...props}>{props.children}</div></div>
        )
    }

    return (
        <MUPage>

            {/*<div className='bg-repeat-x bg-bottom bg-gradient-to-r from-red-600 to-purple-600 min-h-screen'>*/}
            {/*    <Bin className='py-16'>*/}
            {/*        <ConcertText>Music Unbounded</ConcertText>*/}
            {/*        <ConcertText>Presents</ConcertText>*/}
            {/*        <div className='my-10 font-news text-center text-white font-bold md:text-6xl text-4xl'>COMMUNITY <br/> CONCERT</div>*/}
            {/*        <ConcertText>August 25 2023</ConcertText>*/}
            {/*        <ConcertText className='italic font-thin my-3'>Ellerslie Road Baptist Church</ConcertText>*/}
            {/*        <ConcertText className='italic'>4:00 pm - 8:00 pm</ConcertText>*/}
            {/*        <ConcertText className='text-xl my-3 text-center mx-4 md:mx-16 pb-16'>*/}
            {/*            Music Unbounded is hosting our FIRST annual community concert to build musical community in Edmonton and promote the opportunity for young musicians to gain performance experience!*/}
            {/*            <br/>*/}
            {/*            Admission is FREE and all are welcome to attend!*/}
            {/*            <br/>*/}
            {/*            All performers are welcome as well! The application form can be found on our Linktree:*/}
            {/*            <br/>*/}
            {/*            <a href="https://linktr.ee/music.unbounded">Link Tree</a>*/}
            {/*            <br />*/}
            {/*            Want to perform? <a href = "https://forms.gle/v5izPoteiwaxbcu37">Click here!</a>*/}
            {/*        </ConcertText>*/}
            {/*    </Bin>*/}
            {/*</div>*/}
            <div style={{backgroundImage:`url(${Background.src})`}} className="bg-no-repeat bg-cover bg-center flex h-screen">
                <div className='mt-[40%] lg:mt-[12%] md:mt-[25%] sm:mt-[35%]
ml-[5%] flex-col justify-center items-center'>
                    <h1 className='w-full text-white font-lighter text-left text-4xl lg:text-7xl md:text-5xl font-lato tracking-[.02em] leading-tight  pb-[30px]'>Making Music Possible, <br /> for Every Child</h1>
                        <InternalLink href="/register" className='from-blue-800 to-blue-600 bg-gradient-to-r text-white tracking-[.1em] px-4 py-3 font-noto text-xl rounded-lg transition-all duration-500 shadow-lg shadow-white'>Register</InternalLink>
                </div>
            </div>
            <div style={{backgroundImage:`url(${Community.src})`}} className={`text-white flex items-center justify-center min-h-screen pb-5 bg-center`}>
                <h2 className='font-bold text-5xl lg:text-7xl text-center p-5 mx-10 text-black'>Join our ever-growing community of volunteers, young students, and teachers.</h2>
            </div>
            <div style={{backgroundImage:`url(${Person.src})`}} className="min-h-screen bg-right bg-no-repeat mb-32">
                <PageTitle>Instruments We Teach</PageTitle>
                <div className='w-[60%] mx-auto flex-col flex gap-2'>
                    <Accordian image={Piano} title="Piano">
                        A popular and versatile instrument, the piano is one of the best choices for beginners because of its simplicity. Many people know famous composers and songs for the piano.
                    </Accordian>
                    <Accordian image={Flute} title="Flute">
                        The flute is a lightweight instrument capable of producing a clear and bright sound with a distinctive warmth, refinement, and subtlety to its tone.
                    </Accordian>
                    <Accordian image={Violin} title="Violin">
                        The violin is a bowed stringed instrument which gained popularity during the 16th century. The violin is known for its unique vocal quality and is often the focus in many symphony orchestras.
                    </Accordian>
                    <Accordian image={Trombone} title="Trombone">
                        A brass instrument that requires excellent command of embouchure and breathing. It has a deep tone that makes it desirable in in symphony orchestras, jazz bands, and more.
                    </Accordian>
                    <Accordian image={Viola} title="Viola">
                        While similar in appearance to the violin, the viola acts as the sweeter inner voice of any orchestra.
                    </Accordian>
                    <Accordian image={Guitar} title="Guitar">
                        The guitar is a portable instrument perfect for solos and performances. It is fashionable and great to learn and play.
                    </Accordian>
                    <Accordian image={Cello} title="Cello">
                        The cello is a low-pitched string instrument popular for its rich and warm tones. Its contrast to the violin and viola make it an excellent companion to its higher pitched siblings.
                    </Accordian>
                    <Accordian image={Tuba} title="Tuba">
                        The tuba is like the trumpet&apos;s older sibling. It produces a strong and richly deep tone, providing a backbone to many marching bands.
                    </Accordian>
                    <Accordian image={Trumpet} title="Trumpet">
                        A very famous marching band instrument, the trumpet&apos;s simple appearance is appealing, but also deceiving. Be prepared to learn a lot about embouchure before you can master this instrument.
                    </Accordian>
                    <Accordian image={Clarinet} title="Clarinet">
                        The clarinet is a sleek and beautiful instrument that is the core of many concert bands. Its interface lends it great opportunity for skill expression.
                    </Accordian>
                </div>
            </div>
        </MUPage >
    )
}