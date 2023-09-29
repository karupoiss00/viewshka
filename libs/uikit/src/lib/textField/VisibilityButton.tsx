import IconCloseEye from "../icons/IconCloseEye"
import IconOpenEye from "../icons/IconOpenEye"

type VisibilityButtonProps = {
    isVisibility: boolean
    onClick: () => void
}

function VisibilityButton({isVisibility, onClick}: VisibilityButtonProps) {
    return <div onClick={onClick}>
        {isVisibility ? <IconOpenEye/> : <IconCloseEye/>}
    </div>
}

export default VisibilityButton;