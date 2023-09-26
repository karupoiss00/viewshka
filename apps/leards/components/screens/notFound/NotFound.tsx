import React from "react";
import Image from "next/image";
import BaseLayout from '../../common/BaseLayout';

function get404ImageSrc() {
    const isHorribleBackground = Math.round(Math.random() * 100) % 2 === 0
    return isHorribleBackground ? '/images/404_black.svg' : '/images/404.svg'
}

function NotFound() {
    return (
<BaseLayout>
    <Image src={get404ImageSrc()} alt={'background'} layout={"fill"} draggable={false}/>
</BaseLayout>
    )
}

export default NotFound