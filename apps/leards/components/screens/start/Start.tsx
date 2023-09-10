import React from "react";
import Image from "next/image";
import PageLayout from "../PageLayout";
import {useScreenOrientation} from "@viewshka/core";

function Start() {
    const screenOrientation = useScreenOrientation()

    return (
<PageLayout>
    <Image src={`/images/landing_background_${screenOrientation}.svg`} alt={'background'} layout={"fill"} />
</PageLayout>
    )
}

export default Start;