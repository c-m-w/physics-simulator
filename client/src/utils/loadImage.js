/// loadImage.js

export default function loadImage(path) {

    return new Promise((resolve) => {
        const image = new Image();

        image.onload = () => resolve(image);
        image.src = path;
    });
}
