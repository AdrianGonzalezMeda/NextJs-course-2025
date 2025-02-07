import Link from 'next/link';
import Image from 'next/image';

import logo from '@/assets/logo.png';

export default function Header() {
    return (
        <header id="main-header">
            <Link href="/">
                <Image
                    src={logo}
                    width={100} // this way works but its better to use the raw size of the imported image or use sizes prop, but this image does not resize in this example
                    height={100}
                    //sizes="10vw" // recommended way to resize a image
                    priority // this tell the browser that the image is always displayed, so its not necessary to check lazy loading
                    alt="Mobile phone with posts feed on it"
                />
            </Link>
            <nav>
                <ul>
                    <li>
                        <Link href="/feed">Feed</Link>
                    </li>
                    <li>
                        <Link className="cta-link" href="/new-post">
                            New Post
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}
