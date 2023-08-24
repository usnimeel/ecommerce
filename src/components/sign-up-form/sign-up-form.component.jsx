import { useState } from "react";
import FormInput from "../form-input/form-input.component";
import { createAuthUserWithEmailandPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";

const defaultFormFields = {
    displayName: "",
    email: "",
    password: "",
    confirmPassword: ""
}

const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if(password !== confirmPassword) {
            alert("Passwords do not match")
            return;
        }

        try {
            const { user } = await createAuthUserWithEmailandPassword(email, password);
            await createUserDocumentFromAuth(user, { displayName })
            resetFormFields();
        } catch(error) {
            if(error.code == "auth/email-already-in-use") {
                alert("Cannot create user, email already in use");
            }
            console.error("user creatation encountered an error", error);
        }

    };

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormFields({ ...formFields, [name]: value });
    };

    return(
        <div>
            <h1>Sign Up with your email and password</h1>
            <form onSubmit={handleSubmit}>
                <FormInput
                    label="Display Name" 
                    inputOptions = {{
                        type: "text",
                        required: true,
                        onChange: handleChange,
                        name: "displayName",
                        value: displayName,
                    }}
                />
                <FormInput
                    label="Email" 
                    inputOptions = {{
                        type: "text",
                        required: true,
                        onChange: handleChange,
                        name: "email",
                        value: email,
                    }}
                />
                <FormInput
                    label="Password" 
                    inputOptions = {{
                        type: "text",
                        required: true,
                        onChange: handleChange,
                        name: "password",
                        value: password,
                    }}
                />
                <FormInput
                    label="Confirm Password" 
                    inputOptions = {{
                        type: "text",
                        required: true,
                        onChange: handleChange,
                        name: "confirmPassword",
                        value: confirmPassword,
                    }}
                />
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
};

export default SignUpForm;