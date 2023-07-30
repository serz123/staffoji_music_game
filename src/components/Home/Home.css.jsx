/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

/**
 * CSS styles for the Home component.
 */
export const HomeCss = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 30px;

  h1 {
    margin: 0;
    font-size: 48px;
    margin-bottom: 30px;
  }

  p {
    font-size: 24px;
    margin-bottom: 20px;
    text-align: center;
  }

  button {
    font-size: 24px;
    color: white;
    background-color: #1e90ff;
    border: none;
    border-radius: 30px;
    padding: 10px 20px;
    margin: 10px;
    cursor: pointer;
    font-family: 'Times New Roman', Times, serif;
  }

  button:hover {
    background-color: #2b547e;
    transform: translate3d(0, -2px, 0);
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  }

  a {
    text-decoration: none;
  }

  .buttons {
    justify-content: center;
    display: flex;
    flex-direction: row;
    flex-grow: 0;
    flex-shrink: 0;
  }

  @media (max-width: 600px) {
    h1 {
      font-size: 36px;
    }

    p {
      font-size: 18px;
    }

    button {
      white-space: nowrap;
      font-size: 18px;
      padding: 8px 16px;
      margin: 5px;
    }
  }

  @media (min-width: 600px) and (max-width: 900px) {
    h1 {
      font-size: 42px;
    }

    p {
      font-size: 20px;
    }

    button {
      white-space: nowrap;
      font-size: 20px;
      padding: 10px 18px;
      margin: 8px;
    }
  }

  @media (min-width: 900px) {
    h1 {
      font-size: 48px;
    }

    p {
      font-size: 24px;
    }

    button {
      font-size: 24px;
      padding: 10px 20px;
      margin: 10px;
    }
  }
`
/**/
