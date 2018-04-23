import { mat4 } from "gl-matrix";

import { isPowerOf2, loadShader, loadTexture } from "./util";
import * as Shader from "./shaders";

export interface IProgramInfo {
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

export interface IBuffers {
  position: WebGLBuffer | null;
  color: WebGLBuffer | null;
}

export interface IPos {
  x: number;
  y: number;
}

export class Background {
  private program: WebGLProgram | null;
  private programInfo: IProgramInfo | null;
  private buffers: IBuffers;
  constructor(
    private gl: WebGLRenderingContext,
    private backgroundImage: ArrayBufferView,
  ) {
    this.program = this.initShaderProgram({
      vsSource: Shader.vertexSource,
      fsSource: Shader.fragmentSource,
    });
    this.programInfo = this.initProgramInfo(this.program);
    this.buffers = this.initBuffers();
  }

  public drawScene(): void {
    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
    this.gl.clearDepth(1.0);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.depthFunc(this.gl.LEQUAL);

    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

    const fieldOfView = 45 * Math.PI / 180;
    const aspect = this.gl.canvas.clientWidth / this.gl.canvas.clientHeight;
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
      const type = this.gl.FLOAT;
      const normalize = false;
      const stride = 0;
      const offset = 0;
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.buffers.position);
      this.gl.vertexAttribPointer(
        this.programInfo!.attribLocations.vertexPosition,
        numComponents,
        type,
        normalize,
        stride,
        offset,
      );
      this.gl.enableVertexAttribArray(
        this.programInfo!.attribLocations.vertexPosition,
      );
    }

    {
      // add colors
      const numComponents = 4;
      const type = this.gl.FLOAT;
      const normalize = false;
      const stride = 0;
      const offset = 0;
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.buffers.color);
      this.gl.vertexAttribPointer(
        this.programInfo!.attribLocations.vertexColor,
        numComponents,
        type,
        normalize,
        stride,
        offset,
      );
      this.gl.enableVertexAttribArray(
        this.programInfo!.attribLocations.vertexColor,
      );
    }

    this.gl.useProgram(this.programInfo!.program);

    this.gl.uniformMatrix4fv(
      this.programInfo!.uniformLocations.projectionMatrix,
      false,
      projectionMatrix,
    );
    this.gl.uniformMatrix4fv(
      this.programInfo!.uniformLocations.modelViewMatrix,
      false,
      modelViewMatrix,
    );

    {
      const offset = 0;
      const vertexCount = 4;
      this.gl.drawArrays(this.gl.TRIANGLE_STRIP, offset, vertexCount);
    }
  }
  public addWave(pos: IPos): void {}

  private initShaderProgram(shaders: {
    vsSource: string;
    fsSource: string;
  }): WebGLProgram | null {
    const vertexShader = loadShader(
      this.gl,
      this.gl.VERTEX_SHADER,
      shaders.vsSource,
    );
    const fragmentShader = loadShader(
      this.gl,
      this.gl.FRAGMENT_SHADER,
      shaders.fsSource,
    );

    const shaderProgram = this.gl.createProgram();
    this.gl.attachShader(shaderProgram, vertexShader);
    this.gl.attachShader(shaderProgram, fragmentShader);
    this.gl.linkProgram(shaderProgram);

    if (!this.gl.getProgramParameter(shaderProgram, this.gl.LINK_STATUS)) {
      console.warn(
        `Unable to initialize the shader program: ${this.gl.getProgramInfoLog(
          shaderProgram,
        )}`,
      );
      return null;
    }

    return shaderProgram;
  }

  private initProgramInfo(program: WebGLProgram | null): IProgramInfo {
    return {
      program,
      attribLocations: {
        vertexPosition: this.gl.getAttribLocation(program, "aVertexPosition"),
        vertexColor: this.gl.getAttribLocation(program, "aVertexColor"),
      },
      uniformLocations: {
        projectionMatrix: this.gl.getUniformLocation(
          program,
          "uProjectionMatrix",
        ),
        modelViewMatrix: this.gl.getUniformLocation(
          program,
          "uModelViewMatrix",
        ),
      },
    };
  }

  private initBuffers(): IBuffers {
    const positionBuffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, positionBuffer);
    // prettier-ignore
    const positions = [
      1.0, 1.0, -1.0, 1.0,
      1.0, -1.0, -1.0, -1.0
    ];
    this.gl.bufferData(
      this.gl.ARRAY_BUFFER,
      new Float32Array(positions),
      this.gl.STATIC_DRAW,
    );

    const colorBuffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, colorBuffer);
    // prettier-ignore
    const colors = [
      1.0, 1.0, 1.0, 1.0, 1.0,
      0.0, 0.0, 1.0, 0.0, 1.0,
      0.0, 1.0, 0.0, 0.0, 1.0,
      1.0, 0.0, 0.0, 0.0, 1.0,
    ];
    this.gl.bufferData(
      this.gl.ARRAY_BUFFER,
      new Float32Array(colors),
      this.gl.STATIC_DRAW,
    );
    return { position: positionBuffer, color: colorBuffer };
  }

  private loadBackgroundImg(image: ArrayBufferView): void {}
}
