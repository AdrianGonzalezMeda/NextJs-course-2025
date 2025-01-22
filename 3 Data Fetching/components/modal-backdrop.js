"use client";

import { useRouter } from 'next/navigation';

export default function ModalBackdrop() {
    const router = useRouter(); // Navigate programatically

    return <div className="modal-backdrop" onClick={router.back} />
}