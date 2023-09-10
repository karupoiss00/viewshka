import React from "react";
import Image from "next/image";
import PageLayout from "../PageLayout";

function get404ImageSrc() {
    const isHorribleBackground = Math.round(Math.random() * 100) % 2 === 0
    return isHorribleBackground ? '/images/404_black.svg' : '/images/404.svg'
}

function NotFound() {
    return (
<PageLayout>
    <Image src={get404ImageSrc()} alt={'background'} layout={"fill"} />
</PageLayout>
    )
}

export default NotFound