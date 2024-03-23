import MUForm, { EmailField, Field, LargeField } from "../components/muform";
import MUPage from "../components/page";
import { BlueWideDiv, PageTitle } from "../components/util";

/**
 * 
 * @returns contact page
 */
export default function Contact() {
    
    return (
        <MUPage>
            <BlueWideDiv>
                <PageTitle className="text-white">Contact</PageTitle>
            </BlueWideDiv>

            <MUForm className='mb-5 mt-10'>
                <Field required={true} name="Name">Name</Field>
                <EmailField />
                <Field required={true} name="Subject">Subject</Field>
                <LargeField label='Body'>Body</LargeField>
            </MUForm>
        </MUPage>
    )
}