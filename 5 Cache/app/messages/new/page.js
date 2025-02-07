import { redirect } from 'next/navigation';

import { addMessage } from '@/lib/messages';
import { revalidatePath, revalidateTag } from 'next/cache';

export default function NewMessagePage() {
  async function createMessage(formData) {
    'use server';

    const message = formData.get('message');
    addMessage(message);
    // revalidatePath('/messages', 'layout'); // Revalidate manually on demand
    revalidateTag('msg'); // Assign tags on the request (/messages/page.js) to revalidate the requests asigned to this tag
    // even if the requests are in other pages
    redirect('/messages');
  }

  return (
    <>
      <h2>New Message</h2>
      <form action={createMessage}>
        <p className="form-control">
          <label htmlFor="message">Your Message</label>
          <textarea id="message" name="message" required rows="5" />
        </p>

        <p className="form-actions">
          <button type="submit">Send</button>
        </p>
      </form>
    </>
  );
}
