<template>
  <hud @on-type-change='draw'></hud>
  <canvas :width="size.x" :height="size.y" ref='ref_canvas'>
    Not Support Canvas
  </canvas>
</template>

<script>
import { nextTick, onMounted, reactive, ref } from 'vue'
import { getWebGLContext, initShaders } from '../utils/cuon-utils';

import { vertex_shader_source, fragment_shader_source } from './source';
import { points } from './vendor';

import Hud from './view.hud'

const drawType = (gl, type) => {
  const pointFloatArray = points;
  const vertexBuffer = gl.createBuffer();
  gl.clearColor(0.1, 0.1, 0.1, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);

  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, pointFloatArray, gl.STATIC_DRAW);
  const a_Position = gl.getAttribLocation(gl.program, 'a_Position');

  const a_PointSize = gl.getAttribLocation(gl.program, 'a_PointSize');
  gl.vertexAttrib1f(a_PointSize, 20.0);
  const u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor');
  gl.uniform4f(u_FragColor, 
    0.5 + 0.5 * Math.random(), 
    0.5 + 0.5 * Math.random(), 
    0.5 + 0.5 * Math.random(),
    1.0
  );

  gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(a_Position);

  gl.drawArrays(type, 0, pointFloatArray.length / 2);
}

export default {
  components: {
    hud: Hud
  },
  setup () {
    /** setup window */
    const size = reactive({
      x: 400,
      y: 200
    });
    onMounted(() => {
      size.x = window.innerWidth;
      size.y = window.innerHeight;
    });

    /** setup webgl context */
    const ref_canvas = ref(null);
    const ref_gl = ref(null);
    onMounted(() => {
      const canvas = ref_canvas.value;
      nextTick(() => {
        const gl = getWebGLContext(canvas, true);
        ref_gl.value = gl;
        initShaders(gl, vertex_shader_source, fragment_shader_source);
        /** init canvas */
        drawType(gl, gl.POINTS);
      })
    })
    return {
      size,
      ref_canvas,
      ref_gl
    }
  },
  methods: {
    draw(type_string) {
      /** 使用传统方法调用的时候, 不加 .value */
      const gl = this.ref_gl;
      switch (type_string) {
        case 'points':
          drawType(gl, gl.POINTS);
          break;
        case 'line strip':
          drawType(gl, gl.LINE_STRIP);
          break;
        case 'line loop':
          drawType(gl, gl.LINE_LOOP);
          break;
        case 'lines':
          drawType(gl, gl.LINES);
          break;
        case 'triangle strip':
          drawType(gl, gl.TRIANGLE_STRIP);
          break;
        case 'triangle strip':
          drawType(gl, gl.TRIANGLE_FAN);
          break;
        case 'triangles':
          drawType(gl, gl.TRIANGLES);
          break;
        default:
          drawType(gl, gl.POINTS);
      }
    }
  }
}
</script>

<style>

</style>