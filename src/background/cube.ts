import { mat4 } from "gl-matrix";
import { isPowerOf2, loadShader, loadTexture } from "./util";

const vsSource = `
attribute vec4 aVertexPosition;
attribute vec2 aTextureCoord;
uniform mat4 uModelViewMatrix;
uniform mat4 uProjectionMatrix;
varying highp vec2 vTextureCoord;
void main(void) {
  gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
  vTextureCoord = aTextureCoord;
}
`;

const fsSource = `
varying highp vec2 vTextureCoord;
uniform sampler2D uSampler;
void main(void) {
  gl_FragColor = texture2D(uSampler, vTextureCoord);
}
`;

export interface IProgramInfo {
  program: WebGLProgram | null;
  attribLocations: {
    vertexPosition: number;
    textureCoord: number;
  };
  uniformLocations: {
    projectionMatrix: WebGLUniformLocation | null;
    modelViewMatrix: WebGLUniformLocation | null;
    uSampler: WebGLUniformLocation | null;
  };
}

export interface IBuffers {
  position: WebGLBuffer | null;
  textureCoord: WebGLBuffer | null;
  indices: WebGLBuffer | null;
}

export class CubeBackground {
  private programInfo: IProgramInfo;
  private buffers: any;
  private texture: any;
  private cubeRotation: number;
  constructor(private gl: WebGLRenderingContext, private image: any) {
    this.programInfo = this.initProgramInfo();
    this.buffers = this.initBuffers();
    this.texture = this.initTexture(image);
  }

  public render(): void {
    let then = 0;

    const render = (now: number) => {
      now *= 0.001;
      const deltaTime = now - then;
      then = now;
      this.drawScene(deltaTime);
      requestAnimationFrame(render);
    };
    requestAnimationFrame(render);
  }

  private drawScene(deltaTime: number) {
    this.gl.clearColor(0.0, 0.0, 0.0, 1.0); // Clear to black, fully opaque
    this.gl.clearDepth(1.0); // Clear everything
    this.gl.enable(this.gl.DEPTH_TEST); // Enable depth testing
    this.gl.depthFunc(this.gl.LEQUAL); // Near things obscure far things

    // Clear the canvas before we start drawing on it.

    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

    // Create a perspective matrix, a special matrix that is
    // used to simulate the distortion of perspective in a camera.
    // Our field of view is 45 degrees, with a width/height
    // ratio that matches the display size of the canvas
    // and we only want to see objects between 0.1 units
    // and 100 units away from the camera.

    const fieldOfView = 45 * Math.PI / 180; // in radians
    const aspect = this.gl.canvas.clientWidth / this.gl.canvas.clientHeight;
    const zNear = 0.1;
    const zFar = 100.0;
    const projectionMatrix = mat4.create();

    // note: glmatrix.js always has the first argument
    // as the destination to receive the result.
    mat4.perspective(projectionMatrix, fieldOfView, aspect, zNear, zFar);

    // Set the drawing position to the "identity" point, which is
    // the center of the scene.
    const modelViewMatrix = mat4.create();

    // Now move the drawing position a bit to where we want to
    // start drawing the square.

    mat4.translate(
      modelViewMatrix, // destination matrix
      modelViewMatrix, // matrix to translate
      [-0.0, 0.0, -6.0],
    ); // amount to translate
    mat4.rotate(
      modelViewMatrix, // destination matrix
      modelViewMatrix, // matrix to rotate
      this.cubeRotation, // amount to rotate in radians
      [0, 0, 1],
    ); // axis to rotate around (Z)
    mat4.rotate(
      modelViewMatrix, // destination matrix
      modelViewMatrix, // matrix to rotate
      this.cubeRotation * 0.7, // amount to rotate in radians
      [0, 1, 0],
    ); // axis to rotate around (X)

    // Tell WebGL how to pull out the positions from the position
    // buffer into the vertexPosition attribute
    {
      const numComponents = 3;
      const type = this.gl.FLOAT;
      const normalize = false;
      const stride = 0;
      const offset = 0;
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.buffers.position);
      this.gl.vertexAttribPointer(
        this.programInfo.attribLocations.vertexPosition,
        numComponents,
        type,
        normalize,
        stride,
        offset,
      );
      this.gl.enableVertexAttribArray(
        this.programInfo.attribLocations.vertexPosition,
      );
    }

    // Tell WebGL how to pull out the texture coordinates from
    // the texture coordinate buffer into the textureCoord attribute.
    {
      const numComponents = 2;
      const type = this.gl.FLOAT;
      const normalize = false;
      const stride = 0;
      const offset = 0;
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.buffers.textureCoord);
      this.gl.vertexAttribPointer(
        this.programInfo.attribLocations.textureCoord,
        numComponents,
        type,
        normalize,
        stride,
        offset,
      );
      this.gl.enableVertexAttribArray(
        this.programInfo.attribLocations.textureCoord,
      );
    }

    // Tell WebGL which indices to use to index the vertices
    this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.buffers.indices);

    // Tell WebGL to use our program when drawing

    this.gl.useProgram(this.programInfo.program);

    // Set the shader uniforms

    console.debug(this.programInfo.uniformLocations.projectionMatrix);
    this.gl.uniformMatrix4fv(
      this.programInfo.uniformLocations.projectionMatrix,
      false,
      projectionMatrix,
    );
    this.gl.uniformMatrix4fv(
      this.programInfo.uniformLocations.modelViewMatrix,
      false,
      modelViewMatrix,
    );

    // Specify the texture to map onto the faces.

    // Tell WebGL we want to affect texture unit 0
    this.gl.activeTexture(this.gl.TEXTURE0);

    // Bind the texture to texture unit 0
    this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture);

    // Tell the shader we bound the texture to texture unit 0
    this.gl.uniform1i(this.programInfo.uniformLocations.uSampler, 0);

    {
      const vertexCount = 36;
      const type = this.gl.UNSIGNED_SHORT;
      const offset = 0;
      this.gl.drawElements(this.gl.TRIANGLES, vertexCount, type, offset);
    }

    // Update the rotation for the next draw

    this.cubeRotation += deltaTime;
  }

  private initProgramInfo(): IProgramInfo {
    const program = this.initShaderProgram();
    return {
      program,
      attribLocations: {
        vertexPosition: this.gl.getAttribLocation(program, "aVertexPosition"),
        textureCoord: this.gl.getAttribLocation(program, "aTextureCoord"),
      },
      uniformLocations: {
        projectionMatrix: this.gl.getAttribLocation(
          program,
          "uProjectionMatrix",
        ),
        modelViewMatrix: this.gl.getAttribLocation(program, "uModelViewMatrix"),
        uSampler: this.gl.getAttribLocation(program, "uSampler"),
      },
    };
  }

  private initBuffers(): IBuffers {
    // Create a buffer for the cube's vertex positions.

    const positionBuffer = this.gl.createBuffer();

    // Select the positionBuffer as the one to apply buffer
    // operations to from here out.

    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, positionBuffer);

    // Now create an array of positions for the cube.

    // prettier-ignore
    const positions = [
      // Front face
      -1.0, -1.0,  1.0,
      1.0, -1.0,  1.0,
      1.0,  1.0,  1.0,
      -1.0,  1.0,  1.0,

      // Back face
      -1.0, -1.0, -1.0,
      -1.0,  1.0, -1.0,
      1.0,  1.0, -1.0,
      1.0, -1.0, -1.0,

      // Top face
      -1.0,  1.0, -1.0,
      -1.0,  1.0,  1.0,
      1.0,  1.0,  1.0,
      1.0,  1.0, -1.0,

      // Bottom face
      -1.0, -1.0, -1.0,
      1.0, -1.0, -1.0,
      1.0, -1.0,  1.0,
      -1.0, -1.0,  1.0,

      // Right face
      1.0, -1.0, -1.0,
      1.0,  1.0, -1.0,
      1.0,  1.0,  1.0,
      1.0, -1.0,  1.0,

      // Left face
      -1.0, -1.0, -1.0,
      -1.0, -1.0,  1.0,
      -1.0,  1.0,  1.0,
      -1.0,  1.0, -1.0,
    ];

    // Now pass the list of positions into WebGL to build the
    // shape. We do this by creating a Float32Array from the
    // JavaScript array, then use it to fill the current buffer.

    this.gl.bufferData(
      this.gl.ARRAY_BUFFER,
      new Float32Array(positions),
      this.gl.STATIC_DRAW,
    );

    // Now set up the texture coordinates for the faces.

    const textureCoordBuffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, textureCoordBuffer);

    // prettier-ignore
    const textureCoordinates = [
      // Front
      0.0, 0.0,
      1.0, 0.0,
      1.0, 1.0,
      0.0, 1.0,
      // Back
      0.0, 0.0,
      1.0, 0.0,
      1.0, 1.0,
      0.0, 1.0,
      // Top
      0.0, 0.0,
      1.0, 0.0,
      1.0, 1.0,
      0.0, 1.0,
      // Bottom
      0.0, 0.0,
      1.0, 0.0,
      1.0, 1.0,
      0.0, 1.0,
      // Right
      0.0, 0.0,
      1.0, 0.0,
      1.0, 1.0,
      0.0, 1.0,
      // Left
      0.0, 0.0,
      1.0, 0.0,
      1.0, 1.0,
      0.0, 1.0,
    ];

    this.gl.bufferData(
      this.gl.ARRAY_BUFFER,
      new Float32Array(textureCoordinates),
      this.gl.STATIC_DRAW,
    );

    // Build the element array buffer; this specifies the indices
    // into the vertex arrays for each face's vertices.

    const indexBuffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, indexBuffer);

    // This array defines each face as two triangles, using the
    // indices into the vertex array to specify each triangle's
    // position.

    // prettier-ignore
    const indices = [
      0,  1,  2,      0,  2,  3, // front
      4,  5,  6,      4,  6,  7, // back
      8,  9,  10,     8, 10, 11, // top
      12, 13, 14,    12, 14, 15, // bottom
      16, 17, 18,    16, 18, 19, // right
      20, 21, 22,    20, 22, 23, // left
    ];

    // Now send the element array to GL

    this.gl.bufferData(
      this.gl.ELEMENT_ARRAY_BUFFER,
      new Uint16Array(indices),
      this.gl.STATIC_DRAW,
    );

    return {
      position: positionBuffer,
      textureCoord: textureCoordBuffer,
      indices: indexBuffer,
    };
  }

  private initTexture(image: any): any | null {
    return loadTexture(this.gl, image);
  }

  private initShaderProgram(): WebGLProgram | null {
    const vertexShader = loadShader(this.gl, this.gl.VERTEX_SHADER, vsSource);
    const fragmentShader = loadShader(
      this.gl,
      this.gl.FRAGMENT_SHADER,
      fsSource,
    );

    const shaderProgram = this.gl.createProgram();
    this.gl.attachShader(shaderProgram, vertexShader);
    this.gl.attachShader(shaderProgram, fragmentShader);
    this.gl.linkProgram(shaderProgram);

    if (!this.gl.getProgramParameter(shaderProgram, this.gl.LINK_STATUS)) {
      alert(
        "Unable to initialize the shader program: " +
          this.gl.getProgramInfoLog(shaderProgram),
      );
      return null;
    }

    return shaderProgram;
  }
}
