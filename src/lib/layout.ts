import bands from "../assets/bands.svg";
import girl from "../assets/girl.svg";
import congrats from "../assets/congrats.svg";

export const LAYOUT = `
<div class="field">
  <div class="travel">
    <img src="${congrats}" id="congrats" alt="Congrats"/>
    <img src="${girl}" class="item" alt="Girl" id="girl" />
  </div>
  <img src="${girl}" class="item" alt="Girl" id="girl-placeholder" />
  <img src="${bands}" class="item" alt="Bands" id="bands" />
</div>
<span id="progress">0%</span>
<span id="caption"></span>
`;
