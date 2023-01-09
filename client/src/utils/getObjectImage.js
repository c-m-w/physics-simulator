/// getObjectImage.js

import loadImage from "./loadImage";

export default async function getObjectImage(type, selected) {

    return selected ? await loadImage(`/images/ball_${type}_selected.png`) 
            : await loadImage(`/images/ball_${type}.png`);
}
