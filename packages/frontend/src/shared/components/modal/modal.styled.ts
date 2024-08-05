import { css } from "@emotion/css";

export const modalOverlay = css`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
`
export const modal = css`
    background: white;
    padding: 20px;
    border-radius: 8px;
    max-width: 500px;
    width: 100%;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    position: relative;
  `

export const modalHeader = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
`
  
export const modalCloseButton =css `
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
`
  
export const modalContent = css`
    max-height: 60vh;
    overflow-y: auto;
`
  