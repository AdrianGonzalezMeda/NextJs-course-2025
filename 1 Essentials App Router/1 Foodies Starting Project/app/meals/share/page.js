'use client'

import { useFormState, useFormStatus } from 'react-dom';

import classes from './page.module.css';
import { shareMeal } from '@/lib/server-actions.js';
import ImagePicker from '@/components/meals/image-picker';

export default function ShareMealPage() {
    /* logic  is now in the server-actions.js because its forbidden to have server actions in use client mode
    async function shareMeal(formData) {
        'use server'; 
        // formData its an instance of FormData()
    }
    */

    // Handle the state of the response in the server action attached to the <form> (the first parameter of the hook)
    const [state, formAction] = useFormState(shareMeal, { message: null });

    // React functionality but only really works when using NextJs. Need a <form> parent to works
    const { pending } = useFormStatus();

    return (
        <>
            <header className={classes.header}>
                <h1>
                    Share your <span className={classes.highlight}>favorite meal</span>
                </h1>
                <p>Or any other meal you feel needs sharing!</p>
            </header>
            <main className={classes.main}>
                <form className={classes.form} action={formAction}> {/*>NextJs allows to server actions can be use here*/}
                    <div className={classes.row}>
                        <p>
                            <label htmlFor="name">Your name</label>
                            <input type="text" id="name" name="name" required />
                        </p>
                        <p>
                            <label htmlFor="email">Your email</label>
                            <input type="email" id="email" name="email" required />
                        </p>
                    </div>
                    <p>
                        <label htmlFor="title">Title</label>
                        <input type="text" id="title" name="title" required />
                    </p>
                    <p>
                        <label htmlFor="summary">Short Summary</label>
                        <input type="text" id="summary" name="summary" required />
                    </p>
                    <p>
                        <label htmlFor="instructions">Instructions</label>
                        <textarea
                            id="instructions"
                            name="instructions"
                            rows="10"
                            required
                        ></textarea>
                    </p>
                    <ImagePicker label='Your image' name='image' />

                    {state.message && <p>{state.message}</p>}
                    <p className={classes.actions}>
                        <button disabled={pending}>
                            {pending ? 'Submitting...' : 'Share Meal'}
                        </button>
                        {/* If this component was a server component you can create a separated component to use 
                        useFormStatus there without declare this component as 'use client' 
                        <MealsFormSubmit />
                        */}
                    </p>
                </form>
            </main>
        </>
    );
}