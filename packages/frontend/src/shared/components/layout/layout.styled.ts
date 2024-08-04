import { css } from "@emotion/css";
import { VIEW } from "~shared/styles/breakepoints";


export const mainLayout = css`
    display: grid;
    @media ${VIEW.mobileToTablet} {
        grid-template-columns: 1;
        gap: 5px;
        overflow-x: hidden;
    }
    @media ${VIEW.desktop} {
        grid-template-columns: 2;
    }
`