import MUForm, { EmailField, Field, LargeField } from "../components/muform";
import MUPage from "../components/page";
import { BlueWideDiv, PageTitle } from "../components/util";

/**
 * 
 * @returns contact page
 */
export default function Contact() {
    const webapp_url: string = "kwwsv=22vfulsw1jrrjoh1frp2pdfurv2v2DNi|fe{Mxrd<5;pSXHZ7rpxKMuyxd;{m7V]s{33t6db0IPFHw8hWd9<pGfiq[W4bilb5sln2h{hf";
    const hashed: string = "kwwsv=22glvfrug1frp2dsl2zhekrrnv2<;357943;3<8:;5<762YEIZN6KxQOPkz0XDNyDL6L7q9Kh<sUVis{6GEFntDz5JNU[|V|{yfYDO4svZuDvl4VPG";

    // TODO: put in API
    
    return (
        <MUPage>
            <BlueWideDiv>
                <PageTitle className="text-white">Contact</PageTitle>
            </BlueWideDiv>

            <MUForm className='mb-5 mt-10' apps_script_url={webapp_url} whurl={hashed}>
                <Field required={true} name="Name">Name</Field>
                <EmailField />
                <Field required={true} name="Subject">Subject</Field>
                <LargeField label='Body'>Body</LargeField>
            </MUForm>
        </MUPage>
    )
}