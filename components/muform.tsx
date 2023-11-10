import React, { useState } from "react";
import { Bin, ToPublicUTF8 } from "./util";

function RedirectToThankYou(): void {
  window.location.href = "thank-you";
}

function SubmitMUForm(e: React.FormEvent<HTMLFormElement>, url: string, form: any, webhookIdentifier: string): void {
  e.preventDefault();

  const form_data = new FormData(form);
  const form_json: { [key: string]: string } = {};

  form_data.forEach((value, key) => {
    form_json[key] = value.toString();
  });

  fetch(url, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ...form_json, whurl: webhookIdentifier }),
  })
  .then(response => response.json())
  .then(data => {
    console.log("Response from API:", data);
    if (data.message === 'Success') {
      RedirectToThankYou(); // Assuming this is where you redirect after successful submission
    } else {
      alert("Failed, internal error. Please email us at support@musicunbounded.org with details.");
    }
  })
  .catch(error => {
    console.error("Error:", error);
    alert("Failed, internal error. Please email us at support@musicunbounded.org with details.");
  });
}

// components/muform.tsx
export default function MUForm(props: { children?: React.ReactNode, webhookIdentifier: string, className?: string }) {
  const [submit_disabled, SetSubmitDisabled] = useState(false);
  const [submit_button_name, SetSubmitButtonName] = useState("Submit");

  function AttemptSubmission(e: React.FormEvent<HTMLFormElement>, url: string, webhookIdentifier: string): void {
    e.preventDefault();
    if (submit_disabled) {
      return;
    }
    SetSubmitDisabled(true);
    SetSubmitButtonName("Submitting...")
    SubmitMUForm(e, url, document.forms["main_form"], webhookIdentifier);
  }

  return (
    <Bin>
      <div className={props.className}>
        <form name="main_form" method='post' onSubmit={e => AttemptSubmission(e, "/api/submitForm", props.webhookIdentifier)}>
          <input type="text" name="honeypot" style={{ display: 'none' }} />
          {props.children}
          <button disabled={submit_disabled} className='bg-blue-600 text-white p-3 rounded-md' type="submit">{submit_button_name}</button>
        </form>
      </div>
    </Bin>
  )
}


export function Field(props: { children: string, name: string, required?: boolean, type?: string }) {
  const input_class: string = "w-full p-3 border-b-2";

  return (
    <div className='mb-5 text-lg'>
      <div className='pb-2'><label htmlFor={props.name}>{props.children}</label></div>
      <div>{props.required ? <input placeholder={props.children} className={"rounded-md " + input_class} type={props.type} id={props.name} name={props.name} required /> : <input placeholder={props.children} className={input_class + " rounded-md"} type={props.type} id={props.name} name={props.name} />}</div>
    </div>
  )
}

export function LargeField(props: { children: string, label: string }) {
  return (
    <div className='text-lg'>
      <label className='mb-2' htmlFor={props.children}>{props.children}</label>
      <textarea name={props.label} required rows={5} placeholder="Write your thoughts here..." id={props.children} className='p-3 text-lg w-full border-b-2 mb-5' />
    </div>
  )
}

export function Dropdown(props: { children: string, label: string, options: string[] }) {
  return (
    <div className='text-lg'>
      <div className='pb-2'><label htmlFor={props.label}>{props.children}</label></div>
      <select defaultValue={''} id={props.label} name={props.label} className='w-full p-3 mb-5 border-b-2' required>
        <option value='' disabled>Select an option</option>
        {props.options.map(s => (
          <option key={s} value={s}>{s}</option>
        ))}
      </select>
    </div>
  )
}

export function PhoneField() {
  return (
    <Field name="Phone Number" type='tel' required={false}>Phone Number (Optional)</Field>
  )
}

export function EmailField() {
  return (
    <Field name='Email' type='email' required={true}>Email</Field>
  )
}
