import React from "react";
import Image from "next/image";
import BaseLayout from "../common/BaseLayout";
import {useScreenOrientation} from "@viewshka/core";

function Start() {
    const screenOrientation = useScreenOrientation()

    return (
<BaseLayout>
    <Image src={`/images/landing_background_${screenOrientation}.svg`} alt={'background'} layout={"fill"} draggable={false}/>
</BaseLayout>
    )
}

export default Start;