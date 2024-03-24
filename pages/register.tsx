import MUForm, { Dropdown, EmailField, Field, LargeField, PhoneField } from "../components/muform";
import MUPage from "../components/page";
import { BlueWideDiv, PageTitle } from "../components/util";

export default function Register() {
    const webhookIdentifier = "register";

    const instrument_options: string[] = [
        "Piano",
        "Cello",
        "Viola",
        "Violin",
        "Flute",
        "Guitar",
        "Trombone",
        "Trumpet",
        "Clarinet",
        "Tuba"
    ];

    const experience_options: string[] = [
        "No experience at all",
        "Some experience"
    ];

    return (
        <MUPage>
            <BlueWideDiv>
                <PageTitle className="text-white">Register</PageTitle>
            </BlueWideDiv>

            <MUForm className='mb-5 mt-10' webhookIdentifier={webhookIdentifier}>
                <Field required={true} name="Guardian Full Name">Guardian Full Name</Field>
                <Field required={true} name="Student Full Name">Student Full Name</Field>
                <EmailField />
                <Field required={true} name="Age">Student's Age</Field>
                <PhoneField />
                <Dropdown label="Preferred Instrument" options={instrument_options}>Instrument</Dropdown>
                <Dropdown label="Experience" options={experience_options}>Previous experience with chosen instrument</Dropdown>
                <LargeField label="Statement">Please state possible lessons times including days of the week and times of day</LargeField>
            </MUForm>
        </MUPage>
    );
}
