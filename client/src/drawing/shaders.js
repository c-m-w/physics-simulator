/// shaders.js

const vsDefaultSource = `
    attribute vec4 vertexPosition;
    attribute vec4 vertexColor;

    varying lowp vec4 color;

    void main() {

        gl_Position = vertexPosition;
        color = vertexColor;
    }
`;

const fsDefaultSource = `
    varying lowp vec4 color;

    void main() {

        gl_FragColor = color;
    }
`;

const vsTextureSource = `
    attribute vec4 vertexPosition;
    attribute vec2 uvCoordinate;

    varying highp vec2 uv;

    void main() {

        gl_Position = vertexPosition;
        uv = uvCoordinate;
    }
`;

const fsTextureSource = `
    varying highp vec2 uv;

    uniform sampler2D sampler;

    void main() {

        gl_FragColor = texture2D(sampler, uv);
    }
`;

export {vsDefaultSource, fsDefaultSource, vsTextureSource, fsTextureSource};
