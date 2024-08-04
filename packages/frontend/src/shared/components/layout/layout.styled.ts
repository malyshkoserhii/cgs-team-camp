import { css } from "@emotion/css";
import { VIEW } from "~shared/styles/breakepoints";


const mainLayout = css`
    display: grid;
    @media ${VIEW.mobile} {
        grid-template-columns: 1;
        gap: 5px;
        overflow-x: hidden;
    }
    @media ${VIEW.desktop} {
        grid-template-columns: 4;
    }
`