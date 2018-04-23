import * as React from "react";
import * as ReactDOM from "react-dom";
import { mat4 } from "gl-matrix";

import "./background.css";
import backgroundImage from "./background.jpg";
import { type } from "os";

const vsSource = `
attribute vec4 aVertexPosition;
attribute vec4 aVertexColor;

uniform mat4 uModelViewMatrix;
uniform mat4 uProjectionMatrix;

varying highp vec4 vColor;

void main() {
  gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
  vColor = aVertexColor;
}
`;

const fsSource = `
varying highp vec4 vColor;

void main() {
  gl_FragColor = vColor;
}
`;

export interface IBackgoundProps {}
interface IBackgroundState {
  canvas?: HTMLCanvasElement;
  gl?: WebGLRenderingContext;
  supported: boolean;
  width: number;
  height: number;
}

interface IProgramInfo {
  program: WebGLProgram | null;
  attribLocations: {
    vertexPosition: number;
    vertexColor: number;
  };
  uniformLocations: {
    projectionMatrix: WebGLUniformLocation | null;
    modelViewMatrix: WebGLUniformLocation | null;
  };
}

interface IBuffers {
  position: WebGLBuffer | null;
  color: WebGLBuffer | null;
}

export class Background extends React.Component<
  IBackgoundProps,
  IBackgroundState
> {
  public state: Readonly<IBackgroundState> = {
    supported: true,
    width: window.innerWidth,
    height: window.innerHeight
  };

  public componentDidMount(): void {
    console.debug("mounting");
    const div = ReactDOM.findDOMNode(this) as HTMLDivElement;
    const canvas = div.getElementsByTagName("canvas")[0];
    const gl = canvas.getContext("webgl");
    if (!gl) {
      console.warn(
        "Unable to initialize WebGL. Your browser or machine may not support it."
      );
      this.setState({ supported: false });
      return;
    }

    const shaderProgram = this.initShaderProgram(gl, vsSource, fsSource);
    const programInfo: IProgramInfo = {
      program: shaderProgram,
      attribLocations: {
        vertexPosition: gl.getAttribLocation(shaderProgram, "aVertexPosition"),
        vertexColor: gl.getAttribLocation(shaderProgram, "aVertexColor")
      },
      uniformLocations: {
        projectionMatrix: gl.getUniformLocation(
          shaderProgram,
          "uProjectionMatrix"
        ),
        modelViewMatrix: gl.getUniformLocation(
          shaderProgram,
          "uModelViewMatrix"
        )
      }
    };

    const buffers = this.initBuffer(gl);
    this.drawScene(gl, programInfo, buffers);

    this.setState({
      canvas,
      gl: gl || undefined,
      supported: true,
      width: canvas.width,
      height: canvas.height
    });
  }

  public render(): React.ReactElement<HTMLDivElement> {
    console.debug("rendered");
    if (this.state.supported) {
      return (
        <div className="Background">
          <canvas
            className="Background-canvas"
            onMouseMove={this.handleMouseMovement}
          />
        </div>
      );
    } else {
      return (
        <div className="Background">
          <img src={backgroundImage} />
        </div>
      );
    }
  }

  private loadShader(
    gl: WebGLRenderingContext,
    type: number,
    source: string
  ): WebGLShader | null {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.warn(
        `An error occured compiling the shader: ${gl.getShaderInfoLog(shader)}`
      );
      return null;
    }
    return shader!;
  }

  private initBuffer(gl: WebGLRenderingContext): IBuffers {
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    const positions = [1.0, 1.0, -1.0, 1.0, 1.0, -1.0, -1.0, -1.0];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

    const colorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    const colors = [
      1.0,
      1.0,
      1.0,
      1.0,
      1.0,
      0.0,
      0.0,
      1.0,
      0.0,
      1.0,
      0.0,
      1.0,
      0.0,
      0.0,
      1.0,
      1.0
    ];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
    return { position: positionBuffer, color: colorBuffer };
  }

  private loadTexture(gl: WebGLRenderingContext, image: ArrayBufferView) {
    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);

    // Because images have to be download over the internet
    // they might take a moment until they are ready.
    // Until then put a single pixel in the texture so we can
    // use it immediately. When the image has finished downloading
    // we'll update the texture with the contents of the image.
    const level = 0;
    const internalFormat = gl.RGBA;
    const width = 1;
    const height = 1;
    const border = 0;
    const srcFormat = gl.RGBA;
    const srcType = gl.UNSIGNED_BYTE;
    const pixel = new Uint8Array([0, 0, 255, 255]); // opaque blue
    gl.texImage2D(
      gl.TEXTURE_2D,
      level,
      internalFormat,
      width,
      height,
      border,
      srcFormat,
      srcType,
      image
    );

    /* const image = new Image();
     * image.onload = () => {
     *   gl.bindTexture(gl.TEXTURE_2D, texture);
     *   gl.texImage2D(gl.TEXTURE_2D, level, internalFormat,
     *                 srcFormat, srcType, image);

     *   // WebGL1 has different requirements for power of 2 images
     *   // vs non power of 2 images so check if the image is a
     *   // power of 2 in both dimensions.
     *   if (this.isPowerOf2(image.width) && this.isPowerOf2(image.height)) {
     *     // Yes, it's a power of 2. Generate mips.
     *     gl.generateMipmap(gl.TEXTURE_2D);
     *   } else {
     *     // No, it's not a power of 2. Turn of mips and set
     *     // wrapping to clamp to edge
     *     gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
     *     gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
     *     gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
     *   }
     * };
     * image.src = url;*/

    return texture;
  }

  private isPowerOf2(n: number): boolean {
    return (n & (n - 1)) === 0;
  }

  private initShaderProgram(
    gl: WebGLRenderingContext,
    vsSource: string,
    fsSource: string
  ): WebGLProgram | null {
    const vertexShader = this.loadShader(gl, gl.VERTEX_SHADER, vsSource);
    const fragmentShader = this.loadShader(gl, gl.FRAGMENT_SHADER, fsSource);

    const shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);

    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
      console.warn(
        `Unable to initialize the shader program: ${gl.getProgramInfoLog(
          shaderProgram
        )}`
      );
      return null;
    }

    return shaderProgram;
  }

  private drawScene(
    gl: WebGLRenderingContext,
    programInfo: IProgramInfo,
    buffers: IBuffers
  ) {
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clearDepth(1.0);
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);

    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    const fieldOfView = 45 * Math.PI / 180;
    const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
    const zNear = 0.1;
    const zFar = 100.0;
    const projectionMatrix = mat4.create();

    mat4.perspective(projectionMatrix, fieldOfView, aspect, zNear, zFar);
    const modelViewMatrix = mat4.create();
    mat4.translate(modelViewMatrix, modelViewMatrix, [-0.0, 0.0, -4.0]);

    // Tell WebGL how to pull out the positions from the position
    // buffer into the vertexPosition attribute.
    {
      const numComponents = 2;
      const type = gl.FLOAT;
      const normalize = false;
      const stride = 0;
      const offset = 0;
      gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position);
      gl.vertexAttribPointer(
        programInfo.attribLocations.vertexPosition,
        numComponents,
        type,
        normalize,
        stride,
        offset
      );
      gl.enableVertexAttribArray(programInfo.attribLocations.vertexPosition);
    }

    {
      // add colors
      const numComponents = 4;
      const type = gl.FLOAT;
      const normalize = false;
      const stride = 0;
      const offset = 0;
      gl.bindBuffer(gl.ARRAY_BUFFER, buffers.color);
      gl.vertexAttribPointer(
        programInfo.attribLocations.vertexColor,
        numComponents,
        type,
        normalize,
        stride,
        offset
      );
      gl.enableVertexAttribArray(programInfo.attribLocations.vertexColor);
    }

    gl.useProgram(programInfo.program);

    gl.uniformMatrix4fv(
      programInfo.uniformLocations.projectionMatrix,
      false,
      projectionMatrix
    );
    gl.uniformMatrix4fv(
      programInfo.uniformLocations.modelViewMatrix,
      false,
      modelViewMatrix
    );

    {
      const offset = 0;
      const vertexCount = 4;
      gl.drawArrays(gl.TRIANGLE_STRIP, offset, vertexCount);
    }
  }

  private handleMouseMovement = (e: React.MouseEvent<any>): void => {
    e.preventDefault();
    console.debug(e);
    console.debug(e.clientX, e.clientY);
  };
}
