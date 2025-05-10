import { List } from "@mui/material";
import NavDropdownListItem from "./NavDropdownListItem";

interface Props {
    closeHeader: () => void;
}

export default function NavDropdownList({ closeHeader }: Props) {
    return (
        <List sx={{ display: 'flex', paddingTop: '50px' }}>
            <NavDropdownListItem to="/jewelry/rings" closeHeader={closeHeader}
                img="/images/product/ring/bvlRing1.avif" title="rings" />

            <NavDropdownListItem to="/jewelry/necklakes" closeHeader={closeHeader}
                img="/images/product/ring/bvlRing2.avif" title="necklakes" />

            <NavDropdownListItem to="/jewelry/braceletes" closeHeader={closeHeader}
                img="/images/product/bracelete/louisBracelete4.avif" title="braceletes" />


            <NavDropdownListItem to="/jewelry/earrings" closeHeader={closeHeader}
                img="/images/product/ring/bvlRing3.avif" title="earrings" />

            <NavDropdownListItem to="/jewelry/cuffinks" closeHeader={closeHeader}
                img="/images/product/bracelete/louisBracelete2.avif" title="cuffinks & more" />

        </List>
    )
}