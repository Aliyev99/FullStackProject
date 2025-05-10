import { ListItem } from "@mui/material";
import { Link } from "react-router-dom";

interface Props {
    to: string;
    closeHeader: () => void;
    img: string;
    title: string;
}

export default function NavDropdownListItem({ to, closeHeader, img, title }: Props) {
    return (
        <ListItem sx={{ padding: 0, paddingRight: '10px' }} className="m-navDropdownListItem">
            <Link to={to} className="m-dropDownBtn" onClick={closeHeader}>
                <img className="m-dropdownImg" src={img} />
                <p>{title}</p>
            </Link>
        </ListItem>

    )
}