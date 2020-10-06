<template>
  <canvas :width="size.x" :height="size.y" ref='canvasRef'>
    Not support canvas
  </canvas>
</template>

<script>
import { nextTick, onMounted, reactive, ref } from 'vue';
import { getWebGLContext, initShaders } from '../utils/cuon-utils';
import { vertex_shader_source, fragment_shader_source } from './view.source';

const mappingGLPosition = (x, y, canvas) => {
  const { width, height } = canvas.getBoundingClientRect();
  return [
    (x - width/2) / (width/2),
    (height/2 - y)/ (height/2)
  ]
}

export default {
  setup () {
    const size = reactive({
      x: 200,
      y: 400,
    })
    onMounted(() => {
      size.x = window.innerWidth;
      size.y = window.innerHeight;
    })

    const canvasRef = ref(null);
    const glRef = ref(null);
    onMounted(() => {
      const canvas = canvasRef.value;
      nextTick(() => {
        glRef.value = getWebGLContext(canvas, true);
        const gl = glRef.value;
        initShaders(gl, vertex_shader_source, fragment_shader_source);
        gl.clearColor(0.0, 0.0, 0.2, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT);
      });
    })
    
    const g_points = ref([]);
    onMounted(() => {
      const canvas = canvasRef.value;

      canvas.addEventListener('click', (ev) => {
        const [x, y] = mappingGLPosition(ev.x, ev.y, canvas);

        const gl = glRef.value;
        const a_Position = gl.getAttribLocation(gl.program, 'a_Position');
        const a_PointSize = gl.getAttribLocation(gl.program, 'a_PointSize');
        const u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor');

        g_points.value.push([x, y]);

        gl.clearColor(0.0, 0.0, 0.2, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT);
        for(const [x, y] of g_points.value) {
          gl.vertexAttrib3f(a_Position, x, y, 0.0);
          gl.vertexAttrib1f(a_PointSize, 20.0);
          gl.uniform4f(u_FragColor, x, y, x * y, 1.0);
          gl.drawArrays(gl.POINTS, 0, 1);
        }
      });
    });

    return {
      canvasRef,
      size
    }
  },
  mounted() {
    console.log(this)
  }
}
</script>

<style lang="scss" scoped>

</style>