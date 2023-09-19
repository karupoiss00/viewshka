import React, {PropsWithChildren} from "react";
import styles from "./BaseLayout.module.css";

function BaseLayout({children}: PropsWithChildren) {
    return (
<div className={styles.layout}>
    {children}
</div>
    )
}

export default BaseLayout