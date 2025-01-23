'use server' // does not mean or guarantee that the code will only execute on the server!  
// DOC: https://nextjs.org/docs/app/building-your-application/rendering/composition-patterns#keeping-server-only-code-out-of-the-client-environment
// This package throws an error when you try to import some server code on client side, like functions with passwd or api keys

import { storePost, updatePostLikeStatus } from '@/lib/posts';
import { revalidatePath } from 'next/cache';

// Server actions must be async
export async function createPost(prevState, formData) {
    const title = formData.get('title');
    const image = formData.get('image');
    const content = formData.get('content');

    let errors = [];

    if (!title || title.trim().length === 0) {
        errors.push('Title is required.');
    }

    if (!content || content.trim().length === 0) {
        errors.push('Content is required.');
    }

    if (!image || image.size === 0) {
        errors.push('Image is required.');
    }

    if (errors.length > 0) {
        return { errors };
    }

    await storePost({
        imageUrl: '',
        title,
        content,
        userId: 1
    });

    revalidatePath('/feed');
    redirect('/feed');
}

export async function togglePostLikeStatus(postId) {
    await updatePostLikeStatus(postId, 2);
    // DOC: https://nextjs.org/docs/app/api-reference/functions/revalidatePath
    revalidatePath('/feed');
  }