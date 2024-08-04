import { css } from "@emotion/css";
import { VIEW } from "~shared/styles/breakepoints";


export const container = css`
  width: 100%;
  min-width: 320px;
  margin: 0 auto;
  padding: 0 15px;

  @media ${VIEW.mobile} {
    width: 425px;
  }

  @media ${VIEW.tablet} {
    width: 768px;
  }

  @media ${VIEW.desktop} {
    width: 1200px;
  }
`