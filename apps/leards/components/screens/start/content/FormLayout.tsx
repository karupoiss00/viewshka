import React, {PropsWithChildren} from "react";
import styles from "./FormLayout.module.css";
import {classNames} from "@viewshka/core";
import Image from "next/image";

type FormLayoutProps = PropsWithChildren & {
    className?: string
}

function FormLayout({children, className}: FormLayoutProps) {
    return (
        <div className={classNames(styles.layout, className)}>
            <div className={styles.logo}>
                <Image src={'/images/Logo.svg'} width={326} height={200}/>
            </div>
            {children}
        </div>
    )
}

export default FormLayout