<template>
  <canvas :ref="id" :width="width" :height="height"></canvas>
</template>

<script>
import mat4 from 'gl-mat4';

/** program */
const vertexShaderSource = /* glsl */`
  attribute vec4 aVertexPosition;

  uniform mat4 uModelViewMatrix;
  uniform mat4 uProjectionMatrix;

  void main() {
    gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
  }
`;

const fragmentShaderSource = /* glsl */`
  void main() {
    gl_FragColor = vec4(0.7, 0.3, 0.3, 1.0);
  }
`;

/** data */
const verticesPositions = [
 -1.0,  1.0,
  1.0,  1.0,
 -1.0, -1.0,
  1.0, -1.0,
];

export default {
  data() {
    return {
      id: 'webgl-canvas',
      width: window.innerWidth,
      height: window.innerHeight,

      gl: null,

      program: null,
      attribLocations: {},
      uniformLocations: {},

      verticesPositionsBuffer: null,
    }
  },
  mounted() {
    this.initWebGL();
    this.initShaderProgram();

    this.initBuffers();

    this.draw();
  },
  methods: {
    initWebGL() {
      const canvas = this.$refs[this.id];
      this.gl = canvas.getContext('webgl');

      const gl = this.gl;
      if (gl === null) {
        throw 'Unable to initialize WebGL. Your browser or machine may not support it.'
      }

      this.gl.clearColor(1.0, 1.0, 1.0, 1.0);
      gl.clearDepth(1.0);                 // Clear everything
      gl.enable(gl.DEPTH_TEST);           // Enable depth testing
      gl.depthFunc(gl.LEQUAL);            // Near things obscure far things

      gl.clear(gl.COLOR_BUFFER_BIT, gl.DEPTH_BUFFER_BIT);
    },
    /**
     * -> send shader to webgl
     * -> compile
     * -> link
     */
    initShaderProgram() {
      const gl = this.gl;
      /** send / compile */
      const vertexShader = this.loadShader(gl.VERTEX_SHADER, vertexShaderSource);
      const fragmentShader = this.loadShader(gl.FRAGMENT_SHADER, fragmentShaderSource);

      /** link to program */
      const shaderProgram = gl.createProgram();
      gl.attachShader(shaderProgram, vertexShader);
      gl.attachShader(shaderProgram, fragmentShader);
      gl.linkProgram(shaderProgram);

      if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        alert('Unable to initialize the shader program: ' + gl.getProgramInfoLog(shaderProgram));
      }

      this.program = shaderProgram;
      this.attribLocations = {
        vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
      };

      this.uniformLocations = {
        projectionMatrix: gl.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
        modelViewMatrix: gl.getUniformLocation(shaderProgram, 'uModelViewMatrix'),
      };
    },
    initBuffers() {
      const gl = this.gl;
      const verticesPositionsBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, verticesPositionsBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verticesPositions), gl.STATIC_DRAW);

      this.verticesPositionsBuffer = verticesPositionsBuffer;
    },
    draw() {
      const gl = this.gl;
      /**
       * perspective matrix,
       * a special matrix that is used to simulate the distortion of perspective in a camera.
       */
      const projectionMatrix = mat4.create();
      mat4.perspective(
        projectionMatrix,
          /* fieldOfView */ 45 * Math.PI / 180 ,
          /* aspect      */ this.width / this.height ,
          /* zNear       */ 0.1,
          /* zFar        */ 100,
        );

      // Set the drawing position to the "identity" point, which is
      // the center of the scene.
      const modelViewMatrix = mat4.create();

      // Now move the drawing position a bit to where we want to
      // start drawing the square.
      mat4.translate(
        modelViewMatrix,     // destination matrix
        modelViewMatrix,     // matrix to translate
        [-0.0, 0.0, -4.0]    // amount to translate
      );

      /** pull vertices positions in buffer into vertexPosition attribute*/
      gl.bindBuffer(gl.ARRAY_BUFFER, this.verticesPositionsBuffer);
      gl.vertexAttribPointer(
        this.attribLocations.vertexPosition,
        /* numComponents */ 2,          // for 2d plane, pull out 2 values per iteration
        /* type          */ gl.FLOAT,
        /* normalize     */ false,
        /* stride        */ 0,          // how many bytes to get from one set of values to the next, 
                                        // 0 = use type and numComponents above
        /* offset        */ 0,          // how many bytes inside the buffer to start from
      );
      gl.enableVertexAttribArray(
        this.attribLocations.vertexPosition
      );

      /** use program when drawing */
      gl.useProgram(this.program);

      /** inject data from buffer to program */
      gl.uniformMatrix4fv(
        this.uniformLocations.projectionMatrix,
        false,
        projectionMatrix
      );
      gl.uniformMatrix4fv(
        this.uniformLocations.modelViewMatrix,
        false,
        modelViewMatrix
      );

      gl.drawArrays(
        gl.TRIANGLE_STRIP, 
        /* offset */ 0,
        /* vertexCount */ 4,
      );
    },
    loadShader(type, source) {
      const gl = this.gl;
      const shader = gl.createShader(type);

      /** send source to shader object */
      gl.shaderSource(shader, source);
      
      /** compile the shader program */
      gl.compileShader(shader);

      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        alert('Shader Compiling Error the: ' + gl.getShaderInfoLog(shader));
      }

      return shader;
    },

  },
}
</script>

<style lang="scss" scoped>

</style>