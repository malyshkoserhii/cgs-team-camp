import { css } from "@emotion/css";
import { VIEW } from "~shared/styles/breakepoints";


export const mainLayout = css`
    @media ${VIEW.mobileToTablet} {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        outline: solid black;
        gap: 10px;
    }
    @media ${VIEW.desktop} {
        display: grid;
        grid-template-columns: repeat(4,1fr);
        row-gap: 15px;
        padding: 10px;
        outline: 1px solid tomato;
    }
`

export const tableHeader = css`
  font-weight: bold;
  font-size: 18px;
`;
