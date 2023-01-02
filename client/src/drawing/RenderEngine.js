/// RenderEngine.js

import {vsDefaultSource, fsDefaultSource, vsTextureSource, fsTextureSource} from "./shaders.js";

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

    constructor(boardElement)
    {
        this.canvas = boardElement;
        this.canvas.width = this.canvas.clientWidth;
        this.canvas.height = this.canvas.clientHeight;
        this.gl = this.canvas.getContext("webgl2");

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
    }

    bindTexture(image) {

        const texture = this.gl.createTexture();
        const tempPixels = [255, 0, 255, 255];

        // this.gl.bindTexture(this.gl.TEXTURE_2D, texture);
        // this.gl.texImage2D(this.gl.TEXTURE_2D,
        //                    0,
        //                    this.gl.RGBA,
        //                    1,
        //                    1,
        //                    0,
        //                    this.gl.RGBA,
        //                    this.gl.UNSIGNED_BYTE,
        //                    new Uint8Array(tempPixels));
        //this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL, true);

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
    }

    draw(vertexArray, colorArray, nVertices, outline = false)
    {
        this.gl.useProgram(this.defaultProgram);

        this.bindBuffer(vertexArray, 2, "vertexPosition", this.defaultProgram);
        this.bindBuffer(colorArray, 4, "vertexColor", this.defaultProgram);

        this.gl.drawArrays(outline ? this.gl.LINE_STRIP : this.gl.TRIANGLE_STRIP, 0, nVertices);
    }

    drawTextured(vertexArray, uvArray, nVertices, image)
    {
        this.gl.useProgram(this.textureProgram);

        this.bindBuffer(vertexArray, 2, "vertexPosition", this.textureProgram);
        this.bindBuffer(uvArray, 2, "uvCoordinate", this.textureProgram);
        this.bindTexture(image);
        
        this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, nVertices);
    }
}

export default RenderEngine;
