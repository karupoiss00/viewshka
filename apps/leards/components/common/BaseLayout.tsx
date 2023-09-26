import React, {PropsWithChildren} from "react";
import styles from "./BaseLayout.module.css";
import {classNames} from "@viewshka/core";

type BaseLayoutProps = PropsWithChildren & {
    className?: string
}

function BaseLayout({children, className}: BaseLayoutProps) {
    return (
<div className={classNames(styles.layout, className)}>
    {children}
</div>
    )
}

export default BaseLayout