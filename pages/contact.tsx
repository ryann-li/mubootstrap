import MUForm, { EmailField, Field, LargeField } from "../components/muform";
import MUPage from "../components/page";
import { BlueWideDiv, PageTitle } from "../components/util";

export default function Contact() {
    const webhookIdentifier = "contact";

    return (
        <MUPage>
            <BlueWideDiv>
                <PageTitle className="text-white">Contact</PageTitle>
            </BlueWideDiv>

            <MUForm className='mb-5 mt-10' webhookIdentifier={webhookIdentifier}>
                <Field required={true} name="Name">Name</Field>
                <EmailField />
                <Field required={true} name="Subject">Subject</Field>
                <LargeField label='Body'>Body</LargeField>
            </MUForm>
        </MUPage>
    );
}
