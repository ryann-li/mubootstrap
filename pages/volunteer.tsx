import MUForm, { Dropdown, EmailField, Field, PhoneField } from "../components/muform";
import MUPage from "../components/page";
import { LesserPageTitle, BlueWideDiv, Blurb, BlurbTitle, PageTitle } from "../components/util";

/**
 * 
 * @returns the volunteer page
 */
export default function Volunteer() {
    const webapp_url: string = "kwwsv=22vfulsw1jrrjoh1frp2pdfurv2v2DNi|fez\\LOb|;O<]gn<sMyEYMG|F5{6msrWihjOV6oE9[n4ruNefRO6\\0EjHIkWbp4oi3NYYmj2h{hf";
    const hashed: string = "kwwsv=22glvfrug1frp2dsl2zhekrrnv2435;7;64<<964<37:;<2;Y7xJ:Y{MuvKZ[zbiu[rWx0;jSv6l0VHk]nOoEP]8l}Te5iM7XQJ:0OUNiZMK0|gDPSp";

    const type_options: string[] = [
        "Fundraising",
        "Material Development (Helping us improve our curricula)",
        "Outreach",
        "Teaching Director",
        "Any"
    ];

    const experience_options: string[] = [
        "No experience at all",
        "Some experience"
    ];

    return (
        <MUPage>
            <BlueWideDiv>
                <PageTitle className="text-white">Volunteer</PageTitle>
            </BlueWideDiv>

            <Blurb className='text-black mt-5 ml-[20%]'>
                <BlurbTitle>Help us run Music Unbounded!</BlurbTitle>
                <ul className='list-disc text-lg'>
                    <li>Make a difference in your community</li>
                    <li>Get volunteer hours</li>
                    <li>Personalized letter of recommendation</li>
                </ul>
                <BlurbTitle>At Music Unbounded, you will get the opportunity to:</BlurbTitle>
                <ul className='list-disc text-lg'>
                    <li>Help us fundraise and organize our events</li>
                    <li>Develop teaching material for new students</li>
                </ul>
                <br />
                <span className='text-lg'>Volunteers go through a short screening process.</span>
            </Blurb>

            <LesserPageTitle>Fill out this form</LesserPageTitle>

            <MUForm className='mb-5 mt-10' apps_script_url={webapp_url} whurl={hashed}>
                <Field required={true} name="Name">Name</Field>
                <EmailField />
                <Dropdown label="Age" options={["Yes, 16 or older", "No, I'm younger than 16"]}>
                    Are you 16 years of age or older?
                </Dropdown>
                <PhoneField />
                <Dropdown label="Type" options={type_options}>
                    Type
                </Dropdown>
            </MUForm>
        </MUPage>
    )
}