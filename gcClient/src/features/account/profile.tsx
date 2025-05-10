import { LoadingButton } from "@mui/lab"
import { useAppSelector } from "../../app/store/store"

export default function Profile() {
    const { user } = useAppSelector(state => state.accaunt)
    return (
        <>
            <h1>{user?.username}</h1>
            <h3>{user?.email}</h3>
            <LoadingButton>Logout</LoadingButton>
        </>

    )
}