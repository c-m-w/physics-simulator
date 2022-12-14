/// RenderEngine.js

import {vsDefaultSource, fsDefaultSource, vsTextureSource, fsTextureSource} from "./shaders.js";

import Vector from "../types/Vector.js";

class RenderEngine
{
    makeShaders(vsSource, fsSource)
    {
        const loadShader = (type, source) => 
        {
            const shader = this.gl.createShader(type);

            this.gl.shaderSource(shader, source);
            this.gl.compileShader(shader);

            if (this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS))
                return shader;

            this.gl.deleteShader(shader);
            return null;
        };

        const vs = loadShader(this.gl.VERTEX_SHADER, vsSource);
        const fs = loadShader(this.gl.FRAGMENT_SHADER, fsSource);

        if (null == vs
            || null == fs)
            return null;

        const program = this.gl.createProgram();

        this.gl.attachShader(program, vs);
        this.gl.attachShader(program, fs);
        this.gl.linkProgram(program);

        // try delete shaders

        this.gl.deleteShader(vs);
        this.gl.deleteShader(fs);

        if (this.gl.getProgramParameter(program, this.gl.LINK_STATUS))
            return program;

        return null;
    }

    setCanvasSize() {

        this.canvas.width = this.canvas.clientWidth;
        this.canvas.height = this.canvas.clientHeight;

        if (this.gl)
            this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
    }

    getCanvasSize() {

        return new Vector(this.canvas.width, this.canvas.height, 0);
    }

    getCanvas() {

        return this.canvas;
    }

    constructor(boardElement)
    {
        this.canvas = boardElement;
        this.setCanvasSize();
        this.gl = this.canvas.getContext("webgl2");

        window.addEventListener("resize", () => {

            this.setCanvasSize();
        })

        if (null == this.gl)
        {
            /// todo error
        }

        this.defaultProgram = this.makeShaders(vsDefaultSource, fsDefaultSource);
        this.textureProgram = this.makeShaders(vsTextureSource, fsTextureSource);

        if (null == this.defaultProgram
            || null == this.textureProgram)
        {
            console.log("shaders are bad");
            /// todo error
        }
        
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
        this.gl.enable(this.gl.BLEND);
        this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
    }

    pixelsToVertices(pixels) {

        const size = this.getCanvasSize();

        let vertices = [];

        for (const vec of pixels) {

            vertices.push(
                (2.0 * vec.x - size.x) / size.x,
                (size.y - 2.0 * vec.y) / size.y
            );
        }

        return vertices;
    }

    beginScene()
    {
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    }

    bindBuffer(data, nComponents, attributeName, program)
    {
        const attributeLocation = this.gl.getAttribLocation(program, attributeName);
        const buffer = this.gl.createBuffer();

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(data), this.gl.STATIC_DRAW);

        this.gl.vertexAttribPointer(attributeLocation, nComponents, this.gl.FLOAT, false, 0, 0);
        this.gl.enableVertexAttribArray(attributeLocation);

        return buffer;
    }

    bindTexture(image) {

        const texture = this.gl.createTexture();

        this.gl.bindTexture(this.gl.TEXTURE_2D, texture);
        this.gl.texImage2D(this.gl.TEXTURE_2D, 
                           0, 
                           this.gl.RGBA, 
                           this.gl.RGBA,
                           this.gl.UNSIGNED_BYTE,
                           image);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR);

        return texture;
    }

    draw(vertexArray, colorArray, nVertices, outline = false)
    {
        this.gl.useProgram(this.defaultProgram);

        const vbuffer = this.bindBuffer(vertexArray, 2, "vertexPosition", this.defaultProgram);
        const cbuffer = this.bindBuffer(colorArray, 4, "vertexColor", this.defaultProgram);

        this.gl.drawArrays(outline ? this.gl.LINE_STRIP : this.gl.TRIANGLE_STRIP, 0, nVertices);

        this.gl.deleteBuffer(vbuffer);
        this.gl.deleteBuffer(cbuffer);
    }

    drawTextured(vertexArray, uvArray, nVertices, image)
    {
        this.gl.useProgram(this.textureProgram);

        const vbuffer = this.bindBuffer(vertexArray, 2, "vertexPosition", this.textureProgram);
        const ubuffer = this.bindBuffer(uvArray, 2, "uvCoordinate", this.textureProgram);
        const texture = this.bindTexture(image);
        
        this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, nVertices);

        this.gl.deleteBuffer(vbuffer);
        this.gl.deleteBuffer(ubuffer);
        this.gl.deleteTexture(texture);
    }
}

export default RenderEngine;
