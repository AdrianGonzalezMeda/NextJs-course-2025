'use client';

import { useOptimistic } from 'react';
import Image from 'next/image';

import { formatDate } from '@/lib/format';
import LikeButton from './like-icon';
import { togglePostLikeStatus } from '@/actions/posts';

function imageLoader(config) {
    // this only works with the redimension tool in claudinary
    const urlStart = config.src.split('upload/')[0];
    const urlEnd = config.src.split('upload/')[1];
    const transformations = `w_200,q_${config.quality}`;
    return `${urlStart}upload/${transformations}/${urlEnd}`;
}

function Post({ post, action }) {
    return (
        <article className="post">
            <div className="post-image">
                <Image
                    loader={imageLoader} // to override the src by making new url for the image, using the redimension tool integrated in our images hoster (cloudinary)
                    src={post.image}
                    fill // when using fill props you need to set position: relative, width and height in the container of the image
                    // sizes='' // when using fill you have a console hint because its recomended to use the sizes prop, but in this case, we already know the final size using the loader prop, so another way its to use width prop and set the same with at the loader function (200) but the problem is the unknown height
                    alt={post.title}
                    quality={50}
                />
            </div>
            <div className="post-content">
                <header>
                    <div>
                        <h2>{post.title}</h2>
                        <p>
                            Shared by {post.userFirstName} on{' '}
                            <time dateTime={post.createdAt}>
                                {formatDate(post.createdAt)}
                            </time>
                        </p>
                    </div>
                    <div>
                        <form
                            action={action.bind(null, post.id)}
                            className={post.isLiked ? 'liked' : ''}
                        >
                            <LikeButton />
                        </form>
                    </div>
                </header>
                <p>{post.content}</p>
            </div>
        </article>
    );
}

export default function Posts({ posts }) {
    const [optimisticPosts, updateOptimisticPosts] = useOptimistic(
        posts,
        (prevPosts, updatedPostId) => {
            const updatedPostIndex = prevPosts.findIndex(
                (post) => post.id === updatedPostId
            );

            if (updatedPostIndex === -1) {
                return prevPosts;
            }

            const updatedPost = { ...prevPosts[updatedPostIndex] };
            updatedPost.likes = updatedPost.likes + (updatedPost.isLiked ? -1 : 1);
            updatedPost.isLiked = !updatedPost.isLiked;
            const newPosts = [...prevPosts];
            newPosts[updatedPostIndex] = updatedPost;
            return newPosts;
        }
    );

    if (!optimisticPosts || optimisticPosts.length === 0) {
        return <p>There are no posts yet. Maybe start sharing some?</p>;
    }

    async function updatePost(postId) {
        updateOptimisticPosts(postId);
        await togglePostLikeStatus(postId);
    }

    return (
        <ul className="posts">
            {optimisticPosts.map((post) => (
                <li key={post.id}>
                    <Post post={post} action={updatePost} />
                </li>
            ))}
        </ul>
    );
}
