'use client'

import { useFormStatus } from 'react-dom';

const MealsFormSubmit = () => {
    // React functionality but only really works when using NextJs. Need a <form> parent to works
    const { pending } = useFormStatus();

    return (
        <button disabled={pending}>
            {pending ? 'Submitting...' : 'Share Meal'}
        </button>
    )
}

export default MealsFormSubmit
